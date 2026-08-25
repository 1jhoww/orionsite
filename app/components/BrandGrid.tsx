/* eslint-disable @next/next/no-img-element -- Brand assets are official, local and served at intrinsic dimensions. */
import type { Brand } from "../data/site";
import { Reveal } from "./Reveal";

export function BrandGrid({ brands }: { brands: Brand[] }) {
  return (
    <div className="brand-grid">
      {brands.map((brand, index) => (
        <Reveal className={`brand-tile brand-tile--${brand.surface}`} delay={index * 90} key={brand.name}>
          <figure className="brand-logo-stage">
            <img
              src={brand.logo}
              width={brand.width}
              height={brand.height}
              alt={brand.alt}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 760px) 70vw, 22vw"
            />
          </figure>
          <div className="brand-caption">
            <h3>{brand.name}</h3>
            <p>{brand.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
