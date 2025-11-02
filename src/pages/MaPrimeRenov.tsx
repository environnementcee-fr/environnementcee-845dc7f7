import { Helmet } from "react-helmet";
import { MaPrimeRenovForm } from "@/components/forms/MaPrimeRenovForm";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Euro, Zap, Shield, Calculator } from "lucide-react";

const MaPrimeRenov = () => {
  return (
    <>
      <Helmet>
        <title>MaPrimeRénov' 2025 - Jusqu'à 90% de vos travaux financés | CEE Énergie</title>
        <meta 
          name="description" 
          content="Bénéficiez de MaPrimeRénov' 2025 pour financer vos travaux de rénovation énergétique. Jusqu'à 90% pris en charge selon vos revenus." 
        />
      </Helmet>
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 text-lg px-6 py-2">
                MaPrimeRénov' 2025
              </Badge>
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Jusqu'à 90% de vos travaux financés
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                L'aide de l'État pour rénover votre logement et réduire vos factures d'énergie
              </p>
              <Button
                size="lg"
                onClick={() => document.getElementById('estimation-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="gap-2"
              >
                <Calculator className="h-5 w-5" />
                Estimez vos aides
              </Button>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Qu'est-ce que MaPrimeRénov' ?
              </h2>
              <p className="text-lg text-muted-foreground mb-12 text-center">
                MaPrimeRénov' est l'aide de l'État qui finance vos travaux de rénovation énergétique. 
                Le montant dépend de vos revenus et du type de travaux réalisés.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 text-center hover:shadow-lg transition-all">
                  <div className="text-4xl mb-4 flex justify-center">
                    <Home className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Propriétaires</h3>
                  <p className="text-sm text-muted-foreground">
                    Occupants ou bailleurs
                  </p>
                </Card>

                <Card className="p-6 text-center hover:shadow-lg transition-all">
                  <div className="text-4xl mb-4 flex justify-center">
                    <Euro className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Selon revenus</h3>
                  <p className="text-sm text-muted-foreground">
                    4 barèmes adaptés
                  </p>
                </Card>

                <Card className="p-6 text-center hover:shadow-lg transition-all">
                  <div className="text-4xl mb-4 flex justify-center">
                    <Zap className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Travaux éligibles</h3>
                  <p className="text-sm text-muted-foreground">
                    Isolation, chauffage, ventilation
                  </p>
                </Card>

                <Card className="p-6 text-center hover:shadow-lg transition-all">
                  <div className="text-4xl mb-4 flex justify-center">
                    <Shield className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Artisans RGE</h3>
                  <p className="text-sm text-muted-foreground">
                    Professionnels certifiés
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Montants Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">
                Montants selon vos revenus
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 border-2 border-blue-500 bg-blue-50/50">
                  <h3 className="text-xl font-bold mb-2 text-blue-700">Très modestes</h3>
                  <div className="text-4xl font-bold mb-4 text-blue-900">90%</div>
                  <p className="text-sm text-muted-foreground">
                    Prise en charge jusqu'à 90% des travaux
                  </p>
                </Card>

                <Card className="p-6 border-2 border-green-500 bg-green-50/50">
                  <h3 className="text-xl font-bold mb-2 text-green-700">Modestes</h3>
                  <div className="text-4xl font-bold mb-4 text-green-900">75%</div>
                  <p className="text-sm text-muted-foreground">
                    Prise en charge jusqu'à 75% des travaux
                  </p>
                </Card>

                <Card className="p-6 border-2 border-orange-500 bg-orange-50/50">
                  <h3 className="text-xl font-bold mb-2 text-orange-700">Intermédiaires</h3>
                  <div className="text-4xl font-bold mb-4 text-orange-900">60%</div>
                  <p className="text-sm text-muted-foreground">
                    Prise en charge jusqu'à 60% des travaux
                  </p>
                </Card>

                <Card className="p-6 border-2 border-purple-500 bg-purple-50/50">
                  <h3 className="text-xl font-bold mb-2 text-purple-700">Supérieurs</h3>
                  <div className="text-4xl font-bold mb-4 text-purple-900">40%</div>
                  <p className="text-sm text-muted-foreground">
                    Prise en charge jusqu'à 40% des travaux
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="estimation-form" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Estimez vos aides en 2 minutes
              </h2>
              <p className="text-muted-foreground mb-8 text-center">
                Remplissez le formulaire pour obtenir une estimation gratuite et sans engagement
              </p>
              
              <MaPrimeRenovForm />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Questions fréquentes
              </h2>
              
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-bold mb-2">Qui peut bénéficier de MaPrimeRénov' ?</h3>
                  <p className="text-muted-foreground">
                    Tous les propriétaires, occupants ou bailleurs, quels que soient leurs revenus. 
                    Le logement doit être construit depuis plus de 15 ans (2 ans pour le remplacement d'une chaudière au fioul).
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold mb-2">Quels travaux sont éligibles ?</h3>
                  <p className="text-muted-foreground">
                    Isolation (murs, toiture, fenêtres), chauffage (pompe à chaleur, chaudière biomasse), 
                    ventilation, audit énergétique, et bien d'autres travaux de rénovation énergétique.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold mb-2">Peut-on cumuler avec d'autres aides ?</h3>
                  <p className="text-muted-foreground">
                    Oui ! MaPrimeRénov' est cumulable avec les CEE (Certificats d'Économies d'Énergie), 
                    l'éco-PTZ, la TVA à 5,5%, et certaines aides locales.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold mb-2">Comment se déroule la demande ?</h3>
                  <p className="text-muted-foreground">
                    1) Estimez vos aides avec notre formulaire, 2) Nous vous mettons en relation avec un artisan RGE, 
                    3) Déposez votre demande sur maprimerenov.gouv.fr, 4) Réalisez vos travaux, 5) Recevez votre prime.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MaPrimeRenov;
