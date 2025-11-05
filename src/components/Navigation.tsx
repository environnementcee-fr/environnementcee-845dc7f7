import { Leaf, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { label: "Accueil", path: "/" },
    { label: "Professionnels", path: "/pro/led" },
    { label: "Particuliers", path: "/particuliers" },
    { label: "Ma Prime Rénov", path: "/ma-prime-renov" },
    { label: "Trouver un artisan", path: "/trouver-un-artisan" },
    { label: "Aides", path: "/aides" },
    { label: "Blog", path: "/blog" },
    { label: "Qui sommes-nous", path: "/qui-sommes-nous" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <Leaf className="h-8 w-8 text-primary transition-smooth group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-foreground">Hello-Travaux</span>
              <span className="text-xs text-muted-foreground hidden md:block">Transition énergétique simplifiée</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>


          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                      isActive(item.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
