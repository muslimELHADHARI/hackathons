"use client"

import type React from "react"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Milk, Beef, Fish, Apple, Carrot, CroissantIcon as Bread, ShoppingBag, Wine } from "lucide-react"

interface FoodCategory {
  id: string
  name: string
  icon: React.ReactNode
  count: number
  color: string
}

export default function FoodCategoryGrid() {
  const categories: FoodCategory[] = [
    {
      id: "dairy",
      name: "Produits laitiers",
      icon: <Milk className="h-8 w-8" />,
      count: 6,
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "meat",
      name: "Viandes",
      icon: <Beef className="h-8 w-8" />,
      count: 3,
      color: "bg-red-100 text-red-700",
    },
    {
      id: "fish",
      name: "Poissons",
      icon: <Fish className="h-8 w-8" />,
      count: 2,
      color: "bg-cyan-100 text-cyan-700",
    },
    {
      id: "fruits",
      name: "Fruits",
      icon: <Apple className="h-8 w-8" />,
      count: 8,
      color: "bg-orange-100 text-orange-700",
    },
    {
      id: "vegetables",
      name: "Légumes",
      icon: <Carrot className="h-8 w-8" />,
      count: 7,
      color: "bg-green-100 text-green-700",
    },
    {
      id: "bakery",
      name: "Boulangerie",
      icon: <Bread className="h-8 w-8" />,
      count: 4,
      color: "bg-amber-100 text-amber-700",
    },
    {
      id: "grocery",
      name: "Épicerie",
      icon: <ShoppingBag className="h-8 w-8" />,
      count: 5,
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: "beverages",
      name: "Boissons",
      icon: <Wine className="h-8 w-8" />,
      count: 3,
      color: "bg-pink-100 text-pink-700",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/inventory/category/${category.id}`}>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className={`p-4 rounded-full mb-4 ${category.color} relative`}>
                <img
                  src={`/images/categories/${category.id}.png`}
                  alt={category.name}
                  className="h-12 w-12 object-contain"
                />
                {category.icon}
              </div>
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count} articles</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
