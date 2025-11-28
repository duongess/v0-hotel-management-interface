"use client"

import { Plus, Search, Eye, Edit2, X, ImageIcon } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface Booking {
  id: string
  guest: string
  room: string
  checkIn: string
  checkOut: string
  status: "booked" | "checkedIn" | "checkedOut" | "pending"
  roomPrice: number
  paymentStatus: "paid" | "pending" | "failed"
  totalExtra: number
  roomImage?: string
}

export default function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "BK001",
      guest: "Nguyễn Văn A",
      room: "101",
      checkIn: "2025-11-28",
      checkOut: "2025-11-30",
      status: "checkedIn",
      roomPrice: 80,
      paymentStatus: "paid",
      totalExtra: 0,
      roomImage: "/single-hotel-room.jpg",
    },
    {
      id: "BK002",
      guest: "Trần Thị B",
      room: "205",
      checkIn: "2025-11-29",
      checkOut: "2025-12-02",
      status: "booked",
      roomPrice: 120,
      paymentStatus: "paid",
      totalExtra: 50,
      roomImage: "/double-hotel-room.jpg",
    },
    {
      id: "BK003",
      guest: "Phạm Công C",
      room: "310",
      checkIn: "2025-12-01",
      checkOut: "2025-12-03",
      status: "pending",
      roomPrice: 200,
      paymentStatus: "pending",
      totalExtra: 0,
      roomImage: "/luxury-hotel-suite.jpg",
    },
  ])

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newBooking, setNewBooking] = useState({
    guestName: "",
    roomId: "",
    checkIn: "",
    checkOut: "",
    paymentStatus: "pending" as "paid" | "pending" | "failed",
  })

  const getPaymentStatusBadge = (status: string) => {
    const baseClass = "payment-status"
    if (status === "paid") return `${baseClass} paid`
    if (status === "pending") return `${baseClass} pending`
    return `${baseClass} failed`
  }

  const getStatusBadge = (status: string) => {
    const baseClass = "inline-flex px-2 py-1 rounded-full text-xs font-semibold"
    if (status === "checkedIn") return `${baseClass} bg-green-100 text-green-800`
    if (status === "booked") return `${baseClass} bg-blue-100 text-blue-800`
    if (status === "pending") return `${baseClass} bg-yellow-100 text-yellow-800`
    return `${baseClass} bg-gray-100 text-gray-800`
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      checkedIn: "Đã Nhập",
      booked: "Đã Đặt",
      checkedOut: "Đã Xuất",
      pending: "Chờ Xử Lý",
    }
    return labels[status] || status
  }

  const calculateDays = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  const calculateTotal = (booking: Booking) => {
    const days = calculateDays(booking.checkIn, booking.checkOut)
    return booking.roomPrice * days + booking.totalExtra
  }

  const openCreateModal = () => {
    setNewBooking({
      guestName: "",
      roomId: "",
      checkIn: "",
      checkOut: "",
      paymentStatus: "pending",
    })
    setShowCreateModal(true)
  }

  const closeCreateModal = () => {
    setShowCreateModal(false)
  }

  const handleCreateBooking = () => {
    if (!newBooking.guestName || !newBooking.roomId || !newBooking.checkIn || !newBooking.checkOut) {
      alert("Vui lòng điền tất cả thông tin bắt buộc")
      return
    }

    const booking: Booking = {
      id: `BK${String(bookings.length + 1).padStart(3, "0")}`,
      guest: newBooking.guestName,
      room: newBooking.roomId,
      checkIn: newBooking.checkIn,
      checkOut: newBooking.checkOut,
      status: "booked",
      roomPrice: 120,
      paymentStatus: newBooking.paymentStatus,
      totalExtra: 0,
      roomImage: "/hotel-room.jpg",
    }

    setBookings([...bookings, booking])
    closeCreateModal()
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quản Lý Đặt Phòng</h1>
            <p className="text-muted-foreground mt-2">Quản lý tất cả các đặt phòng trực tuyến và trực tiếp</p>
          </div>
          <button
            onClick={openCreateModal}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Tạo Đặt Phòng Mới
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng hoặc ID đặt phòng..."
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Tất cả trạng thái</option>
            <option>Đã Đặt</option>
            <option>Đã Nhập</option>
            <option>Chờ Xử Lý</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            {/* Image Section */}
            <div className="relative w-full h-48 bg-muted overflow-hidden">
              {booking.roomImage ? (
                <Image
                  src={booking.roomImage || "/placeholder.svg"}
                  alt={`Room ${booking.room}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              <div className="absolute top-3 right-3">
                <span className={getStatusBadge(booking.status)}>{getStatusLabel(booking.status)}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex-1 flex flex-col">
              <div className="mb-3">
                <h3 className="font-bold text-foreground text-lg">{booking.guest}</h3>
                <p className="text-sm text-muted-foreground">ID: {booking.id}</p>
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Phòng:</span>
                  <span className="text-sm font-medium text-foreground">#{booking.room}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Check-in:</span>
                  <span className="text-sm font-medium text-foreground">{booking.checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Check-out:</span>
                  <span className="text-sm font-medium text-foreground">{booking.checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tổng tiền:</span>
                  <span className="text-sm font-bold text-primary">${calculateTotal(booking)}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Thanh toán:</span>
                  <span className={getPaymentStatusBadge(booking.paymentStatus)}>
                    {booking.paymentStatus === "paid"
                      ? "Đã Thanh Toán"
                      : booking.paymentStatus === "pending"
                        ? "Chờ Thanh Toán"
                        : "Thất Bại"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-auto pt-4 border-t border-border">
                <button
                  onClick={() => {
                    setSelectedBooking(booking)
                    setShowDetailModal(true)
                  }}
                  className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-opacity text-sm font-medium flex items-center justify-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  Xem Chi Tiết
                </button>
                <button className="flex-1 bg-accent/10 text-accent py-2 rounded-lg hover:bg-accent/20 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                  <Edit2 className="w-4 h-4" />
                  Sửa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Chi Tiết Đặt Phòng {selectedBooking.id}</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Khách Hàng</p>
                  <p className="text-lg font-medium text-foreground">{selectedBooking.guest}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phòng</p>
                  <p className="text-lg font-medium text-foreground">#{selectedBooking.room}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check-in</p>
                  <p className="text-lg font-medium text-foreground">{selectedBooking.checkIn}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check-out</p>
                  <p className="text-lg font-medium text-foreground">{selectedBooking.checkOut}</p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-bold text-foreground mb-4">Chi Phí</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-foreground">
                      Giá Phòng/Đêm x {calculateDays(selectedBooking.checkIn, selectedBooking.checkOut)} đêm:
                    </span>
                    <span className="font-medium text-foreground">
                      ${selectedBooking.roomPrice * calculateDays(selectedBooking.checkIn, selectedBooking.checkOut)}
                    </span>
                  </div>
                  {selectedBooking.totalExtra > 0 && (
                    <div className="flex justify-between">
                      <span className="text-foreground">Dịch Vụ Thêm:</span>
                      <span className="font-medium text-foreground">${selectedBooking.totalExtra}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between border-t border-border pt-4">
                  <span className="font-bold text-foreground">Tổng Cộng:</span>
                  <span className="text-xl font-bold text-primary">${calculateTotal(selectedBooking)}</span>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-2">Trạng Thái Thanh Toán</p>
                <div className="flex items-center justify-between">
                  <span className={getPaymentStatusBadge(selectedBooking.paymentStatus)}>
                    {selectedBooking.paymentStatus === "paid" ? "Đã Thanh Toán" : "Chờ Thanh Toán"}
                  </span>
                  {selectedBooking.paymentStatus === "pending" && (
                    <button className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded hover:opacity-90">
                      Xác Nhận Thanh Toán
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-3">Thêm Dịch Vụ</h3>
                <button className="w-full px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors text-sm font-medium">
                  + Thêm Dịch Vụ Bổ Sung
                </button>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-border bg-muted/30">
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Đóng
              </button>
              <button className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity">
                Check-out
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Tạo Đặt Phòng Mới</h2>
              <button
                onClick={closeCreateModal}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tên Khách Hàng *</label>
                <input
                  type="text"
                  value={newBooking.guestName}
                  onChange={(e) => setNewBooking({ ...newBooking, guestName: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Nhập tên khách hàng"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Số Phòng *</label>
                  <input
                    type="text"
                    value={newBooking.roomId}
                    onChange={(e) => setNewBooking({ ...newBooking, roomId: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="VD: 101"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Trạng Thái Thanh Toán *</label>
                  <select
                    value={newBooking.paymentStatus}
                    onChange={(e) => setNewBooking({ ...newBooking, paymentStatus: e.target.value as any })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="pending">Chờ Thanh Toán</option>
                    <option value="paid">Đã Thanh Toán</option>
                    <option value="failed">Thất Bại</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Ngày Check-in *</label>
                  <input
                    type="date"
                    value={newBooking.checkIn}
                    onChange={(e) => setNewBooking({ ...newBooking, checkIn: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Ngày Check-out *</label>
                  <input
                    type="date"
                    value={newBooking.checkOut}
                    onChange={(e) => setNewBooking({ ...newBooking, checkOut: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  Lưu ý: Thanh toán phải được xác nhận trước khi hoàn tất đặt phòng
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-border bg-muted/30">
              <button
                onClick={closeCreateModal}
                className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleCreateBooking}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Tạo Đặt Phòng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
