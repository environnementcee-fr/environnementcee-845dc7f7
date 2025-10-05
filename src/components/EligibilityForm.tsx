import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const step1Schema = z.object({
  buildingType: z.string().min(1, "Veuillez sélectionner un type de bâtiment"),
  surface: z.string().min(1, "Veuillez indiquer la surface").refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Surface invalide"),
  currentLighting: z.string().min(1, "Veuillez sélectionner un type d'éclairage"),
  postalCode: z.string().regex(/^\d{5}$/, "Code postal invalide (5 chiffres)"),
});

const step2Schema = z.object({
  companyName: z.string().min(2, "Raison sociale requise").max(100),
  siren: z.string().regex(/^\d{9}$/, "SIREN invalide (9 chiffres)"),
  employees: z.string().min(1, "Effectif requis"),
  lastName: z.string().min(2, "Nom requis").max(50),
  firstName: z.string().min(2, "Prénom requis").max(50),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Téléphone invalide"),
  consentPartner: z.boolean().refine((val) => val === true, "Consentement requis"),
  consentPrivacy: z.boolean().refine((val) => val === true, "Consentement requis"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

export const EligibilityForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const { toast } = useToast();

  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      buildingType: "",
      surface: "",
      currentLighting: "",
      postalCode: "",
    },
  });

  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      companyName: "",
      siren: "",
      employees: "",
      lastName: "",
      firstName: "",
      email: "",
      phone: "",
      consentPartner: false,
      consentPrivacy: false,
    },
  });

  const onStep1Submit = (data: Step1Data) => {
    setStep1Data(data);
    setStep(2);
  };

  const onStep2Submit = async (data: Step2Data) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      // Combine both steps data
      const fullData = {
        building_type: step1Data?.buildingType || "",
        surface: parseInt(step1Data?.surface || "0"),
        current_lighting: step1Data?.currentLighting || "",
        postal_code: step1Data?.postalCode || "",
        company_name: data.companyName,
        siren: data.siren,
        employees: data.employees,
        last_name: data.lastName,
        first_name: data.firstName,
        email: data.email,
        phone: data.phone,
        consent_partner: data.consentPartner,
        consent_privacy: data.consentPrivacy,
      };

      console.log("Envoi du lead:", fullData);

      // Insérer dans Supabase
      const { data: insertedLead, error: insertError } = await supabase
        .from("lead_submissions")
        .insert([fullData])
        .select()
        .single();

      if (insertError) {
        console.error("Erreur insertion:", insertError);
        throw insertError;
      }

      console.log("Lead enregistré:", insertedLead);

      // Appeler la fonction edge pour envoyer les emails
      const { error: functionError } = await supabase.functions.invoke(
        "notify-new-lead",
        {
          body: insertedLead,
        }
      );

      if (functionError) {
        console.error("Erreur notification email:", functionError);
        // On continue même si l'email échoue, le lead est enregistré
      }

      toast({
        title: "Demande envoyée avec succès",
        description: "Vous serez recontacté sous 48h par notre équipe.",
      });

      setSubmitted(true);
    } catch (error: any) {
      console.error("Erreur lors de la soumission:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card className="p-12 text-center max-w-2xl mx-auto shadow-elegant animate-scale-in">
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-foreground">
          Votre demande est prise en compte
        </h3>
        <p className="text-muted-foreground mb-6">
          Merci pour votre intérêt ! Un expert vous contactera sous 48 heures pour étudier votre projet et vous accompagner dans vos démarches CEE.
        </p>
        <Button 
          onClick={() => {
            setSubmitted(false);
            setStep(1);
            form1.reset();
            form2.reset();
          }}
          variant="outline"
        >
          Faire une nouvelle simulation
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8 max-w-3xl mx-auto shadow-elegant animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold text-foreground">
            {step === 1 ? "Votre projet" : "Vos coordonnées"}
          </h3>
          <span className="text-sm text-muted-foreground">
            Étape {step} / 2
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full gradient-primary transition-all duration-500"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 ? (
        <form onSubmit={form1.handleSubmit(onStep1Submit)} className="space-y-6">
          <div>
            <Label htmlFor="buildingType">Type de bâtiment *</Label>
            <select
              id="buildingType"
              {...form1.register("buildingType")}
              className="w-full mt-1.5 px-4 py-2.5 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-ring transition-smooth"
            >
              <option value="">Sélectionnez...</option>
              <option value="bureau">Bureaux</option>
              <option value="commerce">Commerce</option>
              <option value="hotel">Hôtellerie</option>
              <option value="industrie">Industrie</option>
              <option value="enseignement">Enseignement</option>
              <option value="sante">Santé</option>
              <option value="sport">Sport & Loisirs</option>
              <option value="autre">Autre tertiaire</option>
            </select>
            {form1.formState.errors.buildingType && (
              <p className="text-destructive text-sm mt-1.5 font-medium">{form1.formState.errors.buildingType.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="surface">Surface éclairée (m²) *</Label>
            <Input
              id="surface"
              type="number"
              placeholder="Ex: 500"
              {...form1.register("surface")}
              className="mt-1.5"
            />
            {form1.formState.errors.surface && (
              <p className="text-destructive text-sm mt-1">{form1.formState.errors.surface.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="currentLighting">Type d'éclairage actuel *</Label>
            <select
              id="currentLighting"
              {...form1.register("currentLighting")}
              className="w-full mt-1.5 px-4 py-2.5 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-ring transition-smooth"
            >
              <option value="">Sélectionnez...</option>
              <option value="halogene">Halogènes</option>
              <option value="fluorescent">Tubes fluorescents</option>
              <option value="incandescent">Ampoules incandescentes</option>
              <option value="mixte">Mixte</option>
              <option value="autre">Autre</option>
            </select>
            {form1.formState.errors.currentLighting && (
              <p className="text-destructive text-sm mt-1.5 font-medium">{form1.formState.errors.currentLighting.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="postalCode">Code postal *</Label>
            <Input
              id="postalCode"
              placeholder="Ex: 75001"
              maxLength={5}
              {...form1.register("postalCode")}
              className="mt-1.5"
            />
            {form1.formState.errors.postalCode && (
              <p className="text-destructive text-sm mt-1">{form1.formState.errors.postalCode.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-smooth h-12 text-base font-semibold"
          >
            Continuer
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      ) : (
        <form onSubmit={form2.handleSubmit(onStep2Submit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="companyName">Raison sociale *</Label>
              <Input
                id="companyName"
                placeholder="Votre entreprise"
                {...form2.register("companyName")}
                className="mt-1.5"
              />
              {form2.formState.errors.companyName && (
                <p className="text-destructive text-sm mt-1">{form2.formState.errors.companyName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="siren">SIREN *</Label>
              <Input
                id="siren"
                placeholder="123456789"
                maxLength={9}
                {...form2.register("siren")}
                className="mt-1.5"
              />
              {form2.formState.errors.siren && (
                <p className="text-destructive text-sm mt-1">{form2.formState.errors.siren.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="employees">Effectif *</Label>
            <select
              id="employees"
              {...form2.register("employees")}
              className="w-full mt-1.5 px-4 py-2.5 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-ring transition-smooth"
            >
              <option value="">Sélectionnez...</option>
              <option value="1-10">1 à 10 salariés</option>
              <option value="11-50">11 à 50 salariés</option>
              <option value="51-250">51 à 250 salariés</option>
              <option value="250+">Plus de 250 salariés</option>
            </select>
            {form2.formState.errors.employees && (
              <p className="text-destructive text-sm mt-1.5 font-medium">{form2.formState.errors.employees.message}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                placeholder="Dupont"
                {...form2.register("lastName")}
                className="mt-1.5"
              />
              {form2.formState.errors.lastName && (
                <p className="text-destructive text-sm mt-1">{form2.formState.errors.lastName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                placeholder="Jean"
                {...form2.register("firstName")}
                className="mt-1.5"
              />
              {form2.formState.errors.firstName && (
                <p className="text-destructive text-sm mt-1">{form2.formState.errors.firstName.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email professionnel *</Label>
            <Input
              id="email"
              type="email"
              placeholder="jean.dupont@entreprise.fr"
              {...form2.register("email")}
              className="mt-1.5"
            />
            {form2.formState.errors.email && (
              <p className="text-destructive text-sm mt-1">{form2.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Téléphone *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="06 12 34 56 78"
              {...form2.register("phone")}
              className="mt-1.5"
            />
            {form2.formState.errors.phone && (
              <p className="text-destructive text-sm mt-1">{form2.formState.errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="consentPartner"
                checked={form2.watch("consentPartner")}
                onCheckedChange={(checked) => form2.setValue("consentPartner", checked as boolean)}
              />
              <label htmlFor="consentPartner" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                J'accepte que mes données soient transmises à un partenaire qualifié pour étudier mon projet *
              </label>
            </div>
            {form2.formState.errors.consentPartner && (
              <p className="text-destructive text-sm">{form2.formState.errors.consentPartner.message}</p>
            )}

            <div className="flex items-start space-x-3">
              <Checkbox
                id="consentPrivacy"
                checked={form2.watch("consentPrivacy")}
                onCheckedChange={(checked) => form2.setValue("consentPrivacy", checked as boolean)}
              />
              <label htmlFor="consentPrivacy" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                J'accepte la politique de confidentialité et le traitement de mes données personnelles *
              </label>
            </div>
            {form2.formState.errors.consentPrivacy && (
              <p className="text-destructive text-sm">{form2.formState.errors.consentPrivacy.message}</p>
            )}
          </div>

          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setStep(1)}
              className="flex-1 h-12"
              disabled={isSubmitting}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Retour
            </Button>
            <Button 
              type="submit" 
              className="flex-1 gradient-primary text-primary-foreground hover:opacity-90 transition-smooth h-12 text-base font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  Envoyer ma demande
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
};
