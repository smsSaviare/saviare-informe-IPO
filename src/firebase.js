import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDGRVaOG7AKlCvmF3s6ylkQ54vJDt-DsD4",
  authDomain: "saviare-ipo.firebaseapp.com",
  projectId: "saviare-ipo",
  storageBucket: "saviare-ipo.firebasestorage.app",
  messagingSenderId: "414973633783",
  appId: "1:414973633783:web:e5fc3424800e9087215ff2"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)