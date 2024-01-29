import React from "react";

type ToolbarBtnProps = {
  onClick: () => void;
  disabled?: boolean;
  pressed?: boolean;
  children?: React.ReactNode;
};

export default function ToolbarBtn({
  onClick,
  disabled = false,
  pressed,
  children,
}: ToolbarBtnProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`p-2 rounded ${pressed ? "bg-slate-200" : ""}`}
    >
      {children}
    </button>
  );
}
