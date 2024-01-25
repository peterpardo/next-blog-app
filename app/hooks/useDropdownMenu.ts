import { useEffect, useState } from "react";

export const useDropdownMenu = (ref: any) => {
  const [isClicked, setisClicked] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        isClicked &&
        !ref.current.contains(event.target as Node)
      ) {
        setisClicked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isClicked]);

  return { isClicked, setisClicked };
};
