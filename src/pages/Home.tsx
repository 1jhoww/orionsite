import { CampaignHero } from "../components/CampaignHero";
import { ContactSection } from "../components/ContactSection";
import { HomeFaq } from "../components/HomeFaq";
import { OrionProcess } from "../components/OrionProcess";
import { OutsourcingTeaser } from "../components/OutsourcingTeaser";
import { PartnershipTimeline } from "../components/PartnershipTimeline";
import { PortfolioPreview } from "../components/PortfolioPreview";
import { ProductionStory } from "../components/ProductionStory";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";
import { TrustPillars } from "../components/TrustPillars";
import { TechnologyGallery } from "../components/TechnologyGallery";

export default function Home() {
  return (
    <>
      <Seo
        title="Orion | Soluções industriais para o mercado pet"
        description="A Orion desenvolve, formula, fabrica e envasa soluções de higiene, tratamento, cuidado e perfumaria para marcas do mercado pet."
        path="/"
        ogTitle="Orion — Tecnologia e excelência para o mercado pet"
        ogDescription="Desenvolvimento e fabricação de soluções de higiene, tratamento, cuidado e perfumaria para marcas do mercado pet."
      />
      <main id="conteudo">
        <CampaignHero />
        <PortfolioPreview />
        <TrustPillars />

      <section className="production" id="solucoes" aria-labelledby="production-title">
        <div className="container production-heading">
          <Reveal>
            <p className="eyebrow">Soluções</p>
            <h2 id="production-title">Soluções desenvolvidas para <span>cada etapa do cuidado.</span></h2>
          </Reveal>
          <Reveal className="production-heading-note" delay={80}>
            <p>Um portfólio de possibilidades para marcas que atuam em higiene, tratamento, cuidado especializado, finalização e perfumaria pet.</p>
          </Reveal>
        </div>
        <div className="container"><ProductionStory /></div>
      </section>

      <OrionProcess />
      <PartnershipTimeline />

      <section className="technology" id="estrutura" aria-labelledby="technology-title">
        <div className="container technology-heading">
          <Reveal>
            <p className="eyebrow">Estrutura e tecnologia</p>
            <h2 id="technology-title">Tecnologia aplicada em cada etapa.</h2>
          </Reveal>
          <Reveal delay={70}>
            <p>Desenvolvimento, análise, fabricação e envase fazem parte de uma operação conectada — do comportamento da fórmula à apresentação final do produto.</p>
          </Reveal>
        </div>
        <TechnologyGallery />
      </section>

      <OutsourcingTeaser />
      <HomeFaq />
        <ContactSection />
      </main>
    </>
  );
}
