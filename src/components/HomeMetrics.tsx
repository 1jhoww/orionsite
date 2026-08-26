import { confirmedScaleFigures } from "../data/portfolio";
import { AnimatedMetric } from "./AnimatedMetric";

const capabilities = ["Desenvolvimento", "Formulação", "Documentação", "Produção", "Envase"] as const;

export function HomeMetrics() {
  return (
    <section className="home-metrics" aria-labelledby="home-metrics-title">
      <div className="container home-metrics-layout">
        <div className="home-metrics-intro">
          <p className="eyebrow">Escala industrial comprovada</p>
          <h2 id="home-metrics-title">Portfólio desenvolvido para diferentes aplicações do mercado pet.</h2>
        </div>

        <div className="home-metrics-figures">
          {confirmedScaleFigures.map((figure, index) => (
            <div className="home-metrics-figure" key={figure.label}>
              <AnimatedMetric
                value={figure.value}
                suffix={figure.suffix}
                label={figure.label}
                delay={index * 260}
                duration={index === 0 ? 1700 : 1250}
              />
            </div>
          ))}
        </div>

        <div className="home-metrics-capabilities">
          <p>Uma estrutura que conecta:</p>
          <ul>
            {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
