import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Euro, CheckCircle, Clock } from "lucide-react";
import { LEDEntrepotForm } from "@/components/forms/LEDEntrepotForm";

const LEDEntrepot = () => {
  return (
    <div className="min-h-screen">
      <title>Éclairage LED Entrepôt - CEE Professionnels | EnvironnementCEE.fr</title>
      
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Lightbulb className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="mb-6 text-foreground">
              Éclairage LED Haute Performance pour Entrepôts
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Réduisez jusqu'à 80% votre consommation électrique grâce aux aides CEE. Financement jusqu'à 100%.
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
          <h2 className="text-center mb-12 text-foreground">Luminaires LED pour espaces logistiques</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Les <strong className="text-foreground">luminaires LED haute performance</strong> sont spécifiquement conçus pour l'éclairage des entrepôts, zones de stockage et espaces logistiques.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Grâce aux <strong className="text-foreground">Certificats d'Économies d'Énergie (CEE)</strong>, vous pouvez remplacer vos anciens éclairages par des solutions LED de dernière génération avec un financement jusqu'à 100%.
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
                <CardTitle className="text-xl">Jusqu'à 80% d'économies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Réduction drastique de votre facture d'électricité dès l'installation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <Clock className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Durée de vie ≥ 100 000h</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Technologie LED longue durée, moins de maintenance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl">Efficacité ≥ 140 lm/W</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Performance lumineuse optimale pour vos espaces de travail.
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
                  <span className="text-muted-foreground">Entreprise, artisan ou collectivité établi en France</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Remplacement d'un éclairage existant (pas de neuf)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Luminaires LED ≥ 140 lm/W et durée de vie ≥ 100 000 heures</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Installation réalisée par un professionnel RGE</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Test d'éligibilité", desc: "Remplissez notre formulaire en 2 minutes" },
              { step: "2", title: "Audit gratuit", desc: "Un expert évalue votre projet sur site" },
              { step: "3", title: "Montage du dossier", desc: "Nous gérons toutes les démarches CEE" },
              { step: "4", title: "Installation RGE", desc: "Pose par un artisan certifié" }
            ].map((item) => (
              <Card key={item.step} className="text-center border-2 border-primary/20">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-2">
                    {item.step}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire d'éligibilité */}
      <section id="eligibility-form" className="py-16">
        <div className="container mx-auto px-4">
          <LEDEntrepotForm />
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-primary-foreground">Prêt à réduire vos coûts d'éclairage ?</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Nos experts analysent gratuitement votre projet et vous accompagnent de A à Z.
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

export default LEDEntrepot;