import { FaqAccordion } from "../components/FaqAccordion";
import { InternalHero } from "../components/InternalHero";
import { PageCta } from "../components/PageCta";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";
import { FaqPageJsonLd } from "../components/StructuredData";
import { faqItems } from "../data/site";

export default function FaqPage() {
  return (
    <>
      <Seo
        title="Perguntas Frequentes | Orion Cosméticos Pet"
        description="Respostas sobre terceirização, desenvolvimento, produção e o processo de projeto da Orion, indústria de cosméticos pet."
        path="/faq"
        ogDescription="O essencial sobre a atuação e o processo de parceria da Orion."
      />
      <FaqPageJsonLd items={faqItems} />
      <main id="conteudo" className="internal-page faq-page">
      <InternalHero
        compact
        eyebrow="FAQ"
        title="Perguntas frequentes. Respostas diretas."
        description="Informações institucionais sobre a atuação, o processo e os canais da Orion."
      />
      <section className="faq-directory" aria-labelledby="faq-directory-title">
        <div className="container faq-directory-layout">
          <Reveal className="section-heading-compact">
            <p className="eyebrow">Informações</p>
            <h2 id="faq-directory-title">O que você precisa saber.</h2>
          </Reveal>
          <Reveal delay={70}>
            <FaqAccordion items={faqItems} idPrefix="full-faq" />
          </Reveal>
        </div>
      </section>
        <PageCta title="Ainda tem uma pergunta? Fale com a Orion." />
      </main>
    </>
  );
}
