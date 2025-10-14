import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-background border-b border-border py-4 md:py-6">
      <div className="container mx-auto px-4">
        <Link to="/" className="flex items-center justify-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
          <Leaf className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-foreground text-center">EnvironnementCEE.fr</h1>
        </Link>
        <p className="text-center text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">
          Plateforme d'accompagnement aux aides CEE
        </p>
      </div>
    </header>
  );
};
