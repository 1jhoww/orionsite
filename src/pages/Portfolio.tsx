import { AnimatedMetric } from "../components/AnimatedMetric";
import { BrandEcosystemMarquee } from "../components/BrandEcosystemMarquee";
import { PageCta } from "../components/PageCta";
import { PortfolioHero } from "../components/PortfolioHero";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";
import { confirmedPortfolioScale, portfolioCategories, portfolioConstellation } from "../data/portfolio";

export default function PortfolioPage() {
  return (
    <>
      <Seo
        title="Portfólio industrial de cosméticos pet | Orion"
        description="Conheça categorias de cosméticos pet desenvolvidas e fabricadas pela Orion, com shampoos, condicionadores, máscaras, perfumes e cuidados especiais."
        path="/portfolio"
        ogDescription="Produtos reais organizados por categoria mostram a amplitude de desenvolvimento e fabricação da Orion."
        image={portfolioConstellation.image ?? "/og.png"}
        imageWidth={portfolioConstellation.width}
        imageHeight={portfolioConstellation.height}
        imageAlt={portfolioConstellation.alt}
      />
      <main id="conteudo" className="internal-page portfolio-page">
        <PortfolioHero />

        <BrandEcosystemMarquee />

        <section className="portfolio-introduction" aria-labelledby="portfolio-introduction-title">
          <div className="container portfolio-introduction-layout">
            <Reveal>
              <p className="eyebrow">Portfólio real</p>
              <h2 id="portfolio-introduction-title">Um portfólio construído para diferentes necessidades.</h2>
            </Reveal>
            <Reveal delay={70}>
              <p>
                As categorias mostram como desenvolvimento, formulação e fabricação atendem
                diferentes etapas do cuidado, formatos de uso e apresentações comerciais.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="portfolio-categories" aria-label="Categorias de produtos do portfólio Orion">
          <div className="container portfolio-category-list">
            {portfolioCategories.map((category) => (
              <article className="portfolio-category" id={category.id} key={category.id}>
                <Reveal
                  as="figure"
                  className="portfolio-category-media portfolio-category-media--transparent"
                >
                  <picture>
                    {category.imageSmall && (
                      <source media="(max-width: 700px)" srcSet={category.imageSmall} type="image/webp" />
                    )}
                    {category.imageWebp && <source srcSet={category.imageWebp} type="image/webp" />}
                    <img
                      src={category.image}
                      width={category.imageWidth}
                      height={category.imageHeight}
                      alt={category.imageAlt}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 820px) 100vw, 58vw"
                    />
                  </picture>
                </Reveal>
                <Reveal className="portfolio-category-copy" delay={70}>
                  <h2>{category.title}</h2>
                  <p>{category.description}</p>
                  <p className="portfolio-category-application">{category.application}</p>
                </Reveal>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-scale" aria-labelledby="portfolio-scale-title">
          <div className="container portfolio-scale-heading">
            <Reveal>
              <p className="eyebrow">Escala de desenvolvimento</p>
              <h2 id="portfolio-scale-title">Experiência aplicada a um portfólio amplo.</h2>
            </Reveal>
            <Reveal as="p" delay={70}>
              Diferentes categorias, aplicações e necessidades reunidas em uma estrutura
              preparada para desenvolver e fabricar cosméticos pet.
            </Reveal>
          </div>
          <div className="container portfolio-scale-editorial">
            <AnimatedMetric
              value={confirmedPortfolioScale.value}
              suffix={confirmedPortfolioScale.suffix}
              label={confirmedPortfolioScale.label}
            />
            <p className="portfolio-scale-statement">
              SKUs que representam diferentes categorias, aplicações, apresentações e
              necessidades do mercado pet.
            </p>
          </div>
        </section>

        <PageCta
          title="Sua próxima categoria pode nascer aqui."
          text="Conte à Orion qual produto, aplicação e direção de marca você quer desenvolver."
        />
      </main>
    </>
  );
}
