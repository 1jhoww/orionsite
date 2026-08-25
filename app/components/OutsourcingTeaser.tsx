/* eslint-disable @next/next/no-img-element -- Local editorial photography is optimized and explicitly sized. */
import { Reveal } from "./Reveal";
import { OrionButton } from "./OrionButton";

export function OutsourcingTeaser() {
  return (
    <section className="outsourcing-teaser" aria-labelledby="outsourcing-teaser-title">
      <div className="container outsourcing-teaser-layout">
        <Reveal as="figure" className="outsourcing-teaser-media">
          <img
            src="/media/fragrance-glass.webp"
            srcSet="/media/fragrance-glass-560.webp 560w, /media/fragrance-glass.webp 1200w"
            width="1200"
            height="800"
            alt="Vidrarias de laboratório durante o desenvolvimento de uma solução"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 820px) 100vw, 52vw"
          />
        </Reveal>
        <Reveal className="outsourcing-teaser-copy" delay={70}>
          <p className="eyebrow">Terceirização</p>
          <h2 id="outsourcing-teaser-title">Da direção de marca ao produto final.</h2>
          <p>
            Uma operação conectada para desenvolver, formular, fabricar, envasar e
            finalizar soluções com identidade própria.
          </p>
          <OrionButton href="/terceirizacao">Conheça o processo</OrionButton>
        </Reveal>
      </div>
    </section>
  );
}
