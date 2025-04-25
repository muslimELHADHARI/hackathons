"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

interface ShoppingItem {
  id: number
  name: string
  category: string
  quantity: string
  priority: "high" | "medium" | "low"
}

export default function ShoppingList() {
  const initialItems: ShoppingItem[] = [
    { id: 1, name: "Pain (baguette)", category: "Boulangerie", quantity: "3 pièces", priority: "high" },
    { id: 2, name: "Lait", category: "Produits laitiers", quantity: "1L", priority: "medium" },
    { id: 3, name: "Œufs", category: "Produits frais", quantity: "6 pièces", priority: "medium" },
    { id: 4, name: "Pommes", category: "Fruits", quantity: "1kg", priority: "low" },
    { id: 5, name: "Pâtes", category: "Épicerie", quantity: "500g", priority: "low" },
  ]

  const [items, setItems] = useState<ShoppingItem[]>(initialItems)
  const [checkedItems, setCheckedItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setCheckedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-amber-500"
      case "low":
        return "text-emerald-500"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <Checkbox
              id={`item-${item.id}`}
              checked={checkedItems.includes(item.id)}
              onCheckedChange={() => toggleItem(item.id)}
            />
            <div className="flex-1 space-y-1">
              <label
                htmlFor={`item-${item.id}`}
                className={`font-medium ${checkedItems.includes(item.id) ? "line-through text-muted-foreground" : ""}`}
              >
                {item.name}
              </label>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{item.category}</span>
                <span className={getPriorityClass(item.priority)}>{item.quantity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
        <ShoppingCart className="mr-2 h-4 w-4" /> Acheter les articles
      </Button>
    </div>
  )
}
