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
import { isolationStep1Schema, isolationStep2PartSchema, isolationStep2ProSchema, type IsolationStep1Data, type IsolationStep2PartData, type IsolationStep2ProData } from "@/lib/validations/isolation";

interface IsolationFormProps {
  defaultTab?: "part" | "pro";
}

export const IsolationForm = ({ defaultTab = "part" }: IsolationFormProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<"particulier" | "professionnel">(
    defaultTab === "pro" ? "professionnel" : "particulier"
  );
  const [step1Data, setStep1Data] = useState<IsolationStep1Data | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form1 = useForm<IsolationStep1Data>({
    resolver: zodResolver(isolationStep1Schema),
    defaultValues: {
      building_type: "",
      surface: undefined,
      wall_material: "",
      insulation_type: "",
      construction_year: undefined,
      postal_code: "",
    },
  });

  const form2Part = useForm<IsolationStep2PartData>({
    resolver: zodResolver(isolationStep2PartSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      income_bracket: "",
      consent_privacy: false,
      consent_partner: false,
    },
  });

  const form2Pro = useForm<IsolationStep2ProData>({
    resolver: zodResolver(isolationStep2ProSchema),
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

  const onStep1Submit = (data: IsolationStep1Data) => {
    setStep1Data(data);
    setStep(2);
  };

  const onStep2Submit = async (data: IsolationStep2PartData | IsolationStep2ProData) => {
    if (!step1Data) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("submit-lead", {
        body: {
          aid_type: "isolation",
          user_type: userType,
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
              name="building_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de bâtiment</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="maison">Maison individuelle</SelectItem>
                      <SelectItem value="immeuble">Immeuble tertiaire</SelectItem>
                      <SelectItem value="entrepot">Entrepôt</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form1.control}
              name="surface"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surface des murs à isoler (m²)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="ex: 100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form1.control}
              name="wall_material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matériau des murs</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="parpaing">Parpaing</SelectItem>
                      <SelectItem value="brique">Brique</SelectItem>
                      <SelectItem value="beton">Béton</SelectItem>
                      <SelectItem value="bardage">Bardage</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form1.control}
              name="insulation_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type d'isolation souhaité</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="iti">ITI (par l'intérieur)</SelectItem>
                      <SelectItem value="ite">ITE (par l'extérieur)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form1.control}
              name="construction_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Année de construction</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="ex: 2010" {...field} />
                  </FormControl>
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
        <Tabs value={userType} onValueChange={(v) => setUserType(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="particulier">Particulier</TabsTrigger>
            <TabsTrigger value="professionnel">Professionnel</TabsTrigger>
          </TabsList>

          <TabsContent value="particulier">
            <Form {...form2Part}>
              <form onSubmit={form2Part.handleSubmit(onStep2Submit)} className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Vos coordonnées</h2>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form2Part.control}
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
                    control={form2Part.control}
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
                  control={form2Part.control}
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
                  control={form2Part.control}
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
                  control={form2Part.control}
                  name="income_bracket"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tranche de revenus annuels</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tres_modeste">Très modeste</SelectItem>
                          <SelectItem value="modeste">Modeste</SelectItem>
                          <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                          <SelectItem value="superieur">Supérieur</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form2Part.control}
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
                  control={form2Part.control}
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
          </TabsContent>

          <TabsContent value="professionnel">
            <Form {...form2Pro}>
              <form onSubmit={form2Pro.handleSubmit(onStep2Submit)} className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Vos coordonnées</h2>

                <FormField
                  control={form2Pro.control}
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
                  control={form2Pro.control}
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
                  control={form2Pro.control}
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
                    control={form2Pro.control}
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
                    control={form2Pro.control}
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
                  control={form2Pro.control}
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
                  control={form2Pro.control}
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
                  control={form2Pro.control}
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
                  control={form2Pro.control}
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
          </TabsContent>
        </Tabs>
      )}
    </Card>
  );
};
