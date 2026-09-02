import { CompanyHistory } from "../components/CompanyHistory";
import { FoundersSection } from "../components/FoundersSection";
import { InternalHero } from "../components/InternalHero";
import { PageCta } from "../components/PageCta";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";

export default function AboutPage() {
  return (
    <>
      <Seo
        title="História da Orion | Indústria para o mercado pet"
        description="Conheça a trajetória da Orion, seus primeiros passos, a evolução de sua estrutura e os sócios que unem desenvolvimento técnico e visão comercial."
        path="/sobre"
        ogDescription="A trajetória da Orion em imagens e as perspectivas complementares de Daniel e Zico."
      />
      <main id="conteudo" className="internal-page about-page">
        <InternalHero
          eyebrow="Sobre a Orion"
          title="Desenvolvimento e indústria em uma mesma direção."
          description="A trajetória da Orion reúne conhecimento técnico, leitura de mercado e evolução da estrutura para desenvolver e fabricar soluções para o mercado pet. Formulação, produção, envase e apresentação avançam de forma coordenada, aproximando necessidades reais de uma execução industrial consistente."
          compact
        />

        <CompanyHistory />

        <FoundersSection />

        <section className="about-purpose" aria-labelledby="about-purpose-title">
          <div className="container about-purpose-layout">
            <Reveal>
              <p className="eyebrow">O que nos move</p>
              <h2 id="about-purpose-title">Transformar direção de produto em execução consistente.</h2>
            </Reveal>
            <Reveal className="about-purpose-copy" delay={70}>
              <p>Conectar intenção de marca, aplicação e desempenho a um processo industrial organizado.</p>
              <p>Construir soluções com clareza técnica, atenção documental e coerência entre fórmula, embalagem e apresentação.</p>
            </Reveal>
          </div>
        </section>

        <section className="about-current" aria-labelledby="about-current-title">
          <div className="container about-current-layout">
            <Reveal>
              <p className="eyebrow">A Orion hoje</p>
              <h2 id="about-current-title">Uma estrutura preparada para desenvolver, produzir e entregar.</h2>
            </Reveal>
            <Reveal className="about-current-points" delay={70}>
              <article><div><h3>Direção técnica</h3><p>Definição de categoria, aplicação, formulação e experiência de uso.</p></div></article>
              <article><div><h3>Coordenação do projeto</h3><p>Apoio documental e identidade visual incorporados conforme o escopo.</p></div></article>
              <article><div><h3>Execução industrial</h3><p>Produção, envase, finalização e preparação logística conectados.</p></div></article>
            </Reveal>
          </div>
        </section>

        <PageCta title="Vamos construir o próximo projeto?" />
      </main>
    </>
  );
}
