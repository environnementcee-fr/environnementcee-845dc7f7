import { Header } from "@/components/Header";
import { LEDUnifieForm } from "@/components/forms/LEDUnifieForm";
import { Building2, Warehouse, Sun, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const LEDUnifie = () => {
  return (
    <div className="min-h-screen">
      <title>Éclairage LED Professionnel - EnvironnementCEE.fr</title>

      <Header />

      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-foreground">Éclairage LED Professionnel avec Aides CEE</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Réduisez votre consommation énergétique jusqu'à 70% avec des solutions LED adaptées à vos besoins
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="p-6 bg-background/80 backdrop-blur">
                <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">LED Bureau</h3>
                <p className="text-sm text-muted-foreground">Éclairage optimal pour espaces tertiaires</p>
              </Card>
              <Card className="p-6 bg-background/80 backdrop-blur">
                <Warehouse className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">LED Entrepôt</h3>
                <p className="text-sm text-muted-foreground">Solutions industrielles haute performance</p>
              </Card>
              <Card className="p-6 bg-background/80 backdrop-blur">
                <Sun className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">LED Solaire</h3>
                <p className="text-sm text-muted-foreground">Éclairage extérieur autonome</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">Pourquoi passer au LED ?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-2">Économies d'énergie</h3>
                  <p className="text-muted-foreground">Jusqu'à 70% de réduction sur votre facture électrique</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-2">Durée de vie accrue</h3>
                  <p className="text-muted-foreground">50 000 heures en moyenne vs 2 000h pour les halogènes</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-2">Aides CEE</h3>
                  <p className="text-muted-foreground">Financement partiel ou total selon votre projet</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-2">Installation rapide</h3>
                  <p className="text-muted-foreground">Peu ou pas d'interruption de votre activité</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Obtenez votre étude personnalisée gratuite</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complétez ce formulaire en 2 minutes pour recevoir une étude technique et financière adaptée à vos besoins
            </p>
          </div>
          <LEDUnifieForm />
        </div>
      </section>
    </div>
  );
};

export default LEDUnifie;
