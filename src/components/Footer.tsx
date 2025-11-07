import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary/5 to-secondary/5 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex flex-col mb-4">
              <h3 className="font-bold text-lg text-green-600">EnvironnementCEE</h3>
              <span className="text-xs text-muted-foreground">
                by <span className="font-medium bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">TravauxLinks</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Votre partenaire pour les Certificats d'Économies d'Énergie
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Nos Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://travauxlinks.fr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary flex items-center gap-1"
                >
                  Trouver un artisan RGE
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://travauxlinks.fr/deposer-projet" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary flex items-center gap-1"
                >
                  Déposer un projet de travaux
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/professionnels" className="text-muted-foreground hover:text-primary">Professionnels</Link></li>
              <li><Link to="/particuliers" className="text-muted-foreground hover:text-primary">Particuliers</Link></li>
              <li><Link to="/aides" className="text-muted-foreground hover:text-primary">Les Aides CEE</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link to="/qui-sommes-nous" className="text-muted-foreground hover:text-primary">Qui sommes-nous</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Informations</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link to="/simulation" className="text-muted-foreground hover:text-primary">Simulation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/mentions-legales" className="text-muted-foreground hover:text-primary">Mentions légales</Link></li>
              <li><Link to="/politique-confidentialite" className="text-muted-foreground hover:text-primary">Politique de confidentialité</Link></li>
              <li><Link to="/gestion-cookies" className="text-muted-foreground hover:text-primary">Gestion des cookies</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8">
          <div className="text-sm text-muted-foreground space-y-3">
            <p>
              <strong>Éditeur :</strong> FJLC ENVIRONNEMENT - SIREN : 849 863 535 - 8 B RUE ABEL, 75012 PARIS
            </p>
            <p>
              <strong>Hébergeur :</strong> IONOS SARL - 7 Place de la Gare, 57200 Sarreguemines, France
            </p>
            <p className="pt-2">
              © 2025 EnvironnementCEE.fr | Une marque de <a href="https://travauxlinks.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TravauxLinks</a> - Tous droits réservés
            </p>
            <p className="text-xs leading-relaxed">
              Les données collectées via ce formulaire sont traitées par FJLC ENVIRONNEMENT et ses partenaires dans le but de vous recontacter concernant votre demande d&apos;éligibilité CEE. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Les données sont conservées pendant 3 ans maximum. Pour toute question : <a href="mailto:contact@environnementcee.fr" className="text-primary hover:underline">contact@environnementcee.fr</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
