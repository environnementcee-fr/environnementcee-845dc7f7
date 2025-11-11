import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { StickyCTA } from "@/components/StickyCTA";
import { CategoryGrid } from "@/components/CategoryGrid";

const Professionnels = () => {

  return (
    <div className="min-h-screen">
      <title>Aides CEE pour Professionnels - EnvironnementCEE.fr</title>
      
      <StickyCTA targetId="solutions-section" estimatedTime="2 min" />

      {/* Hero */}
      <section className="gradient-hero py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="mb-4 md:mb-6 text-foreground text-2xl md:text-4xl lg:text-5xl">
              Réduisez vos coûts énergétiques grâce aux aides CEE
            </h1>
            <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8">
              Entreprises, artisans, collectivités : bénéficiez d'un financement jusqu'à 100% pour vos travaux de rénovation énergétique.
            </p>
            <Button asChild size="lg" className="shadow-lg w-full sm:w-auto">
              <Link to="/pro/aides">
                Tester mon éligibilité
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Aides disponibles */}
      <section id="solutions-section" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-4 md:mb-6 text-foreground text-2xl md:text-3xl lg:text-4xl">Nos solutions pour professionnels</h2>
          <p className="text-center text-lg text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto">
            Sélectionnez la solution adaptée à vos besoins et déposez votre projet en quelques clics
          </p>
          
          <CategoryGrid segment="pro" onCardClick={() => {}} />

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Vous avez plusieurs projets ?</p>
            <Button asChild variant="outline" size="lg">
              <Link to="/pro/aides">
                Voir toutes les aides disponibles
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 md:py-16 gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4 md:mb-6 text-primary-foreground text-2xl md:text-3xl lg:text-4xl">Prêt à réduire vos factures énergétiques ?</h2>
            <p className="text-base md:text-lg text-primary-foreground/80 mb-6 md:mb-8">
              Nos conseillers analysent gratuitement votre éligibilité et vous accompagnent dans toutes vos démarches.
            </p>
            <Button asChild size="lg" variant="secondary" className="shadow-lg w-full sm:w-auto">
              <Link to="/pro/aides">Demander mon étude gratuite</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Professionnels;
