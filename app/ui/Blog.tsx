import Link from "next/link";
import { PostType } from "../lib/difinitions";

interface PostProps {
  post: PostType;
}

export const Blog = ({ post }: PostProps) => {
  return (
    <div
      key={post.id}
      className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-300 flex flex-col justify-center"
    >
      <div className="flex items-center my-3">
        <div className="mr-auto">
          <p>{post.id}</p>
          <h2 className="mr-auto font-semibold">{post.title}</h2>
        </div>
        <Link
          href={`/blog/edit/${post.id}`}
          className="px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200"
        >
          編集
        </Link>
      </div>
      <div className="mr-auto my-1">
        <h2>{post.description}</h2>
      </div>
      <div className="mr-auto my-1">
        <blockquote className="font-bold text-slate-700">2023-10-10</blockquote>
      </div>
    </div>
  );
};
