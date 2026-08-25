import { BrandPortfolioPage } from "../components/BrandPortfolioPage";
import { Seo } from "../components/Seo";
import { getBrandBySlug } from "../data/site";

const configuredBrand = getBrandBySlug("dez-pet");
if (!configuredBrand) throw new Error("Dez Pet não encontrada na configuração de marcas.");
const brand = configuredBrand;

export default function DezPetPage() {
  return (
    <>
      <Seo
        title="Dez Pet | Portfólio Orion"
        description="Conheça a estrutura institucional da Dez Pet no portfólio da Orion."
        path="/portfolio/dez-pet"
        ogDescription="Portfólio com linguagem direta e identidade reconhecível."
        image={brand.logo}
        imageWidth={brand.width}
        imageHeight={brand.height}
        imageAlt={brand.alt}
        twitterCard="summary"
      />
      <BrandPortfolioPage brand={brand} />
    </>
  );
}
