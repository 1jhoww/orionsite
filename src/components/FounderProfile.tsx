import type { Founder } from "../data/founders";

type FounderProfileProps = {
  founder: Founder;
};

export function FounderProfile({ founder }: FounderProfileProps) {
  return (
    <article className="founder-profile">
      <figure className="founder-profile-media">
        <img
          src={founder.image}
          alt={founder.imageAlt}
          width={founder.imageWidth}
          height={founder.imageHeight}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: founder.imagePosition }}
        />
      </figure>
      <div className="founder-profile-copy">
        <p className="founder-profile-focus">{founder.focus}</p>
        <h3>{founder.name}</h3>
        <p>{founder.description}</p>
      </div>
    </article>
  );
}
