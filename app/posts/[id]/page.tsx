import PostContent from "@/components/PostContent";
import { supabase } from "@/utils/storage";
import { getPost } from "@/utils/utils";
import { Post } from "@prisma/client";
import dayjs from "dayjs";
import Image from "next/image";

export default async function Post({ params }: { params: { id: string } }) {
  const post = (await getPost(params.id, true)) as Post;
  const { data } = supabase.storage
    .from("next-blog-storage")
    .getPublicUrl(post.image);
  const formattedDate = dayjs(post.createdAt).format("MMM D, YYYY");

  return (
    <div className="max-w-[700px] mx-auto space-y-5">
      <h1 className="text-5xl font-bold">{post?.title}</h1>
      <div className="flex items-center gap-x-5">
        <Image
          src={post?.authorImage as string}
          alt="author image"
          width={40}
          height={40}
          className="w-auto rounded-full"
        />
        <div>
          <p>{post.authorName}</p>
          <span className="text-slate-400 text-sm">{formattedDate}</span>
        </div>
      </div>
      <div className="space-y-5">
        <p className="text-slate-500">{post.description}</p>
        <Image
          src={data?.publicUrl}
          alt="post image"
          width={700}
          height={700}
          className="w-auto"
        />
        <PostContent content={post.content} />
      </div>
    </div>
  );
}
