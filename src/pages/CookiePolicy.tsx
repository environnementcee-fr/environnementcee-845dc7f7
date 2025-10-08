import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Gestion des Cookies</h1>
        
        <section className="space-y-6 text-muted-foreground">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Qu'est-ce qu'un cookie ?</h2>
            <p>Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette) lors de la visite d'un site internet. Il permet au site de mémoriser des informations sur votre visite, comme votre langue de préférence et d'autres paramètres, afin de faciliter votre prochaine visite et de rendre le site plus utile.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Les cookies utilisés sur environnementcee.fr</h2>
            
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-foreground mb-2">Cookies strictement nécessaires</h3>
              <p className="mb-2">Ces cookies sont indispensables au fonctionnement du site et ne peuvent pas être désactivés. Ils comprennent :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Cookies de session pour maintenir votre connexion</li>
                <li>Cookies de sécurité pour protéger vos données</li>
                <li>Cookies de mémorisation de vos choix en matière de cookies</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-semibold text-foreground mb-2">Cookies de performance et d'analyse</h3>
              <p className="mb-2">Ces cookies nous permettent de mesurer l'audience de notre site et d'analyser la façon dont les visiteurs l'utilisent, afin d'améliorer nos services. Ils collectent des informations anonymes telles que :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Les pages visitées</li>
                <li>La durée de visite</li>
                <li>Les sources de trafic</li>
                <li>Les erreurs rencontrées</li>
              </ul>
              <p className="mt-2"><strong>Ces cookies nécessitent votre consentement.</strong></p>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-semibold text-foreground mb-2">Cookies fonctionnels</h3>
              <p className="mb-2">Ces cookies permettent d'améliorer votre expérience en mémorisant vos préférences :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Langue de navigation</li>
                <li>Région ou zone géographique</li>
                <li>Préférences d'affichage</li>
              </ul>
              <p className="mt-2"><strong>Ces cookies nécessitent votre consentement.</strong></p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Durée de conservation des cookies</h2>
            <p>Les cookies ont une durée de vie limitée :</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li><strong>Cookies de session :</strong> supprimés à la fermeture du navigateur</li>
              <li><strong>Cookies de consentement :</strong> conservés 13 mois</li>
              <li><strong>Cookies d'analyse :</strong> conservés 13 mois maximum</li>
              <li><strong>Cookies fonctionnels :</strong> conservés 13 mois maximum</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Accepter ou refuser les cookies</h2>
            <p className="mb-3">Lors de votre première visite sur notre site, un bandeau vous informe de la présence de cookies et vous invite à les accepter ou les refuser.</p>
            <p className="mb-3">Vous pouvez à tout moment modifier vos préférences en :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Cliquant sur le lien "Gestion des cookies" présent en bas de chaque page</li>
              <li>Configurant votre navigateur pour refuser les cookies</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Configuration de votre navigateur</h2>
            <p className="mb-3">Vous pouvez configurer votre navigateur pour gérer les cookies :</p>
            
            <div className="space-y-3 ml-4">
              <div>
                <p className="font-semibold">Google Chrome</p>
                <p className="text-sm">Paramètres &gt; Confidentialité et sécurité &gt; Cookies et autres données de sites</p>
              </div>
              
              <div>
                <p className="font-semibold">Mozilla Firefox</p>
                <p className="text-sm">Options &gt; Vie privée et sécurité &gt; Cookies et données de sites</p>
              </div>
              
              <div>
                <p className="font-semibold">Safari</p>
                <p className="text-sm">Préférences &gt; Confidentialité &gt; Cookies et données de sites web</p>
              </div>
              
              <div>
                <p className="font-semibold">Microsoft Edge</p>
                <p className="text-sm">Paramètres &gt; Cookies et autorisations de site &gt; Cookies et données de sites</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Conséquences du refus des cookies</h2>
            <p>Le refus des cookies n'empêche pas la navigation sur notre site, mais peut limiter certaines fonctionnalités :</p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Perte de vos préférences de navigation</li>
              <li>Impossibilité de mesurer l'audience du site</li>
              <li>Expérience utilisateur potentiellement dégradée</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Cookies tiers</h2>
            <p>Notre site peut contenir des cookies émis par des tiers (partenaires, fournisseurs de services) permettant :</p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>De partager du contenu sur les réseaux sociaux</li>
              <li>D'analyser l'utilisation du site via des outils statistiques</li>
            </ul>
            <p className="mt-2">Ces cookies sont soumis aux politiques de confidentialité de ces tiers.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Vos droits RGPD</h2>
            <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition concernant les données collectées via les cookies.</p>
            <p className="mt-2">Pour exercer ces droits : contact@environnementcee.fr</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Plus d'informations</h2>
            <p>Pour en savoir plus sur les cookies et vos droits :</p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Site de la CNIL : www.cnil.fr</li>
              <li>Site de la Commission Européenne : ec.europa.eu/info/cookies</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Contact</h2>
            <p>Pour toute question concernant notre politique de cookies :</p>
            <p className="mt-2"><strong>Email :</strong> contact@environnementcee.fr</p>
            <p><strong>Adresse :</strong> FJLC ENVIRONNEMENT - 8 B RUE ABEL, 75012 PARIS</p>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm"><strong>Dernière mise à jour :</strong> janvier 2025</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
