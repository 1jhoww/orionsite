import { useEffect, useRef, useState } from "react";
import { methodStages } from "../data/site";

export function OrionProcess() {
  const [activeIndex, setActiveIndex] = useState(0);
  const desktopStepRefs = useRef<(HTMLElement | null)[]>([]);
  const mobileStepRefs = useRef<(HTMLElement | null)[]>([]);
  const active = methodStages[activeIndex];
  const progress = methodStages.length > 1 ? (activeIndex / (methodStages.length - 1)) * 100 : 0;

  useEffect(() => {
    const observedSteps = [desktopStepRefs.current, mobileStepRefs.current];
    const observers = observedSteps.flatMap((steps) => steps.map((step, index) => {
      if (!step) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index);
        },
        { rootMargin: "-44% 0px -44% 0px", threshold: 0 },
      );
      observer.observe(step);
      return observer;
    }));
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return (
    <section className="orion-process method-scroll" id="processo" aria-labelledby="orion-process-title">
      <div className="container method-scroll-heading">
        <p className="eyebrow">Método Orion</p>
        <h2 id="orion-process-title">Ciência e tecnologia em cada etapa.</h2>
        <div className="method-heading-note">
          <p>Pesquisa, desenvolvimento técnico e produção formam uma narrativa industrial direta.</p>
          <span>Continue para acompanhar as etapas <i aria-hidden="true">↓</i></span>
        </div>
      </div>

      <div
        className="container method-scroll-desktop"
        style={{ "--method-progress": `${progress}%` } as React.CSSProperties}
      >
        <div className="method-scroll-steps">
          {methodStages.map((step, index) => (
            <article
              className={`method-scroll-step ${index === activeIndex ? "is-active" : ""}`}
              ref={(node) => { desktopStepRefs.current[index] = node; }}
              aria-current={index === activeIndex ? "step" : undefined}
              key={step.title}
            >
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <small>{step.detail}</small>
            </article>
          ))}
        </div>

        <figure className="method-scroll-sticky" key={active.image}>
          <picture>
            <source media="(max-width: 900px)" srcSet={active.imageSmall} />
            <img
              src={active.image}
              width="1200"
              height="800"
              alt={active.alt}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 820px) 100vw, 62vw"
              style={{ objectPosition: active.imagePosition }}
            />
          </picture>
          <figcaption aria-live="polite">
            <strong>{active.title}</strong>
            <span>{active.detail}</span>
          </figcaption>
        </figure>
      </div>

      <div className="container method-scroll-mobile" style={{ "--method-progress": `${progress}%` } as React.CSSProperties}>
        <div className="method-mobile-stage">
          <div className="method-mobile-sticky">
            <figure className="method-mobile-media" key={`mobile-${active.image}`}>
              <img src={active.imageSmall} width="720" height="480" alt={active.alt} loading="lazy" decoding="async" sizes="100vw" style={{ objectPosition: active.imagePosition }} />
              <figcaption>
                <strong>{active.title}</strong>
                <span>{active.detail}</span>
              </figcaption>
            </figure>
            <div className="method-mobile-active-copy" aria-live="polite">
              <h3>{active.title}</h3>
              <p>{active.description}</p>
              <small>{active.detail}</small>
            </div>
          </div>

          <div className="method-mobile-triggers" aria-hidden="true">
            {methodStages.map((step, index) => (
              <div
                className="method-mobile-trigger"
                ref={(node) => { mobileStepRefs.current[index] = node; }}
                key={step.title}
              />
            ))}
          </div>

          <ol className="sr-only" aria-label="Etapas do Método Orion">
            {methodStages.map((step) => (
              <li key={`accessible-${step.title}`}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <small>{step.detail}</small>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
