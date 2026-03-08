"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function Notification() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const msg = searchParams.get("msg");
    if (!msg) return;
    switch (msg) {
      case "created":
        toast.success("新しく投稿しました！");
        break;
      case "updated":
        toast.success("内容を更新しました！");
        break;
      case "deleted":
        toast.error("削除しました");
        break;
    }
    const params = new URLSearchParams(searchParams);
    params.delete("msg");
    replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, replace]);
  return <Toaster />;
}

export default Notification;
