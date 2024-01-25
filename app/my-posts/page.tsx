import Link from "next/link";

export default function MyPosts() {
  return (
    <div className="w-full space-y-5">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-semibold text-lg">My Posts</h1>
        <Link
          href="/create-post"
          className="text-xs bg-green-600 rounded-lg px-3 py-2 text-white hover:bg-green-500 md:text-base md:px-4"
        >
          Create Post
        </Link>
      </div>
    </div>
  );
}
