import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export const TravauxLinksPromo = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Vous avez besoin d'un artisan RGE pour vos travaux ?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Découvrez TravauxLinks : trouvez des professionnels certifiés près de chez vous et comparez les devis gratuitement.
          </p>
          <a 
            href="https://travauxlinks.fr/deposer-projet" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button size="lg" className="gap-2">
              Trouver un artisan RGE
              <ArrowUpRight className="h-5 w-5" />
            </Button>
          </a>
        </Card>
      </div>
    </section>
  );
};
