import { useEffect, useState } from "react";

export default function useCheckScreen() {
  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 992px)").matches
  );

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => {
      setIsMobileView(e.matches);
    };
    window.matchMedia("(max-width: 992px)").addEventListener("change", handler);
  }, []);

  return isMobileView;
}
