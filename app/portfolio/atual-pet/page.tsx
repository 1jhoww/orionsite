/* eslint-disable @next/next/no-img-element -- Official campaign artwork and logos are local and explicitly sized. */
import type { Metadata } from "next";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { PageCta } from "../../components/PageCta";
import { atualPetLines } from "../../data/site";

export const metadata: Metadata = {
  title: "AtualPet | Portfólio Orion",
  description: "Conheça a AtualPet e suas cinco linhas: Dream Color, Dream Color Care, The Luxe, Vanity Pet e Zoom.",
  alternates: { canonical: "/portfolio/atual-pet" },
  openGraph: {
    title: "AtualPet | Portfólio Orion",
    description: "Uma marca produzida pela Orion, apresentada por cinco identidades de linha.",
    url: "/portfolio/atual-pet",
    images: [{ url: "/brand/atualpet-case.webp", width: 1600, height: 900, alt: "Produtos das linhas AtualPet" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AtualPet | Portfólio Orion",
    description: "Uma marca produzida pela Orion, apresentada por cinco identidades de linha.",
    images: ["/brand/atualpet-case.webp"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: "/" },
    { "@type": "ListItem", position: 2, name: "Portfólio", item: "/portfolio" },
    { "@type": "ListItem", position: 3, name: "AtualPet", item: "/portfolio/atual-pet" },
  ],
};

export default function AtualPetPage() {
  return (
    <main id="conteudo" className="internal-page brand-page">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Portfólio", href: "/portfolio" }, { label: "AtualPet" }]} />

      <section className="brand-page-hero" aria-labelledby="atualpet-page-title">
        <div className="container brand-page-hero-layout">
          <div className="brand-page-hero-copy">
            <p className="eyebrow">Marca produzida pela Orion</p>
            <img src="/brand/atualpet-logo.webp" width="640" height="443" alt="Logo oficial da AtualPet" fetchPriority="high" />
            <h1 id="atualpet-page-title">Uma marca. Cinco identidades de linha.</h1>
            <p>Higiene, tratamento, cuidado e perfumaria organizados em universos visuais próprios.</p>
          </div>
          <figure className="brand-page-hero-media">
            <img src="/brand/atualpet-case.webp" width="1600" height="900" alt="Produtos das diferentes linhas AtualPet" fetchPriority="high" decoding="async" sizes="(max-width: 820px) 100vw, 62vw" />
          </figure>
        </div>
      </section>

      <section className="brand-lines" aria-labelledby="atualpet-lines-title">
        <div className="container section-heading-compact">
          <p className="eyebrow">Linhas AtualPet</p>
          <h2 id="atualpet-lines-title">Cinco propostas para diferentes momentos do cuidado.</h2>
        </div>
        <div className="container brand-lines-list">
          {atualPetLines.map((line) => (
            <article className="brand-line" style={{ "--line-tone": line.tone } as React.CSSProperties} key={line.name}>
              <figure className="brand-line-artwork">
                <picture>
                  <source media="(max-width: 820px)" srcSet={line.artworkSmall} />
                  <img src={line.artwork} width="1200" height="800" alt={line.artworkAlt} loading="lazy" decoding="async" sizes="(max-width: 820px) 100vw, 62vw" />
                </picture>
              </figure>
              <div className="brand-line-copy">
                <img src={line.logo} width="500" height="300" alt={line.logoAlt} loading="lazy" decoding="async" />
                <h3>{line.name}</h3>
                <p>{line.description}</p>
                <small>{line.detail}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <PageCta title="Vamos desenvolver uma nova identidade de produto?" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </main>
  );
}
