import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Leaf, Users, Award, Target, Shield, ArrowRight } from "lucide-react";

const QuiSommesNous = () => {
  return (
    <div className="min-h-screen">
      <title>Qui sommes-nous - Hello-Travaux</title>
      
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Leaf className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="mb-6 text-foreground">
              Votre partenaire de confiance pour la transition énergétique
            </h1>
            <p className="text-xl text-muted-foreground">
              Hello-Travaux facilite l'accès aux aides écologiques pour tous.
            </p>
          </div>
        </div>
      </section>

      {/* Notre mission */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <Target className="h-12 w-12 text-primary" />
                <div>
                  <CardTitle className="text-2xl">Notre mission</CardTitle>
                  <CardDescription>Simplifier votre transition énergétique</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Hello-Travaux</strong> est une <strong className="text-foreground">plateforme de mise en relation</strong> entre particuliers/professionnels ayant des projets de rénovation et artisans qualifiés. Nous vous accompagnons dans l'accès aux aides financières (CEE, MaPrimeRénov', etc.) et facilitons la mise en relation avec des professionnels certifiés RGE.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Notre objectif est simple : <strong className="text-foreground">rendre accessible à tous la rénovation énergétique</strong> en simplifiant vos démarches de A à Z.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12 text-foreground">Nos valeurs</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-2 border-primary/20 hover:border-primary transition-smooth">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Transparence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Nous vous informons clairement sur votre éligibilité, les montants d'aides et nos partenaires RGE.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-primary/20 hover:border-primary transition-smooth">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Accompagnement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Un conseiller dédié vous guide à chaque étape, du test d'éligibilité à la réalisation des travaux.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-primary/20 hover:border-primary transition-smooth">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Qualité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Nous travaillons uniquement avec des installateurs certifiés RGE et contrôlons la qualité des interventions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Notre équipe */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Une équipe d'experts à votre service</h2>
          
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Notre équipe regroupe des spécialistes de la rénovation énergétique, du montage de dossiers d'aides publiques et de la mise en relation avec des artisans qualifiés.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous sommes en veille permanente sur les évolutions réglementaires et les nouveaux dispositifs pour vous garantir les meilleures solutions.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Conseillers experts</h4>
                    <p className="text-sm text-muted-foreground">Formés aux aides CEE et dispositifs publics</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Réseau RGE</h4>
                    <p className="text-sm text-muted-foreground">Installateurs certifiés sur toute la France</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Informations légales */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-center mb-12 text-foreground">Informations légales</h2>
          
          <Card>
            <CardContent className="pt-6 space-y-3 text-sm">
              <p><strong className="text-foreground">Raison sociale :</strong> Hello-Travaux</p>
              <p><strong className="text-foreground">SIREN :</strong> [À compléter]</p>
              <p><strong className="text-foreground">Siège social :</strong> 20 Rue de la Paix, 75002 Paris</p>
              <p><strong className="text-foreground">E-mail :</strong> contact@hello-travaux.fr</p>
              <p className="text-muted-foreground italic pt-4">
                Hello-Travaux est une plateforme de mise en relation entre particuliers/professionnels et artisans qualifiés pour vos projets de rénovation énergétique. Nous facilitons l'accès aux aides financières et ne réalisons pas les travaux directement.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Contact */}
      <section className="py-16 gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-primary-foreground">Une question ? Un projet ?</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Notre équipe est à votre écoute pour répondre à toutes vos questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg">
                <Link to="/contact">
                  Nous contacter
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-lg bg-primary-foreground">
                <Link to="/simulation">Tester mon éligibilité</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuiSommesNous;
