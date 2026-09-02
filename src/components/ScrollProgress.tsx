import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function ScrollProgress() {
  const { pathname } = useLocation();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame: number | null = null;

    const updateProgress = () => {
      animationFrame = null;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = document.documentElement.clientHeight;
      const scrollableHeight = Math.max(documentHeight - viewportHeight, 0);
      const rawProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      const percentage = Math.round(progress * 100);

      progressRef.current?.style.setProperty("--page-scroll-progress", progress.toString());
      progressRef.current?.setAttribute("aria-valuenow", percentage.toString());
    };

    const scheduleUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(scheduleUpdate);
    resizeObserver?.observe(document.documentElement);

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver?.disconnect();
    };
  }, [pathname]);

  return (
    <div
      className="page-scroll-progress"
      ref={progressRef}
      role="progressbar"
      aria-label="Progresso da página"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    >
      <span />
    </div>
  );
}
