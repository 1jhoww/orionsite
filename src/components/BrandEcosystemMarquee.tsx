import { brandEcosystem } from "../data/portfolio";

type BrandEcosystemMarqueeProps = {
  /** Extra class on the section, so Home and Portfolio can size the band differently. */
  className?: string;
  label?: string;
};

export function BrandEcosystemMarquee({
  className = "",
  label = "Marcas e linhas do portfólio Orion",
}: BrandEcosystemMarqueeProps) {
  return (
    <section className={`brand-marquee ${className}`.trim()} aria-label={label}>
      {/* Screen readers get the named inventory; the visual band carries logos only. */}
      <ul className="sr-only">
        {brandEcosystem.map((item) => <li key={`${item.kind}-${item.name}`}>{item.name}</li>)}
      </ul>

      <div className="brand-marquee-viewport" aria-hidden="true">
        <div className="brand-marquee-track">
          {[0, 1].map((groupIndex) => (
            <div
              aria-hidden={groupIndex === 1 ? "true" : undefined}
              className={`brand-marquee-group ${groupIndex === 1 ? "brand-marquee-group--duplicate" : ""}`}
              key={groupIndex}
            >
              {brandEcosystem.map((item) => (
                <figure
                  className="brand-marquee-item"
                  data-brand={item.name}
                  key={`${groupIndex}-${item.kind}-${item.name}`}
                >
                  <img src={item.logo} width={item.width} height={item.height} alt="" loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
