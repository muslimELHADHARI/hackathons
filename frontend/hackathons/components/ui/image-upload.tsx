"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  onImageUpload: (file: File, preview: string) => void
  onImageRemove?: () => void
  initialImage?: string
  className?: string
  aspectRatio?: "square" | "video" | "wide" | "portrait"
}

export function ImageUpload({
  onImageUpload,
  onImageRemove,
  initialImage,
  className = "",
  aspectRatio = "square",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[16/9]",
    portrait: "aspect-[3/4]",
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setPreview(result)
        onImageUpload(file, result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    if (onImageRemove) {
      onImageRemove()
    }
  }

  return (
    <div className={`relative ${aspectRatioClasses[aspectRatio]} ${className}`}>
      {preview ? (
        <>
          <img
            src={preview || "/placeholder.svg"}
            alt="Image preview"
            className="w-full h-full object-cover rounded-md"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-muted-foreground/25 rounded-md cursor-pointer bg-muted hover:bg-muted/80 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <ImageIcon className="h-10 w-10 mb-3 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
            </p>
            <p className="text-xs text-muted-foreground">PNG, JPG ou WEBP (Max. 5MB)</p>
          </div>
          <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      )}
    </div>
  )
}
