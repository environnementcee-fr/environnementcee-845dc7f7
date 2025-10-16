import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface VisualChoiceCardProps {
  illustration?: string;
  title: string;
  subtitle?: string;
  icon?: string;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const VisualChoiceCard = ({
  illustration,
  title,
  subtitle,
  icon,
  isSelected,
  onClick,
  disabled = false,
}: VisualChoiceCardProps) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={cn(
        "relative w-full p-6 rounded-xl border-2 transition-all duration-200 text-left",
        "focus:outline-none focus:ring-4 focus:ring-primary/20",
        isSelected
          ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/30"
          : "border-border bg-card hover:border-primary/50 hover:shadow-md",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* Selected Indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-1"
        >
          <Check className="h-4 w-4" />
        </motion.div>
      )}

      {/* Icon or Illustration */}
      {illustration ? (
        <div className="mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 p-4 flex items-center justify-center">
          <img
            src={illustration}
            alt={title}
            className="w-full h-48 object-contain"
          />
        </div>
      ) : icon ? (
        <div className="text-4xl mb-4">{icon}</div>
      ) : null}

      {/* Content */}
      <div>
        <h3 className="font-semibold text-lg mb-1 text-foreground">{title}</h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </motion.button>
  );
};
