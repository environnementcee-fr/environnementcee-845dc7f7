import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const articles = [
    {
      title: "Les aides CEE en 2025 : ce qui change pour les professionnels",
      excerpt: "Découvrez les nouvelles conditions d'éligibilité et les montants revalorisés pour vos projets de rénovation énergétique.",
      date: "15 janvier 2025",
      category: "Réglementation",
      slug: "aides-cee-2025",
    },
    {
      title: "Isolation des bâtiments tertiaires : guide complet 2025",
      excerpt: "Comment optimiser l'isolation de vos locaux professionnels et profiter des aides disponibles.",
      date: "10 janvier 2025",
      category: "Isolation",
      slug: "isolation-batiment-tertiaire",
    },
    {
      title: "Pompes à chaleur industrielles : le guide pour les professionnels",
      excerpt: "Tout savoir sur les PAC pour grandes surfaces et bâtiments tertiaires.",
      date: "5 janvier 2025",
      category: "Chauffage",
      slug: "pac-industrielle",
    },
    {
      title: "Éclairage LED professionnel : ROI et économies réelles",
      excerpt: "Analyse chiffrée du retour sur investissement d'un passage au LED pour les entreprises.",
      date: "28 décembre 2024",
      category: "Éclairage",
      slug: "led-roi-economies",
    },
    {
      title: "Comment cumuler CEE, MaPrimeRénov' et éco-PTZ ?",
      excerpt: "Le guide pratique pour maximiser vos aides et financer 100% de vos travaux.",
      date: "20 décembre 2024",
      category: "Guide",
      slug: "cumuler-aides",
    },
    {
      title: "Rénovation globale : la nouvelle star des aides 2025",
      excerpt: "Tout savoir sur MaPrimeRénov' Parcours Accompagné et les aides bonifiées.",
      date: "15 décembre 2024",
      category: "Actualités",
      slug: "renovation-globale-2025",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Réglementation": "bg-primary/10 text-primary",
      "Isolation": "bg-accent/10 text-accent",
      "Chauffage": "bg-secondary/10 text-secondary",
      "Éclairage": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
      "Guide": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      "Actualités": "bg-purple-500/10 text-purple-700 dark:text-purple-400",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen">
      <title>Blog & Actualités - Hello-Travaux</title>
      
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6 text-foreground">
              Blog & Actualités
            </h1>
            <p className="text-xl text-muted-foreground">
              Restez informé des dernières actualités sur les aides CEE, découvrez nos guides pratiques et nos témoignages clients.
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {articles.map((article, index) => (
              <Card 
                key={index}
                className="group hover:shadow-lg transition-smooth border-2 hover:border-primary cursor-pointer flex flex-col"
              >
                <Link to={`/blog/${article.slug}`} className="flex flex-col h-full">
                  <CardHeader className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-smooth">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          {/* Note CMS */}
          <div className="max-w-4xl mx-auto mt-12">
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="pt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  📝 <strong>À venir :</strong> Système de gestion de contenu (CMS) intégré pour faciliter la publication et l'édition d'articles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
