import { FormLayout } from "@/components/FormLayout";
import { LeadFormPart } from "@/components/forms/LeadFormPart";

const DemandeParticulier = () => {
  return (
    <FormLayout
      title="Votre demande d'aide"
      breadcrumbs={[
        { label: "Accueil", path: "/" },
        { label: "Particuliers", path: "/particuliers" },
        { label: "Demande d'aide" }
      ]}
    >
      <LeadFormPart />
    </FormLayout>
  );
};

export default DemandeParticulier;