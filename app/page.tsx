import Link from "next/link";
import Notification from "./ui/notification";
import { Suspense } from "react";
import Bloglist from "./ui/Bloglist";
import { BlogSkeltons } from "./ui/skeloton";

export default async function Home() {
  return (
    <main className="w-full h-full">
      <Suspense fallback={null}>
        <Notification />
      </Suspense>
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
      <Suspense fallback={<BlogSkeltons />}>
        <Bloglist />
      </Suspense>
    </main>
  );
}
