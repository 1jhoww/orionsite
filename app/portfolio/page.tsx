/* eslint-disable @next/next/no-img-element -- Official local brand assets are displayed at intrinsic dimensions. */
import type { Metadata } from "next";
import { InternalHero } from "../components/InternalHero";
import { OrionButton } from "../components/OrionButton";
import { PageCta } from "../components/PageCta";
import { brands } from "../data/site";

export const metadata: Metadata = {
  title: "Portfólio de marcas | Orion",
  description: "Conheça as marcas apresentadas no portfólio institucional da Orion: AtualPet, Quality Pet, Mais Dog e Dez Pet.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfólio de marcas | Orion",
    description: "Identidades distintas materializadas por uma mesma base industrial.",
    url: "/portfolio",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Portfólio institucional Orion" }],
  },
};

export default function PortfolioPage() {
  return (
    <main id="conteudo" className="internal-page portfolio-page">
      <InternalHero
        eyebrow="Portfólio"
        title="Marcas diferentes. Identidades preservadas."
        description="A Orion materializa propostas próprias para diferentes experiências de higiene, tratamento, cuidado e perfumaria pet."
        image="/brand/atualpet-case.webp"
        imageAlt="Composição de produtos das linhas AtualPet"
      />

      <section className="portfolio-directory" aria-labelledby="portfolio-directory-title">
        <div className="container section-heading-compact">
          <p className="eyebrow">Marcas produzidas</p>
          <h2 id="portfolio-directory-title">Um portfólio, diferentes universos de marca.</h2>
        </div>
        <div className="container portfolio-directory-grid">
          {brands.map((brand, index) => (
            <article className={`portfolio-index-card portfolio-index-card--${brand.surface} ${index === 0 ? "portfolio-index-card--feature" : ""}`} id={brand.slug} key={brand.name}>
              {index === 0 && (
                <figure className="portfolio-index-visual">
                  <img src="/brand/atualpet-case.webp" width="1600" height="900" alt="Produtos das cinco linhas AtualPet" loading="lazy" decoding="async" sizes="(max-width: 820px) 100vw, 68vw" />
                </figure>
              )}
              <div className="portfolio-index-logo">
                <img src={brand.logo} width={brand.width} height={brand.height} alt={brand.alt} loading="lazy" decoding="async" />
              </div>
              <div className="portfolio-index-copy">
                <h3>{brand.name}</h3>
                <p>{brand.description}</p>
                <OrionButton href={`/portfolio/${brand.slug}`} variant={index === 0 ? "light" : "secondary"}>
                  Conhecer a marca
                </OrionButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      <PageCta title="Sua marca pode ser o próximo projeto." />
    </main>
  );
}
