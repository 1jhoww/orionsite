import { useCallback, useEffect, useRef, useState } from "react";

type OutsourcingHeroStage = {
  id: "idea" | "formula" | "product";
  indicator: string;
  title: string;
  text: string;
  detail?: string;
  detailText?: string;
  image: string;
  imageSmall: string;
};

export const outsourcingHeroStages: readonly OutsourcingHeroStage[] = [
  {
    id: "idea",
    indicator: "Ideia",
    title: "Sua ideia",
    text: "Tudo começa com o projeto da sua marca.",
    image: "/media/outsourcing/etapa-ideia.webp",
    imageSmall: "/media/outsourcing/etapa-ideia-720.webp",
  },
  {
    id: "formula",
    indicator: "Fórmula",
    title: "Sua fórmula",
    text: "Desenvolvimento técnico para transformar a ideia em uma formulação própria.",
    detail: "Formulações exclusivas",
    image: "/media/outsourcing/etapa-formula.webp",
    imageSmall: "/media/outsourcing/etapa-formula-720.webp",
  },
  {
    id: "product",
    indicator: "Produto",
    title: "Seu produto",
    text: "Formulação e apresentação construídas para a sua marca.",
    detail: "Liberdade de embalagem",
    detailText: "A apresentação pode ser definida de acordo com as necessidades do projeto.",
    image: "/media/outsourcing/etapa-produto-v2.webp",
    imageSmall: "/media/outsourcing/etapa-produto-v2-720.webp",
  },
] as const;

const LAST_INDEX = outsourcingHeroStages.length - 1;
/** Held only while the carousel animates, so one gesture never skips two stages. */
const TRANSITION_LOCK_MS = 560;
/** Wheel delta that counts as an intentional gesture — one mouse notch, a short trackpad flick. */
const WHEEL_THRESHOLD = 38;
/** Quiet gap that separates a new gesture from trackpad inertia trailing off. */
const GESTURE_GAP_MS = 140;
const TOUCH_THRESHOLD = 44;

export function OutsourcingHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const lockedUntilRef = useRef(0);
  const armedRef = useRef(true);
  const lastWheelAtRef = useRef(0);
  const accumulatedRef = useRef(0);
  const touchStartRef = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    const next = Math.min(LAST_INDEX, Math.max(0, index));
    if (next === activeIndexRef.current) return;
    activeIndexRef.current = next;
    setActiveIndex(next);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /** The hero only captures gestures while it owns the whole viewport below the fixed header. */
    const isPinned = () => {
      const headerHeight =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
        ) || 0;
      const rect = section.getBoundingClientRect();
      return rect.top <= headerHeight + 2 && rect.bottom >= window.innerHeight - 2;
    };

    const canStep = (direction: number) =>
      direction > 0 ? activeIndexRef.current < LAST_INDEX : activeIndexRef.current > 0;

    const step = (direction: number) => {
      goTo(activeIndexRef.current + direction);
      lockedUntilRef.current = performance.now() + TRANSITION_LOCK_MS;
      accumulatedRef.current = 0;
      armedRef.current = false;
    };

    const onWheel = (event: WheelEvent) => {
      const direction = Math.sign(event.deltaY);
      if (!direction || !isPinned() || !canStep(direction)) return;

      // Past the last stage (or before the first) the page keeps scrolling as usual.
      event.preventDefault();

      const now = performance.now();
      if (now - lastWheelAtRef.current > GESTURE_GAP_MS) armedRef.current = true;
      lastWheelAtRef.current = now;

      if (now < lockedUntilRef.current || !armedRef.current) return;
      if (Math.sign(accumulatedRef.current) !== direction) accumulatedRef.current = 0;

      accumulatedRef.current += event.deltaY;
      if (Math.abs(accumulatedRef.current) >= WHEEL_THRESHOLD) step(direction);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const start = touchStartRef.current;
      const current = event.touches[0]?.clientY;
      if (start === null || current === undefined) return;

      const travelled = start - current;
      const direction = Math.sign(travelled);
      if (!direction || !isPinned() || !canStep(direction)) return;

      event.preventDefault();
      if (performance.now() < lockedUntilRef.current) return;
      if (Math.abs(travelled) < TOUCH_THRESHOLD) return;

      touchStartRef.current = current;
      step(direction);
    };

    const onTouchEnd = () => {
      touchStartRef.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goTo]);

  const activeStage = outsourcingHeroStages[activeIndex];

  return (
    <section
      className="outsourcing-scroll-hero"
      aria-labelledby="outsourcing-hero-title"
      data-active-stage={activeStage.id}
      ref={sectionRef}
    >
      <div className="container outsourcing-scroll-hero-layout">
        <div className="outsourcing-scroll-hero-intro">
          <p className="eyebrow">Terceirização</p>
          <h1 id="outsourcing-hero-title">Terceirização de cosméticos pet para a sua marca</h1>
          <p>Desenvolvimento, formulação e produção para marcas.</p>
        </div>

        <div className="outsourcing-scroll-hero-track" aria-hidden="true">
          {outsourcingHeroStages.map((stage, index) => (
            <picture
              className="outsourcing-scroll-hero-slide"
              data-offset={index - activeIndex}
              key={stage.id}
            >
              <source media="(max-width: 820px)" srcSet={stage.imageSmall} />
              <img
                src={stage.image}
                width="1200"
                height="800"
                alt=""
                decoding="async"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </picture>
          ))}
        </div>

        <div className="outsourcing-scroll-hero-message" key={activeStage.id}>
          <h2>{activeStage.title}</h2>
          <p>{activeStage.text}</p>
          {activeStage.detail && <strong>{activeStage.detail}</strong>}
          {activeStage.detailText && <small>{activeStage.detailText}</small>}
        </div>

        <div className="outsourcing-scroll-hero-controls">
          <ol className="outsourcing-scroll-hero-indicator" aria-label="Etapas da narrativa">
            {outsourcingHeroStages.map((stage, index) => (
              <li
                aria-current={index === activeIndex ? "step" : undefined}
                data-active={index === activeIndex ? "true" : "false"}
                key={stage.id}
              >
                <button onClick={() => goTo(index)} type="button">
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  {stage.indicator}
                </button>
              </li>
            ))}
          </ol>

          <p
            className="outsourcing-scroll-hero-cue"
            data-visible={activeIndex === 0 ? "true" : "false"}
          >
            <span>Role para explorar</span>
            <svg aria-hidden="true" fill="none" height="14" viewBox="0 0 14 14" width="14">
              <path
                d="M7 2v10m0 0 4-4m-4 4-4-4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
              />
            </svg>
          </p>
        </div>
      </div>
    </section>
  );
}
