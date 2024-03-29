import { supabase } from "@/utils/storage";
import { Post } from "@prisma/client";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";

export default function BlogCard({ post }: { post: Post }) {
  const { data } = supabase.storage
    .from("next-blog-storage")
    .getPublicUrl(post.image);

  const formattedDate = dayjs(post.createdAt).format("MMM D, YYYY");
  const formattedTitle =
    post.title.length > 73 ? `${post.title.slice(0, 73)}...` : post.title;
  const formattedDescription =
    post.description.length > 30 ? (
      <>
        {post.description.slice(0, 30)}...{" "}
        <Link
          href={`/posts/${post.id}`}
          className="text-blue-600 hover:text-blue-500"
        >
          read more
        </Link>
      </>
    ) : (
      post.description
    );

  return (
    <div className="max-w-96 max-h-[450px] mx-auto rounded-lg shadow-lg">
      <div className="overflow-hidden rounded-t-lg">
        <Link href={`/posts/${post.id}`}>
          <Image
            src={data?.publicUrl}
            alt={post.title}
            width={500}
            height={500}
            className="w-full h-[250px] object-cover transition ease-in-out delay-75 hover:scale-110"
          />
        </Link>
      </div>
      <div className="p-4">
        <h1 className="font-bold text-lg">{formattedTitle}</h1>
        <p className="text-sm text-gray-500">
          By {post.authorName} - {formattedDate}
        </p>
        <p className="text-sm mt-2">{formattedDescription}</p>
      </div>
    </div>
  );
}
