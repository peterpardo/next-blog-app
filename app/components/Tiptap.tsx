"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Tiptap = {
  data: string;
  onChange: (value: string) => void;
};

const Tiptap = ({ data, onChange }: Tiptap) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: data,
    editorProps: {
      attributes: {
        class:
          "border border-black rounded focus:outline-blue-500 px-4 py-2 min-h-48",
      },
    },
    onUpdate: (props) => {
      const html = props.editor.getHTML();
      onChange(html);
    },
  });

  return (
    <div className="w-full space-y-2">
      <label className="block">Content</label>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
