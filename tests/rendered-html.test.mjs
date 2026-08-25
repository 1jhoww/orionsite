import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

async function render(path = "/", init) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, {
      ...init,
      headers: { accept: "text/html", ...init?.headers },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function loadContactModule() {
  const source = await readFile(new URL("../app/lib/contact.ts", import.meta.url), "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(output).toString("base64")}#${Date.now()}-${Math.random()}`);
}

test("server-renders the Orion home with its editorial portfolio bridge and classic method", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html[^>]+lang="pt-BR"/i);
  assert.match(html, /Tecnologia e excelência no desenvolvimento de soluções para o mercado pet/);
  assert.match(html, /Marcas desenvolvidas para diferentes necessidades/);
  assert.ok(html.indexOf("Marcas desenvolvidas para diferentes necessidades") < html.indexOf("Da pesquisa à entrega"));
  assert.ok(html.includes("/portfolio/atual-pet"));
  assert.ok(html.includes("/portfolio/quality-pet"));
  assert.ok(html.includes("/portfolio/mais-dog"));
  assert.match(html, /Higiene base/);
  assert.match(html, /Tratamento avançado/);
  assert.match(html, /Finalização e perfumaria/);
  assert.match(html, /Cuidado especializado/);
  assert.match(html, /Ciência e tecnologia em cada etapa/);
  assert.match(html, /Continue para acompanhar as etapas/);
  assert.doesNotMatch(html, /orion-star|method-star|Rotação do símbolo/i);
  assert.match(html, /class="method-scroll-sticky"/);
  assert.match(html, /class="method-mobile-sticky"/);
  assert.equal((html.match(/class="method-mobile-trigger"/g) ?? []).length, 3);
  assert.doesNotMatch(html, /Selecionar Pesquisa|Explore o processo|role="tablist"/);
  assert.match(html, /Um caminho claro, do briefing ao produto/);
  assert.match(html, /Alinhamento Comercial/);
  assert.match(html, /Formulação e Amostras/);
  assert.match(html, /Produção e Envase/);
  assert.match(html, /Entrega Logística/);
  assert.match(html, /Da direção de marca ao produto final/);
  assert.match(html, /O essencial para começar uma conversa/);
  assert.match(html, /Vamos conversar sobre seu projeto/);
  assert.match(html, /administrativo@orionpet\.com\.br/);
  assert.match(html, /\(11\) 96232-0441/);
  assert.match(html, /name="name"/);
  assert.match(html, /name="company"/);
  assert.match(html, /name="email"/);
  assert.match(html, /name="phone"/);
  assert.match(html, /name="subject"/);
  assert.match(html, /name="message"/);
  assert.match(html, /Informações comerciais/);
  assert.match(html, /Terceirização/);
  assert.match(html, /Portfólio/);
  assert.match(html, /Parcerias/);
  assert.match(html, /Outros/);
  assert.match(html, /Continuar pelo WhatsApp/);
  assert.match(html, /Você decide quando enviar/);
  assert.doesNotMatch(html, /atualpet-showcase|atual-visual|Uma marca\. Cinco identidades de linha/);
  assert.ok(html.includes("/brand/orion-logo-white.png"));
  assert.doesNotMatch(html, /Total Pet|My Dog|Despet|Deluxe/);
  assert.match(html, /application\/ld\+json/);
});

test("server-renders every institutional route with unique metadata", async () => {
  const routes = [
    ["/sobre", "Uma operação integrada para transformar intenção em produto", "Sobre a Orion | Indústria para o mercado pet"],
    ["/portfolio", "Marcas diferentes. Identidades preservadas", "Portfólio de marcas | Orion"],
    ["/portfolio/atual-pet", "Uma marca. Cinco identidades de linha", "AtualPet | Portfólio Orion"],
    ["/portfolio/quality-pet", "Portfólio em desenvolvimento", "Quality Pet | Portfólio Orion"],
    ["/portfolio/mais-dog", "Portfólio em desenvolvimento", "Mais Dog | Portfólio Orion"],
    ["/portfolio/dez-pet", "Portfólio em desenvolvimento", "Dez Pet | Portfólio Orion"],
    ["/terceirizacao", "Da ideia ao produto final", "Terceirização para o mercado pet | Orion"],
    ["/faq", "Perguntas frequentes. Respostas diretas", "Perguntas frequentes | Orion"],
  ];

  for (const [path, heading, title] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), path);
    assert.match(html, new RegExp(`<title>${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</title>`), path);
    assert.match(html, new RegExp(`rel="canonical"[^>]+http://localhost(?::3000)?${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`), path);
  }
});

test("keeps rich line content exclusively on AtualPet and links every confirmed brand page", async () => {
  const [portfolioResponse, atualPetResponse, qualityResponse, maisResponse, dezResponse] = await Promise.all([
    render("/portfolio"),
    render("/portfolio/atual-pet"),
    render("/portfolio/quality-pet"),
    render("/portfolio/mais-dog"),
    render("/portfolio/dez-pet"),
  ]);
  const portfolio = await portfolioResponse.text();
  const atualPet = await atualPetResponse.text();
  const placeholders = await Promise.all([qualityResponse.text(), maisResponse.text(), dezResponse.text()]);

  for (const brand of ["AtualPet", "Quality Pet", "Mais Dog", "Dez Pet"]) {
    assert.match(portfolio, new RegExp(brand));
  }
  for (const slug of ["atual-pet", "quality-pet", "mais-dog", "dez-pet"]) {
    assert.match(portfolio, new RegExp(`href="/portfolio/${slug}"`));
  }

  for (const line of ["Dream Color", "Dream Color Care", "The Luxe", "Vanity Pet", "Zoom"]) {
    assert.match(atualPet, new RegExp(line));
  }
  assert.equal((atualPet.match(/class="brand-line"/g) ?? []).length, 5);
  assert.match(atualPet, /BreadcrumbList/);
  assert.match(atualPet, /\/media\/lines\/dream-color\.webp/);
  assert.match(atualPet, /\/media\/lines\/zoom\.webp/);

  for (const html of placeholders) {
    assert.match(html, /Portfólio em desenvolvimento/);
    assert.match(html, /Conteúdo institucional confirmado/);
    assert.doesNotMatch(html, /Dream Color|The Luxe|Vanity Pet|Zoom/);
  }
});

test("publishes six confirmed FAQ answers and accessible accordion state", async () => {
  const response = await render("/faq");
  const html = await response.text();
  assert.equal((html.match(/class="faq-item/g) ?? []).length, 6);
  assert.match(html, /aria-expanded="true"/);
  assert.match(html, /aria-controls="full-faq-panel-0"/);
  assert.match(html, /administrativo@orionpet\.com\.br/);
  assert.match(html, /\(11\) 96232-0441/);
});

test("publishes Orion social and theme metadata", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /<meta[^>]+name="theme-color"[^>]+content="#0b6186"/i);
  assert.ok(html.includes('property="og:image" content="http://localhost:3000/og.png"'));
  assert.match(html, /<meta[^>]+property="og:image:width"[^>]+content="1200"/i);
  assert.ok(html.includes('rel="icon" href="/favicon.png"'));
});

test("publishes dynamic robots and all sitemap routes", async () => {
  const [robots, sitemap] = await Promise.all([render("/robots.txt"), render("/sitemap.xml")]);
  assert.equal(robots.status, 200);
  assert.equal(sitemap.status, 200);
  assert.match(await robots.text(), /Sitemap: http:\/\/localhost\/sitemap\.xml/);
  const xml = await sitemap.text();
  for (const path of ["/", "/sobre", "/portfolio", "/portfolio/atual-pet", "/portfolio/quality-pet", "/portfolio/mais-dog", "/portfolio/dez-pet", "/terceirizacao", "/faq"]) {
    assert.match(xml, new RegExp(`<loc>http://localhost${path === "/" ? "/" : path}</loc>`));
  }
});

test("keeps explicit reduced-motion fallbacks for the new interactions", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /\.method-scroll-sticky img,[\s\S]*?transition: none !important/);
  assert.match(css, /\.method-mobile-sticky img,[\s\S]*?transition: none !important/);
  assert.doesNotMatch(css, /\.method-star/);
  assert.match(css, /\.faq-answer,[\s\S]*?transition: none !important/);
  assert.match(css, /\.partnership-step,[\s\S]*?transition: none !important/);
});

test("keeps the future company history unrendered until validated milestones exist", async () => {
  const [aboutResponse, dataSource, componentSource] = await Promise.all([
    render("/sobre"),
    readFile(new URL("../app/data/site.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/CompanyHistory.tsx", import.meta.url), "utf8"),
  ]);
  const about = await aboutResponse.text();
  assert.doesNotMatch(about, /Nossa história|company-history/);
  assert.match(dataSource, /companyHistory:\s*CompanyHistoryItem\[\]\s*=\s*\[\]/);
  assert.match(componentSource, /if \(items\.length === 0\) return null/);
  assert.match(componentSource, /ArrowRight|ArrowLeft/);
});

test("builds a correctly encoded Orion WhatsApp conversation and omits empty optional fields", async () => {
  const { buildWhatsAppUrl, validateContactPayload, ORION_WHATSAPP_NUMBER } = await loadContactModule();
  const validation = validateContactPayload({
    name: "Contato com acento",
    company: "",
    email: "contato+orion@example.com",
    phone: "",
    subject: "Terceirização",
    message: "Olá!\nMensagem com ação, símbolos & detalhes.",
  });
  assert.deepEqual(validation.errors, {});

  const url = buildWhatsAppUrl(validation.data);
  assert.equal(ORION_WHATSAPP_NUMBER, "5511962320441");
  assert.match(url, /^https:\/\/wa\.me\/5511962320441\?text=/);
  assert.doesNotMatch(url, /\s/);

  const message = new URL(url).searchParams.get("text");
  assert.match(message, /^Olá, gostaria de falar com a equipe da Orion\./);
  assert.match(message, /Nome: Contato com acento/);
  assert.match(message, /E-mail: contato\+orion@example\.com/);
  assert.match(message, /Assunto: Terceirização/);
  assert.match(message, /Mensagem:\nOlá!\nMensagem com ação, símbolos & detalhes\./);
  assert.doesNotMatch(message, /Empresa:|Telefone:/);

  const complete = validateContactPayload({
    name: "Contato",
    company: "Empresa",
    email: "contato@example.com",
    phone: "(11) 99999-9999",
    subject: "Parcerias",
    message: "Mensagem válida para a conversa.",
  });
  const completeMessage = new URL(buildWhatsAppUrl(complete.data)).searchParams.get("text");
  assert.match(completeMessage, /Empresa: Empresa/);
  assert.match(completeMessage, /Telefone: \(11\) 99999-9999/);

  const longValidation = validateContactPayload({
    name: "Contato",
    email: "contato@example.com",
    message: "á".repeat(3500),
  });
  assert.equal(longValidation.data.message.length, 3000);
  const longMessage = new URL(buildWhatsAppUrl(longValidation.data)).searchParams.get("text");
  assert.match(longMessage, /Mensagem:\n/);
  assert.equal(longMessage.endsWith("á".repeat(3000)), true);
});

test("keeps the unused 501 contact route isolated for a possible future e-mail integration", async () => {
  const invalid = await render("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "", email: "inválido", message: "curta" }),
  });
  assert.equal(invalid.status, 400);
  const invalidResult = await invalid.json();
  assert.match(invalidResult.errors.name, /nome/i);
  assert.match(invalidResult.errors.email, /válido/i);
  assert.match(invalidResult.errors.message, /10 caracteres/i);

  const pending = await render("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "Pessoa de teste",
      company: "Empresa",
      email: "teste@example.com",
      phone: "(11) 99999-9999",
      subject: "Informações comerciais",
      message: "Mensagem válida para testar a integração.",
    }),
  });
  assert.equal(pending.status, 501);
  const pendingResult = await pending.json();
  assert.equal(pendingResult.ok, false);
  assert.equal(pendingResult.code, "CONTACT_DELIVERY_NOT_CONFIGURED");
  assert.match(pendingResult.message, /integração de um serviço de e-mail/i);
});
