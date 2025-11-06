import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Thermometer, Euro, CheckCircle, Zap } from "lucide-react";
import PACForm from "@/components/forms/PACForm";
import { StickyCTA } from "@/components/StickyCTA";

const PACParticulier = () => {
  return (
    <div className="min-h-screen">
      <title>Pompe à Chaleur - Aides Particuliers | EnvironnementCEE.fr</title>
      
      <StickyCTA targetId="eligibility-form" estimatedTime="3 min" />
      
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Thermometer className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="mb-6 text-foreground">
              Pompe à Chaleur pour Particuliers
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Chauffage et eau chaude sanitaire économiques et écologiques. Jusqu'à 10 000€ d'aides cumulées.
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
          <PACForm />
        </div>
      </section>

      {/* Qu'est-ce que c'est */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Une solution de chauffage performante et écologique</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                La <strong className="text-foreground">pompe à chaleur</strong> capte les calories présentes dans l'air extérieur pour chauffer votre logement et produire votre eau chaude sanitaire.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Grâce aux <strong className="text-foreground">aides CEE, MaPrimeRénov' et primes locales</strong>, vous pouvez installer une PAC avec un reste à charge très réduit.
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
                <CardTitle className="text-xl">Jusqu'à 70% d'économies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Divisez vos factures de chauffage par 2 ou 3.
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  Estimer mes économies
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Jusqu'à 10 000€ d'aide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Cumul CEE + MaPrimeRénov' selon vos revenus.
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  Calculer mes aides
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Chauffage + ECS</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Une seule installation pour chauffer votre maison et votre eau.
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
          </div>
        </div>
      </section>

      {/* Types de PAC */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Quelle pompe à chaleur choisir ?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">PAC Air/Eau</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Remplace votre chaudière fioul ou gaz, se raccorde à vos radiateurs existants.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Production de chauffage</li>
                  <li>• Production d'eau chaude sanitaire</li>
                  <li>• Compatible radiateurs et plancher chauffant</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">PAC Air/Air</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Solution de chauffage et climatisation par soufflage d'air (splits).
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Chauffage en hiver</li>
                  <li>• Climatisation en été</li>
                  <li>• Installation flexible pièce par pièce</li>
                </ul>
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
                  <span className="text-muted-foreground">Pompe à chaleur avec COP ≥ 2,5 (selon type)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Installation par un artisan RGE QualiPAC</span>
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
            <h2 className="mb-6 text-primary-foreground">Chauffez votre logement durablement</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Un expert évalue gratuitement votre projet et vous aide à maximiser vos aides.
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

export default PACParticulier;