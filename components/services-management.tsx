"use client"

import { Plus, Search, Edit2, Trash2, X } from "lucide-react"
import { useState } from "react"

interface Service {
  id: number
  name: string
  category: string
  price: number
  description: string
  status: "available" | "unavailable"
}

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Dịch Vụ Phòng",
      category: "Room Service",
      price: 50,
      description: "Đưa đồ ăn, đồ uống vào phòng",
      status: "available",
    },
    {
      id: 2,
      name: "Spa & Massage",
      category: "Wellness",
      price: 80,
      description: "Dịch vụ spa và massage thư giãn",
      status: "available",
    },
    {
      id: 3,
      name: "Phòng Họp",
      category: "Meeting",
      price: 200,
      description: "Cho thuê phòng họp với trang thiết bị đầy đủ",
      status: "available",
    },
    {
      id: 4,
      name: "Dịch Vụ Đưa Đón",
      category: "Transportation",
      price: 30,
      description: "Dịch vụ đưa đón sân bay, trạm xe",
      status: "available",
    },
    {
      id: 5,
      name: "Giặt Ủi",
      category: "Laundry",
      price: 15,
      description: "Giặt ủi quần áo cho khách",
      status: "available",
    },
    {
      id: 6,
      name: "Hướng Dẫn Du Lịch",
      category: "Tour",
      price: 120,
      description: "Dịch vụ hướng dẫn du lịch thành phố",
      status: "available",
    },
  ])

  const [editingService, setEditingService] = useState<Service | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState<Service | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newService, setNewService] = useState<Service>({
    id: 0,
    name: "",
    category: "Room Service",
    price: 50,
    description: "",
    status: "available",
  })

  const openEditModal = (service: Service) => {
    setFormData({ ...service })
    setEditingService(service)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingService(null)
    setFormData(null)
  }

  const handleSave = () => {
    if (formData && editingService) {
      setServices(services.map((s) => (s.id === editingService.id ? formData : s)))
      closeModal()
    }
  }

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      setServices(services.filter((s) => s.id !== id))
    }
  }

  const openAddModal = () => {
    setNewService({
      id: Math.max(...services.map((s) => s.id), 0) + 1,
      name: "",
      category: "Room Service",
      price: 50,
      description: "",
      status: "available",
    })
    setShowAddModal(true)
  }

  const closeAddModal = () => {
    setShowAddModal(false)
  }

  const handleAddService = () => {
    if (!newService.name.trim()) {
      alert("Vui lòng nhập tên dịch vụ")
      return
    }
    setServices([...services, { ...newService }])
    closeAddModal()
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quản Lý Dịch Vụ Bổ Sung</h1>
            <p className="text-muted-foreground mt-2">Quản lý các dịch vụ bổ sung của khách sạn</p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Thêm Dịch Vụ
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Tất cả danh mục</option>
            <option>Room Service</option>
            <option>Wellness</option>
            <option>Meeting</option>
            <option>Transportation</option>
            <option>Laundry</option>
            <option>Tour</option>
          </select>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Tên Dịch Vụ</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Loại</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Giá</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Mô Tả</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Trạng Thái</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{service.name}</td>
                <td className="px-6 py-4 text-sm text-foreground">{service.category}</td>
                <td className="px-6 py-4 text-sm font-medium text-primary">${service.price}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">{service.description}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      service.status === "available" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {service.status === "available" ? "Có Sẵn" : "Không Có"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm flex gap-2">
                  <button
                    onClick={() => openEditModal(service)}
                    className="text-primary hover:text-primary/80 transition-colors p-1 hover:bg-muted rounded"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-destructive hover:text-destructive/80 transition-colors p-1 hover:bg-muted rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showModal && formData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Chỉnh Sửa Dịch Vụ: {formData.name}</h2>
              <button onClick={closeModal} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tên Dịch Vụ</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Loại</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Room Service</option>
                    <option>Wellness</option>
                    <option>Meeting</option>
                    <option>Transportation</option>
                    <option>Laundry</option>
                    <option>Tour</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Giá ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mô Tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Trạng Thái</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="available">Có Sẵn</option>
                  <option value="unavailable">Không Có</option>
                </select>
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

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Thêm Dịch Vụ Mới</h2>
              <button onClick={closeAddModal} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tên Dịch Vụ *</label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Nhập tên dịch vụ"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Loại *</label>
                  <select
                    value={newService.category}
                    onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Room Service</option>
                    <option>Wellness</option>
                    <option>Meeting</option>
                    <option>Transportation</option>
                    <option>Laundry</option>
                    <option>Tour</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Giá ($) *</label>
                  <input
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mô Tả</label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Nhập mô tả dịch vụ"
                />
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
                onClick={handleAddService}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Thêm Dịch Vụ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
