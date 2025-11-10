/**
 * Champs conditionnels affichés selon le type d'aide sélectionné
 * Basé sur le tableau questions[] du catalogue
 */

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormFieldWithIcon } from "./FormFieldWithIcon";

interface ConditionalFieldsProps {
  aid: string;
  segment: 'pro' | 'part';
  values: Record<string, any>;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export const ConditionalFields = ({ aid, segment, values, onChange, errors }: ConditionalFieldsProps) => {
  // Champs LED
  if (aid.startsWith("led")) {
    return (
      <>
        <FormFieldWithIcon icon="💡" label="Nombre de luminaires à remplacer">
          <Input
            type="number"
            min="1"
            placeholder="Ex: 50"
            value={values.nbLuminaires || ""}
            onChange={(e) => onChange("nbLuminaires", e.target.value)}
          />
          {errors?.nbLuminaires && <p className="text-sm text-red-500">{errors.nbLuminaires}</p>}
        </FormFieldWithIcon>

        <FormFieldWithIcon icon="📏" label="Hauteur sous plafond (m)">
          <Input
            type="number"
            step="0.1"
            min="2"
            max="20"
            placeholder="Ex: 6"
            value={values.hauteurPlafond || ""}
            onChange={(e) => onChange("hauteurPlafond", e.target.value)}
          />
        </FormFieldWithIcon>

        {aid === "led_entrepot" && (
          <FormFieldWithIcon icon="🔦" label="Type de luminaire actuel">
            <Select value={values.typeFixtureActuelle || ""} onValueChange={(v) => onChange("typeFixtureActuelle", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tube_fluo">Tubes fluorescents</SelectItem>
                <SelectItem value="sodium">Sodium haute pression</SelectItem>
                <SelectItem value="halogene">Halogènes</SelectItem>
                <SelectItem value="iodure">Iodure métallique</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </FormFieldWithIcon>
        )}

        {aid === "led_bureaux" && (
          <FormFieldWithIcon icon="📐" label="Surface des bureaux (m²)">
            <Input
              type="number"
              min="10"
              placeholder="Ex: 500"
              value={values.surfaceBureau || ""}
              onChange={(e) => onChange("surfaceBureau", e.target.value)}
            />
          </FormFieldWithIcon>
        )}

        {aid === "led_ext_solaire" && (
          <FormFieldWithIcon icon="🌙" label="Type d'installation">
            <Select value={values.typeInstallation || ""} onValueChange={(v) => onChange("typeInstallation", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mural">Appliques murales</SelectItem>
                <SelectItem value="piquet">Lampadaires / piquets</SelectItem>
                <SelectItem value="poteau">Poteaux éclairage public</SelectItem>
              </SelectContent>
            </Select>
          </FormFieldWithIcon>
        )}
      </>
    );
  }

  // Champs isolation
  if (aid.includes("isolation")) {
    return (
      <>
        <FormFieldWithIcon icon="📐" label="Surface à isoler (m²)">
          <Input
            type="number"
            min="1"
            placeholder="Ex: 100"
            value={values.surfaceIso || ""}
            onChange={(e) => onChange("surfaceIso", e.target.value)}
          />
          {errors?.surfaceIso && <p className="text-sm text-red-500">{errors.surfaceIso}</p>}
        </FormFieldWithIcon>

        <FormFieldWithIcon icon="🏠" label="Type d'isolation">
          <Select value={values.typeIso || ""} onValueChange={(v) => onChange("typeIso", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              {aid === "isolation_murs" || aid === "isolation_murs_part" ? (
                <>
                  <SelectItem value="ite">ITE (Isolation Thermique Extérieure)</SelectItem>
                  <SelectItem value="iti">ITI (Isolation Thermique Intérieure)</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="combles_perdus">Combles perdus</SelectItem>
                  <SelectItem value="combles_amenages">Combles aménagés</SelectItem>
                  <SelectItem value="toiture_terrasse">Toiture terrasse</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </FormFieldWithIcon>

        {(aid === "isolation_murs" || aid === "isolation_murs_part") && (
          <FormFieldWithIcon icon="🧱" label="Matériau des murs">
            <Select value={values.materiauMur || ""} onValueChange={(v) => onChange("materiauMur", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brique">Brique</SelectItem>
                <SelectItem value="parpaing">Parpaing/béton</SelectItem>
                <SelectItem value="pierre">Pierre</SelectItem>
                <SelectItem value="bois">Ossature bois</SelectItem>
              </SelectContent>
            </Select>
          </FormFieldWithIcon>
        )}
      </>
    );
  }

  // Champs PAC (Pro ou Part)
  if (aid.includes("pac")) {
    return (
      <>
        <FormFieldWithIcon icon="🔥" label="Énergie de chauffage actuelle">
          <Select value={values.energieActuelle || ""} onValueChange={(v) => onChange("energieActuelle", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fioul">Fioul</SelectItem>
              <SelectItem value="gaz">Gaz</SelectItem>
              <SelectItem value="elec">Électrique (radiateurs)</SelectItem>
              <SelectItem value="charbon">Charbon</SelectItem>
              <SelectItem value="bois">Bois</SelectItem>
              <SelectItem value="pac">PAC existante</SelectItem>
            </SelectContent>
          </Select>
          {errors?.energieActuelle && <p className="text-sm text-red-500">{errors.energieActuelle}</p>}
        </FormFieldWithIcon>

        <FormFieldWithIcon icon="📐" label="Surface à chauffer (m²)">
          <Input
            type="number"
            min="20"
            placeholder="Ex: 150"
            value={values.surfaceChauffee || ""}
            onChange={(e) => onChange("surfaceChauffee", e.target.value)}
          />
          {errors?.surfaceChauffee && <p className="text-sm text-red-500">{errors.surfaceChauffee}</p>}
        </FormFieldWithIcon>

        {segment === "pro" && (
          <FormFieldWithIcon icon="⚡" label="Puissance actuelle (kW)">
            <Input
              type="number"
              min="10"
              placeholder="Ex: 80"
              value={values.puissanceActuelle || ""}
              onChange={(e) => onChange("puissanceActuelle", e.target.value)}
            />
          </FormFieldWithIcon>
        )}

        {segment === "part" && (
          <>
            <FormFieldWithIcon icon="💰" label="Revenu fiscal de référence (€)">
              <Input
                type="number"
                min="0"
                placeholder="Ex: 35000"
                value={values.revenuMenage || ""}
                onChange={(e) => onChange("revenuMenage", e.target.value)}
              />
              {errors?.revenuMenage && <p className="text-sm text-red-500">{errors.revenuMenage}</p>}
            </FormFieldWithIcon>

            <FormFieldWithIcon icon="👨‍👩‍👧‍👦" label="Nombre de personnes dans le foyer">
              <Input
                type="number"
                min="1"
                max="10"
                placeholder="Ex: 4"
                value={values.nbPersonnes || ""}
                onChange={(e) => onChange("nbPersonnes", e.target.value)}
              />
            </FormFieldWithIcon>
          </>
        )}
      </>
    );
  }

  // Champs HP flottante (chambre froide)
  if (aid === "hp_flottante") {
    return (
      <>
        <FormFieldWithIcon icon="❄️" label="Volume de la chambre froide (m³)">
          <Input
            type="number"
            min="10"
            placeholder="Ex: 200"
            value={values.volumeCF || ""}
            onChange={(e) => onChange("volumeCF", e.target.value)}
          />
          {errors?.volumeCF && <p className="text-sm text-red-500">{errors.volumeCF}</p>}
        </FormFieldWithIcon>

        <FormFieldWithIcon icon="🌡️" label="Température cible (°C)">
          <Input
            type="number"
            min="-30"
            max="10"
            placeholder="Ex: -18"
            value={values.tCible || ""}
            onChange={(e) => onChange("tCible", e.target.value)}
          />
        </FormFieldWithIcon>

        <FormFieldWithIcon icon="📦" label="Type d'usage">
          <Select value={values.typeUsage || ""} onValueChange={(v) => onChange("typeUsage", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conservation">Conservation (surgelés)</SelectItem>
              <SelectItem value="refroidissement">Refroidissement (frais)</SelectItem>
              <SelectItem value="congelation">Congélation</SelectItem>
            </SelectContent>
          </Select>
        </FormFieldWithIcon>
      </>
    );
  }

  // Champs brasseur d'air
  if (aid === "brasseur_air") {
    return (
      <>
        <FormFieldWithIcon icon="📦" label="Volume du local (m³)">
          <Input
            type="number"
            min="100"
            placeholder="Ex: 2000"
            value={values.volume || ""}
            onChange={(e) => onChange("volume", e.target.value)}
          />
          {errors?.volume && <p className="text-sm text-red-500">{errors.volume}</p>}
        </FormFieldWithIcon>

        <FormFieldWithIcon icon="📏" label="Hauteur sous plafond (m)">
          <Input
            type="number"
            step="0.1"
            min="3"
            max="20"
            placeholder="Ex: 8"
            value={values.hauteurPlafond || ""}
            onChange={(e) => onChange("hauteurPlafond", e.target.value)}
          />
        </FormFieldWithIcon>

        <FormFieldWithIcon icon="🏭" label="Type d'activité">
          <Select value={values.typeActivite || ""} onValueChange={(v) => onChange("typeActivite", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entrepot">Entrepôt logistique</SelectItem>
              <SelectItem value="atelier">Atelier de production</SelectItem>
              <SelectItem value="commerce">Commerce / showroom</SelectItem>
              <SelectItem value="sport">Salle de sport</SelectItem>
            </SelectContent>
          </Select>
        </FormFieldWithIcon>
      </>
    );
  }

  // Champs PV particulier
  if (aid === "pv_part") {
    return (
      <>
        <FormFieldWithIcon icon="⚡" label="Puissance souhaitée (kWc)">
          <Select value={values.puissanceSouhaitee || ""} onValueChange={(v) => onChange("puissanceSouhaitee", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 kWc (10-12 panneaux)</SelectItem>
              <SelectItem value="6">6 kWc (20-24 panneaux)</SelectItem>
              <SelectItem value="9">9 kWc (30-36 panneaux)</SelectItem>
            </SelectContent>
          </Select>
        </FormFieldWithIcon>

        <FormFieldWithIcon icon="🏠" label="Type de toiture">
          <Select value={values.typeToiture || ""} onValueChange={(v) => onChange("typeToiture", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tuiles">Tuiles</SelectItem>
              <SelectItem value="ardoises">Ardoises</SelectItem>
              <SelectItem value="bac_acier">Bac acier</SelectItem>
              <SelectItem value="terrasse">Toit terrasse</SelectItem>
            </SelectContent>
          </Select>
        </FormFieldWithIcon>
      </>
    );
  }

  // Champs fenêtres
  if (aid === "fenetres_part") {
    return (
      <>
        <FormFieldWithIcon icon="🪟" label="Nombre de fenêtres">
          <Input
            type="number"
            min="1"
            placeholder="Ex: 10"
            value={values.nbFenetres || ""}
            onChange={(e) => onChange("nbFenetres", e.target.value)}
          />
          {errors?.nbFenetres && <p className="text-sm text-red-500">{errors.nbFenetres}</p>}
        </FormFieldWithIcon>

        <FormFieldWithIcon icon="🪟" label="Type de vitrage souhaité">
          <Select value={values.typeFenetres || ""} onValueChange={(v) => onChange("typeFenetres", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="double">Double vitrage</SelectItem>
              <SelectItem value="triple">Triple vitrage</SelectItem>
            </SelectContent>
          </Select>
        </FormFieldWithIcon>
      </>
    );
  }

  // Champs chaudière biomasse
  if (aid === "chaudiere_biomasse") {
    return (
      <>
        <FormFieldWithIcon icon="🔥" label="Énergie actuelle">
          <Select value={values.energieActuelle || ""} onValueChange={(v) => onChange("energieActuelle", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fioul">Fioul</SelectItem>
              <SelectItem value="gaz">Gaz</SelectItem>
              <SelectItem value="elec">Électrique</SelectItem>
            </SelectContent>
          </Select>
        </FormFieldWithIcon>

        <FormFieldWithIcon icon="🪵" label="Type de biomasse">
          <Select value={values.typeBiomasse || ""} onValueChange={(v) => onChange("typeBiomasse", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="granules">Granulés (pellets)</SelectItem>
              <SelectItem value="buches">Bûches</SelectItem>
              <SelectItem value="plaquettes">Plaquettes</SelectItem>
            </SelectContent>
          </Select>
        </FormFieldWithIcon>
      </>
    );
  }

  // Champs VMC
  if (aid === "vmc_double_flux") {
    return (
      <>
        <FormFieldWithIcon icon="📐" label="Surface du logement (m²)">
          <Input
            type="number"
            min="30"
            placeholder="Ex: 120"
            value={values.surfaceLogement || ""}
            onChange={(e) => onChange("surfaceLogement", e.target.value)}
          />
        </FormFieldWithIcon>

        <FormFieldWithIcon icon="🚿" label="Nombre de pièces humides">
          <Input
            type="number"
            min="1"
            max="10"
            placeholder="Ex: 3 (cuisine + 2 SDB)"
            value={values.nbPiecesHumides || ""}
            onChange={(e) => onChange("nbPiecesHumides", e.target.value)}
          />
        </FormFieldWithIcon>
      </>
    );
  }

  // Champs chauffe-eau
  if (aid === "cet_part") {
    return (
      <>
        <FormFieldWithIcon icon="👨‍👩‍👧‍👦" label="Nombre de personnes">
          <Input
            type="number"
            min="1"
            max="10"
            placeholder="Ex: 4"
            value={values.nbPersonnes || ""}
            onChange={(e) => onChange("nbPersonnes", e.target.value)}
          />
        </FormFieldWithIcon>

        <FormFieldWithIcon icon="💧" label="Type de chauffe-eau">
          <Select value={values.typeEnergieCET || ""} onValueChange={(v) => onChange("typeEnergieCET", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thermodynamique">Thermodynamique</SelectItem>
              <SelectItem value="solaire">Solaire individuel (CESI)</SelectItem>
            </SelectContent>
          </Select>
        </FormFieldWithIcon>
      </>
    );
  }

  return null;
};