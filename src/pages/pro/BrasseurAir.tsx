import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Fan, Euro, CheckCircle, Wind } from "lucide-react";
import { BrasseurAirForm } from "@/components/forms/BrasseurAirForm";

const BrasseurAirPro = () => {
  return (
    <div className="min-h-screen">
      <title>Brasseur d'Air Professionnel - CEE Professionnels | Hello-Travaux</title>
      
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Fan className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="mb-6 text-foreground">
              Brasseur d'Air Professionnel
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Optimisez le confort thermique dans vos grands volumes avec les aides CEE.
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
          <BrasseurAirForm />
        </div>
      </section>

      {/* Qu'est-ce que c'est */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Confort thermique pour grands volumes</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Les <strong className="text-foreground">brasseurs d'air professionnels</strong> (HVLS - High Volume Low Speed) sont conçus pour optimiser la circulation de l'air dans les entrepôts, usines et grands espaces commerciaux.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Ils permettent de réduire les coûts de chauffage en hiver (en brassant l'air chaud accumulé en hauteur) et d'améliorer le confort en été, avec un financement facilité par les <strong className="text-foreground">aides CEE</strong>.
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
                  Réduction des coûts de chauffage et climatisation dans les grands volumes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <Wind className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Confort homogène</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Température uniforme, fin des zones de surchauffe ou de froid.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Silencieux et efficace</CardTitle>
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

      {/* Conditions d'éligibilité */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Conditions d'éligibilité CEE</h2>
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Locaux professionnels avec hauteur sous plafond ≥ 4 mètres</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Brasseur d'air HVLS conforme aux normes CEE</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Installation par un professionnel qualifié</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Locaux chauffés ou climatisés existants</span>
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
            <h2 className="mb-6 text-primary-foreground">Optimisez votre confort thermique</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Nos conseillers dimensionnent la solution adaptée à vos espaces.
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

export default BrasseurAirPro;