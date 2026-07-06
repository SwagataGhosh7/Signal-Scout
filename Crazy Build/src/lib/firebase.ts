import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsB24BP7Sd84wcqCHsjT6fX_JP3ksOW9A",
  authDomain: "signal-scout-31610.firebaseapp.com",
  projectId: "signal-scout-31610",
  storageBucket: "signal-scout-31610.firebasestorage.app",
  messagingSenderId: "59596794607",
  appId: "1:59596794607:web:d987866c0f53edb06c091a"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
