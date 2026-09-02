import { founders } from "../data/founders";
import { FounderProfile } from "./FounderProfile";
import { Reveal } from "./Reveal";

export function FoundersSection() {
  return (
    <section className="founders-section" aria-labelledby="founders-title">
      <div className="container founders-heading">
        <Reveal>
          <p className="eyebrow">Quem constrói essa história</p>
          <h2 id="founders-title">Duas perspectivas, uma mesma direção.</h2>
        </Reveal>
        <Reveal className="founders-intro" delay={70}>
          <p>
            Juntos, Daniel e Zico unem desenvolvimento técnico e visão comercial,
            aproximando aquilo que nasce no laboratório das necessidades reais do mercado.
          </p>
        </Reveal>
      </div>

      <div className="container founders-grid">
        {founders.map((founder, index) => (
          <Reveal key={founder.name} delay={index * 80}>
            <FounderProfile founder={founder} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
