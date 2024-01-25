import TableRowActionMenu from "@/components/TableRowActionMenu";
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
    <tr key={post.id} className="border-b">
      <td className="px-2 py-1 w-20">{post.id}</td>
      <td className="px-2 py-1">{post.title}</td>
      <td className="px-2 py-1">
        <Image
          src={data.publicUrl}
          alt={post.title}
          width={200}
          height={200}
          loading="lazy"
        />
      </td>
      <td className="px-2 py-1">{formattedDescription}</td>
      <td className="px-2 py-1">{formattedDate}</td>
      <td className="px-2 py-1">
        <TableRowActionMenu />
      </td>
    </tr>
  );
}
