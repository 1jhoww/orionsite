export type CompanyHistoryItem = {
  period: string;
  title: string;
  description: string;
  image: string;
  imageSmall: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imagePosition?: string;
};

/**
 * The About hero owns the founders' story and the confirmed 2018 date. This
 * sequence starts with Orion itself and follows the company's physical growth,
 * using only documented industrial photographs.
 */
export const companyHistory: CompanyHistoryItem[] = [
  {
    period: "2021",
    title: "Nasce a Orion.",
    description:
      "A busca por inovação, independência no desenvolvimento e respeito ao bem-estar animal dá origem à Orion — e à estrutura onde a produção deu os primeiros passos.",
    image: "/media/company/history-origin.webp",
    imageSmall: "/media/company/history-origin-720.webp",
    imageAlt: "Estrutura e equipamentos da fábrica da Orion em seu início",
    imageWidth: 1280,
    imageHeight: 960,
    imagePosition: "50% 52%",
  },
  {
    period: "Estruturação do estoque",
    title: "A operação começa a ganhar forma.",
    description:
      "A ampliação também prepara uma nova estrutura de armazenamento e apoio à operação, organizando o espaço para acompanhar o crescimento da Orion.",
    image: "/media/company/history-storage-setup.webp",
    imageSmall: "/media/company/history-storage-setup-720.webp",
    imageAlt: "Estrutura de armazenamento da Orion ainda em montagem",
    imageWidth: 1600,
    imageHeight: 1200,
    imagePosition: "50% 48%",
  },
  {
    period: "Estoque em operação",
    title: "A estrutura passa a apoiar a operação.",
    description:
      "A estrutura de armazenamento registra uma etapa anterior da operação da Orion, antes da ampliação física do espaço.",
    image: "/media/company/logistica-orion.webp",
    imageSmall: "/media/company/logistica-orion-720.webp",
    imageAlt: "Estoque anterior da Orion já em operação",
    imageWidth: 1200,
    imageHeight: 1800,
    imagePosition: "50% 53%",
  },
  {
    period: "Expansão",
    title: "Mais espaço para seguir avançando.",
    description:
      "A obra do estoque registra uma etapa de ampliação da estrutura da Orion.",
    image: "/media/company/history-stock-expansion-v2.webp",
    imageSmall: "/media/company/history-stock-expansion-v2-720.webp",
    imageAlt: "Corredor e muro em construção durante a ampliação do estoque da Orion",
    imageWidth: 960,
    imageHeight: 1280,
    imagePosition: "50% 56%",
  },
  {
    period: "Atualmente",
    title: "A estrutura produtiva em evolução.",
    description:
      "A evolução da estrutura produtiva acompanha a capacidade de desenvolver, fabricar e envasar novas soluções.",
    image: "/media/factory/tanques-orion-v2.webp",
    imageSmall: "/media/factory/tanques-orion-v2-720.webp",
    imageAlt: "Tanques e equipamentos da estrutura produtiva atual da Orion",
    imageWidth: 1440,
    imageHeight: 2160,
    imagePosition: "50% 54%",
  },
];
