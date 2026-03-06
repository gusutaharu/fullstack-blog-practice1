"use client";

import { addPost } from "@/app/lib/action";
import { State } from "@/app/lib/difinitions";
import { useActionState } from "react";

const PostBlog = () => {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(addPost, initialState);
  return (
    <>
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-800 font-bold p-3">
            ブログ新規作成 🚀
          </p>
          {state.message && (
            <p className="text-red-500 font-semibold mb-3">
              {state.message}
            </p>
          )}
          <form action={formAction}>
            {state.errors?.title && (
              <p className="text-red-500">{state.errors.title}</p>
            )}
            <input
              name="title"
              placeholder="タイトルを入力"
              type="text"
              className="border-2 border-gray-300 rounded-md px-4 w-full py-2 my-2"
            />
            {state.errors?.description && (
              <p className="text-red-500">{state.errors.description}</p>
            )}
            <textarea
              name="description"
              placeholder="記事詳細を入力"
              className="border-2 border-gray-300 rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <button
              disabled={isPending}
              className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100"
            >
              {isPending ? "投稿中..." : "投稿"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostBlog;
