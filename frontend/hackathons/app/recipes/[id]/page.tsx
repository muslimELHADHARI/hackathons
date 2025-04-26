"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, ChefHat, ArrowLeft, Bookmark, Share2, ThumbsUp, Printer } from "lucide-react"
import { RecipeGallery } from "@/components/recipes/recipe-gallery"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

interface RecipeStep {
  id: number
  description: string
  image?: string
}

export default function RecipeDetailPage() {
  const params = useParams()
  const { toast } = useToast()
  const recipeId = params.id as string

  // In a real app, you would fetch the recipe data based on the ID
  // For now, we'll use mock data
  const recipe = {
    id: recipeId,
    title: "Pain perdu aux fruits",
    description:
      "Une recette simple et délicieuse pour utiliser du pain rassis et des fruits trop mûrs. Parfaite pour un petit-déjeuner gourmand ou un dessert rapide.",
    images: [
      { src: "/images/recipes/pain-perdu.png", alt: "Pain perdu aux fruits" },
      { src: "/images/recipes/pain-perdu-2.png", alt: "Pain perdu en préparation" },
      { src: "/images/recipes/pain-perdu-3.png", alt: "Pain perdu servi" },
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: "Facile",
    ingredients: [
      { name: "Pain rassis", quantity: "8 tranches", isFromInventory: true },
      { name: "Œufs", quantity: "3", isFromInventory: true },
      { name: "Lait", quantity: "250ml", isFromInventory: true },
      { name: "Sucre", quantity: "3 cuillères à soupe", isFromInventory: false },
      { name: "Cannelle", quantity: "1 cuillère à café", isFromInventory: false },
      { name: "Fruits de saison", quantity: "200g", isFromInventory: true },
      { name: "Beurre", quantity: "30g", isFromInventory: false },
      { name: "Miel ou sirop d'érable", quantity: "Pour servir", isFromInventory: false },
    ],
    steps: [
      { id: 1, description: "Dans un bol large, battre les œufs avec le lait, le sucre et la cannelle." },
      {
        id: 2,
        description:
          "Tremper chaque tranche de pain dans le mélange, en s'assurant qu'elle soit bien imbibée des deux côtés.",
        image: "/images/recipes/pain-perdu-step1.png",
      },
      { id: 3, description: "Faire fondre le beurre dans une poêle à feu moyen." },
      {
        id: 4,
        description:
          "Faire dorer les tranches de pain 2-3 minutes de chaque côté, jusqu'à ce qu'elles soient bien dorées.",
        image: "/images/recipes/pain-perdu-step2.png",
      },
      { id: 5, description: "Pendant ce temps, couper les fruits en morceaux." },
      {
        id: 6,
        description: "Servir le pain perdu chaud, garni de fruits et arrosé de miel ou de sirop d'érable.",
        image: "/images/recipes/pain-perdu-step3.png",
      },
    ],
    nutritionalInfo: {
      calories: 285,
      protein: 9,
      carbs: 42,
      fat: 10,
    },
    tags: ["Anti-gaspillage", "Dessert", "Petit-déjeuner", "Rapide"],
    wasteReduction: {
      itemsSaved: 2,
      co2Saved: 0.5,
      waterSaved: 120,
    },
    author: {
      name: "Chef Anti-Gaspillage",
      avatar: "/images/avatars/chef.png",
    },
    rating: 4.8,
    reviews: 24,
  }

  const handleSaveRecipe = () => {
    toast({
      title: "Recette sauvegardée",
      description: "Cette recette a été ajoutée à vos favoris.",
    })
  }

  const handleShareRecipe = () => {
    toast({
      title: "Lien copié",
      description: "Le lien de la recette a été copié dans le presse-papier.",
    })
  }

  const handlePrintRecipe = () => {
    window.print()
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-6">
        <Link href="/recipes" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux recettes
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            <p className="text-muted-foreground mb-6">{recipe.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {recipe.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>

            <RecipeGallery images={recipe.images} className="mb-6" />

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>Préparation: {recipe.prepTime} min</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>Cuisson: {recipe.cookTime} min</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{recipe.servings} personnes</span>
              </div>
              <div className="flex items-center">
                <ChefHat className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>Difficulté: {recipe.difficulty}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <div className="space-y-6">
              {recipe.steps.map((step) => (
                <div key={step.id} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-medium">
                    {step.id}
                  </div>
                  <div className="flex-1 space-y-2">
                    <p>{step.description}</p>
                    {step.image && (
                      <img
                        src={step.image || "/placeholder.svg"}
                        alt={`Étape ${step.id}`}
                        className="rounded-md max-h-48 object-cover"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Impact Anti-Gaspillage</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">{recipe.wasteReduction.itemsSaved}</div>
                    <p className="text-sm text-muted-foreground">Aliments sauvés</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">{recipe.wasteReduction.co2Saved} kg</div>
                    <p className="text-sm text-muted-foreground">CO₂ économisé</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">{recipe.wasteReduction.waterSaved} L</div>
                    <p className="text-sm text-muted-foreground">Eau économisée</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Ingrédients</h2>
              <p className="text-sm text-muted-foreground mb-4">Pour {recipe.servings} personnes</p>

              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className={ingredient.isFromInventory ? "text-emerald-600 font-medium" : ""}>
                      {ingredient.name}
                      {ingredient.isFromInventory && (
                        <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                          En stock
                        </span>
                      )}
                    </span>
                    <span className="text-sm text-muted-foreground">{ingredient.quantity}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">Valeurs nutritionnelles</h3>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div className="bg-muted p-2 rounded-md text-center">
                    <div className="font-medium">{recipe.nutritionalInfo.calories}</div>
                    <div className="text-xs text-muted-foreground">Calories</div>
                  </div>
                  <div className="bg-muted p-2 rounded-md text-center">
                    <div className="font-medium">{recipe.nutritionalInfo.protein}g</div>
                    <div className="text-xs text-muted-foreground">Protéines</div>
                  </div>
                  <div className="bg-muted p-2 rounded-md text-center">
                    <div className="font-medium">{recipe.nutritionalInfo.carbs}g</div>
                    <div className="text-xs text-muted-foreground">Glucides</div>
                  </div>
                  <div className="bg-muted p-2 rounded-md text-center">
                    <div className="font-medium">{recipe.nutritionalInfo.fat}g</div>
                    <div className="text-xs text-muted-foreground">Lipides</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3">
            <Button className="bg-emerald-600 hover:bg-emerald-700 w-full" onClick={handleSaveRecipe}>
              <Bookmark className="mr-2 h-4 w-4" /> Sauvegarder la recette
            </Button>
            <Button variant="outline" className="w-full" onClick={handleShareRecipe}>
              <Share2 className="mr-2 h-4 w-4" /> Partager
            </Button>
            <Button variant="outline" className="w-full" onClick={handlePrintRecipe}>
              <Printer className="mr-2 h-4 w-4" /> Imprimer
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={recipe.author.avatar || "/placeholder.svg"}
                    alt={recipe.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{recipe.author.name}</p>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(recipe.rating) ? "text-yellow-400" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">({recipe.reviews} avis)</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <ThumbsUp className="mr-2 h-4 w-4" /> J'ai aimé cette recette
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
