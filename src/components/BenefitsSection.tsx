import { TrendingDown, Clock, Sun, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    icon: TrendingDown,
    title: "Jusqu'à 80 % d'économies",
    description: "Réduisez drastiquement votre consommation d'électricité comparé aux systèmes d'éclairage traditionnels (halogènes, tubes fluorescents).",
    highlight: "-80%",
  },
  {
    icon: Clock,
    title: "Durée de vie exceptionnelle",
    description: "40 000 à 50 000 heures de fonctionnement : diminuez vos coûts de maintenance et les interventions de remplacement.",
    highlight: "50 000h",
  },
  {
    icon: Sun,
    title: "Confort visuel amélioré",
    description: "Gradation automatique en fonction de la luminosité naturelle, température de couleur optimale, absence de scintillement.",
    highlight: "Qualité",
  },
  {
    icon: Target,
    title: "Objectifs Décret Tertiaire",
    description: "Contribuez aux obligations de réduction énergétique : -40 % en 2030, -50 % en 2040, -60 % en 2050 par rapport à 2010.",
    highlight: "-60%",
  },
];

export const BenefitsSection = () => {
  return (
    <section className="py-20 gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="mb-4 text-background">Bénéfices pour votre entreprise</h2>
          <p className="text-lg text-background/80 max-w-2xl mx-auto">
            Un investissement rentable pour votre performance énergétique et votre confort
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="p-6 bg-background/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-smooth hover:shadow-elegant animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4 shadow-md">
                  <benefit.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                
                <div className="text-3xl font-bold text-primary mb-3">
                  {benefit.highlight}
                </div>
                
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  {benefit.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-background/70">
            Ces bénéfices s'ajoutent à la prime CEE qui peut prendre en charge une partie significative de votre investissement.
          </p>
        </div>
      </div>
    </section>
  );
};
