"use client"

import { useState } from "react"
import { ChevronLeft, Home, FileText, Clock, CheckCircle, CreditCard, Building2, Phone, Mail, Globe, Share2, Printer, Heart, HelpCircle, ExternalLink, ChevronDown, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function RenewHealthCardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div dir="rtl" className="min-h-screen bg-[#f5f5f5]">
      {/* Top Banner */}
      <div className="bg-[#8B1538] text-white text-center py-2 text-sm">
        <p>هذه نسخة تجريبية من بوابة &quot;حكومي&quot; الجديدة. يرجى مشاركتنا <span className="underline cursor-pointer">رأيك</span>.</p>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#8B1538] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">ح</span>
                </div>
                <div>
                  <p className="font-bold text-[#8B1538] text-sm">حكومي</p>
                  <p className="text-[10px] text-gray-500">HUKOOMI</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#" className="text-gray-700 hover:text-[#8B1538] text-sm font-medium">الخدمات الإلكترونية</Link>
              <Link href="#" className="text-gray-700 hover:text-[#8B1538] text-sm font-medium">المركز الإعلامي</Link>
              <Link href="#" className="text-gray-700 hover:text-[#8B1538] text-sm font-medium">الدليل</Link>
              <Link href="#" className="text-gray-700 hover:text-[#8B1538] text-sm font-medium">عن قطر</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hidden md:flex text-gray-600">
                <Globe className="h-4 w-4 ml-1" />
                EN
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600">
                <User className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="flex flex-col p-4 gap-3">
              <Link href="#" className="text-gray-700 hover:text-[#8B1538] text-sm font-medium py-2">الخدمات الإلكترونية</Link>
              <Link href="#" className="text-gray-700 hover:text-[#8B1538] text-sm font-medium py-2">المركز الإعلامي</Link>
              <Link href="#" className="text-gray-700 hover:text-[#8B1538] text-sm font-medium py-2">الدليل</Link>
              <Link href="#" className="text-gray-700 hover:text-[#8B1538] text-sm font-medium py-2">عن قطر</Link>
              <div className="flex items-center gap-2 py-2">
                <Globe className="h-4 w-4" />
                <span className="text-sm">English</span>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="flex items-center hover:text-[#8B1538]">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronLeft className="h-4 w-4" />
            <Link href="#" className="hover:text-[#8B1538]">الخدمات الإلكترونية</Link>
            <ChevronLeft className="h-4 w-4" />
            <span className="text-[#8B1538]">تجديد البطاقة الصحية</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-l from-[#8B1538] to-[#6B1030] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">وزارة الصحة العامة</p>
                  <h1 className="text-2xl md:text-3xl font-bold">تجديد البطاقة الصحية</h1>
                </div>
              </div>
              <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl">
                تتيح هذه الخدمة للمستخدمين تجديد البطاقة الصحية إلكترونياً دون الحاجة لزيارة المركز الصحي. يمكنك تجديد بطاقتك الصحية بسهولة من خلال بوابة حكومي.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
                <Printer className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-[#8B1538]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Clock className="h-5 w-5 text-[#8B1538]" />
                  </div>
                  <p className="text-xs text-gray-500">مدة الإنجاز</p>
                  <p className="font-semibold text-gray-800 text-sm">فوري</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-[#8B1538]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <CreditCard className="h-5 w-5 text-[#8B1538]" />
                  </div>
                  <p className="text-xs text-gray-500">الرسوم</p>
                  <p className="font-semibold text-gray-800 text-sm">مجاني</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-[#8B1538]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FileText className="h-5 w-5 text-[#8B1538]" />
                  </div>
                  <p className="text-xs text-gray-500">نوع الخدمة</p>
                  <p className="font-semibold text-gray-800 text-sm">إلكترونية</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-[#8B1538]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="h-5 w-5 text-[#8B1538]" />
                  </div>
                  <p className="text-xs text-gray-500">الصلاحية</p>
                  <p className="font-semibold text-gray-800 text-sm">سنة واحدة</p>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#8B1538]" />
                  وصف الخدمة
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  خدمة تجديد البطاقة الصحية تتيح للمواطنين والمقيمين في دولة قطر تجديد بطاقاتهم الصحية بشكل إلكتروني. البطاقة الصحية ضرورية للحصول على الخدمات الصحية في المرافق الصحية الحكومية والخاصة في قطر.
                </p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#8B1538]" />
                  الشروط والمتطلبات
                </h2>
                <ul className="space-y-3">
                  {[
                    "أن يكون لدى المستخدم بطاقة صحية سارية المفعول أو منتهية الصلاحية",
                    "أن يكون لدى المستخدم رقم هوية قطرية صالح",
                    "أن يكون لدى المستخدم حساب في بوابة حكومي",
                    "تقديم صورة شخصية حديثة بخلفية بيضاء",
                    "دفع رسوم التجديد إن وجدت"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#8B1538]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-3.5 w-3.5 text-[#8B1538]" />
                      </div>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Steps */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#8B1538]" />
                  خطوات التقديم
                </h2>
                <div className="space-y-4">
                  {[
                    "تسجيل الدخول إلى بوابة حكومي باستخدام الهوية الرقمية",
                    "اختيار خدمة تجديد البطاقة الصحية",
                    "مراجعة البيانات الشخصية والتأكد من صحتها",
                    "رفع الصورة الشخصية والمستندات المطلوبة",
                    "مراجعة الطلب وتأكيد التقديم",
                    "استلام البطاقة الصحية الجديدة"
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#8B1538] text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-gray-700 text-sm">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Start Service Button */}
            <Link href="/renew-health-card/apply">
              <Button className="w-full bg-[#8B1538] hover:bg-[#6B1030] text-white py-6 text-lg font-semibold rounded-xl shadow-lg">
                <ExternalLink className="h-5 w-5 ml-2" />
                ابدأ الخدمة
              </Button>
            </Link>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Service Provider */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-[#8B1538]" />
                  الجهة المقدمة للخدمة
                </h3>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-[#8B1538] rounded-lg flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">وزارة الصحة العامة</p>
                    <p className="text-xs text-gray-500">Ministry of Public Health</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-[#8B1538]" />
                  معلومات الاتصال
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-[#8B1538]" />
                    <span className="text-gray-600">16000</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-[#8B1538]" />
                    <span className="text-gray-600">info@moph.gov.qa</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="h-4 w-4 text-[#8B1538]" />
                    <a href="#" className="text-[#8B1538] hover:underline">www.moph.gov.qa</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-[#8B1538]" />
                  هل تحتاج مساعدة؟
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  إذا كنت بحاجة إلى مساعدة أو لديك استفسار، يمكنك التواصل معنا.
                </p>
                <Button variant="outline" className="w-full border-[#8B1538] text-[#8B1538] hover:bg-[#8B1538] hover:text-white">
                  تواصل معنا
                </Button>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-800 mb-4">الأسئلة الشائعة</h3>
                <div className="space-y-3">
                  {[
                    "كم تستغرق عملية تجديد البطاقة الصحية؟",
                    "هل يمكن تجديد البطاقة الصحية للأطفال؟",
                    "ما هي فترة صلاحية البطاقة الصحية؟"
                  ].map((question, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors text-right"
                    >
                      <span>{question}</span>
                      <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1a2e] text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#8B1538] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">ح</span>
                </div>
                <div>
                  <p className="font-bold text-white text-sm">حكومي</p>
                  <p className="text-[10px] text-gray-400">HUKOOMI</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                البوابة الرسمية لحكومة دولة قطر
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">الخدمات الإلكترونية</a></li>
                <li><a href="#" className="hover:text-white">الأخبار والفعاليات</a></li>
                <li><a href="#" className="hover:text-white">عن قطر</a></li>
                <li><a href="#" className="hover:text-white">اتصل بنا</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">خدمات مهمة</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">تجديد البطاقة الصحية</a></li>
                <li><a href="#" className="hover:text-white">تجديد رخصة القيادة</a></li>
                <li><a href="#" className="hover:text-white">خدمات التأشيرات</a></li>
                <li><a href="#" className="hover:text-white">خدمات الإقامة</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">تواصل معنا</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>109</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>info@hukoomi.gov.qa</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} حكومة دولة قطر. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
