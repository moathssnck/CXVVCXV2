import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Right to Pay',
  description: 'نظام الدفع الآمن',
}

export default function VisitorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f3a] via-[#0a1c5c] to-[#05082f]">
      {children}
    </div>
  )
}
