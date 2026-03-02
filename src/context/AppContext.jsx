import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // Dark mode — persisted
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

  // Notifications enabled
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('sholatku-notifications')
    return saved ? JSON.parse(saved) : false
  })

  // Imsak & Sahur notifications
  const [imsakNotifEnabled, setImsakNotifEnabled] = useState(() => {
    const saved = localStorage.getItem('sholatku-imsak-notif')
    return saved ? JSON.parse(saved) : false
  })

  // Haid Mode (menstruation mode for women)
  const [haidMode, setHaidMode] = useState(() => {
    const saved = localStorage.getItem('sholatku-haid-mode')
    return saved ? JSON.parse(saved) : false
  })

  // Ramadhan start date override (format: 'YYYY-MM-DD' or null for auto)
  const [ramadhanStartDate, setRamadhanStartDate] = useState(() => {
    const saved = localStorage.getItem('sholatku-ramadhan-start')
    return saved ? JSON.parse(saved) : null
  })

  // Hafalan Data
  const [hafalanData, setHafalanData] = useState(() => {
    const saved = localStorage.getItem('sholatku-hafalan')
    return saved ? JSON.parse(saved) : {}
  })

  // Persist dark mode
  useEffect(() => {
    localStorage.setItem('sholatku-darkmode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Persist location
  useEffect(() => {
    localStorage.setItem('sholatku-location', JSON.stringify(location))
  }, [location])

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('sholatku-favorites', JSON.stringify(favorites))
  }, [favorites])

  // Persist notifications
  useEffect(() => {
    localStorage.setItem('sholatku-notifications', JSON.stringify(notificationsEnabled))
  }, [notificationsEnabled])

  // Persist imsak notif
  useEffect(() => {
    localStorage.setItem('sholatku-imsak-notif', JSON.stringify(imsakNotifEnabled))
  }, [imsakNotifEnabled])

  // Persist haid mode
  useEffect(() => {
    localStorage.setItem('sholatku-haid-mode', JSON.stringify(haidMode))
  }, [haidMode])

  // Persist ramadhan start date
  useEffect(() => {
    localStorage.setItem('sholatku-ramadhan-start', JSON.stringify(ramadhanStartDate))
  }, [ramadhanStartDate])

  // Persist hafalan data
  useEffect(() => {
    localStorage.setItem('sholatku-hafalan', JSON.stringify(hafalanData))
  }, [hafalanData])

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
      
      return {
        ...prev,
        [nomorSurat]: newSuratHafalan
      }
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
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
