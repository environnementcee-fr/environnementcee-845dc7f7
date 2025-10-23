import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, Clock, TrendingUp } from "lucide-react";

export function LeadsStats() {
  const [stats, setStats] = useState({
    total: 0,
    nouveau: 0,
    enCours: 0,
    converti: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const { data: leads, error } = await supabase
      .from("lead_submissions")
      .select("status");

    if (error) {
      console.error("Error loading stats:", error);
      return;
    }

    const statsByStatus = leads?.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    setStats({
      total: leads?.length || 0,
      nouveau: statsByStatus?.["nouveau"] || 0,
      enCours: statsByStatus?.["en_cours"] || 0,
      converti: statsByStatus?.["converti"] || 0,
    });
  };

  const cards = [
    {
      title: "Total Leads",
      value: stats.total,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Nouveaux",
      value: stats.nouveau,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "En cours",
      value: stats.enCours,
      icon: TrendingUp,
      color: "text-orange-600",
    },
    {
      title: "Convertis",
      value: stats.converti,
      icon: CheckCircle,
      color: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
