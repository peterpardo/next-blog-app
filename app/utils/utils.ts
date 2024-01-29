import { cache } from "react";
import prisma from "@/utils/db";
import { Post } from "@prisma/client";

export const getPosts = cache(async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
});

export const getPost = async (
  id: string,
  fullDetails = false
): Promise<
  | Post
  | {
      id: number;
      title: string;
      description: string;
      content: string;
      publish: boolean;
      image: string;
    }
  | null
> => {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return fullDetails
    ? post
    : {
        id: post?.id as number,
        title: post?.title as string,
        description: post?.description as string,
        content: post?.content as string,
        publish: post?.published as boolean,
        image: post?.image as string,
      };
};
