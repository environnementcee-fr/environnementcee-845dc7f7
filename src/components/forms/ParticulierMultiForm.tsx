import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckboxCard } from "./CheckboxCard";
import { RadioGroupField } from "./RadioGroupField";
import { particulierMultiSchema, type ParticulierMultiFormData } from "@/lib/validations/particulier-multi";

export const ParticulierMultiForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAids, setSelectedAids] = useState<string[]>([]);

  const form = useForm<ParticulierMultiFormData>({
    resolver: zodResolver(particulierMultiSchema),
    defaultValues: {
      selected_aids: [],
      postal_code: "",
      consent_privacy: false,
      consent_partner: false
    }
  });

  const handleAidToggle = (aidType: string, checked: boolean) => {
    const newSelection = checked
      ? [...selectedAids, aidType]
      : selectedAids.filter(t => t !== aidType);
    setSelectedAids(newSelection);
    form.setValue('selected_aids', newSelection as any);
  };

  const onSubmit = async (data: ParticulierMultiFormData) => {
    setIsSubmitting(true);
    try {
      const projectData: any = {
        selected_aids: data.selected_aids,
        building_type: data.building_type,
        construction_year: data.construction_year
      };

      if (data.selected_aids.includes('isolation')) {
        projectData.isolation = {
          type: data.isolation_type,
          surface: data.isolation_surface,
          wall_material: data.isolation_wall_material
        };
      }

      if (data.selected_aids.includes('pac')) {
        projectData.pac = {
          heating_system: data.pac_heating_system,
          surface: data.pac_surface
        };
      }

      if (data.selected_aids.includes('panneaux_solaires')) {
        projectData.panneaux_solaires = {
          roof_surface: data.solar_roof_surface,
          orientation: data.solar_orientation,
          roof_type: data.solar_roof_type,
          annual_consumption: data.solar_annual_consumption
        };
      }

      if (data.selected_aids.includes('brasseur_air')) {
        projectData.brasseur_air = {
          ceiling_height: data.brasseur_ceiling_height,
          room_count: data.brasseur_room_count,
          surface: data.brasseur_surface
        };
      }

      if (data.selected_aids.includes('housse_piscine')) {
        projectData.piscine = {
          volume: data.piscine_volume,
          heating: data.piscine_heating,
          target_temp: data.piscine_target_temp
        };
      }

      const { error } = await supabase.functions.invoke('submit-lead', {
        body: {
          aid_type: 'multi_particulier',
          user_type: 'particulier',
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          postal_code: data.postal_code,
          surface: data.surface,
          income_bracket: data.income_bracket,
          consent_privacy: data.consent_privacy,
          consent_partner: data.consent_partner,
          project_data: projectData
        }
      });

      if (error) throw error;

      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      toast.success("Demande envoyée avec succès !");
      setTimeout(() => navigate('/merci'), 1500);
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
        {/* Section 1: Aides */}
        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-6">Quelles aides vous intéressent ?</h3>
          <p className="text-muted-foreground mb-6">Cliquez sur les cartes pour sélectionner les aides qui vous intéressent</p>
          <div className="grid md:grid-cols-3 gap-4">
            <CheckboxCard
              value="isolation"
              icon="🏠"
              title="Isolation"
              description="Murs, combles, planchers"
              checked={selectedAids.includes('isolation')}
              onChange={(checked) => handleAidToggle('isolation', checked)}
            />
            <CheckboxCard
              value="pac"
              icon="🔥"
              title="Pompe à Chaleur"
              description="Chauffage économique"
              checked={selectedAids.includes('pac')}
              onChange={(checked) => handleAidToggle('pac', checked)}
            />
            <CheckboxCard
              value="panneaux_solaires"
              icon="☀️"
              title="Panneaux Solaires"
              description="Énergie renouvelable"
              checked={selectedAids.includes('panneaux_solaires')}
              onChange={(checked) => handleAidToggle('panneaux_solaires', checked)}
            />
            <CheckboxCard
              value="brasseur_air"
              icon="🌀"
              title="Brasseur d'Air"
              description="Confort thermique"
              checked={selectedAids.includes('brasseur_air')}
              onChange={(checked) => handleAidToggle('brasseur_air', checked)}
            />
            <CheckboxCard
              value="housse_piscine"
              icon="💧"
              title="Housse Piscine"
              description="Économie d'eau"
              checked={selectedAids.includes('housse_piscine')}
              onChange={(checked) => handleAidToggle('housse_piscine', checked)}
            />
            <CheckboxCard
              value="aides_energetiques"
              icon="⚡"
              title="Aides Énergétiques"
              description="Simulation globale"
              checked={selectedAids.includes('aides_energetiques')}
              onChange={(checked) => handleAidToggle('aides_energetiques', checked)}
            />
          </div>
          {form.formState.errors.selected_aids && (
            <p className="text-sm text-destructive mt-2">{form.formState.errors.selected_aids.message}</p>
          )}
        </Card>

        {/* Section 2: Logement */}
        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-6">Votre logement</h3>
          <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="building_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de bien *</FormLabel>
                    <FormControl>
                      <RadioGroupField
                        name="building_type"
                        options={[
                          { value: "maison", label: "Maison" },
                          { value: "appartement", label: "Appartement" }
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
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
            <FormField
              control={form.control}
              name="surface"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surface habitable (m²) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="construction_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Année de construction *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      placeholder="1985"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        {/* Sections Adaptatives */}
        {selectedAids.includes('isolation') && (
          <Card className="p-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">🏠 Isolation Extérieur</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="isolation_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type d'isolation *</FormLabel>
                      <FormControl>
                        <RadioGroupField
                          name="isolation_type"
                          options={[
                            { value: "ITE", label: "ITE (Isolation Thermique Extérieure)" },
                            { value: "ITI", label: "ITI (Isolation Thermique Intérieure)" },
                            { value: "Combles", label: "Combles" },
                            { value: "Plancher", label: "Plancher" }
                          ]}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="isolation_surface"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surface à isoler (m²) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                  control={form.control}
                  name="isolation_wall_material"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matériau des murs</FormLabel>
                      <FormControl>
                        <RadioGroupField
                          name="isolation_wall_material"
                          options={[
                            { value: "Parpaing", label: "Parpaing" },
                            { value: "Brique", label: "Brique" },
                            { value: "Béton", label: "Béton" },
                            { value: "Pierre", label: "Pierre" }
                          ]}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
          </Card>
        )}

        {selectedAids.includes('pac') && (
          <Card className="p-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">🔥 Pompe à Chaleur</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="pac_heating_system"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Système de chauffage actuel *</FormLabel>
                      <FormControl>
                        <RadioGroupField
                          name="pac_heating_system"
                          options={[
                            { value: "Gaz", label: "Gaz" },
                            { value: "Fioul", label: "Fioul" },
                            { value: "Électrique", label: "Électrique" },
                            { value: "Bois", label: "Bois" }
                          ]}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="pac_surface"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surface à chauffer (m²) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        )}

        {selectedAids.includes('panneaux_solaires') && (
          <Card className="p-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">☀️ Panneaux Solaires</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="solar_roof_surface"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surface de toiture disponible (m²) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                  control={form.control}
                  name="solar_orientation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Orientation toiture *</FormLabel>
                      <FormControl>
                        <RadioGroupField
                          name="solar_orientation"
                          options={[
                            { value: "Sud", label: "Sud" },
                            { value: "Sud-Est", label: "Sud-Est" },
                            { value: "Sud-Ouest", label: "Sud-Ouest" },
                            { value: "Est", label: "Est" },
                            { value: "Ouest", label: "Ouest" }
                          ]}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="solar_roof_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de toiture *</FormLabel>
                      <FormControl>
                        <RadioGroupField
                          name="solar_roof_type"
                          options={[
                            { value: "Tuiles", label: "Tuiles" },
                            { value: "Ardoise", label: "Ardoise" },
                            { value: "Bac acier", label: "Bac acier" },
                            { value: "Toit plat", label: "Toit plat" }
                          ]}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="solar_annual_consumption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consommation électrique annuelle (kWh)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        placeholder="5000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        )}

        {selectedAids.includes('brasseur_air') && (
          <Card className="p-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">🌀 Brasseur d'Air</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="brasseur_ceiling_height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hauteur sous plafond (m) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        placeholder="2.5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brasseur_room_count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de pièces *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brasseur_surface"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surface des pièces (m²)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        )}

        {selectedAids.includes('housse_piscine') && (
          <Card className="p-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">🏊 Housse Piscine Flottante</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="piscine_volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Volume de la piscine (m³) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        placeholder="50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="piscine_heating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chauffage piscine actuel *</FormLabel>
                    <FormControl>
                      <RadioGroupField
                        name="piscine_heating"
                        options={[
                          { value: "Aucun", label: "Aucun" },
                          { value: "Électrique", label: "Électrique" },
                          { value: "PAC", label: "Pompe à chaleur" },
                          { value: "Solaire", label: "Solaire" }
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="piscine_target_temp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Température souhaitée (°C)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        placeholder="28"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        )}

        {selectedAids.includes('aides_energetiques') && (
          <Card className="p-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">⚡ Aides Énergétiques (Simulation Générale)</h3>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Cette option permet une simulation globale de toutes les aides disponibles.
                Nos conseillers vous contacteront pour un bilan personnalisé et vous orienter vers les meilleures solutions.
              </AlertDescription>
            </Alert>
          </Card>
        )}

        {/* Section: Revenus */}
        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-6">💰 Tranche de revenus</h3>
          <FormField
            control={form.control}
            name="income_bracket"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Revenus fiscaux annuels *</FormLabel>
                <FormControl>
                  <RadioGroupField
                    name="income_bracket"
                    options={[
                      { value: "tres_modeste", label: "Moins de 22 461€ (Très modeste)" },
                      { value: "modeste", label: "22 461€ - 30 389€ (Modeste)" },
                      { value: "intermediaire", label: "30 389€ - 38 349€ (Intermédiaire)" },
                      { value: "superieur", label: "Plus de 38 349€ (Supérieur)" }
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        {/* Section: Contact */}
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
          {isSubmitting ? "Envoi en cours..." : "Obtenir mon estimation gratuite"}
        </Button>
      </form>
    </Form>
  );
};
