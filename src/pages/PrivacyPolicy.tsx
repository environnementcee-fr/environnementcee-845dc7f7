import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>
        
        <section className="space-y-6 text-muted-foreground">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Introduction</h2>
            <p>FJLC ENVIRONNEMENT accorde une grande importance à la protection de vos données personnelles. Cette politique de confidentialité vous informe de la manière dont nous collectons, utilisons et protégeons vos données lorsque vous utilisez notre site environnementcee.fr.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Responsable du traitement</h2>
            <p className="mb-2"><strong>Raison sociale :</strong> FJLC ENVIRONNEMENT</p>
            <p className="mb-2"><strong>SIREN :</strong> 849 863 535</p>
            <p className="mb-2"><strong>Adresse :</strong> 8 B RUE ABEL, 75012 PARIS</p>
            <p className="mb-2"><strong>Email :</strong> contact@environnementcee.fr</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Données collectées</h2>
            <p className="mb-2">Dans le cadre de l'utilisation de notre site, nous sommes susceptibles de collecter les données suivantes :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Nom de l'entreprise</li>
              <li>Type d'activité professionnelle</li>
              <li>Surface de votre établissement</li>
              <li>Données de navigation (adresse IP, type de navigateur, pages visitées)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Finalités du traitement</h2>
            <p className="mb-2">Vos données personnelles sont collectées pour les finalités suivantes :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Évaluer votre éligibilité aux aides CEE pour l'éclairage LED professionnel</li>
              <li>Vous contacter pour vous accompagner dans vos démarches</li>
              <li>Gérer votre demande d'information</li>
              <li>Améliorer nos services et notre site internet</li>
              <li>Respecter nos obligations légales et réglementaires</li>
              <li>Vous informer des nouvelles aides CEE disponibles (avec votre consentement)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Base légale du traitement</h2>
            <p>Le traitement de vos données repose sur :</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Votre consentement lors de la soumission du formulaire</li>
              <li>L'exécution de mesures précontractuelles prises à votre demande</li>
              <li>Le respect d'obligations légales</li>
              <li>Notre intérêt légitime à améliorer nos services</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Destinataires des données</h2>
            <p>Vos données personnelles sont destinées :</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Aux équipes internes de FJLC ENVIRONNEMENT en charge du traitement de votre demande</li>
              <li>À nos partenaires techniques pour la gestion du site (hébergeur IONOS)</li>
              <li>Le cas échéant, aux organismes compétents dans le cadre des aides CEE</li>
            </ul>
            <p className="mt-2">Nous ne vendons ni ne louons vos données personnelles à des tiers.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Durée de conservation</h2>
            <p>Vos données personnelles sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées :</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Données de prospects : 3 ans à compter du dernier contact</li>
              <li>Données de navigation : 13 mois maximum</li>
              <li>Données relatives aux demandes d'aide CEE : durée légale de conservation comptable et fiscale</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Vos droits</h2>
            <p className="mb-2">Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Droit d'accès :</strong> obtenir la confirmation que vos données sont traitées et en obtenir une copie</li>
              <li><strong>Droit de rectification :</strong> corriger vos données inexactes ou incomplètes</li>
              <li><strong>Droit à l'effacement :</strong> obtenir la suppression de vos données dans certains cas</li>
              <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
              <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong>Droit de retirer votre consentement :</strong> à tout moment</li>
            </ul>
            <p className="mt-3">Pour exercer ces droits, contactez-nous à : contact@environnementcee.fr</p>
            <p className="mt-2">Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (www.cnil.fr).</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Sécurité des données</h2>
            <p>Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées afin de garantir la sécurité de vos données personnelles et notamment empêcher qu'elles soient déformées, endommagées ou que des tiers non autorisés y aient accès.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Cookies</h2>
            <p>Notre site utilise des cookies pour améliorer votre expérience de navigation. Pour plus d'informations, consultez notre page dédiée à la gestion des cookies.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Modifications</h2>
            <p>Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. La version en vigueur est celle publiée sur notre site.</p>
            <p className="mt-2"><strong>Dernière mise à jour :</strong> janvier 2025</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
