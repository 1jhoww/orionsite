import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { legalPoliciesUpdatedAt, orionLegalIdentity } from "../data/legal";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Seo
        title="Política de Privacidade | Orion"
        description="Como a Orion trata os dados pessoais informados no site institucional, para quais finalidades e como exercer os direitos previstos na LGPD."
        path="/politica-de-privacidade"
      />
      <main id="conteudo" className="internal-page legal-page">
        <article className="container legal-article">
          <header className="legal-header">
            <p className="eyebrow">Documento legal</p>
            <h1>Política de Privacidade</h1>
            <p className="legal-updated">Última atualização: {legalPoliciesUpdatedAt}</p>
          </header>

          <section aria-labelledby="privacy-controller">
            <h2 id="privacy-controller">1. Quem é o controlador dos dados</h2>
            <p>
              Esta política se aplica ao site institucional da <strong>{orionLegalIdentity.legalName}</strong>,
              inscrita no CNPJ {orionLegalIdentity.cnpj} e na Inscrição Estadual {orionLegalIdentity.stateRegistration},
              com sede em {orionLegalIdentity.address}.
            </p>
            <p>
              A Orion é a controladora dos dados pessoais tratados por meio deste site, nos
              termos da Lei nº 13.709/2018 (Lei Geral de Proteção de Dados — LGPD).
            </p>
          </section>

          <section aria-labelledby="privacy-scope">
            <h2 id="privacy-scope">2. Objetivo desta política</h2>
            <p>
              Explicar, de forma direta, quais dados este site pode tratar, com que finalidade e
              quais são os seus direitos como titular. Ela cobre apenas este site institucional.
              Relações comerciais firmadas fora dele podem envolver outros tratamentos, informados
              no momento adequado.
            </p>
          </section>

          <section aria-labelledby="privacy-data">
            <h2 id="privacy-data">3. Dados que podem ser tratados</h2>
            <h3>3.1. Dados que você fornece voluntariamente</h3>
            <p>
              O formulário da página de contato solicita: <strong>nome</strong> e{" "}
              <strong>e-mail</strong> (obrigatórios), <strong>empresa</strong>,{" "}
              <strong>telefone/WhatsApp</strong>, <strong>assunto</strong> e{" "}
              <strong>mensagem</strong>. Você decide o que preencher nos campos opcionais.
            </p>
            <p>
              Ao acionar os canais diretos — WhatsApp, e-mail ou telefone —, os dados que você
              enviar por esses meios também são tratados pela Orion para responder ao contato.
            </p>
            <h3>3.2. Dados técnicos</h3>
            <p>
              Este site <strong>não utiliza ferramentas de análise de audiência, tags de
              marketing ou pixels de rastreamento</strong>. Não há Google Analytics, Google Tag
              Manager, Meta Pixel ou serviço equivalente instalado.
            </p>
            <p>
              Como acontece em qualquer site, o servidor que hospeda estas páginas pode registrar
              dados técnicos de acesso para operação e segurança da infraestrutura. Esses
              registros são gerados pelo provedor de hospedagem, não por ferramentas de
              rastreamento adicionadas pela Orion.
            </p>
          </section>

          <section aria-labelledby="privacy-purpose">
            <h2 id="privacy-purpose">4. Para que os dados são usados</h2>
            <ul>
              <li>Responder a solicitações comerciais e dúvidas enviadas pelo site;</li>
              <li>Conduzir o diálogo sobre desenvolvimento, terceirização e produção de produtos;</li>
              <li>Manter o funcionamento técnico e a segurança do site.</li>
            </ul>
            <p>
              Os dados não são usados para publicidade comportamental, não são vendidos e não
              alimentam perfis de marketing.
            </p>
          </section>

          <section aria-labelledby="privacy-whatsapp">
            <h2 id="privacy-whatsapp">5. Como o formulário funciona</h2>
            <p>
              Este site é estático e <strong>não possui banco de dados próprio</strong>. Ao enviar
              o formulário, os dados preenchidos <strong>não são gravados em um servidor da
              Orion</strong>: eles são organizados em uma mensagem e o seu navegador abre uma
              conversa no WhatsApp com esse texto já preenchido.
            </p>
            <p>
              <strong>O envio só acontece quando você decide enviar a mensagem dentro do
              WhatsApp.</strong> A partir desse momento, o tratamento dos dados também se sujeita
              às políticas do WhatsApp, operado pela Meta.
            </p>
          </section>

          <section aria-labelledby="privacy-sharing">
            <h2 id="privacy-sharing">6. Compartilhamento com terceiros</h2>
            <p>A Orion não comercializa dados pessoais. Terceiros efetivamente envolvidos neste site:</p>
            <ul>
              <li>
                <strong>Provedor de hospedagem</strong> — mantém o site disponível e pode registrar
                dados técnicos de acesso;
              </li>
              <li>
                <strong>WhatsApp (Meta)</strong> — recebe a mensagem quando você opta por enviá-la
                por esse canal;
              </li>
              <li>
                <strong>Google Maps</strong> — fornece o mapa da página inicial, carregado apenas
                mediante a sua autorização. Detalhes na{" "}
                <Link to="/politica-de-cookies">Política de Cookies</Link>.
              </li>
            </ul>
          </section>

          <section aria-labelledby="privacy-cookies">
            <h2 id="privacy-cookies">7. Cookies e tecnologias semelhantes</h2>
            <p>
              O site usa apenas armazenamento local necessário ao seu funcionamento e à memória da
              sua escolha sobre conteúdo externo. A descrição completa está na{" "}
              <Link to="/politica-de-cookies">Política de Cookies</Link>.
            </p>
          </section>

          <section aria-labelledby="privacy-retention">
            <h2 id="privacy-retention">8. Retenção</h2>
            <p>
              As mensagens recebidas são mantidas pelo tempo necessário ao atendimento da
              solicitação e ao cumprimento de obrigações legais aplicáveis. Como o site não grava
              formulários em base própria, a retenção ocorre nos canais de comunicação da empresa.
            </p>
          </section>

          <section aria-labelledby="privacy-security">
            <h2 id="privacy-security">9. Segurança</h2>
            <p>
              O site é servido por conexão criptografada (HTTPS). A Orion adota medidas técnicas e
              administrativas razoáveis para proteger as informações recebidas. Nenhum meio de
              transmissão pela internet é totalmente infalível, e por isso a empresa recomenda não
              enviar dados sensíveis por formulários ou mensagens.
            </p>
          </section>

          <section aria-labelledby="privacy-rights">
            <h2 id="privacy-rights">10. Seus direitos como titular</h2>
            <p>A LGPD garante a você, entre outros, o direito de:</p>
            <ul>
              <li>confirmar a existência de tratamento;</li>
              <li>acessar os dados;</li>
              <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
              <li>solicitar anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
              <li>solicitar a portabilidade, nos termos da regulamentação;</li>
              <li>solicitar a eliminação dos dados tratados com base no consentimento;</li>
              <li>obter informação sobre compartilhamento;</li>
              <li>revogar o consentimento.</li>
            </ul>
          </section>

          <section aria-labelledby="privacy-exercise">
            <h2 id="privacy-exercise">11. Como exercer seus direitos</h2>
            <p>
              Envie a solicitação para <a href={`mailto:${orionLegalIdentity.email}`}>{orionLegalIdentity.email}</a>{" "}
              ou pelo telefone <a href="tel:+5511962320441">{orionLegalIdentity.phone}</a>, identificando-se
              e descrevendo o pedido. A Orion responderá nos prazos previstos na legislação.
            </p>
          </section>

          <section aria-labelledby="privacy-links">
            <h2 id="privacy-links">12. Links para sites externos</h2>
            <p>
              Este site contém links para serviços de terceiros, como WhatsApp e Google Maps. A
              Orion não controla essas plataformas e não responde pelas práticas de privacidade
              delas. Recomendamos a leitura das políticas de cada serviço.
            </p>
          </section>

          <section aria-labelledby="privacy-changes">
            <h2 id="privacy-changes">13. Alterações desta política</h2>
            <p>
              Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A
              data da última revisão fica sempre indicada no topo desta página.
            </p>
          </section>

          <section aria-labelledby="privacy-contact">
            <h2 id="privacy-contact">14. Contato</h2>
            <p>
              {orionLegalIdentity.legalName}<br />
              {orionLegalIdentity.address}<br />
              CNPJ {orionLegalIdentity.cnpj}<br />
              <a href={`mailto:${orionLegalIdentity.email}`}>{orionLegalIdentity.email}</a> ·{" "}
              <a href="tel:+5511962320441">{orionLegalIdentity.phone}</a>
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
