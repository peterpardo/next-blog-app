import PostForm from "@/components/PostForm";
import { getPost } from "@/utils/utils";
import React from "react";

export default async function EditPost({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  return (
    <div className="space-y-5">
      <PostForm action="EDIT" post={post} />
    </div>
  );
}
