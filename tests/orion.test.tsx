import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "../src/App";
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
  it("renders the preserved home structure and its internal links", () => {
    renderRoute();

    expect(screen.getByRole("heading", { level: 1, name: /Tecnologia e excelência no desenvolvimento/ })).toBeTruthy();
    expect(screen.getByText("Marcas desenvolvidas para diferentes necessidades.")).toBeTruthy();
    expect(screen.getByText("Ciência e tecnologia em cada etapa.")).toBeTruthy();
    expect(screen.getByText("Um caminho claro, do briefing ao produto.")).toBeTruthy();
    expect(screen.getByText("Vamos conversar sobre seu projeto?")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Explorar AtualPet" }).getAttribute("href")).toBe("/portfolio/atual-pet");
    expect(document.querySelectorAll(".method-mobile-trigger")).toHaveLength(3);
    expect(document.querySelector(".method-scroll-sticky")).toBeTruthy();
    expect(document.querySelector("script[type='application/ld+json']")?.textContent).toContain('"@type":"Organization"');
  });

  const routes = [
    ["/", "Tecnologia e excelência no desenvolvimento de soluções para o mercado pet.", "Orion | Soluções industriais para o mercado pet"],
    ["/sobre", "Uma operação integrada para transformar intenção em produto.", "Sobre a Orion | Indústria para o mercado pet"],
    ["/portfolio", "Marcas diferentes. Identidades preservadas.", "Portfólio de marcas | Orion"],
    ["/portfolio/atual-pet", "Uma marca. Cinco identidades de linha.", "AtualPet | Portfólio Orion"],
    ["/portfolio/quality-pet", "Portfólio em desenvolvimento.", "Quality Pet | Portfólio Orion"],
    ["/portfolio/mais-dog", "Portfólio em desenvolvimento.", "Mais Dog | Portfólio Orion"],
    ["/portfolio/dez-pet", "Portfólio em desenvolvimento.", "Dez Pet | Portfólio Orion"],
    ["/terceirizacao", "Da ideia ao produto final.", "Terceirização para o mercado pet | Orion"],
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

  it("keeps rich AtualPet content isolated and emits structured breadcrumbs", () => {
    renderRoute("/portfolio/atual-pet");

    for (const line of ["Dream Color", "Dream Color Care", "The Luxe", "Vanity Pet", "Zoom"]) {
      expect(screen.getAllByText(line).length).toBeGreaterThan(0);
    }
    expect(document.querySelectorAll(".brand-line")).toHaveLength(5);
    const schemas = Array.from(document.querySelectorAll("script[type='application/ld+json']"), (script) => script.textContent ?? "");
    expect(schemas.some((schema) => schema.includes("BreadcrumbList") && schema.includes("/portfolio/atual-pet"))).toBe(true);
  });

  it("renders all FAQ answers in an accessible accordion", () => {
    renderRoute("/faq");

    expect(document.querySelectorAll(".faq-item")).toHaveLength(6);
    const first = document.querySelector<HTMLButtonElement>("#full-faq-button-0");
    expect(first?.getAttribute("aria-expanded")).toBe("true");
    expect(first?.getAttribute("aria-controls")).toBe("full-faq-panel-0");
    expect(screen.getAllByText("administrativo@orionpet.com.br", { exact: false }).length).toBeGreaterThan(0);
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

    for (const [path] of routes) expect(sitemap).toContain(`<loc>${path}</loc>`);
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Sitemap: /sitemap.xml");
    expect(vercel.rewrites).toEqual([{ source: "/(.*)", destination: "/index.html" }]);
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
    expect(css).toMatch(/\.method-mobile-sticky img,[\s\S]*?transition: none !important/);
    expect(css).toMatch(/\.faq-answer,[\s\S]*?transition: none !important/);
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
