import { BrandEcosystemMarquee } from "../components/BrandEcosystemMarquee";
import { CampaignHero } from "../components/CampaignHero";
import { ContactSection } from "../components/ContactSection";
import { HomeFaq } from "../components/HomeFaq";
import { HomeMetrics } from "../components/HomeMetrics";
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
        description="Indústria B2B para desenvolvimento, formulação, fabricação e envase de cosméticos pet, com apoio documental e identidade visual conforme o projeto."
        path="/"
        ogTitle="Orion — Tecnologia e excelência para o mercado pet"
        ogDescription="Desenvolvimento e fabricação conectados para transformar direções de marca em produtos para o mercado pet."
      />
      <main id="conteudo">
        <CampaignHero />
        <HomeMetrics />
        <TrustPillars />
        <PortfolioPreview />
        <BrandEcosystemMarquee className="brand-marquee--home" label="Logos das marcas e linhas do ecossistema Orion" />

      <section className="production" id="solucoes" aria-labelledby="production-title">
        <div className="container production-heading">
          <Reveal>
            <p className="eyebrow">Soluções</p>
            <h2 id="production-title">Soluções industriais para <span>cada etapa do cuidado.</span></h2>
          </Reveal>
          <Reveal className="production-heading-note" delay={80}>
            <p>Da higiene à perfumaria, a Orion conecta leitura de categoria, desenvolvimento técnico, produção e apresentação.</p>
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
            <h2 id="technology-title">Uma operação industrial conectada.</h2>
          </Reveal>
          <Reveal delay={70}>
            <p>Desenvolvimento, análise, matérias-primas, fabricação, envase e armazenamento trabalham na mesma direção — do comportamento da fórmula à apresentação final do produto.</p>
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
