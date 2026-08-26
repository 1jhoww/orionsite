import { useState } from "react";
import { Link } from "react-router-dom";
import { confirmedPortfolioScale, portfolioCategories } from "../data/portfolio";
import { OrionButton } from "./OrionButton";
import { Reveal } from "./Reveal";

export function PortfolioPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = portfolioCategories[activeIndex];
  const activeImage = active.imageSmall ?? active.image;

  return (
    <section className="home-portfolio" id="portfolio" aria-labelledby="home-portfolio-title">
      <div className="container home-portfolio-heading">
        <Reveal>
          <p className="eyebrow">Portfólio</p>
          <h2 id="home-portfolio-title">Soluções para diferentes etapas do cuidado pet.</h2>
        </Reveal>
        <Reveal delay={70}>
          <p>
            Da higiene à perfumaria, o portfólio Orion reúne diferentes aplicações,
            apresentações e possibilidades de desenvolvimento industrial.
          </p>
        </Reveal>
      </div>

      <div className="container home-portfolio-showcase">
        <Reveal className="home-portfolio-index">
          <p className="home-portfolio-index-label">Categorias</p>
          <ul>
            {portfolioCategories.map((category, index) => (
              <li key={category.id}>
                <Link
                  className={`home-portfolio-index-link ${index === activeIndex ? "is-active" : ""}`}
                  to={`/portfolio#${category.id}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                >
                  <span className="home-portfolio-index-title">{category.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="home-portfolio-stage" delay={90}>
          {/* Visual preview of the highlighted category — the links above carry the semantics. */}
          <figure aria-hidden="true">
            <img
              key={active.id}
              src={activeImage}
              width={active.imageWidth}
              height={active.imageHeight}
              alt=""
              loading="lazy"
              decoding="async"
              sizes="(max-width: 820px) 100vw, 56vw"
            />
            <figcaption>
              <span className="home-portfolio-stage-name">{active.title}</span>
              <span className="home-portfolio-stage-note">Produção real Orion</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <div className="container home-portfolio-brief">
        <Reveal className="home-portfolio-amplitude">
          <p className="home-portfolio-scale-line">
            <strong>{confirmedPortfolioScale.value}{confirmedPortfolioScale.suffix}</strong>
            <span>{confirmedPortfolioScale.label} para diferentes necessidades do mercado pet.</span>
          </p>
          <p>
            Conheça as categorias e os produtos reais que demonstram a capacidade de
            desenvolvimento e fabricação da Orion.
          </p>
          <OrionButton href="/portfolio">Explorar portfólio</OrionButton>
        </Reveal>
        <Reveal className="home-portfolio-detail" delay={80}>
          <span aria-hidden="true" />
          <p>Higiene · Tratamento · Finalização · Perfumaria · Cuidados específicos</p>
        </Reveal>
      </div>
    </section>
  );
}
