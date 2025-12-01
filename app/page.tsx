"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login or dashboard based on login status
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn) {
      router.push("/bang-dieu-khien")
    } else {
      router.push("/login")
    }
  }, [router])

  return null
}
