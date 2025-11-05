import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Euro, CheckCircle, Thermometer } from "lucide-react";
import { IsolationForm } from "@/components/forms/IsolationForm";

const IsolationPro = () => {
  return (
    <div className="min-h-screen">
      <title>Isolation Professionnelle - CEE Professionnels | Hello-Travaux</title>
      
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Layers className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="mb-6 text-foreground">
              Isolation Thermique Professionnelle
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Réduisez vos déperditions thermiques et vos factures de chauffage grâce aux aides CEE.
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
          <IsolationForm />
        </div>
      </section>

      {/* Qu'est-ce que c'est */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Isolation de vos locaux professionnels</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                L'<strong className="text-foreground">isolation thermique</strong> de vos murs, toitures et planchers permet de réduire considérablement les pertes de chaleur et d'améliorer le confort de vos collaborateurs.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Les <strong className="text-foreground">aides CEE</strong> prennent en charge une partie importante du coût des travaux pour les entreprises et collectivités.
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
                <CardTitle className="text-xl">Jusqu'à 30% d'économies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Réduction significative de vos factures de chauffage et climatisation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <Thermometer className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Confort amélioré</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Température homogène, moins de variations thermiques.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Performance thermique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Valorisation de votre patrimoine immobilier.
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
                  <span className="text-muted-foreground">Locaux professionnels existants depuis plus de 2 ans</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Matériaux isolants conformes aux exigences CEE (résistance thermique minimale)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Travaux réalisés par un artisan certifié RGE</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Respect des normes en vigueur (DTU, Avis Techniques)</span>
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
            <h2 className="mb-6 text-primary-foreground">Isolez vos locaux professionnels</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Nos conseillers évaluent gratuitement votre projet d'isolation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

export default IsolationPro;