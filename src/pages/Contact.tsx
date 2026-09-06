import { ContactForm } from "../components/ContactForm";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { orionCompany } from "../data/site";

const whatsappHref = "https://wa.me/5511962320441?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20equipe%20da%20Orion.";

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contato | Orion Cosméticos Pet"
        description="Entre em contato com a Orion para falar sobre desenvolvimento, terceirização e produção de cosméticos pet para a sua marca."
        path="/contato"
        ogDescription="Fale com a equipe da Orion sobre desenvolvimento, terceirização e produção de cosméticos pet."
      />
      <main id="conteudo" className="internal-page contact-page">
        <section className="contact contact-commercial" id="contato" aria-labelledby="contact-title">
          <div className="container contact-layout">
            <Reveal className="contact-intro">
              <p className="eyebrow">Contato</p>
              <h1 id="contact-title">Vamos conversar sobre o seu projeto.</h1>
              <p>
                Use o formulário para falar com a equipe da Orion sobre desenvolvimento,
                terceirização, produtos ou outras necessidades comerciais.
              </p>

              <div className="contact-channels" aria-label="Canais de contato">
                <div>
                  <span>Mensagem</span>
                  <a className="button button--whatsapp" href={whatsappHref} target="_blank" rel="noreferrer">
                    <WhatsAppIcon />
                    Conversar pelo WhatsApp
                  </a>
                </div>
                <div>
                  <span>E-mail</span>
                  <a href={`mailto:${orionCompany.email}`}>{orionCompany.email}</a>
                </div>
                <div>
                  <span>Telefone</span>
                  <a href={orionCompany.phoneHref}>{orionCompany.phone}</a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
