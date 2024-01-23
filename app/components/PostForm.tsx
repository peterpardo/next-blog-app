"use client";

import TextField from "@/components/InputField";
import TextareaField from "@/components/TextareaField";
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

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
        onChange={handleInputChange}
      />
    </div>
  );
};

export default PostForm;
