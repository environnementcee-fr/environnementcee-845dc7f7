import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Euro, CheckCircle, ArrowRight, Home, Building2, Lightbulb, Wind, Snowflake, Flame } from "lucide-react";

const Aides = () => {
  return (
    <div className="min-h-screen">
      <title>Les Aides CEE Disponibles - EnvironnementCEE.fr</title>
      
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6 text-foreground">
              Guide complet des aides à la transition énergétique 2025
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Découvrez tous les barèmes, conditions d'éligibilité et montants détaillés des aides CEE et MaPrimeRénov' pour vos travaux de rénovation énergétique.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Particuliers / Professionnels */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="particuliers" className="max-w-7xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="particuliers" className="gap-2">
                <Home className="h-4 w-4" />
                Particuliers
              </TabsTrigger>
              <TabsTrigger value="professionnels" className="gap-2">
                <Building2 className="h-4 w-4" />
                Professionnels
              </TabsTrigger>
            </TabsList>

            {/* PARTICULIERS */}
            <TabsContent value="particuliers" className="space-y-12">
              {/* MaPrimeRénov' 2025 */}
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-foreground">MaPrimeRénov' 2025</h2>
                  <p className="text-muted-foreground max-w-3xl mx-auto">
                    Aide de l'État pour financer vos travaux de rénovation énergétique selon vos revenus et le type de travaux réalisés.
                  </p>
                </div>

                {/* Barèmes par catégorie */}
                <div className="grid gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Badge className="bg-blue-500">MaPrimeRénov' Bleu</Badge>
                        <span className="text-lg">Revenus très modestes</span>
                      </CardTitle>
                      <CardDescription>
                        Revenus annuels : jusqu'à 23 541€ (1 personne en Île-de-France) ou 17 009€ (hors Île-de-France)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type de travaux</TableHead>
                            <TableHead className="text-right">Montant aide</TableHead>
                            <TableHead className="text-right">Plafond</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Isolation murs extérieurs</TableCell>
                            <TableCell className="text-right">75€/m²</TableCell>
                            <TableCell className="text-right">150 m²</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Isolation toiture/combles</TableCell>
                            <TableCell className="text-right">75€/m²</TableCell>
                            <TableCell className="text-right">100 m²</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Pompe à chaleur air/eau</TableCell>
                            <TableCell className="text-right">5 000€</TableCell>
                            <TableCell className="text-right">-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Pompe à chaleur géothermique</TableCell>
                            <TableCell className="text-right">11 000€</TableCell>
                            <TableCell className="text-right">-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Chauffe-eau thermodynamique</TableCell>
                            <TableCell className="text-right">1 200€</TableCell>
                            <TableCell className="text-right">-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">VMC double flux</TableCell>
                            <TableCell className="text-right">4 000€</TableCell>
                            <TableCell className="text-right">-</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Badge className="bg-yellow-500">MaPrimeRénov' Jaune</Badge>
                        <span className="text-lg">Revenus modestes</span>
                      </CardTitle>
                      <CardDescription>
                        Revenus annuels : 23 542€ à 34 551€ (1 personne en ÎdF) ou 17 010€ à 24 918€ (hors ÎdF)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type de travaux</TableHead>
                            <TableHead className="text-right">Montant aide</TableHead>
                            <TableHead className="text-right">Plafond</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Isolation murs extérieurs</TableCell>
                            <TableCell className="text-right">60€/m²</TableCell>
                            <TableCell className="text-right">150 m²</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Isolation toiture/combles</TableCell>
                            <TableCell className="text-right">60€/m²</TableCell>
                            <TableCell className="text-right">100 m²</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Pompe à chaleur air/eau</TableCell>
                            <TableCell className="text-right">4 000€</TableCell>
                            <TableCell className="text-right">-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Pompe à chaleur géothermique</TableCell>
                            <TableCell className="text-right">9 000€</TableCell>
                            <TableCell className="text-right">-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Chauffe-eau thermodynamique</TableCell>
                            <TableCell className="text-right">800€</TableCell>
                            <TableCell className="text-right">-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">VMC double flux</TableCell>
                            <TableCell className="text-right">3 000€</TableCell>
                            <TableCell className="text-right">-</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Badge className="bg-purple-500">MaPrimeRénov' Violet</Badge>
                        <span className="text-lg">Revenus intermédiaires</span>
                      </CardTitle>
                      <CardDescription>
                        Revenus annuels : 34 552€ à 48 488€ (1 personne en ÎdF) ou 24 919€ à 38 958€ (hors ÎdF)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type de travaux</TableHead>
                            <TableHead className="text-right">Montant aide</TableHead>
                            <TableHead className="text-right">Plafond</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Isolation murs extérieurs</TableCell>
                            <TableCell className="text-right">40€/m²</TableCell>
                            <TableCell className="text-right">150 m²</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Isolation toiture/combles</TableCell>
                            <TableCell className="text-right">40€/m²</TableCell>
                            <TableCell className="text-right">100 m²</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Pompe à chaleur air/eau</TableCell>
                            <TableCell className="text-right">3 000€</TableCell>
                            <TableCell className="text-right">-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Pompe à chaleur géothermique</TableCell>
                            <TableCell className="text-right">6 000€</TableCell>
                            <TableCell className="text-right">-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Chauffe-eau thermodynamique</TableCell>
                            <TableCell className="text-right">400€</TableCell>
                            <TableCell className="text-right">-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">VMC double flux</TableCell>
                            <TableCell className="text-right">2 000€</TableCell>
                            <TableCell className="text-right">-</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Badge className="bg-rose-500">MaPrimeRénov' Rose</Badge>
                        <span className="text-lg">Revenus supérieurs</span>
                      </CardTitle>
                      <CardDescription>
                        Revenus annuels : au-delà de 48 488€ (1 personne en ÎdF) ou 38 958€ (hors ÎdF)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          <strong className="text-foreground">Important :</strong> Les ménages aux revenus supérieurs ne sont plus éligibles aux aides MaPrimeRénov' par geste depuis le 1er avril 2024. Vous pouvez toutefois bénéficier de :
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                          <li><strong className="text-foreground">MaPrimeRénov' Parcours Accompagné</strong> : pour les rénovations d'ampleur avec un gain énergétique de minimum 2 classes DPE</li>
                          <li><strong className="text-foreground">Aides CEE</strong> : sans condition de revenus pour certains travaux</li>
                          <li><strong className="text-foreground">Éco-PTZ</strong> : prêt à taux zéro jusqu'à 50 000€</li>
                          <li><strong className="text-foreground">TVA réduite</strong> : 5,5% sur les travaux éligibles</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* CEE Particuliers */}
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-foreground">Primes CEE Particuliers</h2>
                  <p className="text-muted-foreground max-w-3xl mx-auto">
                    Les Certificats d'Économies d'Énergie financent vos travaux sans condition de revenus. Montants indicatifs moyens.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Snowflake className="h-8 w-8 text-primary" />
                        <CardTitle>Isolation</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type d'isolation</TableHead>
                            <TableHead className="text-right">Prime CEE</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Combles perdus</TableCell>
                            <TableCell className="text-right font-semibold text-primary">10-20€/m²</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Combles aménagés</TableCell>
                            <TableCell className="text-right font-semibold text-primary">25-35€/m²</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Murs par l'extérieur</TableCell>
                            <TableCell className="text-right font-semibold text-primary">15-25€/m²</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Plancher bas</TableCell>
                            <TableCell className="text-right font-semibold text-primary">10-20€/m²</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <p className="text-xs text-muted-foreground mt-4">
                        <strong>Conditions :</strong> Résistance thermique minimale requise, logement de plus de 2 ans, installateur RGE.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Flame className="h-8 w-8 text-primary" />
                        <CardTitle>Chauffage & Eau chaude</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Équipement</TableHead>
                            <TableHead className="text-right">Prime CEE</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>PAC air/eau</TableCell>
                            <TableCell className="text-right font-semibold text-primary">2 500-4 500€</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>PAC géothermique</TableCell>
                            <TableCell className="text-right font-semibold text-primary">4 000-6 000€</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Chauffe-eau thermodynamique</TableCell>
                            <TableCell className="text-right font-semibold text-primary">150-250€</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Chaudière biomasse</TableCell>
                            <TableCell className="text-right font-semibold text-primary">4 000-5 000€</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <p className="text-xs text-muted-foreground mt-4">
                        <strong>Conditions :</strong> Performance énergétique minimale (COP, ETAS), installateur RGE.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Wind className="h-8 w-8 text-primary" />
                        <CardTitle>Ventilation</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Équipement</TableHead>
                            <TableHead className="text-right">Prime CEE</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>VMC double flux</TableCell>
                            <TableCell className="text-right font-semibold text-primary">300-500€</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>VMC simple flux hygroréglable</TableCell>
                            <TableCell className="text-right font-semibold text-primary">150-250€</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <p className="text-xs text-muted-foreground mt-4">
                        <strong>Conditions :</strong> Efficacité énergétique minimale, certification NF, installateur RGE.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="h-8 w-8 text-primary" />
                        <CardTitle>Cumulabilité</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">
                          <strong className="text-foreground">CEE + MaPrimeRénov'</strong> : cumulable pour maximiser les aides
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">
                          <strong className="text-foreground">CEE + Éco-PTZ</strong> : financement complémentaire sans intérêt
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">
                          <strong className="text-foreground">CEE + TVA réduite</strong> : 5,5% automatiquement appliqué
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">
                          <strong className="text-foreground">Aides locales</strong> : variables selon votre collectivité
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Exemple concret */}
              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle className="text-2xl">Exemple concret : Isolation + PAC</CardTitle>
                  <CardDescription>Maison 100m², ménage aux revenus modestes (Jaune)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Travaux prévus</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex justify-between">
                            <span>Isolation combles (80m²)</span>
                            <span className="font-semibold">8 000€</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Pompe à chaleur air/eau</span>
                            <span className="font-semibold">12 000€</span>
                          </li>
                          <li className="flex justify-between pt-2 border-t border-border">
                            <span className="font-semibold text-foreground">Coût total HT</span>
                            <span className="font-semibold text-foreground">20 000€</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Aides cumulées</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex justify-between">
                            <span>MaPrimeRénov' Jaune</span>
                            <span className="font-semibold text-primary">8 800€</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Primes CEE</span>
                            <span className="font-semibold text-primary">3 500€</span>
                          </li>
                          <li className="flex justify-between">
                            <span>TVA réduite (5,5%)</span>
                            <span className="font-semibold text-primary">1 000€</span>
                          </li>
                          <li className="flex justify-between pt-2 border-t border-border">
                            <span className="font-semibold text-foreground">Total aides</span>
                            <span className="font-semibold text-primary">13 300€</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-foreground">Reste à charge</span>
                        <span className="text-2xl font-bold text-primary">6 700€</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Soit 33,5% du coût total - Finançable par Éco-PTZ sans intérêt
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* PROFESSIONNELS */}
            <TabsContent value="professionnels" className="space-y-12">
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-foreground">Aides CEE Professionnels</h2>
                  <p className="text-muted-foreground max-w-3xl mx-auto">
                    Financez vos travaux d'efficacité énergétique grâce aux primes CEE, sans condition de chiffre d'affaires. Montants indicatifs pour des projets standards.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Lightbulb className="h-8 w-8 text-primary" />
                        <CardTitle>Éclairage LED</CardTitle>
                      </div>
                      <CardDescription>BAT-EQ-127 : Luminaires LED</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type de local</TableHead>
                            <TableHead className="text-right">Prime/point lumineux</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Bureau (300 lux)</TableCell>
                            <TableCell className="text-right font-semibold text-primary">80-120€</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Entrepôt (200 lux)</TableCell>
                            <TableCell className="text-right font-semibold text-primary">100-150€</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Commerce (500 lux)</TableCell>
                            <TableCell className="text-right font-semibold text-primary">120-180€</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Industrie (150-300 lux)</TableCell>
                            <TableCell className="text-right font-semibold text-primary">90-140€</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                        <p><strong>Conditions techniques :</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Efficacité lumineuse ≥ 120 lm/W</li>
                          <li>Facteur de puissance ≥ 0,9</li>
                          <li>Durée de vie ≥ 50 000 heures</li>
                          <li>Remplacement d'éclairage existant obligatoire</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Snowflake className="h-8 w-8 text-primary" />
                        <CardTitle>Isolation Bâtiment Tertiaire</CardTitle>
                      </div>
                      <CardDescription>BAT-EN-101 à 107</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type d'isolation</TableHead>
                            <TableHead className="text-right">Prime CEE/m²</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Toiture terrasse</TableCell>
                            <TableCell className="text-right font-semibold text-primary">50-70€</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Combles/Toiture</TableCell>
                            <TableCell className="text-right font-semibold text-primary">30-45€</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Murs extérieurs</TableCell>
                            <TableCell className="text-right font-semibold text-primary">40-60€</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Plancher bas</TableCell>
                            <TableCell className="text-right font-semibold text-primary">35-50€</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                        <p><strong>Conditions techniques :</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Résistance thermique R ≥ 4 m².K/W (toiture)</li>
                          <li>Résistance thermique R ≥ 3 m².K/W (murs)</li>
                          <li>Surface minimum : 50 m²</li>
                          <li>Bâtiment existant de plus de 2 ans</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Flame className="h-8 w-8 text-primary" />
                        <CardTitle>Pompe à Chaleur Pro</CardTitle>
                      </div>
                      <CardDescription>BAT-TH-113 : PAC pour chauffage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type de PAC</TableHead>
                            <TableHead className="text-right">Prime CEE</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>PAC air/eau (≤ 400 kW)</TableCell>
                            <TableCell className="text-right font-semibold text-primary">3 000-8 000€</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>PAC eau/eau géothermique</TableCell>
                            <TableCell className="text-right font-semibold text-primary">8 000-15 000€</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>PAC industrielle haute T°</TableCell>
                            <TableCell className="text-right font-semibold text-primary">10 000-25 000€</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                        <p><strong>Conditions techniques :</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>COP ≥ 3,4 (air/eau) ou ≥ 3,9 (eau/eau)</li>
                          <li>Dimensionnement adapté aux besoins</li>
                          <li>Installation par professionnel qualifié</li>
                          <li>Remplacement chaudière fossile recommandé</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Wind className="h-8 w-8 text-primary" />
                        <CardTitle>Ventilation & CVC</CardTitle>
                      </div>
                      <CardDescription>BAT-TH-125, BAT-TH-155</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Équipement</TableHead>
                            <TableHead className="text-right">Prime CEE</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Brasseur d'air grand volume</TableCell>
                            <TableCell className="text-right font-semibold text-primary">800-1 500€/unité</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>CTA double flux haute efficacité</TableCell>
                            <TableCell className="text-right font-semibold text-primary">5 000-12 000€</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Variateur vitesse ventilation</TableCell>
                            <TableCell className="text-right font-semibold text-primary">2 000-5 000€</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                        <p><strong>Conditions techniques :</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Efficacité énergétique minimale selon fiche CEE</li>
                          <li>Diamètre ≥ 4m pour brasseurs d'air HVLS</li>
                          <li>Rendement ≥ 75% pour CTA double flux</li>
                          <li>Surface couverte minimum selon équipement</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Exemple projet pro */}
              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle className="text-2xl">Exemple concret : Rénovation bureau 500m²</CardTitle>
                  <CardDescription>PME secteur tertiaire - Bureaux 500m²</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Travaux prévus</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex justify-between">
                            <span>150 luminaires LED (80€/u)</span>
                            <span className="font-semibold">12 000€</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Isolation toiture 300m²</span>
                            <span className="font-semibold">15 000€</span>
                          </li>
                          <li className="flex justify-between">
                            <span>PAC air/eau 50kW</span>
                            <span className="font-semibold">25 000€</span>
                          </li>
                          <li className="flex justify-between pt-2 border-t border-border">
                            <span className="font-semibold text-foreground">Coût total HT</span>
                            <span className="font-semibold text-foreground">52 000€</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Aides CEE</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex justify-between">
                            <span>Prime LED (150 × 100€)</span>
                            <span className="font-semibold text-primary">15 000€</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Prime isolation (300m² × 40€)</span>
                            <span className="font-semibold text-primary">12 000€</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Prime PAC</span>
                            <span className="font-semibold text-primary">6 000€</span>
                          </li>
                          <li className="flex justify-between pt-2 border-t border-border">
                            <span className="font-semibold text-foreground">Total primes CEE</span>
                            <span className="font-semibold text-primary">33 000€</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-foreground">Reste à charge</span>
                        <span className="text-2xl font-bold text-primary">19 000€</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Soit 36,5% du coût total - ROI estimé en 3-4 ans grâce aux économies d'énergie (40-50%)
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 pt-4">
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Économie annuelle estimée</p>
                        <p className="text-lg font-bold text-foreground">7 500€/an</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Réduction consommation</p>
                        <p className="text-lg font-bold text-foreground">-45%</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Retour sur investissement</p>
                        <p className="text-lg font-bold text-foreground">2,5 ans</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informations supplémentaires */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Conditions générales CEE Pro</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p><strong>Tous types d'entreprises :</strong> TPE, PME, ETI, Grandes entreprises, collectivités</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p><strong>Bâtiments existants :</strong> Construction achevée depuis plus de 2 ans</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p><strong>Performance minimale :</strong> Équipements conformes aux fiches CEE en vigueur</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p><strong>Installation :</strong> Par professionnel qualifié, certificat de réalisation obligatoire</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p><strong>Cumul :</strong> CEE cumulables avec aides régionales, fonds chaleur, etc.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Autres aides professionnelles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-semibold mb-1 text-foreground">Fonds Chaleur (ADEME)</h4>
                      <p className="text-muted-foreground">Pour les installations de chaleur renouvelable &gt; 100 kW</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-foreground">Aides régionales</h4>
                      <p className="text-muted-foreground">Variables selon région, secteur d'activité et type de travaux</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-foreground">Crédit d'impôt</h4>
                      <p className="text-muted-foreground">Pour certains équipements et secteurs spécifiques</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-foreground">Prêts bonifiés</h4>
                      <p className="text-muted-foreground">BPI France, banques régionales pour financement travaux</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-primary-foreground">Calculez vos aides personnalisées</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Testez votre éligibilité en 2 minutes et découvrez le montant exact des aides dont vous pouvez bénéficier pour vos travaux.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg">
                <Link to="/simulation/particuliers">
                  <Home className="mr-2 h-5 w-5" />
                  Simulation Particuliers
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="shadow-lg">
                <Link to="/simulation/professionnels">
                  <Building2 className="mr-2 h-5 w-5" />
                  Simulation Professionnels
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aides;
