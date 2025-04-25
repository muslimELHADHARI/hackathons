"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageViewer } from "@/components/ui/image-viewer"

interface RecipeGalleryProps {
  images: {
    src: string
    alt: string
  }[]
  className?: string
}

export function RecipeGallery({ images, className = "" }: RecipeGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (images.length === 0) {
    return (
      <div className={`aspect-video bg-muted rounded-md flex items-center justify-center ${className}`}>
        <p className="text-muted-foreground">Aucune image disponible</p>
      </div>
    )
  }

  if (images.length === 1) {
    return (
      <div className={`aspect-video rounded-md overflow-hidden ${className}`}>
        <ImageViewer
          src={images[0].src || "/placeholder.svg"}
          alt={images[0].alt}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  return (
    <div className={`aspect-video rounded-md overflow-hidden relative ${className}`}>
      <ImageViewer
        src={images[currentIndex].src || "/placeholder.svg"}
        alt={images[currentIndex].alt}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex items-center justify-between p-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={prevImage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={nextImage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/60"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
