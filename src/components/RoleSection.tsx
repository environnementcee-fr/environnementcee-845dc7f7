import { Building2, Home } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const RoleSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center mb-12">Vous êtes...</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Professionnel */}
            <Link to="/pro/led">
              <Card className="p-8 hover:shadow-2xl transition-all cursor-pointer group border-2 hover:border-primary h-full">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-smooth">
                    <Building2 className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-smooth">PROFESSIONNEL</h3>
                  <p className="text-muted-foreground mb-6">
                    Entreprises, industries, commerces : optimisez votre éclairage LED et réduisez vos coûts énergétiques
                  </p>
                  <Button size="lg" className="w-full">
                    Découvrir les solutions LED Pro
                  </Button>
                </div>
              </Card>
            </Link>

            {/* Particulier */}
            <Link to="/particuliers">
              <Card className="p-8 hover:shadow-2xl transition-all cursor-pointer group border-2 hover:border-primary h-full">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-smooth">
                    <Home className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-smooth">PARTICULIER</h3>
                  <p className="text-muted-foreground mb-6">
                    Propriétaires, locataires : rénovez votre logement avec les aides CEE et MaPrimeRénov'
                  </p>
                  <Button size="lg" className="w-full">
                    Découvrir les aides disponibles
                  </Button>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};