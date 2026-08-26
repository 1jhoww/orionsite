import { useEffect, useRef, useState } from "react";

const stages = [
  {
    title: "Briefing e entendimento",
    text: "Categoria, aplicação, público, posicionamento, volumes e objetivos comerciais definem a direção inicial do projeto.",
    details: ["Entendimento da necessidade", "Definição do produto", "Alinhamento de escopo"],
  },
  {
    title: "Desenvolvimento, formulação e amostras",
    text: "A formulação é desenvolvida a partir da aplicação pretendida e avança por amostras e avaliações antes da definição final.",
    details: ["Direção técnica", "Formulação", "Amostras para avaliação"],
  },
  {
    title: "Documentação e registro",
    text: "A Orion oferece apoio na organização documental e nos processos necessários para regularização e registro do produto.",
    details: ["Organização documental", "Apoio aos processos necessários", "Preparação vinculada ao projeto"],
  },
  {
    title: "Identidade visual e materiais",
    text: "Desenvolvimento de identidade visual e materiais gráficos pode ser incorporado ao projeto conforme o escopo comercial.",
    details: ["Direção visual", "Aplicação em embalagem", "Materiais gráficos conforme o escopo"],
  },
  {
    title: "Produção e envase",
    text: "Com as definições do projeto concluídas, a solução segue para planejamento produtivo, fabricação, envase, identificação e acabamento.",
    details: ["Planejamento produtivo", "Fabricação", "Envase e finalização"],
  },
  {
    title: "Preparação logística e entrega",
    text: "O produto finalizado é conferido, preparado para expedição e integrado ao fluxo logístico alinhado com o parceiro.",
    details: ["Conferência final", "Preparação para expedição", "Entrega"],
  },
] as const;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function OutsourcingTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail) return;

    const setProgress = (railValue: number, stepValues: number[]) => {
      // Written straight to the DOM: the fill stays frame-accurate without re-rendering.
      section.style.setProperty("--rail-progress", railValue.toFixed(4));
      stepRefs.current.forEach((step, index) => {
        step?.style.setProperty("--step-progress", (stepValues[index] ?? 0).toFixed(4));
      });
    };

    // Reduced motion: the whole path is drawn and every stage is fully legible from the start.
    // Only the DOM is touched here — no scroll listener, no state churn.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1, stages.map(() => 1));
      return;
    }

    let animationFrame = 0;
    const measure = () => {
      const steps = stepRefs.current.filter((step): step is HTMLLIElement => Boolean(step));
      if (steps.length === 0) return;

      const mobile = window.innerWidth <= 820;
      // The reading line the progression is anchored to. Nothing is scrolled or snapped to it.
      const focus = window.innerHeight * (mobile ? 0.44 : 0.5);
      const railRect = rail.getBoundingClientRect();

      // The head of the drawn line sits exactly on the reading line, so the fill is scroll-linked.
      const railValue = railRect.height > 0 ? clamp01((focus - railRect.top) / railRect.height) : 0;

      // Each stage ramps in over a fixed distance and reaches full presence at its own marker.
      const ramp = mobile ? 130 : 180;
      const markers = steps.map((step) => {
        const rect = step.getBoundingClientRect();
        return mobile ? rect.top + 26 : rect.top + rect.height / 2;
      });
      const stepValues = markers.map((marker) => clamp01((focus - marker + ramp) / ramp));

      let next = 0;
      markers.forEach((marker, index) => {
        if (marker <= focus) next = index;
      });

      setProgress(railValue, stepValues);
      if (next !== activeIndexRef.current) {
        activeIndexRef.current = next;
        setActiveIndex(next);
      }
    };

    const scheduleMeasure = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(measure);
    };

    scheduleMeasure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, []);

  return (
    <section className="outsourcing-timeline" aria-labelledby="outsourcing-timeline-title" ref={sectionRef}>
      <div className="container outsourcing-timeline-layout">
        <div className="outsourcing-timeline-intro">
          <div>
            <p className="eyebrow">Processo de parceria</p>
            <h2 id="outsourcing-timeline-title">Etapas conectadas, do briefing à entrega.</h2>
            <p>
              O projeto avança com decisões técnicas e comerciais coordenadas, sem interferir
              no ritmo natural de navegação da página.
            </p>
          </div>
        </div>

        <div className="outsourcing-timeline-sequence">
          <div className="outsourcing-timeline-progress" aria-hidden="true" ref={railRef}>
            <span />
          </div>
          <ol className="outsourcing-timeline-steps">
            {stages.map((stage, index) => {
              const state = index === activeIndex ? "active" : index < activeIndex ? "past" : "upcoming";
              return (
                <li
                  data-index={index}
                  data-state={state}
                  ref={(element) => { stepRefs.current[index] = element; }}
                  key={stage.title}
                >
                  <div>
                    <h3>{stage.title}</h3>
                    <p>{stage.text}</p>
                    <ul>{stage.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
