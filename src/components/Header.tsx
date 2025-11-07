import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-background border-b border-border py-4 md:py-6">
      <div className="container mx-auto px-4">
    <Link to="/" className="flex items-center justify-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
      <Leaf className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
      <div className="flex flex-col">
        <h1 className="text-base md:text-xl lg:text-2xl font-bold text-foreground text-center">
          EnvironnementCEE
        </h1>
        <p className="text-xs text-muted-foreground text-center">
          by <a href="https://travauxhub.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">TravauxHub</a>
        </p>
      </div>
    </Link>
    <p className="text-center text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">
      Plateforme d'accompagnement aux aides CEE
    </p>
      </div>
    </header>
  );
};
