import { OrionButton } from "./OrionButton";
import { useCookieConsent } from "./CookieConsentContext";
import { Reveal } from "./Reveal";
import { orionCompany, orionMapDirectionsUrl, orionMapEmbedUrl } from "../data/site";

/** Closes the Home with the registered address and a map. The form itself lives on /contato. */
export function LocationSection() {
  const { isAllowed, openPreferences } = useCookieConsent();
  // The Google frame is a third party: it only loads once the visitor allows it.
  const mapAllowed = isAllowed("functional");

  return (
    <section className="location" id="onde-estamos" aria-labelledby="location-title">
      <div className="container location-layout">
        <Reveal className="location-copy">
          <p className="eyebrow">Onde estamos</p>
          <h2 id="location-title">A estrutura da Orion fica em Vargem Grande Paulista.</h2>

          <address className="location-address">
            <strong>{orionCompany.legalName}</strong>
            <span>{orionCompany.street}</span>
            <span>{orionCompany.district}</span>
            <span>{orionCompany.city} — {orionCompany.state}</span>
            <span>CEP {orionCompany.postalCode}</span>
          </address>

          <ul className="location-channels">
            <li>
              <span>E-mail</span>
              <a href={`mailto:${orionCompany.email}`}>{orionCompany.email}</a>
            </li>
            <li>
              <span>Telefone</span>
              <a href={orionCompany.phoneHref}>{orionCompany.phone}</a>
            </li>
          </ul>

          <div className="location-actions">
            <OrionButton href="/contato">Fale com a Orion</OrionButton>
            <OrionButton href={orionMapDirectionsUrl} variant="secondary" target="_blank" rel="noopener noreferrer">
              Como chegar
            </OrionButton>
          </div>
        </Reveal>

        <Reveal as="figure" className="location-map" delay={70}>
          {mapAllowed ? (
            <iframe
              src={orionMapEmbedUrl}
              title={`Mapa com a localização da Orion em ${orionCompany.city}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="location-map-placeholder">
              <strong>Mapa externo</strong>
              <p>
                O mapa é fornecido pelo Google. Ao carregá-lo, o Google pode receber seu
                endereço IP e gravar cookies próprios.
              </p>
              <button className="cookie-button cookie-button--primary" onClick={openPreferences} type="button">
                Carregar mapa
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
