export type Brand = {
  name: string;
  slug: string;
  logo: string;
  width: number;
  height: number;
  alt: string;
  description: string;
  surface: "paper" | "blue" | "mint";
};

export type TechnologyMedia = {
  placement: "main" | "detail";
  image: string;
  imageSmall: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  imagePosition?: string;
};

export type MethodStage = {
  title: string;
  description: string;
  detail: string;
  image: string;
  imageSmall: string;
  alt: string;
  imagePosition?: string;
};

export type ProductionCategory = {
  title: string;
  description: string;
  products: string[];
  image: string;
  imageSmall: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  imagePosition?: string;
};

export type AtualPetLine = {
  name: string;
  logo: string;
  logoAlt: string;
  artwork: string;
  artworkSmall: string;
  artworkAlt: string;
  description: string;
  detail: string;
  tone: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

// Disabled until the commercial offer is confirmed by Orion.
export const businessFeatures = { privateLabel: false } as const;

export const brands: Brand[] = [
  {
    name: "AtualPet",
    slug: "atual-pet",
    logo: "/brand/atualpet-logo.webp",
    width: 640,
    height: 443,
    alt: "Logo oficial da AtualPet",
    description: "Higiene, tratamento e perfumaria para a rotina profissional.",
    surface: "mint",
  },
  {
    name: "Quality Pet",
    slug: "quality-pet",
    logo: "/brand/quality-pet-logo.png",
    width: 182,
    height: 204,
    alt: "Logo oficial da Quality Pet",
    description: "Identidade própria traduzida em produto, acabamento e presença.",
    surface: "blue",
  },
  {
    name: "+Dog",
    slug: "mais-dog",
    logo: "/brand/mais-dog-logo.png",
    width: 439,
    height: 293,
    alt: "Logo oficial da +Dog",
    description: "Um universo de marca construído para cuidado e proximidade.",
    surface: "paper",
  },
  {
    name: "Dez Pet",
    slug: "dez-pet",
    logo: "/brand/dez-pet-logo.png",
    width: 203,
    height: 187,
    alt: "Logo da Dez Pet",
    description: "Portfólio com linguagem direta e identidade reconhecível.",
    surface: "paper",
  },
];

export const technologyMedia: TechnologyMedia[] = [
  {
    placement: "main",
    image: "/media/factory/estoque-materias-primas-orion.webp",
    imageSmall: "/media/factory/estoque-materias-primas-orion-720.webp",
    width: 1440,
    height: 2158,
    alt: "Estoque real de matérias-primas da fábrica Orion, com insumos organizados em prateleiras",
    caption: "Estoque de matérias-primas",
    imagePosition: "44% 50%",
  },
  {
    placement: "detail",
    image: "/media/hero-formula.webp",
    imageSmall: "/media/hero-formula.webp",
    width: 1600,
    height: 2400,
    alt: "Gota de formulação sendo dosada em um frasco de laboratório",
    caption: "Precisão de formulação",
  },
  {
    placement: "detail",
    image: "/media/og-formulation.webp",
    imageSmall: "/media/og-formulation.webp",
    width: 1600,
    height: 841,
    alt: "Vidrarias e matérias-primas organizadas para desenvolvimento",
    caption: "Desenvolvimento técnico",
  },
];

export const methodStages: MethodStage[] = [
  {
    title: "Pesquisa",
    description: "Leitura da categoria, da aplicação e da experiência que o produto precisa construir.",
    detail: "Contexto · necessidade · direção",
    image: "/media/quality-control.webp",
    imageSmall: "/media/quality-control-600.webp",
    alt: "Avaliação técnica em ambiente de laboratório",
  },
  {
    title: "Desenvolvimento",
    description: "Definição de fórmula, textura, fragrância, desempenho e acabamento em um conjunto coerente.",
    detail: "Fórmula · sensorial · desempenho",
    image: "/media/company/development-daniel.webp",
    imageSmall: "/media/company/development-daniel-720.webp",
    alt: "Daniel durante o desenvolvimento de uma formulação no laboratório da Orion",
    imagePosition: "50% 46%",
  },
  {
    title: "Produção",
    description: "A solução ganha escala por meio de fabricação, envase e finalização organizados.",
    detail: "Fabricação · envase · finalização",
    image: "/media/factory/envase-orion.webp",
    imageSmall: "/media/factory/envase-orion-720.webp",
    alt: "Envase real de produtos na linha de produção da fábrica Orion",
    imagePosition: "50% 58%",
  },
];

export function getBrandBySlug(slug: string) {
  return brands.find((brand) => brand.slug === slug);
}

export const atualPetLines: AtualPetLine[] = [
  {
    name: "Dream Color",
    logo: "/brand/atualpet-lines/dream-color.png",
    logoAlt: "Logo oficial da linha Dream Color",
    artwork: "/media/lines/dream-color.webp",
    artworkSmall: "/media/lines/dream-color-720.webp",
    artworkAlt: "Composição publicitária da linha Dream Color com produtos profissionais de higiene e tratamento",
    description: "Limpeza e tratamento para diferentes rotinas profissionais.",
    detail: "Shampoos · condicionadores · máscaras · finalizadores",
    tone: "#f0c85f",
  },
  {
    name: "Dream Color Care",
    logo: "/brand/atualpet-lines/dream-color-care.png",
    logoAlt: "Logo oficial da linha Dream Color Care",
    artwork: "/media/lines/dream-color-care.webp",
    artworkSmall: "/media/lines/dream-color-care-720.webp",
    artworkAlt: "Composição publicitária da linha Dream Color Care com produtos para cuidados especializados",
    description: "Cuidados especiais para necessidades específicas.",
    detail: "Cuidado direcionado · peles sensíveis",
    tone: "#e1bd65",
  },
  {
    name: "The Luxe",
    logo: "/brand/atualpet-lines/the-luxe.png",
    logoAlt: "Logo oficial da linha The Luxe",
    artwork: "/media/lines/the-luxe.webp",
    artworkSmall: "/media/lines/the-luxe-720.webp",
    artworkAlt: "Composição publicitária da linha The Luxe com produtos de tratamento e finalização",
    description: "Tratamento intensivo com identidade visual própria.",
    detail: "Máscaras · shampoos · condicionadores · perfumaria",
    tone: "#e95177",
  },
  {
    name: "Vanity Pet",
    logo: "/brand/atualpet-lines/vanity-pet.png",
    logoAlt: "Logo oficial da linha Vanity Pet",
    artwork: "/media/lines/vanity-pet.webp",
    artworkSmall: "/media/lines/vanity-pet-720.webp",
    artworkAlt: "Composição publicitária da linha Vanity Pet com fragrâncias para cães e gatos",
    description: "Perfumaria criada para prolongar a experiência do cuidado.",
    detail: "Perfumes · colônias · acabamento",
    tone: "#d6a526",
  },
  {
    name: "Zoom",
    logo: "/brand/atualpet-lines/zoom.png",
    logoAlt: "Logo oficial da linha Zoom",
    artwork: "/media/lines/zoom.webp",
    artworkSmall: "/media/lines/zoom-720.webp",
    artworkAlt: "Composição publicitária da linha Zoom com produtos de cuidado diário para cães e gatos",
    description: "Soluções práticas para a rotina de higiene e cuidado diário.",
    detail: "Shampoos · condicionadores · cuidado diário",
    tone: "#70c7c3",
  },
];

export const productionCategories: ProductionCategory[] = [
  {
    title: "Higiene base",
    description: "Soluções desenvolvidas para as etapas essenciais de limpeza e preparação da rotina de cuidado pet.",
    products: ["Shampoos profissionais", "Pré-lavagem", "Sabonetes", "Soluções de limpeza"],
    image: "/media/hero-products.webp",
    imageSmall: "/media/hero-products.webp",
    imageWidth: 1672,
    imageHeight: 940,
    imageAlt: "Produtos de higiene e tratamento para o mercado pet",
  },
  {
    title: "Tratamento avançado",
    description: "Formulações voltadas à hidratação, condicionamento, reconstrução e cuidado direcionado da pelagem.",
    products: ["Máscaras", "Hidratação", "Condicionadores", "Reconstrução", "Tratamento de pelagem"],
    image: "/media/formulation.webp",
    imageSmall: "/media/formulation-600.webp",
    imageWidth: 1200,
    imageHeight: 800,
    imageAlt: "Textura cosmética sendo analisada durante a formulação",
  },
  {
    title: "Finalização e perfumaria",
    description: "Textura, fragrância e acabamento trabalhados para completar a experiência de cuidado e reforçar a identidade da marca.",
    products: ["Colônias", "Sprays", "Finalizadores", "Brilho", "Acabamento"],
    image: "/media/factory/envase-perfume-orion.webp",
    imageSmall: "/media/factory/envase-perfume-orion-720.webp",
    imageWidth: 1440,
    imageHeight: 2158,
    imageAlt: "Frascos de perfume durante o envase real na fábrica Orion",
    imagePosition: "44% 62%",
  },
  {
    title: "Cuidado especializado",
    description: "Soluções para necessidades específicas da higiene e do bem-estar na rotina de cuidado pet.",
    products: ["Limpeza de patinhas", "Cuidados para a região dos olhos", "Neutralizadores de odores", "Cuidados específicos"],
    image: "/media/quality-control.webp",
    imageSmall: "/media/quality-control-600.webp",
    imageWidth: 1200,
    imageHeight: 800,
    imageAlt: "Avaliação técnica de uma solução em ambiente de laboratório",
  },
];

export const processSteps = [
  {
    title: "Desenvolvimento",
    description: "A intenção do produto se transforma em direção técnica, sensorial e de mercado.",
  },
  {
    title: "Formulação",
    description: "Matérias-primas, desempenho e experiência entram em equilíbrio.",
  },
  {
    title: "Produção",
    description: "A fórmula ganha escala em um processo organizado e consistente.",
  },
  {
    title: "Acabamento",
    description: "Envase e apresentação completam um produto pronto para circular.",
  },
] as const;

export const faqItems: FaqItem[] = [
  {
    question: "A Orion desenvolve produtos para outras marcas?",
    answer:
      "Sim. A Orion conecta desenvolvimento, formulação, fabricação, envase e finalização para transformar a direção de uma marca em soluções para o mercado pet.",
  },
  {
    question: "Como funciona o desenvolvimento de um projeto?",
    answer:
      "O trabalho avança por alinhamento comercial, desenvolvimento e amostras, apoio à organização documental e aos processos de regularização e registro, produção, envase e entrega. Identidade visual pode integrar o projeto como etapa complementar, conforme o escopo comercial.",
  },
  {
    question: "Quais tipos de solução fazem parte da atuação da Orion?",
    answer:
      "A atuação apresentada neste site reúne higiene, tratamento de pelagem, cuidado especializado, finalização e perfumaria pet.",
  },
  {
    question: "Como falar com a Orion?",
    answer:
      "Envie uma mensagem pelo WhatsApp, mande um e-mail para administrativo@orionpet.com.br ou fale diretamente com nossa equipe pelo telefone (11) 96232-0441.",
  },
  {
    question: "Quais marcas fazem parte do portfólio apresentado?",
    answer:
      "O ecossistema institucional reúne AtualPet, Quality Pet, +Dog e Dez Pet. A página de portfólio organiza os produtos reais disponíveis por categoria, sem estabelecer hierarquia de qualidade entre as marcas.",
  },
  {
    question: "Onde encontro o canal de contato comercial?",
    answer:
      "Os canais institucionais disponíveis são administrativo@orionpet.com.br e o WhatsApp (11) 96232-0441.",
  },
];
