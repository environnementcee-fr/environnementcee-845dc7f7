import { BackToHome } from "@/components/BackToHome";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AidesCEE2025 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <BackToHome />
      
      <article className="container mx-auto px-4 py-20 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/blog")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au blog
        </Button>

        <header className="mb-8">
          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              Réglementation
            </span>
            <span className="text-muted-foreground text-sm">15 janvier 2025</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Les aides CEE en 2025 : ce qui change pour les professionnels
          </h1>
          <p className="text-xl text-muted-foreground">
            Découvrez les nouvelles conditions d'éligibilité et les montants revalorisés pour vos projets de rénovation énergétique.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <img 
            src="/placeholder.svg" 
            alt="Aides CEE 2025" 
            className="w-full h-64 object-cover rounded-lg mb-8"
          />

          <h2>Les nouvelles orientations 2025</h2>
          <p>
            Le dispositif des Certificats d'Économies d'Énergie (CEE) évolue en 2025 avec des changements majeurs 
            pour les entreprises souhaitant réduire leur facture énergétique. Ces modifications visent à renforcer 
            l'efficacité du dispositif et à encourager les projets les plus performants.
          </p>

          <h2>Revalorisation des montants</h2>
          <p>
            Les montants des primes CEE ont été revalorisés de 15% en moyenne pour les opérations standardisées. 
            Cela concerne notamment :
          </p>
          <ul>
            <li>L'éclairage LED professionnel (entrepôts, bureaux)</li>
            <li>L'isolation thermique des bâtiments tertiaires</li>
            <li>Les pompes à chaleur industrielles</li>
            <li>Les systèmes de ventilation performants</li>
          </ul>

          <h2>Nouvelles conditions d'éligibilité</h2>
          <p>
            Pour bénéficier des primes CEE en 2025, les entreprises doivent désormais :
          </p>
          <ul>
            <li>Faire appel à un installateur certifié RGE</li>
            <li>Respecter les nouvelles exigences de performance énergétique</li>
            <li>Déposer leur dossier avant le démarrage des travaux</li>
            <li>Fournir les justificatifs techniques dans les délais impartis</li>
          </ul>

          <h2>Focus sur l'éclairage LED</h2>
          <p>
            L'éclairage LED reste l'une des opérations les plus rentables pour les professionnels. 
            En 2025, les primes sont particulièrement attractives pour :
          </p>
          <ul>
            <li>Le remplacement de l'éclairage dans les entrepôts et zones de stockage</li>
            <li>La modernisation de l'éclairage des bureaux et espaces de travail</li>
            <li>L'installation d'éclairage LED solaire pour les parkings et espaces extérieurs</li>
          </ul>

          <h2>Comment en profiter ?</h2>
          <p>
            Hello-Travaux vous accompagne dans toutes vos démarches pour bénéficier des aides CEE 2025. 
            Notre équipe d'experts vous aide à :
          </p>
          <ul>
            <li>Identifier les opérations éligibles dans votre entreprise</li>
            <li>Calculer le montant de vos primes</li>
            <li>Vous mettre en relation avec des installateurs RGE qualifiés</li>
            <li>Constituer et suivre votre dossier jusqu'au versement des aides</li>
          </ul>

          <div className="bg-primary/5 border-l-4 border-primary p-6 my-8 rounded">
            <p className="font-semibold mb-2">💡 Bon à savoir</p>
            <p className="mb-0">
              Les délais de traitement des dossiers CEE peuvent atteindre 3 à 6 mois. 
              N'attendez pas pour déposer votre demande et sécuriser votre financement !
            </p>
          </div>

          <h2>Conclusion</h2>
          <p>
            Les aides CEE 2025 représentent une opportunité majeure pour les entreprises de réduire leurs coûts 
            énergétiques tout en améliorant leur performance environnementale. Avec les revalorisations annoncées 
            et un accompagnement adapté, c'est le moment idéal pour lancer vos projets de rénovation énergétique.
          </p>
        </div>

        <div className="mt-12 p-8 bg-card rounded-lg border">
          <h3 className="text-2xl font-bold mb-4">Prêt à bénéficier des aides CEE 2025 ?</h3>
          <p className="text-muted-foreground mb-6">
            Testez votre éligibilité en 2 minutes et découvrez le montant de vos aides.
          </p>
          <Button onClick={() => navigate("/simulation")} size="lg">
            Tester mon éligibilité
          </Button>
        </div>
      </article>
    </div>
  );
};

export default AidesCEE2025;
