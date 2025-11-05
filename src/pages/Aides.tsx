import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Euro, CheckCircle, ArrowRight } from "lucide-react";

const Aides = () => {
  return (
    <div className="min-h-screen">
      <title>Les Aides CEE Disponibles - EnvironnementCEE.fr</title>
      
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6 text-foreground">
              Comprendre les aides à la transition énergétique
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Découvrez toutes les aides disponibles et trouvez celles qui correspondent à votre projet.
            </p>
          </div>
        </div>
      </section>

      {/* Explication CEE */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <FileText className="h-12 w-12 text-primary" />
                <div>
                  <CardTitle className="text-2xl">Les Certificats d'Économies d'Énergie (CEE)</CardTitle>
                  <CardDescription>Le dispositif phare de la transition énergétique</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Les CEE obligent les fournisseurs d'énergie à financer des travaux d'efficacité énergétique chez leurs clients. 
                Ce mécanisme permet de financer jusqu'à <strong className="text-foreground">100% de vos travaux</strong> selon votre situation.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Accessible à tous</h4>
                    <p className="text-sm text-muted-foreground">Professionnels et particuliers</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Sans conditions de revenus</h4>
                    <p className="text-sm text-muted-foreground">Pour la plupart des aides CEE</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Cumulable</h4>
                    <p className="text-sm text-muted-foreground">Avec MaPrimeRénov', éco-PTZ...</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Autres aides */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12 text-foreground">Autres dispositifs d'aide</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-smooth">
              <CardHeader>
                <Euro className="h-10 w-10 text-primary mb-2" />
                <CardTitle>MaPrimeRénov'</CardTitle>
                <CardDescription>Pour les particuliers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Aide de l'État pour les travaux de rénovation énergétique dans les logements de plus de 15 ans.
                </p>
                <p className="text-xs text-muted-foreground">Montant selon revenus et type de travaux</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-smooth">
              <CardHeader>
                <Euro className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Éco-PTZ</CardTitle>
                <CardDescription>Prêt à taux zéro</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Financement sans intérêt jusqu'à 50 000€ pour vos travaux de rénovation énergétique.
                </p>
                <p className="text-xs text-muted-foreground">Remboursable sur 20 ans maximum</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-smooth">
              <CardHeader>
                <Euro className="h-10 w-10 text-primary mb-2" />
                <CardTitle>TVA réduite</CardTitle>
                <CardDescription>5,5% ou 10%</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Taux de TVA réduit pour les travaux d'amélioration de la performance énergétique.
                </p>
                <p className="text-xs text-muted-foreground">Appliqué automatiquement par l'artisan RGE</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-smooth">
              <CardHeader>
                <Euro className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Aides locales</CardTitle>
                <CardDescription>Région, département, commune</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  De nombreuses collectivités proposent des aides complémentaires pour vos projets.
                </p>
                <p className="text-xs text-muted-foreground">Variables selon votre localisation</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-smooth">
              <CardHeader>
                <Euro className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Coup de pouce</CardTitle>
                <CardDescription>Bonifications CEE</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Primes bonifiées pour certains travaux (chauffage, isolation, rénovation globale).
                </p>
                <p className="text-xs text-muted-foreground">Montants renforcés pour ménages modestes</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-smooth">
              <CardHeader>
                <Euro className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Aides professionnelles</CardTitle>
                <CardDescription>TPE/PME</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Dispositifs spécifiques pour les entreprises : CEE pro, fonds chaleur, aides régionales.
                </p>
                <p className="text-xs text-muted-foreground">Accompagnement sur-mesure</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-primary-foreground">Quelles aides pour votre projet ?</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Testez votre éligibilité en 2 minutes et découvrez le montant des aides dont vous pouvez bénéficier.
            </p>
            <Button asChild size="lg" variant="secondary" className="shadow-lg">
              <Link to="/simulation">
                Faire ma simulation gratuite
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aides;
