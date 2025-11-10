# Edge Function calculate-eligibility

## Fonctionnalités implémentées

L'edge function `calculate-eligibility` applique les vraies règles d'éligibilité du PDF "Aides à la rénovation énergétique 2025".

### Barèmes MaPrimeRénov' 2025
- Barèmes Île-de-France et Province
- 4 catégories : bleu (très modeste), jaune (modeste), violet (intermédiaire), rose (supérieur)
- Calcul automatique selon revenus, nombre de personnes et code postal

### Aides calculées

#### MaPrimeRénov' (Particuliers)
- **PAC air/eau** : 5000€ (bleu), 4000€ (jaune), 3000€ (violet), 0€ (rose)
- **Isolation murs extérieur** : 75€/m² (bleu), 60€/m² (jaune), 40€/m² (violet)
- **Isolation murs intérieur** : 25€/m² (bleu), 20€/m² (jaune), 15€/m² (violet)
- **Isolation toiture** : 25€/m² (bleu), 20€/m² (jaune), 15€/m² (violet)
- **Chaudière biomasse auto** : 5000€ (bleu), 4000€ (jaune), 2500€ (violet)
- **VMC double flux** : 2500€ (bleu), 2000€ (jaune), 1500€ (violet)
- **Chauffe-eau thermodynamique** : 1200€ (bleu), 800€ (jaune), 400€ (violet)
- **Chauffe-eau solaire** : 4000€ (bleu), 3000€ (jaune), 2000€ (violet)
- **Fenêtres** : 100€/fenêtre (bleu), 80€/fenêtre (jaune), 40€/fenêtre (violet) - uniquement modestes

#### Certificats d'Économies d'Énergie (CEE)
- **PAC** : 800€ standard, 1000€ modeste
- **Isolation murs** : 15€/m² standard, 20€/m² modeste
- **Isolation toiture** : 10€/m² standard, 12€/m² modeste
- **Chaudière biomasse** : 800€ standard, 1000€ modeste
- **VMC double flux** : 400€ standard, 500€ modeste
- **LED bureaux** : 30€/luminaire
- **LED entrepôt** : 40€/luminaire
- **Brasseur d'air** : 5€/m²

#### Éco-PTZ (Particuliers)
- Jusqu'à 30 000€ (ou 50 000€ si rénovation globale)
- Logement > 15 ans

#### TVA réduite
- 5,5% sur travaux et équipements
- Logement > 2 ans

#### Crédit d'impôt 30% (Professionnels PME)
- LED bureaux, LED entrepôt, isolation pro, PAC pro

#### Photovoltaïque (cas particulier)
- Prime autoconsommation : 240€ (3kWc), 480€ (6kWc), 560€ (9kWc)
- Obligation d'achat : ~0,10€/kWh

### Critères d'éligibilité

- **Logement > 15 ans** : obligatoire pour MaPrimeRénov'
- **Logement > 2 ans** : obligatoire pour CEE et TVA 5,5%
- **PAC** : système actuel ne doit pas être déjà une PAC (inéligible Coup de Pouce)
- **Catégorie revenus** : déterminée automatiquement selon barème MPR 2025

### Score du lead

Le score est calculé selon :
- Montant total des aides (plus élevé = score plus élevé)
- Nombre d'aides cumulables
- Complétude du dossier

## Formulaires à créer

Les formulaires suivants doivent être créés pour chaque type de travaux :

### Particuliers
- [ ] PhotovoltaiqueForm (pv_part)
- [ ] ChaudiereBiomasseForm (chaudiere_biomasse)
- [ ] VMCDoubleFluxForm (vmc_double_flux)
- [ ] ChauffeEauThermoForm (cet_part)
- [ ] IsolationToitureForm (isolation_toiture)

### Professionnels
- [ ] PACProForm (pac_pro)

Ces formulaires doivent utiliser les mêmes composants de base que les formulaires existants et appeler l'edge function `calculate-eligibility` pour afficher les aides disponibles.

## Utilisation

```typescript
const { data, error } = await supabase.functions.invoke('calculate-eligibility', {
  body: {
    aid_type: "pac_part",
    user_type: "particulier",
    postal_code: "75001",
    construction_year: 1990,
    revenu_fiscal: 25000,
    nb_personnes: 3,
    heating_system: "fioul",
    surface: 120,
    // ... autres données
  }
});

// Résultat
// {
//   eligibilite: {
//     mpr: { eligible: true, montant: 4000, details: "..." },
//     cee: { eligible: true, montant: 800, details: "..." },
//     eco_ptz: { eligible: true, montant: 30000, details: "..." },
//     tva_reduite: { eligible: true, details: "..." }
//   },
//   score: 85,
//   total_aides_estimees: 34800
// }
```
