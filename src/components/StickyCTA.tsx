import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StickyProps {
  targetId: string;
  estimatedTime?: string;
}

export const StickyCTA = ({ targetId, estimatedTime = "2 min" }: StickyProps) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [100, 300], [0, 1]);
  const y = useTransform(scrollY, [100, 300], [50, 0]);

  const scrollToForm = () => {
    document.getElementById(targetId)?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-none"
    >
      <Button
        size="lg"
        onClick={scrollToForm}
        className="shadow-2xl pointer-events-auto gap-1 sm:gap-2 pr-2 sm:pr-3 text-xs sm:text-sm md:text-base h-10 sm:h-11 md:h-12"
      >
        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">{estimatedTime} •</span>
        <span className="hidden xs:inline sm:hidden">Éligibilité</span>
        <span className="hidden sm:inline">Tester mon éligibilité</span>
        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
    </motion.div>
  );
};
