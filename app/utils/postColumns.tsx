import { Post } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const postColumns: ColumnDef<Post>[] = [
  {
    header: "Post Id",
    accessorKey: "id",
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Image",
    accessorKey: "image",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
  },
  {
    id: "action",
    cell: ({ row }) => {
      return <button>edit {row.original.id}</button>;
    },
  },
];
