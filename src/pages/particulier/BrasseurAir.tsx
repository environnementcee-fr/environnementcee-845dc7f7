import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Fan, Euro, CheckCircle, Wind } from "lucide-react";
import { BrasseurAirForm } from "@/components/forms/BrasseurAirForm";

const BrasseurAirParticulier = () => {
  return (
    <div className="min-h-screen">
      <title>Brasseur d'Air - Aides Particuliers | EnvironnementCEE.fr</title>
      
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Fan className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="mb-6 text-foreground">
              Brasseur d'Air pour Particuliers
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Optimisez le confort thermique de votre logement été comme hiver avec les aides CEE.
            </p>
            <Button asChild size="lg" className="shadow-lg">
              <Link to="/simulation">
                Tester mon éligibilité
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Qu'est-ce que c'est */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Confort optimal toute l'année</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Le <strong className="text-foreground">brasseur d'air</strong> améliore la circulation de l'air dans votre logement pour un confort thermique optimal.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                En hiver, il récupère l'air chaud accumulé en hauteur. En été, il procure une sensation de fraîcheur. Les <strong className="text-foreground">aides CEE</strong> financent une partie de votre installation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12 text-foreground">Les avantages</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <Euro className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Confort optimal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Température homogène dans toutes les pièces.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <Wind className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Économies d'énergie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Réduction des besoins en chauffage et climatisation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Silencieux</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Fonctionnement discret, faible consommation électrique.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fonctionnement */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">En hiver</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  L'air chaud monte naturellement vers le plafond. Le brasseur d'air le fait redescendre pour homogénéiser la température et réduire les besoins en chauffage.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">En été</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Le mouvement d'air procure une sensation de fraîcheur comparable à un refroidissement de 3 à 5°C, réduisant ainsi le besoin en climatisation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Conditions d'éligibilité */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Conditions d'éligibilité CEE</h2>
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Logement individuel achevé depuis plus de 2 ans</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Propriétaire occupant ou bailleur</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Brasseur d'air conforme aux normes CEE</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Installation par un professionnel qualifié</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Formulaire d'éligibilité */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="mb-4 text-foreground">Testez votre éligibilité en 2 minutes</h2>
            <p className="text-muted-foreground">
              Remplissez ce formulaire pour obtenir une estimation personnalisée de vos aides
            </p>
          </div>
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6">
              <BrasseurAirForm defaultTab="part" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-primary-foreground">Améliorez votre confort thermique</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Un conseiller vous accompagne dans votre projet de brasseur d'air.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="shadow-lg bg-primary-foreground">
                <Link to="/particuliers">Voir toutes les aides particuliers</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrasseurAirParticulier;