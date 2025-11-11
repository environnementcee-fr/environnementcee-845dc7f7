import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building2, ArrowRight } from "lucide-react";

const Simulation = () => {
  return (
    <div className="min-h-screen">
      <title>Choisissez votre profil - EnvironnementCEE.fr</title>
      
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6 text-foreground text-4xl md:text-5xl">
              Quel est votre profil ?
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Choisissez votre parcours pour découvrir les aides adaptées à votre situation
            </p>

            {/* Deux grandes cartes CTA */}
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <Link to="/particuliers/aides" className="group">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary cursor-pointer p-8">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Home className="h-12 w-12 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Je suis particulier</h2>
                    <p className="text-muted-foreground mb-6">
                      MaPrimeRénov', CEE, Éco-PTZ... Jusqu'à 100% de financement
                    </p>
                    <Button size="lg" className="w-full group-hover:bg-primary/90">
                      Voir mes aides
                      <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                </Card>
              </Link>

              <Link to="/pro/aides" className="group">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary cursor-pointer p-8">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Building2 className="h-12 w-12 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Je suis professionnel</h2>
                    <p className="text-muted-foreground mb-6">
                      CEE, crédit d'impôt 30%, Fonds Chaleur... Zéro investissement
                    </p>
                    <Button size="lg" className="w-full group-hover:bg-primary/90">
                      Voir mes aides
                      <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section avantages */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Pourquoi passer par EnvironnementCEE.fr ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Accompagnement personnalisé</h3>
              <p className="text-sm text-muted-foreground">
                Un conseiller dédié pour vous guider dans le choix des aides et le montage de votre dossier
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Maximisation des aides</h3>
              <p className="text-sm text-muted-foreground">
                Nous combinons toutes les aides disponibles pour financer jusqu'à 100% de vos travaux
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Artisans certifiés RGE</h3>
              <p className="text-sm text-muted-foreground">
                Réseau de professionnels qualifiés dans toute la France pour garantir la qualité
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Contact */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Des questions sur les aides disponibles ?
            </h2>
            <p className="text-muted-foreground mb-6">
              Nos experts sont à votre disposition pour vous conseiller gratuitement
            </p>
            <Button asChild size="lg">
              <Link to="/contact">
                Contacter un conseiller
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Simulation;
