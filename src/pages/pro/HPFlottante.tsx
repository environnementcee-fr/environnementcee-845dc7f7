import { Helmet } from "react-helmet";
import HPFlottanteForm from "@/components/forms/HPFlottanteForm";
import { StickyCTA } from "@/components/StickyCTA";

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
      
      <StickyCTA targetId="eligibility-form" estimatedTime="2 min" />
      
      <div className="min-h-screen">
        <section id="eligibility-form" className="py-16">
          <div className="container mx-auto px-4">
            <HPFlottanteForm />
          </div>
        </section>
      </div>
    </>
  );
};

export default HPFlottante;
