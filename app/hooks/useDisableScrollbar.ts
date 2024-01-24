import { useEffect, useState } from "react";

export const useDisableScrollbar = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (isDisabled) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDisabled]);

  return { isDisabled, setIsDisabled };
};
