import Form from "next/form";
import prisma from "./lib/prisma";

export default function Home() {
  // Server Action
  async function createPost() {
    "use server";

    try {
      // ユーザー作成処理
      await prisma.post.create({
        data: {
          title: "Hello",
          description: "This is my second post.",
        },
      });

      console.log("投稿作成に成功しました");
    } catch (error) {
      console.error("投稿作成に失敗しました, " + error);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <Form action={createPost} className="space-y-4">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          投稿を作成
        </button>
      </Form>
    </div>
  );
}
