import { Route, Routes } from "react-router-dom";
import { SiteLayout } from "./layouts/SiteLayout";
import AboutPage from "./pages/About";
import AtualPetPage from "./pages/AtualPetPortfolio";
import DezPetPage from "./pages/DezPetPortfolio";
import FaqPage from "./pages/Faq";
import Home from "./pages/Home";
import MaisDogPage from "./pages/MaisDogPortfolio";
import NotFoundPage from "./pages/NotFound";
import OutsourcingPage from "./pages/Outsourcing";
import PortfolioPage from "./pages/Portfolio";
import QualityPetPage from "./pages/QualityPetPortfolio";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="sobre" element={<AboutPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="portfolio/atual-pet" element={<AtualPetPage />} />
        <Route path="portfolio/quality-pet" element={<QualityPetPage />} />
        <Route path="portfolio/mais-dog" element={<MaisDogPage />} />
        <Route path="portfolio/dez-pet" element={<DezPetPage />} />
        <Route path="terceirizacao" element={<OutsourcingPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
