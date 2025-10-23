import { motion } from "framer-motion";
import { RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SavedFormNoticeProps {
  onRestore: () => void;
  onDismiss: () => void;
}

export const SavedFormNotice = ({ onRestore, onDismiss }: SavedFormNoticeProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <RotateCcw className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-sm text-foreground mb-1">
              Formulaire sauvegardé trouvé
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              Nous avons retrouvé vos réponses précédentes. Voulez-vous continuer où vous en étiez ?
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={onRestore}
                className="h-8"
              >
                Reprendre
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDismiss}
                className="h-8"
              >
                Recommencer
              </Button>
            </div>
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDismiss}
          className="h-6 w-6 p-0 flex-shrink-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};
