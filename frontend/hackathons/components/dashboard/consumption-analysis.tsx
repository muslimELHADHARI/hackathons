"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Filter, CalendarIcon, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"
import FluidButton from "@/components/fluid-button"

// Données simulées pour la consommation par catégorie
const consumptionByCategory = [
  { category: "Fruits", thisMonth: 4.2, lastMonth: 3.8 },
  { category: "Légumes", thisMonth: 5.1, lastMonth: 4.9 },
  { category: "Produits laitiers", thisMonth: 3.5, lastMonth: 3.7 },
  { category: "Pain", thisMonth: 2.8, lastMonth: 3.2 },
  { category: "Viande", thisMonth: 2.1, lastMonth: 2.3 },
  { category: "Poisson", thisMonth: 1.2, lastMonth: 0.9 },
  { category: "Épicerie", thisMonth: 3.7, lastMonth: 3.5 },
]

// Données simulées pour la consommation par jour
const consumptionByDay = [
  { day: "Lun", amount: 1.2 },
  { day: "Mar", amount: 0.9 },
  { day: "Mer", amount: 1.5 },
  { day: "Jeu", amount: 1.3 },
  { day: "Ven", amount: 1.8 },
  { day: "Sam", amount: 2.2 },
  { day: "Dim", amount: 1.7 },
]

// Données simulées pour la consommation par mois
const consumptionByMonth = [
  { month: "Jan", amount: 32 },
  { month: "Fév", amount: 28 },
  { month: "Mar", amount: 31 },
  { month: "Avr", amount: 35 },
  { month: "Mai", amount: 33 },
  { month: "Juin", amount: 30 },
  { month: "Juil", amount: 29 },
  { month: "Août", amount: 31 },
  { month: "Sep", amount: 32 },
  { month: "Oct", amount: 34 },
  { month: "Nov", amount: 33 },
  { month: "Déc", amount: 36 },
]

// Données simulées pour le radar nutritionnel
const nutritionalData = [
  { subject: "Protéines", A: 120, fullMark: 150 },
  { subject: "Glucides", A: 98, fullMark: 150 },
  { subject: "Lipides", A: 86, fullMark: 150 },
  { subject: "Fibres", A: 99, fullMark: 150 },
  { subject: "Vitamines", A: 85, fullMark: 150 },
  { subject: "Minéraux", A: 65, fullMark: 150 },
]

// Données simulées pour les habitudes alimentaires
const eatingHabits = [
  { id: 1, habit: "Petit-déjeuner régulier", status: "bon", icon: <TrendingUp className="h-4 w-4 text-emerald-500" /> },
  { id: 2, habit: "Consommation de fruits", status: "bon", icon: <TrendingUp className="h-4 w-4 text-emerald-500" /> },
  {
    id: 3,
    habit: "Consommation de légumes",
    status: "moyen",
    icon: <TrendingDown className="h-4 w-4 text-amber-500" />,
  },
  { id: 4, habit: "Hydratation", status: "attention", icon: <AlertTriangle className="h-4 w-4 text-red-500" /> },
  { id: 5, habit: "Protéines", status: "bon", icon: <TrendingUp className="h-4 w-4 text-emerald-500" /> },
]

export default function ConsumptionAnalysis() {
  const [activeTab, setActiveTab] = useState("overview")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [period, setPeriod] = useState("month")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="fluid-tabs mb-4">
          <TabsTrigger value="overview" className="fluid-tab">
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="fluid-tab">
            Nutrition
          </TabsTrigger>
          <TabsTrigger value="habits" className="fluid-tab">
            Habitudes
          </TabsTrigger>
          <TabsTrigger value="reports" className="fluid-tab">
            Rapports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <motion.div variants={itemVariants} className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sélectionner une période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="quarter">Ce trimestre</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2">
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Consommation par catégorie</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={consumptionByCategory}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="category" type="category" width={100} />
                    <Tooltip formatter={(value) => `${value} kg`} />
                    <Legend />
                    <Bar dataKey="thisMonth" name="Ce mois" fill="#10b981" />
                    <Bar dataKey="lastMonth" name="Mois dernier" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Consommation quotidienne</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={consumptionByDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value} kg`} />
                    <Bar dataKey="amount" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Tendance annuelle</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={consumptionByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value} kg`} />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#10b981" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="nutrition">
          <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2">
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Profil nutritionnel</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={nutritionalData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar name="Vous" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Répartition calorique</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Calories totales</span>
                    <span className="font-bold">2,150 kcal</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Protéines (25%)</span>
                        <span>538 kcal</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Glucides (50%)</span>
                        <span>1,075 kcal</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "50%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Lipides (25%)</span>
                        <span>538 kcal</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Recommandations</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-emerald-500 mr-2" />
                        <span>Bon équilibre protéines/lipides</span>
                      </li>
                      <li className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                        <span>Augmenter les fibres alimentaires</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-4">
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Apports nutritionnels détaillés</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Protéines</p>
                    <p className="text-2xl font-bold">134g</p>
                    <p className="text-xs text-emerald-500">↑ 5% vs recommandé</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Glucides</p>
                    <p className="text-2xl font-bold">269g</p>
                    <p className="text-xs text-emerald-500">✓ Conforme</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Lipides</p>
                    <p className="text-2xl font-bold">60g</p>
                    <p className="text-xs text-emerald-500">✓ Conforme</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Fibres</p>
                    <p className="text-2xl font-bold">22g</p>
                    <p className="text-xs text-red-500">↓ 15% vs recommandé</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="habits">
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Habitudes alimentaires</h3>
                <div className="space-y-4">
                  {eatingHabits.map((habit) => (
                    <div
                      key={habit.id}
                      className="p-4 border rounded-lg bg-gradient-to-r from-background to-muted/30 flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <div className="mr-3">{habit.icon}</div>
                        <div>
                          <p className="font-medium">{habit.habit}</p>
                          <p className="text-sm text-muted-foreground">
                            {habit.status === "bon" && "Continuez ainsi !"}
                            {habit.status === "moyen" && "Peut être amélioré"}
                            {habit.status === "attention" && "Nécessite votre attention"}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={
                          habit.status === "bon"
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200"
                            : habit.status === "moyen"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-200"
                              : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200"
                        }
                      >
                        {habit.status === "bon" && "Bon"}
                        {habit.status === "moyen" && "Moyen"}
                        {habit.status === "attention" && "Attention"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-4">
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Recommandations personnalisées</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-gradient-to-br from-emerald-500/5 to-blue-500/5">
                    <h4 className="font-medium mb-2">Augmenter votre consommation d'eau</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Nous avons remarqué que votre consommation d'eau est inférieure aux recommandations. Essayez de
                      boire au moins 2L d'eau par jour.
                    </p>
                    <div className="flex items-center">
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full dark:bg-emerald-900 dark:text-emerald-200">
                        Priorité haute
                      </span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg bg-gradient-to-br from-emerald-500/5 to-blue-500/5">
                    <h4 className="font-medium mb-2">Augmenter les légumes verts</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Essayez d'inclure plus de légumes verts dans votre alimentation pour augmenter votre apport en
                      fibres et en vitamines.
                    </p>
                    <div className="flex items-center">
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full dark:bg-amber-900 dark:text-amber-200">
                        Priorité moyenne
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="reports">
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Rapports de consommation</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Sélectionner une période
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-gradient-to-r from-background to-muted/30 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Rapport mensuel</p>
                      <p className="text-sm text-muted-foreground">Novembre 2023</p>
                    </div>
                    <FluidButton variant="outline" icon={<Download className="h-4 w-4" />}>
                      Télécharger
                    </FluidButton>
                  </div>
                  <div className="p-4 border rounded-lg bg-gradient-to-r from-background to-muted/30 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Rapport trimestriel</p>
                      <p className="text-sm text-muted-foreground">Q3 2023</p>
                    </div>
                    <FluidButton variant="outline" icon={<Download className="h-4 w-4" />}>
                      Télécharger
                    </FluidButton>
                  </div>
                  <div className="p-4 border rounded-lg bg-gradient-to-r from-background to-muted/30 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Rapport annuel</p>
                      <p className="text-sm text-muted-foreground">2023</p>
                    </div>
                    <FluidButton variant="outline" icon={<Download className="h-4 w-4" />}>
                      Télécharger
                    </FluidButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
