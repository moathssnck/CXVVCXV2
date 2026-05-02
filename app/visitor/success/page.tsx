"use client"

import { useEffect, useState } from "react"

export default function SuccessPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Clear session data
    localStorage.removeItem("visitorSessionId")
    localStorage.removeItem("visitorDocId")
  }, [])

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center px-5 transition-opacity duration-500 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Success Icon */}
      <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
        <svg
          className="w-12 h-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-2xl text-white font-bold mb-4 text-center">
        تمت العملية بنجاح
      </h1>
      
      <p className="text-white/60 text-center mb-8">
        شكراً لك. سيتم معالجة طلبك قريباً.
      </p>

      <a
        href="/visitor"
        className="px-8 py-3 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all"
      >
        العودة للرئيسية
      </a>
    </div>
  )
}
