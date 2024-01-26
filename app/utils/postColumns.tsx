import { Post } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Post>();

export const postColumns = [
  columnHelper.accessor("id", {
    header: "Post Id",
    cell: (props) => <p>{props.getValue()}</p>,
  }),
  columnHelper.accessor("title", {
    header: "Title",
    cell: (props) => <p>{props.getValue()}</p>,
  }),
  columnHelper.accessor("image", {
    header: "Image",
    cell: (props) => <p>{props.getValue()}</p>,
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (props) => <p>{props.getValue()}</p>,
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (props) => <p>{props.getValue().toString()}</p>,
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => <p>Action button</p>,
  }),
];
