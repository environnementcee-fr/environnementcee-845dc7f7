import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { houssePiscineStep1Schema, houssePiscineStep2PartSchema, type HoussePiscineStep1Data, type HoussePiscineStep2PartData } from "@/lib/validations/housse-piscine";

export const HoussePiscineForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<HoussePiscineStep1Data | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form1 = useForm<HoussePiscineStep1Data>({
    resolver: zodResolver(houssePiscineStep1Schema),
    defaultValues: { surface: undefined, usage_type: "", postal_code: "" },
  });

  const form2 = useForm<HoussePiscineStep2PartData>({
    resolver: zodResolver(houssePiscineStep2PartSchema),
    defaultValues: { first_name: "", last_name: "", email: "", phone: "", consent_privacy: false, consent_partner: false },
  });

  const onStep1Submit = (data: HoussePiscineStep1Data) => { setStep1Data(data); setStep(2); };

  const onStep2Submit = async (data: HoussePiscineStep2PartData) => {
    if (!step1Data) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("submit-lead", { body: { aid_type: "housse_piscine", user_type: "particulier", ...step1Data, ...data } });
      if (error) throw error;
      toast.success("Votre demande a été envoyée avec succès !");
      navigate("/merci");
    } catch (error: any) {
      toast.error(error.message || "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(step / 2) * 100}%` }} />
          </div>
          <span className="ml-4 text-sm text-muted-foreground">Étape {step}/2</span>
        </div>
      </div>
      {step === 1 ? (
        <Form {...form1}>
          <form onSubmit={form1.handleSubmit(onStep1Submit)} className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Informations sur votre projet</h2>
            <FormField control={form1.control} name="surface" render={({ field }) => (<FormItem><FormLabel>Surface de la piscine (m²)</FormLabel><FormControl><Input type="number" placeholder="ex: 32" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form1.control} name="usage_type" render={({ field }) => (
              <FormItem><FormLabel>Type d'usage</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Sélectionnez" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="prive">Usage privé</SelectItem>
                    <SelectItem value="copropriete">Copropriété</SelectItem>
                  </SelectContent>
                </Select><FormMessage /></FormItem>
            )} />
            <FormField control={form1.control} name="postal_code" render={({ field }) => (<FormItem><FormLabel>Code postal</FormLabel><FormControl><Input placeholder="ex: 75001" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <Button type="submit" className="w-full">Continuer</Button>
          </form>
        </Form>
      ) : (
        <Form {...form2}>
          <form onSubmit={form2.handleSubmit(onStep2Submit)} className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Vos coordonnées</h2>
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form2.control} name="first_name" render={({ field }) => (<FormItem><FormLabel>Prénom</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form2.control} name="last_name" render={({ field }) => (<FormItem><FormLabel>Nom</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <FormField control={form2.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form2.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input type="tel" placeholder="0612345678" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form2.control} name="consent_privacy" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>J'accepte la politique de confidentialité *</FormLabel><FormMessage /></div></FormItem>)} />
            <FormField control={form2.control} name="consent_partner" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>J'accepte d'être contacté par les partenaires</FormLabel></div></FormItem>)} />
            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">Retour</Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">{isSubmitting ? "Envoi..." : "Envoyer ma demande"}</Button>
            </div>
          </form>
        </Form>
      )}
    </Card>
  );
};
