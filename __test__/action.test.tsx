import { addPost, deletePost, editPost } from "../app/lib/action";
import prisma from "../app/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

jest.mock("../app/lib/prisma", () => ({
  post: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

const createFormData = (title: string, desc: string) => {
  const fd = new FormData();
  fd.append("title", title);
  fd.append("description", desc);
  return fd;
};
const prevState = { errors: {}, message: "" };

describe("Server Actions テスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("addPost", () => {
    describe("addPost タイトルの境界値テスト", () => {
      test("0文字（無）: エラーになること", async () => {
        const result = await addPost(
          prevState,
          createFormData("", "有効な説明詳細"),
        );
        expect(result.errors?.title).toContain("タイトルは必須です");
      });

      test("1文字: 成功すること", async () => {
        await addPost(prevState, createFormData("あ", "有効な詳細説明"));
        expect(prisma.post.create).toHaveBeenCalled();
      });

      test("30文字: 成功すること", async () => {
        await addPost(
          prevState,
          createFormData("あ".repeat(30), "有効な詳細説明"),
        );
        expect(prisma.post.create).toHaveBeenCalled();
      });

      test("31文字: エラーになること", async () => {
        const result = await addPost(
          prevState,
          createFormData("あ".repeat(31), "有効な詳細説明"),
        );
        expect(result.errors?.title).toContain(
          "タイトルは30文字以内で入力してください",
        );
      });
    });
    describe("addPost記事詳細の境界値テスト", () => {
      test("0文字: エラーになること", async () => {
        const result = await addPost(
          prevState,
          createFormData("有効なタイトル", ""),
        );
        expect(result.errors?.description).toContain("記事詳細は必須です");
      });

      test("1文字: 成功すること", async () => {
        await addPost(prevState, createFormData("有効なタイトル", "あ"));
        expect(prisma.post.create).toHaveBeenCalled();
      });

      test("200文字: 成功すること", async () => {
        await addPost(
          prevState,
          createFormData("有効なタイトル", "あ".repeat(200)),
        );
        expect(prisma.post.create).toHaveBeenCalled();
      });

      test("201文字: エラーになること", async () => {
        const result = await addPost(
          prevState,
          createFormData("有効なタイトル", "あ".repeat(201)),
        );
        expect(result.errors?.description).toContain(
          "記事詳細は200文字以内で入力してください",
        );
      });
    });

    test("成功時：DBに保存され、リダイレクトされること", async () => {
      await addPost(
        prevState,
        createFormData("テストタイトル", "テスト詳細説明"),
      );

      // DB保存の検証
      expect(prisma.post.create).toHaveBeenCalledWith({
        data: {
          title: "テストタイトル",
          description: "テスト詳細説明",
        },
      });
      expect(revalidatePath).toHaveBeenCalledWith("/");
      expect(redirect).toHaveBeenCalledWith("/?msg=created");
    });
    test("editPost: 指定IDを更新してリダイレクトすること", async () => {
      await editPost(
        123,
        prevState,
        createFormData("更新タイトル", "更新説明"),
      );
      expect(prisma.post.update).toHaveBeenCalledWith({
        where: { id: 123 },
        data: { title: "更新タイトル", description: "更新説明" },
      });
      expect(revalidatePath).toHaveBeenCalledWith("/");
      expect(redirect).toHaveBeenCalledWith("/?msg=updated");
    });

    test("deletePost: 指定IDを削除してリダイレクトすること", async () => {
      await deletePost(456);
      expect(prisma.post.delete).toHaveBeenCalledWith({ where: { id: 456 } });
      expect(revalidatePath).toHaveBeenCalledWith("/");
      expect(redirect).toHaveBeenCalledWith("/?msg=deleted");
    });
  });
});
