import { CompanyHistory } from "../components/CompanyHistory";
import { InternalHero } from "../components/InternalHero";
import { PageCta } from "../components/PageCta";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";

export default function AboutPage() {
  return (
    <>
      <Seo
        title="História da Orion | Indústria para o mercado pet"
        description="Conheça quem é a Orion hoje e a estrutura preparada para apresentar sua história institucional a partir de marcos confirmados."
        path="/sobre"
        ogDescription="A trajetória institucional da Orion, apresentada somente a partir de informações confirmadas."
      />
      <main id="conteudo" className="internal-page about-page">
        <InternalHero
          eyebrow="Sobre a Orion"
          title="Nossa história."
          description="A Orion é uma indústria voltada ao desenvolvimento e à fabricação de soluções para o mercado pet. Esta página está preparada para apresentar sua trajetória a partir de marcos institucionais confirmados."
          compact
        />

        <section className="editorial-section about-today" aria-labelledby="about-today-title">
          <div className="container content-split">
            <Reveal>
              <p className="eyebrow">Quem é a Orion hoje</p>
              <h2 id="about-today-title">Desenvolvimento e indústria em uma mesma direção.</h2>
            </Reveal>
            <Reveal className="editorial-copy" delay={70}>
              <p>
                A atuação atual da Orion reúne leitura de categoria, desenvolvimento técnico,
                apoio documental e execução industrial para projetos B2B do mercado pet.
              </p>
              <p>
                Formulação, produção, envase e apresentação avançam de forma coordenada,
                respeitando o escopo e as necessidades de cada projeto.
              </p>
            </Reveal>
          </div>
        </section>

        <CompanyHistory />

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
