import { FileSearch, Lightbulb, FileText, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import auditImage from "@/assets/audit-led.jpg";
import modulesImage from "@/assets/led-modules.jpg";
import documentsImage from "@/assets/documents-cee.jpg";
import installationImage from "@/assets/installation-led.jpg";

const steps = [
  {
    icon: FileSearch,
    image: auditImage,
    title: "Audit et pré-étude",
    description: "Un professionnel ou bureau d'études RGE évalue votre installation existante et dimensionne l'éclairage optimal pour vos besoins.",
  },
  {
    icon: Lightbulb,
    image: modulesImage,
    title: "Choix du matériel",
    description: "Sélection de luminaires LED complets conformes BAT-EQ-127 : modules remplaçables, gradation automatique, efficacité ≥ 120 lm/W.",
  },
  {
    icon: FileText,
    image: documentsImage,
    title: "Montage du dossier CEE",
    description: "Collecte des justificatifs (étude, fiches produit) et dépôt du dossier auprès de l'obligé pour obtenir vos Certificats d'Économies d'Énergie.",
  },
  {
    icon: CheckCircle,
    image: installationImage,
    title: "Installation & contrôle",
    description: "Pose par un professionnel qualifié et remise du justificatif de conformité. Votre prime CEE est versée après validation.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="mb-4 text-foreground">Comment ça marche ?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            4 étapes simples pour bénéficier de la prime CEE et moderniser votre éclairage
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-elegant transition-smooth bg-background border-border animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-6 rounded-lg overflow-hidden">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-md">
                  <step.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
