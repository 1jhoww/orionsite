import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { confirmedPortfolioScale, portfolioCategories } from "../data/portfolio";
import { OrionButton } from "./OrionButton";
import { Reveal } from "./Reveal";

const STAGE_ID = "home-portfolio-stage";

export function PortfolioPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = portfolioCategories[activeIndex];
  const activeImage = active.imageSmall ?? active.image;

  const selectFromKeyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % portfolioCategories.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + portfolioCategories.length) % portfolioCategories.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = portfolioCategories.length - 1;
    }

    if (nextIndex === undefined) return;
    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

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
          <p className="home-portfolio-index-label" id="home-portfolio-index-label">Categorias</p>
          <ul role="tablist" aria-labelledby="home-portfolio-index-label">
            {portfolioCategories.map((category, index) => (
              <li role="presentation" key={category.id}>
                <button
                  type="button"
                  role="tab"
                  id={`home-portfolio-tab-${category.id}`}
                  className={`home-portfolio-index-link ${index === activeIndex ? "is-active" : ""}`}
                  aria-selected={index === activeIndex}
                  aria-controls={STAGE_ID}
                  tabIndex={index === activeIndex ? 0 : -1}
                  ref={(node) => { tabRefs.current[index] = node; }}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onKeyDown={(event) => selectFromKeyboard(event, index)}
                >
                  <span className="home-portfolio-index-title">{category.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="home-portfolio-stage" delay={90}>
          <div
            id={STAGE_ID}
            role="tabpanel"
            aria-labelledby={`home-portfolio-tab-${active.id}`}
            tabIndex={0}
          >
            <figure>
              <img
                key={active.id}
                src={activeImage}
                width={active.imageWidth}
                height={active.imageHeight}
                alt={active.imageAlt}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 820px) 100vw, 56vw"
              />
              <figcaption>
                <span className="home-portfolio-stage-name">{active.title}</span>
                <span className="home-portfolio-stage-note">Produção real Orion</span>
              </figcaption>
            </figure>
            <div className="home-portfolio-stage-copy">
              <p>{active.description}</p>
              <Link className="text-link" to={`/portfolio#${active.id}`}>
                <span>Ver no portfólio</span>
              </Link>
            </div>
          </div>
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
