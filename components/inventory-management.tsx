"use client"

import { Plus, Search, Edit2, Trash2, AlertTriangle } from "lucide-react"
import { useState } from "react"

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Giường Đơn",
      quantity: 45,
      minStock: 20,
      supplier: "ABC Furniture",
      lastOrder: "2025-11-15",
      status: "Normal",
    },
    {
      id: 2,
      name: "Tấm Ga Giường",
      quantity: 120,
      minStock: 100,
      supplier: "XYZ Textile",
      lastOrder: "2025-11-20",
      status: "Normal",
    },
    {
      id: 3,
      name: "Đèn Phòng",
      quantity: 15,
      minStock: 30,
      supplier: "Lighting Pro",
      lastOrder: "2025-11-10",
      status: "Low Stock",
    },
    {
      id: 4,
      name: "Khăn Tắm",
      quantity: 200,
      minStock: 150,
      supplier: "Clean Co",
      lastOrder: "2025-11-22",
      status: "Normal",
    },
  ])

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quản Lý Kho</h1>
            <p className="text-muted-foreground mt-2">Quản lý vật tư và thông báo đặt hàng</p>
          </div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Plus className="w-5 h-5" />
            Thêm Vật Tư
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm vật tư..."
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Tất cả</option>
            <option>Normal</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Tên Vật Tư</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Số Lượng</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Tồn Kho Tối Thiểu</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Nhà Cung Cấp</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Lần Đặt Cuối</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Trạng Thái</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {inventory.map((item) => (
              <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{item.name}</td>
                <td className="px-6 py-4 text-sm text-foreground font-semibold">{item.quantity}</td>
                <td className="px-6 py-4 text-sm text-foreground">{item.minStock}</td>
                <td className="px-6 py-4 text-sm text-foreground">{item.supplier}</td>
                <td className="px-6 py-4 text-sm text-foreground">{item.lastOrder}</td>
                <td className="px-6 py-4 text-sm">
                  {item.status === "Low Stock" ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
                      <AlertTriangle className="w-3 h-3" />
                      {item.status}
                    </span>
                  ) : (
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                      {item.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm flex gap-2">
                  <button className="text-primary hover:text-primary/80 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="text-destructive hover:text-destructive/80 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
