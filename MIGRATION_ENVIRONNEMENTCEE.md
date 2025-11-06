# 📦 Guide de Migration EnvironnementCEE → TravauxLinks (/energie)

## 🎯 Objectif
Migrer **100%** du contenu et de la logique métier d'EnvironnementCEE.fr vers TravauxLinks.fr sous la route `/energie`, en conservant toutes les fonctionnalités existantes.

---

## 📋 INVENTAIRE COMPLET DU CONTENU À MIGRER

### 1️⃣ FORMULAIRES (Logique métier critique)

#### **Professionnels**
| Formulaire | Fichier source | Route actuelle | Nouvelle route |
|------------|---------------|----------------|----------------|
| LED Unifié | `src/components/forms/LEDUnifieForm.tsx` | `/pro/led` | `/energie/pro/led` |
| LED Entrepôt | `src/components/forms/LEDEntrepotForm.tsx` | `/pro/led-entrepot` | `/energie/pro/led-entrepot` |
| LED Bureau | `src/components/forms/LEDBureauForm.tsx` | `/pro/led-bureau` | `/energie/pro/led-bureau` |
| LED Solaire | `src/components/forms/LEDSolaireForm.tsx` | `/pro/led-solaire` | `/energie/pro/led-solaire` |
| Isolation Pro | `src/components/forms/IsolationForm.tsx` | `/pro/isolation` | `/energie/pro/isolation` |
| PAC Pro | `src/components/forms/PACForm.tsx` | `/pro/pac` | `/energie/pro/pac` |
| Brasseur Air Pro | `src/components/forms/BrasseurAirForm.tsx` | `/pro/brasseur-air` | `/energie/pro/brasseur-air` |
| HP Flottante | `src/components/forms/HPFlottanteForm.tsx` | `/pro/hp-flottante` | `/energie/pro/hp-flottante` |

#### **Particuliers**
| Formulaire | Fichier source | Route actuelle | Nouvelle route |
|------------|---------------|----------------|----------------|
| Multi Particulier | `src/components/forms/ParticulierMultiForm.tsx` | `/particuliers` | `/energie/particuliers` |
| Isolation | `src/components/forms/IsolationForm.tsx` | `/particulier/isolation` | `/energie/particulier/isolation` |
| PAC | `src/components/forms/PACForm.tsx` | `/particulier/pac` | `/energie/particulier/pac` |
| Brasseur Air | `src/components/forms/BrasseurAirForm.tsx` | `/particulier/brasseur-air` | `/energie/particulier/brasseur-air` |
| MaPrimeRénov | `src/components/forms/MaPrimeRenovForm.tsx` | `/ma-prime-renov` | `/energie/ma-prime-renov` |

#### **Composants de formulaire réutilisables**
- `CheckboxCard.tsx`
- `FormFieldWithIcon.tsx`
- `ReassuranceMessage.tsx`
- `SavedFormNotice.tsx`
- `SimpleRadioGroup.tsx`
- `SuccessConfetti.tsx`
- `TrustSignals.tsx`
- `VisualChoiceCard.tsx`

#### **Validations Zod**
Tous les schémas dans `src/lib/validations/` :
- `brasseur-air.ts`
- `hp-flottante.ts`
- `isolation.ts`
- `led-bureau.ts`
- `led-entrepot.ts`
- `led-solaire.ts`
- `led-unifie.ts`
- `ma-prime-renov.ts`
- `pac.ts`
- `particulier-multi.ts`

---

### 2️⃣ PAGES DE CONTENU

| Page | Fichier source | Route actuelle | Nouvelle route |
|------|---------------|----------------|----------------|
| Home CEE | `src/pages/Index.tsx` | `/` | `/energie` |
| Aides | `src/pages/Aides.tsx` | `/aides` | `/energie/aides` |
| Blog | `src/pages/Blog.tsx` | `/blog` | `/energie/blog` |
| Qui sommes-nous | `src/pages/QuiSommesNous.tsx` | `/qui-sommes-nous` | `/energie/qui-sommes-nous` |
| Simulation | `src/pages/Simulation.tsx` | `/simulation` | `/energie/simulation` |
| Contact | `src/pages/Contact.tsx` | `/contact` | `/energie/contact` |
| Merci | `src/pages/ThankYou.tsx` | `/merci` | `/energie/merci` |
| MaPrimeRénov | `src/pages/MaPrimeRenov.tsx` | `/ma-prime-renov` | `/energie/ma-prime-renov` |

---

### 3️⃣ ARTICLES DE BLOG

| Article | Fichier source | Route actuelle | Nouvelle route |
|---------|---------------|----------------|----------------|
| Aides CEE 2025 | `src/pages/blog/AidesCEE2025.tsx` | `/blog/aides-cee-2025` | `/energie/blog/aides-cee-2025` |
| Isolation Tertiaire | `src/pages/blog/IsolationBatimentTertiaire.tsx` | `/blog/isolation-batiment-tertiaire` | `/energie/blog/isolation-batiment-tertiaire` |
| PAC Industrielle | `src/pages/blog/PACIndustrielle.tsx` | `/blog/pac-industrielle` | `/energie/blog/pac-industrielle` |

**Articles à créer** (mentionnés dans Blog.tsx mais non implémentés) :
- LED ROI et économies
- Cumuler les aides
- Rénovation globale 2025

---

### 4️⃣ COMPOSANTS DE SECTIONS

Tous dans `src/components/` :

| Composant | Utilisation | À migrer |
|-----------|-------------|----------|
| `BenefitsSection.tsx` | Avantages CEE | ✅ |
| `ConditionsSection.tsx` | Conditions d'éligibilité | ✅ |
| `EligibilitySection.tsx` | Section éligibilité | ✅ |
| `FAQSection.tsx` | Questions fréquentes | ✅ |
| `Header.tsx` | En-tête avec logos | ✅ |
| `HeroSection.tsx` | Hero principal | ✅ |
| `HowItWorksSection.tsx` | Comment ça marche | ✅ |
| `InfoBanner.tsx` | Bannière info | ✅ |
| `RoleSection.tsx` | Rôle de la plateforme | ✅ |
| `TestimonialsSection.tsx` | Témoignages clients | ✅ |
| `EligibilityForm.tsx` | Formulaire éligibilité | ✅ |
| `StickyCTA.tsx` | CTA fixe | ✅ |

**Composants communs** (partagés avec TravauxLinks) :
- `Navigation.tsx` → À adapter pour double branding
- `Footer.tsx` → À adapter avec lien EnvironnementCEE
- `BackToHome.tsx`
- `ScrollToTop.tsx`
- `CookieBanner.tsx`

---

### 5️⃣ ASSETS VISUELS

#### **SVG Visuels** (`public/visuels/` et `src/assets/visuels/`)
- appartement.svg
- batiment-professionnel.svg
- brasseur-air.svg
- hp-flottante.svg
- isolation-particulier.svg
- isolation-pro.svg
- led-bureau.svg
- led-entrepot.svg
- led-solaire-mural.svg
- led-solaire-piquer.svg
- maison-individuelle.svg
- pac-particulier.svg
- icon-ecology.svg
- icon-energy.svg
- icon-home.svg
- icon-tools.svg

#### **Images** (`src/assets/`)
- audit-led.jpg
- documents-cee.jpg
- hero-led-office.jpg
- installation-led.jpg
- led-modules.jpg

#### **Images Carousel** (`src/assets/carousel/`)
- brasseur-air.jpg
- isolation.jpg
- led-bureau.jpg
- led-entrepot.jpg
- led-solaire.jpg
- panneaux-solaires.jpg
- pompe-chaleur.jpg

#### **Logos**
- logo-cee.png
- logo-ministere.png

---

### 6️⃣ LOGIQUE BACKEND

#### **Edge Functions Supabase**

| Fonction | Fichier | Description | Action |
|----------|---------|-------------|--------|
| submit-lead | `supabase/functions/submit-lead/index.ts` | Soumission leads avec validation, rate limiting, anti-duplicate | ✅ Réutiliser tel quel |
| notify-new-lead | `supabase/functions/notify-new-lead/index.ts` | Notifications email via Resend | ✅ Adapter pour TravauxLinks |

#### **Hooks React**
- `src/hooks/useFormPersistence.tsx` - Sauvegarde formulaires en localStorage

#### **Base de données Supabase**
- Table `lead_submissions` (déjà existante)
- Table `artisan_profiles` (existe)
- Table `user_roles` (existe)
- Table `projects` (existe mais sera remplacée par lead_submissions pour clients)
- Table `reviews`, `responses`, etc.

---

### 7️⃣ PAGES LÉGALES

| Page | Fichier | Route actuelle | Nouvelle route |
|------|---------|----------------|----------------|
| Mentions légales | `src/pages/LegalNotice.tsx` | `/mentions-legales` | `/energie/mentions-legales` |
| Confidentialité | `src/pages/PrivacyPolicy.tsx` | `/politique-confidentialite` | `/energie/politique-confidentialite` |
| Cookies | `src/pages/CookiePolicy.tsx` | `/gestion-cookies` | `/energie/gestion-cookies` |

**⚠️ Important** : Ces pages peuvent être **partagées** entre TravauxLinks et EnvironnementCEE (domaine commun), avec adaptation du contenu pour mentionner les deux marques.

---

### 8️⃣ CONFIGURATION & SEO

#### **Fichiers de configuration**
- `tailwind.config.ts` - Thème bleu/vert à conserver
- `src/index.css` - Variables CSS personnalisées
- `vite.config.ts` - Configuration Vite
- `vercel.json` - Configuration déploiement

#### **SEO & Meta**
- Balises `<title>` dans chaque page
- Meta descriptions (actuellement dans composants)
- Sitemap.xml (à générer)
- robots.txt (public/robots.txt)

#### **RGPD**
- CookieBanner.tsx
- Politique de confidentialité complète
- Consentements dans formulaires

---

## 🚀 PLAN DE MIGRATION DÉTAILLÉ

### **ÉTAPE 1 : Préparation (1h)**

1. **Créer nouveau projet Lovable** : TravauxLinks
2. **Exporter assets** du projet actuel :
   ```bash
   # Copier tous les dossiers d'assets
   - public/visuels/ → public/energie/visuels/
   - src/assets/ → src/assets/energie/
   ```
3. **Documenter routes existantes** pour redirections 301

### **ÉTAPE 2 : Structure de base (2h)**

1. **Créer architecture `/energie`** :
   ```
   src/
   ├── pages/
   │   ├── energie/
   │   │   ├── Index.tsx          # Home CEE
   │   │   ├── Aides.tsx
   │   │   ├── Blog.tsx
   │   │   ├── Contact.tsx
   │   │   ├── Simulation.tsx
   │   │   ├── MaPrimeRenov.tsx
   │   │   ├── QuiSommesNous.tsx
   │   │   ├── pro/
   │   │   │   ├── LEDUnifie.tsx
   │   │   │   ├── LEDEntrepot.tsx
   │   │   │   ├── LEDBureau.tsx
   │   │   │   ├── LEDSolaire.tsx
   │   │   │   ├── Isolation.tsx
   │   │   │   ├── PAC.tsx
   │   │   │   ├── BrasseurAir.tsx
   │   │   │   └── HPFlottante.tsx
   │   │   ├── particulier/
   │   │   │   ├── Isolation.tsx
   │   │   │   ├── PAC.tsx
   │   │   │   └── BrasseurAir.tsx
   │   │   ├── particuliers/
   │   │   │   └── Index.tsx      # Multi-form
   │   │   └── blog/
   │   │       ├── AidesCEE2025.tsx
   │   │       ├── IsolationBatimentTertiaire.tsx
   │   │       └── PACIndustrielle.tsx
   ```

2. **Router configuration** :
   ```tsx
   // Dans App.tsx
   <Route path="/energie" element={<EnergieLayout />}>
     <Route index element={<EnergieHome />} />
     <Route path="aides" element={<Aides />} />
     <Route path="blog" element={<Blog />} />
     // ... toutes les sous-routes
   </Route>
   ```

### **ÉTAPE 3 : Migration formulaires (6h)**

**Priorité HAUTE** - C'est le cœur de la logique métier.

1. **Copier tous les composants de formulaires** :
   - `src/components/forms/` → Garder tel quel
   - `src/lib/validations/` → Garder tel quel

2. **Tester chaque formulaire** :
   - Validation Zod fonctionne
   - Soumission à `submit-lead` edge function
   - Email de confirmation reçu
   - Lead créé dans `lead_submissions`

3. **Adapter si nécessaire** :
   - Champ `aid_type` doit correspondre (déjà OK)
   - Champ `user_type` : "professionnel" ou "particulier"

### **ÉTAPE 4 : Migration pages de contenu (4h)**

1. **Copier pages principales** :
   - Index.tsx → /energie/Index.tsx
   - Aides.tsx, Blog.tsx, etc.

2. **Adapter les imports** :
   ```tsx
   // Avant
   import { Header } from "@/components/Header";
   
   // Après (si Header devient spécifique)
   import { EnergieHeader } from "@/components/energie/EnergieHeader";
   ```

3. **Mettre à jour liens internes** :
   ```tsx
   // Avant
   <Link to="/aides">
   
   // Après
   <Link to="/energie/aides">
   ```

4. **Ajouter breadcrumbs** :
   ```tsx
   <Breadcrumb>
     <BreadcrumbLink to="/">TravauxLinks</BreadcrumbLink>
     <BreadcrumbSeparator />
     <BreadcrumbLink to="/energie">Aides Énergie</BreadcrumbLink>
   </Breadcrumb>
   ```

### **ÉTAPE 5 : Migration composants sections (3h)**

1. **Copier tous les composants de sections** :
   - BenefitsSection, HeroSection, FAQSection, etc.
   - Option 1 : Les mettre dans `src/components/energie/`
   - Option 2 : Les garder dans `src/components/` (réutilisables)

2. **Adapter le branding** :
   - Logo EnvironnementCEE dans Header
   - Couleurs : Garder bleu (#3B82F6) + vert (#10B981)
   - Mentions "by TravauxLinks" dans Footer

### **ÉTAPE 6 : Migration assets (1h)**

1. **Copier tous les assets** :
   ```bash
   public/visuels/ → public/energie/visuels/
   src/assets/ → src/assets/energie/
   ```

2. **Mettre à jour imports** :
   ```tsx
   // Avant
   import heroImage from "@/assets/hero-led-office.jpg";
   
   // Après
   import heroImage from "@/assets/energie/hero-led-office.jpg";
   ```

### **ÉTAPE 7 : Backend & Edge Functions (2h)**

1. **Vérifier `submit-lead`** :
   - Fonctionne déjà pour tous les types d'aides
   - Enum `aid_type` contient bien toutes les valeurs

2. **Adapter `notify-new-lead`** :
   - Utiliser `contact@environnementcee.fr` pour emails section /energie
   - Templates Resend spécifiques EnvironnementCEE

3. **Configurer Resend** :
   - Domaine `environnementcee.fr` vérifié
   - Templates avec logo EnvironnementCEE

### **ÉTAPE 8 : SEO & Redirections (3h)**

1. **Balises canoniques** sur toutes les pages `/energie` :
   ```tsx
   <Helmet>
     <link rel="canonical" href="https://travauxlinks.fr/energie/aides" />
   </Helmet>
   ```

2. **Redirections 301** (si ancien domaine actif) :
   ```tsx
   // Dans vercel.json ou middleware
   {
     "redirects": [
       {
         "source": "/aides",
         "destination": "/energie/aides",
         "permanent": true
       },
       // ... toutes les routes
     ]
   }
   ```

3. **Sitemap.xml** :
   - Inclure toutes les routes `/energie/*`
   - Priorité 0.8 pour pages principales
   - Fréquence : weekly

4. **Meta tags optimisés** :
   ```tsx
   <Helmet>
     <title>Aides CEE 2025 - Primes Rénovation Énergétique | EnvironnementCEE by TravauxLinks</title>
     <meta name="description" content="..." />
     <meta property="og:title" content="..." />
     <meta property="og:image" content="..." />
   </Helmet>
   ```

### **ÉTAPE 9 : Navigation & Branding (2h)**

1. **Créer `EnergieLayout` component** :
   ```tsx
   const EnergieLayout = () => (
     <>
       <EnergieHeader /> {/* Logo EnvironnementCEE + menu */}
       <Outlet />
       <EnergieFooter /> {/* Mentions "by TravauxLinks" */}
     </>
   );
   ```

2. **Double navigation** :
   - Header TravauxLinks (global) : "Accueil | Professionnels | Particuliers | **Aides Énergie**"
   - Header EnvironnementCEE (sous /energie) : "Accueil | Aides | Blog | Simulation | Pro | Particuliers"

3. **Footer avec lien croisé** :
   ```tsx
   <Footer>
     <p>EnvironnementCEE est une marque de <Link to="/">TravauxLinks</Link></p>
   </Footer>
   ```

### **ÉTAPE 10 : Tests & QA (4h)**

1. **Parcours utilisateur complet** :
   - Accès via `/energie`
   - Navigation entre pages
   - Remplissage formulaire → Soumission → Email reçu
   - Vérification lead en base

2. **SEO** :
   - Toutes les pages ont title + meta description
   - Canonicals en place
   - Sitemap accessible
   - robots.txt OK

3. **Responsive** :
   - Mobile, tablette, desktop
   - Tous les formulaires utilisables

4. **Performance** :
   - Lighthouse score > 90
   - Images optimisées
   - Pas de console errors

### **ÉTAPE 11 : Déploiement (1h)**

1. **Variables d'environnement** :
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_PUBLISHABLE_KEY=...
   RESEND_API_KEY=...
   ```

2. **Domaine** :
   - `travauxlinks.fr/energie` actif
   - Option : `environnementcee.fr` redirige vers `travauxlinks.fr/energie` (ou inverse)

3. **DNS & SSL** :
   - Vérifier certificats SSL
   - Configurer domaines sur Vercel

4. **Monitoring** :
   - Suivi erreurs (Sentry ou autre)
   - Analytics Google (si applicable)

---

## 📊 RÉCAPITULATIF EFFORT MIGRATION

| Étape | Durée | Priorité |
|-------|-------|----------|
| 1. Préparation | 1h | ⭐⭐⭐ |
| 2. Structure de base | 2h | ⭐⭐⭐ |
| 3. Migration formulaires | 6h | ⭐⭐⭐ |
| 4. Migration pages | 4h | ⭐⭐⭐ |
| 5. Migration composants | 3h | ⭐⭐ |
| 6. Migration assets | 1h | ⭐⭐ |
| 7. Backend & Edge Functions | 2h | ⭐⭐⭐ |
| 8. SEO & Redirections | 3h | ⭐⭐⭐ |
| 9. Navigation & Branding | 2h | ⭐⭐ |
| 10. Tests & QA | 4h | ⭐⭐⭐ |
| 11. Déploiement | 1h | ⭐⭐⭐ |
| **TOTAL** | **29h** | **~4 jours** |

---

## 🎨 BRANDING "EnvironnementCEE by TravauxLinks"

### **Identité visuelle**
- **Logo principal** : EnvironnementCEE (avec feuille verte)
- **Baseline** : "by TravauxLinks" (discret, sous le logo)
- **Couleurs** :
  - Primaire : Bleu (#3B82F6) - Confiance
  - Secondaire : Vert (#10B981) - Écologie
  - Accents : Identiques à projet actuel

### **Ton & Communication**
- **Section /energie** : Focus aides, économies, écologie
- **Lien vers TravauxLinks** : "Besoin d'un artisan ? Découvrez TravauxLinks"
- **Synergie** : Utilisateur peut venir chercher info sur aides, puis déposer projet travaux sur TravauxLinks

---

## ✅ CHECKLIST FINALE AVANT MISE EN PROD

### **Fonctionnel**
- [ ] Tous les formulaires soumettent correctement
- [ ] Emails de confirmation envoyés (via Resend)
- [ ] Leads enregistrés dans `lead_submissions`
- [ ] Navigation entre pages fluide
- [ ] Liens internes tous fonctionnels
- [ ] Retour à TravauxLinks possible (breadcrumb ou menu)

### **SEO**
- [ ] Toutes les pages ont `<title>` unique
- [ ] Toutes les pages ont `<meta description>`
- [ ] Canonicals sur toutes les pages `/energie`
- [ ] Sitemap.xml à jour et déclaré
- [ ] robots.txt configuré
- [ ] Redirections 301 en place (si ancien domaine)

### **Performance**
- [ ] Lighthouse score > 90
- [ ] Images optimisées (WebP, lazy loading)
- [ ] Pas de console errors
- [ ] Temps de chargement < 3s

### **RGPD**
- [ ] Cookie banner actif
- [ ] Politique de confidentialité mise à jour
- [ ] Mentions légales à jour
- [ ] Consentements dans formulaires

### **Responsive**
- [ ] Mobile : tous formulaires utilisables
- [ ] Tablette : mise en page correcte
- [ ] Desktop : layout optimal

### **Branding**
- [ ] Logo EnvironnementCEE visible
- [ ] Mention "by TravauxLinks" présente
- [ ] Lien retour vers TravauxLinks
- [ ] Couleurs bleu/vert respectées

---

## 🚨 POINTS D'ATTENTION CRITIQUES

### **1. Ne PAS perdre de fonctionnalités**
Tous les formulaires actuels doivent continuer de fonctionner **exactement** comme avant. Aucune régression tolérée.

### **2. Cohérence des données**
Le champ `aid_type` dans `lead_submissions` doit être cohérent entre ancien et nouveau site :
- `led_entrepot`, `led_bureau`, `led_solaire`, `multi_led_pro`
- `isolation`, `pac`, `brasseur_air`, `housse_piscine`
- `multi_particulier`, `ma_prime_renov`

### **3. Emails via Resend**
- **Domaine** : `contact@environnementcee.fr` (déjà configuré)
- **Templates** : Adapter pour mentionner EnvironnementCEE + TravauxLinks

### **4. SEO : Éviter duplicate content**
- Canonicals obligatoires
- Si ancien domaine actif : redirections 301
- Sinon : désactiver ancien domaine

### **5. Tests de formulaires exhaustifs**
Chaque formulaire doit être testé en conditions réelles :
- Remplissage complet
- Validation erreurs
- Soumission
- Email reçu
- Lead en base
- Données correctes

---

## 📝 NOTES TECHNIQUES IMPORTANTES

### **Structure de `lead_submissions`**
La table actuelle supporte déjà tous les types d'aides. Vérifier que tous les champs spécifiques sont bien présents :

```sql
-- Champs communs à tous
first_name, last_name, email, phone, postal_code

-- Champs spécifiques LED
surface, ceiling_height, fixture_count, current_fixture_type, zone_type

-- Champs spécifiques Isolation
wall_material, insulation_type, construction_year

-- Champs spécifiques PAC
heating_system, pac_type, room_count

-- Champs spécifiques Brasseur Air
usage_type

-- Champs spécifiques HP Flottante
cold_room_volume, target_temperature

-- Champs particuliers
building_type, income_bracket

-- Pro
company_name, siren, employees
```

### **Hooks à conserver**
- `useFormPersistence` : Sauvegarde auto en localStorage (UX++)
- `use-mobile` : Détection mobile pour affichages adaptatifs

### **Composants UI Shadcn**
Tous les composants UI sont déjà installés et utilisés. Aucune dépendance manquante.

---

## 🎯 RÉSULTAT ATTENDU

Après migration, l'utilisateur peut :

1. **Accéder à `/energie`** → Arrive sur home EnvironnementCEE (ex-index actuel)
2. **Naviguer dans la section énergie** → Aides, Blog, Simulateur, etc.
3. **Remplir un formulaire** → LED, Isolation, PAC, etc.
4. **Recevoir confirmation** → Email via Resend
5. **Lead enregistré** → Dans Supabase `lead_submissions`
6. **Retourner sur TravauxLinks** → Via breadcrumb ou menu

**Et en parallèle :**
- La home `/` de TravauxLinks sera la nouvelle plateforme de mise en relation artisans
- Les deux sites coexistent harmonieusement sous le même domaine
- SEO préservé (canonicals + redirections)
- Aucune perte de trafic ou de conversions

---

## 📞 CONTACTS & RESSOURCES

- **Documentation Lovable** : https://docs.lovable.dev/
- **Supabase Docs** : https://supabase.com/docs
- **Resend API** : https://resend.com/docs
- **Vercel Deployment** : https://vercel.com/docs

---

*Document créé le : {{ DATE }}*  
*Dernière mise à jour : {{ DATE }}*  
*Version : 1.0*
