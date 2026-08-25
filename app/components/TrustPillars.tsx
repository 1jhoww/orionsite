import { Reveal } from "./Reveal";

const pillars = [
  {
    title: "Qualidade e conformidade",
    description: "Processos organizados, documentação e atenção aos requisitos técnicos de cada projeto.",
  },
  {
    title: "Tecnologia industrial",
    description: "Desenvolvimento e fabricação orientados à consistência entre fórmula, produção e acabamento.",
  },
  {
    title: "Especialização pet",
    description: "Soluções pensadas para higiene, tratamento, cuidado e perfumaria do mercado pet.",
  },
  {
    title: "Responsabilidade operacional",
    description: "Escolhas técnicas conduzidas com clareza, controle e respeito às necessidades de cada aplicação.",
  },
] as const;

export function TrustPillars() {
  return (
    <section className="trust" id="orion" aria-labelledby="trust-title">
      <div className="container trust-editorial">
        <Reveal className="trust-intro">
          <p className="eyebrow">Capacidade integrada</p>
          <h2 id="trust-title">Da pesquisa à entrega, uma estrutura conectada.</h2>
          <p>
            A Orion combina desenvolvimento técnico, produção e leitura de mercado
            para apoiar projetos do setor pet.
          </p>
        </Reveal>

        <div className="trust-matrix">
          {pillars.map((pillar, index) => (
            <Reveal className="trust-point" delay={index * 55} key={pillar.title}>
              <span className="trust-point-mark" aria-hidden="true" />
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
