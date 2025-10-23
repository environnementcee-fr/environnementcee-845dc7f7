import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormFieldWithIconProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
  isValid?: boolean;
}

export const FormFieldWithIcon = ({
  icon,
  label,
  children,
  className,
  isValid = false,
}: FormFieldWithIconProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        <span className="text-xl">{icon}</span>
        <span className="flex-1">{label}</span>
        <AnimatePresence>
          {isValid && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </label>
      {children}
    </div>
  );
};
