"use client"

import { Search, CheckCircle, Clock, XCircle, Eye } from "lucide-react"
import { useState } from "react"

interface Payment {
  id: string
  bookingId: string
  amount: number
  date: string
  method: string
  status: "paid" | "pending" | "failed"
}

export default function PaymentManagement() {
  const [payments, setPayments] = useState<Payment[]>([
    { id: "PAY001", bookingId: "BK001", amount: 160, date: "2025-11-28", method: "Thẻ Tín Dụng", status: "paid" },
    { id: "PAY002", bookingId: "BK002", amount: 480, date: "2025-11-29", method: "Chuyển Khoản", status: "pending" },
    { id: "PAY003", bookingId: "BK003", amount: 400, date: "2025-11-27", method: "Tiền Mặt", status: "paid" },
    { id: "PAY004", bookingId: "BK004", amount: 1000, date: "2025-11-30", method: "Thẻ Tín Dụng", status: "failed" },
  ])

  const getStatusIcon = (status: string) => {
    if (status === "paid") return <CheckCircle className="w-4 h-4 text-green-600" />
    if (status === "pending") return <Clock className="w-4 h-4 text-yellow-600" />
    return <XCircle className="w-4 h-4 text-red-600" />
  }

  const getStatusColor = (status: string) => {
    if (status === "paid") return "bg-green-100 text-green-800"
    if (status === "pending") return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      paid: "Đã Thanh Toán",
      pending: "Chờ Thanh Toán",
      failed: "Thất Bại",
    }
    return labels[status] || status
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quản Lý Thanh Toán</h1>
            <p className="text-muted-foreground mt-2">Quản lý giao dịch thanh toán liên kết với đặt phòng</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm thanh toán..."
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Tất cả trạng thái</option>
            <option value="paid">Đã Thanh Toán</option>
            <option value="pending">Chờ Thanh Toán</option>
            <option value="failed">Thất Bại</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">ID Thanh Toán</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">ID Đặt Phòng</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Số Tiền</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Ngày</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phương Thức</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Trạng Thái</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-primary">{payment.id}</td>
                <td className="px-6 py-4 text-sm text-foreground">{payment.bookingId}</td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">${payment.amount}</td>
                <td className="px-6 py-4 text-sm text-foreground">{payment.date}</td>
                <td className="px-6 py-4 text-sm text-foreground">{payment.method}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}
                  >
                    {getStatusIcon(payment.status)}
                    {getStatusLabel(payment.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-primary hover:text-primary/80 transition-colors p-1 hover:bg-muted rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Lưu ý:</strong> Thanh toán được quản lý tự động khi tạo đặt phòng. Xem chi tiết thanh toán trong phần
          Quản Lý Đặt Phòng.
        </p>
      </div>
    </div>
  )
}
