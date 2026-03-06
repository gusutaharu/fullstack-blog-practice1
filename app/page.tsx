import Link from "next/link";
import { getAllPosts } from "./lib/data";
import { Blog } from "./ui/Blog";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-blue-900 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold">
          Full Stack Blog 📝
        </h1>
        <p className="text-center">Github actionsから自動デプロイしました。</p>
      </div>
      <div className="flex my-5">
        <Link
          href={"/blog/add"}
          className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-300 font-semibold"
        >
          ブログ新規作成
        </Link>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        {posts.map((post) => (
          <Blog key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
