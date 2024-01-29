import PostForm from "@/components/PostForm";
import { getPost } from "@/utils/utils";
import React from "react";
import { PostData } from "types";

export const revalidate = 3600;

export default async function EditPost({ params }: { params: { id: string } }) {
  const post = (await getPost(params.id)) as PostData;

  return (
    <div className="space-y-5">
      <PostForm action="EDIT" post={post} />
    </div>
  );
}
