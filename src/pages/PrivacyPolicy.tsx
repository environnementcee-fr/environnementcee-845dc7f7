const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Collecte des données</h2>
          <p className="mb-4">Nous collectons les données suivantes lorsque vous utilisez notre formulaire :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Code postal</li>
            <li>Type de projet et informations associées</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Finalité du traitement</h2>
          <p>Vos données sont utilisées pour :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Traiter votre demande d'information sur les aides CEE</li>
            <li>Vous recontacter pour vous accompagner dans votre projet</li>
            <li>Améliorer nos services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Durée de conservation</h2>
          <p>Vos données sont conservées pendant 3 ans maximum à compter de votre dernière interaction avec nos services.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Vos droits (RGPD)</h2>
          <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement (droit à l'oubli)</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité</li>
            <li>Droit d'opposition</li>
          </ul>
          <p>Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@hello-travaux.fr" className="text-primary underline">contact@hello-travaux.fr</a></p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Sécurité des données</h2>
          <p>Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour assurer la sécurité de vos données et empêcher leur altération, suppression ou accès non autorisé.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Partage des données</h2>
          <p>Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées uniquement avec nos partenaires techniques (hébergeur, prestataires de services) dans le cadre strict de la fourniture de nos services.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
