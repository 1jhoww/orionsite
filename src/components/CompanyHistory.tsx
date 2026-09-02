import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { companyHistory, type CompanyHistoryItem } from "../data/companyHistory";
import { Reveal } from "./Reveal";

type CompanyHistoryProps = {
  items?: CompanyHistoryItem[];
};

export function CompanyHistory({ items = companyHistory }: CompanyHistoryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollFrameRef = useRef<number | null>(null);
  const dragRef = useRef({ active: false, startX: 0, startScrollLeft: 0 });

  useEffect(() => () => {
    if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);
  }, []);

  if (items.length === 0) return null;

  const safeIndex = Math.min(activeIndex, items.length - 1);
  const progress = items.length > 1 ? ((safeIndex + 1) / items.length) * 100 : 100;

  const scrollToItem = (index: number, focusTab = false) => {
    const nextIndex = Math.max(0, Math.min(index, items.length - 1));
    const track = trackRef.current;
    const card = cardRefs.current[nextIndex];
    setActiveIndex(nextIndex);

    if (track && card && typeof track.scrollTo === "function") {
      const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
      track.scrollTo({ left, behavior: reducedMotion ? "auto" : "smooth" });
    }

    if (focusTab) {
      window.requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus());
    }
  };

  const handleTimelineKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = Math.min(safeIndex + 1, items.length - 1);
    else if (event.key === "ArrowLeft") nextIndex = Math.max(safeIndex - 1, 0);
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = items.length - 1;

    if (nextIndex === null) return;
    event.preventDefault();
    scrollToItem(nextIndex, true);
  };

  const updateActiveFromScroll = () => {
    if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - trackCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    });
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("is-dragging");
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const distance = event.clientX - dragRef.current.startX;
    if (Math.abs(distance) > 3) event.preventDefault();
    event.currentTarget.scrollLeft = dragRef.current.startScrollLeft - distance;
  };

  const endPointerDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    event.currentTarget.classList.remove("is-dragging");
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <Reveal as="section" className="company-history" aria-labelledby="company-history-title">
      <div className="container company-history-heading">
        <div>
          <p className="eyebrow">Como tudo começou</p>
          <h2 id="company-history-title">Uma história construída passo a passo.</h2>
        </div>
        <p className="company-history-instruction">Arraste ou use as setas para navegar.</p>
      </div>

      <div
        className="container company-history-tabs"
        role="tablist"
        aria-label="Marcos da história da Orion"
        aria-orientation="horizontal"
        tabIndex={-1}
        onKeyDown={handleTimelineKeys}
      >
        {items.map((item, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={index === safeIndex}
            aria-controls={`company-history-panel-${index}`}
            id={`company-history-tab-${index}`}
            tabIndex={index === safeIndex ? 0 : -1}
            ref={(node) => { tabRefs.current[index] = node; }}
            onClick={() => scrollToItem(index)}
            key={`${item.period}-${item.title}`}
          >
            <span>{item.period}</span>
            <small>{item.title}</small>
          </button>
        ))}
      </div>

      <div
        className="container company-history-track"
        ref={trackRef}
        onScroll={updateActiveFromScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPointerDrag}
        onPointerCancel={endPointerDrag}
        aria-label="Linha do tempo da Orion"
      >
        {items.map((item, index) => (
          <article
            className={`company-history-card ${index === safeIndex ? "is-active" : ""}`}
            id={`company-history-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`company-history-tab-${index}`}
            aria-current={index === safeIndex ? "step" : undefined}
            ref={(node) => { cardRefs.current[index] = node; }}
            key={`${item.period}-${item.image}`}
          >
            <figure>
              <picture>
                <source media="(max-width: 720px)" srcSet={item.imageSmall} />
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  width={item.imageWidth}
                  height={item.imageHeight}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  style={{ objectPosition: item.imagePosition }}
                />
              </picture>
            </figure>
            <div className="company-history-copy">
              <span>{item.period}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="container company-history-controls" aria-label="Navegação da história">
        <div className="company-history-progress">
          <span aria-live="polite">Marco {safeIndex + 1} de {items.length}</span>
          <div
            role="progressbar"
            aria-label="Progresso na história da Orion"
            aria-valuemin={1}
            aria-valuemax={items.length}
            aria-valuenow={safeIndex + 1}
          >
            <i style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="company-history-arrows">
          <button
            type="button"
            aria-label="Ver marco anterior da história"
            onClick={() => scrollToItem(safeIndex - 1)}
            disabled={safeIndex === 0}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            aria-label="Ver próximo marco da história"
            onClick={() => scrollToItem(safeIndex + 1)}
            disabled={safeIndex === items.length - 1}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </Reveal>
  );
}
