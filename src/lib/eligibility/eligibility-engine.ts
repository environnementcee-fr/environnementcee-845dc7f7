/**
 * Moteur d'éligibilité global - Combine MaPrimeRénov', CEE et autres aides
 */

import { 
  calculateMPRCategory, 
  calculateMPRAmount, 
  checkMPREligibility,
  calculateEcoPTZCap,
  MPR_FORFAITS,
  type MPRCategory,
  type Region 
} from './maprimerenov-bareme';

import {
  calculateCEEParticulier,
  calculateCEEProfessionnel,
  isModeste,
  checkCEEMPRCumul,
  calculateCreditImpotPME,
  CEE_PRIMES_PARTICULIERS,
  CEE_PRIMES_PROFESSIONNELS
} from './cee-calculator';

export interface UserProfile {
  userType: 'particulier' | 'professionnel';
  
  // Pour particuliers
  revenuFiscal?: number;
  nbPersonnes?: number;
  region?: Region;
  isOwner?: boolean;
  propertyType?: 'principale' | 'location';
  constructionYear?: number;
  
  // Pour professionnels
  companyName?: string;
  siren?: string;
  effectif?: number;
  secteur?: 'industrie' | 'tertiaire' | 'commerce' | 'agriculture';
}

export interface ProjectData {
  aidType: string;
  
  // Isolation
  isolationType?: 'combles' | 'murs_ext' | 'murs_int' | 'plancher' | 'toiture';
  isolationSurface?: number;
  
  // Chauffage
  heatingType?: 'pac_air_eau' | 'pac_geothermique' | 'chaudiere_bois' | 'poele_bois';
  currentHeating?: 'fioul' | 'gaz' | 'electrique' | 'autre';
  
  // Fenêtres
  nbFenetres?: number;
  
  // Ventilation
  ventilationType?: 'vmc_simple' | 'vmc_double';
  
  // Chauffe-eau
  chauffeEauType?: 'thermodynamique' | 'solaire';
  
  // LED (pro)
  nbLuminaires?: number;
  puissanceLED?: number;
  
  // Brasseur air
  hauteurSousPlafond?: number;
  surfaceChauffee?: number;
  
  // Montant estimé travaux
  estimatedWorkCost?: number;
}

export interface Aid {
  name: string;
  type: 'MPR' | 'CEE' | 'ECOPTZ' | 'LOCAL' | 'FISCAL' | 'TVA';
  amount: number;
  conditions: string[];
  description?: string;
}

export interface EligibilityResult {
  eligible: boolean;
  score: number; // 0-100
  mprCategory?: MPRCategory;
  aids: Aid[];
  totalEstimate: number;
  resteACharge: number;
  warnings: string[];
  recommendations: string[];
}

/**
 * Fonction principale: calcule l'éligibilité complète
 */
export function calculateEligibility(
  userProfile: UserProfile,
  projectData: ProjectData
): EligibilityResult {
  const aids: Aid[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];
  let score = 0;

  // ==================== PARTICULIERS ====================
  if (userProfile.userType === 'particulier') {
    const { revenuFiscal, nbPersonnes, region, isOwner, constructionYear } = userProfile;

    if (!revenuFiscal || !nbPersonnes || !region) {
      return {
        eligible: false,
        score: 0,
        aids: [],
        totalEstimate: 0,
        resteACharge: 0,
        warnings: ['Informations manquantes pour calculer l\'éligibilité'],
        recommendations: []
      };
    }

    // 1. Catégorie MaPrimeRénov'
    const mprCategory = calculateMPRCategory(revenuFiscal, nbPersonnes, region);
    const modeste = isModeste(revenuFiscal, nbPersonnes, region);

    // 2. Vérifier éligibilité MaPrimeRénov'
    const mprEligibility = checkMPREligibility(
      constructionYear || new Date().getFullYear() - 20,
      isOwner ?? true,
      userProfile.propertyType || 'principale'
    );

    if (mprEligibility.eligible && mprCategory !== 'rose') {
      // Calculer MPR selon le type de travaux
      let mprAmount = 0;
      let mprConditions: string[] = [];

      if (projectData.isolationType && projectData.isolationSurface) {
        const workType = `isolation_${projectData.isolationType}` as keyof typeof MPR_FORFAITS;
        if (MPR_FORFAITS[workType]) {
          mprAmount = calculateMPRAmount(workType, mprCategory, projectData.isolationSurface);
          mprConditions.push('Travaux réalisés par un artisan RGE');
          mprConditions.push('Logement de plus de 15 ans');
        }
      }

      if (projectData.heatingType) {
        const workType = projectData.heatingType as keyof typeof MPR_FORFAITS;
        if (MPR_FORFAITS[workType]) {
          mprAmount += calculateMPRAmount(workType, mprCategory);
          mprConditions.push('Équipement respectant les critères techniques (SCOP, etc.)');
          
          // Bonification dépose fioul
          if (projectData.currentHeating === 'fioul') {
            mprAmount += 1200;
            recommendations.push('Bonification de 1 200€ pour la dépose de votre cuve fioul');
          }
        }
      }

      if (projectData.nbFenetres) {
        mprAmount += calculateMPRAmount('fenetres_double_vitrage', mprCategory, projectData.nbFenetres);
        mprConditions.push('Fenêtres avec Uw ≤ 1,3 W/m².K et Sw ≥ 0,3');
      }

      if (projectData.ventilationType === 'vmc_double') {
        mprAmount += calculateMPRAmount('vmc_double_flux', mprCategory);
      }

      if (projectData.chauffeEauType === 'thermodynamique') {
        mprAmount += calculateMPRAmount('chauffe_eau_thermodynamique', mprCategory);
      }

      if (projectData.chauffeEauType === 'solaire') {
        mprAmount += calculateMPRAmount('chauffe_eau_solaire', mprCategory);
      }

      if (mprAmount > 0) {
        aids.push({
          name: 'MaPrimeRénov\'',
          type: 'MPR',
          amount: mprAmount,
          conditions: mprConditions,
          description: `Catégorie ${mprCategory.toUpperCase()} - Aide de l'État`
        });
        score += 30;
      }
    } else if (!mprEligibility.eligible) {
      warnings.push(mprEligibility.reason || 'Non éligible à MaPrimeRénov\'');
    } else if (mprCategory === 'rose') {
      warnings.push('Revenus supérieurs aux plafonds MaPrimeRénov\' (catégorie Rose)');
      recommendations.push('Vous restez éligible aux CEE et à l\'Éco-PTZ');
    }

    // 3. Primes CEE
    let ceeAmount = 0;
    const ceeConditions: string[] = [];

    if (projectData.isolationType && projectData.isolationSurface) {
      const ceeType = `isolation_${projectData.isolationType === 'combles' ? 'combles_perdus' : 'murs'}` as keyof typeof CEE_PRIMES_PARTICULIERS;
      ceeAmount += calculateCEEParticulier(ceeType, {
        surface: projectData.isolationSurface,
        revenuFiscal,
        nbPersonnes,
        region
      });
      ceeConditions.push('R ≥ 7 m².K/W pour combles, R ≥ 3,7 m².K/W pour murs');
    }

    if (projectData.heatingType) {
      let ceeType: keyof typeof CEE_PRIMES_PARTICULIERS | null = null;
      if (projectData.heatingType === 'pac_air_eau') {
        ceeType = projectData.currentHeating === 'fioul' 
          ? 'pac_air_eau_remplacement_fioul' 
          : 'pac_air_eau_remplacement_gaz';
      } else if (projectData.heatingType === 'pac_geothermique') {
        ceeType = 'pac_geothermique';
      } else if (projectData.heatingType.includes('chaudiere_bois')) {
        ceeType = 'chaudiere_bois';
      }

      if (ceeType) {
        ceeAmount += calculateCEEParticulier(ceeType, { revenuFiscal, nbPersonnes, region });
        ceeConditions.push('Coup de Pouce Chauffage');
      }
    }

    if (projectData.nbFenetres) {
      ceeAmount += calculateCEEParticulier('fenetres', {
        nombre: projectData.nbFenetres,
        revenuFiscal,
        nbPersonnes,
        region
      });
    }

    if (projectData.ventilationType === 'vmc_double') {
      ceeAmount += calculateCEEParticulier('vmc_double_flux', { revenuFiscal, nbPersonnes, region });
    }

    if (projectData.chauffeEauType === 'thermodynamique') {
      ceeAmount += calculateCEEParticulier('chauffe_eau_thermodynamique', { revenuFiscal, nbPersonnes, region });
    }

    if (projectData.hauteurSousPlafond && projectData.hauteurSousPlafond >= 4) {
      ceeAmount += calculateCEEParticulier('brasseur_air', {
        hauteur: projectData.hauteurSousPlafond,
        revenuFiscal,
        nbPersonnes,
        region
      });
    }

    if (ceeAmount > 0) {
      aids.push({
        name: 'Prime CEE',
        type: 'CEE',
        amount: ceeAmount,
        conditions: [...ceeConditions, 'Travaux réalisés par un artisan RGE'],
        description: modeste ? 'Prime CEE bonifiée (ménage modeste)' : 'Prime CEE standard'
      });
      score += 25;
    }

    // 4. Éco-PTZ
    const nbPostes = [
      projectData.isolationType,
      projectData.heatingType,
      projectData.ventilationType,
      projectData.chauffeEauType,
      projectData.nbFenetres
    ].filter(Boolean).length;

    if (nbPostes > 0) {
      const ecoPTZCap = calculateEcoPTZCap(nbPostes);
      aids.push({
        name: 'Éco-PTZ',
        type: 'ECOPTZ',
        amount: ecoPTZCap,
        conditions: [
          'Prêt à taux zéro (0%)',
          `Remboursable sur 15 ans`,
          'Sans conditions de revenus'
        ],
        description: `Prêt jusqu'à ${ecoPTZCap.toLocaleString()}€ pour ${nbPostes} poste${nbPostes > 1 ? 's' : ''} de travaux`
      });
      score += 15;
    }

    // 5. TVA réduite 5,5%
    if (projectData.estimatedWorkCost) {
      const tvaReduction = projectData.estimatedWorkCost * 0.145; // Économie 19,6% - 5,5% = 14,1%
      aids.push({
        name: 'TVA réduite 5,5%',
        type: 'TVA',
        amount: Math.round(tvaReduction),
        conditions: ['Appliquée automatiquement sur la facture'],
        description: 'Au lieu de 20%'
      });
      score += 10;
    }

    // 6. Aides locales (estimation)
    recommendations.push('Vérifiez les aides locales disponibles dans votre région (collectivités, ANAH, etc.)');

  }
  
  // ==================== PROFESSIONNELS ====================
  else if (userProfile.userType === 'professionnel') {
    const { effectif = 0 } = userProfile;

    // 1. Primes CEE Professionnels
    let ceeAmount = 0;
    const ceeConditions: string[] = [];

    if (projectData.nbLuminaires) {
      if (projectData.aidType.includes('led_bureau')) {
        ceeAmount += calculateCEEProfessionnel('led_bureau', { nbLuminaires: projectData.nbLuminaires });
      } else if (projectData.aidType.includes('led_entrepot')) {
        ceeAmount += calculateCEEProfessionnel('led_entrepot', {
          nbLuminaires: projectData.nbLuminaires,
          puissance: projectData.puissanceLED || 0
        });
      } else if (projectData.aidType.includes('led_solaire')) {
        ceeAmount += calculateCEEProfessionnel('led_solaire', { nbLuminaires: projectData.nbLuminaires });
      }
      ceeConditions.push('Luminaires LED avec efficacité ≥ 100 lm/W');
    }

    if (projectData.isolationType && projectData.isolationSurface) {
      const ceeType = projectData.isolationType.includes('toiture') ? 'isolation_toiture_pro' : 'isolation_murs_pro';
      ceeAmount += calculateCEEProfessionnel(ceeType as any, { surface: projectData.isolationSurface });
      ceeConditions.push('Isolation avec R ≥ 6 m².K/W (toiture) ou R ≥ 4 m².K/W (murs)');
    }

    if (projectData.heatingType === 'pac_air_eau' && projectData.surfaceChauffee) {
      // Estimation puissance: 100W/m²
      const puissanceEstimee = (projectData.surfaceChauffee * 100) / 1000; // kW
      ceeAmount += calculateCEEProfessionnel('pac_industrielle', { puissance: puissanceEstimee });
      ceeConditions.push('PAC avec COP ≥ 3,4');
    }

    if (projectData.hauteurSousPlafond && projectData.hauteurSousPlafond >= 5 && projectData.surfaceChauffee) {
      ceeAmount += calculateCEEProfessionnel('brasseur_air_pro', {
        hauteur: projectData.hauteurSousPlafond,
        surface: projectData.surfaceChauffee
      });
    }

    if (ceeAmount > 0) {
      aids.push({
        name: 'Prime CEE Entreprise',
        type: 'CEE',
        amount: ceeAmount,
        conditions: [...ceeConditions, 'Travaux par professionnel qualifié'],
        description: 'Certificats d\'Économies d\'Énergie pour entreprises'
      });
      score += 35;
    }

    // 2. Crédit d'impôt PME (30%)
    if (effectif < 250 && projectData.estimatedWorkCost) {
      const creditImpot = calculateCreditImpotPME(projectData.estimatedWorkCost, effectif);
      if (creditImpot > 0) {
        aids.push({
          name: 'Crédit d\'impôt PME',
          type: 'FISCAL',
          amount: creditImpot,
          conditions: [
            'Entreprise < 250 salariés',
            'Déduction sur l\'impôt sur les sociétés',
            'Plafonné à 25 000€/an'
          ],
          description: '30% du montant des travaux'
        });
        score += 20;
      }
    }

    // 3. Fonds Chaleur ADEME (pour PAC >100kW)
    if (projectData.heatingType && projectData.surfaceChauffee) {
      const puissanceEstimee = (projectData.surfaceChauffee * 100) / 1000;
      if (puissanceEstimee >= 100) {
        recommendations.push('Projet éligible au Fonds Chaleur ADEME - Contactez votre conseiller ADEME régional');
        score += 10;
      }
    }

    // 4. Autres recommandations
    recommendations.push('Amortissement exceptionnel possible (déduction fiscale accélérée)');
    recommendations.push('Vérifiez les aides régionales pour les entreprises (appels à projets, subventions)');
  }

  // ==================== CALCUL FINAL ====================
  const totalAids = aids.reduce((sum, aid) => {
    // L'Éco-PTZ n'est pas une "aide" directe, c'est un prêt
    if (aid.type === 'ECOPTZ') return sum;
    return sum + aid.amount;
  }, 0);

  const workCost = projectData.estimatedWorkCost || 10000; // Estimation si non fourni
  const resteACharge = Math.max(0, workCost - totalAids);
  const financePercent = (totalAids / workCost) * 100;

  // Ajuster le score selon le taux de financement
  if (financePercent >= 90) score += 20;
  else if (financePercent >= 70) score += 15;
  else if (financePercent >= 50) score += 10;

  // Limiter le score à 100
  score = Math.min(100, score);

  // Déterminer l'éligibilité globale
  const eligible = aids.length > 0 && score >= 30;

  return {
    eligible,
    score,
    mprCategory: userProfile.userType === 'particulier' 
      ? calculateMPRCategory(
          userProfile.revenuFiscal || 0,
          userProfile.nbPersonnes || 1,
          userProfile.region || 'autre'
        )
      : undefined,
    aids,
    totalEstimate: totalAids,
    resteACharge,
    warnings,
    recommendations
  };
}
