import { productionCategories } from "../data/site";
import { Reveal } from "./Reveal";

export function ProductionStory() {
  return (
    <div className="solution-mosaic">
      {productionCategories.map((category, index) => (
        <Reveal
          as="article"
          className={`solution-feature solution-feature--${index + 1}`}
          delay={index * 65}
          key={category.title}
        >
          <figure className="solution-feature-media">
            <picture>
              <source media="(max-width: 700px)" srcSet={category.imageSmall} />
              <img
                src={category.image}
                width={category.imageWidth}
                height={category.imageHeight}
                alt={category.imageAlt}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 820px) 100vw, 58vw"
              />
            </picture>
          </figure>
          <div className="solution-feature-shade" aria-hidden="true" />
          <div className="solution-feature-copy">
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            <small>{category.products.join(" · ")}</small>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
