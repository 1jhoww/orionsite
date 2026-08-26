# Inventário de imagens — Orion

Inventário criado antes da rodada de refinamento de 25/08/2026. A contagem
considera aparições visíveis no site, não metadados Open Graph.

## Estado encontrado

| Asset principal | Home | Sobre | Portfólio | Terceirização | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| `clean-filling.webp` | 3 | 1 | 0 | 1 | 5 |
| `formulation.webp` | 3 | 1 | 0 | 1 | 5 |
| `quality-control.webp` | 3 | 1 | 0 | 0 | 4 |
| `hero-products.webp` | 1 | 0 | 1 | 0 | 2 |
| `fragrance-glass.webp` | 1 | 0 | 0 | 0 | 1 |
| `fragrance-vials.webp` | 1 | 0 | 0 | 0 | 1 |
| Artes de linhas AtualPet | 0 | 0 | 6 | 0 | 6 distintas |

Na Home, as repetições vinham da combinação entre Soluções, Método Orion e
Estrutura e Tecnologia. Entre páginas, `clean-filling.webp` era usado na Home,
Sobre e Terceirização; `formulation.webp`, nas mesmas três rotas.

## Redistribuição aplicada

- `clean-filling.webp` permanece exclusivo da Home e continua sendo sua imagem
  principal aprovada.
- Estrutura e Tecnologia passa a usar `og-editorial.webp`,
  `hero-formula.webp` e `og-formulation.webp`.
- `/sobre` passa a ser predominantemente tipográfica, sem repetir a galeria
  técnica da Home.
- `/portfolio` usa a constelação oficial e as artes reais de produtos/linhas;
  `hero-products.webp` deixa de ser repetido na Hero dessa página.
- `/terceirizacao` passa a usar `hero-fragrance.webp` e
  `hero-perfume-lab.webp`, ambos já existentes no acervo.

## Resultado conferido

| Asset principal | Home | Sobre | Portfólio | Terceirização | Total final |
| --- | ---: | ---: | ---: | ---: | ---: |
| `clean-filling.webp` | 1 | 0 | 0 | 0 | 1 |
| `formulation.webp` | 1 | 0 | 0 | 0 | 1 |
| `quality-control.webp` | 2 | 0 | 0 | 0 | 2 |
| `hero-products.webp` | 1 | 0 | 0 | 0 | 1 |
| Constelação oficial Orion | 0 | 0 | 1 | 0 | 1 |
| Artes de linhas AtualPet | 0 | 0 | 6 distintas | 0 | 6 distintas |

A constelação passou a pertencer exclusivamente à Hero de Portfólio. A Home
mantém apenas uma introdução textual e um CTA para a página completa. As demais
imagens industriais compartilhadas entre três rotas continuam eliminadas.

## Lacunas de acervo

Para aprofundar a história sem repetir imagens industriais genéricas, ainda são
necessárias fotografias históricas confirmadas: sede ou instalações em períodos
distintos, equipe/fundadores autorizados, primeiros produtos ou embalagens e
registros de expansões relevantes. Nenhum desses materiais foi inventado nesta
rodada.

## Atualização — rodada de refinamento visual

- A Hero de `/portfolio` recebeu a nova constelação oficial
  (`constelação novo.png`), publicada como `public/brand/orion-constellation.png`
  (502 KB, fallback e Open Graph) com par `orion-constellation.webp` (100 KB)
  servido via `<picture>`. Para trocar por uma versão futura basta sobrescrever
  os dois arquivos e ajustar `width`/`height` em `portfolioConstellation`.
- A nova chamada de Portfólio da Home reaproveita as artes de linha já
  existentes em `/media/lines/*-720.webp` como prévia da categoria em foco.
  Apenas uma imagem é carregada por vez, sob demanda.
- O marquee de logos passou a existir também na Home, usando exatamente as
  mesmas logos reais de `/brand` já utilizadas em `/portfolio`.
