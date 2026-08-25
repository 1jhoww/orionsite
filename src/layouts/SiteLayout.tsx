import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { OrganizationJsonLd } from "../components/StructuredData";
import { ScrollToLocation } from "../components/ScrollToLocation";
import { SiteFooter } from "../components/SiteFooter";

export function SiteLayout() {
  return (
    <>
      <ScrollToLocation />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <Outlet />
      <SiteFooter />
      <OrganizationJsonLd />
    </>
  );
}
