type InternalHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageSmall?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  compact?: boolean;
};

export function InternalHero({ eyebrow, title, description, image, imageSmall, imageAlt, imageWidth = 1200, imageHeight = 800, compact = false }: InternalHeroProps) {
  return (
    <section className={`internal-hero ${compact ? "internal-hero--compact" : ""}`}>
      <div className="container internal-hero-layout">
        <div className="internal-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {image && (
          <figure className="internal-hero-media">
            <picture>
              {imageSmall && <source media="(max-width: 820px)" srcSet={imageSmall} />}
              <img src={image} width={imageWidth} height={imageHeight} alt={imageAlt ?? ""} fetchPriority="high" decoding="async" sizes="(max-width: 820px) 100vw, 48vw" />
            </picture>
          </figure>
        )}
      </div>
    </section>
  );
}
