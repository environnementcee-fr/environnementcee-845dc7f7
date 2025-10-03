import { useRef } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { EligibilitySection } from "@/components/EligibilitySection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { EligibilityForm } from "@/components/EligibilityForm";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags */}
      <title>Éclairage LED CEE - Prime pour Entreprises | EnvironnementCEE.fr</title>
      
      <Header />
      <HeroSection onCTAClick={scrollToForm} />
      
      <section id="comment-ca-marche">
        <HowItWorksSection />
      </section>
      
      <section id="eligibilite">
        <EligibilitySection />
      </section>
      
      <section id="benefices">
        <BenefitsSection />
      </section>
      
      <section id="simulation" className="py-20 bg-card" ref={formRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="mb-4 text-foreground">Testez votre éligibilité</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complétez ce formulaire en 2 minutes pour savoir si vous êtes éligible aux aides CEE
            </p>
          </div>
          <EligibilityForm />
        </div>
      </section>
      
      <section id="faq">
        <FAQSection />
      </section>
      
      <Footer />
      
      <CookieBanner />
    </div>
  );
};

export default Index;
