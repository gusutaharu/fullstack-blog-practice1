import { deletePost } from "../lib/action";

export const DeleteButton = ({ id }: { id: number }) => {
  const deletePostWithId = deletePost.bind(null, id);
  return (
    <form action={deletePostWithId} className="mt-auto">
      <button className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg hover:bg-slate-100">
        削除
      </button>
    </form>
  );
};
