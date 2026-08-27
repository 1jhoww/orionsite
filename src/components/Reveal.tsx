import { useEffect, useRef, useState, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from "react";

const observerOptions: IntersectionObserverInit = {
  rootMargin: "0px 0px -7% 0px",
  threshold: 0.08,
};

const revealCallbacks = new Map<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

function releaseObserverIfIdle() {
  if (revealCallbacks.size === 0 && sharedObserver) {
    sharedObserver.disconnect();
    sharedObserver = null;
  }
}

function getSharedObserver() {
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      const reveal = revealCallbacks.get(entry.target);
      revealCallbacks.delete(entry.target);
      sharedObserver?.unobserve(entry.target);
      reveal?.();
    }
    releaseObserverIfIdle();
  }, observerOptions);

  return sharedObserver;
}

function observeReveal(element: Element, reveal: () => void) {
  revealCallbacks.set(element, reveal);
  getSharedObserver().observe(element);

  return () => {
    revealCallbacks.delete(element);
    sharedObserver?.unobserve(element);
    releaseObserverIfIdle();
  };
}

function prefersReducedMotion() {
  return typeof window !== "undefined"
    && typeof window.matchMedia === "function"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isAlreadyInReadingArea(element: HTMLElement) {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  if (!viewportHeight) return false;

  const bounds = element.getBoundingClientRect();
  return bounds.bottom > 0 && bounds.top < viewportHeight * 0.93;
}

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style">;

export function Reveal({
  as,
  children,
  className = "",
  delay = 0,
  ...rest
}: RevealProps) {
  const Tag = as ?? "div";
  const elementRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (
      prefersReducedMotion()
      || typeof IntersectionObserver === "undefined"
      || isAlreadyInReadingArea(element)
    ) {
      setVisible(true);
      return;
    }

    return observeReveal(element, () => setVisible(true));
  }, []);

  return (
    <Tag
      {...rest}
      ref={elementRef}
      className={["reveal", visible && "is-visible", className].filter(Boolean).join(" ")}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
