import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Euro, CheckCircle, Home } from "lucide-react";
import { IsolationForm } from "@/components/forms/IsolationForm";
import { StickyCTA } from "@/components/StickyCTA";

const IsolationParticulier = () => {
  return (
    <div className="min-h-screen">
      <title>Isolation de votre logement - Aides Particuliers | EnvironnementCEE.fr</title>
      
      <StickyCTA targetId="eligibility-form" estimatedTime="2 min" />
      
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Layers className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="mb-6 text-foreground">
              Isolation de votre logement
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Murs, combles, planchers : réduisez vos déperditions thermiques et vos factures avec les aides CEE.
            </p>
            <Button 
              size="lg" 
              className="shadow-lg"
              onClick={() => document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Tester mon éligibilité
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Formulaire d'éligibilité */}
      <section id="eligibility-form" className="py-16">
        <div className="container mx-auto px-4">
          <IsolationForm />
        </div>
      </section>

      {/* Qu'est-ce que c'est */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Une maison bien isolée = confort + économies</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                L'<strong className="text-foreground">isolation thermique</strong> de votre logement permet de limiter les pertes de chaleur en hiver et de conserver la fraîcheur en été.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Combles, murs, planchers bas : les <strong className="text-foreground">aides CEE et MaPrimeRénov'</strong> peuvent financer jusqu'à 90% de vos travaux d'isolation.
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
                <CardTitle className="text-xl">Économies immédiates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Jusqu'à 30% de réduction sur vos factures de chauffage.
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  Calculer mes économies
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <Home className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Confort toute l'année</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Fini les courants d'air et les variations de température.
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  Voir mon éligibilité
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Valorisation du bien</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Meilleur DPE, plus-value à la revente ou la location.
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  Estimer mes aides
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Types d'isolation */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Quels travaux d'isolation ?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Isolation des combles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Jusqu'à 30% des déperditions thermiques passent par le toit.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Isolation des murs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Par l'intérieur ou l'extérieur, jusqu'à 25% d'économies.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Isolation des planchers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Planchers bas sur cave, vide sanitaire ou garage.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Conditions d'éligibilité */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Conditions d'éligibilité</h2>
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Logement achevé depuis plus de 2 ans</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Propriétaire occupant ou bailleur</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Matériaux isolants respectant les seuils de résistance thermique (R)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Travaux réalisés par un artisan RGE</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-primary-foreground">Isolez votre logement à moindre coût</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Un conseiller vous aide à monter votre dossier et maximiser vos aides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="shadow-lg"
                onClick={() => document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              >
                Tester mon éligibilité
                <ArrowRight className="ml-2" />
              </Button>
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

export default IsolationParticulier;