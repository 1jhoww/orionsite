import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HelmetProvider } from "react-helmet-async";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router-dom";
import { AppRoutes } from "../src/App";
import { AnimatedMetric } from "../src/components/AnimatedMetric";
import { outsourcingHeroStages } from "../src/components/OutsourcingHero";
import { Reveal } from "../src/components/Reveal";
import { buildWhatsAppUrl, ORION_WHATSAPP_NUMBER, validateContactPayload } from "../src/lib/contact";
import siteConfig from "../site.config.json";
import { CONSENT_STORAGE_KEY } from "../src/data/legal";

/** Canonical/OG URLs must use the official domain, never the rendering host. */
const SITE_ORIGIN = siteConfig.siteUrl;

function renderRoute(path = "/") {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

function renderNavigation(initialEntries = ["/"], initialIndex = initialEntries.length - 1) {
  const router = createMemoryRouter(
    [{ path: "*", element: <AppRoutes /> }],
    { initialEntries, initialIndex },
  );

  return {
    router,
    ...render(
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>,
    ),
  };
}

afterEach(() => {
  cleanup();
  sessionStorage.clear();
  localStorage.clear();
  vi.clearAllMocks();
  document.title = "";
  document.head.querySelectorAll("meta, link[rel='canonical']").forEach((element) => element.remove());
});

describe("Orion institutional SPA", () => {
  it("renders the industrial home, category portfolio entry and preserved core sections", () => {
    renderRoute();

    expect(screen.getByRole("heading", { level: 1, name: "Indústria que transforma desenvolvimento em produto." })).toBeTruthy();
    expect(screen.getByText("Soluções para diferentes etapas do cuidado pet.")).toBeTruthy();
    expect(screen.getByText("Ciência e tecnologia em cada etapa.")).toBeTruthy();
    expect(screen.getByText("Um caminho claro, do briefing ao produto.")).toBeTruthy();
    expect(screen.getByText("A estrutura da Orion fica em Vargem Grande Paulista.")).toBeTruthy();
    expect(document.querySelector(".contact-form")).toBeNull();
    // Without a stored consent the Google frame must not be in the document.
    expect(document.querySelector(".location-map iframe")).toBeNull();
    expect(document.querySelector(".location-map-placeholder")).toBeTruthy();
    expect(screen.getByText("Rua Hawai, 77")).toBeTruthy();
    expect(screen.getByText("CEP 06739-064")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Explorar portfólio" }).getAttribute("href")).toBe("/portfolio");
    expect(screen.getByText("Documentação e registro")).toBeTruthy();
    expect(screen.getByText("Identidade visual")).toBeTruthy();
    expect(document.querySelectorAll(".trust-point-icon svg")).toHaveLength(6);
    expect(document.querySelector(".home-metrics .animated-metric")?.getAttribute("data-final-value")).toBe("500+");
    expect(document.querySelector(".industrial-hero + .home-metrics")).toBeTruthy();
    expect(document.querySelector(".home-metrics + .trust")).toBeTruthy();
    expect(document.querySelector(".trust + .home-portfolio")).toBeTruthy();
    expect(document.querySelector('.home-portfolio img[src="/brand/orion-constellation.png"]')).toBeNull();
    expect(document.querySelectorAll('a[href^="/portfolio/"]')).toHaveLength(0);
    // Mobile reads the method as plain document flow: one entry per stage, nothing pinned.
    expect(document.querySelectorAll(".method-mobile-entry")).toHaveLength(3);
    expect(document.querySelector(".method-mobile-sticky")).toBeNull();
    expect(document.querySelector(".method-mobile-trigger")).toBeNull();
    expect(document.querySelector(".method-scroll-sticky")).toBeTruthy();
    expect(document.querySelector("script[type='application/ld+json']")?.textContent).toContain('"@type":"Organization"');
  });

  it("presents both confirmed figures in the Home scale band", () => {
    renderRoute();

    const figures = [...document.querySelectorAll(".home-metrics-figure .animated-metric")];
    expect(figures.map((figure) => figure.getAttribute("data-final-value"))).toEqual(["500+", "4+"]);
    expect(screen.getByText("SKUs desenvolvidos")).toBeTruthy();
    expect(screen.getByText("Anos de mercado")).toBeTruthy();
    // The final value is what assistive technology reads, never the intermediate frames.
    expect([...document.querySelectorAll(".home-metrics-figure .sr-only")].map((node) => node.textContent))
      .toEqual(["500+", "4+"]);
    expect(document.querySelectorAll(".home-metrics-figure .animated-metric-value[aria-hidden='true']")).toHaveLength(2);
  });

  it("gives the Home portfolio call a category index and a logo marquee without badges", () => {
    renderRoute();

    expect(document.querySelectorAll(".home-portfolio-index-link")).toHaveLength(5);
    expect(screen.getByRole("tab", { name: "Condicionadores" })).toBeTruthy();
    expect(document.querySelector(".home-portfolio-stage img")).toBeTruthy();
    expect(document.querySelector(".home-portfolio + .brand-marquee--home")).toBeTruthy();
    expect(document.querySelectorAll(".brand-marquee--home .brand-marquee-item")).toHaveLength(18);
    expect(
      [...document.querySelectorAll<HTMLElement>(".brand-marquee--home .brand-marquee-group:first-child .brand-marquee-item")]
        .map((item) => item.dataset.brand),
    ).toEqual([
      "AtualPet",
      "The Luxe",
      "Quality Pet",
      "Dream Color",
      "Zoom",
      "+Dog",
      "Dream Color Care",
      "Vanity Pet",
      "Dez Pet",
    ]);
    expect(
      document.querySelector<HTMLImageElement>('.brand-marquee-item[data-brand="Quality Pet"] img')
        ?.getAttribute("src"),
    ).toBe("/brand/quality-pet-logo.png");
    expect(document.querySelectorAll(".brand-marquee-item figcaption")).toHaveLength(0);
    expect(document.querySelector(".brand-marquee .sr-only")?.textContent).not.toMatch(/Marca:|Linha:/);
    expect(document.querySelector(".home-portfolio-showcase img[src*='orion-constellation']")).toBeNull();
  });

  it("presents the six industrial capabilities as coexisting areas, never as a sequence", () => {
    renderRoute();

    const capabilities = document.querySelector(".trust-capabilities")!;
    expect(capabilities).toBeTruthy();
    expect(document.querySelectorAll(".trust-capability")).toHaveLength(6);
    expect(document.querySelector(".trust-matrix")).toBeNull();
    expect(
      [...document.querySelectorAll(".trust-capability h3")].map((heading) => heading.textContent),
    ).toEqual([
      "Desenvolvimento e formulação",
      "Documentação e registro",
      "Produção",
      "Envase",
      "Identidade visual",
      "Entrega e logística",
    ]);

    // Nothing may imply an order: no ordered list, no markers, no connectors.
    expect(capabilities.tagName).toBe("UL");
    expect(document.querySelector(".trust-flow")).toBeNull();
    expect(document.querySelector(".trust-stage-marker")).toBeNull();
    expect(capabilities.textContent).not.toMatch(/\b0[1-6]\b/);
    expect(capabilities.getAttribute("aria-label")).not.toMatch(/etapa/i);

    const globalStyles = readFileSync("src/styles/globals.css", "utf8");
    expect(globalStyles).not.toMatch(/\.trust-flow|\.trust-stage/);
    // A plain 3x2 grid: every block shares one structure, and no rule positions an
    // individual capability, so the layout stays predictable.
    expect(globalStyles).toMatch(/\.trust-capabilities\s*\{[^}]*grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/s);
    expect(globalStyles).toMatch(/\.trust-capability\s*\{[^}]*border: 1px solid var\(--rule\)/s);
    expect(globalStyles).not.toMatch(/\.trust-capability:nth-child/);
    expect(globalStyles).not.toMatch(/\.trust-capabilit(y|ies)[^{]*\{[^}]*(box-shadow|gradient|backdrop-filter)/s);
  });

  it("switches the Home portfolio category by tap, not by hover", () => {
    renderRoute();

    const tabs = screen.getAllByRole("tab", { name: /Shampoos|Condicionadores|Máscaras|Perfumes|Cuidados/ });
    expect(tabs).toHaveLength(5);
    expect(screen.getByRole("tablist", { name: "Categorias" })).toBeTruthy();

    // A category is already selected when the page opens.
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
    expect(tabs[0].getAttribute("tabindex")).toBe("0");
    const stage = () => document.querySelector(".home-portfolio-stage-name")?.textContent;
    const stageLink = () => document.querySelector<HTMLAnchorElement>(".home-portfolio-stage-copy a")?.getAttribute("href");
    expect(stage()).toBe("Shampoos");
    expect(stageLink()).toBe("/portfolio#shampoos");

    // A plain click — no pointer hover involved — swaps image, name, copy and link.
    fireEvent.click(tabs[1]);
    expect(tabs[1].getAttribute("aria-selected")).toBe("true");
    expect(tabs[0].getAttribute("aria-selected")).toBe("false");
    expect(stage()).toBe("Condicionadores");
    expect(stageLink()).toBe("/portfolio#condicionadores");
    expect(document.querySelector<HTMLImageElement>(".home-portfolio-stage img")?.getAttribute("src"))
      .toContain("condicionadores-orion-portfolio");
    expect(document.querySelector(".home-portfolio-stage-copy p")?.textContent).toContain("condicionamento");

    // Keyboard focus reaches the same control and selects the same way.
    fireEvent.focus(tabs[3]);
    expect(stage()).toBe("Perfumes");

    // The desktop hover remains available, and the tab pattern supports arrows.
    fireEvent.mouseEnter(tabs[2]);
    expect(stage()).toBe("Máscaras");
    fireEvent.keyDown(tabs[2], { key: "ArrowRight" });
    expect(stage()).toBe("Perfumes");
    expect(document.activeElement).toBe(tabs[3]);

    const panel = screen.getByRole("tabpanel");
    expect(panel.getAttribute("aria-labelledby")).toBe(tabs[3].id);

    // Every image the stage can show comes from the shared portfolio data.
    const source = readFileSync("src/components/PortfolioPreview.tsx", "utf8");
    expect(source).toMatch(/portfolioCategories/);
    expect(source).not.toMatch(/\/media\/|\/brand\//);
  });

  it("fades between routes instead of sliding the page up", () => {
    const layout = readFileSync("src/layouts/SiteLayout.tsx", "utf8");
    expect(layout).toMatch(/RouteView/);

    const routeView = readFileSync("src/components/RouteView.tsx", "utf8");
    // Keyed by pathname only, so a hash change does not remount the page.
    expect(routeView).toMatch(/key=\{pathname\}/);
    expect(routeView.replace(/\/\*[\s\S]*?\*\//g, "")).not.toMatch(/\bhash\b/);

    const css = readFileSync("src/styles/globals.css", "utf8");
    const fade = css.match(/@keyframes route-fade-in \{[\s\S]*?\n\}/)?.[0] ?? "";
    expect(fade).toMatch(/opacity: 0/);
    expect(fade).toMatch(/opacity: 1/);
    expect(fade).not.toMatch(/translate/);
    expect(css).toMatch(/\.route-view \{[^}]*animation: route-fade-in (1[89]\d|2\d\d|3[01]\d)ms/);
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.route-view \{\s*animation: none/);

    // The old page-wide rise is gone: only individual reading blocks settle a short distance.
    const reveal = css.match(/\n\.reveal \{[\s\S]*?\n\}/)?.[0] ?? "";
    expect(reveal).toMatch(/translateY\(12px\)/);
    expect(reveal).not.toMatch(/clip-path/);
    for (const keyframe of ["industrial-copy-in", "industrial-media-in"]) {
      const block = css.match(new RegExp(`@keyframes ${keyframe} \\{[\\s\\S]*?\\n\\}`))?.[0] ?? "";
      expect(block).not.toMatch(/translate|clip-path|scale/);
    }
  });

  it("reveals internal-page blocks on scroll without duplicating route or timeline motion", () => {
    const css = readFileSync("src/styles/globals.css", "utf8");
    const reveal = css.match(/\n\.reveal \{[\s\S]*?\n\}/)?.[0] ?? "";
    expect(reveal).toMatch(/opacity:\s*0/);
    expect(reveal).toMatch(/translateY\(12px\)/);
    expect(reveal).toMatch(/transition:[^;]*(4[2-9]\d|5\d\d|6[0-5]\d)ms/);

    for (const path of ["/sobre", "/portfolio", "/terceirizacao", "/faq"]) {
      renderRoute(path);
      expect(document.querySelectorAll(".internal-page .reveal").length, path).toBeGreaterThanOrEqual(3);
      if (path === "/terceirizacao") {
        expect(document.querySelector(".outsourcing-timeline .reveal")).toBeNull();
      }
      cleanup();
    }
  });

  it("shares one observer across reveal blocks", () => {
    const originalObserver = globalThis.IntersectionObserver;
    let instances = 0;
    let observedElements = 0;

    class CountingIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "0px 0px -7% 0px";
      readonly thresholds = [0.08];

      constructor() { instances += 1; }
      disconnect() {}
      observe() { observedElements += 1; }
      unobserve() {}
      takeRecords(): IntersectionObserverEntry[] { return []; }
    }

    vi.stubGlobal("IntersectionObserver", CountingIntersectionObserver);
    try {
      render(
        <>
          <Reveal>Primeiro bloco</Reveal>
          <Reveal>Segundo bloco</Reveal>
          <Reveal>Terceiro bloco</Reveal>
        </>,
      );

      expect(instances).toBe(1);
      expect(observedElements).toBe(3);
    } finally {
      cleanup();
      vi.stubGlobal("IntersectionObserver", originalObserver);
    }
  });

  it("shows reveal content immediately when reduced motion is requested", () => {
    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: true }),
    });

    try {
      render(<Reveal>Conteúdo sem movimento</Reveal>);
      expect(document.querySelector(".reveal.is-visible")?.textContent).toBe("Conteúdo sem movimento");

      const css = readFileSync("src/styles/globals.css", "utf8");
      // Several reduced-motion blocks exist; this is the one that neutralises Reveal.
      const reducedMotion = css
        .split("@media (prefers-reduced-motion: reduce)")
        .slice(1)
        .find((block) => /\.reveal\s*\{/.test(block.slice(0, block.indexOf("\n}\n")))) ?? "";
      expect(reducedMotion).toMatch(/\.reveal\s*\{[^}]*opacity:\s*1\s*!important/);
      expect(reducedMotion).toMatch(/\.reveal\s*\{[^}]*transform:\s*none\s*!important/);
      expect(reducedMotion).toMatch(/\.reveal\s*\{[^}]*transition:\s*none\s*!important/);
    } finally {
      cleanup();
      if (originalMatchMedia) Object.defineProperty(window, "matchMedia", { configurable: true, value: originalMatchMedia });
      else Reflect.deleteProperty(window, "matchMedia");
    }
  });

  it("opens a newly clicked route at the top without smooth-scrolling the old page", async () => {
    const scrollTo = vi.mocked(window.scrollTo);
    scrollTo.mockClear();
    let scrollY = 2800;
    Object.defineProperty(window, "scrollY", { configurable: true, get: () => scrollY });
    renderNavigation();

    fireEvent.click(screen.getByRole("link", { name: "Explorar portfólio" }));
    await screen.findByRole("heading", {
      level: 1,
      name: "Da higiene à finalização, soluções para diferentes aplicações.",
    });

    await waitFor(() => expect(scrollTo).toHaveBeenCalled());
    const optionCalls = scrollTo.mock.calls as unknown as Array<[ScrollToOptions]>;
    expect(optionCalls.some(([options]) => options.behavior === "smooth")).toBe(false);
    expect(optionCalls.some(([options]) => options.top === 0)).toBe(true);
    const css = readFileSync("src/styles/globals.css", "utf8");
    const documentScrollRule = css.match(/\nhtml\s*\{[^}]*\}/)?.[0] ?? "";
    expect(documentScrollRule).not.toMatch(/scroll-behavior:\s*smooth/);
    scrollY = 0;
  });

  it("restores the previous page position on browser Back", async () => {
    const scrollTo = vi.mocked(window.scrollTo);
    scrollTo.mockClear();
    let scrollY = 2800;
    Object.defineProperty(window, "scrollY", { configurable: true, get: () => scrollY });
    const { router } = renderNavigation();
    fireEvent.scroll(window);

    fireEvent.click(screen.getByRole("link", { name: "Explorar portfólio" }));
    await screen.findByRole("heading", {
      level: 1,
      name: "Da higiene à finalização, soluções para diferentes aplicações.",
    });
    scrollY = 0;
    scrollTo.mockClear();

    await act(async () => router.navigate(-1));
    await screen.findByRole("heading", {
      level: 1,
      name: "Indústria que transforma desenvolvimento em produto.",
    });

    await waitFor(() => expect(scrollTo).toHaveBeenCalled());
    const optionCalls = scrollTo.mock.calls as unknown as Array<[ScrollToOptions]>;
    expect(optionCalls.some(([options]) => options.top === 2800 && options.behavior === "auto")).toBe(true);
    scrollY = 0;
  });

  it("routes the Contato call to its own page instead of a Home anchor", async () => {
    renderNavigation(["/portfolio"]);

    fireEvent.click(screen.getAllByRole("link", { name: "Contato" })[0]);
    await screen.findByRole("heading", { level: 1, name: "Vamos conversar sobre o seu projeto." });

    expect(document.querySelector(".contact-form")).toBeTruthy();
  });

  it("keeps smooth scrolling local to same-page anchors and disables it for reduced motion", async () => {
    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    });
    const scrollIntoView = vi.spyOn(HTMLElement.prototype, "scrollIntoView");
    renderNavigation();

    // The logo is a router Link carrying a Home hash, so it exercises same-page smoothing.
    fireEvent.click(screen.getAllByRole("link", { name: "Orion — início" })[0]);
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" }));

    cleanup();
    scrollIntoView.mockClear();
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: true }),
    });
    renderNavigation();
    fireEvent.click(screen.getAllByRole("link", { name: "Orion — início" })[0]);
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "auto", block: "start" }));

    if (originalMatchMedia) Object.defineProperty(window, "matchMedia", { configurable: true, value: originalMatchMedia });
    else Reflect.deleteProperty(window, "matchMedia");
  });

  it("keeps obsolete decorative counters and diamond markers out of unaffected sections", () => {
    renderRoute();

    // Home metrics and the portfolio index carry no legacy ordinal decoration.
    // The connected capability flow has its own intentional 01–06 sequence.
    expect(document.querySelectorAll(".home-metrics-figure-index")).toHaveLength(0);
    expect(document.querySelectorAll(".trust-point-index")).toHaveLength(0);
    expect(document.querySelectorAll(".home-portfolio-index-number")).toHaveLength(0);
    // The real figures stay.
    expect(document.querySelector(".home-metrics-figure .animated-metric")?.getAttribute("data-final-value")).toBe("500+");
    expect(screen.getByText("SKUs desenvolvidos")).toBeTruthy();
    expect(screen.getByText("Anos de mercado")).toBeTruthy();

    cleanup();
    renderRoute("/portfolio");
    expect(document.querySelectorAll(".portfolio-category-copy .eyebrow")).toHaveLength(0);
    expect(screen.queryByText(/\d\d\s*\/\s*Categoria/)).toBeNull();

    cleanup();
    renderRoute("/sobre");
    expect(document.querySelectorAll(".about-current-points span")).toHaveLength(0);
    expect(screen.getByText("Direção técnica")).toBeTruthy();

    const css = readFileSync("src/styles/globals.css", "utf8");
    expect(css).not.toMatch(/\.eyebrow::before\s*\{/);
    expect(css).not.toMatch(/\.button::after\s*\{/);
    expect(css).not.toMatch(/\.button:hover::after/);
    expect(css).not.toMatch(/\.industrial-hero-transition-line::before/);
    // No rotating diamond left on either timeline marker.
    expect(css).toMatch(/\.partnership-marker::after\s*\{[^}]*border-radius:\s*50%/);
  });

  it("drives the outsourcing timeline from the scroll position without numbering the steps", () => {
    renderRoute("/terceirizacao");

    const steps = [...document.querySelectorAll(".outsourcing-timeline-steps > li")];
    expect(steps).toHaveLength(6);
    expect(steps[0].getAttribute("data-state")).toBe("active");
    expect(steps[5].getAttribute("data-state")).toBe("upcoming");
    expect(document.querySelectorAll(".outsourcing-timeline-index")).toHaveLength(0);
    expect(document.querySelector(".outsourcing-timeline-progress span")).toBeTruthy();

    const source = readFileSync("src/components/OutsourcingTimeline.tsx", "utf8");
    expect(source).toMatch(/--rail-progress/);
    expect(source).toMatch(/--step-progress/);
    expect(source).toMatch(/prefers-reduced-motion: reduce/);
    // No scroll-jacking: the component never moves the page.
    expect(source).not.toMatch(/scrollTo|scrollIntoView|scroll-snap|preventDefault/);

    const css = readFileSync("src/styles/globals.css", "utf8");
    expect(css).toMatch(/\.outsourcing-timeline-progress span\s*\{[^}]*var\(--rail-progress/);
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.outsourcing-timeline-progress span\s*\{\s*height: 100%/);
  });

  it("delays the metric count until the figure is inside the reading area", () => {
    const metric = readFileSync("src/components/AnimatedMetric.tsx", "utf8");
    // A bottom rootMargin plus a high ratio keeps the count from firing as the number
    // first peeks over the fold right below the hero.
    expect(metric).toMatch(/rootMargin:\s*"0px 0px -\d+% 0px"/);
    expect(metric).toMatch(/threshold:\s*0\.4[0-9]?/);

    const hero = readFileSync("src/components/CampaignHero.tsx", "utf8");
    expect(hero).toMatch(/industrial-hero-transition/);
  });

  const routes = [
    ["/", "Indústria que transforma desenvolvimento em produto.", "Orion | Indústria de Cosméticos Pet"],
    ["/sobre", "Duas trajetórias. Um mesmo propósito.", "Sobre a Orion | Indústria de Cosméticos Pet"],
    ["/portfolio", "Da higiene à finalização, soluções para diferentes aplicações.", "Portfólio de Cosméticos Pet | Orion"],
    ["/terceirizacao", "Terceirização de cosméticos pet para a sua marca", "Terceirização de Cosméticos Pet | Orion"],
    ["/faq", "Perguntas frequentes. Respostas diretas.", "Perguntas Frequentes | Orion Cosméticos Pet"],
  ] as const;

  for (const [path, heading, title] of routes) {
    it(`renders ${path} with route-specific SEO`, async () => {
      renderRoute(path);

      expect(screen.getByRole("heading", { level: 1, name: heading })).toBeTruthy();
      await waitFor(() => expect(document.title).toBe(title));
      expect(document.querySelector("meta[name='description']")?.getAttribute("content")).toBeTruthy();
      expect(document.querySelectorAll("h1")).toHaveLength(1);
      expect(document.querySelector("link[rel='canonical']")?.getAttribute("href")).toBe(`${SITE_ORIGIN}${path}`);
      expect(document.querySelector("meta[property='og:title']")?.getAttribute("content")).toBeTruthy();
      expect(document.querySelector("meta[property='og:description']")?.getAttribute("content")).toBeTruthy();
      expect(document.querySelector("meta[property='og:url']")?.getAttribute("content")).toBe(`${SITE_ORIGIN}${path}`);
      expect(document.querySelector("meta[property='og:image']")?.getAttribute("content")).toContain(`${SITE_ORIGIN}/`);
      expect(document.querySelector("meta[property='og:site_name']")?.getAttribute("content")).toBe("Orion");
      expect(document.querySelector("meta[name='twitter:card']")?.getAttribute("content")).toBe("summary_large_image");
    });
  }

  it("publishes Organization and WebSite schema on every route, and FAQPage only where the answers are visible", () => {
    const read = () =>
      [...document.querySelectorAll("script[type='application/ld+json']")].map((node) =>
        JSON.parse(node.textContent ?? "{}"),
      );

    renderRoute("/");
    const home = read();
    const organization = home.find((entry) => entry["@type"] === "Organization")!;
    const website = home.find((entry) => entry["@type"] === "WebSite")!;

    expect(organization.url).toBe(SITE_ORIGIN);
    expect(organization.logo).toBe(`${SITE_ORIGIN}/brand/orion-logo-optimized.webp`);
    expect(organization["@id"]).toBe(`${SITE_ORIGIN}/#organization`);
    expect(organization.email).toBe("administrativo@orionpet.com.br");
    expect(website.url).toBe(SITE_ORIGIN);
    expect(website.publisher).toEqual({ "@id": `${SITE_ORIGIN}/#organization` });
    // No on-site search exists, so no SearchAction may be claimed.
    expect(website.potentialAction).toBeUndefined();
    expect(home.some((entry) => entry["@type"] === "FAQPage")).toBe(false);
    cleanup();

    renderRoute("/faq");
    const faq = read().find((entry) => entry["@type"] === "FAQPage")!;
    const visible = [...document.querySelectorAll(".faq-item")].map((item) => ({
      question: item.querySelector("button span")?.textContent?.trim(),
      answer: item.querySelector(".faq-answer p")?.textContent?.trim(),
    }));

    // The schema may only repeat what a visitor can actually read on the page.
    expect(faq.mainEntity).toHaveLength(visible.length);
    expect(
      faq.mainEntity.map((entry: { name: string; acceptedAnswer: { text: string } }) => ({
        question: entry.name,
        answer: entry.acceptedAnswer.text,
      })),
    ).toEqual(visible);
  });

  it("organizes the portfolio by its final taxonomy without product-name lists", () => {
    renderRoute("/portfolio");

    for (const category of ["Shampoos", "Condicionadores", "Máscaras", "Perfumes", "Cuidados Especiais"]) {
      expect(screen.getByRole("heading", { level: 2, name: category })).toBeTruthy();
    }
    expect(document.querySelectorAll(".portfolio-category")).toHaveLength(5);
    expect(screen.queryByText("Finalizadores")).toBeNull();
    expect(document.querySelectorAll(".portfolio-category-products")).toHaveLength(0);
    expect(screen.queryByText("Dream Color Shampoo Branqueador")).toBeNull();
    expect(screen.queryByText("The Luxe Condicionador Cereja & Avelã")).toBeNull();
    expect(screen.queryByText("Vanity Pet Gold")).toBeNull();
    expect(document.querySelector<HTMLImageElement>(".portfolio-hero-constellation img")?.src).toContain("/brand/orion-constellation-v2.png");
    expect(document.querySelector(".portfolio-hero-constellation source[type='image/webp']")?.getAttribute("srcset"))
      .toBe("/brand/orion-constellation-v2-720.webp");
    expect(document.querySelector(".portfolio-scale-editorial .animated-metric")?.getAttribute("data-final-value")).toBe("500+");
    expect(document.querySelector(".portfolio-hero + .brand-marquee")).toBeTruthy();
    expect(document.querySelectorAll(".brand-marquee-item")).toHaveLength(18);
    expect(screen.getAllByText("+Dog").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Dream Color").length).toBeGreaterThan(0);
    expect(screen.queryByText(/comprar/i)).toBeNull();
    expect(document.querySelectorAll('a[href^="/portfolio/"]')).toHaveLength(0);
  });

  it("redirects legacy brand URLs to the category portfolio", async () => {
    for (const path of ["/portfolio/atual-pet", "/portfolio/quality-pet", "/portfolio/mais-dog", "/portfolio/dez-pet"]) {
      const view = renderRoute(path);
      expect(await screen.findByRole("heading", { level: 1, name: "Da higiene à finalização, soluções para diferentes aplicações." })).toBeTruthy();
      await waitFor(() => expect(document.title).toBe("Portfólio de Cosméticos Pet | Orion"));
      expect(document.querySelector("link[rel='canonical']")?.getAttribute("href")).toBe(`${SITE_ORIGIN}/portfolio`);
      view.unmount();
      document.head.querySelectorAll("meta, link[rel='canonical']").forEach((element) => element.remove());
      document.title = "";
    }
  });

  it("renders all FAQ answers in an accessible accordion", () => {
    renderRoute("/faq");

    expect(document.querySelectorAll(".faq-item")).toHaveLength(6);
    const first = document.querySelector<HTMLButtonElement>("#full-faq-button-0");
    expect(first?.getAttribute("aria-expanded")).toBe("true");
    expect(first?.getAttribute("aria-controls")).toBe("full-faq-panel-0");
    expect(screen.getAllByText("administrativo@orionpet.com.br", { exact: false }).length).toBeGreaterThan(0);
  });

  it("renders the outsourcing hero as a three-state gesture carousel before the process", () => {
    renderRoute("/terceirizacao");

    const hero = document.querySelector(".outsourcing-scroll-hero")!;
    expect(hero.nextElementSibling?.classList.contains("outsourcing-timeline")).toBe(true);
    expect(screen.getByRole("heading", { level: 1, name: "Terceirização de cosméticos pet para a sua marca" })).toBeTruthy();
    expect(document.querySelectorAll(".outsourcing-scroll-hero h1")).toHaveLength(1);
    expect(screen.getByText("Desenvolvimento, formulação e produção para marcas.")).toBeTruthy();
    expect(outsourcingHeroStages.map(({ id, title, image }) => ({ id, title, image }))).toEqual([
      { id: "idea", title: "Sua ideia", image: "/media/outsourcing/etapa-ideia.webp" },
      { id: "formula", title: "Sua fórmula", image: "/media/outsourcing/etapa-formula.webp" },
      { id: "product", title: "Seu produto", image: "/media/outsourcing/etapa-produto-v2.webp" },
    ]);
    expect(hero.getAttribute("data-active-stage")).toBe("idea");
    expect(hero.querySelectorAll(".outsourcing-scroll-hero-message")).toHaveLength(1);

    // All three slides stay mounted so the carousel slides instead of remounting.
    const slides = [...hero.querySelectorAll(".outsourcing-scroll-hero-slide")];
    expect(slides.map((slide) => slide.getAttribute("data-offset"))).toEqual(["0", "1", "2"]);
    expect(hero.querySelector("img")?.getAttribute("src")).toBe("/media/outsourcing/etapa-ideia.webp");
    expect(hero.querySelector("img")?.getAttribute("alt")).toBe("");
    expect(hero.querySelector(".outsourcing-scroll-hero-track")?.getAttribute("aria-hidden")).toBe("true");
    expect(hero.querySelectorAll("[aria-current='step']")).toHaveLength(1);
    expect(hero.querySelector(".outsourcing-scroll-hero-cue")?.getAttribute("data-visible")).toBe("true");
    expect(hero.textContent).toContain("Role para explorar");
    expect(hero.textContent).not.toContain("Formulações exclusivas");

    const heroSource = readFileSync("src/components/OutsourcingHero.tsx", "utf8");
    const globalStyles = readFileSync("src/styles/globals.css", "utf8");
    // One intentional gesture advances exactly one stage, and the lock only spans the animation.
    expect(heroSource).toContain('window.addEventListener("wheel", onWheel, { passive: false })');
    expect(heroSource).toContain('window.addEventListener("touchmove", onTouchMove, { passive: false })');
    expect(heroSource).toContain("const TRANSITION_LOCK_MS = 560;");
    // The hero never traps the page: gestures are only captured while a stage remains in that direction.
    expect(heroSource).toMatch(/if \(!direction \|\| !isPinned\(\) \|\| !canStep\(direction\)\) return;/);
    expect(heroSource).not.toMatch(/scrollTo|scrollIntoView|190svh/);
    expect(globalStyles).toMatch(/\.outsourcing-scroll-hero\s*\{[^}]*min-height:\s*max\(520px, calc\(100svh - var\(--header-h\)\)\)/s);
    expect(globalStyles).not.toMatch(/\.outsourcing-scroll-hero-stage/);
    expect(globalStyles).toMatch(/\.outsourcing-scroll-hero-slide\[data-offset="0"\]/);
    expect(globalStyles).toMatch(/--carousel-duration: 560ms/);

    expect(document.querySelector(".outsourcing-timeline")).toBeTruthy();
    expect(document.querySelectorAll(".outsourcing-timeline-steps > li")).toHaveLength(6);
    expect(screen.getByText("Briefing e entendimento")).toBeTruthy();
    expect(screen.getByText("Desenvolvimento, formulação e amostras")).toBeTruthy();
    expect(screen.getByText("Documentação e registro")).toBeTruthy();
    expect(screen.getByText("Identidade visual e materiais")).toBeTruthy();
    expect(screen.getByText("Produção e envase")).toBeTruthy();
    expect(screen.getByText("Preparação logística e entrega")).toBeTruthy();
  });

  it("shows the final metric immediately when reduced motion is preferred", () => {
    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: true }),
    });

    render(<AnimatedMetric value={500} suffix="+" label="SKUs desenvolvidos" />);
    expect(document.querySelector(".animated-metric")?.getAttribute("data-animation-state")).toBe("reduced");
    expect(document.querySelector(".animated-metric-value")?.textContent).toBe("500+");

    if (originalMatchMedia) Object.defineProperty(window, "matchMedia", { configurable: true, value: originalMatchMedia });
    else Reflect.deleteProperty(window, "matchMedia");
  });

  it("presents both WhatsApp calls as buttons carrying the brand mark", () => {
    renderRoute("/contato");

    const channel = screen.getByRole("link", { name: "Conversar pelo WhatsApp" });
    const submit = screen.getByRole("button", { name: "Continuar pelo WhatsApp" });

    // Both read as buttons, and the mark is decorative because the label already names the action.
    for (const cta of [channel, submit]) {
      expect(cta.classList.contains("button")).toBe(true);
      expect(cta.classList.contains("button--whatsapp")).toBe(true);
      const icon = cta.querySelector("svg")!;
      expect(icon).toBeTruthy();
      expect(icon.getAttribute("aria-hidden")).toBe("true");
      expect(icon.getAttribute("viewBox")).toBe("0 0 24 24");
    }

    // The destination, its prefilled message and the plain e-mail/phone links are untouched.
    expect(channel.getAttribute("href")).toBe(
      "https://wa.me/5511962320441?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20equipe%20da%20Orion.",
    );
    expect(channel.getAttribute("target")).toBe("_blank");
    expect(screen.getByRole("link", { name: "administrativo@orionpet.com.br" }).className).toBe("");
    expect(screen.getByRole("link", { name: "(11) 96232-0441" }).className).toBe("");

    const intro = document.querySelector(".contact-intro")!;
    expect(intro.textContent).not.toContain("ao lado");

    // Mobile leads with the photograph, and the copy rises over its base.
    const globalStyles = readFileSync("src/styles/globals.css", "utf8");
    expect(globalStyles).toMatch(/\.industrial-hero-media\s*\{[^}]*order: -1/s);
    expect(globalStyles).toMatch(/\.industrial-hero-copy\s*\{[^}]*margin-top: clamp\(-70px, -12vw, -44px\)/s);
  });

  it("moves the form to its own /contato route and closes the Home with the address", () => {
    renderRoute("/contato");

    expect(screen.getByRole("heading", { level: 1, name: "Vamos conversar sobre o seu projeto." })).toBeTruthy();
    expect(document.querySelectorAll("h1")).toHaveLength(1);
    // Same fields, same ids: the form component is reused, not rebuilt.
    expect([...document.querySelectorAll(".contact-form input, .contact-form select, .contact-form textarea")].map((f) => f.id))
      .toEqual(["contact-name", "contact-company", "contact-email", "contact-phone", "contact-subject", "contact-message"]);
    cleanup();

    renderRoute("/");
    expect(document.querySelector(".contact-form")).toBeNull();
    const location = document.querySelector(".location")!;
    expect(location).toBeTruthy();
    expect(location.textContent).toContain("Orion Ind e Com de Cosmeticos LTDA");
    expect(location.textContent).toContain("Rua Hawai, 77");
    expect(location.textContent).toContain("Jardim Margarida");
    expect(location.textContent).toContain("Vargem Grande Paulista");
    expect(location.textContent).toContain("06739-064");
    expect(location.querySelector(".location-map-placeholder")).toBeTruthy();

    // Institutional contact calls point at the route; the WhatsApp ones keep wa.me.
    for (const name of ["Fale com a Orion", "Contato"]) {
      for (const link of screen.getAllByRole("link", { name })) {
        expect(link.getAttribute("href")).toBe("/contato");
      }
    }
    expect(document.querySelector("a[href^='/#contato']")).toBeNull();
  });

  it("keeps the visible address and the Organization schema in sync", () => {
    renderRoute("/");

    const organization = [...document.querySelectorAll("script[type='application/ld+json']")]
      .map((node) => JSON.parse(node.textContent ?? "{}"))
      .find((entry) => entry["@type"] === "Organization")!;

    expect(organization.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "Rua Hawai, 77",
      addressLocality: "Vargem Grande Paulista",
      addressRegion: "SP",
      postalCode: "06739-064",
      addressCountry: "BR",
    });

    const visible = document.querySelector(".location-address")!.textContent ?? "";
    expect(visible).toContain(organization.address.streetAddress);
    expect(visible).toContain(organization.address.addressLocality);
    expect(visible).toContain(organization.address.postalCode);
  });
  it("publishes the legal pages with their own metadata and links them from the footer", async () => {
    for (const [path, title, heading] of [
      ["/politica-de-privacidade", "Política de Privacidade | Orion", "Política de Privacidade"],
      ["/politica-de-cookies", "Política de Cookies | Orion", "Política de Cookies"],
    ] as const) {
      const view = renderRoute(path);
      expect(screen.getByRole("heading", { level: 1, name: heading })).toBeTruthy();
      expect(document.querySelectorAll("h1")).toHaveLength(1);
      await waitFor(() => expect(document.title).toBe(title));
      expect(document.querySelector("link[rel='canonical']")?.getAttribute("href")).toBe(`${SITE_ORIGIN}${path}`);
      view.unmount();
      document.head.querySelectorAll("meta, link[rel='canonical']").forEach((element) => element.remove());
      document.title = "";
    }

    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    expect(sitemap).toContain(`${SITE_ORIGIN}/politica-de-privacidade`);
    expect(sitemap).toContain(`${SITE_ORIGIN}/politica-de-cookies`);

    renderRoute("/");
    const legal = document.querySelector(".footer-legal")!;
    expect([...legal.querySelectorAll("a")].map((a) => a.getAttribute("href")))
      .toEqual(["/politica-de-privacidade", "/politica-de-cookies"]);
    expect(legal.querySelector("button")?.textContent).toBe("Preferências de cookies");

    // The studio credit is discreet and opens safely in a new tab.
    const credit = document.querySelector(".footer-credit-logo")!;
    expect(document.querySelector(".footer-credit-label")?.textContent).toBe("Desenvolvido por");
    expect(credit.getAttribute("href")).toBe("https://www.heptastudios.com.br/");
    expect(credit.getAttribute("target")).toBe("_blank");
    expect(credit.getAttribute("rel")).toBe("noopener noreferrer");
    expect(credit.getAttribute("aria-label")).toBe("Site oficial da Hepta Studios");
    expect(credit.querySelector("img")?.getAttribute("src")).toBe("/brand/hepta-studios.png");
    expect(credit.querySelector("img")?.getAttribute("alt")).toBe("");
  });

  it("asks for consent before loading the third-party map and remembers the answer", () => {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    renderRoute("/");

    // No decision yet: banner visible, Google frame absent from the document.
    expect(document.querySelector(".cookie-banner")).toBeTruthy();
    expect(document.querySelector(".location-map iframe")).toBeNull();
    expect(document.querySelector(".location-map-placeholder")).toBeTruthy();

    // Reject and accept are ordinary buttons of equal weight — no dark pattern.
    const reject = screen.getByRole("button", { name: "Rejeitar não essenciais" });
    const accept = screen.getByRole("button", { name: "Aceitar todos" });
    expect(reject.className).toBe(accept.className.replace(" cookie-button--primary", ""));

    fireEvent.click(reject);
    expect(JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY)!)).toMatchObject({ necessary: true, functional: false });
    expect(document.querySelector(".cookie-banner")).toBeNull();
    expect(document.querySelector(".location-map iframe")).toBeNull();
    cleanup();

    renderRoute("/");
    // The stored refusal is honoured on the next visit, without asking again.
    expect(document.querySelector(".cookie-banner")).toBeNull();
    expect(document.querySelector(".location-map iframe")).toBeNull();

    // The footer control reopens the panel so the choice can be changed.
    fireEvent.click(screen.getByRole("button", { name: "Preferências de cookies" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect((screen.getByLabelText("Estritamente necessários") as HTMLInputElement).disabled).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: "Aceitar todos" }));
    expect(JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY)!)).toMatchObject({ functional: true });
    expect(document.querySelector(".location-map iframe")).toBeTruthy();
    expect(document.querySelector(".location-map-placeholder")).toBeNull();
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  });

  it("validates contact data and opens the prefilled Orion WhatsApp conversation", () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    renderRoute("/contato");

    fireEvent.change(screen.getByLabelText("Nome *"), { target: { value: "Contato Orion" } });
    fireEvent.change(screen.getByLabelText("E-mail *"), { target: { value: "contato+site@example.com" } });
    fireEvent.change(screen.getByLabelText("Mensagem *"), { target: { value: "Mensagem válida para a equipe da Orion." } });
    fireEvent.change(screen.getByLabelText("Assunto"), { target: { value: "Terceirização" } });
    fireEvent.submit(screen.getByRole("button", { name: "Continuar pelo WhatsApp" }).closest("form")!);

    expect(open).toHaveBeenCalledOnce();
    const [url, target, features] = open.mock.calls[0];
    expect(url).toMatch(/^https:\/\/wa\.me\/5511962320441\?text=/);
    expect(target).toBe("_blank");
    expect(features).toBe("noopener,noreferrer");
    const message = new URL(String(url)).searchParams.get("text");
    expect(message).toContain("Nome: Contato Orion");
    expect(message).toContain("Assunto: Terceirização");
  });

  it("keeps contact normalization and optional WhatsApp fields", () => {
    const validation = validateContactPayload({
      name: "Contato com acento",
      company: "",
      email: "contato+orion@example.com",
      phone: "",
      subject: "Terceirização",
      message: "Olá!\nMensagem com ação, símbolos & detalhes.",
    });
    expect(validation.errors).toEqual({});
    expect(ORION_WHATSAPP_NUMBER).toBe("5511962320441");
    const message = new URL(buildWhatsAppUrl(validation.data)).searchParams.get("text") ?? "";
    expect(message).toContain("Mensagem:\nOlá!\nMensagem com ação, símbolos & detalhes.");
    expect(message).not.toMatch(/Empresa:|Telefone:/);
  });

  it("supports Home hashes and renders a coherent 404 route", async () => {
    const scrollIntoView = vi.spyOn(HTMLElement.prototype, "scrollIntoView");
    renderRoute("/#onde-estamos");
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled());
    cleanup();

    renderRoute("/rota-inexistente");
    expect(screen.getByRole("heading", { level: 1, name: "Página não encontrada." })).toBeTruthy();
    await waitFor(() => expect(document.title).toBe("Página não encontrada | Orion"));
    expect(document.querySelector("meta[name='robots']")?.getAttribute("content")).toBe("noindex, follow");
  });

  it("ships static discovery files, Vercel SPA routing and reduced-motion fallbacks", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    const robots = readFileSync("public/robots.txt", "utf8");
    const vercel = JSON.parse(readFileSync("vercel.json", "utf8"));
    const css = readFileSync("src/styles/globals.css", "utf8");
    const metric = readFileSync("src/components/AnimatedMetric.tsx", "utf8");
    const outsourcingTimeline = readFileSync("src/components/OutsourcingTimeline.tsx", "utf8");

    for (const [path] of routes) expect(sitemap).toContain(`<loc>${SITE_ORIGIN}${path}</loc>`);
    for (const oldPath of ["/portfolio/atual-pet", "/portfolio/quality-pet", "/portfolio/mais-dog", "/portfolio/dez-pet"]) {
      expect(sitemap).not.toContain(`<loc>${oldPath}</loc>`);
    }
    expect(robots).toContain("Allow: /");
    expect(robots).toContain(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`);
    expect(vercel.rewrites).toEqual([{ source: "/(.*)", destination: "/index.html" }]);
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
    expect(css).toMatch(/\.method-scroll-sticky img,[\s\S]*?transition: none !important/);
    expect(css).toMatch(/\.faq-answer,[\s\S]*?transition: none !important/);
    expect(css).toMatch(/\.brand-marquee-track[\s\S]*?animation: none/);
    expect(metric).toMatch(/IntersectionObserver/);
    expect(metric).toMatch(/requestAnimationFrame/);
    expect(metric).toMatch(/prefers-reduced-motion: reduce/);
    expect(outsourcingTimeline).toMatch(/requestAnimationFrame/);
    expect(outsourcingTimeline).toMatch(/addEventListener\("scroll"/);
    expect(css).toMatch(/\.outsourcing-timeline-steps[\s\S]*?prefers-reduced-motion/);
  });

  it("uses one compact editorial story before the preserved history timeline", () => {
    renderRoute("/sobre");

    // Single visible title, and it is the one that carries the composition.
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent?.replace(/\s+/g, " ").trim()).toBe("Duas trajetórias. Um mesmo propósito.");

    // Portrait first in the DOM, story second: photograph left, copy right.
    const layoutChildren = [...document.querySelector(".about-story-layout")!.children].map(
      (node) => node.className,
    );
    expect(layoutChildren[0]).toContain("about-story-media");
    expect(layoutChildren[1]).toContain("about-story-copy");

    // The opening is the prologue and nothing else: one moment, 2018, told once.
    const momentEls = [...document.querySelectorAll(".about-story-moment")];
    expect(momentEls).toHaveLength(1);
    expect(momentEls[0].querySelector(".about-story-moment-year")?.textContent).toBe("2018");
    expect(momentEls[0].querySelector(".about-story-moment-title")?.textContent)
      .toBe("Os caminhos se cruzam.");

    // Each founder's contribution is told inside the story, not in a block of its own.
    const momentText = [...momentEls[0].querySelectorAll(".about-story-moment-body")]
      .map((body) => body.textContent?.replace(/\s+/g, " ").trim() ?? "");
    expect(momentText).toHaveLength(2);
    expect(momentText.join(" ")).toMatch(/Zico/);
    expect(momentText.join(" ")).toMatch(/Daniel/);
    expect(momentText[0]).toMatch(/se encontraram/);
    expect(document.querySelector(".about-story-skills")).toBeNull();
    expect(document.querySelector(".about-story-trajectory")).toBeNull();

    // 2021 belongs to the timeline now — the opening never mentions it, and the
    // year selector and its scroll narrative are gone with it.
    const openingText = document.querySelector(".about-story-hero")!.textContent ?? "";
    expect(openingText).not.toMatch(/2021/);
    expect(openingText).not.toMatch(/Nasce a Orion/);
    expect(document.querySelector(".about-story-years")).toBeNull();
    expect(document.querySelector(".about-story-viewport")).toBeNull();
    expect(document.querySelectorAll(".about-story-hero button")).toHaveLength(0);

    expect(screen.getByText(/independência no desenvolvimento/)).toBeTruthy();
    expect(screen.queryByText("Quem é a Orion hoje")).toBeNull();
    expect(document.querySelector(".about-today")).toBeNull();
    // "A Orion hoje" was folded into the timeline; only the operating band remains.
    expect(document.querySelector(".about-current")).toBeNull();
    expect(screen.queryByRole("heading", { name: /Uma estrutura preparada para desenvolver/ })).toBeNull();
    expect(document.querySelectorAll(".about-capability-band-layout article")).toHaveLength(3);
    expect(screen.getByRole("heading", { level: 2, name: "Direção técnica" })).toBeTruthy();

    const opening = document.querySelector(".about-story-hero");
    const history = document.querySelector(".company-history");
    const founders = document.querySelector(".founders-section");
    const purpose = document.querySelector(".about-purpose");
    expect(opening).toBeTruthy();
    expect(history).toBeTruthy();
    expect(founders).toBeTruthy();
    expect(purpose).toBeTruthy();
    expect(opening!.compareDocumentPosition(history!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(history!.compareDocumentPosition(founders!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(founders!.compareDocumentPosition(purpose!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(document.querySelector(".about-page > .internal-hero")).toBeNull();
    // No cards, no icons, no ordinals, no second heading level in the opening.
    expect(opening!.querySelectorAll("article")).toHaveLength(0);
    expect(opening!.querySelectorAll("ul")).toHaveLength(0);
    expect(opening!.querySelectorAll("h2")).toHaveLength(0);
    expect(opening!.querySelectorAll("svg")).toHaveLength(0);
    expect(opening!.textContent).not.toMatch(/\b0[1-9]\b/);
    expect(opening!.querySelector("figcaption")).toBeNull();
    // The whole hero is light: the founders never stand on the deep blue. No band
    // rising into the section, no gradient, no plate — the division between the
    // light ground and the timeline's blue happens between the two sections.
    const css = readFileSync("src/styles/globals.css", "utf8");
    expect(css).toMatch(/\.about-story-hero \{[^}]*background: var\(--off-white\)/);
    expect(css).not.toMatch(/\.about-story-hero \{[^}]*background: var\(--blue-deep\)/);
    const heroRules = css.match(/\.about-story-hero\s*\{[^}]*\}/s)?.[0] ?? "";
    expect(heroRules).not.toMatch(/\.about-story-hero[^}]*linear-gradient/);
    expect(css).not.toMatch(/--about-story-ground/);
    expect(opening!.querySelector(".about-story-plate")).toBeNull();
    expect(css).not.toMatch(/\.about-story-plate/);
    // A plain section: no track, no sticky, no invented height. It asks for about
    // one screen and stops there.
    expect(heroRules).not.toMatch(/position: sticky/);
    expect(css).not.toMatch(/about-story-viewport/);
    expect(css).not.toMatch(/\.about-story-hero \{[^}]*height: \d+svh/);
    expect(css).not.toMatch(/\.about-story-hero \{[^}]*min-height/);
    // Bottom-aligned, so the base of the photograph is the base of the section.
    expect(css).toMatch(/\.about-story-hero \{[^}]*align-items: flex-end/);
    expect(css).toMatch(/\.about-story-media img \{[^}]*display: block/);
    // The portrait runs out to the page edge instead of sitting inside a column,
    // and the three text blocks step in by different amounts.
    expect(css).toMatch(
      /\.about-story-media \{[^}]*margin: 0 0 0 calc\(\(100vw - var\(--container\)\) \/ -2\)/,
    );
    // Editorial scale: the title holds its own against the photograph, the year
    // and its line are a real heading pair, and the body is reading size — not
    // the small institutional type it started as.
    const size = (selector: string) => {
      const match = css.match(new RegExp(`${selector} \\{[^}]*font-size: clamp\\(([^,]+), ([^,]+), ([^)]+)\\)`));
      expect(match).toBeTruthy();
      return { min: match![1].trim(), mid: match![2].trim(), max: match![3].trim() };
    };
    expect(parseFloat(size("\\.about-story-copy h1").mid)).toBeGreaterThanOrEqual(3.2);
    expect(parseFloat(size("\\.about-story-moment-year").mid)).toBeGreaterThanOrEqual(2.5);
    expect(parseFloat(size("\\.about-story-moment-title").mid)).toBeGreaterThanOrEqual(1.5);
    // Body copy lands around 17-18px on a laptop and never drops below 16px.
    const body = size("\\.about-story-moment-body");
    expect(parseFloat(body.min)).toBeGreaterThanOrEqual(1);
    expect(parseFloat(body.mid)).toBeGreaterThanOrEqual(1.2);

    // The final alignment uses one exact axis for the label and both title lines;
    // 2018 likewise starts on the same axis as its title and body copy.
    expect(css).toMatch(/\.about-story-copy \.eyebrow \{[^}]*margin-left: 0/);
    expect(css).toMatch(/\.about-story-copy h1 \{[^}]*margin-left: 0/);
    expect(css).toMatch(/\.about-story-copy h1 span \+ span \{[^}]*margin-left: 0/);
    expect(css).toMatch(/\.about-story-moment-year \{[^}]*margin: 0/);
    expect(css).toMatch(/\.about-story-moment \{[^}]*margin-left: clamp/);
    const stacked = css.slice(css.indexOf("@media (max-width: 900px)", css.indexOf(".about-story-hero {")));
    expect(stacked).toMatch(/\.about-story-copy h1,[\s\S]{0,200}?margin-left: 0/);
    expect(opening!.querySelectorAll('[class*="card"], [class*="band"]')).toHaveLength(0);
    // Wider v2 framing: more body, arms preserved, 1.5:1 instead of near-square.
    const portrait = opening!.querySelector<HTMLImageElement>(".about-story-media img");
    expect(portrait?.getAttribute("src")).toBe("/media/company/about-dani-zico-hero-v3.webp");
    expect(portrait?.getAttribute("width")).toBe("1536");
    expect(portrait?.getAttribute("height")).toBe("1024");
    expect(opening!.querySelector<HTMLSourceElement>(".about-story-media source")?.getAttribute("srcset"))
      .toBe("/media/company/about-dani-zico-hero-v3-900.webp");
    expect(opening!.querySelector(".about-story-media img")?.getAttribute("src"))
      .not.toBe("/media/company/history-daniel-zico.webp");
    // The logistics photograph remains in the approved data sequence even though
    // the compact stage mounts only the active milestone.
    expect(readFileSync("src/data/companyHistory.ts", "utf8")).toMatch(/logistica-orion\.webp/);
  });

  it("updates the lightweight global page progress without changing layout", async () => {
    let scrollY = 0;
    Object.defineProperty(window, "scrollY", { configurable: true, get: () => scrollY });
    Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, value: 2000 });
    Object.defineProperty(document.documentElement, "clientHeight", { configurable: true, value: 1000 });

    try {
      renderRoute("/");
      const progress = screen.getByRole("progressbar", { name: "Progresso da página" });
      expect(progress.getAttribute("aria-valuenow")).toBe("0");

      scrollY = 500;
      fireEvent.scroll(window);
      await waitFor(() => expect(progress.getAttribute("aria-valuenow")).toBe("50"));

      scrollY = 1000;
      fireEvent.scroll(window);
      await waitFor(() => expect(progress.getAttribute("aria-valuenow")).toBe("100"));

      const source = readFileSync("src/components/ScrollProgress.tsx", "utf8");
      expect(source).toMatch(/requestAnimationFrame/);
      expect(source).toMatch(/scrollHeight/);
      expect(source).toMatch(/addEventListener\("scroll", scheduleUpdate, \{ passive: true \}\)/);
      const css = readFileSync("src/styles/globals.css", "utf8");
      expect(css).toMatch(/\.page-scroll-progress\s*\{[^}]*position:\s*absolute/);
      expect(css).toMatch(/prefers-reduced-motion[\s\S]*?\.page-scroll-progress span\s*\{\s*transition:\s*none/);
    } finally {
      cleanup();
      Reflect.deleteProperty(window, "scrollY");
      Reflect.deleteProperty(document.documentElement, "scrollHeight");
      Reflect.deleteProperty(document.documentElement, "clientHeight");
    }
  });

  it("renders the company history as one accessible, controlled stage", () => {
    renderRoute("/sobre");

    const history = document.querySelector(".company-history")!;
    const stage = history.querySelector<HTMLElement>(".company-history-stage")!;
    const navigation = history.querySelector<HTMLElement>(".company-history-navigation")!;
    const previous = screen.getByRole("button", { name: "Ver marco anterior da história" }) as HTMLButtonElement;
    const next = screen.getByRole("button", { name: "Ver próximo marco da história" }) as HTMLButtonElement;
    const indicators = screen.getAllByRole("button", { name: /Ver marco:/ });

    expect(screen.getByRole("heading", { level: 2, name: "Uma estrutura construída para crescer." }))
      .toBeTruthy();
    expect(history.querySelectorAll(".company-history-panel")).toHaveLength(1);
    expect(history.querySelectorAll(".company-history-media img")).toHaveLength(1);
    expect(history.querySelector<HTMLImageElement>(".company-history-media img")?.getAttribute("src"))
      .toBe("/media/company/history-origin.webp");
    expect(history.querySelector(".company-history-period")?.textContent).toBe("2021");
    expect(indicators).toHaveLength(5);
    expect(indicators.map((indicator) => indicator.getAttribute("aria-current")))
      .toEqual(["step", null, null, null, null]);
    expect(previous.disabled).toBe(true);
    expect(next.disabled).toBe(false);

    expect(indicators.map((indicator) => indicator.getAttribute("aria-label"))).toEqual([
      "Ver marco: 2021",
      "Ver marco: Estruturação do estoque",
      "Ver marco: Estoque em operação",
      "Ver marco: Expansão",
      "Ver marco: Atualmente",
    ]);

    // Arrows change image, text and active indicator together, following the
    // final chronology without adding dates to the descriptive milestones.
    fireEvent.click(next);
    expect(history.querySelector(".company-history-period")?.textContent).toBe("Estruturação do estoque");
    expect(history.querySelector<HTMLImageElement>(".company-history-media img")?.getAttribute("src"))
      .toBe("/media/company/history-storage-setup.webp");
    expect(indicators[1].getAttribute("aria-current")).toBe("step");
    expect(previous.disabled).toBe(false);

    // The former "Operação integrada" photograph is explicitly the old stock,
    // followed by the supplied construction photograph and only then the tanks.
    fireEvent.click(screen.getByRole("button", { name: "Ver marco: Estoque em operação" }));
    expect(history.querySelector(".company-history-period")?.textContent).toBe("Estoque em operação");
    expect(history.querySelector(".company-history-copy h3")?.textContent)
      .toBe("A estrutura passa a apoiar a operação.");
    expect(history.querySelector<HTMLImageElement>(".company-history-media img")?.getAttribute("src"))
      .toBe("/media/company/logistica-orion.webp");

    fireEvent.click(screen.getByRole("button", { name: "Ver marco: Expansão" }));
    expect(history.querySelector<HTMLImageElement>(".company-history-media img")?.getAttribute("src"))
      .toBe("/media/company/history-stock-expansion-v2.webp");

    // Indicators are the only other navigation surface and are real buttons.
    fireEvent.click(screen.getByRole("button", { name: "Ver marco: Atualmente" }));
    expect(history.querySelector(".company-history-period")?.textContent).toBe("Atualmente");
    expect(history.querySelector<HTMLImageElement>(".company-history-media img")?.getAttribute("src"))
      .toBe("/media/factory/tanques-orion-v2.webp");

    // Keyboard handling is scoped to the navigation toolbar and its controls.
    indicators[2].focus();
    fireEvent.keyDown(indicators[2], { key: "End" });
    expect(history.querySelector(".company-history-period")?.textContent).toBe("Atualmente");
    expect(history.querySelector<HTMLImageElement>(".company-history-media img")?.getAttribute("src"))
      .toBe("/media/factory/tanques-orion-v2.webp");
    expect(next.disabled).toBe(true);
    fireEvent.keyDown(navigation, { key: "Home" });
    expect(history.querySelector(".company-history-period")?.textContent).toBe("2021");
    fireEvent.keyDown(navigation, { key: "ArrowRight" });
    expect(history.querySelector(".company-history-period")?.textContent).toBe("Estruturação do estoque");
    fireEvent.keyDown(navigation, { key: "ArrowLeft" });
    expect(history.querySelector(".company-history-period")?.textContent).toBe("2021");

    // Touch swipe and mouse drag share the controlled horizontal gesture.
    fireEvent.pointerDown(stage, { pointerId: 1, pointerType: "touch", button: 0, clientX: 220, clientY: 120 });
    fireEvent.pointerMove(stage, { pointerId: 1, pointerType: "touch", clientX: 130, clientY: 124 });
    fireEvent.pointerUp(stage, { pointerId: 1, pointerType: "touch", clientX: 130, clientY: 124 });
    expect(history.querySelector(".company-history-period")?.textContent).toBe("Estruturação do estoque");
    fireEvent.pointerDown(stage, { pointerId: 2, pointerType: "mouse", button: 0, clientX: 120, clientY: 120 });
    fireEvent.pointerMove(stage, { pointerId: 2, pointerType: "mouse", clientX: 210, clientY: 123 });
    fireEvent.pointerUp(stage, { pointerId: 2, pointerType: "mouse", clientX: 210, clientY: 123 });
    expect(history.querySelector(".company-history-period")?.textContent).toBe("2021");

    expect(history.querySelector('img[src*="history-daniel-zico"]')).toBeNull();
    expect(history.querySelector('img[src*="history-current-factory"]')).toBeNull();
    expect(history.textContent).not.toMatch(/Montagem da fábrica/);

    // Only the active panel is exposed: no tabs, hidden duplicate content or progress UI.
    expect(history.querySelectorAll('[role="tablist"], [role="tab"], [role="tabpanel"]')).toHaveLength(0);
    expect(history.querySelector('[role="progressbar"]')).toBeNull();
    expect(history.querySelectorAll('[aria-live="polite"]')).toHaveLength(1);
    expect(history.querySelectorAll('[aria-current="step"]')).toHaveLength(1);
    expect(history.querySelector('[aria-selected]')).toBeNull();
    expect(history.textContent).not.toMatch(/Marco \d+ de|Arraste ou use as setas|A história continua/i);

    expect(screen.getByRole("heading", { level: 3, name: "Daniel Costa" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 3, name: "José Aparecido Zebiani — Zico" })).toBeTruthy();
    expect(screen.getByText(/Juntos, Daniel e Zico unem desenvolvimento técnico e visão comercial/)).toBeTruthy();
    expect(document.querySelector<HTMLImageElement>('.founder-profile img[alt*="Zico"]')?.getAttribute("src"))
      .toBe("/media/company/jose-aparecido-zebiani.webp");

    const dataSource = readFileSync("src/data/site.ts", "utf8");
    const historySource = readFileSync("src/data/companyHistory.ts", "utf8");
    const componentSource = readFileSync("src/components/CompanyHistory.tsx", "utf8");
    expect(dataSource).toMatch(/development-daniel\.webp/);
    expect(historySource).toMatch(/companyHistory:\s*CompanyHistoryItem\[\]/);
    expect(historySource).toMatch(/history-stock-expansion-v2\.webp/);
    expect(historySource).toMatch(/history-storage-setup\.webp/);
    expect(historySource).toMatch(/tanques-orion-v2\.webp/);
    expect(historySource).not.toMatch(/history-stock-before-expansion/);
    expect(historySource).not.toMatch(/history-stock-expansion\.webp/);
    expect(historySource).toMatch(/logistica-orion\.webp/);
    expect(historySource).not.toMatch(/history-daniel-zico/);
    expect(historySource).not.toMatch(/fabrica atualmente/i);
    expect(historySource).not.toMatch(/history-current-factory/);

    // The blue section itself is present from load; interaction stays inside one stage.
    expect(history.classList.contains("reveal")).toBe(false);
    expect(document.querySelector(".about-page > .reveal.company-history")).toBeNull();
    expect(componentSource).toMatch(/if \(items\.length === 0\) return null/);
    expect(componentSource).toMatch(/ArrowRight|ArrowLeft|Home|End/);
    expect(componentSource).toMatch(/onPointerDown|onPointerMove|SWIPE_THRESHOLD/);
    expect(componentSource).not.toMatch(/onWheel|setInterval|setTimeout|scrollTo/);

    const css = readFileSync("src/styles/globals.css", "utf8");
    expect(css).toMatch(/\.company-history \{[^}]*background: var\(--blue-deep\)/);
    expect(css).toMatch(/\.company-history-panel \{[^}]*height: clamp\(380px, 29\.5vw, 420px\)/);
    expect(css).toMatch(/\.company-history-stage \{[^}]*touch-action: pan-y/);
    expect(css).toMatch(/@media \(max-width: 820px\)[\s\S]*?\.company-history-panel \{[^}]*grid-template-columns: 1fr/);
    expect(css).toMatch(/prefers-reduced-motion[\s\S]*?\.company-history-panel \{[^}]*animation: none !important/);
    expect(css).not.toMatch(/\.company-history-(list|milestone|description|tabs|track|card|progress|instruction|plate|controls)/);
  });

  it("presents mission, vision and values as one responsive editorial statement", () => {
    renderRoute("/sobre");

    const purpose = document.querySelector(".about-purpose")!;
    const layout = purpose.querySelector(".about-purpose-layout")!;
    const classes = [...layout.children].map((child) => child.className);

    expect(screen.getByText("O que nos move")).toBeTruthy();
    expect(screen.getByRole("heading", {
      level: 2,
      name: "Transformar direção de produto em execução consistente.",
    })).toBeTruthy();
    expect(classes[0]).toContain("about-purpose-header");
    expect(classes[1]).toContain("about-purpose-mission");
    expect(classes[2]).toContain("about-purpose-vision");
    expect(classes[3]).toContain("about-purpose-values");
    expect(purpose.querySelectorAll("article")).toHaveLength(3);
    expect(purpose.querySelectorAll(".about-purpose-values li")).toHaveLength(6);
    expect(purpose.querySelectorAll("button, [role=tab], [hidden]")).toHaveLength(0);

    const css = readFileSync("src/styles/globals.css", "utf8");
    const purposeCss = css.slice(css.indexOf(".about-purpose {"), css.indexOf(".founders-section {"));
    expect(purposeCss).toMatch(/\.about-purpose-layout \{[^}]*grid-template-columns: repeat\(12/);
    expect(purposeCss).toMatch(/\.about-purpose-header \{[^}]*grid-column: 1 \/ 8/);
    expect(purposeCss).toMatch(/\.about-purpose-mission \{[^}]*grid-column: 8 \/ 13/);
    expect(purposeCss).toMatch(/\.about-purpose-vision \{[^}]*grid-column: 1 \/ 7/);
    expect(purposeCss).toMatch(/\.about-purpose-values \{[^}]*grid-column: 8 \/ 13/);
    expect(purposeCss).toMatch(/@media \(max-width: 820px\)[\s\S]*?\.about-purpose-layout \{[^}]*grid-template-columns: 1fr/);
    expect(purposeCss).toMatch(/@media \(max-width: 560px\)[\s\S]*?\.about-purpose-values ul \{[^}]*grid-template-columns: 1fr/);
    expect(purposeCss).toMatch(/\.about-purpose-statement h3::after \{[^}]*background: #72c8df/);
    expect(purposeCss).toMatch(/\.about-purpose-statement > p \{[^}]*font-size: clamp\(1\.25rem, 1\.55vw, 1\.4375rem\)/);
    expect(purposeCss).toMatch(/\.about-purpose-values li \{[^}]*font-size: clamp\(1\.25rem, 1\.6vw, 1\.5rem\)/);
    expect(purposeCss).not.toMatch(/\.about-purpose-values li::before/);
    expect(purposeCss).not.toMatch(/\.about-purpose-values li \{[^}]*(?:grid-template-columns|padding-left|margin-left)/);
    expect(purposeCss).toMatch(/@media \(max-width: 820px\)[\s\S]*?\.about-purpose-statement > p \{[^}]*font-size: clamp\(1\.125rem, 2\.6vw, 1\.25rem\)/);
    expect(purposeCss).toMatch(/@media \(max-width: 820px\)[\s\S]*?\.about-purpose-values li \{[^}]*font-size: clamp\(1\.125rem, 2\.7vw, 1\.25rem\)/);
    expect(purposeCss).not.toMatch(/\.about-purpose-statement \{[^}]*(?:background|border|box-shadow):/);
    expect(purposeCss).not.toMatch(/\.about-purpose(?:-layout)? \{[^}]*(?:min-)?height\s*:/);
  });
});
