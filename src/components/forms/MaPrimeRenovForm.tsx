import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { maPrimeRenovSchema, type MaPrimeRenovFormData } from "@/lib/validations/ma-prime-renov";
import { CheckboxCard } from "./CheckboxCard";
import { FormFieldWithIcon } from "./FormFieldWithIcon";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Home, Flame, Sun, Wind, Droplets, Zap, Info, Mail, Phone, User, MapPin, Building2, Calendar, Euro } from "lucide-react";
import { TrustSignals } from "./TrustSignals";
import { ReassuranceMessage } from "./ReassuranceMessage";

export const MaPrimeRenovForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<MaPrimeRenovFormData>({
    resolver: zodResolver(maPrimeRenovSchema),
    defaultValues: {
      selected_aids: [],
      consent_privacy: false,
      consent_partner: false,
    },
  });

  const selectedAids = form.watch("selected_aids");

  const onSubmit = async (data: MaPrimeRenovFormData) => {
    setIsSubmitting(true);
    try {
      const { data: leadData, error } = await supabase.functions.invoke("submit-lead", {
        body: {
          aid_type: "ma_prime_renov",
          user_type: "particulier",
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          postal_code: data.postal_code,
          surface: data.surface,
          building_type: data.building_type,
          construction_year: data.construction_year,
          income_bracket: data.income_bracket,
          consent_privacy: data.consent_privacy,
          consent_partner: data.consent_partner,
          project_data: {
            selected_aids: data.selected_aids,
            building_type: data.building_type,
            surface: data.surface,
            construction_year: data.construction_year,
            ...(data.selected_aids.includes('isolation') && {
              isolation: {
                type: data.isolation_type,
                surface: data.isolation_surface,
                wall_material: data.isolation_wall_material,
              },
            }),
            ...(data.selected_aids.includes('pac') && {
              pac: {
                heating_system: data.pac_heating_system,
                surface: data.pac_surface,
              },
            }),
            ...(data.selected_aids.includes('panneaux_solaires') && {
              panneaux_solaires: {
                roof_surface: data.solar_roof_surface,
                orientation: data.solar_orientation,
                roof_type: data.solar_roof_type,
                annual_consumption: data.solar_annual_consumption,
              },
            }),
            ...(data.selected_aids.includes('brasseur_air') && {
              brasseur_air: {
                ceiling_height: data.brasseur_ceiling_height,
                room_count: data.brasseur_room_count,
                surface: data.brasseur_surface,
              },
            }),
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Demande envoyée !",
        description: "Nous vous contacterons sous 48h pour votre estimation.",
      });

      setTimeout(() => {
        navigate("/simulation/resultats", {
          state: {
            results: {
              eligibility_score: leadData?.eligibility_score || 0,
              estimated_aids: leadData?.estimated_aids || {},
              mpr_category: leadData?.mpr_category,
              user_type: "particulier",
              aid_type: "ma_prime_renov",
              first_name: data.first_name,
              estimated_cost: 20000
            }
          }
        });
      }, 1500);
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TrustSignals />

        {/* Section 1 : Sélection des aides */}
        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-6">Quelles aides vous intéressent ?</h3>
          <FormField
            control={form.control}
            name="selected_aids"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <CheckboxCard
                      value="isolation"
                      icon="🏠"
                      title="Isolation Extérieur"
                      description="ITE, ITI, Combles"
                      checked={field.value.includes('isolation')}
                      onChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, 'isolation']
                          : field.value.filter((v) => v !== 'isolation');
                        field.onChange(newValue);
                      }}
                    />
                    <CheckboxCard
                      value="pac"
                      icon="🔥"
                      title="Pompe à Chaleur"
                      description="Air/Eau, Air/Air"
                      checked={field.value.includes('pac')}
                      onChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, 'pac']
                          : field.value.filter((v) => v !== 'pac');
                        field.onChange(newValue);
                      }}
                    />
                    <CheckboxCard
                      value="panneaux_solaires"
                      icon="☀️"
                      title="Panneaux Solaires"
                      description="Autoconsommation"
                      checked={field.value.includes('panneaux_solaires')}
                      onChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, 'panneaux_solaires']
                          : field.value.filter((v) => v !== 'panneaux_solaires');
                        field.onChange(newValue);
                      }}
                    />
                    <CheckboxCard
                      value="brasseur_air"
                      icon="🌀"
                      title="Brasseur d'Air"
                      description="Ventilation naturelle"
                      checked={field.value.includes('brasseur_air')}
                      onChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, 'brasseur_air']
                          : field.value.filter((v) => v !== 'brasseur_air');
                        field.onChange(newValue);
                      }}
                    />
                    <CheckboxCard
                      value="audit_energetique"
                      icon="📊"
                      title="Audit Énergétique"
                      description="Bilan complet"
                      checked={field.value.includes('audit_energetique')}
                      onChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, 'audit_energetique']
                          : field.value.filter((v) => v !== 'audit_energetique');
                        field.onChange(newValue);
                      }}
                    />
                    <CheckboxCard
                      value="ventilation"
                      icon="💨"
                      title="Ventilation VMC"
                      description="Double flux"
                      checked={field.value.includes('ventilation')}
                      onChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, 'ventilation']
                          : field.value.filter((v) => v !== 'ventilation');
                        field.onChange(newValue);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        {/* Section 2 : Informations logement */}
        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-6">Votre logement</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="building_type"
              render={({ field }) => (
                <FormFieldWithIcon icon={<Home />} label="Type de bien">
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maison">Maison individuelle</SelectItem>
                        <SelectItem value="appartement">Appartement</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormFieldWithIcon>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="postal_code"
                render={({ field }) => (
                  <FormFieldWithIcon icon={<MapPin />} label="Code postal">
                    <FormControl>
                      <Input {...field} placeholder="75001" maxLength={5} />
                    </FormControl>
                    <FormMessage />
                  </FormFieldWithIcon>
                )}
              />

              <FormField
                control={form.control}
                name="surface"
                render={({ field }) => (
                  <FormFieldWithIcon icon={<Building2 />} label="Surface habitable (m²)">
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormFieldWithIcon>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="construction_year"
              render={({ field }) => (
                <FormFieldWithIcon icon={<Calendar />} label="Année de construction">
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="1985"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormFieldWithIcon>
              )}
            />
          </div>
        </Card>

        {/* Sections adaptatives selon aides sélectionnées */}
        {selectedAids.includes('isolation') && (
          <Card className="p-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">🏠 Isolation Extérieur</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="isolation_type"
                render={({ field }) => (
                  <FormFieldWithIcon icon={<Home />} label="Type d'isolation">
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ITE">ITE - Isolation Thermique Extérieure</SelectItem>
                          <SelectItem value="ITI">ITI - Isolation Thermique Intérieure</SelectItem>
                          <SelectItem value="combles">Combles perdus/aménagés</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormFieldWithIcon>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="isolation_surface"
                  render={({ field }) => (
                    <FormFieldWithIcon icon={<Building2 />} label="Surface à isoler (m²)">
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isolation_wall_material"
                  render={({ field }) => (
                    <FormFieldWithIcon icon={<Building2 />} label="Matériau des murs">
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="parpaing">Parpaing</SelectItem>
                            <SelectItem value="brique">Brique</SelectItem>
                            <SelectItem value="beton">Béton</SelectItem>
                            <SelectItem value="pierre">Pierre</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormFieldWithIcon>
                  )}
                />
              </div>
            </div>
          </Card>
        )}

        {selectedAids.includes('pac') && (
          <Card className="p-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">🔥 Pompe à Chaleur</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="pac_heating_system"
                render={({ field }) => (
                  <FormFieldWithIcon icon={<Flame />} label="Système de chauffage actuel">
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gaz">Gaz</SelectItem>
                          <SelectItem value="fioul">Fioul</SelectItem>
                          <SelectItem value="electrique">Électrique</SelectItem>
                          <SelectItem value="bois">Bois</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormFieldWithIcon>
                )}
              />

              <FormField
                control={form.control}
                name="pac_surface"
                render={({ field }) => (
                  <FormFieldWithIcon icon={<Building2 />} label="Surface à chauffer (m²)">
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormFieldWithIcon>
                )}
              />
            </div>
          </Card>
        )}

        {selectedAids.includes('panneaux_solaires') && (
          <Card className="p-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">☀️ Panneaux Solaires</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="solar_roof_surface"
                  render={({ field }) => (
                    <FormFieldWithIcon icon={<Sun />} label="Surface toiture disponible (m²)">
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="solar_orientation"
                  render={({ field }) => (
                    <FormFieldWithIcon icon={<Sun />} label="Orientation toiture">
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sud">Sud</SelectItem>
                            <SelectItem value="sud_est">Sud-Est</SelectItem>
                            <SelectItem value="sud_ouest">Sud-Ouest</SelectItem>
                            <SelectItem value="est">Est</SelectItem>
                            <SelectItem value="ouest">Ouest</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormFieldWithIcon>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="solar_roof_type"
                  render={({ field }) => (
                    <FormFieldWithIcon icon={<Home />} label="Type de toiture">
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tuiles">Tuiles</SelectItem>
                            <SelectItem value="ardoise">Ardoise</SelectItem>
                            <SelectItem value="bac_acier">Bac acier</SelectItem>
                            <SelectItem value="toit_plat">Toit plat</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="solar_annual_consumption"
                  render={({ field }) => (
                    <FormFieldWithIcon icon={<Zap />} label="Consommation annuelle (kWh)">
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="5000"
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormFieldWithIcon>
                  )}
                />
              </div>
            </div>
          </Card>
        )}

        {selectedAids.includes('brasseur_air') && (
          <Card className="p-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">🌀 Brasseur d'Air</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="brasseur_ceiling_height"
                  render={({ field }) => (
                    <FormFieldWithIcon icon={<Wind />} label="Hauteur plafond (m)">
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.1"
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brasseur_room_count"
                  render={({ field }) => (
                    <FormFieldWithIcon icon={<Home />} label="Nombre de pièces">
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormFieldWithIcon>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brasseur_surface"
                  render={({ field }) => (
                    <FormFieldWithIcon icon={<Building2 />} label="Surface pièces (m²)">
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormFieldWithIcon>
                  )}
                />
              </div>
            </div>
          </Card>
        )}

        {/* Section : Revenus */}
        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-6">💰 Tranche de revenus</h3>
          <FormField
            control={form.control}
            name="income_bracket"
            render={({ field }) => (
              <FormFieldWithIcon icon={<Euro />} label="Revenus fiscaux annuels">
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tres_modeste">Très modeste (jusqu'à 90% d'aides)</SelectItem>
                      <SelectItem value="modeste">Modeste (jusqu'à 75% d'aides)</SelectItem>
                      <SelectItem value="intermediaire">Intermédiaire (jusqu'à 60% d'aides)</SelectItem>
                      <SelectItem value="superieur">Supérieur (jusqu'à 40% d'aides)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormFieldWithIcon>
            )}
          />
        </Card>

        {/* Section : Contact */}
        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-6">Vos coordonnées</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormFieldWithIcon icon={<User />} label="Prénom *">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormFieldWithIcon>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormFieldWithIcon icon={<User />} label="Nom *">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormFieldWithIcon>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormFieldWithIcon icon={<Mail />} label="Email *">
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormFieldWithIcon>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormFieldWithIcon icon={<Phone />} label="Téléphone *">
                  <FormControl>
                    <Input {...field} type="tel" placeholder="06 12 34 56 78" />
                  </FormControl>
                  <FormMessage />
                </FormFieldWithIcon>
              )}
            />

            <FormField
              control={form.control}
              name="consent_privacy"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <label className="text-sm font-medium">
                      J'accepte la politique de confidentialité *
                    </label>
                    <FormMessage />
                  </div>
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
                  <div className="space-y-1 leading-none">
                    <label className="text-sm">
                      J'accepte d'être recontacté par des partenaires
                    </label>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Button type="submit" size="lg" className="w-full text-lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            "Obtenir mon estimation gratuite"
          )}
        </Button>
      </form>
    </Form>
  );
};
