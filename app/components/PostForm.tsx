"use client";

import CheckboxField from "@/components/CheckboxField";
import InputField from "@/components/InputField";
import SubmitBtn from "@/components/SubmitBtn";
import TextareaField from "@/components/TextareaField";
import Tiptap from "@/components/Tiptap";
import { createPost, editPost } from "app/actions";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";

type PostData = {
  id?: number | string;
  title: string;
  description: string;
  content: string;
  publish: boolean;
  image: File | null | string;
};

type PostForm = {
  action?: "CREATE" | "EDIT";
  post?: PostData;
};

const initialState = {
  title: "",
  description: "",
  content: "",
  image: "",
};

const PostForm = ({ action = "CREATE", post }: PostForm) => {
  const [postData, setPostData] = useState<PostData>({
    title: "",
    description: "",
    content: "",
    publish: false,
    image: null,
  });
  const [previewImage, setPreviewImage] = useState("");
  const [createState, createFormState] = useFormState(createPost, initialState);
  const [editState, editFormState] = useFormState(editPost, initialState);
  const editedPost = useMemo(() => post, [post]);

  const isCreateAction = action === "CREATE";
  const formTitle = isCreateAction ? "Create Post" : "Edit Post";
  const formDesc = isCreateAction
    ? "Here, you can create your own post. Add an image to attract people to your post!"
    : "Here is your own post. You can make revisions to your post.";

  useEffect(() => {
    if (action !== "EDIT" || !editedPost) return;

    setPostData(editedPost);

    if (editedPost?.image) {
      setPreviewImage(
        `${process.env.NEXT_PUBLIC_BUCKET_URL}/${editedPost?.image}`
      );
    }
  }, [action, editedPost]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

    if (e.target.name === "image" && e.target.files) {
      if (
        e.target.files.length <= 0 ||
        !allowedTypes.includes(e.target.files[0].type)
      )
        return;

      const url = URL.createObjectURL(e.target.files[0]);
      setPreviewImage(url);
    }

    setPostData((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const handleContentChange = (newContent: string) => {
    setPostData((prevState) => ({ ...prevState, content: newContent }));
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl">{formTitle}</h1>
        <p className="text-gray-500">{formDesc}</p>
      </div>

      <form
        action={isCreateAction ? createFormState : editFormState}
        className="space-y-5"
      >
        {!isCreateAction && editedPost?.id && (
          <InputField
            name="postId"
            id="postId"
            value={editedPost?.id.toString()}
            type="hidden"
          />
        )}
        <InputField
          name="title"
          id="title"
          label="Title"
          placeholder="Your post title here..."
          value={postData.title}
          error={isCreateAction ? createState?.title : editState?.title}
          required
          onChange={handleInputChange}
        />
        <InputField
          name="description"
          id="description"
          label="Description"
          placeholder="Your post description here..."
          value={postData.description}
          error={
            isCreateAction ? createState?.description : editState?.description
          }
          required
          onChange={handleInputChange}
        />
        <Tiptap data={post?.content as string} onChange={handleContentChange} />
        <InputField
          name="image"
          id="image"
          label="Image"
          type="file"
          accept="image/*"
          error={isCreateAction ? createState?.image : editState?.image}
          required={isCreateAction}
          onChange={handleInputChange}
        />

        {previewImage && (
          <div className="w-full">
            <Image
              src={previewImage}
              alt="preview image"
              width={500}
              height={500}
              className="mx-auto"
            />
          </div>
        )}

        <div className="flex items-center justify-end">
          <CheckboxField
            id="publish"
            name="publish"
            label="Publish"
            checked={postData.publish}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center justify-end">
          <SubmitBtn label={isCreateAction ? "Create Post" : "Edit Post"} />
        </div>
      </form>
    </div>
  );
};

export default PostForm;
