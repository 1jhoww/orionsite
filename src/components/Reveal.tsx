import { ElementType, ReactNode, useEffect, useRef, useState } from "react";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ as: Tag = "div", children, className = "", delay = 0 }: RevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { rootMargin: "0px 0px -7% 0px", threshold: 0.08 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={elementRef}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
