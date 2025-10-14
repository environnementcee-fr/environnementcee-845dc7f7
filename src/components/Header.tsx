import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-background border-b border-border py-6">
      <div className="container mx-auto px-4">
        <Link to="/" className="flex items-center justify-center gap-3 hover:opacity-80 transition-opacity">
          <Leaf className="h-8 w-8 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">EnvironnementCEE.fr</h1>
        </Link>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Plateforme d'accompagnement aux aides CEE pour professionnels
        </p>
      </div>
    </header>
  );
};
