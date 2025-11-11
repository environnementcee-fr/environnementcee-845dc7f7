
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Building, Sun, Home, Fan, Thermometer, Snowflake, Flame, Wind, Droplet } from "lucide-react";
import { getTravauxBySegment, TravauxItem } from "@/data/travauxCatalog";

interface CategoryGridProps {
  segment: 'pro' | 'part';
  onCardClick?: (aidId: string) => void;
}

const iconMap: Record<string, any> = {
  Lightbulb,
  Building,
  Sun,
  Home,
  Fan,
  Thermometer,
  Snowflake,
  Flame,
  Wind,
  Droplet,
};

export const CategoryGrid = ({ segment, onCardClick }: CategoryGridProps) => {
  const travaux = getTravauxBySegment(segment);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
      {travaux.map((item: TravauxItem, index: number) => {
        const Icon = iconMap[item.icon] || Lightbulb;

        return (
          <Card 
            key={index} 
            className="group hover:shadow-lg transition-smooth border-2 hover:border-primary cursor-pointer"
            onClick={() => onCardClick?.(item.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Icon className="h-10 w-10 text-primary group-hover:scale-110 transition-smooth" />
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" />
              </div>
              {item.tag && (
                <div className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mb-2">
                  {item.tag}
                </div>
              )}
              <CardTitle className="text-xl">{item.label}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                Tester mon éligibilité
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
