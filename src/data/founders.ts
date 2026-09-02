export type Founder = {
  name: string;
  focus: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imagePosition?: string;
};

export const founders: Founder[] = [
  {
    name: "Daniel Costa",
    focus: "Desenvolvimento técnico e formulações",
    description:
      "À frente do desenvolvimento e das formulações da Orion, Daniel acompanha de perto a criação dos produtos, unindo conhecimento técnico, pesquisa e experiência prática. Sua atuação está presente desde os primeiros testes até a evolução das soluções produzidas pela empresa.",
    image: "/media/company/daniel-costa.webp",
    imageAlt: "Retrato de Daniel Costa, sócio da Orion",
    imageWidth: 941,
    imageHeight: 1672,
    imagePosition: "50% 8%",
  },
  {
    name: "José Aparecido Zebiani — Zico",
    focus: "Visão comercial e mercado",
    description:
      "Com forte atuação comercial e experiência no mercado pet, Zico traz para a Orion a proximidade com clientes, parceiros e as necessidades reais do setor. Essa visão de mercado contribui diretamente para transformar oportunidades em produtos e relações duradouras.",
    image: "/media/company/jose-aparecido-zebiane.webp",
    imageAlt: "Retrato de José Aparecido Zebiane, Zico, sócio da Orion",
    imageWidth: 1200,
    imageHeight: 1067,
    imagePosition: "50% 44%",
  },
];
