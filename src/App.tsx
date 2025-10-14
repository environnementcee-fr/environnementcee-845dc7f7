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
