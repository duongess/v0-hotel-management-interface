"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 4000, guests: 240 },
  { month: "Feb", revenue: 3000, guests: 221 },
  { month: "Mar", revenue: 2000, guests: 229 },
  { month: "Apr", revenue: 2780, guests: 200 },
  { month: "May", revenue: 1890, guests: 229 },
  { month: "Jun", revenue: 2390, guests: 200 },
]

const roomTypeData = [
  { name: "Phòng Đơn", value: 35, fill: "var(--color-chart-1)" },
  { name: "Phòng Đôi", value: 45, fill: "var(--color-chart-2)" },
  { name: "Phòng Suite", value: 20, fill: "var(--color-chart-3)" },
]

export default function ReportsAnalytics() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Báo Cáo & Thống Kê</h1>
        <p className="text-muted-foreground mt-2">Phân tích doanh thu, lượng khách và hiệu suất hoạt động</p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Doanh Thu & Số Lượng Khách</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "none", borderRadius: "8px" }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="var(--color-chart-1)" name="Doanh Thu ($)" />
              <Bar dataKey="guests" fill="var(--color-chart-2)" name="Số Khách" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Room Type Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Phân Bổ Loại Phòng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roomTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {roomTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Occupancy */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Tỷ Lệ Chiếm Dụng Hàng Tháng</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "none", borderRadius: "8px" }}
              labelStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="guests"
              stroke="var(--color-chart-2)"
              strokeWidth={2}
              dot={{ fill: "var(--color-chart-2)" }}
              name="Số Khách"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
