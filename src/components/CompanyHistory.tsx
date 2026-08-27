import { useState, type KeyboardEvent } from "react";
import { companyHistory, type CompanyHistoryItem } from "../data/site";
import { Reveal } from "./Reveal";

type CompanyHistoryProps = {
  items?: CompanyHistoryItem[];
};

export function CompanyHistory({ items = companyHistory }: CompanyHistoryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) return null;

  const safeIndex = Math.min(activeIndex, items.length - 1);
  const active = items[safeIndex];

  const selectItem = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, items.length - 1));
    setActiveIndex(nextIndex);
    window.requestAnimationFrame(() => {
      document.querySelector<HTMLButtonElement>(`[data-history-index="${nextIndex}"]`)?.focus();
    });
  };

  const handleTimelineKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") selectItem(safeIndex + 1);
    else if (event.key === "ArrowLeft") selectItem(safeIndex - 1);
    else if (event.key === "Home") selectItem(0);
    else if (event.key === "End") selectItem(items.length - 1);
    else return;
    event.preventDefault();
  };

  return (
    <Reveal as="section" className="company-history" aria-labelledby="company-history-title">
      <div className="container company-history-heading">
        <p className="eyebrow">Como tudo começou</p>
        <h2 id="company-history-title">A história da Orion em marcos confirmados.</h2>
      </div>

      <div className="container company-history-timeline" role="tablist" aria-label="Marcos da história da Orion" aria-orientation="horizontal" tabIndex={-1} onKeyDown={handleTimelineKeys}>
        {items.map((item, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={index === safeIndex}
            aria-controls="company-history-panel"
            id={`company-history-tab-${index}`}
            tabIndex={index === safeIndex ? 0 : -1}
            data-history-index={index}
            onClick={() => selectItem(index)}
            key={`${item.year}-${item.title}`}
          >
            {item.year}
          </button>
        ))}
      </div>

      <div className="container company-history-stage" id="company-history-panel" role="tabpanel" aria-labelledby={`company-history-tab-${safeIndex}`} aria-live="polite">
        {active.image && (
          <figure>
            <img src={active.image} alt={active.imageAlt ?? ""} width="1200" height="800" loading="lazy" decoding="async" />
          </figure>
        )}
        <div className="company-history-copy">
          <span>{active.year}</span>
          <h3>{active.title}</h3>
          <p>{active.description}</p>
        </div>
      </div>

      <div className="container company-history-controls" aria-label="Navegação da história">
        <button type="button" onClick={() => selectItem(safeIndex - 1)} disabled={safeIndex === 0}>Anterior</button>
        <span>{safeIndex + 1} / {items.length}</span>
        <button type="button" onClick={() => selectItem(safeIndex + 1)} disabled={safeIndex === items.length - 1}>Próximo</button>
      </div>
    </Reveal>
  );
}
