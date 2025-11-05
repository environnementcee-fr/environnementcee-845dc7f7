import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Building, 
  Shield, 
  Euro, 
  CheckCircle, 
  TrendingUp,
  FileSearch,
  Handshake,
  ArrowRight
} from "lucide-react";

const TrouverArtisan = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Trouvez l'artisan idéal pour votre projet | EnvironnementCEE.fr</title>
        <meta 
          name="description" 
          content="Mettez-vous en relation avec des artisans qualifiés pour tous vos travaux. Service gratuit pour les clients." 
        />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Trouvez l'artisan idéal pour votre projet de rénovation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Mettez-vous en relation avec des artisans qualifiés et bénéficiez d'un accompagnement personnalisé
            </p>
          </div>
        </div>
      </section>

      {/* Two Column Section: Clients & Artisans */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Colonne Client */}
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Vous avez un projet ?</CardTitle>
                <CardDescription>
                  Service gratuit pour les particuliers et professionnels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">100% gratuit</p>
                      <p className="text-sm text-muted-foreground">
                        Aucun frais pour déposer votre projet
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Artisans qualifiés</p>
                      <p className="text-sm text-muted-foreground">
                        Des professionnels vérifiés et expérimentés
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Accompagnement personnalisé</p>
                      <p className="text-sm text-muted-foreground">
                        Support et conseil tout au long de votre projet
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full gap-2" 
                  onClick={() => navigate("/deposer-un-projet")}
                >
                  Déposer mon projet
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => navigate("/annuaire-artisans")}
                >
                  Consulter l'annuaire
                </Button>
              </CardContent>
            </Card>

            {/* Colonne Artisan */}
            <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-all">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Building className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl">Vous êtes artisan ?</CardTitle>
                <CardDescription>
                  Développez votre activité avec des leads qualifiés
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Leads qualifiés</p>
                      <p className="text-sm text-muted-foreground">
                        Projets matchés selon votre zone et métier
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Euro className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Paiement simple</p>
                      <p className="text-sm text-muted-foreground">
                        Abonnement mensuel sans engagement
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Support professionnel</p>
                      <p className="text-sm text-muted-foreground">
                        Assistance pour développer votre activité
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="w-full gap-2"
                  onClick={() => navigate("/artisan/inscription")}
                >
                  S'inscrire artisan
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/login")}
                >
                  J'ai déjà un compte
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un processus simple en 3 étapes pour mettre en relation clients et artisans
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileSearch className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>1. Décrivez votre projet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Remplissez un formulaire en 2 minutes avec les détails de vos travaux
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>2. Recevez des propositions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Des artisans qualifiés de votre région vous contactent avec leurs devis
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Handshake className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>3. Choisissez votre artisan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Comparez les propositions et sélectionnez l'artisan qui vous convient
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrouverArtisan;
