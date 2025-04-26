"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCw, ZoomIn, ZoomOut } from "lucide-react"

interface Image360ViewerProps {
  images: string[]
  alt: string
  className?: string
}

export function Image360Viewer({ images, alt, className = "" }: Image360ViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - startX
    if (Math.abs(deltaX) > 10) {
      // Calculate new index based on drag direction
      const direction = deltaX > 0 ? -1 : 1
      const newIndex = (currentIndex + direction + images.length) % images.length
      setCurrentIndex(newIndex)
      setStartX(e.clientX)
    }
  }
  
  const handleMouseUp = () => {
    setIsDragging(false)
  }
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    
    const deltaX = e.touches[0].clientX - startX
    if (Math.abs(deltaX) > 10) {
      // Calculate new index based on drag direction
      const direction = deltaX > 0 ? -1 : 1
      const newIndex = (currentIndex + direction + images.length) % images.length
      setCurrentIndex(newIndex)
      setStartX(e.touches[0].clientX)
    }
  }
  
  const handleTouchEnd = () => {
    setIsDragging(false)
  }
  
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3))
  }
  
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5))
  }
  
  const handleReset = () => {
    setScale(1)
  }
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    container.addEventListener("mouseleave", handleMouseUp)
    
    return () => {
      container.removeEventListener("mouseleave", handleMouseUp)
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button variant="outline" size="icon" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleReset}>
          <RotateCw className="h-4 w-4" />
        </Button>
      </div>
      
      <div 
        ref={containerRef}
        className="w-full aspect-square bg-muted rounded-md overflow-hidden cursor-grab active:cursor-grab"
      >

\
\
