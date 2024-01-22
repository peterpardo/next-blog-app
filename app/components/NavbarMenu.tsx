"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NavbarMenu() {
  const clerk = useClerk();
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [isClicked, setisClicked] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        isClicked &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setisClicked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, isClicked]);

  if (!isLoaded) return null;

  return (
    <div>
      {isSignedIn ? (
        <div className="flex items-center gap-x-2 md:gap-x-5">
          <Link
            href="/"
            className="text-xs hover:border-b-2 border-green-600 md:text-base"
          >
            My Posts
          </Link>

          <Link
            href="/create-post"
            className="text-xs bg-green-600 rounded-lg px-3 py-2 text-white hover:bg-green-500 md:text-base md:px-4"
          >
            Create Post
          </Link>

          <div ref={menuRef} className="relative cursor-pointer">
            <Image
              src={user.imageUrl}
              alt="profile image"
              width={40}
              height={40}
              className="rounded-full"
              onClick={() => setisClicked((prevState) => !prevState)}
            />

            {isClicked && (
              <div className="absolute w-40 top-[110%] right-0 bg-white shadow-lg">
                <div className="text-sm px-3 cursor-pointer py-1 hover:bg-gray-100">
                  Settings
                </div>
                <div
                  onClick={() => clerk.signOut(() => router.push("/"))}
                  className="text-sm px-3 cursor-pointer py-1 hover:bg-gray-100"
                >
                  Sign Out
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={() => clerk.openSignIn({})}
          className="px-4 py-1 rounded-lg bg-green-600 text-white hover:bg-green-500"
        >
          Login
        </button>
      )}
    </div>
  );
}
