import { OrionButton } from "./OrionButton";

export function CampaignHero() {
  return (
    <section className="industrial-hero" id="inicio" aria-labelledby="hero-title">
      <div className="container industrial-hero-layout">
        <div className="industrial-hero-copy">
          <p className="industrial-hero-kicker">Indústria de soluções para o mercado pet</p>
          <h1 id="hero-title">
            Tecnologia e excelência no desenvolvimento de soluções para o mercado pet.
          </h1>
          <p className="industrial-hero-support">
            A Orion desenvolve, formula, fabrica, envasa e finaliza soluções de higiene,
            tratamento, cuidado e perfumaria para marcas do setor pet.
          </p>
          <div className="industrial-hero-actions">
            <OrionButton href="#solucoes">Conheça nossas soluções</OrionButton>
            <OrionButton href="#contato" variant="secondary">Fale com a Orion</OrionButton>
          </div>
        </div>

        <figure className="industrial-hero-media">
          <picture>
            <source media="(max-width: 820px)" srcSet="/media/clean-filling-720.webp" />
            <img
              src="/media/clean-filling.webp"
              width="1200"
              height="2132"
              alt="Sistema automatizado de dosagem em uma linha de produção cosmética"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <figcaption>
            <span>Operação integrada</span>
            Desenvolvimento · fabricação · envase
          </figcaption>
        </figure>
      </div>

      <div className="container industrial-hero-flow" aria-label="Atuação da Orion">
        {["Desenvolvimento", "Formulação", "Fabricação", "Envase", "Entrega"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}
