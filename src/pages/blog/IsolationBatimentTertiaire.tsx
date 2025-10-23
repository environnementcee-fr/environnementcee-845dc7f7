import { BackToHome } from "@/components/BackToHome";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const IsolationBatimentTertiaire = () => {
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
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
              Isolation
            </span>
            <span className="text-muted-foreground text-sm">10 janvier 2025</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Isolation des bâtiments tertiaires : guide complet 2025
          </h1>
          <p className="text-xl text-muted-foreground">
            Comment optimiser l'isolation de vos locaux professionnels et profiter des aides disponibles.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <img 
            src="/placeholder.svg" 
            alt="Isolation tertiaire" 
            className="w-full h-64 object-cover rounded-lg mb-8"
          />

          <h2>Pourquoi isoler vos locaux professionnels ?</h2>
          <p>
            L'isolation thermique des bâtiments tertiaires est un investissement stratégique qui permet de :
          </p>
          <ul>
            <li>Réduire significativement les factures de chauffage et de climatisation</li>
            <li>Améliorer le confort de vos employés et clients</li>
            <li>Valoriser votre patrimoine immobilier</li>
            <li>Respecter les obligations du décret tertiaire</li>
            <li>Réduire votre empreinte carbone</li>
          </ul>

          <h2>Les différents types d'isolation</h2>
          
          <h3>Isolation des combles et toitures</h3>
          <p>
            Jusqu'à 30% des déperditions thermiques se font par la toiture. L'isolation des combles est 
            donc la priorité numéro 1 pour tout bâtiment tertiaire. Les solutions :
          </p>
          <ul>
            <li>Isolation par soufflage (combles perdus)</li>
            <li>Isolation en panneaux (combles aménageables)</li>
            <li>Sarking pour les toitures en pente</li>
          </ul>

          <h3>Isolation des murs</h3>
          <p>
            Responsables de 20 à 25% des pertes de chaleur, les murs nécessitent une attention particulière :
          </p>
          <ul>
            <li>Isolation par l'intérieur (ITI) : solution économique</li>
            <li>Isolation par l'extérieur (ITE) : performance maximale sans perte de surface</li>
          </ul>

          <h3>Isolation des planchers</h3>
          <p>
            L'isolation des planchers bas (au-dessus de parkings, caves, vides sanitaires) permet de 
            réduire les déperditions de 7 à 10%.
          </p>

          <h2>Les aides disponibles en 2025</h2>
          
          <h3>Primes CEE</h3>
          <p>
            Les Certificats d'Économies d'Énergie financent une partie importante de vos travaux d'isolation :
          </p>
          <ul>
            <li>Isolation des combles : jusqu'à 20 €/m²</li>
            <li>Isolation des murs : jusqu'à 30 €/m²</li>
            <li>Isolation des planchers : jusqu'à 15 €/m²</li>
          </ul>

          <h3>Dispositif Éco-Énergie Tertiaire</h3>
          <p>
            Un bonus peut être accordé aux entreprises qui s'engagent dans une démarche globale de 
            réduction de leur consommation énergétique.
          </p>

          <div className="bg-primary/5 border-l-4 border-primary p-6 my-8 rounded">
            <p className="font-semibold mb-2">💡 Conseil d'expert</p>
            <p className="mb-0">
              Combinez plusieurs opérations d'isolation (combles + murs + planchers) pour maximiser 
              vos économies d'énergie et bénéficier d'un montant d'aides plus important.
            </p>
          </div>

          <h2>Exigences techniques</h2>
          <p>
            Pour être éligibles aux aides CEE, vos travaux doivent respecter des critères de performance :
          </p>
          <ul>
            <li>Résistance thermique R ≥ 7 m².K/W pour les combles</li>
            <li>Résistance thermique R ≥ 3.7 m².K/W pour les murs</li>
            <li>Résistance thermique R ≥ 3 m².K/W pour les planchers bas</li>
            <li>Mise en œuvre par un professionnel RGE obligatoire</li>
          </ul>

          <h2>Retour sur investissement</h2>
          <p>
            Avec les aides CEE, le retour sur investissement d'une isolation performante est généralement 
            compris entre 3 et 7 ans selon la configuration de vos locaux. Les économies annuelles peuvent 
            atteindre 40% sur vos factures de chauffage.
          </p>

          <h2>Comment démarrer votre projet ?</h2>
          <ol>
            <li>Réalisez un audit énergétique de vos bâtiments</li>
            <li>Identifiez les zones prioritaires à isoler</li>
            <li>Testez votre éligibilité aux aides CEE</li>
            <li>Obtenez plusieurs devis d'installateurs RGE</li>
            <li>Constituez votre dossier de demande d'aides AVANT le début des travaux</li>
            <li>Réalisez les travaux avec un professionnel qualifié</li>
            <li>Fournissez les justificatifs pour obtenir vos primes</li>
          </ol>
        </div>

        <div className="mt-12 p-8 bg-card rounded-lg border">
          <h3 className="text-2xl font-bold mb-4">Calculez vos aides pour l'isolation</h3>
          <p className="text-muted-foreground mb-6">
            Découvrez en 2 minutes le montant des primes CEE pour votre projet d'isolation.
          </p>
          <Button onClick={() => navigate("/simulation")} size="lg">
            Tester mon éligibilité
          </Button>
        </div>
      </article>
    </div>
  );
};

export default IsolationBatimentTertiaire;
