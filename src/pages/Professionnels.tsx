import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Building, Sun } from "lucide-react";
import { StickyCTA } from "@/components/StickyCTA";

const Professionnels = () => {
  const aides = [
    {
      icon: Lightbulb,
      title: "Éclairage LED Entrepôt",
      description: "Luminaires haute performance pour espaces de stockage et logistique",
      path: "/pro/led-entrepot",
      tag: "Jusqu'à 100% financé"
    },
    {
      icon: Building,
      title: "Éclairage LED Bureau",
      description: "Solutions d'éclairage professionnel pour espaces tertiaires",
      path: "/pro/led-bureau",
      tag: "Économies garanties"
    },
    {
      icon: Sun,
      title: "Éclairage LED Solaire",
      description: "Éclairage autonome et écologique pour extérieurs",
      path: "/pro/led-solaire",
      tag: "Autonome"
    },
  ];

  return (
    <div className="min-h-screen">
      <title>Aides CEE pour Professionnels - EnvironnementCEE.fr</title>
      
      <StickyCTA targetId="solutions-section" estimatedTime="2 min" />

      {/* Hero */}
      <section className="gradient-hero py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="mb-4 md:mb-6 text-foreground text-2xl md:text-4xl lg:text-5xl">
              Réduisez vos coûts énergétiques grâce aux aides CEE
            </h1>
            <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8">
              Entreprises, artisans, collectivités : bénéficiez d'un financement jusqu'à 100% pour vos travaux de rénovation énergétique.
            </p>
            <Button asChild size="lg" className="shadow-lg w-full sm:w-auto">
              <Link to="/simulation">
                Tester mon éligibilité
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Aides disponibles */}
      <section id="solutions-section" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-4 md:mb-6 text-foreground text-2xl md:text-3xl lg:text-4xl">Nos solutions pour professionnels</h2>
          <p className="text-center text-lg text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto">
            Sélectionnez la solution adaptée à vos besoins et testez votre éligibilité en 2 minutes
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
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
      <section className="py-12 md:py-16 gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4 md:mb-6 text-primary-foreground text-2xl md:text-3xl lg:text-4xl">Prêt à réduire vos factures énergétiques ?</h2>
            <p className="text-base md:text-lg text-primary-foreground/80 mb-6 md:mb-8">
              Nos conseillers analysent gratuitement votre éligibilité et vous accompagnent dans toutes vos démarches.
            </p>
            <Button asChild size="lg" variant="secondary" className="shadow-lg w-full sm:w-auto">
              <Link to="/simulation">Demander mon étude gratuite</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Professionnels;
