"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

interface FoodItem {
  id: number
  name: string
  category: string
  quantity: string
  expiryDate: string
  daysLeft: number
}

interface FoodItemsListProps {
  filter: "all" | "expiring"
  searchQuery: string
}

export default function FoodItemsList({ filter, searchQuery }: FoodItemsListProps) {
  const allItems: FoodItem[] = [
    {
      id: 1,
      name: "Yaourt nature",
      category: "Produits laitiers",
      quantity: "4 pots",
      expiryDate: "2023-06-15",
      daysLeft: 1,
    },
    { id: 2, name: "Tomates", category: "Légumes", quantity: "500g", expiryDate: "2023-06-16", daysLeft: 2 },
    {
      id: 3,
      name: "Pain de mie",
      category: "Boulangerie",
      quantity: "1 paquet",
      expiryDate: "2023-06-17",
      daysLeft: 3,
    },
    { id: 4, name: "Poulet", category: "Viandes", quantity: "300g", expiryDate: "2023-06-18", daysLeft: 4 },
    { id: 5, name: "Bananes", category: "Fruits", quantity: "6 pièces", expiryDate: "2023-06-19", daysLeft: 5 },
    { id: 6, name: "Lait", category: "Produits laitiers", quantity: "1L", expiryDate: "2023-06-20", daysLeft: 6 },
    { id: 7, name: "Œufs", category: "Produits frais", quantity: "6 pièces", expiryDate: "2023-06-25", daysLeft: 11 },
    { id: 8, name: "Fromage", category: "Produits laitiers", quantity: "200g", expiryDate: "2023-06-22", daysLeft: 8 },
  ]

  // Filtrer les éléments en fonction du filtre et de la recherche
  const filteredItems = allItems
    .filter((item) => {
      if (filter === "expiring") {
        return item.daysLeft <= 5
      }
      return true
    })
    .filter((item) => {
      if (searchQuery) {
        return (
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      return true
    })

  const getBadgeVariant = (daysLeft: number) => {
    if (daysLeft <= 1) return "destructive"
    if (daysLeft <= 3) return "default"
    if (daysLeft <= 5) return "secondary"
    return "outline"
  }

  const getFoodImage = (name: string) => {
    const normalizedName = name.toLowerCase().replace(/\s+/g, "-")
    const commonFoods = ["tomatoes", "bread", "eggs", "cheese", "chicken", "onions", "garlic", "pasta"]

    if (commonFoods.includes(normalizedName) || commonFoods.some((food) => normalizedName.includes(food))) {
      const matchedFood = commonFoods.find((food) => normalizedName.includes(food)) || normalizedName
      return `/images/foods/${matchedFood}.png`
    }

    return `/placeholder.svg?height=60&width=60&text=${encodeURIComponent(name)}`
  }

  return (
    <div className="space-y-4">
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun aliment trouvé</p>
        </div>
      ) : (
        filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 mr-4 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                    <img
                      src={getFoodImage(item.name) || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <h3 className="font-medium mr-2">{item.name}</h3>
                      <Badge variant={getBadgeVariant(item.daysLeft)}>
                        {item.daysLeft <= 0 ? "Expiré" : `${item.daysLeft} jour${item.daysLeft > 1 ? "s" : ""}`}
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground gap-2 sm:gap-4">
                      <span>{item.category}</span>
                      <span>{item.quantity}</span>
                      <span>Expire le: {new Date(item.expiryDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4 sm:mt-0">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Modifier</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Supprimer</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
