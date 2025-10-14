import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Thermometer, Euro, CheckCircle, Zap } from "lucide-react";

const PACPro = () => {
  return (
    <div className="min-h-screen">
      <title>Pompe à Chaleur Professionnelle - CEE Professionnels | EnvironnementCEE.fr</title>
      
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Thermometer className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="mb-6 text-foreground">
              Pompe à Chaleur Professionnelle
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Chauffage et climatisation haute efficacité pour vos locaux professionnels avec financement CEE.
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
          <h2 className="text-center mb-12 text-foreground">Solution de chauffage et climatisation économique</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                La <strong className="text-foreground">pompe à chaleur professionnelle</strong> (air/air ou air/eau) permet de chauffer et climatiser vos locaux avec une efficacité énergétique jusqu'à 4 fois supérieure aux systèmes traditionnels.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Grâce aux <strong className="text-foreground">aides CEE</strong>, vous pouvez installer une PAC avec un financement avantageux pour réduire durablement vos coûts énergétiques.
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
                <Zap className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Haute efficacité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  COP jusqu'à 4 : 1 kWh consommé = 4 kWh restitués.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <Euro className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Jusqu'à 60% d'économies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Réduction drastique de vos factures de chauffage et climatisation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">2 en 1</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Chauffage en hiver, climatisation en été avec un seul système.
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
                  <span className="text-muted-foreground">Locaux professionnels (bureaux, commerces, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Pompe à chaleur avec COP ≥ 3,4 (selon conditions normatives)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Installation par un professionnel RGE QualiPAC</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Matériel certifié NF PAC ou équivalent</span>
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
            <h2 className="mb-6 text-primary-foreground">Chauffez et climatisez efficacement vos locaux</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Nos experts dimensionnent la PAC idéale pour votre activité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg">
                <Link to="/simulation">Demander mon étude gratuite</Link>
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

export default PACPro;