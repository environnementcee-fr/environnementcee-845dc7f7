import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Home, Wind, MapPin, Euro, User, Phone, Mail } from "lucide-react";
import { ventilationFormSchema, type VentilationFormData } from "@/lib/validations/ventilation";
import { VisualStepWizard } from "./VisualStepWizard";
import { VisualChoiceCard } from "./VisualChoiceCard";
import { FormFieldWithIcon } from "./FormFieldWithIcon";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SuccessConfetti } from "./SuccessConfetti";

const VMCDoubleFluxPartForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const form = useForm<VentilationFormData>({
    resolver: zodResolver(ventilationFormSchema),
    defaultValues: {
      building_type: undefined,
      ventilation_type: "vmc_double",
      surface: 100,
      current_ventilation: undefined,
      construction_year: 2000,
      postal_code: "",
      revenu_fiscal: 0,
      nb_personnes_foyer: 2,
      region: "autre",
      owner_status: "occupant",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      consent_privacy: false,
      consent_partner: false,
    },
  });

  const steps = [
    {
      id: "type-logement",
      title: "Type de logement",
      subtitle: "Quel type de bien souhaitez-vous équiper ?",
      emoji: "🏠",
      illustration: "",
    },
    {
      id: "details-vmc",
      title: "Votre VMC",
      subtitle: "Caractéristiques de votre projet de ventilation",
      emoji: "💨",
      illustration: "",
    },
    {
      id: "situation-contact",
      title: "Votre situation",
      subtitle: "Pour calculer vos aides et vous recontacter",
      emoji: "📋",
      illustration: "",
    },
  ];

  const onSubmit = async (data: VentilationFormData) => {
    setIsSubmitting(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("submit-lead", {
        body: {
          ...data,
          aid_type: "vmc_double_flux",
          user_type: "particulier",
        },
      });

      if (error) throw error;

      setShowConfetti(true);
      toast.success("Demande envoyée avec succès !");

      setTimeout(() => {
        navigate("/simulation/resultats", {
          state: {
            eligibility_score: result?.eligibility_score,
            estimated_aids: result?.estimated_aids,
            mpr_category: result?.mpr_category,
          },
        });
      }, 1500);
    } catch (error: any) {
      console.error("Erreur soumission:", error);
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    const fieldsToValidate = currentStep === 0 
      ? ["building_type"]
      : currentStep === 1
      ? ["ventilation_type", "surface", "current_ventilation"]
      : ["construction_year", "postal_code", "revenu_fiscal", "nb_personnes_foyer", "region", "owner_status", "first_name", "last_name", "email", "phone", "consent_privacy"];

    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  return (
    <Form {...form}>
      <SuccessConfetti trigger={showConfetti} />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <VisualStepWizard
          steps={steps}
          currentStep={currentStep}
          totalSteps={steps.length}
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={form.handleSubmit(onSubmit)}
          isLastStep={currentStep === steps.length - 1}
          isSubmitting={isSubmitting}
          canContinue={true}
        >
          {currentStep === 0 && (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="building_type"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <VisualChoiceCard
                        icon={<Home className="h-8 w-8" />}
                        title="Maison individuelle"
                        subtitle="Propriété avec combles accessibles"
                        isSelected={field.value === "maison"}
                        onClick={() => field.onChange("maison")}
                      />
                      <VisualChoiceCard
                        icon={<Home className="h-8 w-8" />}
                        title="Appartement"
                        subtitle="En copropriété"
                        isSelected={field.value === "appartement"}
                        onClick={() => field.onChange("appartement")}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="surface"
                render={({ field }) => (
                  <FormFieldWithIcon icon={<Home />} label="Surface du logement (m²)">
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        placeholder="Ex: 100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormFieldWithIcon>
                )}
              />

              <FormField
                control={form.control}
                name="current_ventilation"
                render={({ field }) => (
                  <FormFieldWithIcon icon={<Wind />} label="Système de ventilation actuel">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="naturelle">Ventilation naturelle</SelectItem>
                        <SelectItem value="vmc_simple">VMC simple flux</SelectItem>
                        <SelectItem value="vmc_hygro">VMC hygroréglable</SelectItem>
                        <SelectItem value="aucune">Aucune ventilation</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormFieldWithIcon>
                )}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="construction_year"
                  render={({ field }) => (
                    <FormFieldWithIcon icon={<Home />} label="Année de construction">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          placeholder="Ex: 2000"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postal_code"
                  render={({ field }) => (
                    <FormFieldWithIcon icon={<MapPin />} label="Code postal">
                      <FormControl>
                        <Input {...field} placeholder="Ex: 75001" maxLength={5} />
                      </FormControl>
                      <FormMessage />
                    </FormFieldWithIcon>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="revenu_fiscal"
                  render={({ field }) => (
                    <FormFieldWithIcon icon={<Euro />} label="Revenu fiscal de référence (€)">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          placeholder="Ex: 30000"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nb_personnes_foyer"
                  render={({ field }) => (
                    <FormFieldWithIcon icon={<User />} label="Nombre de personnes">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          placeholder="Ex: 2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormFieldWithIcon>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormFieldWithIcon icon={<MapPin />} label="Région">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="idf">Île-de-France</SelectItem>
                        <SelectItem value="autre">Autre région</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormFieldWithIcon>
                )}
              />

              <FormField
                control={form.control}
                name="owner_status"
                render={({ field }) => (
                  <FormFieldWithIcon icon={<Home />} label="Vous êtes">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="occupant">Propriétaire occupant</SelectItem>
                        <SelectItem value="bailleur">Propriétaire bailleur</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormFieldWithIcon>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormFieldWithIcon icon={<User />} label="Prénom">
                      <FormControl>
                        <Input {...field} placeholder="Votre prénom" />
                      </FormControl>
                      <FormMessage />
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormFieldWithIcon icon={<User />} label="Nom">
                      <FormControl>
                        <Input {...field} placeholder="Votre nom" />
                      </FormControl>
                      <FormMessage />
                    </FormFieldWithIcon>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormFieldWithIcon icon={<Mail />} label="Email">
                      <FormControl>
                        <Input {...field} type="email" placeholder="votre@email.com" />
                      </FormControl>
                      <FormMessage />
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormFieldWithIcon icon={<Phone />} label="Téléphone">
                      <FormControl>
                        <Input {...field} placeholder="06 12 34 56 78" />
                      </FormControl>
                      <FormMessage />
                    </FormFieldWithIcon>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="consent_privacy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        J'accepte la politique de confidentialité *
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consent_partner"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        J'accepte d'être recontacté par des partenaires
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}
        </VisualStepWizard>
      </form>
    </Form>
  );
};

export default VMCDoubleFluxPartForm;
