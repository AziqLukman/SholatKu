import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, database, googleProvider } from '../utils/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { ref, get, update, set } from 'firebase/database';

const AuthContext = createContext(null);

export const LOCAL_KEYS = [
  'sholatku-darkmode', 'sholatku-location', 'sholatku-favorites', 
  'sholatku-notifications', 'sholatku-imsak-notif', 'sholatku-haid-mode', 
  'sholatku-ramadhan-start', 'sholatku-hafalan', 'sholatku-ramadhan-tracker-v1'
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Jangan di-await biar UI nggak nge-hang nungguin database
        migrateDataIfNeeded(currentUser.uid).catch(console.error);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const migrateDataIfNeeded = async (uid) => {
    // Check locally first to prevent unnecessary reads
    if (localStorage.getItem(`sholatku-migrated-${uid}`)) return;

    try {
      const dbRef = ref(database, `users/${uid}/migrated`);
      const snapshot = await get(dbRef);
      
      // If not marked as migrated in Firebase either
      if (!snapshot.exists() || !snapshot.val()) {
        const migrationData = {};
        let hasData = false;
        
        LOCAL_KEYS.forEach(key => {
          const val = localStorage.getItem(key);
          if (val) {
            hasData = true;
            try {
              migrationData[key] = JSON.parse(val);
            } catch (e) {
              migrationData[key] = val;
            }
          }
        });
        
        if (hasData) {
          migrationData.migrated = true;
          migrationData.migratedAt = Date.now();
          await update(ref(database, `users/${uid}`), migrationData);
        } else {
          // If no local data at all, just mark as migrated
          await set(ref(database, `users/${uid}/migrated`), true);
        }
      }
      // Save local flag to avoid checking DB every reload
      localStorage.setItem(`sholatku-migrated-${uid}`, 'true');
    } catch (error) {
      console.error("Migration error:", error);
    }
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);
  
  const logout = async () => {
    try {
      // Hapus semua data dari localStorage supaya bersih pas balik jadi Guest
      LOCAL_KEYS.forEach(key => localStorage.removeItem(key));
      // Sign out dari Firebase
      await signOut(auth);
      // Pilihan opsional: Refresh halaman buat bersihin state/memory React
      window.location.reload();
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  const value = { user, loading, login, register, loginWithGoogle, logout, resetPassword };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
