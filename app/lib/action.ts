"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { redirect } from "next/navigation";

export const addPost = async (formData: FormData) => {
  const title = formData.get("title");
  const description = formData.get("description");
  await prisma.post.create({
    data: {
      title: title as string,
      description: description as string,
    },
  });
  revalidatePath("/");
  redirect("/");
};
