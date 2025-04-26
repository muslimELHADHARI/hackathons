"use client"

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function ConsumptionChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const labels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

  const data = {
    labels,
    datasets: [
      {
        label: "Pain (baguettes)",
        data: [2, 1, 2, 1, 2, 3, 2],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
      },
      {
        label: "Fruits (kg)",
        data: [0.5, 0.7, 0.3, 0.6, 0.4, 1.2, 0.8],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
      {
        label: "Légumes (kg)",
        data: [0.8, 0.6, 1.0, 0.7, 0.9, 1.5, 1.1],
        backgroundColor: "rgba(249, 115, 22, 0.8)",
      },
    ],
  }

  return <Bar options={options} data={data} height={300} />
}
