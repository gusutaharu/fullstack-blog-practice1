"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { State } from "./difinitions";
import { z } from "zod";

const PostSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(30, "タイトルは30文字以内で入力してください"),
  description: z
    .string()
    .min(1, "記事詳細は必須です")
    .max(200, "記事詳細は200文字以内で入力してください"),
});

export const addPost = async (prevState: State, formData: FormData) => {
  const validatedFields = PostSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });
  if (!validatedFields.success) {
    // バリデーションエラー時の処理
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "入力にエラーがあります。修正してください。",
    };
  }
  try {
    await prisma.post.create({
      data: {
        title: validatedFields.data.title,
        description: validatedFields.data.description,
      },
    });
  } catch (error) {
    console.error("Error adding post:", error);
    return {
      message: "送信に失敗しました。再度お試しください。",
    };
  }
  revalidatePath("/");
  redirect("/?msg=created");
};

export const editPost = async (
  id: number,
  prevState: State,
  formData: FormData,
) => {
  const validatedFields = PostSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });
  if (!validatedFields.success) {
    // バリデーションエラー時の処理
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "入力にエラーがあります。修正してください。",
    };
  }
  try {
    await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title: validatedFields.data.title,
        description: validatedFields.data.description,
      },
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return {
      message: "送信に失敗しました。再度お試しください。",
    };
  }
  revalidatePath("/");
  redirect("/?msg=updated");
};

export const deletePost = async (id: number) => {
  await prisma.post.delete({
    where: { id: Number(id) },
  });
  revalidatePath("/");
  redirect("/?msg=deleted");
};
