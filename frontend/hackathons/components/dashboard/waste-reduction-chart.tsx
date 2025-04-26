"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function WasteReductionChart() {
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
        max: 100,
        title: {
          display: true,
          text: "Pourcentage de réduction (%)",
        },
      },
    },
  }

  const labels = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"]

  const data = {
    labels,
    datasets: [
      {
        label: "Réduction du gaspillage",
        data: [10, 25, 38, 52, 63, 68],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        tension: 0.3,
      },
    ],
  }

  return <Line options={options} data={data} height={300} />
}
