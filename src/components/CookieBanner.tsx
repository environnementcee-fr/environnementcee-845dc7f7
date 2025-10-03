import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cookie } from "lucide-react";

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
    // Here you would initialize analytics/tracking
    console.log("Analytics enabled");
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
    console.log("Analytics disabled");
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-up">
      <Card className="max-w-4xl mx-auto p-6 shadow-lg bg-card border-border">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-shrink-0">
            <Cookie className="h-8 w-8 text-primary" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">
              Gestion des cookies
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nous utilisons des cookies essentiels pour le bon fonctionnement du site. 
              Avec votre consentement, nous utilisons également des cookies analytiques pour améliorer votre expérience. 
              Vous pouvez modifier vos préférences à tout moment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              onClick={handleDecline}
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
            >
              Refuser
            </Button>
            <Button
              onClick={handleAccept}
              size="sm"
              className="w-full sm:w-auto gradient-primary text-primary-foreground"
            >
              Accepter
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
