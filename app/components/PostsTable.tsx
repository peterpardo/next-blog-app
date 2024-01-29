"use client";

import { Post } from "@prisma/client";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  RowData,
} from "@tanstack/react-table";
import { deletePost } from "app/actions";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    deletePost: (postId: number) => void;
  }
}

export default function PostsTable({
  data,
  columns,
}: {
  data: Post[];
  columns: any;
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize: 3,
      },
    },

    meta: {
      deletePost: async (postId: number) => {
        if (confirm("Are you sure you want to delete this post?")) {
          await deletePost(postId);
          alert("Post deleted.");
        }
      },
    },
  });

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-b p-2">
      <table className="table-auto w-full min-w-[800px] min-h-[500px] border-collapse text-left">
        <thead>
          {table.getHeaderGroups()?.map((headerGroup) => (
            <tr className="bg-slate-100" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="px-2 py-1" key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="px-2 py-1" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end items-center gap-2">
        <button
          className="border rounded px-4 py-2"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded px-4 py-2"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
    </div>
  );
}
