/**
 * Opening of /sobre — the prologue, and only the prologue.
 *
 * 2018 is the year the two paths met; the company's own history starts in the
 * timeline below, in 2021. So this section carries a single moment, no state and
 * no scroll behaviour: the portrait comes in from the left edge of the page, the
 * text steps in beside it, and the base of the photograph is the base of the
 * section — the timeline's deep blue starts only after it.
 */
export function AboutStoryHero() {
  return (
    <section className="about-story-hero" aria-labelledby="about-story-title">
      <div className="container about-story-layout">
        <figure className="about-story-media">
          <picture>
            <source media="(max-width: 720px)" srcSet="/media/company/about-dani-zico-hero-v3-900.webp" />
            <img
              src="/media/company/about-dani-zico-hero-v3.webp"
              alt="Retrato de Daniel Costa e José Aparecido Zebiani lado a lado"
              width="1536"
              height="1024"
              fetchPriority="high"
              decoding="async"
              sizes="(max-width: 900px) 100vw, 62vw"
            />
          </picture>
        </figure>

        <div className="about-story-copy">
          <p className="eyebrow">Sobre a Orion</p>
          <h1 id="about-story-title">
            {/* Blocks, not a <br>: the line break is controlled but the accessible
                name stays "Duas trajetórias. Um mesmo propósito." */}
            <span>Duas trajetórias.</span> <span>Um mesmo propósito.</span>
          </h1>

          <div className="about-story-moment">
            <p className="about-story-moment-year">2018</p>
            <p className="about-story-moment-title">Os caminhos se cruzam.</p>
            <p className="about-story-moment-body">
              Foi no mercado pet que as trajetórias de Zico e Daniel se encontraram: um vindo
              da comunicação, da publicidade e do relacionamento comercial; o outro, da gestão,
              da indústria e da química.
            </p>
            <p className="about-story-moment-body">
              Do encontro nasce uma visão comum — desenvolver produtos mais atuais, com
              independência técnica e respeito ao bem-estar animal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
