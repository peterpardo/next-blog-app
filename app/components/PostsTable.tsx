"use client";
import TableRow from "@/components/TableRow";
import { postColumns } from "@/utils/postColumns";
import { Post } from "@prisma/client";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

export default function PostsTable({ posts }: { posts: Post[] }) {
  const table = useReactTable({
    data: posts,
    columns: postColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log("rerendering poststable..");

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-b">
      <table className="table-auto min-w-[800px] min-h-[500px] border-collapse text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-2 py-1">Id</th>
            <th className="px-2 py-1">Title</th>
            <th className="px-2 py-1">Image</th>
            <th className="px-2 py-1">Description</th>
            <th className="px-2 py-1">Created At</th>
            <th className="px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <TableRow key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
