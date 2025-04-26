"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, Upload, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface RecognitionResult {
  name: string
  confidence: number
  category: string
  expiryEstimate: number // days
  nutritionalValue: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  sustainabilityScore: number // 0-100
  wasteReductionTips: string[]
}

export default function FoodRecognition() {
  const [isCapturing, setIsCapturing] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState<RecognitionResult[]>([])
  const [progress, setProgress] = useState(0)
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
        processImage(imageData)
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          processImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const processImage = async (imageData: string) => {
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
      // In a real implementation, this would call your AI model API
      // For demo, we'll simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock results - in production this would come from your AI model
      const mockResults: RecognitionResult[] = [
        {
          name: "Tomates",
          confidence: 0.97,
          category: "Légumes",
          expiryEstimate: 5,
          nutritionalValue: {
            calories: 18,
            protein: 0.9,
            carbs: 3.9,
            fat: 0.2,
          },
          sustainabilityScore: 85,
          wasteReductionTips: [
            "Conservez à température ambiante pour préserver la saveur",
            "Utilisez les tomates trop mûres pour des sauces ou soupes",
            "Congelez en dés pour utilisation future",
          ],
        },
        {
          name: "Pain",
          confidence: 0.89,
          category: "Boulangerie",
          expiryEstimate: 3,
          nutritionalValue: {
            calories: 265,
            protein: 9.1,
            carbs: 49.0,
            fat: 3.2,
          },
          sustainabilityScore: 70,
          wasteReductionTips: [
            "Congelez dès l'achat si vous ne prévoyez pas de le consommer rapidement",
            "Transformez le pain rassis en pain perdu ou croûtons",
            "Conservez dans un sac en papier pour maintenir la fraîcheur",
          ],
        },
      ]

      clearInterval(progressInterval)
      setProgress(100)
      setResults(mockResults)

      // Add to inventory automatically
      toast({
        title: "Aliments reconnus avec succès",
        description: `${mockResults.length} aliments ont été identifiés et ajoutés à votre inventaire.`,
      })
    } catch (error) {
      console.error("Error processing image:", error)
      toast({
        title: "Erreur lors de l'analyse",
        description: "Impossible d'analyser l'image. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      stopCamera()
    }
  }

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

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Résultats de l'analyse</h3>
          <div className="grid gap-4">
            {results.map((result, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-lg">{result.name}</h4>
                      <p className="text-sm text-muted-foreground">{result.category}</p>
                    </div>
                    <Badge variant={result.confidence > 0.9 ? "default" : "secondary"}>
                      {Math.round(result.confidence * 100)}% de confiance
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-3">
                    <div className="text-sm">
                      <span className="font-medium">Durée estimée:</span> {result.expiryEstimate} jours
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Score de durabilité:</span> {result.sustainabilityScore}/100
                    </div>
                  </div>

                  <div className="mt-3">
                    <h5 className="font-medium text-sm mb-1">Conseils anti-gaspillage:</h5>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      {result.wasteReductionTips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setResults([])
                setProgress(0)
              }}
              className="flex items-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Nouvelle analyse
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
