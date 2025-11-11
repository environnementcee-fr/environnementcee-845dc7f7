import { ParticulierMultiForm } from "@/components/forms/ParticulierMultiForm";
import { StickyCTA } from "@/components/StickyCTA";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Link } from "react-router-dom";

const Particuliers = () => {
  return (
    <div className="min-h-screen">
      <title>Aides pour Particuliers - EnvironnementCEE.fr</title>

      <StickyCTA targetId="solutions-section" estimatedTime="3 min" />

      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-foreground">Rénovez votre logement et économisez avec les aides publiques</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Isolation, pompe à chaleur, panneaux solaires... Profitez des aides CEE et MaPrimeRénov' pour financer vos travaux.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-8 text-left max-w-3xl mx-auto">
              <div className="bg-card/50 backdrop-blur p-4 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">1</div>
                <h3 className="font-semibold mb-1 text-foreground">Remplissez le formulaire</h3>
                <p className="text-sm text-muted-foreground">Décrivez votre projet en quelques étapes</p>
              </div>
              <div className="bg-card/50 backdrop-blur p-4 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">2</div>
                <h3 className="font-semibold mb-1 text-foreground">Découvrez vos aides</h3>
                <p className="text-sm text-muted-foreground">Estimation gratuite et personnalisée</p>
              </div>
              <div className="bg-card/50 backdrop-blur p-4 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">3</div>
                <h3 className="font-semibold mb-1 text-foreground">Accompagnement complet</h3>
                <p className="text-sm text-muted-foreground">Constitution du dossier et suivi</p>
              </div>
            </div>
            <Button 
              size="lg" 
              className="shadow-lg mt-8"
              onClick={() => document.getElementById('solutions-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Voir les aides disponibles
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Grille des catégories */}
      <section id="solutions-section" className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-4 text-foreground text-2xl md:text-3xl">Choisissez votre type de travaux</h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Sélectionnez le projet qui vous intéresse pour une estimation personnalisée
          </p>
          
          <CategoryGrid segment="part" onCardClick={() => {}} />

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Vous avez plusieurs projets ?</p>
            <Button asChild variant="outline" size="lg">
              <Link to="/particuliers/aides">
                Voir toutes les aides disponibles
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>


      {/* CTA Final */}
      <section className="py-16 gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-primary-foreground">Prêt à rénover votre logement ?</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Nos conseillers vous accompagnent gratuitement pour maximiser vos aides et concrétiser votre projet.
            </p>
            <Button asChild size="lg" variant="secondary" className="shadow-lg">
              <Link to="/particuliers/aides">Démarrer ma simulation gratuite</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Particuliers;
