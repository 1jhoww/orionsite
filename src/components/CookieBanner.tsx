import { Link } from "react-router-dom";
import { useCookieConsent } from "./CookieConsentContext";

export function CookieBanner() {
  const { acceptAll, rejectNonNecessary, openPreferences } = useCookieConsent();

  return (
    <section className="cookie-banner" aria-labelledby="cookie-banner-title" aria-live="polite">
      <div className="cookie-banner-copy">
        <strong id="cookie-banner-title">Sua privacidade, sua escolha.</strong>
        <p>
          Usamos apenas armazenamento necessário para o funcionamento do site e para lembrar
          esta decisão. O mapa do Google só é carregado se você autorizar.{" "}
          <Link to="/politica-de-cookies">Política de Cookies</Link>
        </p>
      </div>
      {/* Accept and reject carry the same weight: no dark pattern. */}
      <div className="cookie-banner-actions">
        <button className="cookie-button" onClick={rejectNonNecessary} type="button">
          Rejeitar não essenciais
        </button>
        <button className="cookie-button" onClick={openPreferences} type="button">
          Preferências
        </button>
        <button className="cookie-button cookie-button--primary" onClick={acceptAll} type="button">
          Aceitar todos
        </button>
      </div>
    </section>
  );
}
