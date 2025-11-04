import { Helmet } from "react-helmet";
import HPFlottanteForm from "@/components/forms/HPFlottanteForm";

const HPFlottante = () => {
  return (
    <>
      <Helmet>
        <title>HP Flottante - Régulateur Chambre Froide | Aide CEE | Hello-Travaux</title>
        <meta 
          name="description" 
          content="Optimisez vos chambres froides avec un régulateur HP Flottante. Jusqu'à 20% d'économies d'énergie. Aide CEE disponible pour les professionnels. Testez votre éligibilité." 
        />
      </Helmet>
      
      <div className="min-h-screen">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <HPFlottanteForm />
          </div>
        </section>
      </div>
    </>
  );
};

export default HPFlottante;
