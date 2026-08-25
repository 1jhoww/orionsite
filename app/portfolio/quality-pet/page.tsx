import type { Metadata } from "next";
import { BrandPortfolioPage } from "../../components/BrandPortfolioPage";
import { getBrandBySlug } from "../../data/site";

const brand = getBrandBySlug("quality-pet");
if (!brand) throw new Error("Quality Pet não encontrada na configuração de marcas.");

export const metadata: Metadata = {
  title: "Quality Pet | Portfólio Orion",
  description: "Conheça a estrutura institucional da Quality Pet no portfólio da Orion.",
  alternates: { canonical: "/portfolio/quality-pet" },
  openGraph: {
    title: "Quality Pet | Portfólio Orion",
    description: "Identidade própria traduzida em produto, acabamento e presença.",
    url: "/portfolio/quality-pet",
    images: [{ url: brand.logo, width: brand.width, height: brand.height, alt: brand.alt }],
  },
  twitter: { card: "summary", title: "Quality Pet | Portfólio Orion", description: brand.description, images: [brand.logo] },
};

export default function QualityPetPage() {
  return <BrandPortfolioPage brand={brand} />;
}
