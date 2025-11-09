import { FormLayout } from "@/components/FormLayout";
import { LeadFormPro } from "@/components/LeadFormPro";

const DeposerProjet = () => {
  return (
    <FormLayout
      title="Déposez votre projet professionnel"
      subtitle="Obtenez une étude gratuite et un accompagnement personnalisé pour vos travaux de rénovation énergétique"
      breadcrumbs={[
        { label: "Accueil", path: "/" },
        { label: "Professionnels", path: "/professionnels" },
        { label: "Déposer un projet" },
      ]}
    >
      <LeadFormPro />
    </FormLayout>
  );
};

export default DeposerProjet;
