"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const SubmitBtn = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`${
        pending ? "bg-gray-300" : "bg-green-600 hover:bg-green-500"
      } px-4 py-2 rounded-lg text-white `}
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? "Loading..." : label}
    </button>
  );
};

export default SubmitBtn;
