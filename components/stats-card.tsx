import type React from "react"
interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  color: string
  textColor: string
}

export default function StatsCard({ title, value, change, icon, color, textColor }: StatsCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-lg ${textColor}`}>{icon}</div>
      </div>
      <p className="text-sm text-green-600 dark:text-green-400 font-medium">{change} từ hôm qua</p>
    </div>
  )
}
