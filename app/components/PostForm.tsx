"use client";

import CheckboxField from "@/components/CheckboxField";
import InputField from "@/components/InputField";
import SubmitBtn from "@/components/SubmitBtn";
import TextareaField from "@/components/TextareaField";
import { createPost } from "app/actions";
import Image from "next/image";
import React, { useState } from "react";
import { useFormState } from "react-dom";

type PostData = {
  title: string;
  description: string;
  content: string;
  publish: boolean;
  image: File | null;
};

const initialState = {
  title: "",
  description: "",
  content: "",
  image: "",
};

const PostForm = () => {
  const [postData, setPostData] = useState<PostData>({
    title: "",
    description: "",
    content: "",
    publish: false,
    image: null,
  });
  const [previewImage, setPreviewImage] = useState("");
  const [state, formState] = useFormState(createPost, initialState);

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

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl">Create Post</h1>
        <p className="text-gray-500">
          Here, you can create your own post. Add an image to attract people to
          your post!
        </p>
      </div>

      <form action={formState} className="space-y-5">
        <InputField
          name="title"
          id="title"
          label="Title"
          placeholder="Your post title here..."
          value={postData.title}
          error={state?.title}
          required
          onChange={handleInputChange}
        />
        <InputField
          name="description"
          id="description"
          label="Description"
          placeholder="Your post description here..."
          value={postData.description}
          error={state?.description}
          required
          onChange={handleInputChange}
        />
        <TextareaField
          name="content"
          id="content"
          label="Content"
          value={postData.content}
          error={state?.content}
          required
          placeholder="Your post content here..."
        />
        <InputField
          name="image"
          id="image"
          label="Image"
          type="file"
          accept="image/*"
          error={state?.image}
          required
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
          <SubmitBtn label="Create Post" />
        </div>
      </form>
    </div>
  );
};

export default PostForm;
