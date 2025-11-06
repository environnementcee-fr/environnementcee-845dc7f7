import { ParticulierMultiForm } from "@/components/forms/ParticulierMultiForm";
import { StickyCTA } from "@/components/StickyCTA";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Particuliers = () => {
  return (
    <div className="min-h-screen">
      <title>Aides pour Particuliers - EnvironnementCEE.fr</title>

      <StickyCTA targetId="eligibility-form" estimatedTime="3 min" />

      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-foreground">Rénovez votre logement et économisez avec les aides publiques</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Isolation, pompe à chaleur, panneaux solaires... Profitez des aides CEE et MaPrimeRénov' pour financer vos travaux.
            </p>
            <Button 
              size="lg" 
              className="shadow-lg"
              onClick={() => document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Tester mon éligibilité gratuitement
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Formulaire Unique */}
      <section id="eligibility-form" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Testez votre éligibilité aux aides</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complétez ce formulaire en quelques minutes pour découvrir les aides disponibles pour votre projet
            </p>
          </div>
          <ParticulierMultiForm />
        </div>
      </section>

      {/* CTA Intermédiaire */}
      <section className="py-16 gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-primary-foreground">Des questions sur votre projet ?</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Nos conseillers vous accompagnent gratuitement pour maximiser vos aides et concrétiser votre projet.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="shadow-lg"
              onClick={() => document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Démarrer ma simulation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Particuliers;
