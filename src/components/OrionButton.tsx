import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type OrionButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
  target?: "_blank";
  rel?: string;
};

export function OrionButton({ href, children, variant = "primary", className = "", target, rel }: OrionButtonProps) {
  const classes = `button button--${variant} ${className}`.trim();
  if (href.startsWith("/")) {
    return <Link className={classes} to={href}>{children}</Link>;
  }
  return <a className={classes} href={href} target={target} rel={rel}>{children}</a>;
}
