import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-led-office.jpg";

interface HeroSectionProps {
  onCTAClick: () => void;
}

export const HeroSection = ({ onCTAClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src={heroImage} 
          alt="Bureau moderne équipé de LED" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Badge de spécialisation */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full mb-6 border border-primary/20">
            <span className="font-semibold">🏆 Site spécialisé Aides CEE - Actualités en temps réel</span>
          </div>

          <h1 className="mb-6 text-foreground">
            Remplacez vos luminaires par des LED jusqu'à 100% financé sous conditions*
          </h1>
          
          <p className="text-xl md:text-2xl mb-6 text-muted-foreground max-w-3xl mx-auto">
            Vérifiez votre éligibilité en 2 minutes et bénéficiez d'une aide gratuite comprenant :
          </p>

          {/* Points clés de l'aide gratuite */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
              <div className="text-3xl mb-2">💡</div>
              <p className="font-semibold text-foreground">Lampes LED</p>
              <p className="text-sm text-muted-foreground">100% gratuites</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
              <div className="text-3xl mb-2">🚚</div>
              <p className="font-semibold text-foreground">Livraison</p>
              <p className="text-sm text-muted-foreground">Offerte</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
              <div className="text-3xl mb-2">🔧</div>
              <p className="font-semibold text-foreground">Installation</p>
              <p className="text-sm text-muted-foreground">Comprise</p>
            </div>
          </div>

          <Button 
            onClick={onCTAClick}
            size="lg"
            className="gradient-primary text-primary-foreground hover:opacity-90 transition-smooth shadow-elegant text-lg px-8 py-6 h-auto"
          >
            Tester mon éligibilité gratuitement
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="text-sm text-muted-foreground mt-6">
            * Le financement jusqu'à 100% est soumis à conditions : éligibilité selon la fiche CEE BAT-EQ-127, montant forfaitaire déterminé par les obligés CEE, respect des critères techniques et administratifs. L'aide provient du dispositif des Certificats d'Économies d'Énergie.
          </p>
        </div>
      </div>
    </section>
  );
};
