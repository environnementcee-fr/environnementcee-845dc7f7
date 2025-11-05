import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Contactez-nous</h1>
        <p className="text-xl text-center mb-12 text-muted-foreground">
          Une question sur les aides CEE ? Notre équipe est là pour vous accompagner.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 rounded-lg border bg-card">
            <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <a href="mailto:contact@hello-travaux.fr" className="text-primary hover:underline">
              contact@hello-travaux.fr
            </a>
          </div>
          
          <div className="text-center p-6 rounded-lg border bg-card">
            <Phone className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
            <a href="tel:+33XXXXXXXXX" className="text-primary hover:underline">
              [Numéro à compléter]
            </a>
          </div>
          
          <div className="text-center p-6 rounded-lg border bg-card">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Adresse</h3>
            <p className="text-muted-foreground">
              [Adresse à compléter]
            </p>
          </div>
        </div>

        <div className="bg-card p-8 rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
          <p className="mb-4 text-muted-foreground">
            Pour une réponse plus rapide, utilisez notre <a href="/simulation" className="text-primary underline">formulaire de simulation</a> qui nous permettra de mieux comprendre votre projet.
          </p>
          <p className="text-muted-foreground">
            Sinon, vous pouvez nous écrire directement à <a href="mailto:contact@hello-travaux.fr" className="text-primary underline">contact@hello-travaux.fr</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
