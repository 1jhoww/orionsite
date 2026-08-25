import type { Metadata } from "next";
import { BrandPortfolioPage } from "../../components/BrandPortfolioPage";
import { getBrandBySlug } from "../../data/site";

const brand = getBrandBySlug("dez-pet");
if (!brand) throw new Error("Dez Pet não encontrada na configuração de marcas.");

export const metadata: Metadata = {
  title: "Dez Pet | Portfólio Orion",
  description: "Conheça a estrutura institucional da Dez Pet no portfólio da Orion.",
  alternates: { canonical: "/portfolio/dez-pet" },
  openGraph: {
    title: "Dez Pet | Portfólio Orion",
    description: "Portfólio com linguagem direta e identidade reconhecível.",
    url: "/portfolio/dez-pet",
    images: [{ url: brand.logo, width: brand.width, height: brand.height, alt: brand.alt }],
  },
  twitter: { card: "summary", title: "Dez Pet | Portfólio Orion", description: brand.description, images: [brand.logo] },
};

export default function DezPetPage() {
  return <BrandPortfolioPage brand={brand} />;
}
