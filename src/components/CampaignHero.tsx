import { useEffect, useRef, useState } from "react";
import { OrionButton } from "./OrionButton";

const HERO_ROTATION_MS = 5_000;

const heroSlides = [
  {
    image: "/media/factory/tanques-orion-v2.webp",
    imageSmall: "/media/factory/tanques-orion-v2-720.webp",
    width: 1440,
    height: 2160,
    alt: "Tanques industriais da fábrica Orion integrados aos equipamentos de produção",
    position: "50% 45%",
  },
  {
    image: "/media/factory/tanques-orion.webp",
    imageSmall: "/media/factory/tanques-orion-720.webp",
    width: 1440,
    height: 2158,
    alt: "Estrutura de tanques industriais da fábrica Orion",
    position: "50% 45%",
  },
  {
    image: "/media/company/history-current-factory.webp",
    imageSmall: "/media/company/history-current-factory-720.webp",
    width: 1440,
    height: 2160,
    alt: "Estrutura atual da fábrica Orion em operação",
    position: "50% 48%",
  },
  {
    image: "/media/factory/envase-orion-v2.webp",
    imageSmall: "/media/factory/envase-orion-v2-720.webp",
    width: 1440,
    height: 2160,
    alt: "Envase de produtos na linha de produção da fábrica Orion",
    position: "52% 48%",
  },
] as const;

export function CampaignHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const loadedSlides = useRef(new Set<number>());

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rotationTimer: number | undefined;

    const syncRotation = () => {
      if (rotationTimer !== undefined) window.clearInterval(rotationTimer);

      if (motionPreference.matches) {
        setActiveSlide(0);
        rotationTimer = undefined;
        return;
      }

      rotationTimer = window.setInterval(() => {
        setActiveSlide((current) => {
          for (let offset = 1; offset <= heroSlides.length; offset += 1) {
            const next = (current + offset) % heroSlides.length;
            if (loadedSlides.current.has(next)) return next;
          }

          return current;
        });
      }, HERO_ROTATION_MS);
    };

    syncRotation();
    motionPreference.addEventListener?.("change", syncRotation);

    return () => {
      if (rotationTimer !== undefined) window.clearInterval(rotationTimer);
      motionPreference.removeEventListener?.("change", syncRotation);
    };
  }, []);

  return (
    <section className="industrial-hero" id="inicio" aria-labelledby="hero-title">
      <div className="container industrial-hero-layout">
        <div className="industrial-hero-copy">
          <p className="industrial-hero-kicker">Indústria de soluções para o mercado pet</p>
          <h1 id="hero-title">
            Indústria que transforma desenvolvimento em produto.
          </h1>
          <p className="industrial-hero-support">
            A Orion integra desenvolvimento, formulação, produção, envase e entrega para
            materializar soluções B2B de higiene, tratamento, cuidado e perfumaria pet.
          </p>
          <div className="industrial-hero-actions">
            <OrionButton href="#solucoes">Conheça nossas soluções</OrionButton>
            <OrionButton href="#contato" variant="secondary">Fale com a Orion</OrionButton>
          </div>
        </div>

        <figure className="industrial-hero-media">
          {heroSlides.map((slide, index) => (
            <picture
              className={`industrial-hero-slide ${index === activeSlide ? "is-active" : ""}`}
              aria-hidden={index !== activeSlide}
              key={slide.image}
            >
              <source media="(max-width: 820px)" srcSet={slide.imageSmall} />
              <img
                src={slide.image}
                width={slide.width}
                height={slide.height}
                alt={slide.alt}
                fetchPriority={index === 0 ? "high" : "low"}
                loading="eager"
                decoding="async"
                style={{ objectPosition: slide.position }}
                onLoad={() => loadedSlides.current.add(index)}
              />
            </picture>
          ))}
          <figcaption>
            <span>Estrutura industrial integrada</span>
            Desenvolvimento · produção · envase
          </figcaption>
        </figure>
      </div>

      <div className="container industrial-hero-flow" aria-label="Atuação da Orion">
        {["Desenvolvimento", "Formulação", "Documentação", "Produção", "Envase", "Entrega"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      {/* Breathing zone between the hero and the scale band: a technical descender, not content. */}
      <div className="container industrial-hero-transition" aria-hidden="true">
        <span className="industrial-hero-transition-line" />
      </div>
    </section>
  );
}
