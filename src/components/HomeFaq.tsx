import { faqItems } from "../data/site";
import { FaqAccordion } from "./FaqAccordion";
import { Reveal } from "./Reveal";
import { OrionButton } from "./OrionButton";

export function HomeFaq() {
  return (
    <section className="home-faq" aria-labelledby="home-faq-title">
      <div className="container home-faq-layout">
        <Reveal className="home-faq-heading">
          <p className="eyebrow">Perguntas frequentes</p>
          <h2 id="home-faq-title">O essencial para começar uma conversa.</h2>
          <OrionButton href="/faq" variant="secondary">Ver todas as perguntas</OrionButton>
        </Reveal>
        <Reveal delay={70}>
          <FaqAccordion items={faqItems.slice(0, 4)} idPrefix="home-faq" />
        </Reveal>
      </div>
    </section>
  );
}
