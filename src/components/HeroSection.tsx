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
          <h1 className="mb-6 text-foreground">
            Remplacez vos luminaires par des LED conformes CEE
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
            Vérifiez votre éligibilité en 2 minutes et réduisez votre consommation d'éclairage jusqu'à 80 %*
          </p>

          <Button 
            onClick={onCTAClick}
            size="lg"
            className="gradient-primary text-primary-foreground hover:opacity-90 transition-smooth shadow-elegant text-lg px-8 py-6 h-auto"
          >
            Tester mon éligibilité
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="text-sm text-muted-foreground mt-6">
            * Comparé aux systèmes d'éclairage traditionnels
          </p>
        </div>
      </div>
    </section>
  );
};
