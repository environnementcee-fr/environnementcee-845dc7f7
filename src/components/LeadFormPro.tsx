import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { leadProSchema, LeadProFormData } from "@/lib/validations/lead-pro";
import { getTravauxById, TRAVAUX_CATALOG } from "@/data/travauxCatalog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const STEPS = [
  { id: 1, label: "Projet" },
  { id: 2, label: "Lieu & volumétrie" },
  { id: 3, label: "Contact" },
];

export const LeadFormPro = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<LeadProFormData>({
    resolver: zodResolver(leadProSchema),
    defaultValues: {
      type_travaux: searchParams.get("type") || "",
      description_besoins: "",
      budget_estime: "a_definir",
      delai_souhaite: "1_3_mois",
      adresse_site: "",
      ville: "",
      code_postal: "",
      type_batiment: "bureaux",
      raison_sociale: "",
      siren: "",
      secteur_activite: "",
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      consent_privacy: false,
      consent_partner: false,
    },
  });

  const typeTravaux = form.watch("type_travaux");
  const progressPercent = (currentStep / STEPS.length) * 100;

  // Sauvegarder dans localStorage
  useEffect(() => {
    const subscription = form.watch((data) => {
      localStorage.setItem("lead_pro_draft", JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Charger depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lead_pro_draft");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        Object.keys(data).forEach((key) => {
          if (data[key] !== undefined && data[key] !== null) {
            form.setValue(key as any, data[key]);
          }
        });
      } catch (e) {
        console.error("Erreur chargement draft:", e);
      }
    }
  }, []);

  const onSubmit = async (data: LeadProFormData) => {
    setIsSubmitting(true);
    try {
      // Calculer le score
      let score = 100; // Fraîcheur de base
      if (data.telephone) score += 10;
      if (data.budget_estime !== 'a_definir') score += 10;
      if (data.description_besoins.length >= 50) score += 10;

      // Capturer les UTM params
      const utmSource = searchParams.get('utm_source') || undefined;
      const utmMedium = searchParams.get('utm_medium') || undefined;
      const utmCampaign = searchParams.get('utm_campaign') || undefined;

      // Insérer le lead
      const { data: leadData, error: leadError } = await supabase
        .from("lead_submissions")
        .insert({
          aid_type: data.type_travaux,
          user_type: "professionnel",
          company_name: data.raison_sociale,
          siren: data.siren,
          postal_code: data.code_postal,
          first_name: data.prenom,
          last_name: data.nom,
          email: data.email,
          phone: data.telephone,
          consent_privacy: data.consent_privacy,
          consent_partner: data.consent_partner || false,
          eligibility_score: score,
          project_data: {
            type_travaux: data.type_travaux,
            description_besoins: data.description_besoins,
            budget_estime: data.budget_estime,
            delai_souhaite: data.delai_souhaite,
            adresse_site: data.adresse_site,
            ville: data.ville,
            type_batiment: data.type_batiment,
            secteur_activite: data.secteur_activite,
            // Conditionnels
            nb_luminaires: data.nb_luminaires,
            hauteur_plafond: data.hauteur_plafond,
            usage_eclairage: data.usage_eclairage,
            surface_isolation: data.surface_isolation,
            type_isolation: data.type_isolation,
            puissance_actuelle: data.puissance_actuelle,
            energie_existante: data.energie_existante,
            surface_chauffage: data.surface_chauffage,
            volume_chambre: data.volume_chambre,
            usage_chambre: data.usage_chambre,
            temperature_cible: data.temperature_cible,
            // UTM tracking
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
          },
          status: "nouveau",
        })
        .select()
        .single();

      if (leadError) throw leadError;

      // Appeler l'edge function pour notification
      try {
        await supabase.functions.invoke("notify-new-lead", {
          body: { leadId: leadData.id },
        });
      } catch (emailError) {
        console.error("Erreur notification email:", emailError);
      }

      // Nettoyer le localStorage
      localStorage.removeItem("lead_pro_draft");

      toast({
        title: "Demande envoyée !",
        description: "Nous vous recontacterons sous 24-48h.",
      });

      navigate("/merci");
    } catch (error: any) {
      console.error("Erreur soumission:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getFieldsForStep = (step: number): (keyof LeadProFormData)[] => {
    switch (step) {
      case 1:
        return ["type_travaux", "description_besoins", "budget_estime", "delai_souhaite"];
      case 2:
        return ["adresse_site", "ville", "code_postal", "type_batiment"];
      case 3:
        return ["raison_sociale", "siren", "secteur_activite", "nom", "prenom", "email", "telephone", "consent_privacy"];
      default:
        return [];
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="type_travaux"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de travaux *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le type de travaux" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRAVAUX_CATALOG.filter(t => t.segment === 'pro' || t.segment === 'mixte').map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description_besoins"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description de votre projet *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez vos besoins, contraintes, objectifs... (minimum 20 caractères)"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="budget_estime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget estimé *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="moins_5k">Moins de 5 000 €</SelectItem>
                        <SelectItem value="5_20k">5 000 - 20 000 €</SelectItem>
                        <SelectItem value="20_100k">20 000 - 100 000 €</SelectItem>
                        <SelectItem value="plus_100k">Plus de 100 000 €</SelectItem>
                        <SelectItem value="a_definir">À définir</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="delai_souhaite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Délai souhaité *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="immediat">Immédiat</SelectItem>
                        <SelectItem value="moins_1_mois">Moins d'un mois</SelectItem>
                        <SelectItem value="1_3_mois">1 à 3 mois</SelectItem>
                        <SelectItem value="plus_3_mois">Plus de 3 mois</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="adresse_site"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse du site *</FormLabel>
                  <FormControl>
                    <Input placeholder="Numéro et rue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="ville"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ville *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code_postal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code postal *</FormLabel>
                    <FormControl>
                      <Input maxLength={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="type_batiment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de bâtiment *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="entrepot">Entrepôt</SelectItem>
                      <SelectItem value="bureaux">Bureaux</SelectItem>
                      <SelectItem value="commerce">Commerce</SelectItem>
                      <SelectItem value="industriel">Industriel</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditionnels LED */}
            {typeTravaux?.includes('led') && (
              <div className="space-y-6 border-t pt-6">
                <h3 className="font-semibold">Détails éclairage</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="nb_luminaires"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de luminaires (approx.)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value) || undefined)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hauteur_plafond"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hauteur sous plafond (m)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || undefined)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="usage_eclairage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usage</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="continu">Continu (24/7)</SelectItem>
                          <SelectItem value="intermittent">Intermittent</SelectItem>
                          <SelectItem value="mixte">Mixte</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Conditionnels Isolation */}
            {typeTravaux?.includes('isolation') && (
              <div className="space-y-6 border-t pt-6">
                <h3 className="font-semibold">Détails isolation</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="surface_isolation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Surface à isoler (m²)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value) || undefined)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type_isolation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type d'isolation</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ITI">Isolation Thermique Intérieure (ITI)</SelectItem>
                            <SelectItem value="ITE">Isolation Thermique Extérieure (ITE)</SelectItem>
                            <SelectItem value="a_definir">À définir</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Conditionnels PAC */}
            {typeTravaux?.includes('pac') && (
              <div className="space-y-6 border-t pt-6">
                <h3 className="font-semibold">Détails chauffage</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="puissance_actuelle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Puissance actuelle (kW)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value) || undefined)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="energie_existante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Énergie actuelle</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="gaz">Gaz</SelectItem>
                            <SelectItem value="fioul">Fioul</SelectItem>
                            <SelectItem value="electrique">Électrique</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="surface_chauffage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Surface à chauffer (m²)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value) || undefined)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Conditionnels Chambre froide */}
            {typeTravaux?.includes('hp_flottante') && (
              <div className="space-y-6 border-t pt-6">
                <h3 className="font-semibold">Détails chambre froide</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="volume_chambre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Volume (m³)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value) || undefined)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="temperature_cible"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Température cible (°C)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value) || undefined)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="usage_chambre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usage de la chambre froide</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: stockage alimentaire, pharmaceutique..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="raison_sociale"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raison sociale *</FormLabel>
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
                      <Input maxLength={9} placeholder="9 chiffres" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="secteur_activite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secteur d'activité *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="prenom"
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
                  name="nom"
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
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
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
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone *</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="06 12 34 56 78" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <FormField
                control={form.control}
                name="consent_privacy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        J'accepte la politique de confidentialité et le traitement de mes données *
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
                      <FormLabel>
                        J'accepte d'être contacté par des partenaires qualifiés
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle>
                Étape {currentStep} / {STEPS.length} : {STEPS[currentStep - 1].label}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  toast({
                    title: "Brouillon sauvegardé",
                    description: "Vous pouvez revenir plus tard pour continuer.",
                  });
                }}
              >
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder
              </Button>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {renderStepContent()}

              <div className="flex justify-between pt-6 border-t">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={handlePrevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Précédent
                  </Button>
                )}

                {currentStep < STEPS.length ? (
                  <Button type="button" onClick={handleNextStep} className="ml-auto">
                    Suivant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting} className="ml-auto">
                    {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Résumé sticky (optionnel - TODO pour V2) */}
      <div className="mt-8 bg-primary/5 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Besoin d'aide ?</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Un conseiller peut vous accompagner dans le remplissage de ce formulaire.
        </p>
        <Button variant="outline" size="sm" asChild>
          <a href="tel:0123456789">Appeler un conseiller</a>
        </Button>
      </div>
    </div>
  );
};
