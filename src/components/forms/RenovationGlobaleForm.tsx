import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormFieldWithIcon } from "./FormFieldWithIcon";
import { ConditionalFields } from "./ConditionalFields";
import { VisualStepWizard } from "./VisualStepWizard";
import { TRAVAUX_CATALOG } from "@/data/travauxCatalog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckboxCard } from "./CheckboxCard";

const AIDES_LIST = [
  { id: "mpr", label: "MaPrimeRénov'", icon: "🏠" },
  { id: "cee", label: "CEE (Certificats d'Économie d'Énergie)", icon: "⚡" },
  { id: "ptz", label: "Éco-PTZ", icon: "🏦" },
  { id: "tva", label: "TVA réduite 5,5%", icon: "💰" },
  { id: "locales", label: "Aides locales", icon: "🏛️" },
];

const WIZARD_STEPS = [
  { id: "profil", title: "Profil", subtitle: "Particulier ou Professionnel", emoji: "👤", illustration: "" },
  { id: "aides", title: "Aides", subtitle: "Aides que vous visez", emoji: "🎯", illustration: "" },
  { id: "travaux", title: "Travaux", subtitle: "Types de travaux concernés", emoji: "🔨", illustration: "" },
  { id: "contexte", title: "Contexte", subtitle: "Détails du chantier", emoji: "🏗️", illustration: "" },
  { id: "details", title: "Détails", subtitle: "Informations spécifiques", emoji: "📋", illustration: "" },
  { id: "coordonnees", title: "Contact", subtitle: "Vos coordonnées", emoji: "📱", illustration: "" },
];

export const RenovationGlobaleForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({
    segment: "",
    aides_souhaitees: [],
    travaux_selectionnes: [],
    postal_code: "",
    ville: "",
    surface: "",
    construction_year: "",
    building_type: "maison",
    statut_occupant: "proprietaire_occupant",
    nb_personnes: "",
    revenu_fiscal: "",
    siret: "",
    raison_sociale: "",
    type_site: "tertiaire",
    details_travaux: {},
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    consent_privacy: false,
    consent_partner: false,
    description: "",
    budget: "",
    delai: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sauvegarder brouillon
  useEffect(() => {
    if (currentStep > 0) {
      localStorage.setItem("lead_global_draft", JSON.stringify(formData));
    }
  }, [formData, currentStep]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const toggleArrayField = (field: string, value: string) => {
    setFormData(prev => {
      const current = prev[field] || [];
      const updated = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.segment) newErrors.segment = "Sélectionnez votre profil";
    }

    if (step === 1) {
      if (formData.aides_souhaitees.length === 0) {
        newErrors.aides_souhaitees = "Sélectionnez au moins une aide";
      }
    }

    if (step === 2) {
      if (formData.travaux_selectionnes.length === 0) {
        newErrors.travaux_selectionnes = "Sélectionnez au moins un type de travaux";
      }
    }

    if (step === 3) {
      if (!formData.postal_code || !/^\d{5}$/.test(formData.postal_code)) {
        newErrors.postal_code = "Code postal invalide";
      }
      if (!formData.ville) newErrors.ville = "Ville requise";
      if (!formData.surface || formData.surface < 1) {
        newErrors.surface = "Surface requise";
      }
      if (!formData.construction_year || formData.construction_year < 1800 || formData.construction_year > new Date().getFullYear()) {
        newErrors.construction_year = "Année de construction invalide";
      }

      // Validation selon profil
      if (formData.segment === "part") {
        if (!formData.nb_personnes || formData.nb_personnes < 1) {
          newErrors.nb_personnes = "Nombre de personnes requis";
        }
        if (!formData.revenu_fiscal || formData.revenu_fiscal < 0) {
          newErrors.revenu_fiscal = "Revenu fiscal requis";
        }
      } else if (formData.segment === "pro") {
        if (!formData.siret || formData.siret.length !== 14) {
          newErrors.siret = "SIRET invalide (14 chiffres)";
        }
        if (!formData.raison_sociale) {
          newErrors.raison_sociale = "Raison sociale requise";
        }
      }
    }

    if (step === 5) {
      if (!formData.first_name) newErrors.first_name = "Prénom requis";
      if (!formData.last_name) newErrors.last_name = "Nom requis";
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Email invalide";
      }
      if (!formData.phone || !/^[0-9\s\-\+]{10,}$/.test(formData.phone)) {
        newErrors.phone = "Téléphone invalide";
      }
      if (!formData.consent_privacy) newErrors.consent_privacy = "Consentement RGPD requis";
      if (!formData.consent_partner) newErrors.consent_partner = "Consentement transmission requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Calculer l'éligibilité multi-travaux
      const { data: eligibilityData, error: eligibilityError } = await supabase.functions.invoke(
        "calculate-eligibility",
        {
          body: {
            user_type: formData.segment === "part" ? "particulier" : "professionnel",
            postal_code: formData.postal_code,
            construction_year: parseInt(formData.construction_year),
            surface: parseFloat(formData.surface),
            nb_personnes: formData.nb_personnes ? parseInt(formData.nb_personnes) : undefined,
            revenu_fiscal: formData.revenu_fiscal ? parseFloat(formData.revenu_fiscal) : undefined,
            travaux_ids: formData.travaux_selectionnes,
            project_data: {
              aides_souhaitees: formData.aides_souhaitees,
              details_travaux: formData.details_travaux,
              description: formData.description,
              budget: formData.budget,
              delai: formData.delai,
            },
          },
        }
      );

      if (eligibilityError) {
        console.error("Erreur calcul éligibilité:", eligibilityError);
      }

      // Créer le lead
      const payload = {
        user_type: formData.segment === "part" ? "particulier" : "professionnel",
        aid_type: "renovation_globale",
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        postal_code: formData.postal_code,
        building_type: formData.building_type,
        construction_year: parseInt(formData.construction_year),
        surface: parseFloat(formData.surface),
        consent_privacy: formData.consent_privacy,
        consent_partner: formData.consent_partner,
        status: "nouveau",
        eligibility_score: eligibilityData?.score || 50,
        estimated_aids: eligibilityData?.eligibilite || {},
        mpr_category: eligibilityData?.revenu_category || null,
        project_data: {
          aides_souhaitees: formData.aides_souhaitees,
          travaux_selectionnes: formData.travaux_selectionnes,
          ville: formData.ville,
          nb_personnes: formData.nb_personnes,
          revenu_fiscal: formData.revenu_fiscal,
          siret: formData.siret,
          raison_sociale: formData.raison_sociale,
          type_site: formData.type_site,
          statut_occupant: formData.statut_occupant,
          details_travaux: formData.details_travaux,
          description: formData.description,
          budget: formData.budget,
          delai: formData.delai,
          total_aides_estimees: eligibilityData?.total_aides_estimees || 0,
        },
      };

      const { error: insertError } = await supabase
        .from("lead_submissions")
        .insert([payload]);

      if (insertError) throw insertError;

      // Notification
      try {
        await supabase.functions.invoke("notify-new-lead", {
          body: { 
            leadData: payload, 
            segment: formData.segment === "part" ? "particulier" : "professionnel",
          }
        });
      } catch (fnError) {
        console.error("Erreur notification:", fnError);
      }

      toast.success("Demande envoyée avec succès !");
      localStorage.removeItem("lead_global_draft");
      
      // Rediriger vers résultats avec données d'éligibilité
      navigate("/simulation/resultats", {
        state: {
          eligibility_score: eligibilityData?.score || 50,
          estimated_aids: eligibilityData?.eligibilite || {},
          total_aides_estimees: eligibilityData?.total_aides_estimees || 0,
          mpr_category: eligibilityData?.revenu_category || null,
        },
      });
    } catch (error: any) {
      console.error("Erreur soumission:", error);
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const travauxDisponibles = TRAVAUX_CATALOG.filter(t => {
    if (formData.segment === "part") return t.segment === "part" || t.segment === "mixte";
    if (formData.segment === "pro") return t.segment === "pro" || t.segment === "mixte";
    return false;
  });

  return (
    <VisualStepWizard
      steps={WIZARD_STEPS}
      currentStep={currentStep}
      totalSteps={WIZARD_STEPS.length}
      onNext={handleNext}
      onBack={handleBack}
      onSubmit={handleSubmit}
      isLastStep={currentStep === WIZARD_STEPS.length - 1}
      isSubmitting={isSubmitting}
      canContinue={true}
    >
      {/* ÉTAPE 0 - Profil */}
      {currentStep === 0 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Vous êtes ...</h2>
            <p className="text-muted-foreground">Sélectionnez votre profil pour adapter les aides disponibles</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <CheckboxCard
              id="profil-part"
              checked={formData.segment === "part"}
              onChange={() => updateField("segment", "part")}
              icon="🏠"
              title="Particulier"
              description="Propriétaire occupant, bailleur ou locataire"
            />
            <CheckboxCard
              id="profil-pro"
              checked={formData.segment === "pro"}
              onChange={() => updateField("segment", "pro")}
              icon="🏢"
              title="Professionnel"
              description="Entreprise, commerce, industrie"
            />
          </div>
          {errors.segment && <p className="text-sm text-destructive text-center">{errors.segment}</p>}
        </div>
      )}

      {/* ÉTAPE 1 - Aides souhaitées */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Quelles aides visez-vous ?</h2>
            <p className="text-muted-foreground">Sélectionnez les dispositifs d'aide qui vous intéressent</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {AIDES_LIST.map(aide => (
              <CheckboxCard
                key={aide.id}
                id={`aide-${aide.id}`}
                checked={formData.aides_souhaitees.includes(aide.id)}
                onChange={() => toggleArrayField("aides_souhaitees", aide.id)}
                icon={aide.icon}
                title={aide.label}
              />
            ))}
          </div>
          {errors.aides_souhaitees && <p className="text-sm text-destructive text-center">{errors.aides_souhaitees}</p>}
        </div>
      )}

      {/* ÉTAPE 2 - Travaux */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Quels travaux envisagez-vous ?</h2>
            <p className="text-muted-foreground">Sélectionnez tous les types de travaux concernés</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {travauxDisponibles.map(travaux => (
              <CheckboxCard
                key={travaux.id}
                id={`travaux-${travaux.id}`}
                checked={formData.travaux_selectionnes.includes(travaux.id)}
                onChange={() => toggleArrayField("travaux_selectionnes", travaux.id)}
                icon={travaux.icon}
                title={travaux.label}
                description={travaux.tag}
              />
            ))}
          </div>
          {errors.travaux_selectionnes && <p className="text-sm text-destructive text-center">{errors.travaux_selectionnes}</p>}
        </div>
      )}

      {/* ÉTAPE 3 - Contexte */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Contexte du chantier</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <FormFieldWithIcon icon="📍" label="Code postal">
              <Input
                placeholder="Ex: 75001"
                maxLength={5}
                value={formData.postal_code}
                onChange={(e) => updateField("postal_code", e.target.value.replace(/\D/g, ""))}
              />
              {errors.postal_code && <p className="text-sm text-destructive">{errors.postal_code}</p>}
            </FormFieldWithIcon>

            <FormFieldWithIcon icon="🏙️" label="Ville">
              <Input
                placeholder="Ex: Paris"
                value={formData.ville}
                onChange={(e) => updateField("ville", e.target.value)}
              />
              {errors.ville && <p className="text-sm text-destructive">{errors.ville}</p>}
            </FormFieldWithIcon>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormFieldWithIcon icon="📐" label="Surface totale (m²)">
              <Input
                type="number"
                min="1"
                placeholder="Ex: 100"
                value={formData.surface}
                onChange={(e) => updateField("surface", e.target.value)}
              />
              {errors.surface && <p className="text-sm text-destructive">{errors.surface}</p>}
            </FormFieldWithIcon>

            <FormFieldWithIcon icon="📅" label="Année de construction">
              <Input
                type="number"
                min="1800"
                max={new Date().getFullYear()}
                placeholder="Ex: 1990"
                value={formData.construction_year}
                onChange={(e) => updateField("construction_year", e.target.value)}
              />
              {errors.construction_year && <p className="text-sm text-destructive">{errors.construction_year}</p>}
            </FormFieldWithIcon>
          </div>

          {/* Champs spécifiques Particulier */}
          {formData.segment === "part" && (
            <>
              <FormFieldWithIcon icon="🏠" label="Type de logement">
                <Select value={formData.building_type} onValueChange={(v) => updateField("building_type", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maison">Maison individuelle</SelectItem>
                    <SelectItem value="appartement">Appartement</SelectItem>
                  </SelectContent>
                </Select>
              </FormFieldWithIcon>

              <FormFieldWithIcon icon="👤" label="Statut">
                <Select value={formData.statut_occupant} onValueChange={(v) => updateField("statut_occupant", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proprietaire_occupant">Propriétaire occupant</SelectItem>
                    <SelectItem value="proprietaire_bailleur">Propriétaire bailleur</SelectItem>
                    <SelectItem value="locataire">Locataire</SelectItem>
                  </SelectContent>
                </Select>
              </FormFieldWithIcon>

              <div className="grid md:grid-cols-2 gap-4">
                <FormFieldWithIcon icon="👥" label="Nombre de personnes au foyer">
                  <Input
                    type="number"
                    min="1"
                    placeholder="Ex: 4"
                    value={formData.nb_personnes}
                    onChange={(e) => updateField("nb_personnes", e.target.value)}
                  />
                  {errors.nb_personnes && <p className="text-sm text-destructive">{errors.nb_personnes}</p>}
                </FormFieldWithIcon>

                <FormFieldWithIcon icon="💰" label="Revenu fiscal de référence (€)">
                  <Input
                    type="number"
                    min="0"
                    placeholder="Ex: 25000"
                    value={formData.revenu_fiscal}
                    onChange={(e) => updateField("revenu_fiscal", e.target.value)}
                  />
                  {errors.revenu_fiscal && <p className="text-sm text-destructive">{errors.revenu_fiscal}</p>}
                </FormFieldWithIcon>
              </div>
            </>
          )}

          {/* Champs spécifiques Pro */}
          {formData.segment === "pro" && (
            <>
              <FormFieldWithIcon icon="🏢" label="SIRET">
                <Input
                  placeholder="14 chiffres"
                  maxLength={14}
                  value={formData.siret}
                  onChange={(e) => updateField("siret", e.target.value.replace(/\D/g, ""))}
                />
                {errors.siret && <p className="text-sm text-destructive">{errors.siret}</p>}
              </FormFieldWithIcon>

              <FormFieldWithIcon icon="🏷️" label="Raison sociale">
                <Input
                  placeholder="Nom de l'entreprise"
                  value={formData.raison_sociale}
                  onChange={(e) => updateField("raison_sociale", e.target.value)}
                />
                {errors.raison_sociale && <p className="text-sm text-destructive">{errors.raison_sociale}</p>}
              </FormFieldWithIcon>

              <FormFieldWithIcon icon="🏭" label="Type de site">
                <Select value={formData.type_site} onValueChange={(v) => updateField("type_site", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tertiaire">Tertiaire (bureaux, commerces)</SelectItem>
                    <SelectItem value="industriel">Industriel (usines, entrepôts)</SelectItem>
                    <SelectItem value="commercial">Commercial (magasins, showrooms)</SelectItem>
                  </SelectContent>
                </Select>
              </FormFieldWithIcon>
            </>
          )}
        </div>
      )}

      {/* ÉTAPE 4 - Détails travaux */}
      {currentStep === 4 && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold mb-6">Détails de vos travaux</h2>

          {formData.travaux_selectionnes.map((travauxId: string) => {
            const travaux = TRAVAUX_CATALOG.find(t => t.id === travauxId);
            if (!travaux) return null;

            return (
              <div key={travauxId} className="border rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span>{travaux.icon}</span>
                  {travaux.label}
                </h3>
                <ConditionalFields
                  aid={travauxId}
                  segment={formData.segment}
                  values={formData.details_travaux[travauxId] || {}}
                  onChange={(field, value) => {
                    updateField("details_travaux", {
                      ...formData.details_travaux,
                      [travauxId]: {
                        ...(formData.details_travaux[travauxId] || {}),
                        [field]: value,
                      },
                    });
                  }}
                  errors={errors}
                />
              </div>
            );
          })}

          <div className="border-t pt-6 space-y-4">
            <h3 className="font-semibold">Informations complémentaires (optionnel)</h3>
            
            <FormFieldWithIcon icon="✍️" label="Description générale du projet">
              <Textarea
                placeholder="Décrivez votre projet, vos attentes, contraintes particulières..."
                rows={4}
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
            </FormFieldWithIcon>

            <div className="grid md:grid-cols-2 gap-4">
              <FormFieldWithIcon icon="💰" label="Budget global estimé">
                <Select value={formData.budget} onValueChange={(v) => updateField("budget", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moins_10k">Moins de 10 000 €</SelectItem>
                    <SelectItem value="10k_20k">10 000 € - 20 000 €</SelectItem>
                    <SelectItem value="20k_50k">20 000 € - 50 000 €</SelectItem>
                    <SelectItem value="50k_100k">50 000 € - 100 000 €</SelectItem>
                    <SelectItem value="plus_100k">Plus de 100 000 €</SelectItem>
                    <SelectItem value="a_definir">À définir</SelectItem>
                  </SelectContent>
                </Select>
              </FormFieldWithIcon>

              <FormFieldWithIcon icon="⏱️" label="Délai souhaité">
                <Select value={formData.delai} onValueChange={(v) => updateField("delai", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediat">Immédiat (moins d'1 mois)</SelectItem>
                    <SelectItem value="1_3mois">1 à 3 mois</SelectItem>
                    <SelectItem value="3_6mois">3 à 6 mois</SelectItem>
                    <SelectItem value="6_12mois">6 à 12 mois</SelectItem>
                    <SelectItem value="plus_12mois">Plus de 12 mois</SelectItem>
                  </SelectContent>
                </Select>
              </FormFieldWithIcon>
            </div>
          </div>
        </div>
      )}

      {/* ÉTAPE 5 - Coordonnées */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Vos coordonnées</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <FormFieldWithIcon icon="👤" label="Prénom">
              <Input
                placeholder="Prénom"
                value={formData.first_name}
                onChange={(e) => updateField("first_name", e.target.value)}
              />
              {errors.first_name && <p className="text-sm text-destructive">{errors.first_name}</p>}
            </FormFieldWithIcon>

            <FormFieldWithIcon icon="👤" label="Nom">
              <Input
                placeholder="Nom"
                value={formData.last_name}
                onChange={(e) => updateField("last_name", e.target.value)}
              />
              {errors.last_name && <p className="text-sm text-destructive">{errors.last_name}</p>}
            </FormFieldWithIcon>
          </div>

          <FormFieldWithIcon icon="📧" label="Email">
            <Input
              type="email"
              placeholder="email@exemple.com"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </FormFieldWithIcon>

          <FormFieldWithIcon icon="📱" label="Téléphone">
            <Input
              type="tel"
              placeholder="06 12 34 56 78"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </FormFieldWithIcon>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent_privacy"
                checked={formData.consent_privacy}
                onCheckedChange={(checked) => updateField("consent_privacy", checked)}
              />
              <Label htmlFor="consent_privacy" className="text-sm leading-tight cursor-pointer">
                J'accepte la <a href="/politique-confidentialite" className="text-primary underline">politique de confidentialité</a> et le traitement de mes données personnelles.
              </Label>
            </div>
            {errors.consent_privacy && <p className="text-sm text-destructive">{errors.consent_privacy}</p>}

            <div className="flex items-start gap-3">
              <Checkbox
                id="consent_partner"
                checked={formData.consent_partner}
                onCheckedChange={(checked) => updateField("consent_partner", checked)}
              />
              <Label htmlFor="consent_partner" className="text-sm leading-tight cursor-pointer">
                J'accepte d'être contacté par TravauxHub et ses partenaires certifiés pour mon projet.
              </Label>
            </div>
            {errors.consent_partner && <p className="text-sm text-destructive">{errors.consent_partner}</p>}
          </div>
        </div>
      )}
    </VisualStepWizard>
  );
};
