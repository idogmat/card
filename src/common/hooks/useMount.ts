import { useEffect, useState } from "react";

export const useMount = (opened: boolean) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (opened && !mounted) {
      setMounted(true);
      return;
    }

    setTimeout(() => setMounted(false), 300);
  }, [opened]);

  return { mounted };
};
