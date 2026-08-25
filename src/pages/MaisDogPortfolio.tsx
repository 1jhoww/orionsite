import { BrandPortfolioPage } from "../components/BrandPortfolioPage";
import { Seo } from "../components/Seo";
import { getBrandBySlug } from "../data/site";

const configuredBrand = getBrandBySlug("mais-dog");
if (!configuredBrand) throw new Error("Mais Dog não encontrada na configuração de marcas.");
const brand = configuredBrand;

export default function MaisDogPage() {
  return (
    <>
      <Seo
        title="Mais Dog | Portfólio Orion"
        description="Conheça a estrutura institucional da Mais Dog no portfólio da Orion."
        path="/portfolio/mais-dog"
        ogDescription="Um universo de marca construído para cuidado e proximidade."
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
