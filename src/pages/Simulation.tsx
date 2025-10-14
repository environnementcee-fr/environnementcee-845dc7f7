import { EligibilityForm } from "@/components/EligibilityForm";

const Simulation = () => {
  return (
    <div className="min-h-screen py-20 bg-card">
      <title>Testez votre éligibilité - EnvironnementCEE.fr</title>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="mb-4 text-foreground">Testez votre éligibilité</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complétez ce formulaire en 2 minutes pour savoir si vous êtes éligible aux aides CEE et connaître le montant de votre financement.
          </p>
        </div>
        <EligibilityForm />
      </div>
    </div>
  );
};

export default Simulation;
