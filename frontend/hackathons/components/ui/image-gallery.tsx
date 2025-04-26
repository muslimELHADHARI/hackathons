"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react"

interface ImageGalleryProps {
  images: {
    src: string
    alt: string
    thumbnail?: string
  }[]
  className?: string
}

export function ImageGallery({ images, className = "" }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
    if (e.key === "Escape") setIsOpen(false)
  }

  if (images.length === 0) {
    return (
      <div className={`aspect-video bg-muted rounded-md flex items-center justify-center ${className}`}>
        <p className="text-muted-foreground">Aucune image disponible</p>
      </div>
    )
  }

  return (
    <div className={`space-y-2 ${className}`} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="aspect-video rounded-md overflow-hidden relative">
        <img
          src={images[currentIndex].src || "/placeholder.svg"}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setIsOpen(true)}
        />

        {images.length > 1 && (
          <>
            <div className="absolute inset-0 flex items-center justify-between p-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(true)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                index === currentIndex ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={image.thumbnail || image.src || "/placeholder.svg"}
                alt={`Miniature ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden">
          <div className="relative w-full h-full">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 z-10"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="w-full h-full flex items-center justify-center">
              <img
                src={images[currentIndex].src || "/placeholder.svg"}
                alt={images[currentIndex].alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {images.length > 1 && (
              <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1">
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
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
