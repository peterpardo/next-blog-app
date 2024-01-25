"use server";

import { auth } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function createPost(_: any, formData: FormData) {
  try {
    const { userId } = auth();
    const errorMessages = {
      title: "",
      description: "",
      content: "",
      image: "",
    };
    let newErrors = {} as typeof errorMessages;

    if (!userId) {
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

    if ((formData.get("image") as File).size === 0) {
      newErrors.image = "Image is required";
    }

    if (Object.keys(newErrors).length === 0) {
      return {
        ...errorMessages,
        ...newErrors,
      };
    }

    // const post = await prisma.post.create({
    //   data: {
    //     title: formData.get("title") as string,
    //     description: formData.get("description") as string,
    //     content: formData.get("content") as string,
    //     authorId: userId,
    //     published: false,
    //     image: "sample image",
    //   },
    // });
    // console.log("post created", post);
  } catch (e) {
    console.log("Error:", e);
    return;
  }

  // redirect("/");
}
