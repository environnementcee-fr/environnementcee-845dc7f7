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
  Building2,
  AlertCircle
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
    mpr?: number | { eligible: boolean; montant: number; details: string };
    cee?: number | { eligible: boolean; montant: number; details: string };
    ecoptz?: number | string | { eligible: boolean; montant: number; details: string };
    eco_ptz?: number | string | { eligible: boolean; montant: number; details: string };
    tva?: string | { eligible: boolean; details: string };
    tva_reduite?: string | { eligible: boolean; details: string };
    credit_impot_pme?: string | number | { eligible: boolean; montant: number; details: string };
    credit_impot?: string | number | { eligible: boolean; montant: number; details: string };
    [key: string]: any;
  };
  mpr_category?: string;
  user_type: 'particulier' | 'professionnel';
  aid_type: string;
  first_name?: string;
  estimated_cost?: number;
  total_aides_estimees?: number;
  travaux_selectionnes?: string[];
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
  const subventions: Aid[] = [];
  const prets: Aid[] = [];
  const avantagesFiscaux: Aid[] = [];
  let totalAids = 0;

  // Helper function to extract amount from aid (handles both flat and nested formats)
  const extractAmount = (aid: any): number => {
    if (typeof aid === 'number') return aid;
    if (typeof aid === 'object' && aid !== null && 'montant' in aid) return aid.montant;
    return 0;
  };

  // Construire la liste des aides par catégorie
  if (results.estimated_aids.mpr) {
    const mprAmount = extractAmount(results.estimated_aids.mpr);
    if (mprAmount > 0) {
      const aide = {
        name: "MaPrimeRénov'",
        type: "MPR",
        amount: mprAmount,
        description: results.mpr_category ? `Catégorie ${results.mpr_category.toUpperCase()}` : undefined
      };
      subventions.push(aide);
      aids.push(aide);
      totalAids += mprAmount;
    }
  }

  if (results.estimated_aids.cee) {
    const ceeAmount = extractAmount(results.estimated_aids.cee);
    if (ceeAmount > 0) {
      const aide = {
        name: "Prime CEE",
        type: "CEE",
        amount: ceeAmount,
        description: results.user_type === 'particulier' ? "Certificats d'Économies d'Énergie" : "Prime CEE Entreprise"
      };
      subventions.push(aide);
      aids.push(aide);
      totalAids += ceeAmount;
    }
  }

  if (results.estimated_aids.ecoptz || results.estimated_aids.eco_ptz) {
    const ecoptzAmount = extractAmount(results.estimated_aids.ecoptz || results.estimated_aids.eco_ptz);
    if (ecoptzAmount > 0) {
      const aide = {
        name: "Éco-PTZ",
        type: "ECOPTZ",
        amount: ecoptzAmount,
        description: "Prêt à taux zéro"
      };
      prets.push(aide);
      aids.push(aide);
    }
  }

  if (results.estimated_aids.tva || results.estimated_aids.tva_reduite) {
    const tvaData = results.estimated_aids.tva || results.estimated_aids.tva_reduite;
    const aide = {
      name: "TVA Réduite",
      type: "TVA",
      amount: typeof tvaData === 'string' ? tvaData : "Taux réduit 5,5%",
      description: "Taux réduit 5,5%"
    };
    avantagesFiscaux.push(aide);
    aids.push(aide);
  }

  if (results.estimated_aids.credit_impot_pme || results.estimated_aids.credit_impot) {
    const creditAmount = extractAmount(results.estimated_aids.credit_impot_pme || results.estimated_aids.credit_impot);
    if (creditAmount > 0) {
      const aide = {
        name: "Crédit d'impôt PME",
        type: "FISCAL",
        amount: creditAmount,
        description: "Déduction fiscale"
      };
      avantagesFiscaux.push(aide);
      aids.push(aide);
    }
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

          {/* Bandeau ESTIMATION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-8"
          >
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <p className="font-semibold text-amber-900">Estimation préliminaire</p>
              </div>
              <p className="text-sm text-amber-800">
                Ces montants sont des estimations basées sur vos réponses. 
                Un conseiller vous contactera sous 48h pour confirmer votre éligibilité 
                finale après étude de votre dossier complet.
              </p>
            </div>
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

          {/* Conditions d'éligibilité vérifiées */}
          {results.user_type === 'particulier' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    Conditions d'éligibilité vérifiées
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {results.mpr_category && results.mpr_category !== 'rose' && (
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        <div>
                          <p className="font-semibold text-green-900">
                            Catégorie MaPrimeRénov' : {results.mpr_category.toUpperCase()}
                          </p>
                          <p className="text-sm text-green-700">
                            Vos revenus vous permettent d'accéder aux aides MaPrimeRénov'
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                      <div>
                        <p className="font-semibold text-blue-900">Logement de plus de 15 ans</p>
                        <p className="text-sm text-blue-700">
                          Condition nécessaire pour MaPrimeRénov' (sauf remplacement chaudière fioul)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                      <div>
                        <p className="font-semibold text-purple-900">Artisan RGE obligatoire</p>
                        <p className="text-sm text-purple-700">
                          Les travaux doivent être réalisés par un professionnel certifié RGE
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Récapitulatif du projet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.27 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>📋 Récapitulatif de votre projet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Type de travaux</p>
                    {results.aid_type === 'renovation_globale' && results.travaux_selectionnes ? (
                      <div className="space-y-1">
                        <p className="font-semibold">Rénovation Globale</p>
                        <p className="text-sm text-muted-foreground">
                          {results.travaux_selectionnes.length} types de travaux sélectionnés
                        </p>
                      </div>
                    ) : (
                      <p className="font-semibold">{results.aid_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Profil</p>
                    <p className="font-semibold">
                      {results.user_type === 'particulier' ? 'Particulier' : 'Professionnel'}
                    </p>
                  </div>
                  {results.total_aides_estimees && results.aid_type === 'renovation_globale' && (
                    <div className="col-span-2 pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-1">Montant estimé du projet</p>
                      <p className="text-2xl font-bold text-primary">
                        {results.total_aides_estimees.toLocaleString()} €
                      </p>
                    </div>
                  )}
                </div>
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

            {/* Subventions */}
            {subventions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  💰 Subventions directes
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {subventions.map((aid, index) => (
                    <Card key={aid.name} className="hover:shadow-lg transition-shadow">
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
                  ))}
                </div>
              </div>
            )}

            {/* Prêts */}
            {prets.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  🏦 Prêts sans intérêts
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {prets.map((aid, index) => (
                    <Card key={aid.name} className="hover:shadow-lg transition-shadow border-blue-200">
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
                        <div className="text-3xl font-bold text-blue-600">
                          {typeof aid.amount === 'number' 
                            ? `jusqu'à ${aid.amount.toLocaleString()} €`
                            : aid.amount
                          }
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Avantages fiscaux */}
            {avantagesFiscaux.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  📊 Avantages fiscaux
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {avantagesFiscaux.map((aid, index) => (
                    <Card key={aid.name} className="hover:shadow-lg transition-shadow border-purple-200">
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
                        <div className="text-2xl font-bold text-purple-600">
                          {typeof aid.amount === 'number' 
                            ? `${aid.amount.toLocaleString()} €`
                            : aid.amount
                          }
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>💡 Bon à savoir :</strong> Ces aides sont <strong>cumulables</strong> et peuvent être combinées pour maximiser le financement de votre projet.
              </p>
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
