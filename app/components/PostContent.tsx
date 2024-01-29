"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

type PostContentProps = {
  content: string;
};

export default function PostContent({ content }: PostContentProps) {
  const [editable, setEditable] = useState(false);
  const editor = useEditor({
    editable,
    content,
    editorProps: {
      attributes: {
        class: "prose max-w-full",
      },
    },
    extensions: [StarterKit],
  });

  useEffect(() => {
    if (!editor) {
      return undefined;
    }

    editor.setEditable(editable);
  }, [editor, editable]);

  return <EditorContent editor={editor} />;
}
