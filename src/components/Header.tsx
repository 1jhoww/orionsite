import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ScrollProgress } from "./ScrollProgress";

const links = [
  { label: "Início", href: "/", match: (pathname: string) => pathname === "/" },
  { label: "Sobre", href: "/sobre", match: (pathname: string) => pathname === "/sobre" },
  { label: "Portfólio", href: "/portfolio", match: (pathname: string) => pathname.startsWith("/portfolio") },
  { label: "Terceirização", href: "/terceirizacao", match: (pathname: string) => pathname === "/terceirizacao" },
  { label: "FAQ", href: "/faq", match: (pathname: string) => pathname === "/faq" },
] as const;

export function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const close = () => setOpen(false);
    const updateScrollState = () => setScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener("hashchange", close);
    window.addEventListener("popstate", close);
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => {
      window.removeEventListener("hashchange", close);
      window.removeEventListener("popstate", close);
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return () => document.body.classList.remove("menu-open");

    const focusable = [menuButtonRef.current, ...(navigationRef.current?.querySelectorAll("a") ?? [])]
      .filter((element): element is HTMLButtonElement | HTMLAnchorElement => element instanceof HTMLElement);
    const firstNavigationLink = navigationRef.current?.querySelector<HTMLElement>("a");
    const focusTimer = window.setTimeout(() => firstNavigationLink?.focus(), 280);

    const handleMenuKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleMenuKeys);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleMenuKeys);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : "is-top"}`}>
      <div className="container header-inner">
        <Link className="site-logo" to="/#inicio" aria-label="Orion — início">
          <img
            src="/brand/orion-logo-optimized.webp"
            width="1400"
            height="371"
            alt="Orion — Indústria e Comércio de Cosméticos Ltda."
            fetchPriority="high"
          />
        </Link>
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu principal</span>
          <i /><i />
        </button>
        <nav
          ref={navigationRef}
          className={`main-nav ${open ? "is-open" : ""}`}
          id="main-navigation"
          aria-label="Navegação principal"
        >
          {links.map(({ label, href, match }) => (
            <Link key={href} to={href} aria-current={match(pathname) ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <Link className="header-cta" to="/#contato" onClick={() => setOpen(false)}>Contato</Link>
        </nav>
      </div>
      <ScrollProgress />
    </header>
  );
}
