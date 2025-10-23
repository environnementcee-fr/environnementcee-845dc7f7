import { ParticulierMultiForm } from "@/components/forms/ParticulierMultiForm";

const Particuliers = () => {
  return (
    <div className="min-h-screen">
      <title>Aides pour Particuliers - EnvironnementCEE.fr</title>

      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-foreground">Rénovez votre logement et économisez avec les aides publiques</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Isolation, pompe à chaleur, panneaux solaires... Profitez des aides CEE et MaPrimeRénov' pour financer vos travaux.
            </p>
          </div>
        </div>
      </section>

      {/* Formulaire Unique */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Testez votre éligibilité aux aides</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complétez ce formulaire en quelques minutes pour découvrir les aides disponibles pour votre projet
            </p>
          </div>
          <ParticulierMultiForm />
        </div>
      </section>
    </div>
  );
};

export default Particuliers;
