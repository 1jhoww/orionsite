import { CookieConsentProvider } from "../components/CookieConsentProvider";
import { Header } from "../components/Header";
import { OrganizationJsonLd, WebSiteJsonLd } from "../components/StructuredData";
import { RouteView } from "../components/RouteView";
import { ScrollToLocation } from "../components/ScrollToLocation";
import { SiteFooter } from "../components/SiteFooter";

export function SiteLayout() {
  return (
    <CookieConsentProvider>
      <ScrollToLocation />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <RouteView />
      <SiteFooter />
      <OrganizationJsonLd />
      <WebSiteJsonLd />
    </CookieConsentProvider>
  );
}
