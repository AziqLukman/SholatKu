import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAO0iyUPYbLQH32bU5iekQbFPSLe2WRArQ",
  authDomain: "sholatku-87bce.firebaseapp.com",
  databaseURL: "https://sholatku-87bce-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sholatku-87bce",
  storageBucket: "sholatku-87bce.firebasestorage.app",
  messagingSenderId: "934446752671",
  appId: "1:934446752671:web:c2e2fedc471a0ae52b13aa",
  measurementId: "G-5FGL5Y39LS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
