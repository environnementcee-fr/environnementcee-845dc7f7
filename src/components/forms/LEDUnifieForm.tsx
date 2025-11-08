import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Building2, Warehouse, Sun, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckboxCard } from "./CheckboxCard";
import { ledUnifieSchema, type LEDUnifieFormData } from "@/lib/validations/led-unifie";
import { SuccessConfetti } from "./SuccessConfetti";

export const LEDUnifieForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLEDs, setSelectedLEDs] = useState<string[]>([]);

  const form = useForm<LEDUnifieFormData>({
    resolver: zodResolver(ledUnifieSchema),
    defaultValues: {
      led_types: [],
      consent_privacy: false,
      consent_partner: false
    }
  });

  const handleLEDToggle = (ledType: string, checked: boolean) => {
    const newSelection = checked
      ? [...selectedLEDs, ledType]
      : selectedLEDs.filter(t => t !== ledType);
    setSelectedLEDs(newSelection);
    form.setValue('led_types', newSelection as any);
  };

  const getContextualHelp = () => {
    if (selectedLEDs.length === 0) return "";
    if (selectedLEDs.length === 1) {
      const types: Record<string, string> = {
        bureau: "Surface totale des espaces de bureaux à équiper",
        entrepot: "Surface totale de l'entrepôt ou zone de stockage",
        solaire: "Surface totale des zones extérieures à éclairer"
      };
      return types[selectedLEDs[0]];
    }
    return "Surface totale de tous les espaces à équiper (cumul)";
  };

  const onSubmit = async (data: LEDUnifieFormData) => {
    setIsSubmitting(true);
    try {
      const { data: response, error } = await supabase.functions.invoke('submit-lead', {
        body: {
          aid_type: 'multi_led_pro',
          user_type: 'professionnel',
          ...data,
          project_data: {
            led_types: data.led_types,
            total_surface: data.total_surface
          }
        }
      });

      if (error) throw error;

      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      toast.success("Demande envoyée avec succès !");
      
      setTimeout(() => {
        navigate('/simulation/resultats', {
          state: {
            results: {
              eligibility_score: response?.eligibility_score || 0,
              estimated_aids: response?.estimated_aids || {},
              mpr_category: response?.mpr_category,
              user_type: "professionnel",
              aid_type: "multi_led_pro",
              first_name: data.first_name,
              estimated_cost: data.total_surface * 50
            }
          }
        });
      }, 1500);
    } catch (error: any) {
      console.error('Erreur:', error);
      toast.error(error.message || "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
        {/* Section 1: Types LED */}
        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-6">Quel type d'éclairage LED vous intéresse ?</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <CheckboxCard
              value="bureau"
              icon={<Building2 />}
              title="LED Bureau"
              checked={selectedLEDs.includes('bureau')}
              onChange={(checked) => handleLEDToggle('bureau', checked)}
            />
            <CheckboxCard
              value="entrepot"
              icon={<Warehouse />}
              title="LED Entrepôt"
              checked={selectedLEDs.includes('entrepot')}
              onChange={(checked) => handleLEDToggle('entrepot', checked)}
            />
            <CheckboxCard
              value="solaire"
              icon={<Sun />}
              title="LED Solaire"
              checked={selectedLEDs.includes('solaire')}
              onChange={(checked) => handleLEDToggle('solaire', checked)}
            />
          </div>
          {form.formState.errors.led_types && (
            <p className="text-sm text-destructive mt-2">{form.formState.errors.led_types.message}</p>
          )}
        </Card>

        {/* Section 2: Infos Entreprise */}
        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-6">Informations entreprise</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de l'entreprise *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="siren"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SIREN *</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={9} placeholder="123456789" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre d'employés *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-10">1-10</SelectItem>
                      <SelectItem value="11-50">11-50</SelectItem>
                      <SelectItem value="51-200">51-200</SelectItem>
                      <SelectItem value="200+">200+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code postal *</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        {/* Section 3: Détails Projet */}
        {selectedLEDs.length > 0 && (
          <Card className="p-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">Détails de votre projet</h3>
            <FormField
              control={form.control}
              name="total_surface"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surface totale à équiper (m²) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  {getContextualHelp() && (
                    <p className="text-sm text-muted-foreground mt-1">{getContextualHelp()}</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Alert className="mt-6">
              <Info className="h-4 w-4" />
              <AlertDescription>
                {selectedLEDs.length === 1
                  ? "Un conseiller vous contactera pour affiner les besoins spécifiques de votre projet."
                  : "Vous avez sélectionné plusieurs types d'éclairage. Indiquez la surface totale cumulée."}
              </AlertDescription>
            </Alert>
          </Card>
        )}

        {/* Section 4: Contact */}
        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-6">Vos coordonnées</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="06XXXXXXXX" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 mt-6">
            <FormField
              control={form.control}
              name="consent_privacy"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    J'accepte la politique de confidentialité *
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="consent_partner"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    J'accepte d'être recontacté par des partenaires
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Obtenir mon étude gratuite"}
        </Button>
      </form>
    </Form>
  );
};
