import { Shield, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";

export const TrustSignals = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-4 px-4 bg-muted/30 rounded-lg border border-border/50"
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Shield className="h-4 w-4 text-primary" />
        <span className="hidden sm:inline">Données cryptées</span>
        <span className="sm:hidden">Sécurisé</span>
      </div>
      
      <div className="h-4 w-px bg-border hidden sm:block" />
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Users className="h-4 w-4 text-primary" />
        <span className="hidden sm:inline">+2 453 demandes ce mois</span>
        <span className="sm:hidden">+2 453 demandes</span>
      </div>
      
      <div className="h-4 w-px bg-border hidden sm:block" />
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4 text-primary" />
        <span>Réponse sous 48h</span>
      </div>
    </motion.div>
  );
};
