"use client";

import { useState } from "react";
import type { FaqItem } from "../data/site";

export function FaqAccordion({ items, idPrefix = "faq" }: { items: FaqItem[]; idPrefix?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-accordion">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${idPrefix}-panel-${index}`;
        const buttonId = `${idPrefix}-button-${index}`;
        return (
          <article className={`faq-item ${open ? "is-open" : ""}`} key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span>{item.question}</span>
                <i aria-hidden="true">+</i>
              </button>
            </h3>
            <div id={panelId} className="faq-answer" role="region" aria-labelledby={buttonId} aria-hidden={!open}>
              <div><p>{item.answer}</p></div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
