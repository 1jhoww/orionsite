import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCookieConsent } from "./CookieConsentContext";

export function CookiePreferencesModal() {
  const { preferences, acceptAll, rejectNonNecessary, savePreferences, closePreferences } = useCookieConsent();
  const [functional, setFunctional] = useState(preferences.functional);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstFieldRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePreferences();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button, input, a[href]");
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closePreferences]);

  return (
    <div className="cookie-modal-backdrop">
      {/* A real button, so clicking outside is dismissable without a handler on a div.
          Hidden from AT and from tab order: the visible close button covers that path. */}
      <button
        className="cookie-modal-scrim"
        onClick={closePreferences}
        type="button"
        tabIndex={-1}
        aria-hidden="true"
      />
      <div
        className="cookie-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-modal-title"
      >
        <h2 id="cookie-modal-title">Preferências de cookies</h2>
        <p className="cookie-modal-intro">
          Este site não utiliza analytics, pixels ou ferramentas de marketing. Estas são as
          únicas categorias em uso. <Link to="/politica-de-cookies">Política de Cookies</Link>
        </p>

        <div className="cookie-category">
          <div className="cookie-category-head">
            <label htmlFor="cookie-necessary">Estritamente necessários</label>
            <input id="cookie-necessary" type="checkbox" checked disabled readOnly ref={firstFieldRef} />
          </div>
          <p>
            Mantêm a navegação funcionando e guardam esta escolha no seu navegador.
            Sempre ativos, sem eles o site não opera corretamente.
          </p>
        </div>

        <div className="cookie-category">
          <div className="cookie-category-head">
            <label htmlFor="cookie-functional">Conteúdo externo (mapa)</label>
            <input
              id="cookie-functional"
              type="checkbox"
              checked={functional}
              onChange={(event) => setFunctional(event.target.checked)}
            />
          </div>
          <p>
            Autoriza o carregamento do mapa do Google na página inicial. Ao carregar, o
            Google pode receber seu endereço IP e gravar cookies próprios.
          </p>
        </div>

        <div className="cookie-modal-actions">
          <button className="cookie-button" onClick={rejectNonNecessary} type="button">
            Rejeitar não essenciais
          </button>
          <button className="cookie-button" onClick={acceptAll} type="button">
            Aceitar todos
          </button>
          <button
            className="cookie-button cookie-button--primary"
            onClick={() => savePreferences({ functional })}
            type="button"
          >
            Salvar preferências
          </button>
        </div>

        <button className="cookie-modal-close" onClick={closePreferences} type="button" aria-label="Fechar preferências de cookies">
          ×
        </button>
      </div>
    </div>
  );
}
