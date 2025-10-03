import logoCEE from "@/assets/logo-cee.png";
import logoMinistere from "@/assets/logo-ministere.png";

export const Header = () => {
  return (
    <header className="bg-background border-b border-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-8 md:gap-12">
          <img 
            src={logoMinistere} 
            alt="Ministère de la Transition Écologique et Solidaire" 
            className="h-16 md:h-20 w-auto object-contain"
          />
          <img 
            src={logoCEE} 
            alt="Les certificats d'économies d'énergie" 
            className="h-16 md:h-20 w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
};
