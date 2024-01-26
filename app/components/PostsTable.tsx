"use client";

import { Post } from "@prisma/client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
  });

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-b">
      <table className="table-auto min-w-[800px] min-h-[500px] border-collapse text-left">
        <thead>
          {table.getHeaderGroups()?.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
