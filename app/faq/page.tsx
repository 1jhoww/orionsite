import type { Metadata } from "next";
import { FaqAccordion } from "../components/FaqAccordion";
import { InternalHero } from "../components/InternalHero";
import { PageCta } from "../components/PageCta";
import { faqItems } from "../data/site";

export const metadata: Metadata = {
  title: "Perguntas frequentes | Orion",
  description: "Respostas institucionais sobre a atuação, o processo, o portfólio e o contato com a Orion.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Perguntas frequentes | Orion",
    description: "O essencial sobre a atuação e o processo de parceria da Orion.",
    url: "/faq",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Orion — soluções industriais para o mercado pet" }],
  },
};

export default function FaqPage() {
  return (
    <main id="conteudo" className="internal-page faq-page">
      <InternalHero
        compact
        eyebrow="FAQ"
        title="Perguntas frequentes. Respostas diretas."
        description="Informações institucionais sobre a atuação, o processo e os canais da Orion."
      />
      <section className="faq-directory" aria-labelledby="faq-directory-title">
        <div className="container faq-directory-layout">
          <div className="section-heading-compact">
            <p className="eyebrow">Informações</p>
            <h2 id="faq-directory-title">O que você precisa saber.</h2>
          </div>
          <FaqAccordion items={faqItems} idPrefix="full-faq" />
        </div>
      </section>
      <PageCta title="Ainda tem uma pergunta? Fale com a Orion." />
    </main>
  );
}
