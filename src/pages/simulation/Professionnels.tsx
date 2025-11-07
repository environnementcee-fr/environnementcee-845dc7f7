import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Lightbulb, 
  Sun, 
  Home, 
  Wind, 
  Fan,
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
    id: "led_bureau",
    title: "LED Bureau",
    description: "CEE + Crédit d'impôt PME 30%",
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    path: "/pro/led-bureau",
    badge: "Financement 100%"
  },
  {
    id: "led_entrepot",
    title: "LED Entrepôt",
    description: "CEE + Crédit d'impôt PME 30%",
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    path: "/pro/led-entrepot",
    badge: "Financement 100%"
  },
  {
    id: "led_solaire",
    title: "LED Solaire Extérieur",
    description: "CEE + Économies électricité",
    icon: <Sun className="h-10 w-10 text-primary" />,
    path: "/pro/led-solaire",
    badge: "Autonome"
  },
  {
    id: "isolation_pro",
    title: "Isolation Professionnelle",
    description: "CEE + Crédit d'impôt PME 30%",
    icon: <Home className="h-10 w-10 text-primary" />,
    path: "/pro/isolation",
    badge: "Jusqu'à 25€/m²"
  },
  {
    id: "pac_pro",
    title: "Pompe à Chaleur Industrielle",
    description: "CEE + Fonds Chaleur ADEME (>100kW)",
    icon: <Wind className="h-10 w-10 text-primary" />,
    path: "/pro/pac",
    badge: "150€/kW"
  },
  {
    id: "brasseur_air_pro",
    title: "Brasseurs d'Air Destratificateurs",
    description: "CEE si hauteur > 5m",
    icon: <Fan className="h-10 w-10 text-primary" />,
    path: "/pro/brasseur-air",
    badge: "5€/m²"
  },
  {
    id: "hp_flottante",
    title: "Housse de Piscine Flottante",
    description: "CEE - Économies chauffage piscine",
    icon: <Sun className="h-10 w-10 text-primary" />,
    path: "/pro/hp-flottante"
  },
  {
    id: "panneaux_pv_pro",
    title: "Panneaux Photovoltaïques Pro",
    description: "Prime autoconsommation + Amortissement fiscal",
    icon: <Sun className="h-10 w-10 text-primary" />,
    path: "/pro/led",
    badge: "Nouveau"
  },
];

const SimulationProfessionnels = () => {
  return (
    <div className="min-h-screen">
      <title>Simulation Aides Professionnels - EnvironnementCEE.fr</title>
      
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6 text-foreground">
              Aides pour les Professionnels
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Optimisez vos investissements énergétiques avec les Certificats d'Économies d'Énergie (CEE), 
              le crédit d'impôt PME 30% et les aides régionales. Financement jusqu'à 100% possible.
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
                      Obtenir un devis gratuit
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
              Un projet spécifique ou plusieurs aides à combiner ?
            </h2>
            <p className="text-muted-foreground mb-6">
              Nos experts vous accompagnent dans le montage de votre dossier de financement 
              et la sélection des artisans qualifiés.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">
                Demander un audit gratuit
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
            Les avantages pour votre entreprise
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Zéro investissement</h3>
              <p className="text-sm text-muted-foreground">
                CEE + Crédit impôt = 100% de financement possible
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">ROI immédiat</h3>
              <p className="text-sm text-muted-foreground">
                Économies d'énergie de 40% à 80% dès l'installation
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Avantages fiscaux</h3>
              <p className="text-sm text-muted-foreground">
                Déduction IS + amortissement exceptionnel
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
              Nos garanties
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Artisans certifiés RGE</h4>
                  <p className="text-sm text-muted-foreground">
                    Réseau d'installateurs qualifiés dans toute la France
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📋</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Montage de dossier inclus</h4>
                  <p className="text-sm text-muted-foreground">
                    Nous gérons toutes les démarches administratives
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔧</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">SAV et garantie</h4>
                  <p className="text-sm text-muted-foreground">
                    Garantie décennale + maintenance assurée
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">⏱️</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Délais maîtrisés</h4>
                  <p className="text-sm text-muted-foreground">
                    Installation rapide avec planification adaptée
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimulationProfessionnels;
