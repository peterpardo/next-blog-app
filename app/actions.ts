"use server";

import { currentUser } from "@clerk/nextjs";
import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import { supabase } from "@/utils/storage";
import { v4 as uuidv4 } from "uuid";
import { User } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type ErrorMessages = {
  title: string;
  description: string;
  content: string;
  image: string;
};

const _errorMessages = {
  title: "",
  description: "",
  content: "",
  image: "",
};

export async function createPost(_: any, formData: FormData) {
  try {
    const user = await getCurrentUser();
    const errorMessages = { ..._errorMessages };
    let newErrors = validatePost(formData);

    if (Object.keys(newErrors).length > 0) {
      return {
        ...errorMessages,
        ...newErrors,
      };
    }

    const imageFile = await storePostImage(
      formData.get("image") as File,
      user.id
    );

    const post = await prisma.post.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        content: formData.get("content") as string,
        authorId: user.id,
        authorName: `${user.firstName} ${user.lastName}`,
        authorImage: user.hasImage ? user?.imageUrl : "",
        published: Boolean(formData.get("publish")),
        image: imageFile.path,
      },
    });

    console.log("post created", post);
  } catch (e) {
    console.log("Error:", e);
    throw new Error("Something went wrong. Try again.");
  }

  redirect("/my-posts");
}

export async function editPost(_: any, formData: FormData) {
  try {
    const user = await getCurrentUser();
    const errorMessages = { ..._errorMessages };
    let newErrors = validatePost(formData, false);

    if (Object.keys(newErrors).length > 0) {
      return {
        ...errorMessages,
        ...newErrors,
      };
    }

    if (formData.get("postId") === null) {
      throw new Error("Post id does not exists.");
    }

    const postId = formData.get("postId") as string;
    const oldPost = await prisma.post.findUnique({
      where: {
        id: parseInt(postId),
      },
    });

    if (!oldPost) throw new Error("Post does not exists");

    const imageFile = formData.get("image") as File;
    let newImageFile: { path: string } | null = null;
    if (imageFile.size > 0) {
      await deletePostImage(oldPost.image);

      newImageFile = await storePostImage(imageFile, user.id);
    }

    const editedPost = await prisma.post.update({
      where: {
        id: parseInt(postId),
      },
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        content: formData.get("content") as string,
        authorId: user.id,
        authorName: `${user.firstName} ${user.lastName}`,
        authorImage: user.hasImage ? user?.imageUrl : "",
        published: Boolean(formData.get("publish")),
        image: newImageFile !== null ? newImageFile.path : oldPost.image,
      },
    });

    console.log("editedPost:", editedPost);
  } catch (e) {
    console.log("editPost:", e);
    throw new Error("editPost error");
  }

  redirect("/my-posts");
}

export async function deletePost(postId: number) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Post does not exits.");
    }

    await deletePostImage(post.image);

    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    console.log("deletePost:", deletedPost);
  } catch (e) {
    throw new Error("Error in deleting post.");
  }

  revalidatePath("/my-posts");
}

async function getCurrentUser(): Promise<User> {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("User not authenticated.");
    }

    return user;
  } catch (e) {
    console.log("Error: User not authenticated.");
    throw new Error("User not authenticated.");
  }
}

function validatePost(formData: FormData, isCreatePost = true) {
  let newErrors = {} as ErrorMessages;

  if (formData.get("title") === "") {
    newErrors.title = "Title is required";
  } else if ((formData.get("title") as string).length > 80) {
    newErrors.title = "Title must not exceed 80 characters.";
  }

  if (formData.get("description") === "") {
    newErrors.description = "Description is required";
  } else if ((formData.get("description") as string).length > 100) {
    newErrors.description = "Description must not exceed 100 characters.";
  }

  if (formData.get("content") === "") {
    newErrors.content = "Content is required";
  }

  const imageFile = formData.get("image") as File;
  const fileSize = imageFile.size / 1024 ** 2; // convert file size to MB

  if (isCreatePost) {
    if (imageFile.size === 0) {
      newErrors.image = "Image is required";
    }
  }

  if (imageFile.size > 0) {
    if (fileSize > 5) {
      newErrors.image = "Image file must be less than 5mb";
    } else if (
      !["image/png", "image/jpeg", "image/jpg"].includes(imageFile.type)
    ) {
      newErrors.image = "File must be an image";
    }
  }

  return newErrors;
}

async function storePostImage(
  imageFile: File,
  userId: string
): Promise<{ path: string }> {
  try {
    const imageExt = imageFile.type.split("/")[1];
    const fileName = `${userId}_${uuidv4()}.${imageExt}`;

    const { data: storageFile, error } = await supabase.storage
      .from("next-blog-storage")
      .upload(fileName, imageFile);

    if (error) {
      throw new Error("Error occurred on image upload");
    }

    return storageFile;
  } catch (e) {
    throw new Error("Error occurred on image upload");
  }
}

async function deletePostImage(fileName: string) {
  try {
    const { data, error } = await supabase.storage
      .from("next-blog-storage")
      .remove([fileName]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (e) {
    throw new Error("Error in deleting image");
  }
}
