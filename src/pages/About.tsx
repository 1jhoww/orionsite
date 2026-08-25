import { InternalHero } from "../components/InternalHero";
import { PageCta } from "../components/PageCta";
import { Seo } from "../components/Seo";
import { processSteps } from "../data/site";

export default function AboutPage() {
  return (
    <>
      <Seo
        title="Sobre a Orion | Indústria para o mercado pet"
        description="Conheça a atuação integrada da Orion no desenvolvimento, formulação, fabricação e envase de soluções para o mercado pet."
        path="/sobre"
        ogDescription="Desenvolvimento, formulação, fabricação e envase conectados em uma mesma operação."
      />
      <main id="conteudo" className="internal-page">
      <InternalHero
        eyebrow="Sobre a Orion"
        title="Uma operação integrada para transformar intenção em produto."
        description="A Orion desenvolve e fabrica soluções para o mercado pet, conectando direção de marca, formulação, produção, envase e acabamento."
        image="/media/clean-filling.webp"
        imageSmall="/media/clean-filling-720.webp"
        imageAlt="Equipamento de dosagem em uma linha de produção limpa"
      />

      <section className="editorial-section" aria-labelledby="about-operation-title">
        <div className="container content-split">
          <div>
            <p className="eyebrow">Quem é a Orion</p>
            <h2 id="about-operation-title">Tecnologia aplicada à construção de soluções pet.</h2>
          </div>
          <div className="editorial-copy">
            <p>
              A atuação da Orion reúne leitura de categoria, desenvolvimento técnico e
              execução industrial. Cada etapa contribui para que desempenho, experiência
              de uso e apresentação avancem na mesma direção.
            </p>
            <p>
              Higiene, tratamento, cuidado especializado, finalização e perfumaria fazem
              parte das possibilidades apresentadas no portfólio institucional.
            </p>
          </div>
        </div>
      </section>

      <section className="about-capabilities" aria-labelledby="about-capabilities-title">
        <div className="container">
          <div className="section-heading-compact">
            <p className="eyebrow">Atuação conectada</p>
            <h2 id="about-capabilities-title">Do desenvolvimento ao acabamento.</h2>
          </div>
          <div className="capability-grid">
            {processSteps.map((step) => (
              <article key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-gallery" aria-label="Estrutura e desenvolvimento Orion">
        <div className="container about-gallery-grid">
          <figure>
            <img src="/media/quality-control.webp" srcSet="/media/quality-control-600.webp 600w, /media/quality-control.webp 1200w" width="1200" height="800" alt="Avaliação técnica em ambiente de laboratório" loading="lazy" decoding="async" sizes="(max-width: 820px) 100vw, 58vw" />
            <figcaption>Análise e controle</figcaption>
          </figure>
          <figure>
            <img src="/media/formulation.webp" srcSet="/media/formulation-600.webp 600w, /media/formulation.webp 1200w" width="1200" height="800" alt="Textura cosmética durante a formulação" loading="lazy" decoding="async" sizes="(max-width: 820px) 100vw, 42vw" />
            <figcaption>Formulação e sensorial</figcaption>
          </figure>
        </div>
      </section>

        <PageCta title="Vamos construir o próximo projeto?" />
      </main>
    </>
  );
}
