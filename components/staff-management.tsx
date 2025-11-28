"use client"

import { Plus, Search, Edit2, Trash2, X, Clock, Phone } from "lucide-react"
import { useState } from "react"

interface StaffMember {
  id: number
  name: string
  position: string
  shift: string
  phone: string
  status: "Active" | "On Leave"
  email?: string
  salary?: number
  startDate?: string
}

export default function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: 1,
      name: "Lê Minh Khôi",
      position: "Front Desk",
      shift: "Morning (6:00 - 14:00)",
      phone: "0912345678",
      status: "Active",
      email: "khoi@hotel.com",
      salary: 1200,
      startDate: "2022-01-15",
    },
    {
      id: 2,
      name: "Đỗ Thị Linh",
      position: "Housekeeping",
      shift: "Day (8:00 - 16:00)",
      phone: "0987654321",
      status: "Active",
      email: "linh@hotel.com",
      salary: 1000,
      startDate: "2021-06-20",
    },
    {
      id: 3,
      name: "Võ Tuấn Kiệt",
      position: "Manager",
      shift: "Flexible",
      phone: "0901234567",
      status: "Active",
      email: "kiet@hotel.com",
      salary: 2000,
      startDate: "2020-03-10",
    },
    {
      id: 4,
      name: "Ngô Huy Cường",
      position: "Maintenance",
      shift: "Evening (14:00 - 22:00)",
      phone: "0909090909",
      status: "On Leave",
      email: "cuong@hotel.com",
      salary: 1100,
      startDate: "2021-09-05",
    },
  ])

  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState<StaffMember | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newStaff, setNewStaff] = useState({
    name: "",
    position: "Front Desk",
    shift: "Day (8:00 - 16:00)",
    phone: "",
    email: "",
    salary: 1000,
    startDate: new Date().toISOString().split("T")[0],
  })

  const openEditModal = (member: StaffMember) => {
    setFormData({ ...member })
    setEditingStaff(member)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingStaff(null)
    setFormData(null)
  }

  const handleSave = () => {
    if (formData && editingStaff) {
      setStaff(staff.map((s) => (s.id === editingStaff.id ? formData : s)))
      closeModal()
    }
  }

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      setStaff(staff.filter((s) => s.id !== id))
    }
  }

  const openAddModal = () => {
    setNewStaff({
      name: "",
      position: "Front Desk",
      shift: "Day (8:00 - 16:00)",
      phone: "",
      email: "",
      salary: 1000,
      startDate: new Date().toISOString().split("T")[0],
    })
    setShowAddModal(true)
  }

  const closeAddModal = () => {
    setShowAddModal(false)
  }

  const handleAddStaff = () => {
    if (!newStaff.name.trim() || !newStaff.phone.trim() || !newStaff.email.trim()) {
      alert("Vui lòng điền tất cả thông tin bắt buộc")
      return
    }

    const staffMember: StaffMember = {
      id: Math.max(...staff.map((s) => s.id), 0) + 1,
      name: newStaff.name,
      position: newStaff.position,
      shift: newStaff.shift,
      phone: newStaff.phone,
      email: newStaff.email,
      salary: newStaff.salary,
      startDate: newStaff.startDate,
      status: "Active",
    }

    setStaff([...staff, staffMember])
    closeAddModal()
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quản Lý Nhân Viên</h1>
            <p className="text-muted-foreground mt-2">Theo dõi lịch làm việc và hiệu suất nhân viên</p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Thêm Nhân Viên
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm nhân viên..."
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Tất cả</option>
            <option>Front Desk</option>
            <option>Housekeeping</option>
            <option>Manager</option>
            <option>Maintenance</option>
          </select>
        </div>
      </div>

      {/* Staff Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {staff.map((member) => (
          <div
            key={member.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-foreground text-lg">{member.name}</h3>
                <p className="text-sm text-accent font-medium">{member.position}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(member)}
                  className="text-primary hover:text-primary/80 transition-colors p-1 hover:bg-muted rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="text-destructive hover:text-destructive/80 transition-colors p-1 hover:bg-muted rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{member.shift}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{member.phone}</span>
              </div>
            </div>

            <div>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                  member.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {member.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Staff Modal */}
      {showModal && formData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Chỉnh Sửa Nhân Viên: {formData.name}</h2>
              <button onClick={closeModal} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tên</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Vị Trí</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Front Desk</option>
                    <option>Housekeeping</option>
                    <option>Manager</option>
                    <option>Maintenance</option>
                    <option>Chef</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email || ""}
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Ca Làm Việc</label>
                  <select
                    value={formData.shift}
                    onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Morning (6:00 - 14:00)</option>
                    <option>Day (8:00 - 16:00)</option>
                    <option>Evening (14:00 - 22:00)</option>
                    <option>Night (22:00 - 6:00)</option>
                    <option>Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Trạng Thái</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Active</option>
                    <option>On Leave</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Lương ($)</label>
                  <input
                    type="number"
                    value={formData.salary || 0}
                    onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Ngày Bắt Đầu</label>
                  <input
                    type="date"
                    value={formData.startDate || ""}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
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

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Thêm Nhân Viên Mới</h2>
              <button onClick={closeAddModal} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tên *</label>
                  <input
                    type="text"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Nhập tên nhân viên"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Vị Trí *</label>
                  <select
                    value={newStaff.position}
                    onChange={(e) => setNewStaff({ ...newStaff, position: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Front Desk</option>
                    <option>Housekeeping</option>
                    <option>Manager</option>
                    <option>Maintenance</option>
                    <option>Chef</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <input
                    type="email"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Nhập email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Số Điện Thoại *</label>
                  <input
                    type="tel"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Ca Làm Việc</label>
                  <select
                    value={newStaff.shift}
                    onChange={(e) => setNewStaff({ ...newStaff, shift: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Morning (6:00 - 14:00)</option>
                    <option>Day (8:00 - 16:00)</option>
                    <option>Evening (14:00 - 22:00)</option>
                    <option>Night (22:00 - 6:00)</option>
                    <option>Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Lương ($)</label>
                  <input
                    type="number"
                    value={newStaff.salary}
                    onChange={(e) => setNewStaff({ ...newStaff, salary: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Ngày Bắt Đầu</label>
                <input
                  type="date"
                  value={newStaff.startDate}
                  onChange={(e) => setNewStaff({ ...newStaff, startDate: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                <p className="text-sm text-blue-800">Nhân viên mới sẽ được đặt trạng thái "Active" theo mặc định</p>
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
                onClick={handleAddStaff}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Thêm Nhân Viên
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
