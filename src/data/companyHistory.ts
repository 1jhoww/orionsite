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

// New milestones can be appended here, including a future "Orion hoje" entry
// when current-factory photography and its approved copy are available.
export const companyHistory: CompanyHistoryItem[] = [
  {
    period: "O início",
    title: "A fábrica em seus primeiros passos.",
    description:
      "Um registro da estrutura inicial da Orion e do espaço onde a produção começou a tomar forma.",
    image: "/media/company/history-origin.webp",
    imageSmall: "/media/company/history-origin-720.webp",
    imageAlt: "Estrutura e equipamentos da fábrica da Orion em seu início",
    imageWidth: 1280,
    imageHeight: 960,
    imagePosition: "50% 52%",
  },
  {
    period: "Primeiros passos",
    title: "Daniel e Zico no começo da fábrica.",
    description:
      "Daniel e Zico em um registro dos primeiros momentos de organização da estrutura.",
    image: "/media/company/history-daniel-zico.webp",
    imageSmall: "/media/company/history-daniel-zico-720.webp",
    imageAlt: "Daniel e Zico durante os primeiros momentos da fábrica da Orion",
    imageWidth: 1440,
    imageHeight: 1080,
    imagePosition: "50% 50%",
  },
  {
    period: "Antes da obra",
    title: "O estoque antes da ampliação.",
    description:
      "Um registro do estoque antes da obra de ampliação da estrutura.",
    image: "/media/company/history-stock-before-expansion.webp",
    imageSmall: "/media/company/history-stock-before-expansion-720.webp",
    imageAlt: "Corredor do estoque da Orion antes da obra de ampliação",
    imageWidth: 1200,
    imageHeight: 1599,
    imagePosition: "50% 50%",
  },
  {
    period: "Expansão",
    title: "Mais espaço para seguir avançando.",
    description:
      "A obra do estoque registra uma etapa de ampliação da estrutura da Orion.",
    image: "/media/company/history-stock-expansion.webp",
    imageSmall: "/media/company/history-stock-expansion-720.webp",
    imageAlt: "Obra de ampliação do estoque da fábrica da Orion",
    imageWidth: 960,
    imageHeight: 1280,
    imagePosition: "50% 66%",
  },
];
