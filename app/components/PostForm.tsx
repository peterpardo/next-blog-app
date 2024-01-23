"use client";

import TextField from "@/components/InputField";
import TextareaField from "@/components/TextareaField";
import Image from "next/image";
import React, { useState } from "react";

type PostData = {
  title: string;
  description: string;
  image: File | null;
};

const PostForm = () => {
  const [postData, setPostData] = useState<PostData>({
    title: "",
    description: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="space-y-5">
      {/* Title */}
      {/* description */}
      {/* content */}
      {/* image file - just one file */}
      {/* submit button */}
      {/* Confirmation modal */}
      <div>
        <h1 className="text-2xl">Create Post</h1>
        <p className="text-gray-500">
          Here, you can create your own post. Add an image to attract people to
          your post!
        </p>
      </div>

      <TextField
        name="title"
        id="title"
        label="Title"
        placeholder="Your post title here..."
        value={postData.title}
        onChange={handleInputChange}
      />
      <TextField
        name="description"
        id="description"
        label="Description"
        placeholder="Your post description here..."
        value={postData.description}
        onChange={handleInputChange}
      />
      <TextareaField
        name="content"
        id="content"
        label="Content"
        placeholder="Your post content here..."
      />
      <TextField
        name="image"
        id="image"
        label="Image"
        type="file"
        accept="image/*"
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
    </div>
  );
};

export default PostForm;
