"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Dashboard from "@/components/dashboard"
import RoomManagement from "@/components/room-management"
import BookingManagement from "@/components/booking-management"
import CustomerManagement from "@/components/customer-management"
import PaymentManagement from "@/components/payment-management"
import StaffManagement from "@/components/staff-management"
import InventoryManagement from "@/components/inventory-management"
import ReportsAnalytics from "@/components/reports-analytics"
import Settings from "@/components/settings"
import ServicesManagement from "@/components/services-management"

type ModuleType =
  | "dashboard"
  | "rooms"
  | "bookings"
  | "customers"
  | "payments"
  | "services"
  | "staff"
  | "inventory"
  | "reports"
  | "settings"

export default function Home() {
  const [activeModule, setActiveModule] = useState<ModuleType>("dashboard")

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard />
      case "rooms":
        return <RoomManagement />
      case "bookings":
        return <BookingManagement />
      case "customers":
        return <CustomerManagement />
      case "payments":
        return <PaymentManagement />
      case "staff":
        return <StaffManagement />
      case "inventory":
        return <InventoryManagement />
      case "reports":
        return <ReportsAnalytics />
      case "services":
        return <ServicesManagement />
      case "settings":
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <main className="flex-1 overflow-auto">{renderModule()}</main>
    </div>
  )
}
