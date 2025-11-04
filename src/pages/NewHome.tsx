import { ArrowRight, CheckCircle, Home as HomeIcon, Wrench, Users, Award, Shield, Euro } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StickyCTA } from "@/components/StickyCTA";

const NewHome = () => {
  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags */}
      <title>Trouvez l'artisan idéal pour votre projet de rénovation | Hello-Travaux</title>
      
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center gradient-hero overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 py-16">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 text-base px-6 py-2 bg-accent text-accent-foreground">
              Plateforme de mise en relation
            </Badge>
            
            <h1 className="mb-6 text-foreground">
              Trouvez l'artisan idéal pour votre projet de rénovation
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Comparez les devis, bénéficiez d'aides financières, réalisez vos travaux en toute sérénité
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="shadow-lg text-lg px-8 py-6 bg-accent hover:bg-accent/90">
                <Link to="/simulation">
                  Déposer mon projet gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-lg text-lg px-8 py-6">
                <Link to="/trouver-un-artisan">
                  Je suis un artisan
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Artisans certifiés RGE</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Devis gratuits</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Sans engagement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="mb-4 text-foreground">Comment ça marche ?</h2>
            <p className="text-lg text-muted-foreground">
              3 étapes simples pour trouver l'artisan idéal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center border-2 border-primary/20 hover:border-primary transition-smooth">
              <CardHeader>
                <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-primary">1</span>
                </div>
                <CardTitle className="text-xl">Décrivez votre projet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Remplissez notre formulaire en 2 minutes : type de travaux, budget, localisation
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-primary/20 hover:border-primary transition-smooth">
              <CardHeader>
                <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-primary">2</span>
                </div>
                <CardTitle className="text-xl">Recevez des devis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Jusqu'à 3 artisans qualifiés vous contactent avec des devis personnalisés
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-primary/20 hover:border-primary transition-smooth">
              <CardHeader>
                <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-primary">3</span>
                </div>
                <CardTitle className="text-xl">Choisissez et lancez</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comparez, choisissez l'artisan qui vous convient et démarrez vos travaux
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Types de travaux */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="mb-4 text-foreground">Tous vos projets de rénovation</h2>
            <p className="text-lg text-muted-foreground">
              Trouvez des artisans spécialisés pour tous types de travaux
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: "Isolation thermique", description: "Murs, combles, toiture", icon: "🏠" },
              { title: "Chauffage & PAC", description: "Pompe à chaleur, chaudière", icon: "🔥" },
              { title: "Éclairage LED", description: "Bureau, entrepôt, solaire", icon: "💡" },
              { title: "Menuiserie", description: "Fenêtres, portes, volets", icon: "🪟" },
              { title: "Ventilation", description: "VMC, brasseurs d'air", icon: "🌪️" },
              { title: "Rénovation globale", description: "Projet complet clé en main", icon: "🔨" },
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-smooth cursor-pointer border-2 border-border hover:border-primary">
                <CardHeader>
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link to="/simulation">
                      Déposer un projet
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi Hello-Travaux */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="mb-4 text-foreground">Pourquoi choisir Hello-Travaux ?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Card className="text-center border-2 border-primary/20">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Artisans certifiés RGE</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Professionnels qualifiés et reconnus pour la qualité de leurs travaux
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-primary/20">
              <CardHeader>
                <Euro className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Aides financières</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Accompagnement pour bénéficier des CEE, MaPrimeRénov' et autres aides
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-primary/20">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Mise en relation rapide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Recevez des devis sous 48h de professionnels près de chez vous
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-primary/20">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Accompagnement personnalisé</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Support et conseils à chaque étape de votre projet
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12 text-foreground">Ils nous font confiance</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <HomeIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Famille Dupont</CardTitle>
                    <CardDescription>Maison individuelle</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">
                  "Grâce à Hello-Travaux, nous avons trouvé rapidement un artisan RGE de confiance. Les travaux d'isolation ont été réalisés en 2 semaines."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wrench className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">PME Martin</CardTitle>
                    <CardDescription>Local professionnel</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">
                  "Service efficace pour notre rénovation LED. 3 devis reçus en 48h, projet finalisé avec les aides CEE."
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
                    <CardTitle className="text-lg">Sophie L.</CardTitle>
                    <CardDescription>Appartement</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">
                  "Installation d'une pompe à chaleur financée à 80% grâce aux aides. Un accompagnement au top du début à la fin !"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Aides */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-primary-foreground">Financez vos travaux avec les aides disponibles</h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              MaPrimeRénov', CEE, Éco-PTZ... jusqu'à 90% de vos travaux peuvent être financés
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg">
                <Link to="/aides">
                  Découvrir les aides CEE
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-lg bg-primary-foreground">
                <Link to="/ma-prime-renov">En savoir plus sur MaPrimeRénov'</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="cta-section" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-foreground">Prêt à démarrer vos travaux ?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Déposez votre projet en 2 minutes et recevez jusqu'à 3 devis gratuits
            </p>
            <Button asChild size="lg" className="shadow-lg text-lg px-8 py-6 bg-accent hover:bg-accent/90">
              <Link to="/simulation">
                Déposer mon projet maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <StickyCTA targetId="cta-section" estimatedTime="2 min" />
    </div>
  );
};

export default NewHome;
