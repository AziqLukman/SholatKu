import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { database } from '../utils/firebase'
import { ref, get, set } from 'firebase/database'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const { user } = useAuth()

  // Dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('sholatku-darkmode')
    return saved !== null ? JSON.parse(saved) : true
  })

  // Active tab
  const [activeTab, setActiveTab] = useState('home')

  // Location
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem('sholatku-location')
    return saved ? JSON.parse(saved) : { lat: -6.2088, lng: 106.8456, city: 'Jakarta, Indonesia', provinsi: 'DKI Jakarta', kabkota: 'Kota Jakarta' }
  })

  // Prayer times
  const [prayerTimes, setPrayerTimes] = useState(null)
  const [hijriDate, setHijriDate] = useState(null)
  const [loading, setLoading] = useState(true)

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('sholatku-favorites')
    return saved ? JSON.parse(saved) : []
  })

  // Notifications
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('sholatku-notifications')
    return saved ? JSON.parse(saved) : false
  })

  // Imsak & Sahur
  const [imsakNotifEnabled, setImsakNotifEnabled] = useState(() => {
    const saved = localStorage.getItem('sholatku-imsak-notif')
    return saved ? JSON.parse(saved) : false
  })

  // Haid Mode
  const [haidMode, setHaidMode] = useState(() => {
    const saved = localStorage.getItem('sholatku-haid-mode')
    return saved ? JSON.parse(saved) : false
  })

  // Ramadhan start date
  const [ramadhanStartDate, setRamadhanStartDate] = useState(() => {
    const saved = localStorage.getItem('sholatku-ramadhan-start')
    return saved ? JSON.parse(saved) : null
  })

  // Hafalan Data
  const [hafalanData, setHafalanData] = useState(() => {
    const saved = localStorage.getItem('sholatku-hafalan')
    return saved ? JSON.parse(saved) : {}
  })

  // AI Modal State
  const [isAiOpen, setAiOpen] = useState('hidden')

  // Load cloud data when user logs in
  useEffect(() => {
    if (user) {
      const loadCloudData = async () => {
        try {
          const snap = await get(ref(database, `users/${user.uid}`))
          if (snap.exists()) {
            const data = snap.val()
            if (data['sholatku-darkmode'] !== undefined) setDarkMode(data['sholatku-darkmode'])
            if (data['sholatku-location']) setLocation(data['sholatku-location'])
            if (data['sholatku-favorites']) setFavorites(data['sholatku-favorites'])
            if (data['sholatku-notifications'] !== undefined) setNotificationsEnabled(data['sholatku-notifications'])
            if (data['sholatku-imsak-notif'] !== undefined) setImsakNotifEnabled(data['sholatku-imsak-notif'])
            if (data['sholatku-haid-mode'] !== undefined) setHaidMode(data['sholatku-haid-mode'])
            if (data['sholatku-ramadhan-start'] !== undefined) setRamadhanStartDate(data['sholatku-ramadhan-start'])
            if (data['sholatku-hafalan']) setHafalanData(data['sholatku-hafalan'])
          }
        } catch (e) {
          console.error("Failed to load cloud data", e)
        }
      }
      loadCloudData()
    }
  }, [user])

  // Helper function for dual-write
  const saveState = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
    if (user) {
      set(ref(database, `users/${user.uid}/${key}`), value).catch(console.error)
    }
  }

  // Dual-write Effects
  useEffect(() => {
    saveState('sholatku-darkmode', darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => saveState('sholatku-location', location), [location])
  useEffect(() => saveState('sholatku-favorites', favorites), [favorites])
  useEffect(() => saveState('sholatku-notifications', notificationsEnabled), [notificationsEnabled])
  useEffect(() => saveState('sholatku-imsak-notif', imsakNotifEnabled), [imsakNotifEnabled])
  useEffect(() => saveState('sholatku-haid-mode', haidMode), [haidMode])
  useEffect(() => saveState('sholatku-ramadhan-start', ramadhanStartDate), [ramadhanStartDate])
  useEffect(() => saveState('sholatku-hafalan', hafalanData), [hafalanData])

  const toggleHafalan = (nomorSurat, nomorAyat) => {
    setHafalanData(prev => {
      const suratHafalan = prev[nomorSurat] || []
      const isHafal = suratHafalan.includes(nomorAyat)
      
      let newSuratHafalan
      if (isHafal) {
        newSuratHafalan = suratHafalan.filter(a => a !== nomorAyat)
      } else {
        newSuratHafalan = [...suratHafalan, nomorAyat]
      }
      
      return { ...prev, [nomorSurat]: newSuratHafalan }
    })
  }

  const toggleDarkMode = () => setDarkMode(prev => !prev)

  const addFavorite = (loc) => {
    setFavorites(prev => {
      if (prev.find(f => f.lat === loc.lat && f.lng === loc.lng)) return prev
      return [...prev, loc]
    })
  }

  const removeFavorite = (loc) => {
    setFavorites(prev => prev.filter(f => !(f.lat === loc.lat && f.lng === loc.lng)))
  }

  const value = {
    darkMode, toggleDarkMode,
    activeTab, setActiveTab,
    location, setLocation,
    prayerTimes, setPrayerTimes,
    hijriDate, setHijriDate,
    loading, setLoading,
    favorites, addFavorite, removeFavorite,
    notificationsEnabled, setNotificationsEnabled,
    imsakNotifEnabled, setImsakNotifEnabled,
    haidMode, setHaidMode,
    ramadhanStartDate, setRamadhanStartDate,
    hafalanData, toggleHafalan,
    isAiOpen, setAiOpen,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
