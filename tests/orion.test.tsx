import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HelmetProvider } from "react-helmet-async";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router-dom";
import { AppRoutes } from "../src/App";
import { AnimatedMetric } from "../src/components/AnimatedMetric";
import { Reveal } from "../src/components/Reveal";
import { buildWhatsAppUrl, ORION_WHATSAPP_NUMBER, validateContactPayload } from "../src/lib/contact";

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
    expect(screen.getByText("Vamos conversar sobre seu projeto?")).toBeTruthy();
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
    expect(document.querySelectorAll(".method-mobile-trigger")).toHaveLength(3);
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

  it("presents the six industrial capabilities as one connected editorial flow", () => {
    renderRoute();

    expect(document.querySelector(".trust-flow")).toBeTruthy();
    expect(document.querySelectorAll(".trust-stage")).toHaveLength(6);
    expect(document.querySelector(".trust-matrix")).toBeNull();
    expect(
      [...document.querySelectorAll(".trust-stage h3")].map((heading) => heading.textContent),
    ).toEqual([
      "Desenvolvimento e formulação",
      "Documentação e registro",
      "Produção",
      "Envase",
      "Identidade visual",
      "Entrega e logística",
    ]);
    expect(
      [...document.querySelectorAll(".trust-stage-marker")].map((marker) => marker.textContent?.trim()),
    ).toEqual(["01", "02", "03", "04", "05", "06"]);
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
      const reducedMotion = css.slice(css.lastIndexOf("@media (prefers-reduced-motion: reduce)"));
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

  it("gives an explicit cross-route #contato hash priority over saved scroll", async () => {
    const scrollIntoView = vi.spyOn(HTMLElement.prototype, "scrollIntoView");
    renderNavigation(["/portfolio"]);

    fireEvent.click(screen.getAllByRole("link", { name: "Contato" })[0]);
    await screen.findByRole("heading", {
      level: 1,
      name: "Indústria que transforma desenvolvimento em produto.",
    });

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "auto", block: "start" }));
  });

  it("keeps smooth scrolling local to same-page anchors and disables it for reduced motion", async () => {
    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    });
    const scrollIntoView = vi.spyOn(HTMLElement.prototype, "scrollIntoView");
    renderNavigation();

    fireEvent.click(screen.getAllByRole("link", { name: "Contato" })[0]);
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" }));

    cleanup();
    scrollIntoView.mockClear();
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: true }),
    });
    renderNavigation();
    fireEvent.click(screen.getAllByRole("link", { name: "Contato" })[0]);
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
    ["/", "Indústria que transforma desenvolvimento em produto.", "Orion | Soluções industriais para o mercado pet"],
    ["/sobre", "Desenvolvimento e indústria em uma mesma direção.", "História da Orion | Indústria para o mercado pet"],
    ["/portfolio", "Da higiene à finalização, soluções para diferentes aplicações.", "Portfólio industrial de cosméticos pet | Orion"],
    ["/terceirizacao", "Do briefing à produção, etapas coordenadas pela Orion.", "Terceirização para o mercado pet | Orion"],
    ["/faq", "Perguntas frequentes. Respostas diretas.", "Perguntas frequentes | Orion"],
  ] as const;

  for (const [path, heading, title] of routes) {
    it(`renders ${path} with route-specific SEO`, async () => {
      renderRoute(path);

      expect(screen.getByText(heading)).toBeTruthy();
      await waitFor(() => expect(document.title).toBe(title));
      expect(document.querySelector("meta[name='description']")?.getAttribute("content")).toBeTruthy();
      expect(document.querySelector("link[rel='canonical']")?.getAttribute("href")).toBe(`http://localhost:3000${path}`);
      expect(document.querySelector("meta[property='og:title']")?.getAttribute("content")).toBeTruthy();
      expect(document.querySelector("meta[property='og:description']")?.getAttribute("content")).toBeTruthy();
      expect(document.querySelector("meta[property='og:url']")?.getAttribute("content")).toBe(`http://localhost:3000${path}`);
      expect(document.querySelector("meta[property='og:image']")?.getAttribute("content")).toMatch(/^http:\/\/localhost:3000\//);
    });
  }

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
      await waitFor(() => expect(document.title).toBe("Portfólio industrial de cosméticos pet | Orion"));
      expect(document.querySelector("link[rel='canonical']")?.getAttribute("href")).toBe("http://localhost:3000/portfolio");
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

  it("renders the outsourcing process as a six-stage scroll timeline", () => {
    renderRoute("/terceirizacao");

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

  it("validates contact data and opens the prefilled Orion WhatsApp conversation", () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    renderRoute("/");

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
    renderRoute("/#contato");
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

    for (const [path] of routes) expect(sitemap).toContain(`<loc>${path}</loc>`);
    for (const oldPath of ["/portfolio/atual-pet", "/portfolio/quality-pet", "/portfolio/mais-dog", "/portfolio/dez-pet"]) {
      expect(sitemap).not.toContain(`<loc>${oldPath}</loc>`);
    }
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Sitemap: /sitemap.xml");
    expect(vercel.rewrites).toEqual([{ source: "/(.*)", destination: "/index.html" }]);
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
    expect(css).toMatch(/\.method-mobile-sticky img,[\s\S]*?transition: none !important/);
    expect(css).toMatch(/\.faq-answer,[\s\S]*?transition: none !important/);
    expect(css).toMatch(/\.brand-marquee-track[\s\S]*?animation: none/);
    expect(metric).toMatch(/IntersectionObserver/);
    expect(metric).toMatch(/requestAnimationFrame/);
    expect(metric).toMatch(/prefers-reduced-motion: reduce/);
    expect(outsourcingTimeline).toMatch(/requestAnimationFrame/);
    expect(outsourcingTimeline).toMatch(/addEventListener\("scroll"/);
    expect(css).toMatch(/\.outsourcing-timeline-steps[\s\S]*?prefers-reduced-motion/);
  });

  it("shows one concise About opening before the preserved history timeline", () => {
    renderRoute("/sobre");

    expect(screen.getByRole("heading", { level: 1, name: "Desenvolvimento e indústria em uma mesma direção." })).toBeTruthy();
    expect(screen.queryByText("Quem é a Orion hoje")).toBeNull();
    expect(document.querySelector(".about-today")).toBeNull();

    const opening = document.querySelector(".internal-hero");
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

  it("renders the company history as an accessible horizontal timeline and introduces both founders", () => {
    renderRoute("/sobre");

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(4);
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
    expect(document.querySelectorAll(".company-history-card")).toHaveLength(4);
    expect(document.querySelectorAll(".company-history-card img[alt]")).toHaveLength(4);
    expect(screen.queryByRole("tab", { name: /Antes da obra/ })).toBeNull();
    expect(screen.getByRole("progressbar", { name: "Progresso na história da Orion" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Ver marco anterior da história" })).toBeTruthy();
    const next = screen.getByRole("button", { name: "Ver próximo marco da história" });
    fireEvent.click(next);
    expect(tabs[1].getAttribute("aria-selected")).toBe("true");
    fireEvent.keyDown(tabs[1], { key: "End" });
    expect(tabs[3].getAttribute("aria-selected")).toBe("true");

    expect(screen.getByRole("heading", { level: 3, name: "Daniel Costa" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 3, name: "José Aparecido Zebiani — Zico" })).toBeTruthy();
    expect(screen.getByText(/Juntos, Daniel e Zico unem desenvolvimento técnico e visão comercial/)).toBeTruthy();
    expect(document.querySelector<HTMLImageElement>('.founder-profile img[alt*="Zico"]')?.getAttribute("src"))
      .toBe("/media/company/jose-aparecido-zebiane.webp");

    const dataSource = readFileSync("src/data/site.ts", "utf8");
    const historySource = readFileSync("src/data/companyHistory.ts", "utf8");
    const componentSource = readFileSync("src/components/CompanyHistory.tsx", "utf8");
    expect(dataSource).toMatch(/development-daniel\.webp/);
    expect(historySource).toMatch(/companyHistory:\s*CompanyHistoryItem\[\]/);
    expect(historySource).toMatch(/history-current-factory\.webp/);
    expect(historySource).not.toMatch(/history-stock-before-expansion/);
    expect(componentSource).toMatch(/if \(items\.length === 0\) return null/);
    expect(componentSource).toMatch(/ArrowRight|ArrowLeft/);
    expect(componentSource).toMatch(/onPointerDown|onPointerMove/);
    expect(componentSource).not.toMatch(/onWheel|scrollY|window\.scrollTo/);
  });
});
