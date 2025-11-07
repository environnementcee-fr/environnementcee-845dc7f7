import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/98 backdrop-blur-md border-t border-border shadow-lg animate-in slide-in-from-bottom duration-500">
      <Card className="max-w-4xl mx-auto p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold mb-2 text-foreground">🍪 Gestion des cookies</h3>
            <p className="text-sm text-muted-foreground">
              Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre{" "}
              <a href="/gestion-cookies" className="text-primary underline hover:text-primary/80 transition-colors">
                politique de cookies
              </a>
              .
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button variant="outline" onClick={handleDecline} className="min-w-[100px]">
              Refuser
            </Button>
            <Button onClick={handleAccept} className="min-w-[100px]">
              Accepter
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
