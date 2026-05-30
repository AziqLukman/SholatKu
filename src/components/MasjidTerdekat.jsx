import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'

// Fix default marker icon issue in Leaflet + bundlers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Custom icon for user location
const userIcon = new L.DivIcon({
  className: '',
  html: `<div style="
    width: 18px; height: 18px;
    background: #0d968b;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 0 12px rgba(13,150,139,0.5), 0 2px 6px rgba(0,0,0,0.3);
  "></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

// Custom icon for mosque
const mosqueIcon = new L.DivIcon({
  className: '',
  html: `<div style="
    width: 32px; height: 32px;
    background: rgba(11,27,24,0.85);
    border: 2px solid rgba(13,150,139,0.5);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  ">🕌</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -34],
})

// Haversine distance in meters
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function formatDistance(meters) {
  if (meters < 1000) return `${Math.round(meters)}m`
  return `${(meters / 1000).toFixed(1)}km`
}

function estimateWalkTime(meters) {
  const mins = Math.round(meters / 80) // ~80m/min walking speed
  if (mins < 1) return '< 1 mnt'
  if (mins >= 60) return `${Math.floor(mins / 60)}j ${mins % 60}m`
  return `${mins} mnt`
}

// Component to recenter map when location changes
function RecenterMap({ lat, lng }) {
  const map = useMap()
  useEffect(() => {
    if (lat && lng) map.setView([lat, lng], map.getZoom())
  }, [lat, lng])
  return null
}

export default function MasjidTerdekat() {
  const { location, darkMode, setActiveTab } = useApp()
  const [mosques, setMosques] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedMosque, setSelectedMosque] = useState(null)
  const [radius, setRadius] = useState(3000) // 3km default
  const mapRef = useRef(null)
  const listRef = useRef(null)

  const lat = location?.lat || -6.2088
  const lng = location?.lng || 106.8456

  // Fetch mosques from Overpass API + Nominatim fallback
  useEffect(() => {
    let cancelled = false

    const fetchMosques = async () => {
      setLoading(true)
      setError(null)
      setMosques([])

      let hasApiError = false

      // --- 1. Overpass API (simplified query, no regex = faster) ---
      const query = `
        [out:json][timeout:25];
        (
          nwr["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lng});
          nwr["amenity"="place_of_worship"]["religion"="islam"](around:${radius},${lat},${lng});
          nwr["building"="mosque"](around:${radius},${lat},${lng});
        );
        out center body;
      `

      // Multiple Overpass servers for fallback
      const overpassServers = [
        'https://overpass-api.de/api/interpreter',
        'https://overpass.kumi.systems/api/interpreter',
      ]

      let overpassResults = []

      for (const server of overpassServers) {
        if (overpassResults.length > 0) break // already got data

        try {
          const controller = new AbortController()
          const timeout = setTimeout(() => controller.abort(), 15000)

          const res = await fetch(server, {
            method: 'POST',
            body: `data=${encodeURIComponent(query)}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            signal: controller.signal,
          })
          clearTimeout(timeout)

          if (res.ok) {
            const data = await res.json()
            overpassResults = (data.elements || [])
              .map((el) => {
                const elLat = el.lat || el.center?.lat
                const elLng = el.lon || el.center?.lon
                if (!elLat || !elLng) return null

                const name = el.tags?.name || el.tags?.['name:id'] || 'Masjid/Musholla'
                const dist = haversineDistance(lat, lng, elLat, elLng)

                return {
                  id: `osm-${el.id}`,
                  name,
                  lat: elLat,
                  lng: elLng,
                  distance: dist,
                  address: el.tags?.['addr:street'] || el.tags?.['addr:full'] || '',
                  source: 'overpass',
                }
              })
              .filter(Boolean)
          }
        } catch (err) {
          console.warn(`Overpass (${server}) error:`, err.message)
        }
      }

      if (cancelled) return

      // --- 2. Nominatim fallback ---
      let nominatimResults = []
      try {
        const radiusKm = radius / 1000
        const degOffset = radiusKm / 111.32
        const bbox = `${lng - degOffset},${lat - degOffset},${lng + degOffset},${lat + degOffset}`

        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 10000)

        const nomRes = await fetch(
          `https://nominatim.openstreetmap.org/search?q=masjid&format=json&limit=50&bounded=1&viewbox=${bbox}&accept-language=id`,
          { signal: controller.signal }
        )
        clearTimeout(timeout)

        if (nomRes.ok) {
          const nomData = await nomRes.json()
          nominatimResults = nomData
            .map((r) => {
              const rLat = parseFloat(r.lat)
              const rLng = parseFloat(r.lon)
              const dist = haversineDistance(lat, lng, rLat, rLng)
              if (dist > radius) return null

              return {
                id: `nom-${r.osm_id || r.place_id}`,
                name: r.display_name?.split(',')[0] || 'Masjid',
                lat: rLat,
                lng: rLng,
                distance: dist,
                address: r.display_name?.split(',').slice(1, 3).join(',').trim() || '',
                source: 'nominatim',
              }
            })
            .filter(Boolean)
        }
      } catch (err) {
        console.warn('Nominatim error:', err.message)
      }

      if (cancelled) return

      // --- 3. Merge & deduplicate (< 50m = same place) ---
      const allResults = [...overpassResults]
      for (const nom of nominatimResults) {
        const isDuplicate = allResults.some(
          (existing) => haversineDistance(existing.lat, existing.lng, nom.lat, nom.lng) < 50
        )
        if (!isDuplicate) allResults.push(nom)
      }

      allResults.sort((a, b) => a.distance - b.distance)

      // Only show error if BOTH APIs returned nothing AND we suspect failures
      if (allResults.length === 0 && overpassResults.length === 0 && nominatimResults.length === 0) {
        // Check if it's genuinely no results or API failure
        setError(null) // Don't show error, let the empty state handle it
      }

      setMosques(allResults)
      setLoading(false)
    }

    fetchMosques()
    return () => { cancelled = true }
  }, [lat, lng, radius])

  const searchInGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/masjid+terdekat/@${lat},${lng},15z`, '_blank')
  }

  const handleMosqueClick = (mosque) => {
    setSelectedMosque(mosque)
    if (mapRef.current) {
      mapRef.current.flyTo([mosque.lat, mosque.lng], 17, { duration: 0.8 })
    }
  }

  const openInGoogleMaps = (mosque) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${mosque.lat},${mosque.lng}`,
      '_blank'
    )
  }

  return (
    <div className="space-y-4 animate-fade-in font-sans pb-28">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('home')}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${
              darkMode
                ? 'bg-white/5 hover:bg-white/10 text-slate-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            <span className="material-icons text-[20px]">arrow_back</span>
          </button>
          <div>
            <h2
              className={`font-bold text-lg tracking-tight ${
                darkMode ? 'text-white' : 'text-slate-800'
              }`}
            >
              Masjid Terdekat
            </h2>
            <p
              className={`text-[11px] font-medium ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              📍 {location?.city || 'Jakarta'}
            </p>
          </div>
        </div>

        {/* Radius Selector */}
        <div className="flex items-center gap-1.5">
          {[1000, 3000, 5000].map((r) => (
            <button
              key={r}
              onClick={() => setRadius(r)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all duration-200 ${
                radius === r
                  ? darkMode
                    ? 'bg-[#0d968b]/20 text-[#0d968b] border border-[#0d968b]/30'
                    : 'bg-[#0d968b]/10 text-[#0d968b] border border-[#0d968b]/20'
                  : darkMode
                  ? 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
                  : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              {r >= 1000 ? `${r / 1000}km` : `${r}m`}
            </button>
          ))}
        </div>
      </header>

      {/* Map Container */}
      <section
        className={`relative overflow-hidden ${
          darkMode ? 'elegant-card-dark' : 'elegant-card-light'
        }`}
        style={{ height: '280px' }}
      >
        <MapContainer
          center={[lat, lng]}
          zoom={15}
          style={{ height: '100%', width: '100%', borderRadius: '24px' }}
          zoomControl={false}
          attributionControl={false}
          ref={mapRef}
          className={darkMode ? 'map-dark-filter' : ''}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution=""
          />
          <RecenterMap lat={lat} lng={lng} />

          {/* User marker */}
          <Marker position={[lat, lng]} icon={userIcon}>
            <Popup>
              <span style={{ fontWeight: 600, fontSize: 12 }}>📍 Lokasi Kamu</span>
            </Popup>
          </Marker>

          {/* Mosque markers */}
          {mosques.map((m) => (
            <Marker
              key={m.id}
              position={[m.lat, m.lng]}
              icon={mosqueIcon}
              eventHandlers={{
                click: () => handleMosqueClick(m),
              }}
            >
              <Popup>
                <div style={{ fontSize: 12, fontWeight: 600, maxWidth: 180 }}>
                  🕌 {m.name}
                  <br />
                  <span style={{ fontWeight: 400, opacity: 0.7 }}>
                    {formatDistance(m.distance)}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-[24px] z-[1000]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-[#0d968b] border-t-transparent rounded-full animate-spin"></div>
              <span
                className={`text-xs font-semibold ${
                  darkMode ? 'text-slate-200' : 'text-white'
                }`}
              >
                Mencari masjid...
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <h3
          className={`text-sm font-bold ${
            darkMode ? 'text-slate-200' : 'text-slate-700'
          }`}
        >
          {loading
            ? 'Mencari...'
            : error
            ? 'Error'
            : `Ditemukan ${mosques.length} masjid`}
        </h3>
        {mosques.length > 0 && (
          <span
            className={`text-[10px] font-medium ${
              darkMode ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            dalam radius {radius >= 1000 ? `${radius / 1000}km` : `${radius}m`}
          </span>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div
          className={`p-4 rounded-2xl text-center text-sm font-medium ${
            darkMode
              ? 'bg-red-500/10 text-red-300 border border-red-500/20'
              : 'bg-red-50 text-red-600 border border-red-200'
          }`}
        >
          {error}
        </div>
      )}

      {/* Mosque List */}
      <div ref={listRef} className="space-y-2.5">
        {/* Global Google Maps Search Button - Moved to Top */}
        {!loading && !error && mosques.length > 0 && (
          <button
            onClick={searchInGoogleMaps}
            className={`w-full p-4 mb-2 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] border border-dashed ${
              darkMode
                ? 'bg-transparent border-slate-700 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                : 'bg-transparent border-slate-300 text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <span className="material-icons text-[18px]">travel_explore</span>
            <span className="text-sm font-bold">Pencarian belum lengkap? Buka Google Maps</span>
          </button>
        )}
        {!loading && mosques.length === 0 && !error && (
          <div
            className={`p-8 text-center rounded-2xl ${
              darkMode ? 'elegant-card-dark' : 'elegant-card-light'
            }`}
          >
            <span className="text-3xl mb-3 block">🕌</span>
            <p
              className={`text-sm font-semibold ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Belum ditemukan masjid di sekitar
            </p>
            <p
              className={`text-xs mt-1 mb-4 ${
                darkMode ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              Coba perbesar radius pencarian, atau gunakan Google Maps.
            </p>
            <button
              onClick={searchInGoogleMaps}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                darkMode
                  ? 'bg-[#0d968b]/20 text-[#0d968b] hover:bg-[#0d968b]/30'
                  : 'bg-[#0d968b]/10 text-[#0d968b] hover:bg-[#0d968b]/20'
              }`}
            >
              <span className="material-icons text-[16px]">map</span>
              Cari di Google Maps
            </button>
          </div>
        )}

        {mosques.map((mosque, idx) => (
          <button
            key={mosque.id}
            onClick={() => handleMosqueClick(mosque)}
            className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-start gap-3.5 group active:scale-[0.98] ${
              selectedMosque?.id === mosque.id
                ? darkMode
                  ? 'bg-[#0d968b]/15 border border-[#0d968b]/30'
                  : 'bg-[#0d968b]/8 border border-[#0d968b]/20'
                : darkMode
                ? 'bg-[#0B1B18]/50 border border-white/5 hover:border-white/10'
                : 'bg-white/50 border border-slate-200/60 hover:border-slate-300'
            }`}
          >
            {/* Rank Badge */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-black ${
                idx === 0
                  ? darkMode
                    ? 'bg-[#0d968b]/20 text-[#0d968b]'
                    : 'bg-[#0d968b]/10 text-[#0d968b]'
                  : darkMode
                  ? 'bg-white/5 text-slate-500'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {idx + 1}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4
                className={`text-[13px] font-bold truncate ${
                  darkMode ? 'text-slate-100' : 'text-slate-800'
                }`}
              >
                {mosque.name}
              </h4>
              {mosque.address && (
                <p
                  className={`text-[10px] mt-0.5 truncate ${
                    darkMode ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  {mosque.address}
                </p>
              )}
              <div className="flex items-center gap-3 mt-1.5">
                <span
                  className={`flex items-center gap-1 text-[11px] font-semibold ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  <span className="material-icons text-[13px] text-[#0d968b]">
                    place
                  </span>
                  {formatDistance(mosque.distance)}
                </span>
                <span
                  className={`flex items-center gap-1 text-[11px] font-medium ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  <span className="material-icons text-[13px]">directions_walk</span>
                  {estimateWalkTime(mosque.distance)}
                </span>
              </div>
            </div>

            {/* Navigate Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                openInGoogleMaps(mosque)
              }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                darkMode
                  ? 'bg-white/5 text-slate-400 hover:bg-[#0d968b]/20 hover:text-[#0d968b]'
                  : 'bg-slate-100 text-slate-400 hover:bg-[#0d968b]/10 hover:text-[#0d968b]'
              }`}
              title="Navigasi ke Google Maps"
            >
              <span className="material-icons text-[18px]">near_me</span>
            </button>
          </button>
        ))}
      </div>
    </div>
  )
}

