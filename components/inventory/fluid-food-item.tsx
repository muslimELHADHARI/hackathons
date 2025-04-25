"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Edit, Trash2, ChevronDown, ChevronUp, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FoodItemProps {
  id: number
  name: string
  category: string
  quantity: string
  expiryDate: string
  daysLeft: number
  image: string
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export default function FluidFoodItem({
  id,
  name,
  category,
  quantity,
  expiryDate,
  daysLeft,
  image,
  onEdit,
  onDelete,
}: FoodItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getBadgeVariant = (daysLeft: number) => {
    if (daysLeft <= 1) return "destructive"
    if (daysLeft <= 3) return "default"
    if (daysLeft <= 5) return "secondary"
    return "outline"
  }

  const getExpiryColor = (daysLeft: number) => {
    if (daysLeft <= 1) return "text-red-500"
    if (daysLeft <= 3) return "text-amber-500"
    if (daysLeft <= 5) return "text-emerald-500"
    return "text-blue-500"
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      <div className="p-4">
        <div className="flex items-center">
          <div className="w-16 h-16 mr-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <motion.img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">{name}</h3>
              <Badge variant={getBadgeVariant(daysLeft)}>
                {daysLeft <= 0 ? "Expiré" : `${daysLeft} jour${daysLeft > 1 ? "s" : ""}`}
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 dark:text-gray-400 gap-2 sm:gap-4 mt-1">
              <span>{category}</span>
              <span>{quantity}</span>
            </div>
          </div>

          <motion.button
            className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <Clock className={cn("h-4 w-4 mr-2", getExpiryColor(daysLeft))} />
                  <span className="text-sm">
                    Expire le: <span className="font-medium">{new Date(expiryDate).toLocaleDateString()}</span>
                  </span>
                </div>

                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      daysLeft <= 1
                        ? "bg-red-500"
                        : daysLeft <= 3
                          ? "bg-amber-500"
                          : daysLeft <= 5
                            ? "bg-emerald-500"
                            : "bg-blue-500",
                    )}
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.min(100, (daysLeft / 14) * 100)}%` }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                </div>

                <div className="flex justify-end space-x-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit && onEdit(id)}
                    className="flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-1" /> Modifier
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete && onDelete(id)}
                    className="flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
