import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  ledSolaireStep1Schema,
  ledSolaireStep2Schema,
  ledSolaireStep3Schema,
  ledSolaireStep4Schema,
  type LEDSolaireStep1Data,
  type LEDSolaireStep2Data,
  type LEDSolaireStep3Data,
  type LEDSolaireStep4Data,
} from "@/lib/validations/led-solaire";
import { VisualStepWizard, WizardStep } from "./VisualStepWizard";
import { VisualChoiceCard } from "./VisualChoiceCard";
import { FormFieldWithIcon } from "./FormFieldWithIcon";
import { SuccessConfetti } from "./SuccessConfetti";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormLabel } from "@/components/ui/form";
import ledSolairePiquerImg from "@/assets/visuels/led-solaire-piquer.svg";
import ledSolaireMuralImg from "@/assets/visuels/led-solaire-mural.svg";

export const LEDSolaireForm = () => {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<LEDSolaireStep1Data | null>(null);
  const [step2Data, setStep2Data] = useState<LEDSolaireStep2Data | null>(null);
  const [step3Data, setStep3Data] = useState<LEDSolaireStep3Data | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const form1 = useForm<LEDSolaireStep1Data>({
    resolver: zodResolver(ledSolaireStep1Schema),
    defaultValues: { installation_type: "" },
  });

  const form2 = useForm<LEDSolaireStep2Data>({
    resolver: zodResolver(ledSolaireStep2Schema),
  });

  const form3 = useForm<LEDSolaireStep3Data>({
    resolver: zodResolver(ledSolaireStep3Schema),
  });

  const form4 = useForm<LEDSolaireStep4Data>({
    resolver: zodResolver(ledSolaireStep4Schema),
  });

  const installationType = form1.watch("installation_type");

  const wizardSteps: WizardStep[] = [
    { id: 1, title: "Type d'installation ☀️", emoji: "🏠", illustration: ledSolairePiquerImg },
    { id: 2, title: "Détails de l'éclairage 💡", emoji: "💡", illustration: installationType === "piquer" ? ledSolairePiquerImg : ledSolaireMuralImg },
    { id: 3, title: "Votre entreprise 🏢", emoji: "📊", illustration: ledSolairePiquerImg },
    { id: 4, title: "On vous recontacte 🚀", emoji: "📧", illustration: ledSolairePiquerImg },
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
        canContinue={step === 1 ? !!installationType : true}
        onNext={() => {
          if (step === 1) form1.handleSubmit((data) => { setStep1Data(data); setStep(2); })();
          else if (step === 2) form2.handleSubmit((data) => { setStep2Data(data); setStep(3); })();
          else if (step === 3) form3.handleSubmit((data) => { setStep3Data(data); setStep(4); })();
        }}
        onBack={() => setStep(step - 1)}
        onSubmit={form4.handleSubmit(async (data) => {
          if (!step1Data || !step2Data || !step3Data) return;
          setIsSubmitting(true);
          try {
            await supabase.functions.invoke("submit-lead", {
              body: { type: "led_solaire", user_type: "professionnel", ...step1Data, ...step2Data, ...step3Data, ...data },
            });
            setShowConfetti(true);
            toast.success("Votre demande a été envoyée avec succès !");
            setTimeout(() => navigate("/merci"), 2000);
          } catch (error) {
            toast.error("Une erreur est survenue.");
          } finally {
            setIsSubmitting(false);
          }
        })}
      >
        {step === 1 && (
          <Form {...form1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VisualChoiceCard illustration={ledSolairePiquerImg} title="Lampadaires à piquer" icon="💡"
                isSelected={installationType === "piquer"} onClick={() => form1.setValue("installation_type", "piquer")} />
              <VisualChoiceCard illustration={ledSolaireMuralImg} title="Appliques murales" icon="🌙"
                isSelected={installationType === "mural"} onClick={() => form1.setValue("installation_type", "mural")} />
            </div>
          </Form>
        )}

        {step === 2 && (
          <Form {...form2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form2.control} name="fixture_count" render={({ field }) => (
                <FormFieldWithIcon icon="💡" label="Nombre de points lumineux">
                  <FormItem><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                </FormFieldWithIcon>
              )} />
              <FormField control={form2.control} name="zone_type" render={({ field }) => (
                <FormFieldWithIcon icon="🗺️" label="Type de zone">
                  <FormItem>
                    <Select onValueChange={field.onChange}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="parking">Parking</SelectItem>
                      <SelectItem value="facade">Façade</SelectItem>
                      <SelectItem value="voirie">Voirie</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent></Select><FormMessage />
                  </FormItem>
                </FormFieldWithIcon>
              )} />
              <FormField control={form2.control} name="sun_exposure" render={({ field }) => (
                <FormFieldWithIcon icon="☀️" label="Exposition au soleil">
                  <FormItem>
                    <Select onValueChange={field.onChange}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="forte">Forte</SelectItem>
                      <SelectItem value="moyenne">Moyenne</SelectItem>
                      <SelectItem value="faible">Faible</SelectItem>
                    </SelectContent></Select><FormMessage />
                  </FormItem>
                </FormFieldWithIcon>
              )} />
              <FormField control={form2.control} name="lamppost_height" render={({ field }) => (
                <FormFieldWithIcon icon="📏" label="Hauteur lampadaires (m)">
                  <FormItem><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>
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

        {step === 3 && (
          <Form {...form3}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form3.control} name="company_name" render={({ field }) => (
                <FormFieldWithIcon icon="🏢" label="Nom de l'entreprise"><FormItem><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem></FormFieldWithIcon>
              )} />
              <FormField control={form3.control} name="siren" render={({ field }) => (
                <FormFieldWithIcon icon="🔢" label="SIREN"><FormItem><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem></FormFieldWithIcon>
              )} />
              <FormField control={form3.control} name="employees" render={({ field }) => (
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

        {step === 4 && (
          <Form {...form4}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form4.control} name="first_name" render={({ field }) => (
                  <FormFieldWithIcon icon="👤" label="Prénom"><FormItem><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem></FormFieldWithIcon>
                )} />
                <FormField control={form4.control} name="last_name" render={({ field }) => (
                  <FormFieldWithIcon icon="👤" label="Nom"><FormItem><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem></FormFieldWithIcon>
                )} />
                <FormField control={form4.control} name="email" render={({ field }) => (
                  <FormFieldWithIcon icon="📧" label="Email"><FormItem><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem></FormFieldWithIcon>
                )} />
                <FormField control={form4.control} name="phone" render={({ field }) => (
                  <FormFieldWithIcon icon="📞" label="Téléphone"><FormItem><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem></FormFieldWithIcon>
                )} />
              </div>
              <FormField control={form4.control} name="consent_privacy" render={({ field }) => (
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
