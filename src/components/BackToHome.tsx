import { useLocation, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "./ui/button";

export const BackToHome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show on home page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <Button
      onClick={() => navigate("/")}
      className="fixed top-24 left-4 z-50 rounded-full shadow-lg bg-background/90 backdrop-blur-sm hover:bg-background transition-all duration-300 hover:scale-105 h-14 w-14"
      variant="outline"
      aria-label="Retour à l'accueil"
    >
      <Home className="h-6 w-6" />
    </Button>
  );
};
