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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { brasseurAirStep1Schema, brasseurAirStep2PartSchema, brasseurAirStep2ProSchema, type BrasseurAirStep1Data, type BrasseurAirStep2PartData, type BrasseurAirStep2ProData } from "@/lib/validations/brasseur-air";

export const BrasseurAirForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<"particulier" | "professionnel">("particulier");
  const [step1Data, setStep1Data] = useState<BrasseurAirStep1Data | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form1 = useForm<BrasseurAirStep1Data>({
    resolver: zodResolver(brasseurAirStep1Schema),
    defaultValues: { usage_type: "", ceiling_height: undefined, surface: undefined, room_count: undefined, postal_code: "" },
  });

  const form2Part = useForm<BrasseurAirStep2PartData>({
    resolver: zodResolver(brasseurAirStep2PartSchema),
    defaultValues: { first_name: "", last_name: "", email: "", phone: "", consent_privacy: false, consent_partner: false },
  });

  const form2Pro = useForm<BrasseurAirStep2ProData>({
    resolver: zodResolver(brasseurAirStep2ProSchema),
    defaultValues: { company_name: "", siren: "", employees: "", first_name: "", last_name: "", email: "", phone: "", consent_privacy: false, consent_partner: false },
  });

  const onStep1Submit = (data: BrasseurAirStep1Data) => { setStep1Data(data); setStep(2); };

  const onStep2Submit = async (data: BrasseurAirStep2PartData | BrasseurAirStep2ProData) => {
    if (!step1Data) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("submit-lead", { body: { aid_type: "brasseur_air", user_type: userType, ...step1Data, ...data } });
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
            <FormField control={form1.control} name="usage_type" render={({ field }) => (
              <FormItem><FormLabel>Usage</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Sélectionnez" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="domestique">Domestique</SelectItem>
                    <SelectItem value="industriel">Industriel</SelectItem>
                  </SelectContent>
                </Select><FormMessage /></FormItem>
            )} />
            <FormField control={form1.control} name="ceiling_height" render={({ field }) => (<FormItem><FormLabel>Hauteur sous plafond (m)</FormLabel><FormControl><Input type="number" step="0.1" placeholder="ex: 3" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form1.control} name="surface" render={({ field }) => (<FormItem><FormLabel>Surface à ventiler (m²)</FormLabel><FormControl><Input type="number" placeholder="ex: 80" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form1.control} name="room_count" render={({ field }) => (<FormItem><FormLabel>Nombre de pièces/zones</FormLabel><FormControl><Input type="number" placeholder="ex: 3" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form1.control} name="postal_code" render={({ field }) => (<FormItem><FormLabel>Code postal</FormLabel><FormControl><Input placeholder="ex: 75001" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <Button type="submit" className="w-full">Continuer</Button>
          </form>
        </Form>
      ) : (
        <Tabs value={userType} onValueChange={(v) => setUserType(v as any)}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="particulier">Particulier</TabsTrigger>
            <TabsTrigger value="professionnel">Professionnel</TabsTrigger>
          </TabsList>
          <TabsContent value="particulier">
            <Form {...form2Part}>
              <form onSubmit={form2Part.handleSubmit(onStep2Submit)} className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Vos coordonnées</h2>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form2Part.control} name="first_name" render={({ field }) => (<FormItem><FormLabel>Prénom</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form2Part.control} name="last_name" render={({ field }) => (<FormItem><FormLabel>Nom</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <FormField control={form2Part.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form2Part.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input type="tel" placeholder="0612345678" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form2Part.control} name="consent_privacy" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>J'accepte la politique de confidentialité *</FormLabel><FormMessage /></div></FormItem>)} />
                <FormField control={form2Part.control} name="consent_partner" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>J'accepte d'être contacté par les partenaires</FormLabel></div></FormItem>)} />
                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">Retour</Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1">{isSubmitting ? "Envoi..." : "Envoyer ma demande"}</Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="professionnel">{/* Similar pro form */}</TabsContent>
        </Tabs>
      )}
    </Card>
  );
};
