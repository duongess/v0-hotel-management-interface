"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { time: "00:00", occupied: 20, available: 20 },
  { time: "04:00", occupied: 18, available: 22 },
  { time: "08:00", occupied: 15, available: 25 },
  { time: "12:00", occupied: 28, available: 12 },
  { time: "16:00", occupied: 30, available: 10 },
  { time: "20:00", occupied: 28, available: 12 },
  { time: "24:00", occupied: 25, available: 15 },
]

export default function OccupancyChart() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-bold text-foreground mb-6">Tỷ Lệ Chiếm Dụng Phòng</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
          <YAxis stroke="rgba(255,255,255,0.5)" />
          <Tooltip
            contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "none", borderRadius: "8px" }}
            labelStyle={{ color: "#fff" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="occupied"
            stroke="var(--color-chart-1)"
            strokeWidth={2}
            dot={false}
            name="Đang Sử Dụng"
          />
          <Line
            type="monotone"
            dataKey="available"
            stroke="var(--color-chart-2)"
            strokeWidth={2}
            dot={false}
            name="Trống"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
