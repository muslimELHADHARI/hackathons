"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, ChefHat, Clock, Users, Star, Bookmark, BookmarkCheck } from "lucide-react"
import { FluidButton } from "@/components/fluid-button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Données simulées pour les recettes
const recipeCategories = [
  { id: "all", name: "Toutes" },
  { id: "anti-gaspi", name: "Anti-Gaspi" },
  { id: "rapide", name: "Rapides" },
  { id: "vegetarien", name: "Végétariennes" },
  { id: "dessert", name: "Desserts" },
  { id: "populaire", name: "Populaires" },
]

const recipes = [
  {
    id: 1,
    name: "Pain perdu aux fruits",
    category: ["anti-gaspi", "dessert"],
    time: 15,
    difficulty: "Facile",
    servings: 2,
    rating: 4.8,
    image: "/images/recipes/pain-perdu.png",
    ingredients: ["Pain rassis", "Œufs", "Lait", "Sucre", "Fruits de saison"],
    saved: true,
  },
  {
    id: 2,
    name: "Soupe de légumes",
    category: ["anti-gaspi", "vegetarien"],
    time: 30,
    difficulty: "Facile",
    servings: 4,
    rating: 4.5,
    image: "/images/recipes/soupe-legumes.png",
    ingredients: ["Carottes", "Pommes de terre", "Oignons", "Céleri", "Bouillon"],
    saved: false,
  },
  {
    id: 3,
    name: "Salade de pâtes",
    category: ["rapide", "vegetarien"],
    time: 20,
    difficulty: "Facile",
    servings: 3,
    rating: 4.2,
    image: "/images/recipes/salade-pates.png",
    ingredients: ["Pâtes", "Tomates", "Concombre", "Feta", "Olives"],
    saved: true,
  },
  {
    id: 4,
    name: "Quiche aux légumes",
    category: ["anti-gaspi", "populaire"],
    time: 45,
    difficulty: "Moyen",
    servings: 6,
    rating: 4.7,
    image: "/images/recipes/quiche-legumes.png",
    ingredients: ["Pâte brisée", "Œufs", "Crème", "Légumes variés", "Fromage râpé"],
    saved: false,
  },
  {
    id: 5,
    name: "Smoothie aux fruits",
    category: ["rapide", "dessert"],
    time: 5,
    difficulty: "Facile",
    servings: 2,
    rating: 4.4,
    image: "/images/recipes/smoothie-fruits.png",
    ingredients: ["Banane", "Fraises", "Yaourt", "Miel", "Lait"],
    saved: false,
  },
  {
    id: 6,
    name: "Crumble de légumes",
    category: ["anti-gaspi", "vegetarien"],
    time: 35,
    difficulty: "Moyen",
    servings: 4,
    rating: 4.3,
    image: "/images/recipes/crumble-legumes.png",
    ingredients: ["Légumes", "Farine", "Beurre", "Parmesan", "Herbes"],
    saved: true,
  },
]

// Composant pour une carte de recette
function RecipeCard({ recipe }: { recipe: any }) {
  const [isSaved, setIsSaved] = useState(recipe.saved)

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
          <Link href={`/recipes/${recipe.id}`}>
            <div className="relative">
              <div className="h-48 overflow-hidden">
                <motion.img
                  src={recipe.image}
                  alt={recipe.name}
                  className="h-full w-full object-cover transition-transform"
                  whileHover={{ scale: 1.05 }}
                />
              </div>
              <div className="absolute top-3 right-3 flex gap-1">
                {recipe.category.includes("anti-gaspi") && (
                  <Badge className="bg-emerald-500 hover:bg-emerald-600">Anti-Gaspi</Badge>
                )}
              </div>
            </div>
          </Link>

          <div className="p-4">
            <Link href={`/recipes/${recipe.id}`}>
              <h3 className="font-medium text-lg hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                {recipe.name}
              </h3>
            </Link>

            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{recipe.time} min</span>
              </div>
              <div className="flex items-center">
                <Users className="h-3.5 w-3.5 mr-1" />
                <span>{recipe.servings} pers.</span>
              </div>
              <div className="flex items-center">
                <Star className="h-3.5 w-3.5 mr-1 text-amber-500" />
                <span>{recipe.rating}</span>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Ingrédients: {recipe.ingredients.slice(0, 3).join(", ")}
                {recipe.ingredients.length > 3 ? "..." : ""}
              </p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{recipe.difficulty}</span>
              <button
                className="text-gray-400 hover:text-amber-500 dark:text-gray-500 dark:hover:text-amber-400"
                onClick={() => setIsSaved(!isSaved)}
              >
                {isSaved ? (
                  <BookmarkCheck className="h-5 w-5 fill-amber-500 text-amber-500" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Composant principal de la page de recettes
export default function RecipesPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    let items = [...recipes]

    // Filtrer par catégorie
    if (activeCategory !== "all") {
      items = items.filter((recipe) => recipe.category.includes(activeCategory))
    }

    // Filtrer par recherche
    if (searchQuery) {
      items = items.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    setFilteredRecipes(items)
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
            Recettes
          </h1>
          <p className="text-muted-foreground">
            Découvrez des recettes anti-gaspillage et utilisez vos ingrédients efficacement
          </p>
        </div>
        <FluidButton variant="primary" icon={<ChefHat className="h-4 w-4" />}>
          Générer une recette
        </FluidButton>
      </motion.div>

      <motion.div className="mb-6 flex flex-col md:flex-row gap-4" variants={itemVariants}>
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Rechercher une recette ou un ingrédient..."
            className="pl-9 fluid-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <FluidButton variant="outline" icon={<Filter className="h-4 w-4" />}>
          Filtrer
        </FluidButton>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveCategory}>
          <TabsList className="fluid-tabs flex flex-nowrap overflow-x-auto pb-1 mb-2 w-full">
            {recipeCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="fluid-tab whitespace-nowrap">
                {category.name}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredRecipes.length > 0 ? (
                  filteredRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      Aucune recette trouvée. Essayez d'autres critères de recherche.
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
