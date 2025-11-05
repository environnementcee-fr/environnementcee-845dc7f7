import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

interface EligibilityScoreProps {
  score: number; // 0-10
  className?: string;
}

export const EligibilityScore = ({ score, className = "" }: EligibilityScoreProps) => {
  const getScoreConfig = (score: number) => {
    if (score >= 8) {
      return {
        variant: "default" as const,
        icon: CheckCircle2,
        text: "Très probablement éligible",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-950/30",
      };
    } else if (score >= 5) {
      return {
        variant: "secondary" as const,
        icon: Info,
        text: "Éligible à confirmer",
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-50 dark:bg-orange-950/30",
      };
    } else {
      return {
        variant: "outline" as const,
        icon: AlertCircle,
        text: "À étudier",
        color: "text-muted-foreground",
        bgColor: "bg-muted",
      };
    }
  };

  const config = getScoreConfig(score);
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg ${config.bgColor} ${className}`}>
      <Icon className={`h-6 w-6 ${config.color}`} />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">Score d'éligibilité</span>
          <Badge variant={config.variant} className="font-bold">
            {score}/10
          </Badge>
        </div>
        <p className={`text-sm ${config.color}`}>
          {config.text}
        </p>
      </div>
    </div>
  );
};
