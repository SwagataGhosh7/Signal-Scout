import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCsB24BP7Sd84wcqCHsjT6fX_JP3ksOW9A",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "signal-scout-31610.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "signal-scout-31610",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "signal-scout-31610.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "59596794607",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:59596794607:web:d987866c0f53edb06c091a",
};

// Initialize Firebase once
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firebaseApp = app;
export const firebaseAuth = auth;
export const firebaseDb = getFirestore(app);
