import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MyZain - ادفع فاتورتك',
  description: 'سدد فاتورة Zain الخاصة بك بسهولة',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className="bg-[#1a1a2e]">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

