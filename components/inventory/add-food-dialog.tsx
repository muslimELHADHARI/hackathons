"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddFoodDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddFoodDialog({ open, onOpenChange }: AddFoodDialogProps) {
  const [date, setDate] = useState<Date>()

  const foodCategories = [
    "Produits laitiers",
    "Viandes",
    "Poissons",
    "Fruits",
    "Légumes",
    "Boulangerie",
    "Épicerie",
    "Boissons",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique pour ajouter l'aliment
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouvel aliment</DialogTitle>
          <DialogDescription>
            Entrez les détails de l'aliment que vous souhaitez ajouter à votre inventaire.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input id="name" placeholder="Ex: Pain, Yaourt, Tomates..." className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Catégorie
              </Label>
              <Select required>
                <SelectTrigger id="category" className="col-span-3">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {foodCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantité
              </Label>
              <Input id="quantity" placeholder="Ex: 2 pièces, 500g, 1L..." className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiry" className="text-right">
                Date d'expiration
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="expiry"
                    variant={"outline"}
                    className={cn("col-span-3 justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={fr} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Input id="notes" placeholder="Notes additionnelles..." className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Ajouter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
