import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { fenetresFormSchema, type FenetresFormData } from "@/lib/validations/fenetres";
import { SuccessConfetti } from "./SuccessConfetti";
import { SimpleRadioGroup } from "./SimpleRadioGroup";
import { FormFieldWithIcon } from "./FormFieldWithIcon";
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, Euro, Users, MapPin, Mail, Phone, User, Calendar, FramerIcon } from "lucide-react";

export const FenetresForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FenetresFormData>({
    resolver: zodResolver(fenetresFormSchema),
    defaultValues: {
      consent_privacy: false,
      consent_partner: false,
    },
  });

  const onSubmit = async (data: FenetresFormData) => {
    setIsSubmitting(true);
    
    try {
      const { data: result, error } = await supabase.functions.invoke('submit-lead', {
        body: {
          aid_type: 'fenetres',
          user_type: 'particulier',
          building_type: data.building_type,
          construction_year: data.construction_year,
          income_bracket: `${data.revenu_fiscal}_${data.nb_personnes_foyer}_${data.region}`,
          project_data: {
            nb_fenetres: data.nb_fenetres,
            current_window_type: data.current_window_type,
            revenu_fiscal: data.revenu_fiscal,
            nb_personnes_foyer: data.nb_personnes_foyer,
            region: data.region,
            owner_status: data.owner_status,
          },
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          postal_code: data.postal_code,
          consent_privacy: data.consent_privacy,
          consent_partner: data.consent_partner,
        },
      });

      if (error) throw error;

      setShowConfetti(true);
      toast({
        title: "Demande envoyée !",
        description: "Nous vous recontactons sous 48h pour votre projet de fenêtres.",
      });

      setTimeout(() => {
        navigate("/simulation/resultats", {
          state: {
            results: {
              eligibility_score: result?.eligibility_score || 0,
              estimated_aids: result?.estimated_aids || {},
              mpr_category: result?.mpr_category,
              user_type: "particulier",
              aid_type: "fenetres",
              first_name: data.first_name,
              estimated_cost: data.nb_fenetres * 600
            }
          }
        });
      }, 2000);

    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SuccessConfetti trigger={showConfetti} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Type de logement */}
          <FormField
            control={form.control}
            name="building_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de logement</FormLabel>
                <FormControl>
                  <SimpleRadioGroup
                    name="building_type"
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      { value: "maison", label: "🏠 Maison individuelle" },
                      { value: "appartement", label: "🏢 Appartement" },
                    ]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fenêtres */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Votre projet de fenêtres</h3>
            
            <FormFieldWithIcon
              icon={<FramerIcon />}
              label="Nombre de fenêtres à remplacer"
              isValid={form.formState.dirtyFields.nb_fenetres && !form.formState.errors.nb_fenetres}
            >
              <FormField
                control={form.control}
                name="nb_fenetres"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex: 8"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormFieldWithIcon>

            <FormField
              control={form.control}
              name="current_window_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de vitrage actuel</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="simple">Simple vitrage</SelectItem>
                      <SelectItem value="double_ancien">Double vitrage ancien (&gt;15 ans)</SelectItem>
                      <SelectItem value="aucune">Aucun vitrage / Ouverture sans fenêtre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Informations logement */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Informations sur votre logement</h3>
            
            <FormFieldWithIcon
              icon={<Calendar />}
              label="Année de construction"
              isValid={form.formState.dirtyFields.construction_year && !form.formState.errors.construction_year}
            >
              <FormField
                control={form.control}
                name="construction_year"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex: 1990"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground">
                      💡 Le logement doit avoir plus de 15 ans pour MaPrimeRénov'
                    </p>
                  </FormItem>
                )}
              />
            </FormFieldWithIcon>

            <FormFieldWithIcon
              icon={<MapPin />}
              label="Code postal"
              isValid={form.formState.dirtyFields.postal_code && !form.formState.errors.postal_code}
            >
              <FormField
                control={form.control}
                name="postal_code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Ex: 69001" maxLength={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormFieldWithIcon>
          </div>

          {/* Revenus */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Votre situation (pour MaPrimeRénov')</h3>
            
            <FormFieldWithIcon
              icon={<Euro />}
              label="Revenu fiscal de référence (RFR)"
              isValid={form.formState.dirtyFields.revenu_fiscal && !form.formState.errors.revenu_fiscal}
            >
              <FormField
                control={form.control}
                name="revenu_fiscal"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex: 25000"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground">
                      Visible sur votre avis d'imposition
                    </p>
                  </FormItem>
                )}
              />
            </FormFieldWithIcon>

            <FormFieldWithIcon
              icon={<Users />}
              label="Nombre de personnes dans le foyer"
              isValid={form.formState.dirtyFields.nb_personnes_foyer && !form.formState.errors.nb_personnes_foyer}
            >
              <FormField
                control={form.control}
                name="nb_personnes_foyer"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex: 4"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormFieldWithIcon>

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Région</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="idf">Île-de-France</SelectItem>
                      <SelectItem value="autre">Autres régions</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="owner_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre statut</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="occupant">Propriétaire occupant</SelectItem>
                      <SelectItem value="bailleur">Propriétaire bailleur</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Vos coordonnées</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <FormFieldWithIcon
                icon={<User />}
                label="Prénom"
                isValid={form.formState.dirtyFields.first_name && !form.formState.errors.first_name}
              >
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Jean" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormFieldWithIcon>

              <FormFieldWithIcon
                icon={<User />}
                label="Nom"
                isValid={form.formState.dirtyFields.last_name && !form.formState.errors.last_name}
              >
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormFieldWithIcon>
            </div>

            <FormFieldWithIcon
              icon={<Mail />}
              label="Email"
              isValid={form.formState.dirtyFields.email && !form.formState.errors.email}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" placeholder="jean.dupont@email.fr" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormFieldWithIcon>

            <FormFieldWithIcon
              icon={<Phone />}
              label="Téléphone"
              isValid={form.formState.dirtyFields.phone && !form.formState.errors.phone}
            >
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="06 12 34 56 78" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormFieldWithIcon>
          </div>

          {/* Consentements */}
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
                    <FormLabel className="text-sm">
                      J'accepte la{" "}
                      <a href="/politique-confidentialite" className="text-primary underline">
                        politique de confidentialité
                      </a>{" "}
                      *
                    </FormLabel>
                    <FormMessage />
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
                    <FormLabel className="text-sm">
                      J'accepte d'être contacté par les partenaires
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Envoi en cours..." : "Obtenir mon estimation gratuite"}
          </Button>
        </form>
      </Form>
    </>
  );
};
