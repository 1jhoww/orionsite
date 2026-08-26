import { useEffect, useRef, useState } from "react";

type AnimatedMetricProps = {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
  /** Stagger, in milliseconds, applied after the section actually enters the reading area. */
  delay?: number;
  /** Total count duration in milliseconds. */
  duration?: number;
};

/**
 * The observer intentionally shrinks the viewport from the bottom (rootMargin) and asks for a
 * large visible ratio, so the count starts when the figure is inside the reading area — not when
 * it first peeks over the fold right below the hero.
 */
const OBSERVER_OPTIONS: IntersectionObserverInit = {
  rootMargin: "0px 0px -22% 0px",
  threshold: 0.45,
};

export function AnimatedMetric({
  value,
  suffix = "",
  label,
  className = "",
  delay = 0,
  duration = 1600,
}: AnimatedMetricProps) {
  const prefersReducedMotion = typeof window !== "undefined"
    && Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  const canAnimate = typeof window !== "undefined"
    && "IntersectionObserver" in window
    && !prefersReducedMotion;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [displayValue, setDisplayValue] = useState(canAnimate ? 0 : value);
  const [animationState, setAnimationState] = useState<"waiting" | "running" | "complete" | "reduced">(
    prefersReducedMotion ? "reduced" : canAnimate ? "waiting" : "complete",
  );

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    if (!canAnimate) return;

    let animationFrame = 0;
    let startTimer = 0;

    const runCount = () => {
      setAnimationState("running");

      let startTime: number | null = null;
      const animate = (time: number) => {
        if (startTime === null) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        // Gentle ease-out: readable acceleration instead of an instant jump to the final value.
        const eased = 1 - Math.pow(1 - progress, 2.4);
        setDisplayValue(Math.round(value * eased));

        if (progress < 1) animationFrame = window.requestAnimationFrame(animate);
        else setAnimationState("complete");
      };

      animationFrame = window.requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (delay > 0) startTimer = window.setTimeout(runCount, delay);
      else runCount();
    }, OBSERVER_OPTIONS);

    observer.observe(element);
    return () => {
      observer.disconnect();
      window.clearTimeout(startTimer);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [canAnimate, delay, duration, value]);

  const progress = value > 0 ? Math.min(displayValue / value, 1) : 1;

  return (
    <div
      className={`animated-metric ${className}`.trim()}
      data-animation-state={animationState}
      data-final-value={`${value}${suffix}`}
      ref={rootRef}
    >
      <span className="animated-metric-value" aria-hidden="true">{displayValue}{suffix}</span>
      <span className="sr-only">{value}{suffix}</span>
      <span className="animated-metric-label">{label}</span>
      <span
        className="animated-metric-rule"
        aria-hidden="true"
        style={{ "--metric-progress": `${progress * 100}%` } as React.CSSProperties}
      />
    </div>
  );
}
