"use client";

import NavbarMenu from "@/components/NavbarMenu";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-10 bg-white bg-opacity-95 w-full flex items-center justify-between py-4 px-8 shadow">
      <Link href="/" className="text-xl font-bold text-green-600">
        Blog App
      </Link>
      <NavbarMenu />
    </nav>
  );
}
