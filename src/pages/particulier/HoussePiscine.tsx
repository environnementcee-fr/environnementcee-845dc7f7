import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets, Euro, CheckCircle, Leaf } from "lucide-react";
import { HoussePiscineForm } from "@/components/forms/HoussePiscineForm";

const HoussePiscine = () => {
  return (
    <div className="min-h-screen">
      <title>Housse Piscine Flottante - Aides Particuliers | EnvironnementCEE.fr</title>
      
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Droplets className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="mb-6 text-foreground">
              Housse Piscine Flottante
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Conservez la chaleur de votre piscine et économisez l'eau grâce aux aides CEE.
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

      {/* Qu'est-ce que c'est */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Une solution éco-responsable pour votre piscine</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                La <strong className="text-foreground">housse piscine flottante</strong> (ou couverture isothermique) limite l'évaporation de l'eau et conserve la chaleur accumulée dans le bassin.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Elle permet de réduire les besoins en chauffage et en eau de remplissage. Les <strong className="text-foreground">aides CEE</strong> peuvent financer une partie de votre équipement.
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
                <Leaf className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Éco-responsable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Jusqu'à 70% d'évaporation d'eau en moins.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <Euro className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Économies d'énergie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Réduction jusqu'à 50% des coûts de chauffage de la piscine.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Facilité d'usage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Installation simple, utilisation quotidienne rapide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Les bénéfices concrets</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Conservation de la chaleur</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  La housse limite les déperditions thermiques la nuit et maintient la température de l'eau plus stable.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Réduction de l'évaporation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Moins d'évaporation = moins de remplissage, moins de produits chimiques, moins de nettoyage.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Protection du bassin</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Limite l'accumulation de saletés et débris dans l'eau.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Prolongation de la saison</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Profitez de votre piscine plus tôt au printemps et plus tard en automne.
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
                  <span className="text-muted-foreground">Propriétaire d'une piscine individuelle</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Piscine existante (pas de neuf)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Housse conforme aux normes CEE (isolation thermique minimale)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Fourniture par un professionnel agréé</span>
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
              <HoussePiscineForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-primary-foreground">Équipez votre piscine d'une housse performante</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Un conseiller vous aide à choisir la housse adaptée à votre bassin.
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

export default HoussePiscine;