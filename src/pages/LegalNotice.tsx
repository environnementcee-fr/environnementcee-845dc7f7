import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const LegalNotice = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Mentions Légales</h1>
        
        <section className="space-y-6 text-muted-foreground">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Éditeur du site</h2>
            <p className="mb-2"><strong>Raison sociale :</strong> FJLC ENVIRONNEMENT</p>
            <p className="mb-2"><strong>SIREN :</strong> 849 863 535</p>
            <p className="mb-2"><strong>Adresse :</strong> 8 B RUE ABEL, 75012 PARIS</p>
            <p className="mb-2"><strong>Email :</strong> contact@environnementcee.fr</p>
            <p className="mb-2"><strong>Site web :</strong> environnementcee.fr</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Directeur de la publication</h2>
            <p>Le directeur de la publication est le représentant légal de FJLC ENVIRONNEMENT.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Hébergement</h2>
            <p className="mb-2"><strong>Hébergeur :</strong> IONOS SARL</p>
            <p className="mb-2"><strong>Adresse :</strong> 7 Place de la Gare, 57200 Sarreguemines, France</p>
            <p className="mb-2"><strong>Site web :</strong> www.ionos.fr</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Propriété intellectuelle</h2>
            <p>L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels) est la propriété exclusive de FJLC ENVIRONNEMENT, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.</p>
            <p className="mt-2">Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit de FJLC ENVIRONNEMENT.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Limitation de responsabilité</h2>
            <p>FJLC ENVIRONNEMENT ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site environnementcee.fr.</p>
            <p className="mt-2">FJLC ENVIRONNEMENT s'efforce d'assurer au mieux l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, elle ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Liens hypertextes</h2>
            <p>Le site environnementcee.fr peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. Les liens vers ces autres ressources vous font quitter le site environnementcee.fr.</p>
            <p className="mt-2">FJLC ENVIRONNEMENT ne dispose d'aucun moyen pour contrôler les sites en connexion avec ses sites internet et ne répond pas de la disponibilité de tels sites et sources externes, ni ne la garantit.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Protection des données personnelles</h2>
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.</p>
            <p className="mt-2">Pour exercer ces droits, vous pouvez nous contacter à l'adresse : contact@environnementcee.fr</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Droit applicable</h2>
            <p>Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LegalNotice;
