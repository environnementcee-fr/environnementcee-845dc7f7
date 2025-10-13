import { Shield, FileCheck, Award, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";

const conditions = [
  {
    icon: FileCheck,
    title: "Luminaires complets conformes",
    items: [
      "Luminaire complet (corps, module LED remplaçable, driver, optique)",
      "Durée de vie ≥ 100 000 heures (chute de flux ≤ 20%)",
      "Efficacité lumineuse ≥ 120 lm/W (IK ≥ 10) ou ≥ 140 lm/W",
      "THD < 25%, facteur de déphasage ≥ 0,9",
      "Groupe de risque photobiologique < 2"
    ]
  },
  {
    icon: Award,
    title: "Installation professionnelle RGE",
    items: [
      "Étude de dimensionnement préalable obligatoire",
      "Réalisée par un professionnel ou bureau d'études qualifié RGE",
      "Installation par un professionnel qualifié",
      "Gradation automatique en fonction de la luminosité naturelle"
    ]
  },
  {
    icon: Briefcase,
    title: "Conditions d'éligibilité entreprise",
    items: [
      "Réservé aux personnes morales (entreprises, associations, collectivités)",
      "SIREN actif depuis au moins 3 mois",
      "Bâtiment tertiaire existant (bureaux, commerce, industrie, etc.)",
      "Conforme à la fiche CEE BAT-EQ-127"
    ]
  },
  {
    icon: Shield,
    title: "Documents à conserver (5 ans)",
    items: [
      "Facture détaillée de l'installation",
      "Rapport d'essais des luminaires (durée de vie, efficacité, THD)",
      "Attestation de conformité signée par l'installateur",
      "Étude de dimensionnement préalable"
    ]
  }
];

export const ConditionsSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="mb-4 text-foreground">Conditions de l'aide CEE</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Critères légaux et techniques pour bénéficier du financement CEE selon la fiche BAT-EQ-127
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {conditions.map((condition, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-elegant transition-smooth bg-card border-border"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <condition.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground pt-2">
                  {condition.title}
                </h3>
              </div>
              
              <ul className="space-y-2 ml-16">
                {condition.items.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg max-w-4xl mx-auto">
          <p className="text-sm text-foreground text-center">
            <strong>Important :</strong> Le montant de la prime CEE est forfaitaire et déterminé par les obligés CEE (fournisseurs d'énergie). 
            Il varie selon le type de bâtiment, la surface éclairée et la zone climatique. Notre équipe vous accompagne dans le montage du dossier.
          </p>
        </div>
      </div>
    </section>
  );
};