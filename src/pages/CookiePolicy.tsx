import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { useCookieConsent } from "../components/CookieConsentContext";
import { CONSENT_STORAGE_KEY, legalPoliciesUpdatedAt, orionLegalIdentity } from "../data/legal";

export default function CookiePolicyPage() {
  const { openPreferences } = useCookieConsent();

  return (
    <>
      <Seo
        title="Política de Cookies | Orion"
        description="Quais cookies e tecnologias de armazenamento o site da Orion utiliza, para que servem e como alterar ou revogar a sua escolha."
        path="/politica-de-cookies"
      />
      <main id="conteudo" className="internal-page legal-page">
        <article className="container legal-article">
          <header className="legal-header">
            <p className="eyebrow">Documento legal</p>
            <h1>Política de Cookies</h1>
            <p className="legal-updated">Última atualização: {legalPoliciesUpdatedAt}</p>
          </header>

          <section aria-labelledby="cookies-what">
            <h2 id="cookies-what">1. O que são cookies</h2>
            <p>
              Cookies são pequenos arquivos gravados no seu dispositivo quando você visita um
              site. Tecnologias semelhantes, como <em>localStorage</em> e <em>sessionStorage</em>,
              cumprem função parecida: guardam informações no próprio navegador.
            </p>
          </section>

          <section aria-labelledby="cookies-usage">
            <h2 id="cookies-usage">2. O que este site realmente usa</h2>
            <p>
              Sendo direto: este site <strong>não instala cookies de análise, de publicidade ou de
              rastreamento</strong>. Não há Google Analytics, Google Tag Manager, Meta Pixel ou
              ferramenta equivalente. O que existe é armazenamento local necessário ao
              funcionamento, mais um conteúdo externo que só carrega com a sua autorização.
            </p>
          </section>

          <section aria-labelledby="cookies-necessary">
            <h2 id="cookies-necessary">3. Estritamente necessários</h2>
            <p>Sempre ativos, porque sem eles o site não funciona corretamente.</p>
            <div className="legal-table" role="table" aria-label="Armazenamento estritamente necessário">
              <div role="row">
                <span role="columnheader">Nome</span>
                <span role="columnheader">Tipo</span>
                <span role="columnheader">Função</span>
              </div>
              <div role="row">
                <span role="cell"><code>{CONSENT_STORAGE_KEY}</code></span>
                <span role="cell">localStorage</span>
                <span role="cell">Guarda a sua decisão sobre cookies, para não perguntar de novo a cada visita.</span>
              </div>
              <div role="row">
                <span role="cell"><code>orion:scroll-positions</code></span>
                <span role="cell">sessionStorage</span>
                <span role="cell">Restaura a posição da página ao navegar para trás. Apagado ao fechar a aba.</span>
              </div>
            </div>
            <p>
              Nenhum dos dois identifica você pessoalmente, e ambos permanecem no seu navegador —
              não são enviados para a Orion.
            </p>
          </section>

          <section aria-labelledby="cookies-functional">
            <h2 id="cookies-functional">4. Conteúdo externo — mapa (opcional)</h2>
            <p>
              A página inicial exibe a localização da fábrica em um mapa fornecido pelo{" "}
              <strong>Google Maps</strong>. Por ser conteúdo de terceiro, o Google pode receber o
              seu endereço IP e gravar cookies próprios quando o mapa é carregado.
            </p>
            <p>
              Por isso, <strong>o mapa não é carregado automaticamente</strong>. Enquanto você não
              autorizar, a página mostra apenas um aviso com um botão para carregá-lo. A sua
              escolha vale para as próximas visitas e pode ser alterada a qualquer momento.
            </p>
            <p>
              O botão &ldquo;Como chegar&rdquo; é um link comum: nada é carregado até que você
              clique e abra o Google Maps em outra aba.
            </p>
          </section>

          <section aria-labelledby="cookies-absent">
            <h2 id="cookies-absent">5. Categorias que este site não utiliza</h2>
            <p>
              Não oferecemos opções de <strong>analytics</strong> nem de <strong>marketing</strong>{" "}
              porque nenhuma dessas tecnologias está instalada. Se isso mudar, esta política e o
              painel de preferências serão atualizados, e a sua escolha será solicitada novamente.
            </p>
          </section>

          <section aria-labelledby="cookies-manage">
            <h2 id="cookies-manage">6. Como alterar ou revogar sua escolha</h2>
            <p>
              Você pode rever sua decisão quando quiser, sem precisar limpar o navegador:
            </p>
            <p>
              <button className="cookie-button cookie-button--primary" onClick={openPreferences} type="button">
                Abrir preferências de cookies
              </button>
            </p>
            <p>
              O mesmo link está no rodapé de todas as páginas, como{" "}
              <strong>&ldquo;Preferências de cookies&rdquo;</strong>. Também é possível apagar o
              armazenamento pelas configurações do seu navegador — nesse caso, a escolha será
              perguntada novamente na próxima visita.
            </p>
          </section>

          <section aria-labelledby="cookies-more">
            <h2 id="cookies-more">7. Mais informações</h2>
            <p>
              O tratamento de dados pessoais está descrito na{" "}
              <Link to="/politica-de-privacidade">Política de Privacidade</Link>. Dúvidas podem ser
              enviadas para <a href={`mailto:${orionLegalIdentity.email}`}>{orionLegalIdentity.email}</a>.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
