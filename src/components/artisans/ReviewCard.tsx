import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Review {
  id: string;
  rating: number;
  comment?: string;
  created_at: string;
  user_id: string;
}

interface ReviewCardProps {
  review: Review;
  showClientName?: boolean;
  clientName?: string;
}

export const ReviewCard = ({ review, showClientName = true, clientName }: ReviewCardProps) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-primary text-primary"
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              {renderStars(review.rating)}
            </div>
            <span className="text-sm text-muted-foreground">
              {format(new Date(review.created_at), "dd MMM yyyy", { locale: fr })}
            </span>
          </div>

          {review.comment && (
            <p className="text-sm text-foreground">
              {review.comment}
            </p>
          )}

          {showClientName && clientName && (
            <p className="text-xs text-muted-foreground">
              Par {clientName}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
