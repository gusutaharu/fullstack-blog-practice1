import { getEditPost } from "@/app/lib/data";
import EditForm from "@/app/ui/edit-form";
import { notFound } from "next/navigation";

const EditBlog = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const post = await getEditPost(id);
  if (!post || Array.isArray(post)) {
    notFound();
  }

  return (
    <>
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            ブログの編集 🚀
          </p>
          <EditForm post={post} />
        </div>
      </div>
    </>
  );
};

export default EditBlog;