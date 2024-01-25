import { supabase } from "@/utils/storage";
import { Post } from "@prisma/client";
import Image from "next/image";
import dayjs from "dayjs";

export default function BlogCard({ post }: { post: Post }) {
  const { data } = supabase.storage
    .from("next-blog-storage")
    .getPublicUrl(post.image);
  const formattedDate = dayjs(post.createdAt).format("MMM D, YYYY");

  return (
    <div className="max-w-96 max-h-[400px] mx-auto rounded-lg shadow-lg">
      <Image
        src={data.publicUrl}
        alt={post.title}
        width={500}
        height={500}
        className="rounded-t-lg"
      />
      <div className="p-4">
        <h1 className="font-bold text-lg">{post.title}</h1>
        <p className="text-sm text-gray-500">
          By {post.authorName} - {formattedDate}
        </p>
        <p className="text-sm mt-2">{post.description}</p>
      </div>
    </div>
  );
}
