"use client";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

function Notification() {
  const searchParams = useSearchParams();

  const successPost = searchParams.get("success");
  const successEdit = searchParams.get("updated");
  const successDelete = searchParams.get("deleted");

  if (successPost === "true") {
    toast.success("投稿が完了しました！", { id: "post-success" });
  } else if (successEdit === "true") {
    toast.success("投稿が更新されました！", { id: "post-edit" });
  } else if (successDelete === "true") {
    toast.success("投稿が削除されました！", { id: "post-delete" });
  }
  return <Toaster />;
}

export default Notification;
