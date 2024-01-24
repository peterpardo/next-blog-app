import React, { useEffect, useRef } from "react";

type CheckboxField = {
  label: string;
  name: string;
  id: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxFIeld = ({
  label,
  name,
  id,
  checked = false,
  onChange,
}: CheckboxField) => {
  return (
    <div className="flex items-center gap-x-2">
      <label htmlFor={id}>{label}</label>
      <input
        className="rounded"
        name={name}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default CheckboxFIeld;
