import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TrustSignals } from "./TrustSignals";
import { ReassuranceMessage } from "./ReassuranceMessage";

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
      {/* Progress Bar - Enhanced */}
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentStepData?.emoji}</span>
              <div>
                <span className="text-sm font-bold text-foreground block">
                  {currentStepData?.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  Étape {currentStep}/{totalSteps}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary animate-pulse">{Math.round(progress)}%</span>
            </div>
          </div>
          <div className="relative h-3 bg-muted rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-primary to-green-500 shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </div>
          {/* Step Indicators */}
          <div className="flex items-center justify-between mt-4 gap-1">
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: idx + 1 === currentStep ? 1.1 : 0.9,
                  opacity: idx + 1 <= currentStep ? 1 : 0.3
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex flex-col items-center gap-1 transition-all rounded-lg p-2",
                  idx + 1 === currentStep && "bg-primary/10 ring-2 ring-primary"
                )}
              >
                <span className="text-xl md:text-2xl">{step.emoji}</span>
                <span className={cn(
                  "text-xs font-medium hidden sm:block text-center",
                  idx + 1 === currentStep ? "text-primary" : "text-muted-foreground"
                )}>
                  {step.title.split(" ").slice(0, 2).join(" ")}
                </span>
                {idx + 1 < currentStep && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-1 bg-green-500 rounded-full p-1"
                  >
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </motion.div>
                )}
              </motion.div>
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
            {/* Hero Image */}
            {currentStepData?.illustration && typeof currentStepData.illustration === 'string' && currentStepData.illustration.startsWith('/') === false && currentStepData.illustration.includes('.jpg') && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="mb-8 rounded-2xl overflow-hidden shadow-xl"
              >
                <img 
                  src={currentStepData.illustration} 
                  alt={currentStepData.title}
                  className="w-full h-48 md:h-64 object-cover"
                />
              </motion.div>
            )}

            {/* Trust Signals */}
            {currentStep === 1 && (
              <div className="mb-6">
                <TrustSignals />
              </div>
            )}

            {/* Reassurance Message */}
            <ReassuranceMessage step={currentStep} totalSteps={totalSteps} />

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
