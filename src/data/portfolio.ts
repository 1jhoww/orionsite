import { atualPetLines, brands } from "./site";

/**
 * Official constellation artwork. To publish a new version, overwrite
 * public/brand/orion-constellation.png (and the .webp twin) and update width/height here —
 * nothing else in the page needs to change.
 */
export const portfolioConstellation = {
  image: "/brand/orion-constellation.png" as string | null,
  imageWebp: "/brand/orion-constellation.webp" as string | null,
  mobileImage: null as string | null,
  width: 1536,
  height: 1024,
  alt: "Constelação oficial da Orion com as marcas Atual Pet, +Dog, Dez Pet e Quality Pet",
} as const;

export type PortfolioCategory = {
  id: string;
  title: string;
  description: string;
  application: string;
  image: string;
  imageSmall?: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
};

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: "shampoos",
    title: "Shampoos",
    description:
      "Soluções de higienização desenvolvidas para diferentes rotinas, tipos de pelagem, diluições e necessidades de uso profissional.",
    application:
      "A categoria reúne propostas para limpeza, neutralização, branqueamento, volume e cuidados direcionados.",
    image: "/media/categories/shampoos-orion.webp",
    imageSmall: "/media/categories/shampoos-orion-720.webp",
    imageWidth: 1536,
    imageHeight: 1024,
    imageAlt: "Shampoos Dream Color em embalagens profissionais ao lado de produtos de condicionamento e perfumaria",
  },
  {
    id: "condicionadores",
    title: "Condicionadores",
    description:
      "Formulações voltadas ao condicionamento, à maciez, ao desembaraço e ao acabamento da pelagem em diferentes contextos de cuidado.",
    application:
      "Volumes e apresentações atendem tanto aplicações prontas para uso quanto rotinas profissionais de maior escala.",
    image: "/media/lines/zoom.webp",
    imageSmall: "/media/lines/zoom-720.webp",
    imageWidth: 1440,
    imageHeight: 960,
    imageAlt: "Shampoo e condicionadores Zoom em apresentações de 750 mililitros e 5 litros",
  },
  {
    id: "mascaras-tratamentos",
    title: "Máscaras e Tratamentos",
    description:
      "Produtos de tratamento articulam hidratação, textura, sensorial e desempenho para complementar protocolos de cuidado da pelagem.",
    application:
      "O desenvolvimento considera a experiência de aplicação e o resultado pretendido por cada proposta de linha.",
    image: "/media/lines/the-luxe.webp",
    imageSmall: "/media/lines/the-luxe-720.webp",
    imageWidth: 1440,
    imageHeight: 960,
    imageAlt: "Máscara, shampoo, condicionador, colônia e finalizadores da linha The Luxe",
  },
  {
    id: "finalizadores",
    title: "Finalizadores",
    description:
      "Soluções de acabamento ampliam a experiência do cuidado com propostas para textura, volume, brilho e finalização da pelagem.",
    application:
      "Formatos em spray, leave-in e fluido permitem ajustar uso, aplicação e linguagem visual ao projeto.",
    image: "/media/lines/dream-color-care.webp",
    imageSmall: "/media/lines/dream-color-care-720.webp",
    imageWidth: 1440,
    imageHeight: 960,
    imageAlt: "Spray de volume e shampoos Dream Color Care para cuidados específicos",
  },
  {
    id: "perfumes-colonias",
    title: "Perfumes e Colônias",
    description:
      "A perfumaria pet conecta direção olfativa, identidade de marca e apresentação para prolongar a experiência após o cuidado.",
    application:
      "Diferentes fragrâncias, formatos e volumes mostram possibilidades de posicionamento e aplicação sem estabelecer hierarquia de qualidade.",
    image: "/media/lines/vanity-pet.webp",
    imageSmall: "/media/lines/vanity-pet-720.webp",
    imageWidth: 1440,
    imageHeight: 960,
    imageAlt: "Colônias Vanity Pet em frascos de 50 e 500 mililitros",
  },
  {
    id: "cuidados-especificos",
    title: "Cuidados Específicos",
    description:
      "Propostas direcionadas atendem necessidades particulares de pelagem, pele sensível, volume e rotina diária de cães e gatos.",
    application:
      "A categoria demonstra como formulação, forma de uso e comunicação podem partir de uma necessidade bem definida.",
    image: "/brand/atualpet-products/dream-color-care.webp",
    imageWidth: 1080,
    imageHeight: 1080,
    imageAlt: "Duas apresentações reais do Shampoo Própolis Dream Color Care",
  },
];

export const confirmedPortfolioScale = {
  value: 500,
  suffix: "+",
  label: "SKUs desenvolvidos",
} as const;

export const confirmedMarketExperience = {
  value: 4,
  suffix: "+",
  label: "Anos de mercado",
} as const;

/** Confirmed institutional figures, in reading order, for the Home scale band. */
export const confirmedScaleFigures = [
  confirmedPortfolioScale,
  confirmedMarketExperience,
] as const;

const brandEcosystemInventory = [
  ...brands.map((brand) => ({
    name: brand.name,
    logo: brand.logo,
    width: brand.width,
    height: brand.height,
    kind: "Marca" as const,
  })),
  ...atualPetLines.map((line) => ({
    name: line.name,
    logo: line.logo,
    width: 500,
    height: 300,
    kind: "Linha" as const,
  })),
];

/**
 * The three independent brands divide the larger AtualPet family into short,
 * visually varied groups. The marquee component duplicates this single source
 * only at render time so both halves of the infinite loop stay identical.
 */
export const brandEcosystemOrder = [
  "AtualPet",
  "The Luxe",
  "Quality Pet",
  "Dream Color",
  "Zoom",
  "+Dog",
  "Dream Color Care",
  "Vanity Pet",
  "Dez Pet",
] as const;

export const brandEcosystem = brandEcosystemOrder.map((name) => {
  const item = brandEcosystemInventory.find((candidate) => candidate.name === name);
  if (!item) throw new Error(`Marca ausente no ecossistema do portfólio: ${name}`);
  return item;
});
