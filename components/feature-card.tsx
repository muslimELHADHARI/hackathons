"use client"

import type { ReactNode } from "react"
import FluidFeatureCard from "@/components/fluid-feature-card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return <FluidFeatureCard icon={icon} title={title} description={description} />
}
