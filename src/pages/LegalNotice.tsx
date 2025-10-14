const LegalNotice = () => {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Mentions Légales</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Éditeur du site</h2>
          <p className="mb-2"><strong>Raison sociale :</strong> EnvironnementCEE.fr</p>
          <p className="mb-2"><strong>Adresse :</strong> [Adresse à compléter]</p>
          <p className="mb-2"><strong>Email :</strong> contact@environnementcee.fr</p>
          <p className="mb-2"><strong>Téléphone :</strong> [Numéro à compléter]</p>
          <p className="mb-2"><strong>SIRET :</strong> [SIRET à compléter]</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Hébergeur</h2>
          <p className="mb-2"><strong>Nom :</strong> Lovable</p>
          <p className="mb-2"><strong>Adresse :</strong> [Adresse hébergeur]</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Propriété intellectuelle</h2>
          <p>L'ensemble du contenu de ce site (textes, images, vidéos) est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Données personnelles</h2>
          <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour plus d'informations, consultez notre <a href="/politique-confidentialite" className="text-primary underline">politique de confidentialité</a>.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
          <p>Ce site utilise des cookies. Pour en savoir plus, consultez notre <a href="/gestion-cookies" className="text-primary underline">politique de gestion des cookies</a>.</p>
        </section>
      </div>
    </div>
  );
};

export default LegalNotice;
