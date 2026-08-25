import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToLocation() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const targetId = decodeURIComponent(hash.slice(1));
    const scrollToTarget = () => document.getElementById(targetId)?.scrollIntoView();
    const frame = window.requestAnimationFrame(scrollToTarget);
    const fallback = window.setTimeout(scrollToTarget, 60);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
    };
  }, [pathname, hash]);

  return null;
}
