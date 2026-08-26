import { Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./layouts/SiteLayout";
import AboutPage from "./pages/About";
import FaqPage from "./pages/Faq";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import OutsourcingPage from "./pages/Outsourcing";
import PortfolioPage from "./pages/Portfolio";

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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
