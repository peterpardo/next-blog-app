import { supabase } from "@/utils/storage";
import { Post } from "@prisma/client";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";

export default function TableRow({ post }: { post: Post }) {
  const { data } = supabase.storage
    .from("next-blog-storage")
    .getPublicUrl(post.image);
  const formattedDescription =
    post.description.length > 30
      ? `${post.description.slice(0, 30)}...`
      : post.description;
  const formattedDate = dayjs(post.createdAt).format("MMM D, YYYY");

  return (
    <tr key={post.id}>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>
        <Image src={data.publicUrl} alt={post.title} width={200} height={200} loading="lazy"/>
      </td>
      <td>{formattedDescription}</td>
      <td>{formattedDate}</td>
      <td>
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
  );
}
