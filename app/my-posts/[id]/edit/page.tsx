import PostForm from "@/components/PostForm";
import React from "react";

export default function EditPost() {
  return (
    <div className="space-y-5">
      <PostForm action="EDIT" />
    </div>
  );
}
