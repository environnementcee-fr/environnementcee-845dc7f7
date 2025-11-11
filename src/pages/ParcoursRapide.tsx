import { RenovationGlobaleForm } from "@/components/forms/RenovationGlobaleForm";
import { Link } from "react-router-dom";
import { Clock, Euro, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

const ParcoursRapide = () => {
  return (
    <div className="min-h-screen">
      {/* Hero avec gradient */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              🚀 Rénovation Globale
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Plusieurs travaux en vue ? Obtenez une estimation complète de toutes vos aides en un seul formulaire.
            </p>
            {/* Badges avantages */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="text-center">
                <Clock className="h-12 w-12 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">5 minutes chrono</p>
              </div>
              <div className="text-center">
                <Euro className="h-12 w-12 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Toutes les aides</p>
              </div>
              <div className="text-center">
                <Target className="h-12 w-12 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Sur mesure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section comparaison parcours */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto p-6">
            <h3 className="font-semibold mb-3 text-lg">💡 Quel parcours choisir ?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg border-2 border-primary/20">
                <p className="font-medium mb-1">🚀 Rénovation Globale</p>
                <p className="text-sm text-muted-foreground">Plusieurs travaux → Un seul formulaire complet</p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <p className="font-medium mb-1">🎯 Parcours Personnalisé</p>
                <p className="text-sm text-muted-foreground">
                  Un seul type de travaux → <Link to="/particuliers/aides" className="text-primary hover:underline font-medium">Formulaire dédié</Link>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Bandeau de réassurance */}
      <section className="py-4 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>Calcul instantané</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>Sans engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>Données sécurisées</span>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <RenovationGlobaleForm />
        </div>
      </section>
    </div>
  );
};

export default ParcoursRapide;
