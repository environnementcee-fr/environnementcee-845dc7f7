import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Contact</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Notre équipe est à votre écoute pour vous accompagner dans vos projets d'aides CEE
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <a 
                  href="mailto:contact@environnementcee.fr" 
                  className="text-primary hover:underline"
                >
                  contact@environnementcee.fr
                </a>
                <p className="text-sm text-muted-foreground mt-1">
                  Nous vous répondons sous 24h ouvrées
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Adresse</h3>
                <p className="text-muted-foreground">
                  FJLC ENVIRONNEMENT<br />
                  8 B RUE ABEL<br />
                  75012 PARIS
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-4">À propos de FJLC ENVIRONNEMENT</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              FJLC ENVIRONNEMENT est spécialisée dans l'accompagnement des professionnels pour l'obtention des aides CEE (Certificats d'Économies d'Énergie).
            </p>
            <p>
              Notre plateforme environnementcee.fr centralise toutes les aides disponibles et vous permet de vérifier rapidement votre éligibilité. Nous mettons régulièrement à jour nos offres pour vous faire bénéficier des dernières opportunités de financement pour vos projets d'efficacité énergétique.
            </p>
            <p className="pt-4 border-t">
              <strong>SIREN :</strong> 849 863 535
            </p>
          </div>
        </Card>

        <section className="mt-12 bg-card p-8 rounded-lg border">
          <h2 className="text-2xl font-semibold mb-4">Horaires d'ouverture</h2>
          <div className="space-y-2 text-muted-foreground">
            <p><strong>Lundi - Vendredi :</strong> 9h00 - 18h00</p>
            <p><strong>Samedi - Dimanche :</strong> Fermé</p>
            <p className="text-sm mt-4">
              Les demandes reçues en dehors de nos horaires d'ouverture seront traitées le prochain jour ouvrable.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Questions fréquentes</h2>
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Comment vérifier mon éligibilité ?</h3>
              <p className="text-muted-foreground text-sm">
                Remplissez le formulaire sur notre page d'accueil. Nous analyserons votre situation et vous contacterons rapidement pour vous informer de votre éligibilité.
              </p>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Combien de temps prend le traitement d'une demande ?</h3>
              <p className="text-muted-foreground text-sm">
                Nous traitons votre demande sous 24h ouvrées et vous recontactons pour vous accompagner dans vos démarches.
              </p>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Les aides CEE sont-elles cumulables ?</h3>
              <p className="text-muted-foreground text-sm">
                Oui, dans certains cas les aides CEE peuvent être cumulées avec d'autres dispositifs. Notre équipe vous conseillera sur les meilleures combinaisons possibles.
              </p>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
