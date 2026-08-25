import { InternalHero } from "../components/InternalHero";
import { PageCta } from "../components/PageCta";
import { Seo } from "../components/Seo";

const stages = [
  { title: "Alinhamento Comercial", text: "Categoria, posicionamento, público e objetivos definem a direção inicial do projeto." },
  { title: "Formulação e Amostras", text: "A proposta se transforma em solução técnica, sensorial e visual para avaliação." },
  { title: "Produção e Envase", text: "Fabricação e apresentação avançam em relação ao desenvolvimento aprovado." },
  { title: "Entrega Logística", text: "O produto finalizado segue preparado para integrar o fluxo comercial do parceiro." },
] as const;

export default function OutsourcingPage() {
  return (
    <>
      <Seo
        title="Terceirização para o mercado pet | Orion"
        description="Conheça o processo conectado da Orion: alinhamento comercial, formulação e amostras, produção e envase e entrega logística."
        path="/terceirizacao"
        ogDescription="Da direção de marca ao produto final em uma operação conectada."
        imageAlt="Processo industrial Orion"
      />
      <main id="conteudo" className="internal-page outsourcing-page">
      <InternalHero
        eyebrow="Terceirização"
        title="Da ideia ao produto final."
        description="A Orion conecta desenvolvimento técnico e execução industrial para materializar soluções com identidade própria."
        image="/media/formulation.webp"
        imageSmall="/media/formulation-600.webp"
        imageAlt="Textura cosmética analisada durante o desenvolvimento"
      />

      <section className="outsourcing-process" aria-labelledby="outsourcing-process-title">
        <div className="container content-split outsourcing-process-intro">
          <div>
            <p className="eyebrow">Processo de parceria</p>
            <h2 id="outsourcing-process-title">Um caminho claro, do briefing à entrega.</h2>
          </div>
          <p>Cada projeto avança por etapas conectadas, com alinhamento entre intenção de marca e execução industrial.</p>
        </div>
        <ol className="container outsourcing-process-list">
          {stages.map((stage) => (
            <li key={stage.title}>
              <span aria-hidden="true" />
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="outsourcing-scope" aria-labelledby="outsourcing-scope-title">
        <div className="container outsourcing-scope-layout">
          <figure>
            <img src="/media/clean-filling.webp" srcSet="/media/clean-filling-720.webp 720w, /media/clean-filling.webp 1200w" width="1200" height="2132" alt="Equipamento de dosagem em uma linha de produção limpa" loading="lazy" decoding="async" sizes="(max-width: 820px) 100vw, 46vw" />
          </figure>
          <div>
            <p className="eyebrow">Operação integrada</p>
            <h2 id="outsourcing-scope-title">Desenvolvimento, fabricação e apresentação em uma mesma direção.</h2>
            <p>A atuação institucional reúne pesquisa, formulação, fabricação, envase e finalização para soluções de higiene, tratamento, cuidado especializado e perfumaria pet.</p>
          </div>
        </div>
      </section>

        <PageCta title="Conte à Orion o que sua marca quer construir." />
      </main>
    </>
  );
}
