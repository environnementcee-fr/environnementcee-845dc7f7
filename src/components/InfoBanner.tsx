import { Sparkles } from "lucide-react";

export const InfoBanner = () => {
  return (
    <section className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-y border-primary/20 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 text-center">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <p className="text-sm md:text-base font-medium text-foreground">
            <span className="font-bold text-primary">Toutes les aides CEE d'actualité</span> sont publiées en temps réel sur notre plateforme spécialisée
          </p>
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};
