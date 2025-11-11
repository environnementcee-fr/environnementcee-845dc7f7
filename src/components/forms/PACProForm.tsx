import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { pacProFormSchema, type PACProFormData } from "@/lib/validations/pac-pro";
import { VisualStepWizard, WizardStep } from "./VisualStepWizard";
import { VisualChoiceCard } from "./VisualChoiceCard";
import { FormFieldWithIcon } from "./FormFieldWithIcon";
import { SuccessConfetti } from "./SuccessConfetti";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const PACProForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const form = useForm<PACProFormData>({
    resolver: zodResolver(pacProFormSchema),
    defaultValues: {
      building_type: undefined as any,
      pac_type: undefined as any,
      usage_type: undefined as any,
      puissance_estimee: 0,
      current_heating: undefined as any,
      construction_year: 2000,
      surface_chauffee: 0,
      postal_code: "",
      company_name: "",
      siren: "",
      employees: "",
      secteur: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      consent_privacy: false,
      consent_partner: false,
    },
  });

  const wizardSteps: WizardStep[] = [
    {
      id: 1,
      title: "Parlez-nous de votre projet 🏢",
      subtitle: "Quel type de bâtiment et de pompe à chaleur ?",
      emoji: "🏢",
      illustration: "🔥",
    },
    {
      id: 2,
      title: "Détails techniques ⚙️",
      subtitle: "Pour dimensionner votre projet",
      emoji: "⚙️",
      illustration: "🔥",
    },
    {
      id: 3,
      title: "On vous recontacte rapidement 🚀",
      subtitle: "Vos coordonnées pour finaliser votre dossier",
      emoji: "📧",
      illustration: "🔥",
    },
  ];

  const buildingType = form.watch("building_type");
  const pacType = form.watch("pac_type");
  const usageType = form.watch("usage_type");

  const onStep1Submit = () => {
    const isValid = buildingType && pacType && usageType;
    if (!isValid) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    setStep(2);
  };

  const onStep2Submit = () => {
    const fields = ["puissance_estimee", "current_heating", "construction_year", "surface_chauffee", "postal_code"];
    form.trigger(fields as any).then((isValid) => {
      if (isValid) {
        setStep(3);
      }
    });
  };

  const onFinalSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("submit-lead", {
        body: {
          ...data,
          aid_type: "pac_pro",
          user_type: "professionnel",
        },
      });

      if (error) throw error;

      setShowConfetti(true);
      toast.success("Demande envoyée avec succès !");

      setTimeout(() => {
        navigate("/simulation/resultats", {
          state: {
            results: {
              eligibility_score: result?.eligibility_score || 0,
              estimated_aids: result?.estimated_aids || {},
              mpr_category: result?.mpr_category,
              user_type: "professionnel",
              aid_type: "pac_pro",
              first_name: data.first_name,
              building_type: data.building_type,
              estimated_cost: 50000,
            }
          }
        });
      }, 1500);
    } catch (error: any) {
      console.error("Erreur soumission:", error);
      toast.error(error.message || "Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <>
      {showConfetti && <SuccessConfetti trigger={showConfetti} />}
      <VisualStepWizard
        steps={wizardSteps}
        currentStep={step}
        totalSteps={3}
        isLastStep={step === 3}
        isSubmitting={isSubmitting}
        canContinue={
          step === 1 ? !!(buildingType && pacType && usageType) :
          step === 2 ? true :
          true
        }
        onNext={step === 1 ? onStep1Submit : step === 2 ? onStep2Submit : undefined}
        onBack={() => setStep(step - 1)}
        onSubmit={step === 3 ? onFinalSubmit : undefined}
      >
        {step === 1 && (
          <Form {...form}>
            <form className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Type de bâtiment</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <VisualChoiceCard
                    illustration="🏢"
                    title="Bureaux"
                    isSelected={buildingType === "bureaux"}
                    onClick={() => form.setValue("building_type", "bureaux")}
                  />
                  <VisualChoiceCard
                    illustration="🏭"
                    title="Usine"
                    isSelected={buildingType === "usine"}
                    onClick={() => form.setValue("building_type", "usine")}
                  />
                  <VisualChoiceCard
                    illustration="📦"
                    title="Entrepôt"
                    isSelected={buildingType === "entrepot"}
                    onClick={() => form.setValue("building_type", "entrepot")}
                  />
                  <VisualChoiceCard
                    illustration="🏪"
                    title="Commerce"
                    isSelected={buildingType === "commerce"}
                    onClick={() => form.setValue("building_type", "commerce")}
                  />
                  <VisualChoiceCard
                    illustration="🏗️"
                    title="Autre"
                    isSelected={buildingType === "autre"}
                    onClick={() => form.setValue("building_type", "autre")}
                  />
                </div>
                <FormMessage>{form.formState.errors.building_type?.message}</FormMessage>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Type de pompe à chaleur</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <VisualChoiceCard
                    illustration="🌬️"
                    title="Air-Eau"
                    subtitle="Chauffage central"
                    isSelected={pacType === "air_eau"}
                    onClick={() => form.setValue("pac_type", "air_eau")}
                  />
                  <VisualChoiceCard
                    illustration="🌍"
                    title="Géothermique"
                    subtitle="Captage sol"
                    isSelected={pacType === "geothermique"}
                    onClick={() => form.setValue("pac_type", "geothermique")}
                  />
                  <VisualChoiceCard
                    illustration="💨"
                    title="Air-Air"
                    subtitle="Climatisation réversible"
                    isSelected={pacType === "air_air"}
                    onClick={() => form.setValue("pac_type", "air_air")}
                  />
                </div>
                <FormMessage>{form.formState.errors.pac_type?.message}</FormMessage>
              </div>

              <FormField
                control={form.control}
                name="usage_type"
                render={({ field }) => (
                  <FormFieldWithIcon icon="🎯" label="Usage prévu">
                    <FormItem>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez l'usage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="chauffage_batiment">Chauffage bâtiment</SelectItem>
                          <SelectItem value="process_industriel">Process industriel</SelectItem>
                          <SelectItem value="eau_chaude_sanitaire">Eau chaude sanitaire</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  </FormFieldWithIcon>
                )}
              />
            </form>
          </Form>
        )}

        {step === 2 && (
          <Form {...form}>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="puissance_estimee"
                  render={({ field }) => (
                    <FormFieldWithIcon icon="⚡" label="Puissance estimée (kW)">
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ex: 50"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="current_heating"
                  render={({ field }) => (
                    <FormFieldWithIcon icon="🔥" label="Système actuel">
                      <FormItem>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="fioul">Fioul</SelectItem>
                            <SelectItem value="gaz">Gaz</SelectItem>
                            <SelectItem value="electrique">Électrique</SelectItem>
                            <SelectItem value="charbon">Charbon</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="surface_chauffee"
                  render={({ field }) => (
                    <FormFieldWithIcon icon="📐" label="Surface à chauffer (m²)">
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ex: 500"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="construction_year"
                  render={({ field }) => (
                    <FormFieldWithIcon icon="🏗️" label="Année de construction">
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ex: 2000"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postal_code"
                  render={({ field }) => (
                    <FormFieldWithIcon icon="📍" label="Code postal">
                      <FormItem>
                        <FormControl>
                          <Input placeholder="75001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormFieldWithIcon>
                  )}
                />
              </div>
            </form>
          </Form>
        )}

        {step === 3 && (
          <Form {...form}>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormFieldWithIcon icon="🏢" label="Nom de l'entreprise">
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Votre entreprise" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="siren"
                  render={({ field }) => (
                    <FormFieldWithIcon icon="🔢" label="SIREN">
                      <FormItem>
                        <FormControl>
                          <Input placeholder="123456789" maxLength={9} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employees"
                  render={({ field }) => (
                    <FormFieldWithIcon icon="👥" label="Effectif">
                      <FormItem>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-10">1-10</SelectItem>
                            <SelectItem value="11-50">11-50</SelectItem>
                            <SelectItem value="51-250">51-250</SelectItem>
                            <SelectItem value="250+">250+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="secteur"
                  render={({ field }) => (
                    <FormFieldWithIcon icon="🏭" label="Secteur d'activité">
                      <FormItem>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="industrie">Industrie</SelectItem>
                            <SelectItem value="tertiaire">Tertiaire</SelectItem>
                            <SelectItem value="commerce">Commerce</SelectItem>
                            <SelectItem value="agriculture">Agriculture</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormFieldWithIcon icon="👤" label="Prénom">
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Jean" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormFieldWithIcon icon="👤" label="Nom">
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Dupont" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormFieldWithIcon icon="📧" label="Email">
                      <FormItem>
                        <FormControl>
                          <Input type="email" placeholder="jean@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormFieldWithIcon icon="📞" label="Téléphone">
                      <FormItem>
                        <FormControl>
                          <Input placeholder="0612345678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormFieldWithIcon>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="consent_privacy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormMessage>J'accepte la politique de confidentialité *</FormMessage>
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
                        <FormMessage>J'accepte d'être recontacté par des partenaires</FormMessage>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        )}
      </VisualStepWizard>
    </>
  );
};

export default PACProForm;
