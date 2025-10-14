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
import { ledBureauStep1Schema, ledBureauStep2ProSchema, type LEDBureauStep1Data, type LEDBureauStep2ProData } from "@/lib/validations/led-bureau";

export const LEDBureauForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<LEDBureauStep1Data | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form1 = useForm<LEDBureauStep1Data>({
    resolver: zodResolver(ledBureauStep1Schema),
    defaultValues: {
      surface: undefined,
      fixture_count: undefined,
      current_fixture_type: "",
      postal_code: "",
    },
  });

  const form2 = useForm<LEDBureauStep2ProData>({
    resolver: zodResolver(ledBureauStep2ProSchema),
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

  const onStep1Submit = (data: LEDBureauStep1Data) => {
    setStep1Data(data);
    setStep(2);
  };

  const onStep2Submit = async (data: LEDBureauStep2ProData) => {
    if (!step1Data) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("submit-lead", {
        body: {
          aid_type: "led_bureau",
          user_type: "professionnel",
          ...step1Data,
          ...data,
        },
      });

      if (error) throw error;

      toast.success("Votre demande a été envoyée avec succès !");
      navigate("/merci");
    } catch (error: any) {
      console.error("Erreur lors de l'envoi:", error);
      toast.error(error.message || "Une erreur est survenue lors de l'envoi du formulaire");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
          <span className="ml-4 text-sm text-muted-foreground">Étape {step}/2</span>
        </div>
      </div>

      {step === 1 ? (
        <Form {...form1}>
          <form onSubmit={form1.handleSubmit(onStep1Submit)} className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Informations sur votre projet</h2>

            <FormField
              control={form1.control}
              name="surface"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Superficie des bureaux (m²)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="ex: 200" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form1.control}
              name="fixture_count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de luminaires</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="ex: 30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form1.control}
              name="current_fixture_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de luminaires actuels</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dalles">Dalles</SelectItem>
                      <SelectItem value="tubes">Tubes</SelectItem>
                      <SelectItem value="lampes">Lampes</SelectItem>
                      <SelectItem value="autres">Autres</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form1.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code postal</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: 75001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Continuer</Button>
          </form>
        </Form>
      ) : (
        <Form {...form2}>
          <form onSubmit={form2.handleSubmit(onStep2Submit)} className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Vos coordonnées</h2>

            <FormField
              control={form2.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de l'entreprise</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form2.control}
              name="siren"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SIREN</FormLabel>
                  <FormControl>
                    <Input placeholder="123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form2.control}
              name="employees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de salariés</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-10">1 à 10</SelectItem>
                      <SelectItem value="11-50">11 à 50</SelectItem>
                      <SelectItem value="51-250">51 à 250</SelectItem>
                      <SelectItem value="250+">Plus de 250</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form2.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form2.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form2.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form2.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="0612345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form2.control}
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
              control={form2.control}
              name="consent_partner"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      J'accepte d'être contacté par les partenaires
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                Retour
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Envoi..." : "Envoyer ma demande"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </Card>
  );
};
