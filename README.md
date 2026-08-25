# Orion — site institucional

Site institucional multipágina da Orion, com foco B2B em desenvolvimento,
formulação, fabricação e envase de soluções para o mercado pet.

Stack: **React + Vite + React Router + TypeScript**, preparada para hospedagem
na Vercel como SPA.

## Desenvolvimento

```bash
npm install
npm run dev
```

O Vite inicia localmente em `http://localhost:3000`.

## Build

```bash
npm run build
```

O resultado é gerado em `dist`.

## Preview

```bash
npm run preview
```

O preview de produção inicia em `http://localhost:4173`.

## Validação

```bash
npm run lint
npm test
npm run build:og
```

As páginas ficam em `src/pages`, os componentes em `src/components`, os dados
institucionais em `src/data/site.ts` e os estilos globais em
`src/styles/globals.css`.

## SEO e domínio

Títulos, descriptions, canonical e Open Graph são atualizados por rota. Em
produção na Vercel, a aplicação usa automaticamente
`VITE_VERCEL_PROJECT_PRODUCTION_URL`. Um domínio oficial também pode ser
definido com `VITE_SITE_URL=https://dominio-oficial`.

Sem um domínio confirmado, `public/sitemap.xml` e `public/robots.txt` mantêm
caminhos relativos para não inventar uma origem. Durante o build da Vercel,
esses arquivos são finalizados em `dist` com a URL de produção do projeto.

## Deploy

Configuração da Vercel:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install` (padrão)
- Root Directory: `./`

O rewrite definido em `vercel.json` encaminha rotas sem arquivo para
`index.html`, permitindo refresh direto em qualquer página do React Router.

As marcas apresentadas nesta versão são AtualPet, Quality Pet, Mais Dog e Dez
Pet. As cinco linhas da AtualPet foram conferidas no catálogo institucional da
própria marca. A identidade usa o azul `#0B6186`, extraído diretamente da logo
raster oficial da Orion.

## Estrutura da home

- Hero industrial com posicionamento pet explícito e dois caminhos de conversão.
- Quatro pilares institucionais em uma matriz editorial tipográfica.
- Quatro grupos de soluções em um mosaico fotográfico assimétrico.
- Método Orion interativo, organizado em Pesquisa, Desenvolvimento e Produção.
- Jornada B2B em timeline animada e galeria de estrutura e tecnologia.
- Grade de marcas produzidas e história de produto da AtualPet.
- CTA comercial institucional e navegação completa no rodapé.

## Direção visual e interação

- Schibsted Grotesk, azul Orion `#0B6186`, fundos claros e âncoras em azul profundo.
- Hierarquia editorial ampla, fotografia industrial e linhas técnicas discretas.
- Sistema geométrico de três movimentos construído em CSS para navegar pelo processo.
- Uma única narrativa sticky, dedicada às marcas e linhas de produto da AtualPet.
- Alternativas responsivas para a narrativa sticky e suporte completo a
  `prefers-reduced-motion`.

## Imagens e procedência

- Hero industrial: fotografia já licenciada e disponível no acervo local (`public/media/clean-filling.webp`), com derivação mobile em 720 px.
- Método Orion: construção gráfica autoral em CSS, sem dependência de imagem raster.
- Vidrarias e essências: [Fulvio Ciccolo / Unsplash](https://unsplash.com/photos/clear-glass-bottles-on-black-surface-EM9Mu_uLUj4).
- Linha automatizada de dosagem: [Wzm Pictures / Pexels](https://www.pexels.com/photo/a-machine-with-bottles-with-liquid-at-a-bottling-company-18211416/).
- Textura cosmética: [Fernando Serrano / Pexels](https://www.pexels.com/photo/mixing-ingredients-of-skincare-product-with-use-of-pipette-16100838/).
- Fragrâncias para ambientes: [Alesia Kozik / Pexels](https://www.pexels.com/photo/scented-sticks-and-oil-for-aromatherapy-7795823/).
- Logos e produtos AtualPet: acervo do projeto institucional local da própria marca.
- Artes publicitárias Dream Color, Dream Color Care, The Luxe, Vanity Pet e Zoom: arquivos fornecidos pelo usuário, servidos em WebP responsivo em `public/media/lines`.
- Logo branca Orion no rodapé: derivada do arquivo oficial fornecido, com transparência e recorte otimizados para o fundo institucional.
- Open Graph: peça institucional existente preservada em `public/og.png`.
- Logo Quality Pet: arquivo oficial publicado no site da marca.
- Logos Mais Dog e Dez Pet: materiais fornecidos pelo usuário; fundos foram removidos apenas para normalização visual, preservando os desenhos originais.

As demais fotografias servidas pelo site foram convertidas para WebP e
dimensionadas para reduzir o peso de transferência.
