"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ExpirationItem {
  id: number
  name: string
  category: string
  daysLeft: number
  quantity: string
}

export default function UpcomingExpirations() {
  const expirationItems: ExpirationItem[] = [
    { id: 1, name: "Yaourt nature", category: "Produits laitiers", daysLeft: 1, quantity: "2 pots" },
    { id: 2, name: "Tomates", category: "Légumes", daysLeft: 2, quantity: "500g" },
    { id: 3, name: "Pain de mie", category: "Boulangerie", daysLeft: 3, quantity: "1/2 paquet" },
    { id: 4, name: "Poulet", category: "Viandes", daysLeft: 4, quantity: "300g" },
    { id: 5, name: "Bananes", category: "Fruits", daysLeft: 5, quantity: "3 pièces" },
  ]

  const getProgressColor = (daysLeft: number) => {
    if (daysLeft <= 1) return "bg-red-500"
    if (daysLeft <= 3) return "bg-amber-500"
    return "bg-emerald-500"
  }

  const getProgressValue = (daysLeft: number) => {
    return Math.min(100, daysLeft * 20)
  }

  return (
    <div className="space-y-4">
      {expirationItems.map((item) => (
        <div key={item.id} className="flex items-center space-x-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{item.name}</p>
              <Badge variant={item.daysLeft <= 1 ? "destructive" : item.daysLeft <= 3 ? "default" : "outline"}>
                {item.daysLeft} jour{item.daysLeft > 1 ? "s" : ""}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{item.category}</span>
              <span>{item.quantity}</span>
            </div>
            <Progress value={getProgressValue(item.daysLeft)} className={getProgressColor(item.daysLeft)} />
          </div>
        </div>
      ))}
    </div>
  )
}
