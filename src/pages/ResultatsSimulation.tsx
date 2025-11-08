import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  TrendingUp, 
  Wallet, 
  Download, 
  Phone, 
  Mail,
  ArrowRight,
  Euro,
  Award,
  Home,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface Aid {
  name: string;
  type: string;
  amount: number | string;
  description?: string;
}

interface SimulationResults {
  eligibility_score: number;
  estimated_aids: {
    mpr?: number;
    cee?: number;
    ecoptz?: number | string;
    tva?: string;
    credit_impot_pme?: string;
  };
  mpr_category?: string;
  user_type: 'particulier' | 'professionnel';
  aid_type: string;
  first_name?: string;
  estimated_cost?: number;
}

const ResultatsSimulation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<SimulationResults | null>(null);

  useEffect(() => {
    // Récupérer les résultats depuis l'état de navigation
    if (location.state?.results) {
      setResults(location.state.results);
    } else {
      // Si pas de données, rediriger vers simulation
      navigate('/simulation');
    }
  }, [location, navigate]);

  if (!results) {
    return null;
  }

  const aids: Aid[] = [];
  let totalAids = 0;

  // Construire la liste des aides
  if (results.estimated_aids.mpr) {
    aids.push({
      name: "MaPrimeRénov'",
      type: "MPR",
      amount: results.estimated_aids.mpr,
      description: results.mpr_category ? `Catégorie ${results.mpr_category.toUpperCase()}` : undefined
    });
    totalAids += results.estimated_aids.mpr;
  }

  if (results.estimated_aids.cee) {
    aids.push({
      name: "Prime CEE",
      type: "CEE",
      amount: results.estimated_aids.cee,
      description: results.user_type === 'particulier' ? "Certificats d'Économies d'Énergie" : "Prime CEE Entreprise"
    });
    totalAids += results.estimated_aids.cee;
  }

  if (results.estimated_aids.ecoptz) {
    aids.push({
      name: "Éco-PTZ",
      type: "ECOPTZ",
      amount: results.estimated_aids.ecoptz,
      description: "Prêt à taux zéro"
    });
  }

  if (results.estimated_aids.tva) {
    aids.push({
      name: "TVA Réduite",
      type: "TVA",
      amount: results.estimated_aids.tva,
      description: "Taux réduit 5,5%"
    });
  }

  if (results.estimated_aids.credit_impot_pme) {
    aids.push({
      name: "Crédit d'impôt PME",
      type: "FISCAL",
      amount: results.estimated_aids.credit_impot_pme,
      description: "Déduction fiscale"
    });
  }

  const estimatedCost = results.estimated_cost || 15000;
  const resteACharge = Math.max(0, estimatedCost - totalAids);
  const financementPercent = Math.round((totalAids / estimatedCost) * 100);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: "Excellent", variant: "default" as const };
    if (score >= 60) return { label: "Bon", variant: "secondary" as const };
    if (score >= 40) return { label: "Moyen", variant: "outline" as const };
    return { label: "Faible", variant: "destructive" as const };
  };

  const scoreBadge = getScoreBadge(results.eligibility_score);

  return (
    <>
      <Helmet>
        <title>Résultats de votre simulation | EnvironnementCEE</title>
        <meta name="description" content="Découvrez vos aides disponibles et votre éligibilité aux primes CEE et MaPrimeRénov'" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              {results.user_type === 'particulier' ? (
                <Home className="w-8 h-8 text-primary" />
              ) : (
                <Building2 className="w-8 h-8 text-primary" />
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {results.first_name ? `${results.first_name}, v` : "V"}os résultats de simulation
            </h1>
            <p className="text-xl text-muted-foreground">
              Découvrez les aides auxquelles vous êtes éligible
            </p>
          </motion.div>

          {/* Score d'éligibilité */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="mb-8 border-2 bg-gradient-to-br from-card to-muted/20">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                  <Award className="w-8 h-8 text-primary" />
                  Score d'éligibilité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className={`text-7xl font-bold ${getScoreColor(results.eligibility_score)}`}>
                      {results.eligibility_score}
                      <span className="text-4xl">/100</span>
                    </div>
                    <Badge className="absolute -top-2 -right-16" variant={scoreBadge.variant}>
                      {scoreBadge.label}
                    </Badge>
                  </div>
                  <Progress value={results.eligibility_score} className="w-full max-w-md h-3" />
                  <p className="text-center text-muted-foreground max-w-md">
                    Votre projet est {results.eligibility_score >= 60 ? "éligible" : "partiellement éligible"} aux aides financières pour la rénovation énergétique
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Résumé financier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Aides totales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {totalAids.toLocaleString()} €
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Montant cumulé des aides
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Euro className="w-5 h-5 text-green-600" />
                  Financement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {financementPercent}%
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  De votre projet financé
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-orange-600" />
                  Reste à charge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">
                  {resteACharge.toLocaleString()} €
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Après déduction des aides
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Liste des aides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              Vos aides disponibles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {aids.map((aid, index) => (
                <motion.div
                  key={aid.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-1">{aid.name}</CardTitle>
                          {aid.description && (
                            <CardDescription>{aid.description}</CardDescription>
                          )}
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          {aid.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">
                        {typeof aid.amount === 'number' 
                          ? `${aid.amount.toLocaleString()} €`
                          : aid.amount
                        }
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background">
              <CardHeader>
                <CardTitle className="text-2xl">Prochaines étapes</CardTitle>
                <CardDescription>
                  Concrétisez votre projet avec l'aide de nos experts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button size="lg" className="w-full group" asChild>
                    <a href="/contact">
                      <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                      Être rappelé gratuitement
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full group">
                    <Download className="mr-2 h-5 w-5" />
                    Télécharger le récapitulatif
                  </Button>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>contact@environnementcee.fr</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>01 XX XX XX XX</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Informations supplémentaires */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            <p>
              * Ces montants sont des estimations basées sur les informations fournies.
              Le montant final sera déterminé après étude détaillée de votre dossier par nos experts.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ResultatsSimulation;
