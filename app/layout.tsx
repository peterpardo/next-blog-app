import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog App",
  description: "This is a blog app created using Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} h-screen flex flex-col`}>
          <Navbar />
          <main className="max-w-[1400px] mx-auto py-8 px-4">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
