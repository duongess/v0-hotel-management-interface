"use client"

import { useRouter, usePathname } from "next/navigation"
import {
  Building2,
  CalendarCheck,
  Users,
  CreditCard,
  Users2,
  Package,
  BarChart3,
  Headset,
  LogOut,
  Settings,
  Home,
} from "lucide-react"

interface SidebarProps {
  activeModule?: string
  onLogout?: () => void
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const modules = [
    { id: "dashboard", label: "Bảng Điều Khiển", icon: Home, path: "/bang-dieu-khien" },
    { id: "rooms", label: "Quản Lý Phòng", icon: Building2, path: "/bang-quan-ly-phong" },
    { id: "bookings", label: "Quản Lý Đặt Phòng", icon: CalendarCheck, path: "/bang-quan-ly-dat-phong" },
    { id: "customers", label: "Quản Lý Khách Hàng", icon: Users, path: "/bang-quan-ly-khach-hang" },
    { id: "payments", label: "Quản Lý Thanh Toán", icon: CreditCard, path: "/bang-quan-ly-thanh-toan" },
    { id: "services", label: "Dịch Vụ Bổ Sung", icon: Headset, path: "/dich-vu-bo-sung" },
    { id: "staff", label: "Quản Lý Nhân Viên", icon: Users2, path: "/bang-quan-ly-nhan-vien" },
    { id: "inventory", label: "Quản Lý Kho", icon: Package, path: "/quan-ly-kho" },
    { id: "reports", label: "Báo Cáo & Thống Kê", icon: BarChart3, path: "/bao-cao-thong-ke" },
  ]

  const getActiveModule = () => {
    return modules.find((m) => pathname.includes(m.path))?.id || "dashboard"
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Hotel Pro</h1>
            <p className="text-xs text-sidebar-foreground/60">Quản Lý Khách Sạn</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {modules.map((module) => {
          const Icon = module.icon
          const isActive = getActiveModule() === module.id
          return (
            <button
              key={module.id}
              onClick={() => router.push(module.path)}
              className={`sidebar-link w-full justify-start ${isActive ? "active" : ""}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{module.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <button
          onClick={() => router.push("/cai-dat")}
          className={`sidebar-link w-full justify-start ${pathname.includes("/cai-dat") ? "active" : ""}`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Cài Đặt</span>
        </button>
        <button
          onClick={handleLogout}
          className="sidebar-link w-full justify-start hover:bg-red-500/10 hover:text-red-600"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Đăng Xuất</span>
        </button>
      </div>
    </aside>
  )
}
