import { Quote, TrendingUp, Users, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    company: "Restaurant Le Gourmet",
    sector: "Hôtellerie-Restauration",
    quote: "Grâce à Hello-Travaux, nous avons trouvé rapidement un artisan RGE de confiance. Les travaux d'isolation ont été réalisés en 2 semaines et nous avons bénéficié des aides CEE.",
    author: "Sophie M., Gérante"
  },
  {
    company: "Bureaux Parisiens",
    sector: "Tertiaire",
    quote: "Le processus était simple et bien expliqué. L'équipe nous a mis en relation avec un installateur RGE compétent. Le financement a couvert 100% de l'installation.",
    author: "Marc L., Directeur des Opérations"
  },
  {
    company: "Atelier Mécanique Dupont",
    sector: "Industrie",
    quote: "Nous hésitions à nous lancer dans les démarches CEE. L'équipe s'est occupée de tout le dossier. Résultat : 70% d'économies sur l'éclairage de notre atelier.",
    author: "Jean D., Gérant"
  }
];

const stats = [
  {
    icon: Building2,
    value: "500+",
    label: "Projets accompagnés"
  },
  {
    icon: TrendingUp,
    value: "€2M+",
    label: "Aides CEE obtenues"
  },
  {
    icon: Users,
    value: "98%",
    label: "Clients satisfaits"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="mb-4 text-background">Ils nous ont fait confiance</h2>
          <p className="text-lg text-background/80 max-w-2xl mx-auto">
            Découvrez les retours d'expérience de nos clients professionnels
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-background/95 backdrop-blur-sm text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-6 bg-background/95 backdrop-blur-sm hover:shadow-elegant transition-smooth"
            >
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              <p className="text-muted-foreground mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.company}</p>
                <p className="text-sm text-muted-foreground">{testimonial.sector}</p>
                <p className="text-sm text-primary mt-1">{testimonial.author}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};