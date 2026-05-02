'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firestore'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, CheckCircle } from 'lucide-react'

interface UserData {
  id: string;
  name: string;
  email: string;
  hasPersonalInfo: boolean;
  currentPage: string;
  time: string;
}

export function CardsByID({ id }: { id: string }) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true)
        const docRef = doc(db, 'orders', id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data() as UserData
          setUserData(data)
        } else {
          setError('No data found for this ID')
        }
      } catch (err) {
        setError('Error fetching data')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [id])

  if (loading) {
    return <div className="text-center py-4">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>
  }

  if (!userData) {
    return <div className="text-center py-4">No data available</div>
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">معلومات المستخدم</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <DetailItem icon={<User className="h-5 w-5" />} label="الاسم" value={userData.name || 'غير متوفر'} />
          <DetailItem icon={<Mail className="h-5 w-5" />} label="البريد الإلكتروني" value={userData.email || 'غير متوفر'} />
        </div>
        <div className="space-y-2">
          <DetailItem icon={<CheckCircle className="h-5 w-5" />} label="الصفحة الحالية" value={userData.currentPage || 'غير متوفر'} />
        </div>
        <div className="col-span-full">
          <Badge variant="secondary" className="text-lg py-1 px-3">
            آخر تحديث: {userData.time || 'غير متوفر'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      {icon}
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </div>
  )
}
