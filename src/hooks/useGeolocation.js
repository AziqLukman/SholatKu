import { useState, useEffect } from 'react'

export function useGeolocation() {
  const [position, setPosition] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation tidak didukung browser ini')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        try {
          // Reverse geocode
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=id&zoom=18&addressdetails=1`
          )
          const data = await res.json()
          const addr = data.address || {}

          // Build detailed location: Kelurahan, Kecamatan, Kota
          const kelurahan = addr.village || addr.suburb || addr.neighbourhood || ''
          const kecamatan = addr.city_district || addr.county || ''
          const kota = addr.city || addr.town || addr.municipality || addr.state || ''

          const parts = [kelurahan, kecamatan, kota].filter(Boolean)
          const cityStr = parts.length > 0 ? parts.join(', ') : 'Lokasi Terdeteksi'

          setPosition({ lat: latitude, lng: longitude, city: cityStr })
        } catch {
          setPosition({ lat: latitude, lng: longitude, city: 'Lokasi Terdeteksi' })
        }
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 600000 }
    )
  }, [])

  return { position, error, loading }
}
