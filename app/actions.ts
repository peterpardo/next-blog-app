"use server";

import { auth } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPost(formData: FormData) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("User not authenticated.");
    }

    const post = await prisma.post.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        content: formData.get("content") as string,
        authorId: userId,
        published: false, // add input field for this
      },
    });
    console.log("post created", post);
  } catch (e) {
    console.log("Error:", e);
  }
}
