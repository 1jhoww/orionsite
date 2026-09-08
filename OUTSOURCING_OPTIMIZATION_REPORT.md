# Correções de Terceirização — 08/09/2026

Alterações locais, sem commit, push ou deploy. Tipografia, cores, textos, ilustrações, composição lateral e transições foram preservados.

## 1. Causa e reprodução

A hero tinha altura fixa `calc(100svh - var(--header-h))`. A linha central podia encolher até zero (`minmax(0, 1fr)`), mas as ilustrações absolutas mantinham uma altura independente. Até 900 px de largura, uma regra passava a dimensionar a imagem por `80vw`, enquanto a faixa que deveria contê-la tinha apenas 200–280 px de altura.

O teste de navegador detectou sobreposição nas três etapas em 900×700, 821×700, 820×700 e 768×1024. Em 900×700, a imagem de 480 px invadia aproximadamente 248 px do bloco de texto e podia interceptar os cliques nos controles.

Na cópia local, a sobreposição não se reproduziu exatamente em 1366×768/DPR 1 antes da alteração: existiam aproximadamente 16,6 px entre imagem e mensagem. Essa resolução foi mantida como principal referência de validação. As causas estruturais e as falhas efetivamente reproduzidas foram corrigidas, sem atribuir ao ambiente local um resultado que não ocorreu.

## 2. Correção do layout

- A hero usa altura mínima e pode crescer com o conteúdo, permitindo mais scroll em telas baixas.
- As três ilustrações compartilham uma célula de grid no fluxo normal. O grid reserva a altura real das imagens, inclusive antes do download.
- Foram removidos os posicionamentos absolutos dos slides e a linha que podia encolher sem considerar as imagens. Os transforms horizontais e as transições existentes foram mantidos.
- Imagem, mensagem e controles ocupam linhas próprias, com espaçamento explícito. Não houve correção por sobreposição de `z-index`.

## 3. Tamanho de “Seu produto”

A dimensão-base considera `clamp(180px, 32svh, 330px)`, o espaço horizontal disponível e a proporção 3:2. O produto recebe mais 14% de redução em relação às outras ilustrações. A imagem mantém `height: auto` e `object-fit: contain`.

Em 1366×768/DPR 1, passou de **483,8×322,5 px para 317,0×211,3 px**, redução de **34,5%** em cada dimensão. O intervalo entre a imagem central e o bloco de mensagem passou para aproximadamente 27 px. A ilustração lateral também foi incluída nas verificações de colisão.

## 4. Continuidade

Um chevron centralizado aparece depois do texto e do detalhe da etapa Produto. Tem 18 px de altura, cor azul existente, opacidade discreta e movimento vertical de 4 px em 2,6 s. É decorativo, não clicável e não aparece na árvore de acessibilidade. Com `prefers-reduced-motion: reduce`, permanece estático.

## 5. Imagens e pesos

Valores em KB decimais, sem cabeçalhos HTTP. “Depois” indica o arquivo escolhido no cenário de 1366×768/DPR 1; os originais maiores continuam disponíveis para outras densidades. Não houve recompressão das ilustrações nem das fotos da fábrica: suas versões menores já existiam.

| Asset | Antes | Depois | Estratégia |
| --- | ---: | ---: | --- |
| `etapa-ideia.webp` | 56,7 KB / 1200×800 | 27,1 KB / 720×480 | WebP existente via srcset/sizes |
| `etapa-formula.webp` | 122,3 KB / 1200×800 | 49,7 KB / 720×480 | WebP existente via srcset/sizes |
| `etapa-produto-v2.webp` | 94,2 KB / 1200×800 | 46,0 KB / 720×480 | WebP existente via srcset/sizes |
| `hero-perfume-lab.webp` | 281,7 KB / 2000×1333 | 112,2 KB / 1200×800 | Nova derivada WebP, qualidade 88 |
| `tanques-orion-v2.webp` | 186,8 KB / 1440×2160 | 73,9 KB / 720×1080 | WebP existente, primeira foto da Home |
| `tanques-orion.webp` | 329,4 KB / 1440×2158 | 64,5 KB / 720×1079 | WebP existente, carregamento controlado |
| `estoque-materias-primas-orion-v2.webp` | 118,3 KB / 1440×2160 | 51,6 KB / 720×1080 | WebP existente, carregamento controlado |
| `envase-orion-v2.webp` | 136,4 KB / 1440×2160 | 57,5 KB / 720×1080 | WebP existente, carregamento controlado |

Também foi gerada uma derivada de 720×480 / 51,7 KB para `hero-perfume-lab`. O `sizes` considera a altura de 660 px do recorte desktop e 470 px no mobile; portanto, não escolhe uma foto pequena demais apenas porque o container é estreito. No notebook testado, o navegador escolheu corretamente 1200 px. As versões foram comparadas visualmente no recorte real, sem perda perceptível relevante.

As três ilustrações somam **273,3 → 122,8 KB (−55%)**. As quatro fotos do crossfade somam **770,9 → 247,5 KB (−68%)** no cenário testado.

Há arquivos maiores no acervo, como `hero-orion.png` (~1,96 MB), `about-dani-zico-hero-v2.png` (~1,92 MB) e `og-formula-final.png` (~1,76 MB). Eles não foram requisitados nas navegações medidas. Não foram alterados apenas por serem grandes.

## 6. Carregamento e prioridades

- Terceirização: apenas a imagem inicial, Ideia, recebe `fetchPriority="high"` e `loading="eager"`. Fórmula e Produto mantêm `loading="lazy"` e passam a prioridade baixa. Por estarem perto da viewport no carrossel, o navegador ainda busca as três versões pequenas na abertura; não se afirma que lazy loading impede esse comportamento.
- A fotografia abaixo da timeline já era lazy e continua assim, agora com resoluções responsivas. O teste confirmou ausência de requisição na abertura e carregamento ao se aproximar dessa seção.
- Home: apenas a primeira foto é montada inicialmente e recebe prioridade alta. Após seu carregamento, uma próxima foto é solicitada com prioridade baixa. A seguinte só é liberada conforme a rotação avança. Não se aplicou lazy indiscriminadamente às fotos do crossfade.
- Os quatro estados, o intervalo de 5 segundos e a transição de opacidade de 900 ms foram preservados. Uma foto ainda não carregada não vira a imagem ativa; erros na próxima foto não bloqueiam a fila.
- Movimento reduzido mantém apenas a primeira foto da Home. A retomada da preferência de movimento volta a carregar a próxima foto.
- O srcset fica diretamente no img das fotos inseridas dinamicamente, evitando uma requisição ao fallback antes de o navegador selecionar a resolução responsiva.
- Width/height, aspect-ratio e containers dimensionados reservam o espaço. Nenhuma dependência de produção foi adicionada.

## 7. Medições e validação

Build de produção servido localmente em `http://127.0.0.1:4173`. Chrome 152.0.7977.76, viewport 1366×768, DPR 1 / zoom padrão 100%, cache frio, cookies necessários, latência 150 ms, download 200.000 bytes/s (~1,6 Mbps), CPU 4× mais lenta. Três navegações por rota antes e depois. Observação até 15 segundos após o evento load.

CDP foi usado para emulação de rede/CPU; PerformanceObserver e Resource Timing para LCP, CLS, peso e requisições. Lighthouse não estava instalado e não foi adicionado como dependência. Estes são resultados de laboratório local, não métricas de produção/CrUX.

| Sinal | Antes | Depois |
| --- | ---: | ---: |
| Terceirização — LCP mediano | 3,048 s (3,032–3,080) | 2,528 s (2,460–2,648) |
| Terceirização — recursos transferidos | 521.257 bytes | 371.248 bytes (−28,8%) |
| Terceirização — requisições de recursos | 9 | 9 |
| Home — LCP mediano | 5,820 s (5,636–5,920) | 3,120 s (3,084–3,164) |
| Home — recursos transferidos | 1.019.163 bytes | 496.190 bytes (−51,3%) |
| Home — requisições de recursos | 10 | 10 |
| CLS de carregamento, ambas as rotas | 0,000054 | 0,000054 |

Os totais de Resource Timing incluem os recursos concluídos, sem o documento HTML principal. Na Home, incluem as quatro fotos ao longo da janela de observação, embora elas agora sejam solicitadas gradualmente. Duas requisições de favicon aparecem antes e depois com cache desabilitado; a configuração de favicon não foi alterada.

Validação de layout: **48 estados, sem colisões**, cobrindo as três etapas em 1280×720, 1280×800, 1366×768, 1440×900, 1536×864, 1920×1080, 1366×600, 900×700, 901×700, 820×700, 821×700, 560×700, 561×700, 768×1024, 390×844 e 360×640. Verificados os cliques reais nos controles, ausência de overflow horizontal e scroll natural após Produto. Teste adicional em DPR 2 com movimento reduzido confirmou a seta estática.

Também passaram: TypeScript, build Vite/finalização, ESLint e **42 testes**, incluindo carregamento gradual, preservação da foto ativa enquanto a próxima carrega e recuperação de falha. Um teste de navegador percorreu as quatro fotos, confirmou que estavam carregadas ao ficarem ativas e não encontrou erros de JavaScript.

Evidências locais:

- `outputs/before/layout.json` e `outputs/verified/layout.json`.
- `outputs/before/performance.json` e `outputs/final/performance.json`.
- `outputs/verified/1366x768.png`, demais capturas por resolução e `1366x768-dpr2-reduced.png`.
- `outputs/verified/image-smoke.json` e `outputs/scope-quality-comparison.png`.

## 8. Arquivos alterados/adicionados

- `src/components/OutsourcingHero.tsx`: escala por etapa, imagens responsivas, prioridade e indicador.
- `src/styles/globals.css`: fluxo e dimensões da hero, espaçamento e microanimação.
- `src/pages/Outsourcing.tsx`: fotografia responsiva abaixo da timeline.
- `src/components/CampaignHero.tsx`: carregamento progressivo e seleção de resolução das fotos.
- `public/media/hero-perfume-lab-720.webp` e `hero-perfume-lab-1200.webp`: novas derivadas.
- `tests/orion.test.tsx`: expectativa atualizada para altura mínima.
- `tests/campaign-images.test.tsx`: dois testes de comportamento da fila de imagens.
- `scripts/build-outsourcing-images.mjs`: geração reproduzível das duas derivadas com Sharp já instalado.
- `scripts/verify-outsourcing-layout.mjs`: teste de navegador e capturas; aceita `QA_URL` e o caminho de Playwright em `PLAYWRIGHT_MODULE`.
- `scripts/measure-image-performance.mjs`: medições repetíveis contra o preview local na porta 4173; aceita `PLAYWRIGHT_MODULE`.
- Este relatório. Arquivos em `outputs/` são evidências locais e já pertencem a um diretório ignorado pelo Git.
