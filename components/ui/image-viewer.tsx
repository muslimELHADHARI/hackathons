"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, ZoomIn, ZoomOut, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageViewerProps {
  src: string
  alt: string
  className?: string
  onClick?: () => void
}

export function ImageViewer({ src, alt, className = "", onClick }: ImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5))
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleReset = () => {
    setScale(1)
    setRotation(0)
  }

  const handleImageClick = () => {
    if (onClick) {
      onClick()
    } else {
      setIsOpen(true)
    }
  }

  return (
    <>
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={`cursor-zoom-in ${className}`}
        onClick={handleImageClick}
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden">
          <div className="relative w-full h-full">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Button variant="outline" size="icon" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleRotate}>
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleReset}>
                Reset
              </Button>
              <Button variant="outline" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="w-full h-full flex items-center justify-center p-8 overflow-auto">
              <img
                src={src || "/placeholder.svg"}
                alt={alt}
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                  transition: "transform 0.2s ease",
                }}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
