import { Card, CardContent } from "@/components/ui/card"

interface ImpactCardProps {
  title: string
  value: string | number
  unit?: string
  image: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function ImpactCard({ title, value, unit, image, trend }: ImpactCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-bold">
                {value}
                {unit && <span className="text-lg ml-1">{unit}</span>}
              </h3>
              {trend && (
                <span className={`text-xs flex items-center ${trend.isPositive ? "text-emerald-600" : "text-red-600"}`}>
                  {trend.isPositive ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="m5 12 7-7 7 7"></path>
                      <path d="M12 19V5"></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="m5 12 7 7 7-7"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  )}
                  {trend.value}%
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
