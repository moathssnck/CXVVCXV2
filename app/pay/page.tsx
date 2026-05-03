"use client"

import { useState } from "react"
import Image from "next/image"

export default function ZainPayPage() {
  const [phoneNumber, setPhoneNumber] = useState("")

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    if (value.length <= 8) {
      setPhoneNumber(value)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col">
      {/* Header */}
      <header className="py-4 px-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="w-10 h-10 rounded-full bg-[#2a2a4a] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/zain-logo.svg"
              alt="Zain"
              width={80}
              height={32}
              className="h-8 w-auto"
            />
          </div>
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 pt-8">
        <div className="w-full max-w-sm">
          {/* Phone Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#7B3FA0] via-[#9B5AC4] to-[#C49660] p-[3px]">
              <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center">
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                  <rect x="7" y="2" width="10" height="20" rx="2" ry="2"/>
                  <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth={2} strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-white text-2xl font-bold text-center mb-2">
            Pay Your Bills
          </h1>
          <p className="text-gray-400 text-center mb-8 text-sm">
            Enter your Zain mobile number to view and pay your bill.
          </p>

          {/* Phone Input */}
          <div className="mb-6">
            <label className="block text-gray-300 text-sm mb-3">
              Mobile Number
            </label>
            <div className="flex gap-3">
              <div className="flex items-center bg-[#252542] rounded-xl px-4 py-4 gap-2 border border-[#3a3a5a]">
                <Image
                  src="https://flagcdn.com/w40/kw.png"
                  alt="Kuwait"
                  width={28}
                  height={20}
                  className="rounded-sm"
                />
                <span className="text-white text-base font-medium">+965</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="XXXXXXXX"
                className="flex-1 bg-[#252542] text-white rounded-xl px-4 py-4 text-left placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7B3FA0] border border-[#3a3a5a] text-base tracking-wider"
                dir="ltr"
              />
            </div>
          </div>

          {/* Next Button */}
          <button className="w-full bg-gradient-to-r from-[#7B3FA0] to-[#9B5AC4] text-white font-bold py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-900/30">
            Next
          </button>

          {/* Help Link */}
          <div className="mt-6 text-center">
            <a href="#" className="text-[#9B5AC4] text-sm hover:underline">
              Need Help?
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center gap-8 mb-4">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
          <p className="text-gray-600 text-xs text-center">
            Copyright © 2024 Zain Group, all rights reserved
          </p>
        </div>
      </footer>
    </div>
  )
}
