"use client"; // important when setting columns for tanstack table

import { supabase } from "@/utils/storage";
import { Post } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import Image from "next/image";

const columnHelper = createColumnHelper<Post>();

export const postColumns = [
  columnHelper.accessor("id", {
    header: "Post Id",
  }),
  columnHelper.accessor("title", {
    header: "Title",
  }),
  columnHelper.accessor("image", {
    header: "Image",
    cell: (info) => {
      const { data } = supabase.storage
        .from("next-blog-storage")
        .getPublicUrl(info.getValue());

      return (
        <Image
          src={data.publicUrl}
          alt={info.row.original.title}
          width={200}
          height={200}
          loading="lazy"
        />
      );
    },
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => {
      const desc = info.getValue();
      const formattedDescription =
        desc.length > 30 ? `${desc.slice(0, 30)}...` : desc;

      return formattedDescription;
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => {
      const formattedDate = dayjs(info.getValue()).format("MMM D, YYYY");
      return formattedDate;
    },
  }),
];
