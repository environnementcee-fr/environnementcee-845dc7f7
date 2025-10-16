import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  brasseurAirStep1Schema,
  brasseurAirStep2Schema,
  brasseurAirStep3PartSchema,
  brasseurAirStep3ProSchema,
  brasseurAirStep4PartSchema,
  brasseurAirStep4ProSchema,
  type BrasseurAirStep1Data,
  type BrasseurAirStep2Data,
  type BrasseurAirStep3PartData,
  type BrasseurAirStep3ProData,
  type BrasseurAirStep4PartData,
  type BrasseurAirStep4ProData,
} from "@/lib/validations/brasseur-air";
import { VisualStepWizard, WizardStep } from "./VisualStepWizard";
import { VisualChoiceCard } from "./VisualChoiceCard";
import { FormFieldWithIcon } from "./FormFieldWithIcon";
import { SuccessConfetti } from "./SuccessConfetti";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormLabel } from "@/components/ui/form";
const maisonImg = "/visuels/maison-individuelle.svg";
const batimentProImg = "/visuels/batiment-professionnel.svg";
const brasseurAirImg = "/visuels/brasseur-air.svg";

export const BrasseurAirForm = () => {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<BrasseurAirStep1Data | null>(null);
  const [step2Data, setStep2Data] = useState<BrasseurAirStep2Data | null>(null);
  const [step3Data, setStep3Data] = useState<BrasseurAirStep3PartData | BrasseurAirStep3ProData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const form1 = useForm<BrasseurAirStep1Data>({
    resolver: zodResolver(brasseurAirStep1Schema),
    defaultValues: { usage_type: "", user_type: "" },
  });

  const form2 = useForm<BrasseurAirStep2Data>({
    resolver: zodResolver(brasseurAirStep2Schema),
  });

  const form3Part = useForm<BrasseurAirStep3PartData>({
    resolver: zodResolver(brasseurAirStep3PartSchema),
  });

  const form3Pro = useForm<BrasseurAirStep3ProData>({
    resolver: zodResolver(brasseurAirStep3ProSchema),
  });

  const form4Part = useForm<BrasseurAirStep4PartData>({
    resolver: zodResolver(brasseurAirStep4PartSchema),
  });

  const form4Pro = useForm<BrasseurAirStep4ProData>({
    resolver: zodResolver(brasseurAirStep4ProSchema),
  });

  const usageType = form1.watch("usage_type");
  const userType = form1.watch("user_type");
  const isPart = userType === "particulier";

  const wizardSteps: WizardStep[] = [
    { id: 1, title: "Type d'usage 🌀", emoji: "🏠", illustration: isPart ? "🏠" : "🏢" },
    { id: 2, title: "Détails du projet 📋", emoji: "💡", illustration: "🌀" },
    { id: 3, title: "Votre situation 📊", emoji: "📊", illustration: isPart ? "🏠" : "🏢" },
    { id: 4, title: "On vous recontacte 🚀", emoji: "📧", illustration: "🌀" },
  ];

  return (
    <>
      <SuccessConfetti trigger={showConfetti} />
      <VisualStepWizard
        steps={wizardSteps}
        currentStep={step}
        totalSteps={4}
        isLastStep={step === 4}
        isSubmitting={isSubmitting}
        canContinue={step === 1 ? !!usageType && !!userType : true}
        onNext={() => {
          if (step === 1) form1.handleSubmit((data) => { setStep1Data(data); setStep(2); })();
          else if (step === 2) form2.handleSubmit((data) => { setStep2Data(data); setStep(3); })();
          else if (step === 3) {
            if (isPart) form3Part.handleSubmit((data) => { setStep3Data(data); setStep(4); })();
            else form3Pro.handleSubmit((data) => { setStep3Data(data); setStep(4); })();
          }
        }}
        onBack={() => setStep(step - 1)}
        onSubmit={isPart ?
          form4Part.handleSubmit(async (data) => {
            if (!step1Data || !step2Data || !step3Data) return;
            setIsSubmitting(true);
            try {
              await supabase.functions.invoke("submit-lead", {
                body: { type: "brasseur_air", user_type: "particulier", ...step1Data, ...step2Data, ...step3Data, ...data },
              });
              setShowConfetti(true);
              toast.success("Votre demande a été envoyée avec succès !");
              setTimeout(() => navigate("/merci"), 2000);
            } catch (error) {
              toast.error("Une erreur est survenue.");
            } finally {
              setIsSubmitting(false);
            }
          }) :
          form4Pro.handleSubmit(async (data) => {
            if (!step1Data || !step2Data || !step3Data) return;
            setIsSubmitting(true);
            try {
              await supabase.functions.invoke("submit-lead", {
                body: { type: "brasseur_air", user_type: "professionnel", ...step1Data, ...step2Data, ...step3Data, ...data },
              });
              setShowConfetti(true);
              toast.success("Votre demande a été envoyée avec succès !");
              setTimeout(() => navigate("/merci"), 2000);
            } catch (error) {
              toast.error("Une erreur est survenue.");
            } finally {
              setIsSubmitting(false);
            }
          })
        }
      >
        {step === 1 && (
          <Form {...form1}>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Vous êtes :</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <VisualChoiceCard illustration="👤" title="Particulier"
                    isSelected={userType === "particulier"} onClick={() => form1.setValue("user_type", "particulier")} />
                  <VisualChoiceCard illustration="🏢" title="Professionnel"
                    isSelected={userType === "professionnel"} onClick={() => form1.setValue("user_type", "professionnel")} />
                </div>
              </div>

              {userType && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Type d'usage :</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <VisualChoiceCard illustration="🏡" title="Domestique"
                      isSelected={usageType === "domestique"} onClick={() => form1.setValue("usage_type", "domestique")} />
                    <VisualChoiceCard illustration="🏭" title="Industriel"
                      isSelected={usageType === "industriel"} onClick={() => form1.setValue("usage_type", "industriel")} />
                  </div>
                </div>
              )}
            </div>
          </Form>
        )}

        {step === 2 && (
          <Form {...form2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form2.control} name="ceiling_height" render={({ field }) => (
                <FormFieldWithIcon icon="📏" label="Hauteur sous plafond (m)">
                  <FormItem><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>
                </FormFieldWithIcon>
              )} />
              <FormField control={form2.control} name="surface" render={({ field }) => (
                <FormFieldWithIcon icon="📐" label="Surface à ventiler (m²)">
                  <FormItem><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                </FormFieldWithIcon>
              )} />
              <FormField control={form2.control} name="room_count" render={({ field }) => (
                <FormFieldWithIcon icon="🚪" label="Nombre de pièces/zones">
                  <FormItem><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                </FormFieldWithIcon>
              )} />
              <FormField control={form2.control} name="postal_code" render={({ field }) => (
                <FormFieldWithIcon icon="📍" label="Code postal">
                  <FormItem><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                </FormFieldWithIcon>
              )} />
            </div>
          </Form>
        )}

        {step === 3 && isPart && (
          <Form {...form3Part}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form3Part.control} name="household_size" render={({ field }) => (
                <FormFieldWithIcon icon="👥" label="Nombre de personnes">
                  <FormItem><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                </FormFieldWithIcon>
              )} />
            </div>
          </Form>
        )}

        {step === 3 && !isPart && (
          <Form {...form3Pro}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form3Pro.control} name="company_name" render={({ field }) => (
                <FormFieldWithIcon icon="🏢" label="Nom de l'entreprise"><FormItem><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem></FormFieldWithIcon>
              )} />
              <FormField control={form3Pro.control} name="siren" render={({ field }) => (
                <FormFieldWithIcon icon="🔢" label="SIREN"><FormItem><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem></FormFieldWithIcon>
              )} />
              <FormField control={form3Pro.control} name="employees" render={({ field }) => (
                <FormFieldWithIcon icon="👥" label="Nombre de salariés">
                  <FormItem>
                    <Select onValueChange={field.onChange}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="1-10">1 à 10</SelectItem>
                      <SelectItem value="11-50">11 à 50</SelectItem>
                      <SelectItem value="51-250">51 à 250</SelectItem>
                      <SelectItem value="250+">Plus de 250</SelectItem>
                    </SelectContent></Select><FormMessage />
                  </FormItem>
                </FormFieldWithIcon>
              )} />
            </div>
          </Form>
        )}

        {step === 4 && isPart && (
          <Form {...form4Part}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form4Part.control} name="first_name" render={({ field }) => (
                  <FormFieldWithIcon icon="👤" label="Prénom"><FormItem><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem></FormFieldWithIcon>
                )} />
                <FormField control={form4Part.control} name="last_name" render={({ field }) => (
                  <FormFieldWithIcon icon="👤" label="Nom"><FormItem><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem></FormFieldWithIcon>
                )} />
                <FormField control={form4Part.control} name="email" render={({ field }) => (
                  <FormFieldWithIcon icon="📧" label="Email"><FormItem><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem></FormFieldWithIcon>
                )} />
                <FormField control={form4Part.control} name="phone" render={({ field }) => (
                  <FormFieldWithIcon icon="📞" label="Téléphone"><FormItem><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem></FormFieldWithIcon>
                )} />
              </div>
              <FormField control={form4Part.control} name="consent_privacy" render={({ field }) => (
                <FormItem className="flex items-start space-x-3"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <FormLabel>J'accepte la politique de confidentialité *</FormLabel><FormMessage /></FormItem>
              )} />
            </div>
          </Form>
        )}

        {step === 4 && !isPart && (
          <Form {...form4Pro}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form4Pro.control} name="first_name" render={({ field }) => (
                  <FormFieldWithIcon icon="👤" label="Prénom"><FormItem><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem></FormFieldWithIcon>
                )} />
                <FormField control={form4Pro.control} name="last_name" render={({ field }) => (
                  <FormFieldWithIcon icon="👤" label="Nom"><FormItem><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem></FormFieldWithIcon>
                )} />
                <FormField control={form4Pro.control} name="email" render={({ field }) => (
                  <FormFieldWithIcon icon="📧" label="Email"><FormItem><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem></FormFieldWithIcon>
                )} />
                <FormField control={form4Pro.control} name="phone" render={({ field }) => (
                  <FormFieldWithIcon icon="📞" label="Téléphone"><FormItem><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem></FormFieldWithIcon>
                )} />
              </div>
              <FormField control={form4Pro.control} name="consent_privacy" render={({ field }) => (
                <FormItem className="flex items-start space-x-3"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <FormLabel>J'accepte la politique de confidentialité *</FormLabel><FormMessage /></FormItem>
              )} />
            </div>
          </Form>
        )}
      </VisualStepWizard>
    </>
  );
};
