import BlogCard from "@/components/BlogCard";

export default function BlogList() {
  return (
    <div className="grid py-5 grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
}
