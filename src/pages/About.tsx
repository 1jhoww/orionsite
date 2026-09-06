import { AboutStoryHero } from "../components/AboutStoryHero";
import { CompanyHistory } from "../components/CompanyHistory";
import { FoundersSection } from "../components/FoundersSection";
import { PageCta } from "../components/PageCta";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";

export default function AboutPage() {
  return (
    <>
      <Seo
        title="Sobre a Orion | Indústria de Cosméticos Pet"
        description="Conheça a trajetória da Orion, seus primeiros passos, a evolução de sua estrutura e os sócios que unem desenvolvimento técnico e visão comercial."
        path="/sobre"
        ogDescription="A trajetória da Orion em imagens e as perspectivas complementares de Daniel e Zico."
      />
      <main id="conteudo" className="internal-page about-page">
        <AboutStoryHero />

        <CompanyHistory />

        <FoundersSection />

        <section className="about-purpose" aria-labelledby="about-purpose-title">
          <div className="container about-purpose-layout">
            <Reveal className="about-purpose-header">
              <p className="eyebrow">O que nos move</p>
              <h2 id="about-purpose-title">Transformar direção de produto em execução consistente.</h2>
            </Reveal>
            <Reveal as="article" className="about-purpose-statement about-purpose-mission" delay={60}>
              <h3>Missão</h3>
              <p>
                Desenvolver e produzir soluções para o mercado pet com qualidade, cuidado e conhecimento técnico,
                transformando boas ideias em produtos que geram valor para marcas, parceiros e consumidores.
              </p>
            </Reveal>
            <Reveal as="article" className="about-purpose-statement about-purpose-vision" delay={90}>
              <h3>Visão</h3>
              <p>
                Inovar continuamente e consolidar a Orion como uma indústria reconhecida pela qualidade de seus
                produtos, capacidade de desenvolvimento e evolução constante.
              </p>
            </Reveal>
            <Reveal as="article" className="about-purpose-statement about-purpose-values" delay={120}>
              <h3>Valores</h3>
              <ul>
                <li>Qualidade em cada etapa</li>
                <li>Inovação e desenvolvimento contínuo</li>
                <li>Compromisso com clientes e parceiros</li>
                <li>Responsabilidade na produção</li>
                <li>Conhecimento técnico</li>
                <li>Relações construídas com confiança</li>
              </ul>
            </Reveal>
          </div>
        </section>

        {/* The "A Orion hoje" section was folded into the timeline; only these three
            operating points remain, as a compact band leading into the CTA. */}
        <Reveal as="section" className="about-capability-band" aria-label="Como a Orion opera hoje">
          <div className="container about-capability-band-layout">
            <article><h2>Direção técnica</h2><p>Definição de categoria, aplicação, formulação e experiência de uso.</p></article>
            <article><h2>Coordenação do projeto</h2><p>Apoio documental e identidade visual incorporados conforme o escopo.</p></article>
            <article><h2>Execução industrial</h2><p>Produção, envase, finalização e preparação logística conectados.</p></article>
          </div>
        </Reveal>

        <PageCta title="Vamos construir o próximo projeto?" />
      </main>
    </>
  );
}
