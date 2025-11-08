import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  hpFlottanteStep1Schema,
  hpFlottanteStep2ProSchema,
  type HPFlottanteStep1Data,
  type HPFlottanteStep2ProData,
} from "@/lib/validations/hp-flottante";
import { VisualStepWizard, WizardStep } from "./VisualStepWizard";
import { VisualChoiceCard } from "./VisualChoiceCard";
import { FormFieldWithIcon } from "./FormFieldWithIcon";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
const hpFlottanteImg = "/visuels/hp-flottante.svg";
const batimentProImg = "/visuels/batiment-professionnel.svg";

const HPFlottanteForm = () => {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<HPFlottanteStep1Data | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form1 = useForm<HPFlottanteStep1Data>({
    resolver: zodResolver(hpFlottanteStep1Schema),
    defaultValues: {
      building_type: "",
      cold_room_volume: 0,
      current_temperature: 0,
      operating_hours: 0,
      postal_code: "",
    },
  });

  const form2 = useForm<HPFlottanteStep2ProData>({
    resolver: zodResolver(hpFlottanteStep2ProSchema),
    defaultValues: {
      company_name: "",
      siren: "",
      employees: "",
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
      title: "Parlez-nous de votre projet 🏠",
      subtitle: "Quel type d'installation souhaitez-vous optimiser ?",
      emoji: "🏠",
      illustration: "❄️",
    },
    {
      id: 2,
      title: "On vous recontacte rapidement 🚀",
      subtitle: "Vos coordonnées pour finaliser votre dossier",
      emoji: "📧",
      illustration: "❄️",
    },
  ];

  const onStep1Submit = form1.handleSubmit((data) => {
    setStep1Data(data);
    setStep(2);
  });

  const onStep2Submit = form2.handleSubmit(async (data) => {
    if (!step1Data) return;

    setIsSubmitting(true);
    try {
      const leadData = {
        aid_type: "housse_piscine",
        user_type: "professionnel",
        ...step1Data,
        ...data,
      };

      const { data: response, error } = await supabase.functions.invoke("submit-lead", {
        body: leadData,
      });

      if (error) throw error;

      toast.success("Votre demande a été envoyée avec succès !");
      
      setTimeout(() => {
        navigate("/simulation/resultats", {
          state: {
            results: {
              eligibility_score: response?.eligibility_score || 0,
              estimated_aids: response?.estimated_aids || {},
              mpr_category: response?.mpr_category,
              user_type: "professionnel",
              aid_type: "housse_piscine",
              first_name: data.first_name,
              estimated_cost: 2000
            }
          }
        });
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  });

  const buildingType = form1.watch("building_type");

  return (
    <VisualStepWizard
      steps={wizardSteps}
      currentStep={step}
      totalSteps={2}
      isLastStep={step === 2}
      isSubmitting={isSubmitting}
      canContinue={step === 1 ? !!buildingType : true}
      onNext={step === 1 ? onStep1Submit : undefined}
      onBack={() => setStep(step - 1)}
      onSubmit={onStep2Submit}
    >
      {step === 1 && (
        <Form {...form1}>
          <form onSubmit={onStep1Submit} className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Type de bâtiment</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <VisualChoiceCard
                  illustration="🏪"
                  title="Supermarché"
                  subtitle="Grande surface alimentaire"
                  isSelected={buildingType === "supermarket"}
                  onClick={() => form1.setValue("building_type", "supermarket")}
                />
                <VisualChoiceCard
                  illustration="🏭"
                  title="Grossiste"
                  subtitle="Entrepôt frigorifique"
                  isSelected={buildingType === "wholesaler"}
                  onClick={() => form1.setValue("building_type", "wholesaler")}
                />
                <VisualChoiceCard
                  illustration="🍽️"
                  title="Restaurant"
                  subtitle="Restauration commerciale"
                  isSelected={buildingType === "restaurant"}
                  onClick={() => form1.setValue("building_type", "restaurant")}
                />
              </div>
              <FormMessage>{form1.formState.errors.building_type?.message}</FormMessage>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form1.control}
                name="cold_room_volume"
                render={({ field }) => (
                  <FormFieldWithIcon icon="📦" label="Volume de la chambre froide (m³)">
                    <FormItem>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormFieldWithIcon>
                )}
              />

              <FormField
                control={form1.control}
                name="current_temperature"
                render={({ field }) => (
                  <FormFieldWithIcon icon="🌡️" label="Température de consigne (°C)">
                    <FormItem>
                      <FormControl>
                        <Input type="number" placeholder="Ex: -18" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormFieldWithIcon>
                )}
              />

              <FormField
                control={form1.control}
                name="operating_hours"
                render={({ field }) => (
                  <FormFieldWithIcon icon="⏰" label="Heures de fonctionnement par jour">
                    <FormItem>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 24" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormFieldWithIcon>
                )}
              />

              <FormField
                control={form1.control}
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

      {step === 2 && (
        <Form {...form2}>
          <form onSubmit={onStep2Submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form2.control}
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
                control={form2.control}
                name="siren"
                render={({ field }) => (
                  <FormFieldWithIcon icon="🔢" label="SIREN">
                    <FormItem>
                      <FormControl>
                        <Input placeholder="123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormFieldWithIcon>
                )}
              />

              <FormField
                control={form2.control}
                name="employees"
                render={({ field }) => (
                  <FormFieldWithIcon icon="👥" label="Effectif">
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                control={form2.control}
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
                control={form2.control}
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
                control={form2.control}
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
                control={form2.control}
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
                control={form2.control}
                name="consent_privacy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>J'accepte la politique de confidentialité *</FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form2.control}
                name="consent_partner"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>J'accepte d'être recontacté par des partenaires</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      )}
    </VisualStepWizard>
  );
};

export default HPFlottanteForm;
