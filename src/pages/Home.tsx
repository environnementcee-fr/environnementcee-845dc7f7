import { ArrowRight, Building2, Home as HomeIcon, CheckCircle, Users, FileText, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import heroLedOffice from "@/assets/hero-led-office.jpg";
import ledModules from "@/assets/led-modules.jpg";
import installationLed from "@/assets/installation-led.jpg";
import auditLed from "@/assets/audit-led.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags */}
      <title>EnvironnementCEE.fr - Toutes vos aides écologiques et CEE sur une plateforme</title>
      
      {/* Hero Section with Carousel */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 py-8 md:py-0">
          <div className="max-w-3xl mx-auto text-center animate-fade-in mb-8 md:mb-12">
            <h1 className="mb-4 md:mb-6 text-foreground text-2xl md:text-4xl lg:text-5xl">
              Toutes vos aides écologiques et CEE réunies sur une seule plateforme
            </h1>
            
            <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              Que vous soyez professionnel ou particulier, bénéficiez d'un accompagnement personnalisé pour financer votre transition énergétique jusqu'à 100%.
            </p>
          </div>

          {/* Carousel */}
          <div className="max-w-4xl mx-auto mb-6 md:mb-8">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                <CarouselItem>
                  <div className="relative h-[250px] md:h-[350px] lg:h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={heroLedOffice} 
                      alt="Installation LED dans bureaux professionnels" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
                      <h3 className="text-white text-lg md:text-2xl font-bold">Éclairage LED Professionnel</h3>
                      <p className="text-white/90 text-sm md:text-base">Jusqu'à 80% d'économies sur vos factures</p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[250px] md:h-[350px] lg:h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={installationLed} 
                      alt="Installation de système LED haute performance" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
                      <h3 className="text-white text-lg md:text-2xl font-bold">Installation Rapide</h3>
                      <p className="text-white/90 text-sm md:text-base">Par des professionnels certifiés RGE</p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[250px] md:h-[350px] lg:h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={ledModules} 
                      alt="Modules LED haute efficacité énergétique" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
                      <h3 className="text-white text-lg md:text-2xl font-bold">Technologie LED Avancée</h3>
                      <p className="text-white/90 text-sm md:text-base">Performance et durabilité garanties</p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[250px] md:h-[350px] lg:h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={auditLed} 
                      alt="Audit énergétique et conseil personnalisé" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
                      <h3 className="text-white text-lg md:text-2xl font-bold">Audit Gratuit</h3>
                      <p className="text-white/90 text-sm md:text-base">Évaluation personnalisée de votre projet</p>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2 md:left-4" />
              <CarouselNext className="right-2 md:right-4" />
            </Carousel>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-in">
            <Button asChild size="lg" className="text-base md:text-lg h-12 md:h-14 shadow-lg w-full sm:w-auto">
              <Link to="/simulation">
                Tester mon éligibilité
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base md:text-lg h-12 md:h-14 w-full sm:w-auto">
              <Link to="/qui-sommes-nous">En savoir plus</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Nos Solutions - Choix Pro/Particuliers */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h2 className="mb-3 md:mb-4 text-foreground text-2xl md:text-3xl lg:text-4xl">Nos solutions adaptées à votre profil</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Choisissez votre parcours pour découvrir les aides qui vous correspondent
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
            {/* Button Professionnels */}
            <Link to="/professionnels" className="group">
              <div className="relative h-20 md:h-24 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-2 md:gap-3 px-4 md:px-6">
                  <Building2 className="h-6 w-6 md:h-8 md:w-8 text-white flex-shrink-0" />
                  <span className="text-lg md:text-2xl font-bold text-white">Je suis professionnel</span>
                </div>
              </div>
            </Link>

            {/* Button Particuliers */}
            <Link to="/particuliers" className="group">
              <div className="relative h-20 md:h-24 rounded-xl md:rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-2 md:gap-3 px-4 md:px-6">
                  <HomeIcon className="h-6 w-6 md:h-8 md:w-8 text-white flex-shrink-0" />
                  <span className="text-lg md:text-2xl font-bold text-white">Je suis particulier</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Notre Rôle */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-4 md:mb-6 text-foreground text-2xl md:text-3xl lg:text-4xl">Notre rôle</h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              <strong className="text-foreground">EnvironnementCEE.fr</strong> est un <strong>intermédiaire privé</strong> spécialisé dans la mise en relation entre bénéficiaires d'aides CEE et installateurs certifiés RGE.
            </p>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
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
      <section className="py-12 md:py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-8 md:mb-12 text-foreground text-2xl md:text-3xl lg:text-4xl">Ils nous font confiance</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
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
