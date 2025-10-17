import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TrustSignals } from "./TrustSignals";

export interface WizardStep {
  id: number;
  title: string;
  subtitle?: string;
  emoji: string;
  illustration: string;
}

interface VisualStepWizardProps {
  steps: WizardStep[];
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  onSubmit?: () => void;
  isLastStep: boolean;
  isSubmitting?: boolean;
  canContinue?: boolean;
}

export const VisualStepWizard = ({
  steps,
  currentStep,
  totalSteps,
  children,
  onNext,
  onBack,
  onSubmit,
  isLastStep,
  isSubmitting = false,
  canContinue = true,
}: VisualStepWizardProps) => {
  const currentStepData = steps[currentStep - 1];
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      {/* Progress Bar */}
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Étape {currentStep}/{totalSteps}
            </span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/80"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={cn(
                  "flex flex-col items-center gap-1 transition-opacity",
                  idx + 1 === currentStep ? "opacity-100" : "opacity-40"
                )}
              >
                <span className="text-xl">{step.emoji}</span>
                <span className="text-xs text-muted-foreground hidden md:block">
                  {step.title.split(" ").slice(0, 2).join(" ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 container mx-auto px-4 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            {/* Trust Signals */}
            {currentStep === 1 && (
              <div className="mb-6">
                <TrustSignals />
              </div>
            )}

            {/* Form Content */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="sticky bottom-0 bg-card/95 backdrop-blur-sm border-t border-border shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-4 max-w-4xl mx-auto">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={isSubmitting}
                className="flex-1 md:flex-none"
              >
                ← Retour
              </Button>
            )}
            {isLastStep ? (
              <Button
                type="submit"
                onClick={onSubmit}
                disabled={isSubmitting || !canContinue}
                className="flex-1"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={onNext}
                disabled={!canContinue}
                className="flex-1 ml-auto"
              >
                Continuer →
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
