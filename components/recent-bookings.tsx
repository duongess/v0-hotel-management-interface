export default function RecentBookings() {
  const bookings = [
    { id: 1, guest: "Nguyễn Văn A", room: "101", date: "2025-11-28", status: "Checked In" },
    { id: 2, guest: "Trần Thị B", room: "205", date: "2025-11-28", status: "Booked" },
    { id: 3, guest: "Phạm Công C", room: "310", date: "2025-11-29", status: "Pending" },
    { id: 4, guest: "Bùi Quốc D", room: "401", date: "2025-11-30", status: "Booked" },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-bold text-foreground mb-6">Đặt Phòng Gần Đây</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <p className="font-medium text-foreground">{booking.guest}</p>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  booking.status === "Checked In"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                    : booking.status === "Booked"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                }`}
              >
                {booking.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Phòng {booking.room} • {booking.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
