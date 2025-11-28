"use client"

import { SettingsIcon, AlertCircle, Save, Loader2 } from "lucide-react"
import { useState } from "react"

interface HotelSettings {
  hotelName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  currency: string
  timezone: string
  taxRate: number
}

export default function Settings() {
  const [settings, setSettings] = useState<HotelSettings>({
    hotelName: "Hotel Pro",
    email: "contact@hotelpro.com",
    phone: "+84-901-234-567",
    address: "123 Đường Nguyễn Huệ",
    city: "TP. Hồ Chí Minh",
    country: "Việt Nam",
    currency: "USD",
    timezone: "Asia/Ho_Chi_Minh",
    taxRate: 10,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleEditHotelInfo = () => {
    const newName = prompt("Nhập tên khách sạn:", settings.hotelName)
    const newEmail = prompt("Nhập email:", settings.email)
    const newPhone = prompt("Nhập số điện thoại:", settings.phone)
    const newAddress = prompt("Nhập địa chỉ:", settings.address)
    const newCity = prompt("Nhập thành phố:", settings.city)

    if (newName !== null || newEmail !== null || newPhone !== null || newAddress !== null || newCity !== null) {
      setSettings({
        ...settings,
        ...(newName !== null && { hotelName: newName }),
        ...(newEmail !== null && { email: newEmail }),
        ...(newPhone !== null && { phone: newPhone }),
        ...(newAddress !== null && { address: newAddress }),
        ...(newCity !== null && { city: newCity }),
      })
      alert("✅ Thông tin khách sạn đã được cập nhật!")
    }
  }

  const handleEditSystemSettings = () => {
    const newCurrency = prompt("Nhập loại tiền tệ (ví dụ: USD, VND):", settings.currency)
    const newTimezone = prompt("Nhập múi giờ (ví dụ: Asia/Ho_Chi_Minh):", settings.timezone)
    const newTaxRate = prompt("Nhập tỷ lệ thuế (%):", settings.taxRate.toString())

    if (newCurrency !== null || newTimezone !== null || newTaxRate !== null) {
      setSettings({
        ...settings,
        ...(newCurrency !== null && { currency: newCurrency }),
        ...(newTimezone !== null && { timezone: newTimezone }),
        ...(newTaxRate !== null && { taxRate: Number(newTaxRate) || settings.taxRate }),
      })
      alert("✅ Cài đặt hệ thống đã được cập nhật!")
    }
  }

  const handleSaveAll = async () => {
    setIsSaving(true)
    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
    alert("✅ Tất cả cài đặt đã được lưu thành công!")
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <SettingsIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Cài Đặt Hệ Thống</h1>
          </div>
          <p className="text-muted-foreground">Quản lý thông tin khách sạn, cài đặt hệ thống và tùy chọn khác</p>
        </div>

        {/* Hotel Information Section */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Thông Tin Khách Sạn</h2>
            <button
              onClick={handleEditHotelInfo}
              className="text-primary hover:text-primary/80 transition-colors font-medium text-sm hover:underline"
            >
              Chỉnh sửa
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Tên Khách Sạn</p>
              <p className="text-foreground font-medium">{settings.hotelName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="text-foreground font-medium">{settings.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Số Điện Thoại</p>
              <p className="text-foreground font-medium">{settings.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Địa Chỉ</p>
              <p className="text-foreground font-medium">{settings.address}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Thành Phố</p>
              <p className="text-foreground font-medium">{settings.city}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Quốc Gia</p>
              <p className="text-foreground font-medium">{settings.country}</p>
            </div>
          </div>
        </div>

        {/* System Settings Section */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Cài Đặt Hệ Thống</h2>
            <button
              onClick={handleEditSystemSettings}
              className="text-primary hover:text-primary/80 transition-colors font-medium text-sm hover:underline"
            >
              Chỉnh sửa
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Loại Tiền Tệ</p>
              <p className="text-foreground font-medium">{settings.currency}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Múi Giờ</p>
              <p className="text-foreground font-medium">{settings.timezone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Tỷ Lệ Thuế</p>
              <p className="text-foreground font-medium">{settings.taxRate}%</p>
            </div>
          </div>
        </div>

        {/* Alert Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 flex gap-4">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Ghi Chú</h3>
            <p className="text-sm text-blue-800">
              Các thay đổi được thực hiện tại đây sẽ ảnh hưởng đến toàn bộ hệ thống. Hãy chắc chắn bạn đã xác minh thông
              tin trước khi lưu.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-3">
          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Lưu Tất Cả Cài Đặt
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
