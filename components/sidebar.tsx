"use client"

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
  activeModule: string
  onModuleChange: (module: any) => void
}

export default function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const modules = [
    { id: "dashboard", label: "Bảng Điều Khiển", icon: Home },
    { id: "rooms", label: "Quản Lý Phòng", icon: Building2 },
    { id: "bookings", label: "Quản Lý Đặt Phòng", icon: CalendarCheck },
    { id: "customers", label: "Quản Lý Khách Hàng", icon: Users },
    { id: "payments", label: "Quản Lý Thanh Toán", icon: CreditCard },
    { id: "services", label: "Dịch Vụ Bổ Sung", icon: Headset },
    { id: "staff", label: "Quản Lý Nhân Viên", icon: Users2 },
    { id: "inventory", label: "Quản Lý Kho", icon: Package },
    { id: "reports", label: "Báo Cáo & Thống Kê", icon: BarChart3 },
  ]

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
          const isActive = activeModule === module.id
          return (
            <button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
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
          onClick={() => onModuleChange("settings")}
          className={`sidebar-link w-full justify-start ${activeModule === "settings" ? "active" : ""}`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Cài Đặt</span>
        </button>
        <button className="sidebar-link w-full justify-start">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Đăng Xuất</span>
        </button>
      </div>
    </aside>
  )
}
