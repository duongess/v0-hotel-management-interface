"use client"

import { TrendingUp, Users, DollarSign, AlertCircle } from "lucide-react"
import StatsCard from "./stats-card"
import OccupancyChart from "./occupancy-chart"
import RecentBookings from "./recent-bookings"

export default function Dashboard() {
  return (
    <div className="p-8 bg-background min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Bảng Điều Khiển</h1>
        <p className="text-muted-foreground mt-2">Tổng quan về hoạt động khách sạn hôm nay</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Phòng Trống"
          value="12"
          change="+2"
          icon={<AlertCircle className="w-5 h-5" />}
          color="bg-blue-100"
          textColor="text-blue-600"
        />
        <StatsCard
          title="Phòng Đang Sử Dụng"
          value="28"
          change="-3"
          icon={<Users className="w-5 h-5" />}
          color="bg-green-100"
          textColor="text-green-600"
        />
        <StatsCard
          title="Tổng Doanh Thu"
          value="$12,500"
          change="+8%"
          icon={<DollarSign className="w-5 h-5" />}
          color="bg-purple-100"
          textColor="text-purple-600"
        />
        <StatsCard
          title="Tỷ Lệ Chiếm Dụng"
          value="70%"
          change="+5%"
          icon={<TrendingUp className="w-5 h-5" />}
          color="bg-orange-100"
          textColor="text-orange-600"
        />
      </div>

      {/* Charts and Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OccupancyChart />
        </div>
        <div>
          <RecentBookings />
        </div>
      </div>
    </div>
  )
}
