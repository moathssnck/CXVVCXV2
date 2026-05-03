"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"

export default function ZainPayPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phoneNumber) {
      setError("الرجاء إدخال رقم الهاتف")
      return
    }
    if (!/^[0-9]{8}$/.test(phoneNumber)) {
      setError("الرجاء إدخال رقم هاتف صحيح")
      return
    }
    setError("")
    // Handle payment logic
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    if (value.length <= 8) {
      setPhoneNumber(value)
      setError("")
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col" dir="rtl">
      {/* Header */}
      <header className="bg-black py-3 px-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-6 h-6">
                <circle cx="50" cy="50" r="45" fill="#6B2D83" />
                <circle cx="50" cy="35" r="12" fill="white" />
                <path d="M30 70 Q50 55 70 70 Q70 85 50 85 Q30 85 30 70" fill="white" />
              </svg>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <ZainLogo />
          </div>
          <div className="w-8" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 pt-12 pb-8">
        <div className="w-full max-w-md">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6B2D83] to-[#8B4513] flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-white text-2xl font-bold text-center mb-2">
            ادفع فاتورتك
          </h1>
          <p className="text-gray-400 text-center mb-8 text-sm">
            أدخل رقم هاتفك لعرض وسداد فاتورتك
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm mb-2">
                رقم الهاتف
              </label>
              <div className="flex gap-2">
                <div className="flex items-center bg-[#2a2a4a] rounded-lg px-4 py-3 gap-2">
                  <Image
                    src="https://flagcdn.com/w40/kw.png"
                    alt="Kuwait"
                    width={24}
                    height={16}
                    className="rounded-sm"
                  />
                  <span className="text-white text-sm">965+</span>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="XXXXXXXX"
                  className="flex-1 bg-[#2a2a4a] text-white rounded-lg px-4 py-3 text-left placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6B2D83] transition-all"
                  dir="ltr"
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6B2D83] to-[#9B4DCA] text-white font-bold py-4 rounded-full text-lg hover:opacity-90 transition-opacity"
            >
              التالي
            </button>
          </form>

          {/* Help Link */}
          <div className="mt-8 text-center">
            <a
              href="#"
              className="text-[#9B4DCA] text-sm hover:underline"
            >
              هل تحتاج مساعدة؟
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
          <p className="text-gray-500 text-xs text-center">
            © {new Date().getFullYear()} Zain Kuwait. جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  )
}

function ZainLogo() {
  return (
    <svg
      viewBox="0 0 120 40"
      className="h-8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="10"
        y="28"
        fill="white"
        fontSize="24"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        zain
      </text>
      <circle cx="100" cy="20" r="8" fill="#6B2D83" />
    </svg>
  )
}
