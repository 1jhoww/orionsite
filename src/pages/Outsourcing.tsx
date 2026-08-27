import { InternalHero } from "../components/InternalHero";
import { OutsourcingTimeline } from "../components/OutsourcingTimeline";
import { PageCta } from "../components/PageCta";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";

export default function OutsourcingPage() {
  return (
    <>
      <Seo
        title="Terceirização para o mercado pet | Orion"
        description="Do briefing à entrega: conheça as etapas técnicas e comerciais da terceirização Orion para desenvolvimento e produção de cosméticos pet."
        path="/terceirizacao"
        ogDescription="Da direção de marca ao produto final em uma operação conectada."
        imageAlt="Processo industrial Orion"
      />
      <main id="conteudo" className="internal-page outsourcing-page">
      <InternalHero
        eyebrow="Terceirização"
        title="Do briefing à produção, etapas coordenadas pela Orion."
        description="O projeto avança por definições comerciais, desenvolvimento técnico, preparação documental e execução industrial até a entrega."
        image="/media/hero-fragrance.webp"
        imageSmall="/media/hero-fragrance-800.webp"
        imageWidth={1600}
        imageHeight={2400}
        imageAlt="Medição de uma formulação durante o desenvolvimento olfativo"
      />

      <OutsourcingTimeline />

      <section className="outsourcing-scope" aria-labelledby="outsourcing-scope-title">
        <div className="container outsourcing-scope-layout">
          <Reveal as="figure">
            <img src="/media/hero-perfume-lab.webp" width="2000" height="1333" alt="Frascos alinhados durante uma etapa de envase de perfumaria" loading="lazy" decoding="async" sizes="(max-width: 820px) 100vw, 46vw" />
          </Reveal>
          <Reveal delay={70}>
            <p className="eyebrow">Escopo coordenado</p>
            <h2 id="outsourcing-scope-title">Produto, documentação e apresentação preparados em conjunto.</h2>
            <p>A Orion oferece apoio na organização documental e nos processos necessários para regularização e registro do produto. Projetos de identidade visual e materiais gráficos podem ser incorporados conforme o escopo.</p>
            <ul className="outsourcing-scope-points">
              <li>Definição técnica e desenvolvimento de amostras</li>
              <li>Organização documental vinculada ao projeto</li>
              <li>Planejamento de fabricação, envase e acabamento</li>
              <li>Preparação do produto finalizado para logística</li>
            </ul>
          </Reveal>
        </div>
      </section>

        <PageCta title="Conte à Orion o que sua marca quer construir." />
      </main>
    </>
  );
}
