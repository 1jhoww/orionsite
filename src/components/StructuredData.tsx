import { brands, orionCompany, type FaqItem } from "../data/site";
import { SITE_NAME, getSiteOrigin, toAbsoluteSiteUrl } from "./Seo";

type JsonLdValue = Record<string, unknown>;

function JsonLd({ value }: { value: JsonLdValue }) {
  const serialized = JSON.stringify(value).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialized }} />;
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      value={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${getSiteOrigin()}/#organization`,
        name: SITE_NAME,
        legalName: "Orion Indústria e Comércio de Cosméticos Ltda.",
        url: getSiteOrigin(),
        logo: toAbsoluteSiteUrl("/brand/orion-logo-optimized.webp"),
        image: toAbsoluteSiteUrl("/og.png"),
        description: "Indústria de cosméticos pet: desenvolvimento, formulação, fabricação, envase e terceirização para marcas do mercado pet.",
        email: orionCompany.email,
        telephone: "+55 11 96232-0441",
        address: {
          "@type": "PostalAddress",
          streetAddress: orionCompany.street,
          addressLocality: orionCompany.city,
          addressRegion: orionCompany.state,
          postalCode: orionCompany.postalCode,
          addressCountry: orionCompany.country,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "administrativo@orionpet.com.br",
            telephone: "+55 11 96232-0441",
            availableLanguage: ["Portuguese"],
          },
        ],
        knowsAbout: [
          "Desenvolvimento de produtos para o mercado pet",
          "Formulação",
          "Fabricação",
          "Envase",
          "Documentação de produtos",
          "Identidade visual",
          "Higiene pet",
          "Tratamento de pelagem",
          "Perfumaria pet",
        ],
        brand: brands.map((brand) => ({ "@type": "Brand", name: brand.name })),
      }}
    />
  );
}

export type BreadcrumbSchemaItem = {
  name: string;
  path: string;
};

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbSchemaItem[] }) {
  return (
    <JsonLd
      value={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: toAbsoluteSiteUrl(item.path),
        })),
      }}
    />
  );
}

/** The site has no on-site search, so no SearchAction is declared. */
export function WebSiteJsonLd() {
  return (
    <JsonLd
      value={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${getSiteOrigin()}/#website`,
        name: SITE_NAME,
        url: getSiteOrigin(),
        inLanguage: "pt-BR",
        publisher: { "@id": `${getSiteOrigin()}/#organization` },
      }}
    />
  );
}

/** Mirrors exactly the questions and answers rendered in the accordion. */
export function FaqPageJsonLd({ items }: { items: readonly FaqItem[] }) {
  return (
    <JsonLd
      value={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }}
    />
  );
}
