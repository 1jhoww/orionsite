import { OrionButton } from "./OrionButton";

export function CampaignHero() {
  return (
    <section className="industrial-hero" id="inicio" aria-labelledby="hero-title">
      <div className="container industrial-hero-layout">
        <div className="industrial-hero-copy">
          <p className="industrial-hero-kicker">Indústria de soluções para o mercado pet</p>
          <h1 id="hero-title">
            Indústria que transforma desenvolvimento em produto.
          </h1>
          <p className="industrial-hero-support">
            A Orion integra desenvolvimento, formulação, produção, envase e entrega para
            materializar soluções B2B de higiene, tratamento, cuidado e perfumaria pet.
          </p>
          <div className="industrial-hero-actions">
            <OrionButton href="#solucoes">Conheça nossas soluções</OrionButton>
            <OrionButton href="#contato" variant="secondary">Fale com a Orion</OrionButton>
          </div>
        </div>

        <figure className="industrial-hero-media">
          <picture>
            <source media="(max-width: 820px)" srcSet="/media/factory/tanques-orion-720.webp" />
            <img
              src="/media/factory/tanques-orion.webp"
              width="1440"
              height="2158"
              alt="Tanques industriais reais da fábrica Orion integrados aos equipamentos de produção"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <figcaption>
            <span>Estrutura industrial integrada</span>
            Desenvolvimento · produção · envase
          </figcaption>
        </figure>
      </div>

      <div className="container industrial-hero-flow" aria-label="Atuação da Orion">
        {["Desenvolvimento", "Formulação", "Documentação", "Produção", "Envase", "Entrega"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      {/* Breathing zone between the hero and the scale band: a technical descender, not content. */}
      <div className="container industrial-hero-transition" aria-hidden="true">
        <span className="industrial-hero-transition-line" />
      </div>
    </section>
  );
}
