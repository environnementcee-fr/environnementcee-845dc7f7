import { useState } from "react";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { getTravauxById } from "@/data/travauxCatalog";
import IsolationForm from "@/components/forms/IsolationForm";
import { LEDBureauForm } from "@/components/forms/LEDBureauForm";
import { LEDEntrepotForm } from "@/components/forms/LEDEntrepotForm";
import { LEDSolaireForm } from "@/components/forms/LEDSolaireForm";
import { BrasseurAirForm } from "@/components/forms/BrasseurAirForm";
import HPFlottanteForm from "@/components/forms/HPFlottanteForm";

const AidesPro = () => {
  const [selectedAid, setSelectedAid] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCardClick = (aidId: string) => {
    setSelectedAid(aidId);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setTimeout(() => setSelectedAid(null), 300);
  };

  const renderForm = () => {
    if (!selectedAid) return null;

    switch (selectedAid) {
      case "led_bureaux":
        return <LEDBureauForm />;
      case "led_entrepot":
        return <LEDEntrepotForm />;
      case "led_ext_solaire":
        return <LEDSolaireForm />;
      case "isolation_murs":
        return <IsolationForm userType="professionnel" />;
      case "brasseur_air":
        return <BrasseurAirForm />;
      case "hp_flottante":
        return <HPFlottanteForm />;
      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Formulaire en cours de développement.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Contactez-nous pour ce type de travaux.
            </p>
          </div>
        );
    }
  };

  const selectedTravaux = selectedAid ? getTravauxById(selectedAid) : null;

  return (
    <div className="min-h-screen">
      <title>Aides Professionnels - EnvironnementCEE.fr</title>

      {/* Hero */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-foreground">Choisissez votre type de travaux</h1>
            <p className="text-xl text-muted-foreground">
              Solutions CEE et financement pour vos projets d'efficacité énergétique
            </p>
          </div>
        </div>
      </section>

      {/* Grille des aides */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <CategoryGrid segment="pro" onCardClick={handleCardClick} />
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Besoin d'un accompagnement personnalisé ?</p>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                Contacter un expert
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sheet Modal pour les formulaires */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{selectedTravaux?.label}</SheetTitle>
            <SheetDescription>{selectedTravaux?.description}</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            {renderForm()}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AidesPro;
