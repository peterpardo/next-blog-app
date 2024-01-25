import TableRow from "@/components/TableRow";
import { getPosts } from "@/utils/utils";
import React from "react";

export default async function PostsTable() {
  const posts = await getPosts();

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Image</th>
          <th>Description</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <TableRow key={post.id} post={post} />
        ))}
      </tbody>
    </table>
  );
}
