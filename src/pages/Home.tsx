import { ArrowRight, Building2, Home as HomeIcon, CheckCircle, Users, FileText, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/hero-led-office.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags */}
      <title>EnvironnementCEE.fr - Toutes vos aides écologiques et CEE sur une plateforme</title>
      
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4" />
              <span>Plateforme certifiée et sécurisée</span>
            </div>
            
            <h1 className="mb-6 text-foreground">
              Toutes vos aides écologiques et CEE réunies sur une seule plateforme
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Que vous soyez professionnel ou particulier, bénéficiez d'un accompagnement personnalisé pour financer votre transition énergétique jusqu'à 100%.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg h-14 shadow-lg">
                <Link to="/simulation">
                  Tester mon éligibilité
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-14">
                <Link to="/qui-sommes-nous">En savoir plus</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Solutions - Choix Pro/Particuliers */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="mb-4 text-foreground">Nos solutions adaptées à votre profil</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choisissez votre parcours pour découvrir les aides qui vous correspondent
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Button Professionnels */}
            <Link to="/professionnels" className="group">
              <div className="relative h-32 rounded-3xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-4 px-8">
                  <Building2 className="h-10 w-10 text-white flex-shrink-0" />
                  <span className="text-3xl font-bold text-white">Je suis professionnel</span>
                </div>
              </div>
            </Link>

            {/* Button Particuliers */}
            <Link to="/particuliers" className="group">
              <div className="relative h-32 rounded-3xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-4 px-8">
                  <HomeIcon className="h-10 w-10 text-white flex-shrink-0" />
                  <span className="text-3xl font-bold text-white">Je suis particulier</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Notre Rôle */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-foreground">Notre rôle</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              <strong className="text-foreground">EnvironnementCEE.fr</strong> est un <strong>intermédiaire privé</strong> spécialisé dans la mise en relation entre bénéficiaires d'aides CEE et installateurs certifiés RGE.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-primary/20 hover:border-primary transition-smooth">
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Accompagnement personnalisé</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Un conseiller dédié vous guide à chaque étape</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-primary/20 hover:border-primary transition-smooth">
                <CardHeader>
                  <Award className="h-10 w-10 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Partenaires RGE</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Réseau d'installateurs certifiés et qualifiés</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-primary/20 hover:border-primary transition-smooth">
                <CardHeader>
                  <FileText className="h-10 w-10 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Financement jusqu'à 100%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Prise en charge maximale de vos travaux</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12 text-foreground">Ils nous font confiance</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">PME Industrielle</CardTitle>
                    <CardDescription>Secteur manufacturier</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">
                  "Grâce aux aides CEE, nous avons renouvelé tout notre éclairage LED sans investissement. Un accompagnement professionnel et efficace."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <HomeIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Famille Martin</CardTitle>
                    <CardDescription>Propriétaires</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">
                  "Isolation + pompe à chaleur financées à 95% ! Notre facture énergétique a été divisée par deux. Merci EnvironnementCEE.fr."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Collectivité Locale</CardTitle>
                    <CardDescription>Mairie 5000 habitants</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">
                  "Équipement complet de nos bâtiments publics en LED. Procédure simple, équipe réactive, résultat impeccable."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
