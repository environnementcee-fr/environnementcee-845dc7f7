import { CategoryGrid } from "@/components/CategoryGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AidesParticulier = () => {
  return (
    <div className="min-h-screen">
      <title>Aides Particuliers - EnvironnementCEE.fr</title>

      {/* Hero */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-foreground">Choisissez votre type de travaux</h1>
            <p className="text-xl text-muted-foreground">
              Découvrez les aides disponibles pour votre projet de rénovation énergétique
            </p>
          </div>
        </div>
      </section>

      {/* Grille des aides */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <CategoryGrid segment="part" basePath="/particuliers/demande" />
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Besoin d'aide pour choisir ?</p>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                Parler à un conseiller
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AidesParticulier;