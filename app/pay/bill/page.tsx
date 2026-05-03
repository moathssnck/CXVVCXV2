"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

function BillContent() {
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone") || "XXXXXXXX"
  const [selectedAmount, setSelectedAmount] = useState<"full" | "custom" | "minimum">("full")
  const [customAmount, setCustomAmount] = useState("")
  
  const fullAmount = 12.500
  const minimumAmount = 5.000
  
  const getPayAmount = () => {
    switch (selectedAmount) {
      case "full":
        return fullAmount.toFixed(3)
      case "minimum":
        return minimumAmount.toFixed(3)
      case "custom":
        return customAmount || "0.000"
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex flex-col">
      {/* Header */}
      <header className="py-4 px-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/pay" className="w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
          </Link>
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
          {/* Bill Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#6B2D83] via-[#8B4CA0] to-[#D4A574] p-[3px]">
              <div className="w-full h-full rounded-full bg-[#0d0d1a] flex items-center justify-center">
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-white text-2xl font-bold text-center mb-2">
            Bill Details
          </h1>
          <p className="text-gray-400 text-center mb-8 text-sm">
            Mobile Number: +965 {phone}
          </p>

          {/* Bill Card */}
          <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a] mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 text-sm">Current Bill</span>
              <span className="text-[#8B4CA0] text-sm">Due: 15 Jan 2024</span>
            </div>
            <div className="text-center mb-4">
              <span className="text-white text-4xl font-bold">12.500</span>
              <span className="text-gray-400 text-lg ml-2">KWD</span>
            </div>
            <div className="border-t border-[#2a2a4a] pt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Plan Charges</span>
                <span className="text-white">10.000 KWD</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Extra Usage</span>
                <span className="text-white">2.500 KWD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">VAT (0%)</span>
                <span className="text-white">0.000 KWD</span>
              </div>
            </div>
          </div>

          {/* Amount Selection */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-4">Select Amount</p>
            
            {/* Full Amount */}
            <button
              onClick={() => setSelectedAmount("full")}
              className={`w-full flex items-center justify-between p-4 rounded-xl mb-3 border transition-all ${
                selectedAmount === "full" 
                  ? "bg-[#6B2D83]/20 border-[#6B2D83]" 
                  : "bg-[#1a1a2e] border-[#2a2a4a]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedAmount === "full" ? "border-[#8B4CA0]" : "border-gray-500"
                }`}>
                  {selectedAmount === "full" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#8B4CA0]" />
                  )}
                </div>
                <span className="text-white">Full Amount</span>
              </div>
              <span className="text-white font-bold">{fullAmount.toFixed(3)} KWD</span>
            </button>

            {/* Custom Amount */}
            <button
              onClick={() => setSelectedAmount("custom")}
              className={`w-full p-4 rounded-xl mb-3 border transition-all ${
                selectedAmount === "custom" 
                  ? "bg-[#6B2D83]/20 border-[#6B2D83]" 
                  : "bg-[#1a1a2e] border-[#2a2a4a]"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedAmount === "custom" ? "border-[#8B4CA0]" : "border-gray-500"
                  }`}>
                    {selectedAmount === "custom" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#8B4CA0]" />
                    )}
                  </div>
                  <span className="text-white">Custom Amount</span>
                </div>
              </div>
              {selectedAmount === "custom" && (
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full bg-[#0d0d1a] text-white rounded-lg px-4 py-3 text-left placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6B2D83] border border-[#2a2a4a]"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </button>

            {/* Minimum Amount */}
            <button
              onClick={() => setSelectedAmount("minimum")}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                selectedAmount === "minimum" 
                  ? "bg-[#6B2D83]/20 border-[#6B2D83]" 
                  : "bg-[#1a1a2e] border-[#2a2a4a]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedAmount === "minimum" ? "border-[#8B4CA0]" : "border-gray-500"
                }`}>
                  {selectedAmount === "minimum" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#8B4CA0]" />
                  )}
                </div>
                <span className="text-white">Minimum Amount</span>
              </div>
              <span className="text-white font-bold">{minimumAmount.toFixed(3)} KWD</span>
            </button>
          </div>

          {/* Selected Amount Display */}
          <div className="bg-[#1a1a2e] rounded-xl p-4 border border-[#2a2a4a] mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Amount to Pay</span>
              <span className="text-white text-xl font-bold">{getPayAmount()} KWD</span>
            </div>
          </div>

          {/* Pay Button */}
          <button className="w-full bg-gradient-to-r from-[#6B2D83] to-[#8B4CA0] text-white font-bold py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-900/40 mb-4">
            Pay Now
          </button>

          {/* Payment Methods */}
          <div className="flex justify-center gap-4 mt-4">
            <div className="bg-white rounded-lg px-3 py-2">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={40} height={24} />
            </div>
            <div className="bg-white rounded-lg px-3 py-2">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={40} height={24} />
            </div>
            <div className="bg-[#00A4E4] rounded-lg px-3 py-2">
              <span className="text-white font-bold text-sm">KNET</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4">
        <div className="max-w-md mx-auto">
          <p className="text-gray-600 text-xs text-center">
            Copyright © 2024 Zain Group, all rights reserved
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function BillPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <BillContent />
    </Suspense>
  )
}
