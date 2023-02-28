import { useCallback, useEffect } from "react";

export const useEscapeKey = (handleClose: () => void) => {
  const handleEscPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscPress, false);
    return () => {
      document.removeEventListener("keydown", handleEscPress, false);
    };
  }, [handleEscPress]);
};
