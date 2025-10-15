import { Helmet } from "react-helmet";
import HPFlottanteForm from "@/components/forms/HPFlottanteForm";

const HPFlottante = () => {
  return (
    <>
      <Helmet>
        <title>HP Flottante - Régulateur Chambre Froide | Aide CEE | EnvironnementCEE.fr</title>
        <meta 
          name="description" 
          content="Optimisez vos chambres froides avec un régulateur HP Flottante. Jusqu'à 20% d'économies d'énergie. Aide CEE disponible pour les professionnels. Testez votre éligibilité." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <HPFlottanteForm />
      </div>
    </>
  );
};

export default HPFlottante;
