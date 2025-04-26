import type { FoodItem, UserConsumptionPattern } from "@/types/inventory"

export interface WastePrediction {
  itemId: string
  itemName: string
  wasteRisk: "low" | "medium" | "high"
  wasteProbability: number // 0-1
  suggestedAction: "consume" | "preserve" | "share" | "donate"
  reasoning: string
  optimalConsumptionDate: Date
  potentialWasteCost: number
  environmentalImpact: {
    co2Saved: number // kg
    waterSaved: number // liters
  }
}

export async function predictFoodWaste(
  inventory: FoodItem[],
  userConsumptionPatterns: UserConsumptionPattern[],
  seasonalFactors: any,
  userPreferences: any,
): Promise<WastePrediction[]> {
  // In a real implementation, this would call a machine learning model
  // For now, we'll simulate predictions based on expiry dates and consumption patterns

  return inventory.map((item) => {
    // Calculate days until expiry
    const daysUntilExpiry = Math.floor((item.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

    // Find user's consumption pattern for this food category
    const consumptionPattern = userConsumptionPatterns.find((p) => p.category === item.category)
    const consumptionFrequency = consumptionPattern?.frequencyDays || 7

    // Calculate waste probability based on expiry and consumption patterns
    let wasteProbability = 0

    if (daysUntilExpiry < 0) {
      // Already expired
      wasteProbability = 1
    } else if (daysUntilExpiry < consumptionFrequency / 2) {
      // Less than half the usual consumption cycle remaining
      wasteProbability = 0.7 - daysUntilExpiry / consumptionFrequency
    } else {
      // More time remaining
      wasteProbability = 0.3 * (1 - daysUntilExpiry / (consumptionFrequency * 2))
    }

    // Adjust for quantity
    if (item.quantity.amount > consumptionPattern?.averageConsumptionAmount) {
      wasteProbability += 0.2
    }

    // Clamp probability between 0 and 1
    wasteProbability = Math.max(0, Math.min(1, wasteProbability))

    // Determine risk level
    let wasteRisk: "low" | "medium" | "high"
    if (wasteProbability < 0.3) wasteRisk = "low"
    else if (wasteProbability < 0.7) wasteRisk = "medium"
    else wasteRisk = "high"

    // Determine suggested action
    let suggestedAction: "consume" | "preserve" | "share" | "donate"
    let reasoning: string

    if (wasteProbability > 0.7) {
      if (daysUntilExpiry < 1) {
        suggestedAction = "consume"
        reasoning = "Cet aliment expire très bientôt et devrait être consommé aujourd'hui."
      } else {
        suggestedAction = "share"
        reasoning = "Cet aliment a un risque élevé d'être gaspillé. Envisagez de le partager avec des voisins."
      }
    } else if (wasteProbability > 0.4) {
      if (item.canBePreserved) {
        suggestedAction = "preserve"
        reasoning = "Cet aliment peut être congelé ou préservé pour éviter le gaspillage."
      } else {
        suggestedAction = "consume"
        reasoning = "Planifiez un repas avec cet ingrédient dans les prochains jours."
      }
    } else {
      suggestedAction = "consume"
      reasoning = "Cet aliment sera probablement consommé à temps selon vos habitudes."
    }

    // Calculate environmental impact
    const co2PerKg = item.environmentalData?.co2PerKg || 2.5 // Default value if not available
    const waterPerKg = item.environmentalData?.waterPerKg || 1000 // Default value if not available

    const weightInKg =
      item.quantity.unit === "kg"
        ? item.quantity.amount
        : item.quantity.unit === "g"
          ? item.quantity.amount / 1000
          : 0.5 // Default estimate for items without weight

    return {
      itemId: item.id,
      itemName: item.name,
      wasteRisk,
      wasteProbability,
      suggestedAction,
      reasoning,
      optimalConsumptionDate: new Date(Date.now() + (daysUntilExpiry - 1) * 24 * 60 * 60 * 1000),
      potentialWasteCost: item.price || 0,
      environmentalImpact: {
        co2Saved: co2PerKg * weightInKg,
        waterSaved: waterPerKg * weightInKg,
      },
    }
  })
}
