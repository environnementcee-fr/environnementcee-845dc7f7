import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Building2, Hash, Users, Briefcase } from "lucide-react";
import { FormFieldWithIcon } from "./FormFieldWithIcon";

interface EntrepriseInfoSectionProps {
  form: UseFormReturn<any>;
}

export const EntrepriseInfoSection = ({ form }: EntrepriseInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Informations entreprise</h3>
        <p className="text-sm text-muted-foreground">
          Ces informations nous permettent de vérifier votre éligibilité aux aides professionnelles
        </p>
      </div>

      <FormFieldWithIcon
        icon={<Building2 />}
        label="Nom de l'entreprise"
        isValid={form.formState.dirtyFields.company_name && !form.formState.errors.company_name}
      >
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  placeholder="Ex: SARL Martin Énergie" 
                  {...field} 
                  className="text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormFieldWithIcon>

      <FormFieldWithIcon
        icon={<Hash />}
        label="Numéro SIREN"
        isValid={form.formState.dirtyFields.siren && !form.formState.errors.siren}
      >
        <FormField
          control={form.control}
          name="siren"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  placeholder="9 chiffres (ex: 123456789)" 
                  {...field}
                  maxLength={9}
                  className="text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormFieldWithIcon>

      <FormFieldWithIcon
        icon={<Users />}
        label="Nombre de salariés"
        isValid={form.formState.dirtyFields.employees && !form.formState.errors.employees}
      >
        <FormField
          control={form.control}
          name="employees"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-base">
                    <SelectValue placeholder="Sélectionnez votre effectif" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1-9">Moins de 10 salariés (TPE)</SelectItem>
                  <SelectItem value="10-49">10 à 49 salariés (PME)</SelectItem>
                  <SelectItem value="50-249">50 à 249 salariés (PME)</SelectItem>
                  <SelectItem value="250+">250 salariés et plus (Grande entreprise)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
              <p className="text-xs text-muted-foreground mt-1">
                💡 Les entreprises de moins de 250 salariés sont éligibles au crédit d'impôt de 30%
              </p>
            </FormItem>
          )}
        />
      </FormFieldWithIcon>

      <FormFieldWithIcon
        icon={<Briefcase />}
        label="Secteur d'activité"
        isValid={form.formState.dirtyFields.secteur && !form.formState.errors.secteur}
      >
        <FormField
          control={form.control}
          name="secteur"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-base">
                    <SelectValue placeholder="Sélectionnez votre secteur" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="industrie">Industrie / Production</SelectItem>
                  <SelectItem value="tertiaire">Tertiaire / Bureaux</SelectItem>
                  <SelectItem value="commerce">Commerce / Distribution</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="logistique">Logistique / Entrepôt</SelectItem>
                  <SelectItem value="hotellerie">Hôtellerie / Restauration</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormFieldWithIcon>
    </div>
  );
};
