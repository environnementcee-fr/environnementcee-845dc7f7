import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quelle est la différence entre ampoules LED et luminaires LED complets ?",
    answer: "Seuls les luminaires LED complets sont éligibles aux CEE. Un luminaire complet comprend le corps d'éclairage, le module LED remplaçable, le driver et l'optique. Le simple remplacement d'ampoules dans un ancien luminaire n'est pas éligible à la fiche BAT-EQ-127.",
  },
  {
    question: "Qui réalise l'étude de dimensionnement et la pose ?",
    answer: "L'étude de dimensionnement doit être réalisée par un professionnel ou bureau d'études qualifié RGE (Reconnu Garant de l'Environnement). L'installation doit également être effectuée par un professionnel qualifié. Nous vous mettons en relation avec des partenaires certifiés.",
  },
  {
    question: "Puis-je cumuler la prime CEE avec d'autres aides ?",
    answer: "Oui, les Certificats d'Économies d'Énergie sont cumulables avec d'autres dispositifs : MaPrimeRénov' pour certains projets, crédit d'impôt pour la rénovation énergétique, prêt économies d'énergie, aides régionales ou locales. Nos experts vous conseillent pour optimiser votre plan de financement.",
  },
  {
    question: "Quels contrôles après installation ?",
    answer: "Vous devez conserver les justificatifs suivants pendant au moins 5 ans : facture détaillée, rapport d'essais des luminaires (durée de vie, efficacité lumineuse, THD, etc.), attestation de conformité signée par l'installateur, et l'étude de dimensionnement préalable.",
  },
  {
    question: "Pourquoi un formulaire en plusieurs étapes ?",
    answer: "Le formulaire multi-étapes permet de qualifier précisément votre projet avant de monter le dossier CEE. Cela nous aide à vérifier l'éligibilité, estimer le montant de la prime, et vous mettre en relation avec le bon partenaire technique pour votre secteur d'activité.",
  },
  {
    question: "Quel est le montant de la prime CEE pour l'éclairage LED ?",
    answer: "Le montant varie selon plusieurs critères : type de bâtiment (bureaux, hôtellerie, commerce...), surface éclairée, puissance installée et zone climatique. En moyenne, la prime peut couvrir 20 à 40 % de l'investissement initial. Contactez-nous pour une estimation personnalisée.",
  },
  {
    question: "Combien de temps prend l'installation ?",
    answer: "Selon la taille du projet, l'installation peut prendre de quelques jours à plusieurs semaines. L'étude préalable nécessite 1 à 2 semaines, puis le montage du dossier CEE 2 à 3 semaines. L'installation elle-même est planifiée pour minimiser l'impact sur votre activité.",
  },
  {
    question: "Quel est le rôle d'EnvironnementCEE.fr ?",
    answer: "EnvironnementCEE.fr est un intermédiaire privé qui facilite vos démarches CEE. Nous ne sommes pas un organisme public mais nous vous accompagnons dans la constitution du dossier, la mise en relation avec des professionnels RGE et des obligés CEE. Les aides proviennent du dispositif public des Certificats d'Économies d'Énergie.",
  },
];

export const FAQSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="mb-4 text-foreground">Questions fréquentes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur les Certificats d'Économies d'Énergie pour l'éclairage LED
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 shadow-sm hover:shadow-elegant transition-smooth"
              >
                <AccordionTrigger className="text-left text-foreground font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
