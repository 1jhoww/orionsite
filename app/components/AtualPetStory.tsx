"use client";

/* eslint-disable @next/next/no-img-element -- The official campaign artwork is pre-sized and served with responsive WebP sources. */
import { useEffect, useRef, useState } from "react";
import { atualPetLines } from "../data/site";

export function AtualPetStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index);
        if (Number.isFinite(index)) setActiveIndex(index);
      },
      { rootMargin: "-30% 0px -36% 0px", threshold: [0, 0.25, 0.5, 0.75] },
    );

    stepRefs.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="atual-story">
      <div
        className="atual-visual"
        aria-hidden="true"
        style={{ "--line-tone": atualPetLines[activeIndex].tone } as React.CSSProperties}
      >
        <div className="atual-visual-brand">
          <img src="/brand/atualpet-logo.webp" width="640" height="443" alt="" />
          <span>Uma marca produzida pela Orion</span>
        </div>
        {atualPetLines.map((line, index) => (
          <div
            className={`atual-frame ${index === activeIndex ? "is-active" : ""}`}
            style={{ "--line-tone": line.tone } as React.CSSProperties}
            key={line.name}
          >
            <picture>
              <source media="(max-width: 1000px)" srcSet={line.artworkSmall} />
              <img
                className="atual-frame-artwork"
                src={line.artwork}
                width="1440"
                height="960"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        ))}
      </div>

      <div className="atual-copy">
        {atualPetLines.map((line, index) => (
          <article
            className={`atual-step ${index === activeIndex ? "is-active" : ""}`}
            data-index={index}
            ref={(node) => { stepRefs.current[index] = node; }}
            key={line.name}
          >
            <img className="atual-step-logo" src={line.logo} alt={line.logoAlt} loading="lazy" decoding="async" />
            <h3 className="sr-only">{line.name}</h3>
            <p>{line.description}</p>
            <small>{line.detail}</small>
            <figure className="atual-step-artwork">
              <picture>
                <source media="(max-width: 700px)" srcSet={line.artworkSmall} />
                <img
                  src={line.artwork}
                  width="1440"
                  height="960"
                  alt={line.artworkAlt}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </figure>
          </article>
        ))}
      </div>
    </div>
  );
}
