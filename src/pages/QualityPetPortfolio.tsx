import { BrandPortfolioPage } from "../components/BrandPortfolioPage";
import { Seo } from "../components/Seo";
import { getBrandBySlug } from "../data/site";

const configuredBrand = getBrandBySlug("quality-pet");
if (!configuredBrand) throw new Error("Quality Pet não encontrada na configuração de marcas.");
const brand = configuredBrand;

export default function QualityPetPage() {
  return (
    <>
      <Seo
        title="Quality Pet | Portfólio Orion"
        description="Conheça a estrutura institucional da Quality Pet no portfólio da Orion."
        path="/portfolio/quality-pet"
        ogDescription="Identidade própria traduzida em produto, acabamento e presença."
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
