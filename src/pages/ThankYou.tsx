import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle, FileText, Clock, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Demande bien reçue !</h1>
          <p className="text-xl text-muted-foreground">
            Merci pour votre confiance. Notre équipe va analyser votre demande.
          </p>
        </div>

        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Prochaines étapes</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">1. Analyse de votre dossier (24-48h)</h3>
                <p className="text-muted-foreground">
                  Nous vérifions votre éligibilité aux aides CEE selon les critères de la fiche BAT-EQ-127 
                  et estimons le montant de la prime disponible pour votre projet.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">2. Prise de contact par notre équipe</h3>
                <p className="text-muted-foreground">
                  Un conseiller vous contactera par email ou téléphone pour confirmer les détails 
                  de votre projet et répondre à vos questions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">3. Préparation des documents</h3>
                <p className="text-muted-foreground mb-3">
                  Pendant ce temps, vous pouvez commencer à rassembler les documents nécessaires :
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Extrait Kbis de moins de 3 mois</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Photos de votre installation d'éclairage actuelle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Dernière facture d'électricité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Plan des locaux à équiper (si disponible)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="font-semibold text-lg mb-3">📧 Email de confirmation</h3>
          <p className="text-muted-foreground text-sm">
            Un email récapitulatif vous a été envoyé à l'adresse que vous avez indiquée. 
            Si vous ne le recevez pas dans les prochaines minutes, pensez à vérifier vos spams.
          </p>
        </Card>

        <div className="text-center mt-8">
          <Button 
            onClick={() => navigate("/")}
            variant="outline"
          >
            Retour à l'accueil
          </Button>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Une question ? Contactez-nous : <a href="mailto:contact@environnementcee.fr" className="text-primary hover:underline">contact@environnementcee.fr</a></p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;