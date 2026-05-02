"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function SplashPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<"logo" | "card" | "redirect">("logo")

  useEffect(() => {
    // Phase 1: Show logo for 2 seconds
    const logoTimer = setTimeout(() => {
      setPhase("card")
    }, 2000)

    // Phase 2: Show card for 2.5 seconds then redirect
    const cardTimer = setTimeout(() => {
      setPhase("redirect")
    }, 4500)

    // Phase 3: Redirect to login
    const redirectTimer = setTimeout(() => {
      router.push("/visitor/login")
    }, 5000)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(cardTimer)
      clearTimeout(redirectTimer)
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      {/* Logo */}
      <div
        className={`absolute transition-all duration-700 ease-out ${
          phase === "logo"
            ? "opacity-100 scale-100"
            : "opacity-0 scale-75"
        }`}
      >
        <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32">
          <polygon points="10,10 80,10 70,25 20,25" fill="#22c55e" />
          <polygon points="10,35 60,35 50,50 10,50" fill="#22c55e" />
          <polygon points="10,60 40,60 30,75 10,75" fill="#22c55e" />
        </svg>
      </div>

      {/* Card */}
      <div
        className={`text-center transition-all duration-700 ease-out ${
          phase === "card"
            ? "opacity-100 scale-100"
            : phase === "redirect"
            ? "opacity-0 scale-90"
            : "opacity-0 scale-75"
        }`}
      >
        {/* Credit Card */}
        <div className="relative w-72 h-44 md:w-80 md:h-48 rounded-2xl bg-gradient-to-br from-[#1e293b] to-[#14532d] p-5 shadow-2xl mx-auto">
          {/* Chip */}
          <div className="w-10 h-7 bg-yellow-400 rounded" />
          
          {/* Contactless Icon */}
          <div className="absolute right-5 top-10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                fill="currentColor"
                opacity="0.3"
              />
              <path d="M7 12c0-2.76 2.24-5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M7 8c0-2.76 2.24-5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M7 16c0-2.76 2.24-5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          {/* Card Number */}
          <div className="mt-10 text-white tracking-widest text-sm md:text-base font-mono" dir="ltr">
            9760 **** 5055 7007
          </div>
        </div>

        {/* Text */}
        <p className="mt-6 text-xl md:text-2xl text-white font-medium">
          The Right to <span className="text-green-500">Pay</span>
        </p>
      </div>
    </div>
  )
}
