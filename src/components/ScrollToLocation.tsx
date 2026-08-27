import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const SCROLL_POSITIONS_KEY = "orion:scroll-positions";

function readPositions() {
  try {
    const stored = window.sessionStorage.getItem(SCROLL_POSITIONS_KEY);
    return stored ? JSON.parse(stored) as Record<string, number> : {};
  } catch {
    return {};
  }
}

function readPosition(key: string) {
  const value = readPositions()[key];
  return Number.isFinite(value) ? value : undefined;
}

function savePosition(key: string, value: number) {
  try {
    const positions = readPositions();
    positions[key] = Math.max(0, Math.round(value));
    window.sessionStorage.setItem(SCROLL_POSITIONS_KEY, JSON.stringify(positions));
  } catch {
    // Navigation must keep working when storage is unavailable or full.
  }
}

function targetIdFromHash(hash: string) {
  const value = hash.slice(1);
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function ScrollToLocation() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const previousPathname = useRef<string | null>(null);

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useLayoutEffect(() => {
    const isSamePageHash = previousPathname.current === pathname;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let latestY = window.scrollY;
    let frame = 0;
    let fallback = 0;

    const rememberPosition = () => {
      latestY = window.scrollY;
    };

    const scrollToHash = () => {
      const target = document.getElementById(targetIdFromHash(hash));
      if (!target) return false;

      target.scrollIntoView({
        behavior: isSamePageHash && !reducedMotion ? "smooth" : "auto",
        block: "start",
      });
      latestY = window.scrollY;
      return true;
    };

    if (hash) {
      if (!scrollToHash()) {
        frame = window.requestAnimationFrame(() => {
          if (!scrollToHash()) fallback = window.setTimeout(scrollToHash, 80);
        });
      }
    } else {
      const restored = navigationType === "POP" ? readPosition(key) : undefined;
      const top = restored ?? 0;
      window.scrollTo({ top, left: 0, behavior: "auto" });
      latestY = top;
    }

    previousPathname.current = pathname;
    window.addEventListener("scroll", rememberPosition, { passive: true });


    return () => {
      window.removeEventListener("scroll", rememberPosition);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
      savePosition(key, latestY);
    };
  }, [hash, key, navigationType, pathname]);

  return null;
}
