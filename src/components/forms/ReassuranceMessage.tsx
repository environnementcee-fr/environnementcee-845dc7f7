import { motion } from "framer-motion";
import { Sparkles, TrendingUp, CheckCircle } from "lucide-react";

interface ReassuranceMessageProps {
  step: number;
  totalSteps: number;
}

export const ReassuranceMessage = ({ step, totalSteps }: ReassuranceMessageProps) => {
  const getMessageForStep = () => {
    const progress = (step / totalSteps) * 100;

    if (step === 1) {
      return {
        icon: <Sparkles className="h-5 w-5 text-primary" />,
        text: "Commençons ! Ces informations nous aident à personnaliser votre estimation",
        color: "from-primary/20 to-primary/5",
      };
    } else if (step === totalSteps) {
      return {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        text: "Dernière étape ! Vous êtes sur le point de découvrir vos aides",
        color: "from-green-500/20 to-green-500/5",
      };
    } else if (progress >= 50) {
      return {
        icon: <TrendingUp className="h-5 w-5 text-primary" />,
        text: `Bravo ! Plus que ${totalSteps - step} ${totalSteps - step === 1 ? 'étape' : 'étapes'} pour votre estimation personnalisée`,
        color: "from-primary/20 to-primary/5",
      };
    } else {
      return {
        icon: <TrendingUp className="h-5 w-5 text-primary" />,
        text: "Vous progressez bien ! Chaque réponse nous rapproche de votre estimation",
        color: "from-primary/20 to-primary/5",
      };
    }
  };

  const message = getMessageForStep();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
      className={`bg-gradient-to-r ${message.color} border border-primary/10 rounded-lg p-4 mb-6`}
    >
      <div className="flex items-center gap-3">
        {message.icon}
        <p className="text-sm font-medium text-foreground">{message.text}</p>
      </div>
    </motion.div>
  );
};
