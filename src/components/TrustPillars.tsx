import { Reveal } from "./Reveal";
import { CapabilityIcon, type CapabilityIconName } from "./CapabilityIcon";

const pillars = [
  {
    title: "Desenvolvimento e formulação",
    description: "Categoria, aplicação, sensorial e desempenho orientam a construção técnica de cada solução.",
    icon: "development",
  },
  {
    title: "Documentação e registro",
    description: "Apoio na organização documental e nos processos necessários para regularização e registro do produto.",
    icon: "documentation",
  },
  {
    title: "Produção",
    description: "Fabricação organizada para levar o desenvolvimento aprovado à escala planejada para o projeto.",
    icon: "production",
  },
  {
    title: "Envase",
    description: "Apresentações e volumes são finalizados com atenção à integridade, identificação e acabamento.",
    icon: "filling",
  },
  {
    title: "Identidade visual",
    description: "Identidade visual e materiais gráficos podem integrar o projeto como etapa complementar, conforme o escopo comercial.",
    icon: "identity",
  },
  {
    title: "Entrega e logística",
    description: "O produto finalizado é preparado para seguir ao fluxo logístico e comercial definido com o parceiro.",
    icon: "delivery",
  },
] satisfies ReadonlyArray<{ title: string; description: string; icon: CapabilityIconName }>;

export function TrustPillars() {
  return (
    <section className="trust" id="orion" aria-labelledby="trust-title">
      <div className="container trust-editorial">
        <Reveal className="trust-intro">
          <p className="eyebrow">Capacidade industrial integrada</p>
          <h2 id="trust-title">A estrutura por trás de cada produto.</h2>
        </Reveal>
        <Reveal className="trust-intro-note" delay={70}>
          <p>
            A Orion reúne etapas técnicas, documentais, visuais e produtivas para apoiar
            projetos B2B do setor pet.
          </p>
        </Reveal>

        <ol className="trust-flow" aria-label="Etapas integradas da capacidade industrial Orion">
          {pillars.map((pillar, index) => (
            <Reveal as="li" className="trust-stage" delay={index * 45} key={pillar.title}>
              <span className="trust-stage-marker" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="trust-stage-copy">
                <span className="trust-stage-icon trust-point-icon" aria-hidden="true">
                  <CapabilityIcon name={pillar.icon} />
                </span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
