"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle, CalendarIcon, Clock, ChevronRight, Trash2, Edit, Check, ShoppingBag } from "lucide-react"
import FluidButton from "@/components/fluid-button"

// Données simulées pour les repas planifiés
const plannedMeals = [
  {
    id: 1,
    day: "Lundi",
    date: "2023-11-20",
    meals: [
      {
        id: 101,
        type: "Petit-déjeuner",
        name: "Yaourt aux fruits et granola",
        time: "07:30",
        ingredients: ["Yaourt", "Fruits rouges", "Granola"],
      },
      {
        id: 102,
        type: "Déjeuner",
        name: "Salade de quinoa aux légumes",
        time: "12:30",
        ingredients: ["Quinoa", "Tomates", "Concombre", "Feta"],
      },
      {
        id: 103,
        type: "Dîner",
        name: "Poulet rôti et légumes",
        time: "19:30",
        ingredients: ["Poulet", "Carottes", "Pommes de terre"],
      },
    ],
  },
  {
    id: 2,
    day: "Mardi",
    date: "2023-11-21",
    meals: [
      {
        id: 201,
        type: "Petit-déjeuner",
        name: "Tartines à l'avocat",
        time: "07:30",
        ingredients: ["Pain complet", "Avocat", "Œuf"],
      },
      {
        id: 202,
        type: "Déjeuner",
        name: "Wrap au poulet",
        time: "12:30",
        ingredients: ["Tortilla", "Poulet", "Salade", "Sauce"],
      },
      {
        id: 203,
        type: "Dîner",
        name: "Pâtes aux légumes",
        time: "19:30",
        ingredients: ["Pâtes", "Courgettes", "Aubergines", "Tomates"],
      },
    ],
  },
  {
    id: 3,
    day: "Mercredi",
    date: "2023-11-22",
    meals: [
      {
        id: 301,
        type: "Petit-déjeuner",
        name: "Smoothie bowl",
        time: "07:30",
        ingredients: ["Banane", "Lait d'amande", "Fruits rouges", "Graines de chia"],
      },
      {
        id: 302,
        type: "Déjeuner",
        name: "Buddha bowl",
        time: "12:30",
        ingredients: ["Riz", "Pois chiches", "Avocat", "Légumes rôtis"],
      },
      {
        id: 303,
        type: "Dîner",
        name: "Soupe de légumes",
        time: "19:30",
        ingredients: ["Carottes", "Poireaux", "Pommes de terre", "Bouillon"],
      },
    ],
  },
]

// Données simulées pour les recettes suggérées
const suggestedRecipes = [
  {
    id: 1,
    name: "Quiche aux légumes",
    ingredients: ["Pâte brisée", "Œufs", "Crème", "Légumes de saison"],
    image: "/images/recipes/quiche-legumes.png",
    time: "45 min",
  },
  {
    id: 2,
    name: "Salade de pâtes",
    ingredients: ["Pâtes", "Tomates", "Mozzarella", "Basilic"],
    image: "/images/recipes/salade-pates.png",
    time: "20 min",
  },
  {
    id: 3,
    name: "Smoothie aux fruits",
    ingredients: ["Banane", "Fraises", "Yaourt", "Miel"],
    image: "/images/recipes/smoothie-fruits.png",
    time: "5 min",
  },
]

// Données simulées pour la liste de courses
const shoppingList = [
  { id: 1, name: "Yaourt nature", quantity: "500g", category: "Produits laitiers", checked: false },
  { id: 2, name: "Fruits rouges", quantity: "250g", category: "Fruits", checked: true },
  { id: 3, name: "Quinoa", quantity: "200g", category: "Céréales", checked: false },
  { id: 4, name: "Poulet", quantity: "600g", category: "Viande", checked: false },
  { id: 5, name: "Carottes", quantity: "500g", category: "Légumes", checked: true },
  { id: 6, name: "Pain complet", quantity: "1", category: "Boulangerie", checked: false },
]

export default function MealPlanning() {
  const [activeTab, setActiveTab] = useState("calendar")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [isAddMealOpen, setIsAddMealOpen] = useState(false)
  const [newMeal, setNewMeal] = useState({
    type: "Déjeuner",
    name: "",
    time: "",
    ingredients: "",
  })

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, vous ajouteriez le repas à votre base de données ou état global
    console.log("Nouveau repas ajouté:", newMeal)
    // Fermer le dialogue
    setIsAddMealOpen(false)
    // Réinitialiser le formulaire
    setNewMeal({
      type: "Déjeuner",
      name: "",
      time: "",
      ingredients: "",
    })
  }

  const handleDaySelect = (day: string) => {
    setSelectedDay(day === selectedDay ? null : day)
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
      <Tabs defaultValue="calendar" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="fluid-tabs mb-4">
          <TabsTrigger value="calendar" className="fluid-tab">
            Calendrier
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="fluid-tab">
            Suggestions
          </TabsTrigger>
          <TabsTrigger value="shopping" className="fluid-tab">
            Liste de courses
          </TabsTrigger>
          <TabsTrigger value="preferences" className="fluid-tab">
            Préférences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2">
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Calendrier des repas</h3>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </CardContent>
            </Card>

            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Repas du jour</h3>
                  <Dialog open={isAddMealOpen} onOpenChange={setIsAddMealOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Ajouter un repas
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ajouter un repas</DialogTitle>
                        <DialogDescription>Ajoutez un nouveau repas à votre planning.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddMeal}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="meal-type" className="text-right">
                              Type
                            </Label>
                            <Select
                              value={newMeal.type}
                              onValueChange={(value) => setNewMeal({ ...newMeal, type: value })}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Sélectionner un type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Petit-déjeuner">Petit-déjeuner</SelectItem>
                                <SelectItem value="Déjeuner">Déjeuner</SelectItem>
                                <SelectItem value="Goûter">Goûter</SelectItem>
                                <SelectItem value="Dîner">Dîner</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="meal-name" className="text-right">
                              Nom
                            </Label>
                            <Input
                              id="meal-name"
                              value={newMeal.name}
                              onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="meal-time" className="text-right">
                              Heure
                            </Label>
                            <Input
                              id="meal-time"
                              type="time"
                              value={newMeal.time}
                              onChange={(e) => setNewMeal({ ...newMeal, time: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="meal-ingredients" className="text-right">
                              Ingrédients
                            </Label>
                            <Input
                              id="meal-ingredients"
                              placeholder="Séparés par des virgules"
                              value={newMeal.ingredients}
                              onChange={(e) => setNewMeal({ ...newMeal, ingredients: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Ajouter</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-3">
                  {date && (
                    <div className="text-sm text-muted-foreground mb-2">
                      {date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                    </div>
                  )}
                  {plannedMeals[0]?.meals.map((meal) => (
                    <div
                      key={meal.id}
                      className="p-3 border rounded-lg bg-gradient-to-r from-background to-muted/30 flex justify-between items-center"
                    >
                      <div>
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            {meal.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {meal.time}
                          </span>
                        </div>
                        <p className="font-medium mt-1">{meal.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{meal.ingredients.join(", ")}</p>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Planning hebdomadaire</h3>
                <div className="space-y-4">
                  {plannedMeals.map((day) => (
                    <div key={day.id} className="border rounded-lg overflow-hidden">
                      <div
                        className="p-3 bg-muted/50 flex justify-between items-center cursor-pointer"
                        onClick={() => handleDaySelect(day.day)}
                      >
                        <div className="font-medium">{day.day}</div>
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${selectedDay === day.day ? "rotate-90" : ""}`}
                        />
                      </div>
                      {selectedDay === day.day && (
                        <div className="p-3 space-y-2">
                          {day.meals.map((meal) => (
                            <div
                              key={meal.id}
                              className="p-2 border rounded-lg bg-gradient-to-r from-background to-muted/30 flex justify-between items-center"
                            >
                              <div>
                                <div className="flex items-center">
                                  <Badge variant="outline" className="mr-2">
                                    {meal.type}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {meal.time}
                                  </span>
                                </div>
                                <p className="font-medium mt-1">{meal.name}</p>
                              </div>
                              <Button variant="ghost" size="icon">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="suggestions">
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Recettes suggérées</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Basées sur les aliments disponibles dans votre inventaire et vos préférences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {suggestedRecipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="border rounded-lg overflow-hidden bg-gradient-to-br from-background to-muted/30"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={recipe.image || "/placeholder.svg"}
                          alt={recipe.name}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute bottom-0 right-0 bg-background/80 px-2 py-1 m-2 rounded text-xs font-medium flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {recipe.time}
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium">{recipe.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{recipe.ingredients.join(", ")}</p>
                        <div className="flex justify-between items-center mt-3">
                          <Button variant="outline" size="sm">
                            Voir la recette
                          </Button>
                          <Button variant="ghost" size="icon">
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-4">
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Planification intelligente</h3>
                <div className="p-4 border rounded-lg bg-gradient-to-br from-emerald-500/5 to-blue-500/5">
                  <h4 className="font-medium mb-2">Générer un planning de repas</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Notre système peut générer un planning de repas complet basé sur vos préférences, votre inventaire
                    actuel et vos objectifs nutritionnels.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label htmlFor="days" className="text-sm">
                        Nombre de jours
                      </Label>
                      <Select defaultValue="7">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 jours</SelectItem>
                          <SelectItem value="5">5 jours</SelectItem>
                          <SelectItem value="7">7 jours</SelectItem>
                          <SelectItem value="14">14 jours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="meals" className="text-sm">
                        Repas par jour
                      </Label>
                      <Select defaultValue="3">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 repas</SelectItem>
                          <SelectItem value="3">3 repas</SelectItem>
                          <SelectItem value="4">4 repas</SelectItem>
                          <SelectItem value="5">5 repas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="diet" className="text-sm">
                        Régime alimentaire
                      </Label>
                      <Select defaultValue="standard">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="vegetarian">Végétarien</SelectItem>
                          <SelectItem value="vegan">Végétalien</SelectItem>
                          <SelectItem value="lowcarb">Faible en glucides</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <FluidButton variant="primary" icon={<CalendarIcon className="h-4 w-4" />}>
                    Générer un planning
                  </FluidButton>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="shopping">
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Liste de courses</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Ajouter
                    </Button>
                    <Button variant="outline" size="sm">
                      Générer
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">6 articles</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Tout effacer
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                    {shoppingList.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 border rounded-lg bg-gradient-to-r from-background to-muted/30 flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          <Checkbox id={`item-${item.id}`} checked={item.checked} className="mr-3" />
                          <div>
                            <p className={`font-medium ${item.checked ? "line-through text-muted-foreground" : ""}`}>
                              {item.name} ({item.quantity})
                            </p>
                            <p className="text-xs text-muted-foreground">{item.category}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-4">
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Optimisation des courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg bg-gradient-to-br from-emerald-500/5 to-blue-500/5">
                    <h4 className="font-medium mb-2">Économies estimées</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="text-2xl font-bold">15.30 DT</div>
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200">
                        -12%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Par rapport à vos achats habituels</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-gradient-to-br from-emerald-500/5 to-blue-500/5">
                    <h4 className="font-medium mb-2">Réduction du gaspillage</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="text-2xl font-bold">68%</div>
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200">
                        +5%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Grâce à la planification des repas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="preferences">
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden fluid-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Préférences alimentaires</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="diet-type" className="text-sm">
                      Régime alimentaire
                    </Label>
                    <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="vegetarian">Végétarien</SelectItem>
                        <SelectItem value="vegan">Végétalien</SelectItem>
                        <SelectItem value="pescatarian">Pescétarien</SelectItem>
                        <SelectItem value="lowcarb">Faible en glucides</SelectItem>
                        <SelectItem value="keto">Cétogène</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm mb-2 block">Allergies et intolérances</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="cursor-pointer flex items-center gap-1">
                        Gluten <Check className="h-3 w-3" />
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer">
                        Lactose
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer">
                        Fruits à coque
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer">
                        Œufs
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer">
                        Soja
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer flex items-center gap-1">
                        Fruits de mer <Check className="h-3 w-3" />
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer">
                        + Ajouter
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm mb-2 block">Préférences de goût</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="pref-spicy" />
                        <Label htmlFor="pref-spicy" className="text-sm">
                          Épicé
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="pref-sweet" defaultChecked />
                        <Label htmlFor="pref-sweet" className="text-sm">
                          Sucré
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="pref-sour" />
                        <Label htmlFor="pref-sour" className="text-sm">
                          Acide
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="pref-bitter" />
                        <Label htmlFor="pref-bitter" className="text-sm">
                          Amer
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm mb-2 block">Objectifs nutritionnels</Label>
                    <Select defaultValue="balanced">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="balanced">Équilibré</SelectItem>
                        <SelectItem value="weight-loss">Perte de poids</SelectItem>
                        <SelectItem value="muscle-gain">Prise de muscle</SelectItem>
                        <SelectItem value="energy">Énergie</SelectItem>
                        <SelectItem value="heart-health">Santé cardiaque</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="pt-4">
                    <FluidButton variant="primary" icon={<Check className="h-4 w-4" />}>
                      Enregistrer les préférences
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
