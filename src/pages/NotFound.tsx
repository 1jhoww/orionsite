import { InternalHero } from "../components/InternalHero";
import { PageCta } from "../components/PageCta";
import { Seo } from "../components/Seo";

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Página não encontrada | Orion"
        description="A página solicitada não foi encontrada no site institucional da Orion."
        path={window.location.pathname}
        noIndex
      />
      <main id="conteudo" className="internal-page">
        <InternalHero
          compact
          eyebrow="Erro 404"
          title="Página não encontrada."
          description="O endereço informado não corresponde a uma página disponível no site da Orion."
        />
        <PageCta title="Vamos voltar ao início de uma conversa?" />
      </main>
    </>
  );
}
