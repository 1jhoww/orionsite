import type { Brand } from "../data/site";
import { Breadcrumbs } from "./Breadcrumbs";
import { PageCta } from "./PageCta";
import { BreadcrumbJsonLd } from "./StructuredData";

export function BrandPortfolioPage({ brand }: { brand: Brand }) {
  const pagePath = `/portfolio/${brand.slug}`;
  const titleId = `${brand.slug}-title`;
  return (
    <main id="conteudo" className="internal-page brand-placeholder-page">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Portfólio", href: "/portfolio" }, { label: brand.name }]} />

      <section className="brand-placeholder-hero" aria-labelledby={titleId}>
        <div className="container brand-placeholder-hero-layout">
          <div className="brand-placeholder-copy">
            <p className="eyebrow">Marca produzida pela Orion</p>
            <h1 id={titleId}>{brand.name}</h1>
            <p>{brand.description}</p>
          </div>
          <figure className={`brand-placeholder-logo brand-placeholder-logo--${brand.surface}`}>
            <img src={brand.logo} width={brand.width} height={brand.height} alt={brand.alt} fetchPriority="high" />
          </figure>
        </div>
      </section>

      <section className="brand-future" aria-labelledby={`${brand.slug}-portfolio-title`}>
        <div className="container brand-future-layout">
          <div>
            <p className="eyebrow">Portfólio da marca</p>
            <h2 id={`${brand.slug}-portfolio-title`}>Portfólio em desenvolvimento.</h2>
          </div>
          <div className="brand-future-copy">
            <p>
              Esta área foi preparada para receber linhas, produtos e imagens oficiais da {brand.name}
              à medida que os materiais forem validados.
            </p>
            <span>Conteúdo institucional confirmado</span>
          </div>
        </div>
      </section>

      <PageCta title="Vamos conversar sobre um novo projeto?" />
      <BreadcrumbJsonLd items={[{ name: "Início", path: "/" }, { name: "Portfólio", path: "/portfolio" }, { name: brand.name, path: pagePath }]} />
    </main>
  );
}
