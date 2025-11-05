import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Euro, Building } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Project {
  id: string;
  category: string;
  description: string;
  budget_band: string;
  urgency: string;
  zip_code: string;
  city: string;
  building_type: string;
  status: string;
  eligibility_score: number;
  created_at: string;
}

interface ProjectCardProps {
  project: Project;
  variant?: "client" | "artisan" | "admin";
  onAction?: () => void;
  actionLabel?: string;
  responseCount?: number;
}

const categoryLabels: Record<string, string> = {
  led: "Éclairage LED",
  isolation: "Isolation",
  pac: "Pompe à chaleur",
  ventilation: "Ventilation",
  renovation_globale: "Rénovation globale",
  autre: "Autre",
};

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending_review: { label: "En attente", variant: "secondary" },
  published: { label: "Publié", variant: "default" },
  matched: { label: "Artisan sélectionné", variant: "outline" },
  closed: { label: "Clôturé", variant: "outline" },
};

export const ProjectCard = ({
  project,
  variant = "client",
  onAction,
  actionLabel,
  responseCount,
}: ProjectCardProps) => {
  const statusConfig = statusLabels[project.status] || { label: project.status, variant: "outline" as const };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="default">{categoryLabels[project.category]}</Badge>
              <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
              {responseCount !== undefined && responseCount > 0 && (
                <Badge variant="secondary">{responseCount} réponse{responseCount > 1 ? "s" : ""}</Badge>
              )}
            </div>
            <CardTitle className="text-xl">
              {categoryLabels[project.category]} - {project.city}
            </CardTitle>
            <CardDescription className="mt-2 line-clamp-2">
              {project.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{project.zip_code} {project.city}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building className="h-4 w-4" />
            <span className="capitalize">{project.building_type}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Euro className="h-4 w-4" />
            <span>Budget: {project.budget_band}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(project.created_at), "dd MMM yyyy", { locale: fr })}</span>
          </div>
        </div>
        
        {onAction && actionLabel && (
          <Button onClick={onAction} className="w-full">
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
