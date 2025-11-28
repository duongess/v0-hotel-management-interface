"use client"

import { Plus, Search, Edit2, Trash2, X, Phone, Mail } from "lucide-react"
import { useState } from "react"

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  idCard: string
  classification: "vip" | "regular" | "blacklist"
  bookings: number
  spent: number
  notes: string[]
}

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0912345678",
      idCard: "001234567890",
      classification: "vip",
      bookings: 5,
      spent: 2400,
      notes: ["Khách thân thiết", "Thích phòng view"],
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0987654321",
      idCard: "001234567891",
      classification: "regular",
      bookings: 3,
      spent: 1200,
      notes: [],
    },
    {
      id: 3,
      name: "Phạm Công C",
      email: "phamcongc@email.com",
      phone: "0901234567",
      idCard: "001234567892",
      classification: "vip",
      bookings: 8,
      spent: 3800,
      notes: ["Khách thân thiết", "Thường đặt suite"],
    },
  ])

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showEditDrawer, setShowEditDrawer] = useState(false)
  const [formData, setFormData] = useState<Customer | null>(null)
  const [newNote, setNewNote] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    idCard: "",
  })

  const openEditDrawer = (customer: Customer) => {
    setFormData({ ...customer })
    setSelectedCustomer(customer)
    setShowEditDrawer(true)
  }

  const closeDrawer = () => {
    setShowEditDrawer(false)
    setSelectedCustomer(null)
    setFormData(null)
    setNewNote("")
  }

  const handleSave = () => {
    if (formData && selectedCustomer) {
      setCustomers(customers.map((c) => (c.id === selectedCustomer.id ? formData : c)))
      closeDrawer()
    }
  }

  const handleAddNote = () => {
    if (formData && newNote.trim()) {
      setFormData({
        ...formData,
        notes: [...formData.notes, newNote],
      })
      setNewNote("")
    }
  }

  const handleDeleteNote = (index: number) => {
    if (formData) {
      setFormData({
        ...formData,
        notes: formData.notes.filter((_, i) => i !== index),
      })
    }
  }

  const openAddModal = () => {
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      idCard: "",
    })
    setShowAddModal(true)
  }

  const closeAddModal = () => {
    setShowAddModal(false)
  }

  const handleAddCustomer = () => {
    if (!newCustomer.name.trim() || !newCustomer.email.trim() || !newCustomer.phone.trim()) {
      alert("Vui lòng điền tất cả thông tin bắt buộc")
      return
    }

    const customer: Customer = {
      id: Math.max(...customers.map((c) => c.id), 0) + 1,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      idCard: newCustomer.idCard,
      classification: "regular",
      bookings: 0,
      spent: 0,
      notes: [],
    }

    setCustomers([...customers, customer])
    closeAddModal()
  }

  const getClassificationColor = (classification: string) => {
    if (classification === "vip") return "bg-purple-100 text-purple-800"
    if (classification === "blacklist") return "bg-red-100 text-red-800"
    return "bg-blue-100 text-blue-800"
  }

  const getClassificationLabel = (classification: string) => {
    const labels: Record<string, string> = {
      vip: "VIP",
      regular: "Thường Xuyên",
      blacklist: "Danh Sách Đen",
    }
    return labels[classification] || classification
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quản Lý Khách Hàng</h1>
            <p className="text-muted-foreground mt-2">Theo dõi thông tin và lịch sử khách hàng</p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Thêm Khách Hàng
          </button>
        </div>

        {/* Search */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng..."
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-foreground text-lg">{customer.name}</h3>
                <p className="text-sm text-muted-foreground">ID: #{customer.id}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditDrawer(customer)}
                  className="text-primary hover:text-primary/80 transition-colors p-1 hover:bg-muted rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="text-destructive hover:text-destructive/80 transition-colors p-1 hover:bg-muted rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getClassificationColor(customer.classification)}`}
              >
                {getClassificationLabel(customer.classification)}
              </span>
            </div>

            <div className="space-y-3 mb-4 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{customer.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{customer.phone}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Số Lần Đặt</p>
                <p className="text-xl font-bold text-primary">{customer.bookings}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tổng Chi Tiêu</p>
                <p className="text-xl font-bold text-accent">${customer.spent}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Drawer */}
      {showEditDrawer && formData && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={closeDrawer} />
          <div className="relative ml-auto w-full max-w-md bg-card h-full overflow-y-auto shadow-lg flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Chỉnh Sửa Khách Hàng</h2>
              <button onClick={closeDrawer} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tên Khách Hàng</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Số Điện Thoại</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">CMND/Hộ Chiếu</label>
                <input
                  type="text"
                  value={formData.idCard}
                  onChange={(e) => setFormData({ ...formData, idCard: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phân Loại Khách</label>
                <select
                  value={formData.classification}
                  onChange={(e) => setFormData({ ...formData, classification: e.target.value as any })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="regular">Thường Xuyên</option>
                  <option value="vip">VIP</option>
                  <option value="blacklist">Danh Sách Đen</option>
                </select>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="font-bold text-foreground mb-3">Ghi Chú</h3>
                <div className="space-y-2 mb-4">
                  {formData.notes.map((note, index) => (
                    <div key={index} className="flex items-start justify-between gap-2 bg-muted/50 p-2 rounded">
                      <p className="text-sm text-foreground">{note}</p>
                      <button
                        onClick={() => handleDeleteNote(index)}
                        className="text-destructive hover:text-destructive/80 transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Thêm ghi chú mới..."
                    className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                  <button
                    onClick={handleAddNote}
                    className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                  >
                    Thêm
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-border bg-muted/30">
              <button
                onClick={closeDrawer}
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

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Thêm Khách Hàng Mới</h2>
              <button onClick={closeAddModal} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tên Khách Hàng *</label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Nhập tên khách hàng"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Nhập email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Số Điện Thoại *</label>
                <input
                  type="tel"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">CMND/Hộ Chiếu</label>
                <input
                  type="text"
                  value={newCustomer.idCard}
                  onChange={(e) => setNewCustomer({ ...newCustomer, idCard: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Nhập CMND/Hộ Chiếu (tùy chọn)"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  Khách hàng mới sẽ được phân loại là "Thường Xuyên" theo mặc định
                </p>
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
                onClick={handleAddCustomer}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Thêm Khách Hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
