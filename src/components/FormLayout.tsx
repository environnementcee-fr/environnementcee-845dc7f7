import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; path?: string }[];
  showContactCTA?: boolean;
}

export const FormLayout = ({ 
  children, 
  title, 
  subtitle, 
  breadcrumbs,
  showContactCTA = true 
}: FormLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                {crumb.path ? (
                  <Link to={crumb.path} className="text-primary hover:underline">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-muted-foreground">{crumb.label}</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="gradient-hero py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4 text-foreground text-3xl md:text-4xl">{title}</h1>
            {subtitle && (
              <p className="text-lg text-muted-foreground mb-6">{subtitle}</p>
            )}
            
            {/* Comment ça marche */}
            <div className="grid md:grid-cols-3 gap-4 mt-8 text-left">
              <div className="bg-card/50 backdrop-blur p-4 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">1</div>
                <h3 className="font-semibold mb-1 text-foreground">Remplissez le formulaire</h3>
                <p className="text-sm text-muted-foreground">Décrivez votre projet en quelques étapes</p>
              </div>
              <div className="bg-card/50 backdrop-blur p-4 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">2</div>
                <h3 className="font-semibold mb-1 text-foreground">Analyse gratuite</h3>
                <p className="text-sm text-muted-foreground">Nous étudions votre éligibilité sous 24-48h</p>
              </div>
              <div className="bg-card/50 backdrop-blur p-4 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">3</div>
                <h3 className="font-semibold mb-1 text-foreground">Accompagnement complet</h3>
                <p className="text-sm text-muted-foreground">Mise en relation et constitution du dossier</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </section>

      {/* Contact CTA (optionnel) */}
      {showContactCTA && (
        <section className="py-8 bg-primary/5 border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-xl font-semibold mb-3">Une question ?</h3>
              <p className="text-muted-foreground mb-4">Notre équipe est à votre disposition</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" size="sm" asChild>
                  <a href="tel:0123456789">
                    <Phone className="mr-2 h-4 w-4" />
                    01 23 45 67 89
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:contact@environnementcee.fr">
                    <Mail className="mr-2 h-4 w-4" />
                    Nous contacter
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
