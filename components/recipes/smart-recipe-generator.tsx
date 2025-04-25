"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface Ingredient {
  id: string
  name: string
  quantity: string
  expiryDate: Date | null
  daysLeft: number | null
  isExpiring: boolean
  isSelected: boolean
  category: string
}

interface RecipePreference {
  id: string
  name: string
  isSelected: boolean
}

interface GeneratedRecipe {
  id: string
  title: string
  description: string
  ingredients: {
    name: string
    quantity: string
    isFromInventory: boolean
  }[]
  instructions: string[]
  prepTime: number
  cookTime: number
  servings: number
  difficulty: "Facile" | "Moyen" | "Difficile"
  nutritionalInfo: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  tags: string[]
  wasteReduction: {
    itemsSaved: number
    co2Saved: number
    waterSaved: number
  }
  imageUrl: string
}

export default function SmartRecipeGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedRecipes, setGeneratedRecipes] = useState<GeneratedRecipe[]>([])
  const [selectedTab, setSelectedTab] = useState("ingredients")
  const [maxPrepTime, setMaxPrepTime] = useState(60) // minutes
  const { toast } = useToast()

  // Mock inventory data
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: "1",
      name: "Tomates",
      quantity: "500g",
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      daysLeft: 2,
      isExpiring: true,
      isSelected: true,
      category: "Légumes"
    },
    {
      id: "2",
      name: "Pain",
      quantity: "1 baguette",
      expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      daysLeft: 1,
      isExpiring: true,
      isSelected: true,
      category: "Boulangerie"
    },
    {
      id: "3",
      name: "Œufs",
      quantity: "6 pièces",
      expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      daysLeft: 10,
      isExpiring: false,
      isSelected: true,
      category: "Produits frais"
    },
    {
      id: "4",
      name: "Fromage",
      quantity: "200g",
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      daysLeft: 5,
      isExpiring: false,
      isSelected: true,
      category: "Produits laitiers"
    },
    {
      id: "5",
      name: "Poulet",
      quantity: "300g",
      expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      daysLeft: 1,
      isExpiring: true,
      isSelected: false,
      category: "Viandes"
    },
    {
      id: "6",
      name: "Oignons",
      quantity: "2 pièces",
      expiryDate: null,
      daysLeft: null,
      isExpiring: false,
      isSelected: true,
      category: "Légumes"
    },
    {
      id: "7",
      name: "Ail",
      quantity: "3 gousses",
      expiryDate: null,
      daysLeft: null,
      isExpiring: false,
      isSelected: true,
      category: "Légumes"
    },
    {
      id: "8",
      name: "Pâtes",
      quantity: "500g",
      expiryDate: null,
      daysLeft: null,
      isExpiring: false,
      isSelected: false,
      category: "Épicerie"
    },
  ])

  // Mock dietary preferences
  const [preferences, setPreferences] = useState<RecipePreference[]>([
    { id: "1", name: "Végétarien", isSelected: false },
    { id: "2", name: "Vegan", isSelected: false },
    { id: "3", name: "Sans gluten", isSelected: false },
    { id: "4", name: "Sans lactose", isSelected: false },
    { id: "5", name: "Faible en calories", isSelected: false },
    { id: "6", name: "Riche en protéines", isSelected: false },
  ])

  const toggleIngredient = (id: string) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, isSelected: !ing.isSelected } : ing
    ))
  }

  const togglePreference = (id: string) => {
    setPreferences(preferences.map(pref => 
      pref.id === id ? { ...pref, isSelected: !pref.isSelected } : pref
    ))
  }

  const selectAllExpiringIngredients = () => {
    setIngredients(ingredients.map(ing => 
      ing.isExpiring ? { ...ing, isSelected: true } : ing
    ))
  }

  const generateRecipes = async () => {
    const selectedIngredients = ingredients.filter(ing => ing.isSelected)
    
    if (selectedIngredients.length < 2) {
      toast({
        title: "Sélection insuffisante",
        description: "Veuillez sélectionner au moins 2 ingrédients pour générer des recettes.",
        variant: "destructive"
      })
      return
    }
    
    setIsGenerating(true)
    setGenerationProgress(0)
    setGeneratedRecipes([])
    
    // Simulate AI recipe generation with progress updates
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + 5
      })
    }, 150)
    
    try {
      // In a real implementation, this would call your AI recipe generation API
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mock generated recipes
      const mockRecipes: GeneratedRecipe[] = [
        {
          id: "recipe1",
          title: "Bruschetta de Pain Rassis aux Tomates",
          description: "Une recette simple et délicieuse pour utiliser du pain rassis et des tomates. Parfaite comme entrée ou collation légère.",
          ingredients: [
            { name: "Pain", quantity: "1 baguette", isFromInventory: true },
            { name: "Tomates", quantity: "300g", isFromInventory: true },
            { name: "Ail", quantity: "2 gousses", isFromInventory: true },
            { name: "Fromage", quantity: "100g", isFromInventory: true },
            { name: "Huile d'olive", quantity: "2 cuillères à soupe", isFromInventory: false },
            { name: "Basilic frais", quantity: "quelques feuilles", isFromInventory: false },
            { name: "Sel et poivre", quantity: "à goût", isFromInventory: false },
          ],
          instructions: [
            "Préchauffer le four à 180°C.",
            "Couper la baguette en tranches d'environ 1 cm d'épaisseur.",
            "Frotter chaque tranche avec de l'ail et badigeonner légèrement d'huile d'olive.",
            "Faire griller le pain au four pendant 5-7 minutes jusqu'à ce qu'il soit doré.",
            "Pendant ce temps, couper les tomates en dés et les mélanger avec du sel, du poivre et de l'huile d'olive.",
            "Sortir le pain du four, garnir de tomates et saupoudrer de fromage râpé.",
            "Remettre au four pendant 2-3 minutes pour faire fondre le fromage.",
            "Garnir de basilic frais avant de servir."
          ],
          prepTime: 10,
          cookTime: 10,
          servings: 4,
          difficulty: "Facile",
          nutritionalInfo: {
            calories: 220,
            protein: 7,
            carbs: 28,
            fat: 9
          },
          tags: ["Anti-gaspillage", "Végétarien", "Entrée", "Rapide"],
          wasteReduction: {
            itemsSaved: 2,
            co2Saved: 0.5,
            waterSaved: 120
          },
          imageUrl: "/placeholder.svg?height=300&width=400"
        },
        {
          id: "recipe2",
          title: "Frittata aux Légumes et Fromage",
          description: "Un plat polyvalent qui peut être servi au petit-déjeuner, au déjeuner ou au dîner. Parfait pour utiliser les œufs et légumes.",
          ingredients: [
            { name: "Œufs", quantity: "6", isFromInventory: true },
            { name: "Tomates", quantity: "200g", isFromInventory: true },\
