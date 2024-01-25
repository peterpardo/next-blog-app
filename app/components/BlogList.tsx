import BlogCard from "@/components/BlogCard";
import { getPosts } from "@/utils/utils";

export const revalidate = 3600;

export default async function BlogList() {
  const posts = await getPosts();

  return (
    <div>
      {posts.length > 0 ? (
        <div className="grid py-5 grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No posts available</p>
      )}
    </div>
  );
}
