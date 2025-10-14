import { CheckCircle, Home, Phone, Mail, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20 px-4">
      <Card className="max-w-3xl w-full">
        <CardContent className="pt-12 pb-8">
          <div className="text-center mb-10">
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-primary/10 p-6">
                <CheckCircle className="h-16 w-16 text-primary" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4 text-foreground">
              Merci pour votre demande !
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Votre demande a bien été enregistrée. Notre équipe d'experts va l'étudier et vous recontacter 
              dans les plus brefs délais pour vous accompagner dans votre projet.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-6 text-center">Prochaines étapes :</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">1. Analyse de votre dossier (24-48h)</h3>
                  <p className="text-muted-foreground text-sm">
                    Nous vérifions votre éligibilité aux aides CEE et estimons le montant de la prime disponible pour votre projet.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">2. Prise de contact</h3>
                  <p className="text-muted-foreground text-sm">
                    Un conseiller vous contactera pour confirmer les détails de votre projet et répondre à vos questions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">3. Mise en relation avec un installateur RGE</h3>
                  <p className="text-muted-foreground text-sm">
                    Nous vous mettons en relation avec des professionnels certifiés et nous constituons votre dossier d'aides.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-6 mb-8">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Email de confirmation
            </h3>
            <p className="text-sm text-muted-foreground">
              Un email récapitulatif vous a été envoyé. Si vous ne le recevez pas dans les prochaines minutes, 
              pensez à vérifier vos spams.
            </p>
          </div>

          <div className="border-t pt-6 mb-8">
            <p className="text-sm text-muted-foreground mb-4 text-center">
              Une question ? Notre équipe est à votre disposition :
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:0123456789" className="flex items-center gap-2 text-primary hover:underline">
                <Phone className="h-4 w-4" />
                <span>01 23 45 67 89</span>
              </a>
              <a href="mailto:contact@environnementcee.fr" className="flex items-center gap-2 text-primary hover:underline">
                <Mail className="h-4 w-4" />
                <span>contact@environnementcee.fr</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/")} size="lg">
              <Home className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
            <Button onClick={() => navigate("/blog")} variant="outline" size="lg">
              Découvrir nos articles
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYou;