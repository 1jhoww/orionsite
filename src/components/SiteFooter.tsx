import { brands } from "../data/site";
import { Link } from "react-router-dom";
import { useCookieConsent } from "./CookieConsentContext";

export function SiteFooter() {
  const { openPreferences } = useCookieConsent();

  return (
    <footer className="footer">
      <div className="container footer-main">
        <div>
          <Link className="footer-logo" to="/#inicio" aria-label="Orion — voltar ao início">
            <img
              src="/brand/orion-logo-white.png"
              width="1066"
              height="295"
              alt="Orion — Indústria e Comércio de Cosméticos Ltda."
              loading="lazy"
              decoding="async"
            />
          </Link>
          <p>Desenvolvimento e fabricação de soluções para o mercado pet.</p>
        </div>
        <div className="footer-brands">
          <span>Marcas produzidas</span>
          <ul>{brands.map((brand) => <li key={brand.name}>{brand.name}</li>)}</ul>
        </div>
        <div>
          <span className="footer-nav-title">Navegação</span>
          <nav aria-label="Navegação do rodapé">
            <Link to="/sobre">Sobre</Link>
            <Link to="/portfolio">Portfólio</Link>
            <Link to="/terceirizacao">Terceirização</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contato">Contato</Link>
          </nav>
        </div>
      </div>
      <div className="footer-legal">
        <div className="container footer-legal-inner">
          <nav aria-label="Políticas e preferências">
            <Link to="/politica-de-privacidade">Política de Privacidade</Link>
            <Link to="/politica-de-cookies">Política de Cookies</Link>
            <button onClick={openPreferences} type="button">Preferências de cookies</button>
          </nav>
        </div>
      </div>

      <div className="footer-base">
        <div className="container">
          <span>© Orion {new Date().getFullYear()}. Todos os direitos reservados.</span>
          <span className="footer-credit" aria-label="Créditos de desenvolvimento">
            <span className="footer-credit-label">Desenvolvido por</span>
            <a
              className="footer-credit-logo"
              href="https://www.heptastudios.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Site oficial da Hepta Studios"
            >
              <img
                src="/brand/hepta-studios.webp"
                alt=""
                width="400"
                height="267"
                loading="lazy"
                decoding="async"
              />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
