import { useState } from "react";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { getTravauxById } from "@/data/travauxCatalog";
import IsolationForm from "@/components/forms/IsolationForm";
import PACForm from "@/components/forms/PACForm";

const AidesParticulier = () => {
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
      case "isolation_murs_part":
      case "isolation_toiture":
        return <IsolationForm userType="particulier" />;
      case "pac_part":
        return <PACForm />;
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
      <title>Aides Particuliers - EnvironnementCEE.fr</title>

      {/* Hero */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-foreground">Choisissez votre type de travaux</h1>
            <p className="text-xl text-muted-foreground">
              Découvrez les aides disponibles pour votre projet de rénovation énergétique
            </p>
          </div>
        </div>
      </section>

      {/* Grille des aides */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <CategoryGrid segment="part" onCardClick={handleCardClick} />
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Besoin d'aide pour choisir ?</p>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                Parler à un conseiller
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

export default AidesParticulier;
