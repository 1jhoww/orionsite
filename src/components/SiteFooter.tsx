import { brands } from "../data/site";
import { Link } from "react-router-dom";

export function SiteFooter() {
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
            <Link to="/#contato">Contato</Link>
          </nav>
        </div>
      </div>
      <div className="footer-base">
        <div className="container">
          <span>© Orion {new Date().getFullYear()}. Todos os direitos reservados.</span>
          <span>Indústria de soluções para o mercado pet</span>
        </div>
      </div>
    </footer>
  );
}
