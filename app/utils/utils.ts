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
