import { addPost } from "@/app/lib/action";

const PostBlog = () => {
  return (
    <>
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-800 font-bold p-3">
            ブログ新規作成 🚀
          </p>
          <form action={addPost}>
            <input
              name="title"
              placeholder="タイトルを入力"
              type="text"
              className="border-2 border-gray-300 rounded-md px-4 w-full py-2 my-2"
            />
            <textarea
              name="description"
              placeholder="記事詳細を入力"
              className="border-2 border-gray-300 rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              投稿
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostBlog;
