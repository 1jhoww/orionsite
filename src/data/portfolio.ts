import { atualPetLines, brands } from "./site";

/**
 * Official constellation artwork and its responsive WebP variants.
 */
export const portfolioConstellation = {
  image: "/brand/orion-constellation-v2.png" as string | null,
  imageWebp: "/brand/orion-constellation-v2.webp" as string | null,
  mobileImage: "/brand/orion-constellation-v2-720.webp" as string | null,
  width: 1295,
  height: 774,
  alt: "Constelação oficial da Orion com as marcas Atual Pet, +Dog, Dez Pet e Quality Pet",
} as const;

export type PortfolioCategory = {
  id: string;
  title: string;
  description: string;
  application: string;
  image: string;
  imageWebp?: string;
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
    image: "/media/categories/shampoos-orion-portfolio-transparent.png",
    imageWebp: "/media/categories/shampoos-orion-portfolio-transparent.webp",
    imageSmall: "/media/categories/shampoos-orion-portfolio-transparent-720.webp",
    imageWidth: 2752,
    imageHeight: 1536,
    imageAlt: "Seleção de shampoos das marcas da Orion em diferentes apresentações",
  },
  {
    id: "condicionadores",
    title: "Condicionadores",
    description:
      "Formulações voltadas ao condicionamento, à maciez, ao desembaraço e ao acabamento da pelagem em diferentes contextos de cuidado.",
    application:
      "Volumes e apresentações atendem tanto aplicações prontas para uso quanto rotinas profissionais de maior escala.",
    image: "/media/categories/condicionadores-orion-portfolio-transparent.png",
    imageWebp: "/media/categories/condicionadores-orion-portfolio-transparent.webp",
    imageSmall: "/media/categories/condicionadores-orion-portfolio-transparent-720.webp",
    imageWidth: 2752,
    imageHeight: 1536,
    imageAlt: "Seleção de condicionadores das marcas da Orion em diferentes apresentações",
  },
  {
    id: "mascaras-tratamentos",
    title: "Máscaras",
    description:
      "Produtos de tratamento articulam hidratação, textura, sensorial e desempenho para complementar protocolos de cuidado da pelagem.",
    application:
      "O desenvolvimento considera a experiência de aplicação e o resultado pretendido por cada proposta de linha.",
    image: "/media/categories/mascaras-orion-portfolio-transparent.png",
    imageWebp: "/media/categories/mascaras-orion-portfolio-transparent.webp",
    imageSmall: "/media/categories/mascaras-orion-portfolio-transparent-720.webp",
    imageWidth: 2752,
    imageHeight: 1536,
    imageAlt: "Seleção de máscaras das marcas da Orion em diferentes apresentações",
  },
  {
    id: "perfumes-colonias",
    title: "Perfumes",
    description:
      "A perfumaria pet conecta direção olfativa, identidade de marca e apresentação para prolongar a experiência após o cuidado.",
    application:
      "Diferentes fragrâncias, formatos e volumes mostram possibilidades de posicionamento e aplicação sem estabelecer hierarquia de qualidade.",
    image: "/media/categories/perfumes-orion-portfolio-transparent.png",
    imageWebp: "/media/categories/perfumes-orion-portfolio-transparent.webp",
    imageSmall: "/media/categories/perfumes-orion-portfolio-transparent-720.webp",
    imageWidth: 2752,
    imageHeight: 1536,
    imageAlt: "Seleção de perfumes e colônias das marcas da Orion em diferentes apresentações",
  },
  {
    id: "cuidados-especificos",
    title: "Cuidados Especiais",
    description:
      "Propostas direcionadas atendem necessidades particulares de pelagem, pele sensível, volume e rotina diária de cães e gatos.",
    application:
      "A categoria demonstra como formulação, forma de uso e comunicação podem partir de uma necessidade bem definida.",
    image: "/media/categories/cuidados-especiais-orion-portfolio-transparent.png",
    imageWebp: "/media/categories/cuidados-especiais-orion-portfolio-transparent.webp",
    imageSmall: "/media/categories/cuidados-especiais-orion-portfolio-transparent-720.webp",
    imageWidth: 2752,
    imageHeight: 1536,
    imageAlt: "Seleção de produtos de cuidados especiais das marcas da Orion",
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
