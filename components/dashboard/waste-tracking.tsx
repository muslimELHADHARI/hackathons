"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, PlusCircle, TrendingDown, TrendingUp, CalendarIcon } from "lucide-react"
import FluidButton from "@/components/fluid-button"

// Données simulées pour le graphique de gaspillage par catégorie
const wasteByCategory = [
  { name: "Fruits", value: 30, color: "#10b981" },
  { name: "Légumes", value: 25, color: "#6366f1" },
  { name: "Produits laitiers", value: 20, color: "#f59e0b" },
  { name: "Pain", value: 15, color: "#ef4444" },
  { name: "Viande", value: 10, color: "#8b5cf6" },
]

// Données simulées pour le graphique de gaspillage par mois
const wasteByMonth = [
  { name: "Jan", waste: 65 },
  { name: "Fév", waste: 59 },
  { name: "Mar", waste: 80 },
  { name: "Avr", waste: 55 },
  { name: "Mai", waste: 40 },
  { name: "Juin", waste: 35 },
  { name: "Juil", waste: 30 },
  { name: "Août", waste: 45 },
  { name: "Sep", waste: 50 },
  { name: "Oct", waste: 42 },
  { name: "Nov", waste: 37 },
  { name: "Déc", waste: 78 },
]

// Données simulées pour le journal de gaspillage
const wasteLog = [
  {
    id: 1,
    date: "2023-11-15",
    item: "Tomates",
    quantity: "500g",
    reason: "Oublié au réfrigérateur",
    category: "Légumes",
  },
  { id: 2, date: "2023-11-14", item: "Pain", quantity: "1/2 baguette", reason: "Trop dur", category: "Pain" },
  {
    id: 3,
    date: "2023-11-12",
    item: "Yaourt",
    quantity: "2 pots",
    reason: "Date dépassée",
    category: "Produits laitiers",
  },
  { id: 4, date: "2023-11-10", item: "Pommes", quantity: "3 unités", reason: "Moisissure", category: "Fruits" },
  { id: 5, date: "2023-11-08", item: "Poulet", quantity: "200g", reason: "Oublié de cuisiner", category: "Viande" },
]

// Données simulées pour les conseils de réduction
const wasteTips = [
  {
    id: 1,
    title: "Planifiez vos repas",
    description: "Établissez un menu hebdomadaire pour n'acheter que ce dont vous avez besoin.",
    impact: "élevé",
    icon: <CalendarIcon className="h-8 w-8 text-emerald-500" />,
  },
  {
    id: 2,
    title: "Vérifiez votre réfrigérateur",
    description: "Avant de faire vos courses, vérifiez ce qu'il vous reste.",
    impact: "moyen",
    icon: <TrendingDown className="h-8 w-8 text-blue-500" />,
  },
  {
    id: 3,
    title: "Utilisez les restes",
    description: "Transformez vos restes en nouveaux plats créatifs.",
    impact: "élevé",
    icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
  },
]

export default function WasteTracking() {
  const [activeTab, setActiveTab] = useState("overview")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [newWasteItem, setNewWasteItem] = useState({
    item: "",
    quantity: "",
    reason: "",
    category: "Fruits",
  })

  const handleAddWasteItem = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, vous ajouteriez l'élément à votre base de données ou état global
    console.log("Nouvel élément de gaspillage ajouté:", newWasteItem)
    // Réinitialiser le formulaire
    setNewWasteItem({
      item: "",
      quantity: "",
      reason: "",
      category: "Fruits",
    })
  }

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
          <TabsTrigger value="log" className="fluid-tab">
            Journal
          </TabsTrigger>
          <TabsTrigger value="add" className="fluid-tab">
            Ajouter
          </TabsTrigger>
          <TabsTrigger value="tips" className="fluid-tab">
            Conseils
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2">
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Gaspillage par catégorie</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={wasteByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {wasteByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Évolution du gaspillage</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={wasteByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}g`} />
                    <Bar dataKey="waste" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Statistiques de gaspillage</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total ce mois</p>
                    <p className="text-2xl font-bold">2.5 kg</p>
                    <p className="text-xs text-emerald-500">↓ 15% vs mois dernier</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Coût estimé</p>
                    <p className="text-2xl font-bold">45 DT</p>
                    <p className="text-xs text-emerald-500">↓ 12% vs mois dernier</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Catégorie principale</p>
                    <p className="text-2xl font-bold">Fruits</p>
                    <p className="text-xs text-red-500">↑ 5% vs mois dernier</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Impact CO2</p>
                    <p className="text-2xl font-bold">3.8 kg</p>
                    <p className="text-xs text-emerald-500">↓ 10% vs mois dernier</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="log">
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Journal de gaspillage</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Éléments jetés</h4>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                      {wasteLog.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 border rounded-lg bg-gradient-to-r from-background to-muted/30 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium">
                              {item.item} ({item.quantity})
                            </p>
                            <p className="text-sm text-muted-foreground">{item.reason}</p>
                            <p className="text-xs">
                              {item.date} • {item.category}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="add">
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Ajouter un élément gaspillé</h3>
                <form onSubmit={handleAddWasteItem} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="item">Aliment</Label>
                      <Input
                        id="item"
                        placeholder="Ex: Tomates"
                        value={newWasteItem.item}
                        onChange={(e) => setNewWasteItem({ ...newWasteItem, item: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantité</Label>
                      <Input
                        id="quantity"
                        placeholder="Ex: 500g"
                        value={newWasteItem.quantity}
                        onChange={(e) => setNewWasteItem({ ...newWasteItem, quantity: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie</Label>
                      <Select
                        value={newWasteItem.category}
                        onValueChange={(value) => setNewWasteItem({ ...newWasteItem, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fruits">Fruits</SelectItem>
                          <SelectItem value="Légumes">Légumes</SelectItem>
                          <SelectItem value="Produits laitiers">Produits laitiers</SelectItem>
                          <SelectItem value="Pain">Pain</SelectItem>
                          <SelectItem value="Viande">Viande</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reason">Raison</Label>
                      <Input
                        id="reason"
                        placeholder="Ex: Oublié au réfrigérateur"
                        value={newWasteItem.reason}
                        onChange={(e) => setNewWasteItem({ ...newWasteItem, reason: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <FluidButton type="submit" variant="primary" icon={<PlusCircle className="h-4 w-4" />}>
                      Ajouter
                    </FluidButton>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="tips">
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Conseils pour réduire le gaspillage</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {wasteTips.map((tip) => (
                    <div key={tip.id} className="p-4 border rounded-lg bg-gradient-to-br from-background to-muted/30">
                      <div className="mb-3">{tip.icon}</div>
                      <h4 className="font-semibold mb-2">{tip.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{tip.description}</p>
                      <div className="flex items-center">
                        <span className="text-xs">Impact:</span>
                        <span
                          className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                            tip.impact === "élevé"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          }`}
                        >
                          {tip.impact}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
