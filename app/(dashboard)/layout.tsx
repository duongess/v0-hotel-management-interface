"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Sidebar from "@/components/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn")
    if (!loggedIn) {
      router.push("/login")
    } else {
      setIsLoggedIn(true)
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  const getModuleFromPath = () => {
    const pathname = typeof window !== "undefined" ? window.location.pathname : ""
    if (pathname.includes("bang-dieu-khien")) return "dashboard"
    if (pathname.includes("bang-quan-ly-phong")) return "rooms"
    if (pathname.includes("bang-quan-ly-dat-phong")) return "bookings"
    if (pathname.includes("bang-quan-ly-khach-hang")) return "customers"
    if (pathname.includes("bang-quan-ly-thanh-toan")) return "payments"
    if (pathname.includes("dich-vu-bo-sung")) return "services"
    if (pathname.includes("bang-quan-ly-nhan-vien")) return "staff"
    if (pathname.includes("quan-ly-kho")) return "inventory"
    if (pathname.includes("bao-cao-thong-ke")) return "reports"
    if (pathname.includes("cai-dat")) return "settings"
    return "dashboard"
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeModule={getModuleFromPath()} onLogout={handleLogout} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
