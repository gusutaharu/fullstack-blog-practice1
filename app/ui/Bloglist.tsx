import { Blog } from "./Blog";
import { getAllPosts } from "../lib/data";

const Bloglist = async() => {
  const posts = await getAllPosts();
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {posts.map((post) => (
        <Blog key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Bloglist;
