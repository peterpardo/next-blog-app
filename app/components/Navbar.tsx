"use client";

import NavbarMenu from "@/components/NavbarMenu";
import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-8 shadow">
      <Link href="/" className="text-xl font-bold text-green-600">
        Blog App
      </Link>
      <NavbarMenu />
    </nav>
  );
}
