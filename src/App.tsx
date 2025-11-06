import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Professionnels from "./pages/Professionnels";
import Particuliers from "./pages/Particuliers";
import Aides from "./pages/Aides";
import Blog from "./pages/Blog";
import QuiSommesNous from "./pages/QuiSommesNous";
import Simulation from "./pages/Simulation";
import NotFound from "./pages/NotFound";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";

// Pages Pro
import LEDUnifie from "./pages/pro/LEDUnifie";
import LEDEntrepot from "./pages/pro/LEDEntrepot";
import LEDBureau from "./pages/pro/LEDBureau";
import LEDSolaire from "./pages/pro/LEDSolaire";
import IsolationPro from "./pages/pro/Isolation";
import PACPro from "./pages/pro/PAC";
import BrasseurAirPro from "./pages/pro/BrasseurAir";

// Pages Particuliers
import IsolationParticulier from "./pages/particulier/Isolation";
import PACParticulier from "./pages/particulier/PAC";
import BrasseurAirParticulier from "./pages/particulier/BrasseurAir";
import HPFlottante from "./pages/pro/HPFlottante";

// Pages Blog
import AidesCEE2025 from "./pages/blog/AidesCEE2025";
import IsolationBatimentTertiaire from "./pages/blog/IsolationBatimentTertiaire";
import PACIndustrielle from "./pages/blog/PACIndustrielle";
import MaPrimeRenov from "./pages/MaPrimeRenov";

// Pages Admin
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { BackToHome } from "./components/BackToHome";
import { ScrollToTop } from "./components/ScrollToTop";
import { CookieBanner } from "./components/CookieBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/professionnels" element={<Professionnels />} />
          <Route path="/particuliers" element={<Particuliers />} />
          <Route path="/aides" element={<Aides />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/mentions-legales" element={<LegalNotice />} />
          <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
          <Route path="/gestion-cookies" element={<CookiePolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/merci" element={<ThankYou />} />
          
          {/* Routes Professionnels - Nouveau formulaire unifié */}
          <Route path="/pro/led" element={<LEDUnifie />} />
          
          {/* Anciennes routes LED (garder pour compatibilité) */}
          <Route path="/pro/led-entrepot" element={<LEDEntrepot />} />
          <Route path="/pro/led-bureau" element={<LEDBureau />} />
          <Route path="/pro/led-solaire" element={<LEDSolaire />} />
          <Route path="/pro/isolation" element={<IsolationPro />} />
          <Route path="/pro/pac" element={<PACPro />} />
          <Route path="/pro/brasseur-air" element={<BrasseurAirPro />} />
          <Route path="/pro/hp-flottante" element={<HPFlottante />} />
          
          {/* Routes Particuliers - Anciennes (redirection vers le formulaire unifié) */}
          <Route path="/particulier/isolation" element={<IsolationParticulier />} />
          <Route path="/particulier/pac" element={<PACParticulier />} />
          <Route path="/particulier/brasseur-air" element={<BrasseurAirParticulier />} />
          
          {/* Routes Blog */}
          <Route path="/blog/aides-cee-2025" element={<AidesCEE2025 />} />
          <Route path="/blog/isolation-batiment-tertiaire" element={<IsolationBatimentTertiaire />} />
          <Route path="/blog/pac-industrielle" element={<PACIndustrielle />} />
          
          {/* Ma Prime Rénov */}
          <Route path="/ma-prime-renov" element={<MaPrimeRenov />} />
          
          {/* Routes Admin */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <BackToHome />
        <ScrollToTop />
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
