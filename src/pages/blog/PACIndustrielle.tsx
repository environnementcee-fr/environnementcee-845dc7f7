import { BackToHome } from "@/components/BackToHome";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PACIndustrielle = () => {
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
            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
              Chauffage
            </span>
            <span className="text-muted-foreground text-sm">5 janvier 2025</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Pompes à chaleur industrielles : le guide pour les professionnels
          </h1>
          <p className="text-xl text-muted-foreground">
            Tout savoir sur les PAC pour grandes surfaces et bâtiments tertiaires.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <img 
            src="/placeholder.svg" 
            alt="PAC Industrielle" 
            className="w-full h-64 object-cover rounded-lg mb-8"
          />

          <h2>Qu'est-ce qu'une pompe à chaleur industrielle ?</h2>
          <p>
            Une pompe à chaleur (PAC) industrielle est un système de chauffage et de climatisation haute 
            performance conçu pour les grandes surfaces : entrepôts, usines, centres commerciaux, bureaux, etc.
          </p>
          <p>
            Contrairement aux systèmes de chauffage traditionnels (chaudière gaz ou fioul), la PAC utilise 
            l'énergie gratuite présente dans l'air, l'eau ou le sol pour chauffer vos locaux.
          </p>

          <h2>Les différents types de PAC industrielles</h2>
          
          <h3>PAC air/air</h3>
          <ul>
            <li>Capte les calories dans l'air extérieur</li>
            <li>Diffuse la chaleur via des unités de soufflage</li>
            <li>Solution réversible (chaud en hiver, froid en été)</li>
            <li>Installation rapide et peu invasive</li>
          </ul>

          <h3>PAC air/eau</h3>
          <ul>
            <li>Capte les calories dans l'air extérieur</li>
            <li>Chauffe un circuit d'eau pour alimenter radiateurs ou plancher chauffant</li>
            <li>Compatible avec les installations de chauffage central existantes</li>
            <li>Production d'eau chaude sanitaire possible</li>
          </ul>

          <h3>PAC géothermique</h3>
          <ul>
            <li>Capte les calories dans le sol via des sondes géothermiques</li>
            <li>Performance optimale toute l'année</li>
            <li>Investissement initial plus élevé mais rentabilité maximale</li>
            <li>Idéal pour les grandes surfaces avec terrain disponible</li>
          </ul>

          <h2>Les avantages des PAC industrielles</h2>
          
          <h3>Économies substantielles</h3>
          <p>
            Une PAC consomme 3 à 4 fois moins d'énergie qu'un système de chauffage classique. 
            Pour 1 kWh d'électricité consommé, elle restitue 3 à 4 kWh de chaleur (COP de 3 à 4).
          </p>

          <h3>Réduction de l'empreinte carbone</h3>
          <p>
            En utilisant une énergie renouvelable, la PAC réduit drastiquement vos émissions de CO2 
            et contribue à vos objectifs RSE.
          </p>

          <h3>Confort optimal</h3>
          <p>
            Température homogène, silence de fonctionnement, et climatisation en été pour les modèles réversibles.
          </p>

          <h3>Valorisation du patrimoine</h3>
          <p>
            L'installation d'une PAC améliore le DPE de vos bâtiments et augmente leur valeur.
          </p>

          <div className="bg-primary/5 border-l-4 border-primary p-6 my-8 rounded">
            <p className="font-semibold mb-2">💰 Exemple concret</p>
            <p className="mb-0">
              Un entrepôt de 2000 m² chauffé au gaz peut économiser jusqu'à 15 000 € par an en 
              passant à une PAC air/eau, avec un retour sur investissement de 4 à 6 ans grâce aux aides CEE.
            </p>
          </div>

          <h2>Les aides CEE pour les PAC industrielles</h2>
          <p>
            Les entreprises peuvent bénéficier de primes CEE importantes pour l'installation d'une PAC :
          </p>
          <ul>
            <li>PAC air/eau : jusqu'à 5 000 € par kW installé</li>
            <li>PAC géothermique : jusqu'à 7 000 € par kW installé</li>
            <li>Coup de pouce chauffage pour le remplacement d'une chaudière fioul ou charbon</li>
          </ul>

          <h2>Conditions d'éligibilité</h2>
          <p>
            Pour bénéficier des aides CEE, votre installation doit respecter plusieurs critères :
          </p>
          <ul>
            <li>COP ≥ 3.5 pour les PAC air/eau (à 7°C)</li>
            <li>COP ≥ 4.0 pour les PAC géothermiques</li>
            <li>Installation par un professionnel RGE QualiPAC</li>
            <li>Respect des normes NF PAC ou équivalent</li>
            <li>Dimensionnement adapté à vos besoins (étude thermique obligatoire)</li>
          </ul>

          <h2>Comment choisir votre PAC industrielle ?</h2>
          <ol>
            <li>Réalisez une étude thermique de vos bâtiments</li>
            <li>Définissez vos besoins (chauffage seul ou chauffage + climatisation)</li>
            <li>Évaluez les contraintes techniques (espace disponible, raccordements existants)</li>
            <li>Comparez les différentes technologies (air/air, air/eau, géothermie)</li>
            <li>Calculez le retour sur investissement avec les aides CEE</li>
            <li>Sélectionnez un installateur RGE qualifié</li>
          </ol>

          <h2>Maintenance et durabilité</h2>
          <p>
            Une PAC industrielle bien entretenue a une durée de vie de 15 à 20 ans. 
            Un contrat de maintenance annuel (environ 200-400 € par an) garantit :
          </p>
          <ul>
            <li>Performance optimale tout au long de l'année</li>
            <li>Détection précoce des pannes</li>
            <li>Maintien de la garantie constructeur</li>
            <li>Sécurité du système</li>
          </ul>
        </div>

        <div className="mt-12 p-8 bg-card rounded-lg border">
          <h3 className="text-2xl font-bold mb-4">Découvrez vos aides pour une PAC</h3>
          <p className="text-muted-foreground mb-6">
            Calculez en 2 minutes le montant de vos primes CEE pour l'installation d'une pompe à chaleur.
          </p>
          <Button onClick={() => navigate("/simulation")} size="lg">
            Tester mon éligibilité
          </Button>
        </div>
      </article>
    </div>
  );
};

export default PACIndustrielle;
