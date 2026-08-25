import { Link } from "react-router-dom";
import { brands } from "../data/site";
import { Reveal } from "./Reveal";
import { OrionButton } from "./OrionButton";

const previewBrands = brands.slice(0, 3);
const brandLinks: Record<string, string> = {
  AtualPet: "/portfolio/atual-pet",
  "Quality Pet": "/portfolio/quality-pet",
  "Mais Dog": "/portfolio/mais-dog",
};

export function PortfolioPreview() {
  return (
    <section className="home-portfolio" id="portfolio" aria-labelledby="home-portfolio-title">
      <div className="container home-portfolio-heading">
        <Reveal>
          <p className="eyebrow">Portfólio</p>
          <h2 id="home-portfolio-title">Marcas desenvolvidas para diferentes necessidades.</h2>
        </Reveal>
        <Reveal delay={70}>
          <p>
            Uma mesma base industrial materializa identidades próprias para diferentes
            experiências de higiene, tratamento, cuidado e perfumaria pet.
          </p>
        </Reveal>
      </div>

      <div className="container home-portfolio-grid">
        {previewBrands.map((brand, index) => (
          <Reveal
            as="article"
            className={`home-brand-card home-brand-card--${index === 0 ? "feature" : brand.surface}`}
            delay={index * 75}
            key={brand.name}
          >
            <Link to={brandLinks[brand.name]} aria-label={`Explorar ${brand.name}`}>
              {index === 0 && (
                <figure className="home-brand-visual">
                  <img
                    src="/brand/atualpet-case.webp"
                    width="1600"
                    height="900"
                    alt="Produtos de diferentes linhas da AtualPet"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 820px) 100vw, 64vw"
                  />
                </figure>
              )}
              <div className="home-brand-logo">
                <img src={brand.logo} width={brand.width} height={brand.height} alt={brand.alt} loading="lazy" decoding="async" />
              </div>
              <div className="home-brand-copy">
                <h3>{brand.name}</h3>
                <p>{brand.description}</p>
                <span className="orion-card-cta">Explorar {brand.name} <i aria-hidden="true">↗</i></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="container home-portfolio-more">
        <OrionButton href="/portfolio" variant="secondary">Ver portfólio completo</OrionButton>
      </div>
    </section>
  );
}
