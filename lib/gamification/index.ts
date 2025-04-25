export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  requiredPoints: number
  isUnlocked: boolean
  progress: number
  category: "inventory" | "recipes" | "community" | "scanning" | "waste-reduction"
  level: "bronze" | "silver" | "gold" | "platinum"
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  isEarned: boolean
  earnedDate?: Date
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
}

export interface Challenge {
  id: string
  name: string
  description: string
  icon: string
  startDate: Date
  endDate: Date
  isCompleted: boolean
  progress: number
  goal: number
  reward: {
    points: number
    badge?: Badge
  }
}

export interface UserStats {
  totalPoints: number
  level: number
  wasteReduction: {
    totalKgSaved: number
    co2Saved: number // kg
    waterSaved: number // liters
    moneySaved: number // currency
  }
  streaks: {
    currentStreak: number
    longestStreak: number
    lastCheckIn: Date | null
  }
  inventory: {
    totalItemsTracked: number
    expiryPreventionRate: number // 0-1
  }
  community: {
    itemsShared: number
    itemsReceived: number
    peopleHelped: number
  }
}

export interface LeaderboardEntry {
  userId: string
  username: string
  avatar: string
  points: number
  level: number
  wasteReductionKg: number
  position: number
}

export function calculateLevel(points: number): number {
  // Logarithmic level scaling - makes early levels easier but later levels require more points
  return Math.floor(Math.log(points + 100) / Math.log(1.5)) - 9
}

export function calculatePointsForNextLevel(currentLevel: number): number {
  // Calculate how many points are needed for the next level
  return Math.floor(Math.pow(1.5, currentLevel + 10)) - 100
}

export function awardPoints(userId: string, action: string, quantity = 1): number {
  // Point values for different actions
  const pointValues: Record<string, number> = {
    item_added: 5,
    item_consumed: 10,
    item_shared: 25,
    recipe_used: 15,
    expiry_prevented: 20,
    daily_check_in: 5,
    weekly_goal_completed: 50,
    challenge_completed: 100,
    community_contribution: 30,
    feedback_provided: 10,
    first_scan: 20,
    profile_completed: 15,
  }

  const pointsEarned = (pointValues[action] || 1) * quantity

  // In a real implementation, this would update the user's points in the database
  console.log(`User ${userId} earned ${pointsEarned} points for ${action}`)

  return pointsEarned
}

export function checkAchievements(userId: string, stats: UserStats): Achievement[] {
  // This would check if any new achievements have been unlocked based on the user's stats
  // For now, we'll return a mock list of achievements

  const achievements: Achievement[] = [
    {
      id: "waste_warrior_bronze",
      name: "Guerrier Anti-Gaspillage Bronze",
      description: "Sauvez 5kg de nourriture du gaspillage",
      icon: "award",
      requiredPoints: 100,
      isUnlocked: stats.wasteReduction.totalKgSaved >= 5,
      progress: Math.min(stats.wasteReduction.totalKgSaved / 5, 1) * 100,
      category: "waste-reduction",
      level: "bronze",
    },
    {
      id: "waste_warrior_silver",
      name: "Guerrier Anti-Gaspillage Argent",
      description: "Sauvez 25kg de nourriture du gaspillage",
      icon: "award",
      requiredPoints: 250,
      isUnlocked: stats.wasteReduction.totalKgSaved >= 25,
      progress: Math.min(stats.wasteReduction.totalKgSaved / 25, 1) * 100,
      category: "waste-reduction",
      level: "silver",
    },
    {
      id: "community_hero_bronze",
      name: "Héros Communautaire Bronze",
      description: "Partagez 5 articles avec votre communauté",
      icon: "users",
      requiredPoints: 150,
      isUnlocked: stats.community.itemsShared >= 5,
      progress: Math.min(stats.community.itemsShared / 5, 1) * 100,
      category: "community",
      level: "bronze",
    },
    {
      id: "inventory_master_bronze",
      name: "Maître d'Inventaire Bronze",
      description: "Suivez 20 articles dans votre inventaire",
      icon: "list",
      requiredPoints: 120,
      isUnlocked: stats.inventory.totalItemsTracked >= 20,
      progress: Math.min(stats.inventory.totalItemsTracked / 20, 1) * 100,
      category: "inventory",
      level: "bronze",
    },
    {
      id: "scanner_pro_bronze",
      name: "Scanner Pro Bronze",
      description: "Scannez 10 articles avec la reconnaissance d'image",
      icon: "camera",
      requiredPoints: 100,
      isUnlocked: false, // Would be based on actual scan count
      progress: 40, // Mock progress
      category: "scanning",
      level: "bronze",
    },
  ]

  return achievements
}

export function getCurrentChallenges(): Challenge[] {
  // In a real implementation, this would fetch active challenges from the database
  // For now, we'll return mock challenges

  const now = new Date()
  const weekFromNow = new Date(now)
  weekFromNow.setDate(now.getDate() + 7)

  return [
    {
      id: "weekly_bread_challenge",
      name: "Défi du Pain",
      description: "Consommez ou partagez 3 produits de boulangerie avant leur expiration cette semaine",
      icon: "bread",
      startDate: now,
      endDate: weekFromNow,
      isCompleted: false,
      progress: 1,
      goal: 3,
      reward: {
        points: 50,
        badge: {
          id: "bread_savior",
          name: "Sauveur de Pain",
          description: "A sauvé 3 produits de boulangerie du gaspillage en une semaine",
          icon: "bread",
          isEarned: false,
          rarity: "uncommon",
        },
      },
    },
    {
      id: "community_sharing_challenge",
      name: "Défi de Partage",
      description: "Partagez 2 articles avec votre communauté cette semaine",
      icon: "share",
      startDate: now,
      endDate: weekFromNow,
      isCompleted: false,
      progress: 0,
      goal: 2,
      reward: {
        points: 75,
      },
    },
    {
      id: "scanning_challenge",
      name: "Défi de Scan",
      description: "Scannez 5 nouveaux articles pour votre inventaire",
      icon: "camera",
      startDate: now,
      endDate: weekFromNow,
      isCompleted: false,
      progress: 2,
      goal: 5,
      reward: {
        points: 60,
      },
    },
  ]
}

export function getLeaderboard(userId: string, scope: "global" | "friends" | "local"): LeaderboardEntry[] {
  // In a real implementation, this would fetch leaderboard data from the database
  // For now, we'll return mock data

  const mockLeaderboard: LeaderboardEntry[] = [
    {
      userId: "user1",
      username: "EcoWarrior",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 1250,
      level: 12,
      wasteReductionKg: 45.2,
      position: 1,
    },
    {
      userId: "user2",
      username: "GreenHero",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 980,
      level: 10,
      wasteReductionKg: 32.7,
      position: 2,
    },
    {
      userId: userId, // Current user
      username: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 820,
      level: 9,
      wasteReductionKg: 28.5,
      position: 3,
    },
    {
      userId: "user3",
      username: "FoodSaver",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 750,
      level: 8,
      wasteReductionKg: 25.1,
      position: 4,
    },
    {
      userId: "user4",
      username: "EcoChef",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 680,
      level: 7,
      wasteReductionKg: 22.8,
      position: 5,
    },
  ]

  return mockLeaderboard
}
