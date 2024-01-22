"use client";

import React, { useEffect, useRef } from "react";

export type TextField = {
  label: string;
  name: string;
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextField = ({ label, value, id, onChange, ...rest }: TextField) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && value) {
      inputRef.current.value = value;
    }
  }, [value]);

  return (
    <div className="w-full space-y-2">
      <label htmlFor={id} className="block">
        {label}
      </label>
      <input
        ref={inputRef}
        className="rounded border w-full"
        id={id}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default TextField;
