/* eslint-disable @next/next/no-img-element -- The official white logo is a local, pre-sized asset. */
import { brands } from "../data/site";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div>
          <Link className="footer-logo" href="/#inicio" aria-label="Orion — voltar ao início">
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
            <Link href="/sobre">Sobre</Link>
            <Link href="/portfolio">Portfólio</Link>
            <Link href="/terceirizacao">Terceirização</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/#contato">Contato</Link>
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
