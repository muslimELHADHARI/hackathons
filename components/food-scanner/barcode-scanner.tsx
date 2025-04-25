"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Upload, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

interface BarcodeResult {
  code: string
  format: string
  product?: {
    name: string
    brand: string
    category: string
    imageUrl: string
    nutritionalInfo: {
      calories: number
      protein: number
      carbs: number
      fat: number
    }
    ingredients: string[]
    expiryDays: number
  }
}

export default function BarcodeScanner() {
  const [isCapturing, setIsCapturing] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<BarcodeResult | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCapturing(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      toast({
        title: "Erreur d'accès à la caméra",
        description: "Veuillez autoriser l'accès à votre caméra ou utiliser l'upload d'image.",
        variant: "destructive",
      })
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsCapturing(false)
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)

        // Convert to base64 for processing
        const imageData = canvasRef.current.toDataURL("image/jpeg")
        processBarcode(imageData)
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          processBarcode(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const processBarcode = async (imageData: string) => {
    setIsProcessing(true)
    setProgress(0)

    // Simulate progressive loading for demo purposes
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + 5
      })
    }, 100)

    try {
      // In a real implementation, this would call your barcode scanning API
      // For demo, we'll simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock result - in production this would come from your API
      const mockResult: BarcodeResult = {
        code: "3017620422003",
        format: "EAN-13",
        product: {
          name: "Nutella - Pâte à tartiner aux noisettes et au cacao",
          brand: "Ferrero",
          category: "Pâtes à tartiner",
          imageUrl: "/images/barcode-example.png",
          nutritionalInfo: {
            calories: 539,
            protein: 6.3,
            carbs: 57.5,
            fat: 30.9,
          },
          ingredients: [
            "Sucre",
            "Huile de palme",
            "Noisettes (13%)",
            "Cacao maigre (7,4%)",
            "Lait écrémé en poudre (6,6%)",
            "Lactosérum en poudre",
            "Émulsifiants",
            "Arômes",
          ],
          expiryDays: 365,
        },
      }

      clearInterval(progressInterval)
      setProgress(100)
      setResult(mockResult)

      toast({
        title: "Code-barres scanné avec succès",
        description: `Produit identifié: ${mockResult.product?.name}`,
      })
    } catch (error) {
      console.error("Error processing barcode:", error)
      toast({
        title: "Erreur lors de l'analyse",
        description: "Impossible d'analyser le code-barres. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      stopCamera()
    }
  }

  const addToInventory = () => {
    if (result?.product) {
      toast({
        title: "Produit ajouté à l'inventaire",
        description: `${result.product.name} a été ajouté à votre inventaire.`,
      })
      setResult(null)
    }
  }

  const resetScanner = () => {
    setResult(null)
    setProgress(0)
  }

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        {isCapturing ? (
          <>
            <div className="relative w-full max-w-md aspect-video bg-black rounded-lg overflow-hidden">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            <div className="flex space-x-4">
              <Button onClick={captureImage} disabled={isProcessing}>
                <Camera className="mr-2 h-4 w-4" /> Capturer
              </Button>
              <Button variant="outline" onClick={stopCamera} disabled={isProcessing}>
                Annuler
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-4 w-full">
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <Button
                onClick={startCamera}
                className="flex-1 h-32 flex flex-col items-center justify-center"
                disabled={isProcessing}
              >
                <Camera className="h-8 w-8 mb-2" />
                <span>Scanner avec la caméra</span>
              </Button>
              <label className="flex-1">
                <div className="h-32 flex flex-col items-center justify-center bg-muted rounded-md border-2 border-dashed border-muted-foreground/25 cursor-pointer hover:bg-muted/80 transition-colors">
                  <Upload className="h-8 w-8 mb-2" />
                  <span>Importer une image</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isProcessing}
                />
              </label>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="w-full max-w-md space-y-2">
            <div className="flex justify-between text-sm">
              <span>Analyse en cours...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      {result && (
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Résultat du scan</h3>
              <span className="text-sm text-muted-foreground">Code: {result.code}</span>
            </div>

            {result.product && (
              <>
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-24 bg-muted rounded-md overflow-hidden">
                    <img
                      src={result.product.imageUrl || "/placeholder.svg"}
                      alt={result.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{result.product.name}</h4>
                    <p className="text-sm text-muted-foreground">{result.product.brand}</p>
                    <p className="text-sm">{result.product.category}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium text-sm">Informations nutritionnelles (pour 100g)</h5>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div className="bg-muted p-2 rounded-md text-center">
                      <div className="font-medium">{result.product.nutritionalInfo.calories}</div>
                      <div className="text-xs text-muted-foreground">Calories</div>
                    </div>
                    <div className="bg-muted p-2 rounded-md text-center">
                      <div className="font-medium">{result.product.nutritionalInfo.protein}g</div>
                      <div className="text-xs text-muted-foreground">Protéines</div>
                    </div>
                    <div className="bg-muted p-2 rounded-md text-center">
                      <div className="font-medium">{result.product.nutritionalInfo.carbs}g</div>
                      <div className="text-xs text-muted-foreground">Glucides</div>
                    </div>
                    <div className="bg-muted p-2 rounded-md text-center">
                      <div className="font-medium">{result.product.nutritionalInfo.fat}g</div>
                      <div className="text-xs text-muted-foreground">Lipides</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium text-sm">Ingrédients</h5>
                  <p className="text-sm">{result.product.ingredients.join(", ")}</p>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium text-sm">Conservation</h5>
                  <p className="text-sm">Se conserve environ {result.product.expiryDays} jours après ouverture.</p>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={resetScanner}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Nouveau scan
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={addToInventory}>
                    Ajouter à l'inventaire
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
