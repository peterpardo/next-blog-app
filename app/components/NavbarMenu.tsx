"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useDropdownMenu } from "app/hooks/useDropdownMenu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function NavbarMenu() {
  const clerk = useClerk();
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const { isClicked, setIsClicked } = useDropdownMenu(menuRef);

  if (!isLoaded) return null;

  return (
    <div>
      {isSignedIn ? (
        <div className="flex items-center gap-x-2 md:gap-x-5">
          <Link
            href="/my-posts"
            className="text-xs hover:border-b-2 border-green-600 md:text-base"
          >
            My Posts
          </Link>

          <div ref={menuRef} className="relative cursor-pointer">
            <Image
              src={user.imageUrl}
              alt="profile image"
              width={40}
              height={40}
              className="rounded-full"
              onClick={() => setIsClicked((prevState) => !prevState)}
            />

            {isClicked && (
              <div className="absolute w-40 top-[110%] right-0 bg-white shadow-lg">
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
