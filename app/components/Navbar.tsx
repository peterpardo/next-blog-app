import Link from "next/link";

export default function Navbar() {
  const isAuthenticated = false;

  return (
    <nav className="w-full flex items-center justify-between py-4">
      <Link href="/" className="text-xl font-bold text-green-600">
        Blog App
      </Link>
      <div>
        {isAuthenticated ? (
          <div className="flex items-center gap-x-5">
            <Link href="/" className="hover:border-b-2 border-green-600">
              My Posts
            </Link>
            <Link href="/">
              <div className="rounded-full w-10 h-10 bg-gray-200"></div>
            </Link>
          </div>
        ) : (
          <Link
            href="/"
            className="px-4 py-1 rounded-lg bg-green-600 text-white hover:bg-green-500"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
