import BlogCard from "@/components/BlogCard";
import prisma from "@/utils/db";

export default async function BlogList() {
  const posts = await prisma.post.findMany();

  return (
    <div className="grid py-5 grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      {posts.length > 0 ? (
        posts.map((post) => (
          <>
            <BlogCard
              key={post.id}
              title={post.title}
              description={post.description}
              author={post.authorId}
            />
          </>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}
