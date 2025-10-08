import { Leaf } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="gradient-secondary py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-background">EnvironnementCEE.fr</span>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Plateforme d'éligibilité aux aides écologiques CEE pour les entreprises, collectivités et associations.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#comment-ca-marche" className="hover:text-primary transition-smooth">Comment ça marche</a></li>
              <li><a href="#eligibilite" className="hover:text-primary transition-smooth">Critères d'éligibilité</a></li>
              <li><a href="#benefices" className="hover:text-primary transition-smooth">Bénéfices</a></li>
              <li><a href="#simulation" className="hover:text-primary transition-smooth">Simulation</a></li>
              <li><a href="#faq" className="hover:text-primary transition-smooth">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4">Mentions légales</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="/mentions-legales" className="hover:text-primary transition-smooth">Mentions légales</a></li>
              <li><a href="/politique-confidentialite" className="hover:text-primary transition-smooth">Politique de confidentialité</a></li>
              <li><a href="/gestion-cookies" className="hover:text-primary transition-smooth">Gestion des cookies</a></li>
              <li><a href="/contact" className="hover:text-primary transition-smooth">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <div className="text-center text-background/70 text-sm space-y-2">
            <p>
              <strong>Éditeur :</strong> FJLC ENVIRONNEMENT - SIREN : 849 863 535 - 8 B RUE ABEL, 75012 PARIS
            </p>
            <p>
              <strong>Hébergeur :</strong> IONOS SARL - 7 Place de la Gare, 57200 Sarreguemines, France
            </p>
            <p className="mt-4">
              © {new Date().getFullYear()} EnvironnementCEE.fr - Tous droits réservés
            </p>
            <p className="text-xs mt-4 max-w-3xl mx-auto">
              Les données collectées via ce formulaire sont traitées par FJLC ENVIRONNEMENT et ses partenaires dans le but de vous recontacter concernant votre demande d'éligibilité CEE. 
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. 
              Les données sont conservées pendant 3 ans maximum. Pour toute question : <a href="mailto:contact@environnementcee.fr" className="text-primary hover:underline">contact@environnementcee.fr</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
