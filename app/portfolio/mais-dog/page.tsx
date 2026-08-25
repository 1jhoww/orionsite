import type { Metadata } from "next";
import { BrandPortfolioPage } from "../../components/BrandPortfolioPage";
import { getBrandBySlug } from "../../data/site";

const brand = getBrandBySlug("mais-dog");
if (!brand) throw new Error("Mais Dog não encontrada na configuração de marcas.");

export const metadata: Metadata = {
  title: "Mais Dog | Portfólio Orion",
  description: "Conheça a estrutura institucional da Mais Dog no portfólio da Orion.",
  alternates: { canonical: "/portfolio/mais-dog" },
  openGraph: {
    title: "Mais Dog | Portfólio Orion",
    description: "Um universo de marca construído para cuidado e proximidade.",
    url: "/portfolio/mais-dog",
    images: [{ url: brand.logo, width: brand.width, height: brand.height, alt: brand.alt }],
  },
  twitter: { card: "summary", title: "Mais Dog | Portfólio Orion", description: brand.description, images: [brand.logo] },
};

export default function MaisDogPage() {
  return <BrandPortfolioPage brand={brand} />;
}
