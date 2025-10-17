import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Euro, CheckCircle, Zap } from "lucide-react";
import { LEDBureauForm } from "@/components/forms/LEDBureauForm";

const LEDBureau = () => {
  return (
    <div className="min-h-screen">
      <title>Éclairage LED Bureau - CEE Professionnels | EnvironnementCEE.fr</title>
      
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Building className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="mb-6 text-foreground">
              Éclairage LED Professionnel pour Bureaux
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Améliorez le confort de vos collaborateurs tout en réduisant vos factures d'énergie.
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <LEDBureauForm />
        </div>
      </section>

      {/* Qu'est-ce que c'est */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Éclairage adapté aux espaces tertiaires</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                L'<strong className="text-foreground">éclairage LED pour bureaux</strong> offre un confort visuel optimal pour vos équipes tout en réduisant significativement votre consommation énergétique.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Profitez des <strong className="text-foreground">aides CEE</strong> pour moderniser vos espaces de travail avec un financement avantageux.
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
                <CardTitle className="text-xl">Économies garanties</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Réduction immédiate de vos coûts d'électricité jusqu'à 70%.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Confort visuel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lumière homogène et naturelle, moins de fatigue oculaire.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Installation rapide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Mise en place sans interruption de votre activité.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Conditions d'éligibilité */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Conditions d'éligibilité CEE</h2>
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Locaux professionnels tertiaires (bureaux, commerces, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Remplacement d'un éclairage existant</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Luminaires LED conformes aux normes en vigueur</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Installation par un artisan certifié RGE</span>
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
            <h2 className="mb-6 text-primary-foreground">Modernisez vos espaces de travail</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Un conseiller expert vous accompagne dans votre projet d'éclairage LED.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg">
                <Link to="/contact">Nous contacter</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-lg bg-primary-foreground">
                <Link to="/professionnels">Voir toutes les aides pro</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LEDBureau;