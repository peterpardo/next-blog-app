import TextField from "@/components/TextField";
import React from "react";

const CreatePost = () => {
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

      <TextField name="title" id="title" label="Title" value="Sample value" />
    </div>
  );
};

export default CreatePost;
