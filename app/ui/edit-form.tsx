"use client";

import { useActionState } from "react";
import { editPost } from "@/app/lib/action";
import { State } from "@/app/lib/difinitions";

function EditForm({
  post,
}: {
  post: { id: number; title: string; description: string };
}) {
  const initialState: State = { message: null, errors: {} };
  const updateTaskWithId = editPost.bind(null, post.id);
  const [state, formAction, isPending] = useActionState(
    updateTaskWithId,
    initialState,
  );
  return (
    <>
      {state.message && (
        <p className="text-red-500 font-semibold mb-3">{state.message}</p>
      )}
      <form action={formAction}>
        {state.errors?.title && (
          <p className="text-red-500">{state.errors.title}</p>
        )}
        <input
          name="title"
          placeholder="タイトルを入力"
          type="text"
          className="rounded-md px-4 w-full py-2 my-2"
          defaultValue={post.title}
        />
        {state.errors?.description && (
          <p className="text-red-500">{state.errors.description}</p>
        )}
        <textarea
          name="description"
          placeholder="記事詳細を入力"
          className="rounded-md px-4 py-2 w-full my-2"
          defaultValue={post.description}
        ></textarea>
        <button
          disabled={isPending}
          className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100"
        >
          {isPending ? "投稿中..." : "投稿"}
        </button>
        <button className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
          削除
        </button>
      </form>
    </>
  );
}

export default EditForm;
