import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BadgeCardProps {
  name: string
  image: string
  level: "Bronze" | "Argent" | "Or" | "Platine"
  date: string
  isLocked?: boolean
  progress?: number
}

export function BadgeCard({ name, image, level, date, isLocked = false, progress }: BadgeCardProps) {
  const getLevelColor = () => {
    switch (level) {
      case "Bronze":
        return "bg-amber-50 border-amber-200"
      case "Argent":
        return "bg-gray-50 border-gray-200"
      case "Or":
        return "bg-yellow-50 border-yellow-200"
      case "Platine":
        return "bg-indigo-50 border-indigo-200"
      default:
        return "bg-muted border-muted-foreground/20"
    }
  }

  const getLevelBadgeColor = () => {
    switch (level) {
      case "Bronze":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "Argent":
        return "bg-gray-200 text-gray-800 hover:bg-gray-200"
      case "Or":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Platine":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
      default:
        return ""
    }
  }

  return (
    <Card className={`overflow-hidden border-2 ${getLevelColor()}`}>
      <div className="p-4 flex flex-col items-center text-center">
        <div className="relative mb-2">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className={`w-full h-full object-cover ${isLocked ? "opacity-30 grayscale" : ""}`}
            />
          </div>
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-muted-foreground"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          )}
        </div>
        <h4 className="font-medium text-sm line-clamp-2 h-10">{name}</h4>
        <Badge variant="outline" className={`mt-1 ${getLevelBadgeColor()}`}>
          {level}
        </Badge>
        {!isLocked && <p className="text-xs text-muted-foreground mt-1">Obtenu le {date}</p>}
        {isLocked && progress !== undefined && (
          <div className="w-full mt-2">
            <div className="text-xs text-muted-foreground mb-1">{progress}%</div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
