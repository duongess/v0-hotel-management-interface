"use client"

import { Plus, Search, Edit2, Trash2, X, ImageIcon } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface Room {
  id: number
  type: string
  status: "available" | "occupied" | "maintenance" | "cleaning"
  price: number
  floor: number
  amenities: string[]
  maxGuests?: number
  description?: string
  image?: string
}

export default function RoomManagement() {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 101,
      type: "Phòng Đơn",
      status: "available",
      price: 80,
      floor: 1,
      amenities: ["WiFi", "TV", "AC"],
      maxGuests: 1,
      description: "Phòng tiện lợi cho khách đơn",
      image: "/single-hotel-room.jpg",
    },
    {
      id: 102,
      type: "Phòng Đôi",
      status: "occupied",
      price: 120,
      floor: 1,
      amenities: ["WiFi", "TV", "AC", "Minibar"],
      maxGuests: 2,
      description: "Phòng rộng rãi cho cặp đôi",
      image: "/double-hotel-room.jpg",
    },
    {
      id: 103,
      type: "Phòng Đôi",
      status: "maintenance",
      price: 120,
      floor: 1,
      amenities: ["WiFi", "TV"],
      maxGuests: 2,
      image: "/double-hotel-room.jpg",
    },
    {
      id: 201,
      type: "Phòng Suites",
      status: "available",
      price: 200,
      floor: 2,
      amenities: ["WiFi", "TV", "AC", "Jacuzzi"],
      maxGuests: 4,
      description: "Phòng suite sang trọng",
      image: "/luxury-hotel-suite.jpg",
    },
    {
      id: 202,
      type: "Phòng Đôi",
      status: "occupied",
      price: 120,
      floor: 2,
      amenities: ["WiFi", "TV", "AC"],
      maxGuests: 2,
      image: "/double-hotel-room.jpg",
    },
    {
      id: 203,
      type: "Phòng Đơn",
      status: "available",
      price: 80,
      floor: 2,
      amenities: ["WiFi", "TV"],
      maxGuests: 1,
      image: "/single-hotel-room.jpg",
    },
  ])

  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState<Room | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newRoom, setNewRoom] = useState<Room>({
    id: 0,
    type: "Phòng Đơn",
    status: "available",
    price: 80,
    floor: 1,
    amenities: [],
    maxGuests: 1,
    description: "",
    image: "/hotel-room.jpg",
  })

  const openEditModal = (room: Room) => {
    setFormData({ ...room })
    setEditingRoom(room)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingRoom(null)
    setFormData(null)
  }

  const handleSave = () => {
    if (formData && editingRoom) {
      setRooms(rooms.map((r) => (r.id === editingRoom.id ? formData : r)))
      closeModal()
    }
  }

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa phòng này?")) {
      setRooms(rooms.filter((r) => r.id !== id))
    }
  }

  const openAddModal = () => {
    setNewRoom({
      id: Math.max(...rooms.map((r) => r.id), 0) + 1,
      type: "Phòng Đơn",
      status: "available",
      price: 80,
      floor: 1,
      amenities: [],
      maxGuests: 1,
      description: "",
      image: "/hotel-room.jpg",
    })
    setShowAddModal(true)
  }

  const closeAddModal = () => {
    setShowAddModal(false)
  }

  const handleAddRoom = () => {
    setRooms([...rooms, { ...newRoom }])
    closeAddModal()
  }

  const getStatusBadge = (status: string) => {
    const baseClass = "room-status"
    if (status === "available") return `${baseClass} available`
    if (status === "occupied") return `${baseClass} occupied`
    if (status === "cleaning") return `${baseClass} cleaning`
    return `${baseClass} maintenance`
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      available: "Trống",
      occupied: "Đang sử dụng",
      maintenance: "Bảo dưỡng",
      cleaning: "Dọn dẹp",
    }
    return labels[status] || status
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quản Lý Phòng</h1>
            <p className="text-muted-foreground mt-2">Quản lý trạng thái và thông tin phòng</p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Thêm Phòng
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm phòng..."
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Tất cả trạng thái</option>
            <option>Trống</option>
            <option>Đang sử dụng</option>
            <option>Bảo dưỡng</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            {/* Image Section */}
            <div className="relative w-full h-48 bg-muted overflow-hidden">
              {room.image ? (
                <Image src={room.image || "/placeholder.svg"} alt={`Room ${room.id}`} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              <div className="absolute top-3 right-3">
                <span className={getStatusBadge(room.status)}>{getStatusLabel(room.status)}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex-1 flex flex-col">
              <div className="mb-3">
                <h3 className="font-bold text-foreground text-lg">Phòng #{room.id}</h3>
                <p className="text-sm text-muted-foreground">{room.type}</p>
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tầng:</span>
                  <span className="text-sm font-medium text-foreground">{room.floor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sức chứa:</span>
                  <span className="text-sm font-medium text-foreground">{room.maxGuests} khách</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Giá/Đêm:</span>
                  <span className="text-sm font-bold text-primary">${room.price}</span>
                </div>
              </div>

              {room.amenities && room.amenities.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Tiện nghi:</p>
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.map((amenity) => (
                      <span key={amenity} className="bg-muted text-xs px-2 py-1 rounded text-foreground">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 mt-auto pt-4 border-t border-border">
                <button
                  onClick={() => openEditModal(room)}
                  className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-opacity text-sm font-medium flex items-center justify-center gap-1"
                >
                  <Edit2 className="w-4 h-4" />
                  Chỉnh Sửa
                </button>
                <button
                  onClick={() => handleDelete(room.id)}
                  className="flex-1 bg-destructive/10 text-destructive py-2 rounded-lg hover:bg-destructive/20 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && formData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Chỉnh Sửa Phòng #{formData.id}</h2>
              <button onClick={closeModal} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Loại Phòng</label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Sức Chứa (Khách)</label>
                  <input
                    type="number"
                    value={formData.maxGuests || 1}
                    onChange={(e) => setFormData({ ...formData, maxGuests: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mô Tả</label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Trạng Thái</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="available">Trống</option>
                    <option value="occupied">Đang sử dụng</option>
                    <option value="maintenance">Bảo dưỡng</option>
                    <option value="cleaning">Dọn dẹp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Giá/Đêm ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tiện Nghi</label>
                <div className="grid grid-cols-2 gap-3">
                  {["WiFi", "TV", "AC", "Minibar", "Jacuzzi", "Ban công", "Tủ lạnh", "Bình nước nóng"].map(
                    (amenity) => (
                      <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, amenities: [...formData.amenities, amenity] })
                            } else {
                              setFormData({ ...formData, amenities: formData.amenities.filter((a) => a !== amenity) })
                            }
                          }}
                          className="rounded border-border"
                        />
                        <span className="text-sm text-foreground">{amenity}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-border bg-muted/30">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Thêm Phòng Mới</h2>
              <button onClick={closeAddModal} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Số Phòng</label>
                  <input
                    type="number"
                    value={newRoom.id}
                    onChange={(e) => setNewRoom({ ...newRoom, id: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Loại Phòng</label>
                  <input
                    type="text"
                    value={newRoom.type}
                    onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tầng</label>
                  <input
                    type="number"
                    value={newRoom.floor}
                    onChange={(e) => setNewRoom({ ...newRoom, floor: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Sức Chứa (Khách)</label>
                  <input
                    type="number"
                    value={newRoom.maxGuests || 1}
                    onChange={(e) => setNewRoom({ ...newRoom, maxGuests: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Giá/Đêm ($)</label>
                <input
                  type="number"
                  value={newRoom.price}
                  onChange={(e) => setNewRoom({ ...newRoom, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mô Tả</label>
                <textarea
                  value={newRoom.description || ""}
                  onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tiện Nghi</label>
                <div className="grid grid-cols-2 gap-3">
                  {["WiFi", "TV", "AC", "Minibar", "Jacuzzi", "Ban công", "Tủ lạnh", "Bình nước nóng"].map(
                    (amenity) => (
                      <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newRoom.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewRoom({ ...newRoom, amenities: [...newRoom.amenities, amenity] })
                            } else {
                              setNewRoom({ ...newRoom, amenities: newRoom.amenities.filter((a) => a !== amenity) })
                            }
                          }}
                          className="rounded border-border"
                        />
                        <span className="text-sm text-foreground">{amenity}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-border bg-muted/30">
              <button
                onClick={closeAddModal}
                className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleAddRoom}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Thêm Phòng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
