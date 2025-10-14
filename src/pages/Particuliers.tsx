import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Thermometer, Fan, Droplets } from "lucide-react";

const Particuliers = () => {
  const aides = [
    {
      icon: Layers,
      title: "Isolation de votre logement",
      description: "Murs, combles, planchers : réduisez vos déperditions thermiques",
      path: "/particulier/isolation",
      tag: "Économies immédiates"
    },
    {
      icon: Thermometer,
      title: "Pompe à Chaleur",
      description: "Chauffage et eau chaude sanitaire économiques et écologiques",
      path: "/particulier/pac",
      tag: "Jusqu'à 10 000€ d'aide"
    },
    {
      icon: Fan,
      title: "Brasseur d'Air",
      description: "Optimisez le confort thermique été comme hiver",
      path: "/particulier/brasseur-air",
      tag: "Confort optimal"
    },
    {
      icon: Droplets,
      title: "Housse Piscine Flottante",
      description: "Conservez la chaleur de votre piscine et économisez l'eau",
      path: "/particulier/housse-piscine",
      tag: "Éco-responsable"
    },
  ];

  return (
    <div className="min-h-screen">
      <title>Aides pour Particuliers - EnvironnementCEE.fr</title>
      
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6 text-foreground">
              Rénovez votre logement et économisez avec les aides publiques
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Propriétaires, bailleurs : profitez des Certificats d'Économies d'Énergie (CEE) et autres aides pour financer vos travaux.
            </p>
            <Button asChild size="lg" className="shadow-lg">
              <Link to="/simulation">
                Tester mon éligibilité
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Aides disponibles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12 text-foreground">Nos solutions pour particuliers</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {aides.map((aide, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-smooth border-2 hover:border-primary cursor-pointer"
              >
                <Link to={aide.path}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <aide.icon className="h-10 w-10 text-primary group-hover:scale-110 transition-smooth" />
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" />
                    </div>
                    <div className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mb-2">
                      {aide.tag}
                    </div>
                    <CardTitle className="text-xl">{aide.title}</CardTitle>
                    <CardDescription>{aide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      En savoir plus
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-primary-foreground">Réduisez votre facture énergétique dès maintenant</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Un conseiller dédié vous accompagne gratuitement pour monter votre dossier et maximiser vos aides.
            </p>
            <Button asChild size="lg" variant="secondary" className="shadow-lg">
              <Link to="/simulation">Faire ma simulation gratuite</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Particuliers;
