const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Gestion des Cookies</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Qu'est-ce qu'un cookie ?</h2>
          <p>Un cookie est un petit fichier texte déposé sur votre ordinateur lors de la visite d'un site internet. Il permet de mémoriser des informations relatives à votre navigation.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Les cookies que nous utilisons</h2>
          
          <h3 className="text-xl font-semibold mb-2 mt-4">Cookies strictement nécessaires</h3>
          <p className="mb-4">Ces cookies sont essentiels au fonctionnement du site. Ils permettent notamment de mémoriser votre consentement aux cookies.</p>
          
          <h3 className="text-xl font-semibold mb-2 mt-4">Cookies de mesure d'audience</h3>
          <p className="mb-4">Avec votre consentement, nous utilisons des outils d'analyse pour comprendre comment vous utilisez notre site et l'améliorer.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Gérer vos préférences</h2>
          <p className="mb-4">Vous pouvez à tout moment modifier vos préférences concernant les cookies :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Via le bandeau qui s'affiche lors de votre première visite</li>
            <li>En configurant votre navigateur pour refuser les cookies</li>
            <li>En nous contactant à : <a href="mailto:contact@environnementcee.fr" className="text-primary underline">contact@environnementcee.fr</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Durée de conservation</h2>
          <p>Les cookies sont conservés pour une durée maximale de 13 mois. Votre consentement est redemandé à l'expiration de ce délai.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Configuration du navigateur</h2>
          <p className="mb-2">Vous pouvez configurer votre navigateur pour refuser les cookies :</p>
          <ul className="list-disc pl-6">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies" target="_blank" rel="noopener noreferrer" className="text-primary underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary underline">Safari</a></li>
            <li><a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary underline">Microsoft Edge</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
