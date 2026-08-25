/* eslint-disable @next/next/no-img-element -- Media is local, responsive and configured in site data for easy replacement. */
import { technologyMedia } from "../data/site";
import { Reveal } from "./Reveal";

export function TechnologyGallery() {
  const main = technologyMedia.find((item) => item.placement === "main");
  const details = technologyMedia.filter((item) => item.placement === "detail");
  if (!main) return null;

  return (
    <div className="container technology-gallery">
      <Reveal as="figure" className="technology-main">
        <img
          src={main.image}
          srcSet={`${main.imageSmall} 720w, ${main.image} 1200w`}
          width={main.width}
          height={main.height}
          alt={main.alt}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 820px) 100vw, 58vw"
        />
        <figcaption>{main.caption}</figcaption>
      </Reveal>
      <div className="technology-details">
        {details.map((item, index) => (
          <Reveal as="figure" delay={80 + index * 50} key={item.caption}>
            <img
              src={item.image}
              srcSet={`${item.imageSmall} 600w, ${item.image} 1200w`}
              width={item.width}
              height={item.height}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 820px) 100vw, 38vw"
            />
            <figcaption>{item.caption}</figcaption>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
