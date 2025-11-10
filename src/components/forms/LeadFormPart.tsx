/**
 * Formulaire dynamique PARTICULIERS
 * S'adapte selon le paramètre ?aid=
 */

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { FormFieldWithIcon } from "./FormFieldWithIcon";
import { ConditionalFields } from "./ConditionalFields";
import { TRAVAUX_CATALOG, getTravauxById } from "@/data/travauxCatalog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const STEPS = ["Votre projet", "Votre logement", "Vos coordonnées"];

export const LeadFormPart = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preselectedAid = searchParams.get("aid") || "";
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({
    aid_type: preselectedAid,
    user_type: "particulier",
    // Étape 1
    description: "",
    budget: "",
    delai: "",
    // Étape 2
    postal_code: "",
    ville: "",
    building_type: "maison",
    construction_year: "",
    statut_occupant: "proprietaire_occupant",
    // Étape 3
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    consent_privacy: false,
    consent_partner: false,
    // Champs conditionnels
    ...{},
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedWork = getTravauxById(formData.aid_type);
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  // Sauvegarder brouillon
  useEffect(() => {
    const key = `lead_part_draft_${formData.aid_type || "generic"}`;
    if (currentStep > 0 || Object.keys(formData).length > 5) {
      localStorage.setItem(key, JSON.stringify(formData));
    }
  }, [formData, currentStep]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.aid_type) newErrors.aid_type = "Type de travaux requis";
      if (!formData.description || formData.description.length < 20) {
        newErrors.description = "Description trop courte (min 20 caractères)";
      }
      if (!formData.budget) newErrors.budget = "Budget requis";
      if (!formData.delai) newErrors.delai = "Délai requis";
    }

    if (step === 1) {
      if (!formData.postal_code || !/^\d{5}$/.test(formData.postal_code)) {
        newErrors.postal_code = "Code postal invalide";
      }
      if (!formData.ville) newErrors.ville = "Ville requise";
      if (!formData.construction_year || formData.construction_year < 1800 || formData.construction_year > new Date().getFullYear()) {
        newErrors.construction_year = "Année de construction invalide";
      }
      
      // Vérifier éligibilité MPR (>15 ans)
      const age = new Date().getFullYear() - parseInt(formData.construction_year);
      if (age < 15 && formData.aid_type !== "pv_part") {
        newErrors.construction_year = "⚠️ Logement < 15 ans : non éligible MaPrimeRénov'";
      }

      // Validation conditionnelle
      if (formData.aid_type?.includes("pac") || formData.aid_type?.includes("isolation") || formData.aid_type?.includes("chaudiere")) {
        if (!formData.energieActuelle) newErrors.energieActuelle = "Énergie actuelle requise";
        // Bloquer si PAC existante → pas éligible Coup de Pouce
        if (formData.energieActuelle === "pac") {
          newErrors.energieActuelle = "⚠️ PAC déjà installée : non éligible aux aides de remplacement";
        }
      }
      if (formData.aid_type?.includes("isolation") && (!formData.surfaceIso || formData.surfaceIso < 1)) {
        newErrors.surfaceIso = "Surface requise";
      }
      if (formData.aid_type?.includes("pac") && !formData.surfaceChauffee) {
        newErrors.surfaceChauffee = "Surface à chauffer requise";
      }
    }

    if (step === 2) {
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
      // Calculer score basique
      let score = 50; // base
      if (formData.delai === "immediat") score += 20;
      if (formData.budget && formData.budget !== "a_definir") score += 10;
      if (formData.description && formData.description.length > 50) score += 10;
      if (formData.phone) score += 10;

      const payload = {
        user_type: "particulier",
        aid_type: formData.aid_type,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        postal_code: formData.postal_code,
        building_type: formData.building_type,
        construction_year: parseInt(formData.construction_year),
        consent_privacy: formData.consent_privacy,
        consent_partner: formData.consent_partner,
        status: "nouveau",
        eligibility_score: score,
        project_data: {
          description: formData.description,
          budget: formData.budget,
          delai: formData.delai,
          ville: formData.ville,
          statut_occupant: formData.statut_occupant,
          ...Object.fromEntries(
            Object.entries(formData).filter(([k]) => 
              !["aid_type", "user_type", "first_name", "last_name", "email", "phone", "postal_code", 
                "building_type", "construction_year", "consent_privacy", "consent_partner", 
                "description", "budget", "delai", "ville", "statut_occupant"].includes(k)
            )
          )
        },
      };

      const { error: insertError } = await supabase
        .from("lead_submissions")
        .insert([payload]);

      if (insertError) throw insertError;

      // Appeler edge function notification
      try {
        await supabase.functions.invoke("notify-new-lead", {
          body: { leadData: payload, segment: "particulier" }
        });
      } catch (fnError) {
        console.error("Erreur notification:", fnError);
      }

      toast.success("Demande envoyée avec succès !");
      localStorage.removeItem(`lead_part_draft_${formData.aid_type}`);
      navigate("/merci?segment=particulier");
    } catch (error: any) {
      console.error("Erreur soumission:", error);
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {STEPS.map((step, idx) => (
            <span 
              key={idx} 
              className={`text-sm font-medium ${idx <= currentStep ? "text-primary" : "text-muted-foreground"}`}
            >
              {step}
            </span>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* En-tête aide sélectionnée */}
      {selectedWork && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">Aide sélectionnée :</p>
          <h3 className="text-lg font-semibold text-primary">{selectedWork.label}</h3>
          {selectedWork.tag && (
            <p className="text-sm text-primary/80 mt-1">🎯 {selectedWork.tag}</p>
          )}
        </div>
      )}

      {/* ÉTAPE 1 - Projet */}
      {currentStep === 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Votre projet de rénovation</h2>

          <FormFieldWithIcon icon="📋" label="Type de travaux">
            <Select value={formData.aid_type} onValueChange={(v) => updateField("aid_type", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez" />
              </SelectTrigger>
              <SelectContent>
                {TRAVAUX_CATALOG.filter(t => t.segment === "part" || t.segment === "mixte").map(t => (
                  <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.aid_type && <p className="text-sm text-red-500">{errors.aid_type}</p>}
          </FormFieldWithIcon>

          <FormFieldWithIcon icon="✍️" label="Décrivez vos besoins">
            <Textarea
              placeholder="Décrivez votre projet, vos attentes, contraintes particulières..."
              rows={4}
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.description?.length || 0} / 20 caractères minimum
            </p>
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </FormFieldWithIcon>

          <FormFieldWithIcon icon="💰" label="Budget estimé">
            <Select value={formData.budget} onValueChange={(v) => updateField("budget", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="moins_5k">Moins de 5 000 €</SelectItem>
                <SelectItem value="5k_10k">5 000 € - 10 000 €</SelectItem>
                <SelectItem value="10k_20k">10 000 € - 20 000 €</SelectItem>
                <SelectItem value="20k_50k">20 000 € - 50 000 €</SelectItem>
                <SelectItem value="plus_50k">Plus de 50 000 €</SelectItem>
                <SelectItem value="a_definir">À définir</SelectItem>
              </SelectContent>
            </Select>
            {errors.budget && <p className="text-sm text-red-500">{errors.budget}</p>}
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
                <SelectItem value="plus_6mois">Plus de 6 mois</SelectItem>
              </SelectContent>
            </Select>
            {errors.delai && <p className="text-sm text-red-500">{errors.delai}</p>}
          </FormFieldWithIcon>

          <div className="flex justify-end gap-4 pt-4">
            <Button size="lg" onClick={handleNext}>
              Suivant
            </Button>
          </div>
        </div>
      )}

      {/* ÉTAPE 2 - Logement + champs conditionnels */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Votre logement</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <FormFieldWithIcon icon="📍" label="Code postal">
              <Input
                placeholder="Ex: 75001"
                maxLength={5}
                value={formData.postal_code}
                onChange={(e) => updateField("postal_code", e.target.value.replace(/\D/g, ""))}
              />
              {errors.postal_code && <p className="text-sm text-red-500">{errors.postal_code}</p>}
            </FormFieldWithIcon>

            <FormFieldWithIcon icon="🏙️" label="Ville">
              <Input
                placeholder="Ex: Paris"
                value={formData.ville}
                onChange={(e) => updateField("ville", e.target.value)}
              />
              {errors.ville && <p className="text-sm text-red-500">{errors.ville}</p>}
            </FormFieldWithIcon>
          </div>

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

          <FormFieldWithIcon icon="📅" label="Année de construction">
            <Input
              type="number"
              min="1800"
              max={new Date().getFullYear()}
              placeholder="Ex: 1990"
              value={formData.construction_year}
              onChange={(e) => updateField("construction_year", e.target.value)}
            />
            {errors.construction_year && <p className="text-sm text-red-500">{errors.construction_year}</p>}
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

          {/* Champs conditionnels selon aide */}
          {formData.aid_type && (
            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Informations spécifiques</h3>
              <ConditionalFields
                aid={formData.aid_type}
                segment="part"
                values={formData}
                onChange={updateField}
                errors={errors}
              />
            </div>
          )}

          <div className="flex justify-between gap-4 pt-4">
            <Button variant="outline" onClick={handleBack}>
              Retour
            </Button>
            <Button size="lg" onClick={handleNext}>
              Suivant
            </Button>
          </div>
        </div>
      )}

      {/* ÉTAPE 3 - Coordonnées */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Vos coordonnées</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <FormFieldWithIcon icon="👤" label="Prénom">
              <Input
                placeholder="Prénom"
                value={formData.first_name}
                onChange={(e) => updateField("first_name", e.target.value)}
              />
              {errors.first_name && <p className="text-sm text-red-500">{errors.first_name}</p>}
            </FormFieldWithIcon>

            <FormFieldWithIcon icon="👤" label="Nom">
              <Input
                placeholder="Nom"
                value={formData.last_name}
                onChange={(e) => updateField("last_name", e.target.value)}
              />
              {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
            </FormFieldWithIcon>
          </div>

          <FormFieldWithIcon icon="📧" label="Email">
            <Input
              type="email"
              placeholder="email@exemple.com"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </FormFieldWithIcon>

          <FormFieldWithIcon icon="📱" label="Téléphone">
            <Input
              type="tel"
              placeholder="06 12 34 56 78"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </FormFieldWithIcon>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent_privacy"
                checked={formData.consent_privacy}
                onCheckedChange={(checked) => updateField("consent_privacy", checked)}
              />
              <label htmlFor="consent_privacy" className="text-sm leading-tight">
                J'accepte la politique de confidentialité et le traitement de mes données personnelles *
              </label>
            </div>
            {errors.consent_privacy && <p className="text-sm text-red-500">{errors.consent_privacy}</p>}

            <div className="flex items-start gap-3">
              <Checkbox
                id="consent_partner"
                checked={formData.consent_partner}
                onCheckedChange={(checked) => updateField("consent_partner", checked)}
              />
              <label htmlFor="consent_partner" className="text-sm leading-tight">
                J'accepte d'être recontacté par EnvironnementCEE.fr et ses partenaires qualifiés *
              </label>
            </div>
            {errors.consent_partner && <p className="text-sm text-red-500">{errors.consent_partner}</p>}
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <Button variant="outline" onClick={handleBack}>
              Retour
            </Button>
            <Button size="lg" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Envoyer ma demande"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};