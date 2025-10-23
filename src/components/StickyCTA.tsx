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
      className="fixed bottom-6 right-6 z-50 pointer-events-none"
    >
      <Button
        size="lg"
        onClick={scrollToForm}
        className="shadow-2xl pointer-events-auto gap-2 pr-3"
      >
        <Clock className="h-4 w-4" />
        <span className="hidden sm:inline">{estimatedTime} •</span>
        <span>Tester mon éligibilité</span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </motion.div>
  );
};
