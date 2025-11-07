import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Home, 
  Lightbulb, 
  Wind, 
  Droplet, 
  Sun, 
  Fan,
  Network,
  ArrowRight
} from "lucide-react";

interface Aid {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  badge?: string;
}

const aids: Aid[] = [
  {
    id: "isolation",
    title: "Isolation",
    description: "Combles, murs, planchers - MaPrimeRénov' + CEE",
    icon: <Home className="h-10 w-10 text-primary" />,
    path: "/particulier/isolation",
    badge: "Jusqu'à 90% financé"
  },
  {
    id: "pac",
    title: "Pompe à Chaleur",
    description: "Chauffage économique et écologique - MPR + CEE Coup de Pouce",
    icon: <Wind className="h-10 w-10 text-primary" />,
    path: "/particulier/pac",
    badge: "Jusqu'à 9 000€"
  },
  {
    id: "panneaux_solaires",
    title: "Panneaux Solaires",
    description: "Autoconsommation + Prime + Obligation d'achat",
    icon: <Sun className="h-10 w-10 text-primary" />,
    path: "/ma-prime-renov",
    badge: "Nouveau"
  },
  {
    id: "fenetres",
    title: "Fenêtres Double Vitrage",
    description: "MaPrimeRénov' (modestes) + CEE",
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    path: "/ma-prime-renov",
    badge: "Jusqu'à 100€/fenêtre"
  },
  {
    id: "ventilation",
    title: "Ventilation VMC",
    description: "VMC double flux - MaPrimeRénov' + CEE",
    icon: <Fan className="h-10 w-10 text-primary" />,
    path: "/ma-prime-renov",
    badge: "Jusqu'à 4 500€"
  },
  {
    id: "chauffe_eau_thermo",
    title: "Chauffe-eau Thermodynamique",
    description: "MaPrimeRénov' + CEE",
    icon: <Droplet className="h-10 w-10 text-primary" />,
    path: "/ma-prime-renov",
    badge: "Jusqu'à 1 350€"
  },
  {
    id: "chauffe_eau_solaire",
    title: "Chauffe-eau Solaire",
    description: "MaPrimeRénov' + CEE",
    icon: <Sun className="h-10 w-10 text-primary" />,
    path: "/ma-prime-renov",
    badge: "Jusqu'à 4 180€"
  },
  {
    id: "brasseur_air",
    title: "Brasseur d'Air",
    description: "CEE si hauteur sous plafond > 4m",
    icon: <Fan className="h-10 w-10 text-primary" />,
    path: "/particulier/brasseur-air"
  },
  {
    id: "reseau_chaleur",
    title: "Raccordement Réseau de Chaleur",
    description: "MaPrimeRénov' + CEE",
    icon: <Network className="h-10 w-10 text-primary" />,
    path: "/ma-prime-renov",
    badge: "Jusqu'à 2 000€"
  },
];

const SimulationParticuliers = () => {
  return (
    <div className="min-h-screen">
      <title>Simulation Aides Particuliers - EnvironnementCEE.fr</title>
      
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6 text-foreground">
              Aides pour les Particuliers
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Découvrez toutes les aides disponibles pour vos travaux de rénovation énergétique. 
              MaPrimeRénov', CEE, Éco-PTZ... Jusqu'à 100% de financement possible.
            </p>
          </div>
        </div>
      </section>

      {/* Grid des aides */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {aids.map((aid) => (
              <Link key={aid.id} to={aid.path}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      {aid.icon}
                      {aid.badge && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-semibold">
                          {aid.badge}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-xl">{aid.title}</CardTitle>
                    <CardDescription className="text-base">
                      {aid.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group">
                      Tester mon éligibilité
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Vous ne savez pas quelle aide choisir ?
            </h2>
            <p className="text-muted-foreground mb-6">
              Nos conseillers vous accompagnent gratuitement dans le choix des aides 
              les plus adaptées à votre situation et votre projet.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">
                Être rappelé par un conseiller
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Pourquoi réaliser vos travaux maintenant ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Cumul d'aides maximal</h3>
              <p className="text-sm text-muted-foreground">
                MaPrimeRénov' + CEE + Éco-PTZ + TVA réduite
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📉</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Économies immédiates</h3>
              <p className="text-sm text-muted-foreground">
                Réduisez votre facture énergétique de 30% à 70%
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Valorisation du bien</h3>
              <p className="text-sm text-muted-foreground">
                Augmentez la valeur de votre logement (+15% en moyenne)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimulationParticuliers;
