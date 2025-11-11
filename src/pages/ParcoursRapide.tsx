import { FormLayout } from "@/components/FormLayout";
import { RenovationGlobaleForm } from "@/components/forms/RenovationGlobaleForm";

const ParcoursRapide = () => {
  return (
    <FormLayout
      title="Parcours Rapide - Rénovation Globale"
      breadcrumbs={[
        { label: "Accueil", path: "/" },
        { label: "Parcours Rapide" }
      ]}
    >
      <div className="mb-8 text-center">
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Vous envisagez plusieurs travaux de rénovation énergétique ? 
          Ce parcours rapide vous permet d'obtenir une estimation globale des aides disponibles 
          en remplissant un seul formulaire complet.
        </p>
      </div>
      <RenovationGlobaleForm />
    </FormLayout>
  );
};

export default ParcoursRapide;
