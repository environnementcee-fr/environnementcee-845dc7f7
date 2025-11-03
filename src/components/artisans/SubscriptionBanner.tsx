import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Crown, Sparkles } from "lucide-react";
import { useState } from "react";

export const SubscriptionBanner = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Alert className="mb-6 border-primary bg-primary/5">
        <Crown className="h-5 w-5 text-primary" />
        <AlertTitle className="text-lg font-semibold">
          Abonnement requis pour contacter les clients
        </AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-3 text-muted-foreground">
            Activez votre abonnement pour répondre aux projets et entrer en contact avec les clients.
          </p>
          <Button onClick={() => setShowModal(true)} className="gap-2">
            <Sparkles className="h-4 w-4" />
            Activer mon abonnement
          </Button>
        </AlertDescription>
      </Alert>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              Abonnement Artisan
            </DialogTitle>
            <DialogDescription className="space-y-4 pt-4">
              <p>
                L'abonnement vous permet de :
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Recevoir des notifications pour les nouveaux projets matchés</li>
                <li>Répondre aux demandes des clients</li>
                <li>Accéder aux coordonnées des clients qui vous sélectionnent</li>
                <li>Améliorer votre visibilité dans l'annuaire</li>
              </ul>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Version 1 (Phase de test)</p>
                <p className="text-sm text-muted-foreground">
                  Le système de paiement sera intégré prochainement via Stripe.
                  Pour l'instant, contactez-nous pour activer votre compte.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                  Fermer
                </Button>
                <Button 
                  onClick={() => {
                    window.location.href = "mailto:contact@environnementcee.fr?subject=Activation abonnement artisan";
                  }}
                  className="flex-1"
                >
                  Nous contacter
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
