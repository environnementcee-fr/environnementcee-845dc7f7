import { ArrowRight, Building2, Home as HomeIcon, CheckCircle, Users, FileText, Award, ArrowUpRight } from "lucide-react";
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
import ledBureau from "@/assets/carousel/led-bureau.jpg";
import ledEntrepot from "@/assets/carousel/led-entrepot.jpg";
import ledSolaire from "@/assets/carousel/led-solaire.jpg";
import isolation from "@/assets/carousel/isolation.jpg";
import pompeChaleur from "@/assets/carousel/pompe-chaleur.jpg";
import panneauxSolaires from "@/assets/carousel/panneaux-solaires.jpg";
import brasseurAir from "@/assets/carousel/brasseur-air.jpg";

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
                      src={ledBureau} 
                      alt="LED Bureau - Éclairage professionnel pour espaces tertiaires" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
                      <h3 className="text-white text-lg md:text-2xl font-bold">LED Bureau</h3>
                      <p className="text-white/90 text-sm md:text-base">Éclairage optimal pour espaces tertiaires</p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[250px] md:h-[350px] lg:h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={ledEntrepot} 
                      alt="LED Entrepôt - Solutions industrielles haute performance" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
                      <h3 className="text-white text-lg md:text-2xl font-bold">LED Entrepôt</h3>
                      <p className="text-white/90 text-sm md:text-base">Solutions industrielles haute performance</p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[250px] md:h-[350px] lg:h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={ledSolaire} 
                      alt="LED Solaire - Éclairage extérieur autonome" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
                      <h3 className="text-white text-lg md:text-2xl font-bold">LED Solaire</h3>
                      <p className="text-white/90 text-sm md:text-base">Éclairage extérieur autonome</p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[250px] md:h-[350px] lg:h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={isolation} 
                      alt="Isolation - Réduisez les déperditions thermiques" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
                      <h3 className="text-white text-lg md:text-2xl font-bold">Isolation Extérieur</h3>
                      <p className="text-white/90 text-sm md:text-base">Performance énergétique et confort</p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[250px] md:h-[350px] lg:h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={pompeChaleur} 
                      alt="Pompe à Chaleur - Chauffage économique et écologique" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
                      <h3 className="text-white text-lg md:text-2xl font-bold">Pompe à Chaleur</h3>
                      <p className="text-white/90 text-sm md:text-base">Chauffage économique et écologique</p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[250px] md:h-[350px] lg:h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={panneauxSolaires} 
                      alt="Panneaux Solaires - Énergie renouvelable" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
                      <h3 className="text-white text-lg md:text-2xl font-bold">Panneaux Solaires</h3>
                      <p className="text-white/90 text-sm md:text-base">Produisez votre propre électricité</p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[250px] md:h-[350px] lg:h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={brasseurAir} 
                      alt="Brasseur d'Air - Confort thermique optimal" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
                      <h3 className="text-white text-lg md:text-2xl font-bold">Brasseur d'Air</h3>
                      <p className="text-white/90 text-sm md:text-base">Confort thermique été comme hiver</p>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2 md:left-4" />
              <CarouselNext className="right-2 md:right-4" />
            </Carousel>
          </div>

        </div>
      </section>

      {/* Nos Solutions - Choix Pro/Particuliers */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h2 className="mb-3 md:mb-4 text-foreground text-2xl md:text-3xl lg:text-4xl">Découvrez les aides disponibles</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Testez votre éligibilité en 2 minutes et découvrez le montant des aides que vous pouvez obtenir
            </p>
          </div>

          <div className="flex justify-center">
            <Button asChild size="lg" className="text-base md:text-lg h-12 md:h-14 px-8">
              <Link to="/simulation">
                Tester mon éligibilité
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bannière TravauxHub */}
      <section className="py-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Vous avez besoin d'un artisan RGE pour vos travaux ?
            </h2>
            <p className="text-muted-foreground mb-6">
              Découvrez TravauxHub : trouvez des professionnels certifiés près de chez vous et comparez les devis gratuitement.
            </p>
            <a 
              href="https://travauxhub.fr" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" className="gap-2">
                Trouver un artisan RGE
                <ArrowUpRight className="h-5 w-5" />
              </Button>
            </a>
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
