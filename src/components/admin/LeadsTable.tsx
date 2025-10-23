import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Search, RefreshCw } from "lucide-react";

type Lead = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  aid_type: string;
  user_type: string;
  status: string;
  company_name: string | null;
  surface: number | null;
};

const AID_TYPE_LABELS: Record<string, string> = {
  led_entrepot: "LED Entrepôt",
  led_bureau: "LED Bureau",
  led_solaire: "LED Solaire",
  isolation_particulier: "Isolation Particulier",
  isolation_pro: "Isolation Pro",
  pac_particulier: "PAC Particulier",
  pac_pro: "PAC Pro",
  brasseur_air: "Brasseur d'Air",
  hp_flottante: "HP Flottante",
};

const STATUS_COLORS: Record<string, string> = {
  nouveau: "bg-blue-100 text-blue-800",
  en_cours: "bg-yellow-100 text-yellow-800",
  converti: "bg-green-100 text-green-800",
  perdu: "bg-red-100 text-red-800",
};

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [aidTypeFilter, setAidTypeFilter] = useState<string>("all");

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, statusFilter, aidTypeFilter]);

  const loadLeads = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("lead_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erreur lors du chargement des leads");
      console.error(error);
    } else {
      setLeads(data || []);
    }
    setIsLoading(false);
  };

  const filterLeads = () => {
    let filtered = [...leads];

    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    if (aidTypeFilter !== "all") {
      filtered = filtered.filter((lead) => lead.aid_type === aidTypeFilter);
    }

    setFilteredLeads(filtered);
  };

  const updateStatus = async (leadId: string, newStatus: string) => {
    const { error } = await supabase
      .from("lead_submissions")
      .update({ status: newStatus })
      .eq("id", leadId);

    if (error) {
      toast.error("Erreur lors de la mise à jour du statut");
    } else {
      toast.success("Statut mis à jour");
      loadLeads();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Gestion des Leads</span>
          <Button onClick={loadLeads} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
        </CardTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="nouveau">Nouveau</SelectItem>
              <SelectItem value="en_cours">En cours</SelectItem>
              <SelectItem value="converti">Converti</SelectItem>
              <SelectItem value="perdu">Perdu</SelectItem>
            </SelectContent>
          </Select>
          <Select value={aidTypeFilter} onValueChange={setAidTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Type d'aide" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              {Object.entries(AID_TYPE_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center py-8">Chargement...</p>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type d'aide</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Surface</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Aucun lead trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(lead.created_at), "dd MMM yyyy", { locale: fr })}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {lead.first_name} {lead.last_name}
                        </div>
                        {lead.company_name && (
                          <div className="text-sm text-muted-foreground">{lead.company_name}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{lead.email}</div>
                        <div className="text-sm text-muted-foreground">{lead.phone}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{AID_TYPE_LABELS[lead.aid_type]}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {lead.user_type === "particulier" ? "Particulier" : "Pro"}
                        </Badge>
                      </TableCell>
                      <TableCell>{lead.surface ? `${lead.surface}m²` : "-"}</TableCell>
                      <TableCell>
                        <Select
                          value={lead.status}
                          onValueChange={(value) => updateStatus(lead.id, value)}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue>
                              <Badge className={STATUS_COLORS[lead.status]}>
                                {lead.status.replace("_", " ")}
                              </Badge>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nouveau">Nouveau</SelectItem>
                            <SelectItem value="en_cours">En cours</SelectItem>
                            <SelectItem value="converti">Converti</SelectItem>
                            <SelectItem value="perdu">Perdu</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
