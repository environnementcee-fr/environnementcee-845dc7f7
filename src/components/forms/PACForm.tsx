import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  pacStep1Schema,
  pacStep2Schema,
  pacStep3PartSchema,
  pacStep4PartSchema,
  type PACStep1Data,
  type PACStep2Data,
  type PACStep3PartData,
  type PACStep4PartData,
} from "@/lib/validations/pac";
import { VisualStepWizard, WizardStep } from "./VisualStepWizard";
import { VisualChoiceCard } from "./VisualChoiceCard";
import { FormFieldWithIcon } from "./FormFieldWithIcon";
import { SuccessConfetti } from "./SuccessConfetti";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormLabel } from "@/components/ui/form";
import pacHero from "@/assets/forms/pac-hero.jpg";

const PACForm = () => {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<PACStep1Data | null>(null);
  const [step2Data, setStep2Data] = useState<PACStep2Data | null>(null);
  const [step3Data, setStep3Data] = useState<PACStep3PartData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const form1 = useForm<PACStep1Data>({
    resolver: zodResolver(pacStep1Schema),
    defaultValues: { building_type: "" },
  });

  const form2 = useForm<PACStep2Data>({
    resolver: zodResolver(pacStep2Schema),
  });

  const form3 = useForm<PACStep3PartData>({
    resolver: zodResolver(pacStep3PartSchema),
  });

  const form4 = useForm<PACStep4PartData>({
    resolver: zodResolver(pacStep4PartSchema),
  });

  const wizardSteps: WizardStep[] = [
    { id: 1, title: "Parlez-nous de votre projet", emoji: "🏠", illustration: pacHero },
    { id: 2, title: "Quelques détails pour calculer vos aides", emoji: "💡", illustration: pacHero },
    { id: 3, title: "Votre situation", emoji: "📊", illustration: pacHero },
    { id: 4, title: "On vous recontacte rapidement", emoji: "📧", illustration: pacHero },
  ];

  const buildingType = form1.watch("building_type");

  return (
    <>
      <SuccessConfetti trigger={showConfetti} />
      <VisualStepWizard
        steps={wizardSteps}
        currentStep={step}
        totalSteps={4}
        isLastStep={step === 4}
        isSubmitting={isSubmitting}
        canContinue={step === 1 ? !!buildingType : true}
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
            const { data: response, error } = await supabase.functions.invoke("submit-lead", {
              body: { 
                aid_type: "pac", 
                user_type: "particulier", 
                ...step1Data, 
                ...step2Data, 
                ...step3Data, 
                ...data 
              },
            });

            if (error) throw error;

            setShowConfetti(true);
            toast.success("Votre demande a été envoyée avec succès !");
            
            setTimeout(() => {
              navigate("/simulation/resultats", {
                state: {
                  results: {
                    eligibility_score: response?.eligibility_score || 0,
                    estimated_aids: response?.estimated_aids || {},
                    mpr_category: response?.mpr_category,
                    user_type: "particulier",
                    aid_type: "pac",
                    first_name: data.first_name,
                    estimated_cost: 12000
                  }
                }
              });
            }, 2000);
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
              <VisualChoiceCard 
                illustration="🏡" 
                title="Maison individuelle"
                isSelected={buildingType === "maison"} 
                onClick={() => form1.setValue("building_type", "maison")}
                onAutoAdvance={() => form1.handleSubmit((data) => { setStep1Data(data); setStep(2); })()} 
              />
              <VisualChoiceCard 
                illustration="🏢" 
                title="Appartement"
                isSelected={buildingType === "appartement"} 
                onClick={() => form1.setValue("building_type", "appartement")}
                onAutoAdvance={() => form1.handleSubmit((data) => { setStep1Data(data); setStep(2); })()} 
              />
            </div>
          </Form>
        )}
        {step === 2 && (
          <Form {...form2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form2.control} name="surface" render={({ field }) => (
                <FormFieldWithIcon icon="📐" label="Surface (m²)">
                  <FormItem><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                </FormFieldWithIcon>
              )} />
              <FormField control={form2.control} name="current_heating_type" render={({ field }) => (
                <FormFieldWithIcon icon="🔋" label="Chauffage actuel">
                  <FormItem>
                    <Select onValueChange={field.onChange}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="fioul">Fioul</SelectItem>
                      <SelectItem value="gaz">Gaz</SelectItem>
                      <SelectItem value="electrique">Électrique</SelectItem>
                    </SelectContent></Select><FormMessage />
                  </FormItem>
                </FormFieldWithIcon>
              )} />
              <FormField control={form2.control} name="construction_year" render={({ field }) => (
                <FormFieldWithIcon icon="📅" label="Année construction">
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
        {step === 3 && (
          <Form {...form3}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form3.control} name="household_size" render={({ field }) => (
                <FormFieldWithIcon icon="👥" label="Nb personnes">
                  <FormItem><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
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

export default PACForm;
