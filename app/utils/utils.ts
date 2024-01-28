import { cache } from "react";
import prisma from "@/utils/db";

export const getPosts = cache(async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
});

export const getPost = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return {
    id: post?.id,
    title: post?.title as string,
    description: post?.description as string,
    content: post?.content as string,
    publish: post?.published as boolean,
    image: post?.image as string,
  };
};
