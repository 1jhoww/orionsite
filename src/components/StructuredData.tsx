import { brands } from "../data/site";
import { toAbsoluteSiteUrl } from "./Seo";

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
        name: "Orion",
        description: "Indústria de desenvolvimento e fabricação de soluções para o mercado pet.",
        email: "administrativo@orionpet.com.br",
        knowsAbout: [
          "Desenvolvimento de produtos para o mercado pet",
          "Formulação",
          "Fabricação",
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
