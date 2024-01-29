"use client";

import Toolbar from "@/components/Toolbar";
import BulletList from "@tiptap/extension-bullet-list";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type TiptapProps = {
  data: string;
  onChange: (value: string) => void;
};

const Tiptap = ({ data, onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: data,
    editorProps: {
      attributes: {
        class:
          "mx-auto prose border border-black rounded focus:outline-blue-500 px-4 py-2",
      },
    },
    onUpdate: (props) => {
      const html = props.editor.getHTML();
      onChange(html);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full space-y-2">
      <label className="block">Content</label>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="w-full" />
    </div>
  );
};

export default Tiptap;
