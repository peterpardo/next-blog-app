"use client"; // important when setting columns for tanstack table

import { supabase } from "@/utils/storage";
import { Post } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const columnHelper = createColumnHelper<Post>();

export const postColumns = [
  columnHelper.accessor("id", {
    header: "Post Id",
    cell: (props) => {
      return <div className="text-center">{props.getValue()}</div>;
    },
  }),
  columnHelper.accessor("title", {
    header: "Title",
    cell: (props) => {
      return <div className="max-w-72">{props.getValue()}</div>;
    },
  }),
  columnHelper.accessor("image", {
    header: "Image",
    cell: (props) => {
      const { data } = supabase.storage
        .from("next-blog-storage")
        .getPublicUrl(props.getValue());

      return (
        <Image
          src={data.publicUrl}
          alt={props.row.original.title}
          width={200}
          height={200}
          loading="lazy"
        />
      );
    },
  }),
  columnHelper.accessor("published", {
    header: "Published",
    cell: (props) => {
      const published = props.getValue();

      if (published) {
        return (
          <span className="bg-green-600 px-2 py-1 rounded-lg text-sm text-white">
            published
          </span>
        );
      } else {
        return (
          <span className="bg-slate-200 px-2 py-1 rounded-lg text-sm text-slate-600">
            not published
          </span>
        );
      }
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (props) => {
      const formattedDate = dayjs(props.getValue()).format("MMM D, YYYY");
      return formattedDate;
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => {
      const id = props.row.original.id;

      return (
        <div className="flex items-center gap-x-2">
          <Link
            href={`/my-posts/${id}/edit`}
            className="px-2 py-1 rounded-lg text-xs bg-slate-100 text-gray-600 hover:bg-slate-50"
          >
            edit
          </Link>
          <button
            onClick={() => console.log("Delete: ", props.row.original.id)}
            className="px-2 py-1 rounded-lg text-xs bg-slate-100 text-gray-600 hover:bg-slate-50"
          >
            delete
          </button>
        </div>
      );
    },
  }),
];
