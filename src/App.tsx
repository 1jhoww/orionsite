import { Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./layouts/SiteLayout";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import CookiePolicyPage from "./pages/CookiePolicy";
import FaqPage from "./pages/Faq";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import OutsourcingPage from "./pages/Outsourcing";
import PortfolioPage from "./pages/Portfolio";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="sobre" element={<AboutPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="portfolio/atual-pet" element={<Navigate to="/portfolio" replace />} />
        <Route path="portfolio/quality-pet" element={<Navigate to="/portfolio" replace />} />
        <Route path="portfolio/mais-dog" element={<Navigate to="/portfolio" replace />} />
        <Route path="portfolio/dez-pet" element={<Navigate to="/portfolio" replace />} />
        <Route path="terceirizacao" element={<OutsourcingPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contato" element={<ContactPage />} />
        <Route path="politica-de-privacidade" element={<PrivacyPolicyPage />} />
        <Route path="politica-de-cookies" element={<CookiePolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
