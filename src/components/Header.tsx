import logoCEE from "@/assets/logo-cee.png";
import logoMinistere from "@/assets/logo-ministere.png";

export const Header = () => {
  return (
    <header className="bg-background border-b border-border py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <img 
            src={logoMinistere} 
            alt="Ministère de la Transition Écologique et Solidaire" 
            className="h-28 md:h-36 w-auto object-contain mix-blend-multiply dark:mix-blend-lighten"
          />
          <img 
            src={logoCEE} 
            alt="Les certificats d'économies d'énergie" 
            className="h-40 md:h-52 w-auto object-contain mix-blend-multiply dark:mix-blend-lighten"
          />
        </div>
      </div>
    </header>
  );
};
