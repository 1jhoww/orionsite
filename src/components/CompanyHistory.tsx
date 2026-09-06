import {
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

type Direction = "next" | "previous";

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  deltaX: number;
  horizontal: boolean;
};

const AXIS_LOCK_DISTANCE = 10;
const SWIPE_THRESHOLD = 48;

export function CompanyHistory({ items = companyHistory }: CompanyHistoryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>("next");
  const dragRef = useRef<DragState | null>(null);

  if (items.length === 0) return null;

  const safeIndex = Math.min(activeIndex, items.length - 1);
  const activeItem = items[safeIndex];

  const goTo = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, items.length - 1));
    if (nextIndex === safeIndex) return;

    setDirection(nextIndex > safeIndex ? "next" : "previous");
    setActiveIndex(nextIndex);
  };

  const handleNavigationKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = safeIndex + 1;
    else if (event.key === "ArrowLeft") nextIndex = safeIndex - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = items.length - 1;

    if (nextIndex === null) return;
    event.preventDefault();
    goTo(nextIndex);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target as Element).closest("button")) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      deltaX: 0,
      horizontal: false,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    drag.deltaX = deltaX;

    if (!drag.horizontal && Math.abs(deltaX) >= AXIS_LOCK_DISTANCE && Math.abs(deltaX) > Math.abs(deltaY)) {
      drag.horizontal = true;
      event.currentTarget.dataset.dragging = "true";
    }

    if (drag.horizontal) event.preventDefault();
  };

  const finishPointerGesture = (event: ReactPointerEvent<HTMLDivElement>, cancelled = false) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    dragRef.current = null;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (cancelled || !drag.horizontal || Math.abs(drag.deltaX) < SWIPE_THRESHOLD) return;
    goTo(drag.deltaX < 0 ? safeIndex + 1 : safeIndex - 1);
  };

  return (
    <section className="company-history" id="linha-do-tempo" aria-labelledby="company-history-title">
      <div className="container">
        <Reveal className="company-history-heading">
          <h2 id="company-history-title">Uma estrutura construída para crescer.</h2>
        </Reveal>

        <div
          className="company-history-stage"
          role="group"
          aria-label="Palco da história da Orion"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={(event) => finishPointerGesture(event)}
          onPointerCancel={(event) => finishPointerGesture(event, true)}
        >
          <div
            className="company-history-panel"
            key={`${activeItem.period}-${activeItem.title}`}
            data-direction={direction}
            role="group"
            aria-roledescription="marco da história"
            aria-label={`${safeIndex + 1} de ${items.length}: ${activeItem.period}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <figure className="company-history-media">
              <picture>
                <source media="(max-width: 720px)" srcSet={activeItem.imageSmall} />
                <img
                  src={activeItem.image}
                  alt={activeItem.imageAlt}
                  width={activeItem.imageWidth}
                  height={activeItem.imageHeight}
                  decoding="async"
                  draggable="false"
                  style={{ objectPosition: activeItem.imagePosition }}
                />
              </picture>
            </figure>

            <div className="company-history-copy">
              <span className="company-history-period">{activeItem.period}</span>
              <h3>{activeItem.title}</h3>
              <p>{activeItem.description}</p>
            </div>
          </div>

          <div
            className="company-history-navigation"
            role="toolbar"
            aria-label="Navegação dos marcos da história"
            onKeyDown={handleNavigationKeys}
          >
            <button
              className="company-history-arrow"
              type="button"
              aria-label="Ver marco anterior da história"
              onClick={() => goTo(safeIndex - 1)}
              disabled={safeIndex === 0}
            >
              <span aria-hidden="true">←</span>
            </button>

            <div className="company-history-indicators" role="group" aria-label="Escolher marco da história">
              {items.map((item, index) => (
                <button
                  type="button"
                  aria-label={`Ver marco: ${item.period}`}
                  aria-current={index === safeIndex ? "step" : undefined}
                  onClick={() => goTo(index)}
                  key={`${item.period}-${item.title}`}
                >
                  <span aria-hidden="true" />
                </button>
              ))}
            </div>

            <button
              className="company-history-arrow"
              type="button"
              aria-label="Ver próximo marco da história"
              onClick={() => goTo(safeIndex + 1)}
              disabled={safeIndex === items.length - 1}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
