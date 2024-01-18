import BlogList from "@/components/BlogList";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="max-w-[1300px] mx-auto px-4">
      <Navbar />
      <BlogList />
    </main>
  );
}
