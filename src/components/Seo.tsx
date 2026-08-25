import { Helmet } from "react-helmet-async";

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  twitterCard?: "summary" | "summary_large_image";
  noIndex?: boolean;
};

const defaultImage = "/og.png";

export function getSiteOrigin() {
  const configuredOrigin = import.meta.env.VITE_SITE_URL?.trim();
  const vercelProductionHost = import.meta.env.VITE_VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const candidate = configuredOrigin || (vercelProductionHost ? `https://${vercelProductionHost}` : window.location.origin);

  try {
    return new URL(candidate).origin;
  } catch {
    return window.location.origin;
  }
}

export function toAbsoluteSiteUrl(path: string) {
  return new URL(path, `${getSiteOrigin()}/`).href;
}

export function Seo({
  title,
  description,
  path,
  ogTitle = title,
  ogDescription = description,
  image = defaultImage,
  imageWidth = 1200,
  imageHeight = 630,
  imageAlt = "Orion — soluções industriais para o mercado pet",
  twitterCard = "summary_large_image",
  noIndex = false,
}: SeoConfig) {
  const canonical = toAbsoluteSiteUrl(path);
  const imageUrl = toAbsoluteSiteUrl(image);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}
