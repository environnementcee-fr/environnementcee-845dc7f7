import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary/5 to-secondary/5 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">EnvironnementCEE.fr</h3>
            <p className="text-sm text-muted-foreground">
              Votre partenaire pour les Certificats d'Économies d'Énergie
            </p>
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
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>Éditeur :</strong> EnvironnementCEE.fr - [Adresse à compléter] - Email: contact@environnementcee.fr</p>
            <p><strong>Hébergeur :</strong> Lovable (via Supabase) - [Adresse hébergeur]</p>
            <p className="pt-4">© {new Date().getFullYear()} EnvironnementCEE.fr - Tous droits réservés</p>
            <p className="text-xs">
              Conformément au RGPD, vos données sont traitées de manière sécurisée. 
              Vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
