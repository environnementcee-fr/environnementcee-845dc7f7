import { Building2, Lightbulb, Gauge, Zap, Settings, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const criteria = [
  {
    icon: Building2,
    title: "Bâtiments tertiaires",
    description: "Bureaux, commerces, hôtellerie, industrie… tout bâtiment tertiaire existant est éligible.",
  },
  {
    icon: Lightbulb,
    title: "Luminaires complets LED",
    description: "Remplacement de luminaires complets (pas de simple changement d'ampoules). Modules remplaçables requis.",
  },
  {
    icon: Gauge,
    title: "Durée de vie ≥ 50 000 heures",
    description: "Chute de flux lumineux ≤ 20 % en fin de vie. Garantie de performance durable.",
  },
  {
    icon: Zap,
    title: "Efficacité lumineuse élevée",
    description: "≥ 120 lm/W (IK ≥ 10) ou ≥ 140 lm/W pour les autres luminaires. THD < 25 %, facteur déphasage ≥ 0,9.",
  },
  {
    icon: Settings,
    title: "Gradation automatique",
    description: "Luminaires adaptés à la gradation automatique. Groupe de risque photobiologique < 2 (sécurité visuelle).",
  },
  {
    icon: UserCheck,
    title: "Installation professionnelle",
    description: "Étude de dimensionnement préalable par un professionnel RGE. Installation par un professionnel qualifié.",
  },
];

export const EligibilitySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="mb-4 text-foreground">Critères d'éligibilité</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Votre projet doit respecter les exigences de la fiche CEE BAT-EQ-127
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {criteria.map((criterion, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-elegant transition-smooth bg-card border-border animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <criterion.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                {criterion.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {criterion.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg max-w-4xl mx-auto">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Important :</strong> Les barèmes de CEE varient selon le secteur d'activité (hôtellerie, bureaux, commerce, enseignement, santé, sport…). 
            Notre équipe vous accompagne pour maximiser vos aides en fonction de votre profil.
          </p>
        </div>
      </div>
    </section>
  );
};
