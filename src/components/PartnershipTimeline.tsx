import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const partnershipSteps = [
  {
    title: "Alinhamento Comercial",
    description: "Categoria, posicionamento, público e escopo definem a direção; identidade visual pode integrar o projeto como etapa complementar.",
  },
  {
    title: "Desenvolvimento e Documentação",
    description: "Formulação e amostras avançam com apoio à organização documental e aos processos de regularização e registro.",
  },
  {
    title: "Produção e Envase",
    description: "Fabricação e apresentação avançam com consistência em relação ao desenvolvimento aprovado.",
  },
  {
    title: "Entrega Logística",
    description: "O produto finalizado segue preparado para integrar o fluxo comercial do parceiro.",
  },
] as const;

export function PartnershipTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsActive(true);
        observer.disconnect();
      },
      // Start only once the sequence is genuinely in the reading area, so the build-up is watched.
      { rootMargin: "0px 0px -24% 0px", threshold: 0.28 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`partnership ${isActive ? "is-active" : ""}`}
      aria-labelledby="partnership-title"
      ref={sectionRef}
    >
      <div className="container partnership-heading">
        <Reveal>
          <p className="eyebrow">Parceria B2B</p>
          <h2 id="partnership-title">Um caminho claro, do briefing ao produto.</h2>
        </Reveal>
        <Reveal delay={70}>
          <p>Cada projeto avança por etapas conectadas, com alinhamento entre intenção de marca e execução industrial.</p>
        </Reveal>
      </div>
      <ol className="container partnership-steps" aria-label="Etapas da parceria B2B">
        {partnershipSteps.map((step, index) => (
          <li
            className="partnership-step"
            // Each marker lands roughly when the drawing line reaches its position.
            style={{ "--timeline-delay": `${300 + index * 420}ms` } as React.CSSProperties}
            key={step.title}
          >
            <span className="partnership-marker" aria-hidden="true" />
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
