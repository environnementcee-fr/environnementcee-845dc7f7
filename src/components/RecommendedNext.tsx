import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export const RecommendedNext = () => (
  <Card className="mt-6">
    <CardHeader>
      <CardTitle>Besoin d'un artisan pour réaliser vos travaux ?</CardTitle>
      <CardDescription>
        Trouvez des professionnels certifiés RGE près de chez vous
      </CardDescription>
    </CardHeader>
    <CardContent>
      <a 
        href="https://travauxhub.fr/deposer-projet" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <Button className="w-full gap-2">
          Déposer un projet sur TravauxHub
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </a>
    </CardContent>
  </Card>
);
