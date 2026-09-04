import { portfolioConstellation } from "../data/portfolio";

export function PortfolioHero() {
  return (
    <section className="portfolio-hero" aria-labelledby="portfolio-hero-title">
      <div className="container portfolio-hero-layout">
        <div className="portfolio-hero-copy">
          <p className="eyebrow">Portfólio industrial</p>
          <h1 id="portfolio-hero-title">Da higiene à finalização, soluções para diferentes aplicações.</h1>
          <p>
            O portfólio reúne cosméticos pet desenvolvidos e fabricados para higiene,
            condicionamento, tratamento, finalização, perfumaria e cuidados específicos.
          </p>
        </div>

        {portfolioConstellation.image && (
          <figure className="portfolio-hero-constellation">
            <picture>
              {portfolioConstellation.mobileImage && (
                <source
                  media="(max-width: 820px)"
                  srcSet={portfolioConstellation.mobileImage}
                  type="image/webp"
                />
              )}
              {portfolioConstellation.imageWebp && (
                <source srcSet={portfolioConstellation.imageWebp} type="image/webp" />
              )}
              <img
                src={portfolioConstellation.image}
                width={portfolioConstellation.width}
                height={portfolioConstellation.height}
                alt={portfolioConstellation.alt}
                fetchPriority="high"
                decoding="async"
                sizes="(max-width: 820px) 112vw, 58vw"
              />
            </picture>
          </figure>
        )}
      </div>
    </section>
  );
}
