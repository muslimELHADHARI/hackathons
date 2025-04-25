"use client"

import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

interface Location {
  latitude: number
  longitude: number
}

interface MapItem {
  id: string
  title: string
  type: "offer" | "request"
  location: {
    latitude: number
    longitude: number
    address: string
  }
  distance?: number
  user: {
    id: string
    name: string
    avatar: string
  }
}

interface CommunityMapProps {
  items: MapItem[]
  userLocation: Location | null
}

export default function CommunityMap({ items, userLocation }: CommunityMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedItem, setSelectedItem] = useState<MapItem | null>(null)

  // In a real implementation, this would use a mapping library like Leaflet or Google Maps
  // For this demo, we'll create a simplified visual representation

  const normalizeCoordinates = (lat: number, lng: number): { x: number; y: number } => {
    // This is a very simplified conversion for demo purposes
    // In a real app, you would use proper map projection

    // Center around Tunis
    const centerLat = 36.8065
    const centerLng = 10.1815

    // Scale factor (higher = more zoomed in)
    const scale = 200

    // Convert to pixel coordinates
    const x = (lng - centerLng) * scale + 50 // 50% as center point
    const y = (centerLat - lat) * scale + 50 // 50% as center point

    return { x: Math.min(Math.max(x, 0), 100), y: Math.min(Math.max(y, 0), 100) }
  }

  const handleMarkerClick = (item: MapItem) => {
    setSelectedItem(item)
  }

  const handleContactUser = (userId: string) => {
    console.log(`Contact user ${userId}`)
    // In a real app, this would open a chat with the user
  }

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapRef}
        className="w-full h-full bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/community/map-background.png')" }}
      >
        {/* User location marker */}
        {userLocation && (
          <div
            className="absolute w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-md z-10 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
            style={{
              left: `${normalizeCoordinates(userLocation.latitude, userLocation.longitude).x}%`,
              top: `${normalizeCoordinates(userLocation.latitude, userLocation.longitude).y}%`,
            }}
          >
            <span className="sr-only">Votre position</span>
          </div>
        )}

        {/* Item markers */}
        {items.map((item) => {
          const coords = normalizeCoordinates(item.location.latitude, item.location.longitude)
          return (
            <button
              key={item.id}
              className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${
                item.type === "offer" ? "bg-emerald-500" : "bg-amber-500"
              } ${selectedItem?.id === item.id ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
              onClick={() => handleMarkerClick(item)}
            >
              <span className="sr-only">{item.title}</span>
              {item.type === "offer" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M12 2v20"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8v8"></path>
                  <path d="M8 12h8"></path>
                </svg>
              )}
            </button>
          )
        })}
      </div>

      {/* Selected item info */}
      {selectedItem && (
        <Card className="absolute bottom-4 left-4 right-4 max-w-md mx-auto">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{selectedItem.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedItem.location.address}</p>
                {selectedItem.distance !== undefined && (
                  <p className="text-xs text-muted-foreground">{selectedItem.distance.toFixed(1)} km de vous</p>
                )}
              </div>
              <Badge variant={selectedItem.type === "offer" ? "default" : "secondary"}>
                {selectedItem.type === "offer" ? "Offre" : "Recherche"}
              </Badge>
            </div>

            <div className="flex items-center mt-4">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-muted mr-2">
                <img
                  src={selectedItem.user.avatar || "/placeholder.svg"}
                  alt={selectedItem.user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{selectedItem.user.name}</p>
              </div>
              <Button size="sm" onClick={() => handleContactUser(selectedItem.user.id)}>
                <MessageSquare className="h-4 w-4 mr-2" /> Contacter
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
