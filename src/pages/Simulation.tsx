import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  Warehouse, 
  Building2, 
  Sun, 
  Layers, 
  Thermometer, 
  Fan, 
  Droplets 
} from "lucide-react";

type UserFilter = "tous" | "particulier" | "professionnel";

interface Aid {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  userTypes: ("particulier" | "professionnel")[];
}

const aids: Aid[] = [
  {
    id: "led-entrepot",
    title: "LED Entrepôt",
    description: "Éclairage LED haute performance pour entrepôts et zones industrielles",
    icon: Warehouse,
    path: "/pro/led-entrepot",
    userTypes: ["professionnel"],
  },
  {
    id: "led-bureau",
    title: "LED Bureau",
    description: "Éclairage LED économique pour bureaux et espaces tertiaires",
    icon: Building2,
    path: "/pro/led-bureau",
    userTypes: ["professionnel"],
  },
  {
    id: "led-solaire",
    title: "LED Solaire",
    description: "Éclairage autonome solaire pour espaces extérieurs",
    icon: Sun,
    path: "/pro/led-solaire",
    userTypes: ["professionnel"],
  },
  {
    id: "isolation",
    title: "Isolation",
    description: "Isolation thermique des murs, combles et planchers",
    icon: Layers,
    path: "/particulier/isolation",
    userTypes: ["particulier", "professionnel"],
  },
  {
    id: "pac",
    title: "Pompe à Chaleur",
    description: "Chauffage et climatisation haute efficacité",
    icon: Thermometer,
    path: "/particulier/pac",
    userTypes: ["particulier", "professionnel"],
  },
  {
    id: "brasseur-air",
    title: "Brasseur d'Air",
    description: "Optimisation du confort thermique dans les grands volumes",
    icon: Fan,
    path: "/particulier/brasseur-air",
    userTypes: ["particulier", "professionnel"],
  },
  {
    id: "housse-piscine",
    title: "Housse Piscine",
    description: "Couverture isothermique pour conservation de chaleur",
    icon: Droplets,
    path: "/particulier/housse-piscine",
    userTypes: ["particulier"],
  },
];

const Simulation = () => {
  const [filter, setFilter] = useState<UserFilter>("tous");

  const filteredAids = aids.filter((aid) => {
    if (filter === "tous") return true;
    return aid.userTypes.includes(filter);
  });

  return (
    <div className="min-h-screen py-20 bg-card">
      <title>Choisissez votre aide - EnvironnementCEE.fr</title>
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="mb-4 text-foreground">Quelle aide recherchez-vous ?</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Sélectionnez l'aide qui correspond à votre projet et testez votre éligibilité en 2 minutes
          </p>

          {/* Filter Buttons */}
          <div className="flex gap-3 justify-center flex-wrap">
            <Button
              variant={filter === "tous" ? "default" : "outline"}
              onClick={() => setFilter("tous")}
            >
              Toutes les aides
            </Button>
            <Button
              variant={filter === "particulier" ? "default" : "outline"}
              onClick={() => setFilter("particulier")}
            >
              Particulier
            </Button>
            <Button
              variant={filter === "professionnel" ? "default" : "outline"}
              onClick={() => setFilter("professionnel")}
            >
              Professionnel
            </Button>
          </div>
        </div>

        {/* Aids Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredAids.map((aid) => {
            const Icon = aid.icon;
            return (
              <Card 
                key={aid.id} 
                className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="h-10 w-10 text-primary" />
                    <div className="flex gap-2 flex-wrap">
                      {aid.userTypes.map((type) => (
                        <Badge key={type} variant="secondary" className="text-xs">
                          {type === "particulier" ? "Particulier" : "Professionnel"}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{aid.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {aid.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to={aid.path}>
                      Tester mon éligibilité
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Banner */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex gap-4 items-start">
                <Lightbulb className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    Vous ne savez pas quelle aide choisir ?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Nos conseillers vous orientent gratuitement vers les aides les plus adaptées à votre projet et vous accompagnent dans vos démarches.
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/contact">Être contacté par un conseiller</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
