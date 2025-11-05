import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Response {
  id: string;
  message: string;
  estimated_timeline?: string;
  created_at: string;
  status: string;
  artisan_profiles: {
    id: string;
    company_name: string;
    rating_avg: number;
    rating_count: number;
    certifications: any[];
    slug: string;
  };
}

interface ResponseCardProps {
  response: Response;
  onSelect?: () => void;
  showContact?: boolean;
  contactInfo?: {
    email: string;
    phone: string;
  };
}

export const ResponseCard = ({ response, onSelect, showContact, contactInfo }: ResponseCardProps) => {
  const artisan = response.artisan_profiles;
  const hasRGE = Array.isArray(artisan.certifications) && 
    artisan.certifications.some((cert: any) => cert.type?.toUpperCase().includes("RGE"));

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {artisan.company_name}
              {hasRGE && (
                <Badge variant="default" className="gap-1">
                  <CheckCircle className="h-3 w-3" />
                  RGE
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              {artisan.rating_count > 0 && (
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span className="font-medium">{artisan.rating_avg.toFixed(1)}</span>
                  <span className="text-muted-foreground">({artisan.rating_count} avis)</span>
                </div>
              )}
              {response.estimated_timeline && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{response.estimated_timeline}</span>
                </div>
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Message de l'artisan</p>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {response.message}
            </p>
          </div>

          {showContact && contactInfo && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Coordonnées</p>
              <div className="space-y-1 text-sm">
                <p>📧 {contactInfo.email}</p>
                <p>📞 {contactInfo.phone}</p>
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Reçu le {format(new Date(response.created_at), "dd MMM yyyy 'à' HH:mm", { locale: fr })}
          </p>

          {onSelect && response.status === "sent" && (
            <Button onClick={onSelect} className="w-full">
              Mettre en relation avec cet artisan
            </Button>
          )}

          {response.status === "selected" && (
            <Badge variant="default" className="w-full justify-center py-2">
              Artisan sélectionné
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
