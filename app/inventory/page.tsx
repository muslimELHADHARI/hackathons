"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Filter, Search, SlidersHorizontal } from "lucide-react"
import { FluidButton } from "@/components/fluid-button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Données simulées pour l'inventaire
const categories = [
  { id: "all", name: "Tous", count: 24 },
  { id: "fruits", name: "Fruits", count: 6, image: "/images/categories/fruits.png" },
  { id: "vegetables", name: "Légumes", count: 8, image: "/images/categories/vegetables.png" },
  { id: "dairy", name: "Produits laitiers", count: 4, image: "/images/categories/dairy.png" },
  { id: "bread", name: "Pain & Céréales", count: 3, image: "/images/categories/bread.png" },
  { id: "meat", name: "Viandes", count: 2, image: "/images/categories/meat.png" },
  { id: "fish", name: "Poissons", count: 1, image: "/images/categories/fish.png" },
]

const foodItems = [
  {
    id: 1,
    name: "Tomates",
    category: "vegetables",
    quantity: "500g",
    expiry: "2023-12-10",
    image: "/images/foods/tomatoes.png",
    daysLeft: 3,
    status: "warning",
  },
  {
    id: 2,
    name: "Pain",
    category: "bread",
    quantity: "1",
    expiry: "2023-12-08",
    image: "/images/foods/bread.png",
    daysLeft: 1,
    status: "danger",
  },
  {
    id: 3,
    name: "Œufs",
    category: "dairy",
    quantity: "6",
    expiry: "2023-12-20",
    image: "/images/foods/eggs.png",
    daysLeft: 13,
    status: "good",
  },
  {
    id: 4,
    name: "Fromage",
    category: "dairy",
    quantity: "200g",
    expiry: "2023-12-15",
    image: "/images/foods/cheese.png",
    daysLeft: 8,
    status: "good",
  },
  {
    id: 5,
    name: "Poulet",
    category: "meat",
    quantity: "400g",
    expiry: "2023-12-09",
    image: "/images/foods/chicken.png",
    daysLeft: 2,
    status: "warning",
  },
  {
    id: 6,
    name: "Oignons",
    category: "vegetables",
    quantity: "3",
    expiry: "2023-12-25",
    image: "/images/foods/onions.png",
    daysLeft: 18,
    status: "good",
  },
]

// Composant pour un élément alimentaire
function FoodItemCard({ item }: { item: any }) {
  const statusColors = {
    danger: "bg-red-500",
    warning: "bg-amber-500",
    good: "bg-emerald-500",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden fluid-card h-full">
        <CardContent className="p-0">
          <div className="relative">
            <div className="h-36 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
              <motion.img
                src={item.image}
                alt={item.name}
                className="h-28 w-auto object-contain"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
            <div
              className={`absolute top-3 right-3 w-3 h-3 rounded-full ${statusColors[item.status as keyof typeof statusColors]}`}
            ></div>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-lg">{item.name}</h3>
              <Badge
                variant={item.status === "danger" ? "destructive" : item.status === "warning" ? "warning" : "outline"}
              >
                {item.daysLeft} jour{item.daysLeft > 1 ? "s" : ""}
              </Badge>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
              <p>Quantité: {item.quantity}</p>
              <p>Expire le: {new Date(item.expiry).toLocaleDateString()}</p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Ajouté le {new Date().toLocaleDateString()}
              </span>
              <button className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 text-sm font-medium">
                Détails
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Composant pour ajouter un nouvel aliment
function AddFoodDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FluidButton variant="primary" icon={<Plus className="h-4 w-4" />}>
          Ajouter un aliment
        </FluidButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] fluid-card">
        <DialogHeader>
          <DialogTitle>Ajouter un nouvel aliment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input id="name" className="col-span-3 fluid-input" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Catégorie
            </Label>
            <Select>
              <SelectTrigger className="col-span-3 fluid-input">
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantité
            </Label>
            <Input id="quantity" className="col-span-3 fluid-input" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expiry" className="text-right">
              Date d'expiration
            </Label>
            <Input id="expiry" type="date" className="col-span-3 fluid-input" />
          </div>
        </div>
        <div className="flex justify-end">
          <FluidButton variant="primary">Ajouter</FluidButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Composant principal de la page d'inventaire
export default function InventoryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredItems, setFilteredItems] = useState(foodItems)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    let items = [...foodItems]

    // Filtrer par catégorie
    if (activeCategory !== "all") {
      items = items.filter((item) => item.category === activeCategory)
    }

    // Filtrer par recherche
    if (searchQuery) {
      items = items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    setFilteredItems(items)
  }, [activeCategory, searchQuery])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="container mx-auto py-8 px-4 md:px-6"
      variants={containerVariants}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">
            Mon Inventaire
          </h1>
          <p className="text-muted-foreground">Gérez vos aliments et réduisez votre gaspillage alimentaire</p>
        </div>
        <AddFoodDialog />
      </motion.div>

      <motion.div className="mb-6 flex flex-col md:flex-row gap-4" variants={itemVariants}>
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Rechercher un aliment..."
            className="pl-9 fluid-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <FluidButton variant="outline" icon={<Filter className="h-4 w-4" />}>
            Filtrer
          </FluidButton>
          <FluidButton variant="outline" icon={<SlidersHorizontal className="h-4 w-4" />}>
            Trier
          </FluidButton>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveCategory}>
          <TabsList className="fluid-tabs flex flex-nowrap overflow-x-auto pb-1 mb-2 w-full">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="fluid-tab whitespace-nowrap">
                {category.name} ({category.count})
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => <FoodItemCard key={item.id} item={item} />)
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      Aucun aliment trouvé. Ajoutez des aliments à votre inventaire.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
