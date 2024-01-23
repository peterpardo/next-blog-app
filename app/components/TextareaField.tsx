import React, { useEffect, useRef } from "react";

export type TextareaField = {
  label: string;
  name: string;
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextareaField = ({
  label,
  value,
  id,
  onChange,
  ...rest
}: TextareaField) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current && value) {
      textareaRef.current.value = value;
    }
  }, [value]);

  return (
    <div className="w-full space-y-2">
      <label htmlFor={id} className="block">
        {label}
      </label>
      <textarea
        ref={textareaRef}
        className="rounded border w-full min-h-48"
        id={id}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default TextareaField;
