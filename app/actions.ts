"use server";

import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import { supabase } from "@/utils/storage";
import { v4 as uuidv4 } from "uuid";

export async function createPost(_: any, formData: FormData) {
  try {
    const user = await currentUser();
    const errorMessages = {
      title: "",
      description: "",
      content: "",
      image: "",
    };
    let newErrors = {} as typeof errorMessages;

    if (!user) {
      throw new Error("User not authenticated.");
    }

    if (formData.get("title") === "") {
      newErrors.title = "Title is required";
    }

    if (formData.get("description") === "") {
      newErrors.description = "Description is required";
    }

    if (formData.get("content") === "") {
      newErrors.content = "Content is required";
    }

    const imageFile = formData.get("image") as File;
    const fileSize = imageFile.size / 1024 ** 2; // convert file size to MB
    if (imageFile.size === 0) {
      newErrors.image = "Image is required";
    } else if (fileSize > 5) {
      newErrors.image = "Image file must be less than 5mb";
    }

    if (Object.keys(newErrors).length > 0) {
      return {
        ...errorMessages,
        ...newErrors,
      };
    }

    // Store image file in storage
    const imageExt = imageFile.type.split("/")[1];
    const fileName = `${user.id}_${uuidv4()}.${imageExt}`;

    const { data: storageFile, error } = await supabase.storage
      .from("next-blog-storage")
      .upload(fileName, imageFile);

    if (error) {
      throw new Error("Error occurred. Try again.");
    }

    const post = await prisma.post.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        content: formData.get("content") as string,
        authorId: user.id,
        authorName: `${user.firstName} ${user.lastName}`,
        authorImage: user.hasImage ? user?.imageUrl : "",
        published: Boolean(formData.get("publish")),
        image: storageFile.path,
      },
    });

    console.log("post created", post);
  } catch (e) {
    console.log("Error:", e);
    return;
  }

  redirect("/");
}
