import { Info, FileText, Users, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export const RoleSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Notre rôle : intermédiaire privé</h2>
                <p className="text-muted-foreground">
                  EnvironnementCEE.fr est un service privé d'accompagnement, indépendant du dispositif public des CEE
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Constitution du dossier</h3>
                <p className="text-sm text-muted-foreground">
                  Nous vous aidons à réunir tous les documents nécessaires pour votre demande CEE
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Mise en relation</h3>
                <p className="text-sm text-muted-foreground">
                  Nous vous connectons avec des professionnels RGE qualifiés et des obligés CEE
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4">
                  <ArrowRight className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Suivi personnalisé</h3>
                <p className="text-sm text-muted-foreground">
                  Accompagnement tout au long du processus jusqu'au versement de votre prime
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-background rounded-lg border border-border">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Les aides CEE proviennent des obligés</strong> (fournisseurs d'énergie) dans le cadre du dispositif public des Certificats d'Économies d'Énergie. 
                Pour plus d'informations sur le dispositif officiel, consultez le{" "}
                <a 
                  href="https://www.ecologie.gouv.fr/dispositif-des-certificats-deconomies-denergie" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  site du Ministère de la Transition Écologique
                </a>.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};