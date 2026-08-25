import { OrionButton } from "./OrionButton";

export function PageCta({ title, text = "Conte à Orion o que sua marca precisa construir." }: { title: string; text?: string }) {
  return (
    <section className="page-cta" aria-label="Contato com a Orion">
      <div className="container page-cta-layout">
        <div>
          <p className="eyebrow">Próximo projeto</p>
          <h2>{title}</h2>
        </div>
        <div>
          <p>{text}</p>
          <OrionButton href="mailto:administrativo@orionpet.com.br" variant="light">Falar com a Orion</OrionButton>
        </div>
      </div>
    </section>
  );
}
