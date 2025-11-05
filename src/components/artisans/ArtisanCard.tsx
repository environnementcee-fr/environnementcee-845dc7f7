import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, CheckCircle } from "lucide-react";

interface ArtisanProfile {
  id: string;
  company_name: string;
  trades: string[];
  zones: string[];
  rating_avg: number;
  rating_count: number;
  certifications: any[];
  slug: string;
}

interface ArtisanCardProps {
  artisan: ArtisanProfile;
  variant?: "search" | "response";
  onAction?: () => void;
  actionLabel?: string;
}

const tradeLabels: Record<string, string> = {
  led: "Éclairage LED",
  isolation: "Isolation",
  pac: "Pompe à chaleur",
  ventilation: "Ventilation",
  renovation_globale: "Rénovation globale",
  autre: "Autre",
};

export const ArtisanCard = ({
  artisan,
  variant = "search",
  onAction,
  actionLabel = "Voir le profil",
}: ArtisanCardProps) => {
  const hasRGE = Array.isArray(artisan.certifications) && 
    artisan.certifications.some((cert: any) => cert.type?.toUpperCase().includes("RGE"));

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl flex items-center gap-2">
              {artisan.company_name}
              {hasRGE && (
                <Badge variant="default" className="gap-1">
                  <CheckCircle className="h-3 w-3" />
                  RGE
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="mt-2 flex items-center gap-2">
              {artisan.rating_count > 0 && (
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{artisan.rating_avg.toFixed(1)}</span>
                  <span className="text-muted-foreground">({artisan.rating_count} avis)</span>
                </div>
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-4">
          <div>
            <p className="text-sm font-medium mb-1">Métiers</p>
            <div className="flex flex-wrap gap-1">
              {artisan.trades.slice(0, 3).map((trade) => (
                <Badge key={trade} variant="secondary" className="text-xs">
                  {tradeLabels[trade] || trade}
                </Badge>
              ))}
              {artisan.trades.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{artisan.trades.length - 3}
                </Badge>
              )}
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-1 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Zone d'intervention
            </p>
            <p className="text-sm text-muted-foreground">
              {artisan.zones.slice(0, 3).join(", ")}
              {artisan.zones.length > 3 && ` +${artisan.zones.length - 3}`}
            </p>
          </div>
        </div>
        
        {onAction && (
          <Button onClick={onAction} variant="outline" className="w-full">
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
