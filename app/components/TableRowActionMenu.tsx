"use client";

export default function TableRowActionMenu() {
  return (
    <>
      <div className="flex items-center gap-x-2">
        <button className="px-2 py-1 rounded-lg text-xs bg-slate-100 text-gray-600 hover:bg-slate-50">
          edit
        </button>
        <button className="px-2 py-1 rounded-lg text-xs bg-slate-100 text-gray-600 hover:bg-slate-50">
          delete
        </button>
      </div>

      {/* <div className="absolute inset-0 bg-slate-50 bg-opacity-20">Text</div> */}
    </>
  );
}
