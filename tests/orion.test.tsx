import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "../src/App";
import { AnimatedMetric } from "../src/components/AnimatedMetric";
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

afterEach(() => {
  cleanup();
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

    expect(document.querySelectorAll(".home-portfolio-index-link")).toHaveLength(6);
    expect(screen.getByRole("link", { name: /01\s*Condicionadores|Condicionadores/ }).getAttribute("href"))
      .toMatch(/^\/portfolio#/);
    expect(document.querySelector(".home-portfolio-stage img")).toBeTruthy();
    expect(document.querySelector(".home-portfolio + .brand-marquee--home")).toBeTruthy();
    expect(document.querySelectorAll(".brand-marquee--home .brand-marquee-item")).toHaveLength(18);
    expect(document.querySelectorAll(".brand-marquee-item figcaption")).toHaveLength(0);
    expect(document.querySelector(".home-portfolio-showcase img[src*='orion-constellation']")).toBeNull();
  });

  it("keeps decorative indices and diamond markers out of the interface", () => {
    renderRoute();

    // Home: metrics, capabilities and the portfolio index carry no ordinal decoration.
    expect(document.querySelectorAll(".home-metrics-figure-index")).toHaveLength(0);
    expect(document.querySelectorAll(".trust-point-index")).toHaveLength(0);
    expect(document.querySelectorAll(".home-portfolio-index-number")).toHaveLength(0);
    for (const ordinal of ["01", "02", "03", "04", "05", "06"]) {
      expect(screen.queryByText(ordinal)).toBeNull();
    }
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
    ["/sobre", "Nossa história.", "História da Orion | Indústria para o mercado pet"],
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

    for (const category of ["Shampoos", "Condicionadores", "Máscaras e Tratamentos", "Finalizadores", "Perfumes e Colônias", "Cuidados Específicos"]) {
      expect(screen.getByRole("heading", { level: 2, name: category })).toBeTruthy();
    }
    expect(document.querySelectorAll(".portfolio-category")).toHaveLength(6);
    expect(document.querySelectorAll(".portfolio-category-products")).toHaveLength(0);
    expect(screen.queryByText("Dream Color Shampoo Branqueador")).toBeNull();
    expect(screen.queryByText("The Luxe Condicionador Cereja & Avelã")).toBeNull();
    expect(screen.queryByText("Vanity Pet Gold")).toBeNull();
    expect(document.querySelector<HTMLImageElement>(".portfolio-hero-constellation img")?.src).toContain("/brand/orion-constellation.png");
    expect(document.querySelector(".portfolio-hero-constellation source[type='image/webp']")?.getAttribute("srcset"))
      .toBe("/brand/orion-constellation.webp");
    expect(document.querySelector(".portfolio-scale-editorial .animated-metric")?.getAttribute("data-final-value")).toBe("500+");
    expect(document.querySelector(".portfolio-hero + .brand-marquee")).toBeTruthy();
    expect(document.querySelectorAll(".brand-marquee-item")).toHaveLength(18);
    expect(screen.getByText("Marca: +Dog")).toBeTruthy();
    expect(screen.getByText("Linha: Dream Color")).toBeTruthy();
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

  it("keeps future company history unrendered until validated milestones exist", () => {
    renderRoute("/sobre");
    expect(document.querySelector(".company-history")).toBeNull();
    const dataSource = readFileSync("src/data/site.ts", "utf8");
    const componentSource = readFileSync("src/components/CompanyHistory.tsx", "utf8");
    expect(dataSource).toMatch(/companyHistory:\s*CompanyHistoryItem\[\]\s*=\s*\[\]/);
    expect(componentSource).toMatch(/if \(items\.length === 0\) return null/);
    expect(componentSource).toMatch(/ArrowRight|ArrowLeft/);
  });
});
