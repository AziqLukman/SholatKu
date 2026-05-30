import React, { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import { calculateQiblaDirection, calculateDistanceToKaabah } from '../utils/qibla'

export default function Kiblat() {
  const { location, darkMode } = useApp()
  const [displayHeading, setDisplayHeading] = useState(null)
  
  // Ref untuk nyimpen nilai continuous agar rotasi ga muter 360 derajat pas lewat utara
  const lastHeadingRef = useRef(null)
  const continuousHeadingRef = useRef(0)

  const qiblaAngle = calculateQiblaDirection(location.lat, location.lng)
  const distance = calculateDistanceToKaabah(location.lat, location.lng)

  useEffect(() => {
    const handleOrientation = (e) => {
      let rawHeading = null
      if (e.webkitCompassHeading !== undefined) {
        rawHeading = e.webkitCompassHeading
      } else if (e.alpha !== null) {
        // Android: alpha is counterclockwise from north
        rawHeading = 360 - e.alpha
      }

      if (rawHeading !== null) {
        if (lastHeadingRef.current === null) {
          continuousHeadingRef.current = rawHeading
        } else {
          let diff = rawHeading - lastHeadingRef.current
          // Normalize diff to shortest path
          if (diff > 180) diff -= 360
          if (diff < -180) diff += 360
          continuousHeadingRef.current += diff
        }
        lastHeadingRef.current = rawHeading
        setDisplayHeading(continuousHeadingRef.current)
      }
    }

    if (window.DeviceOrientationEvent) {
      if (typeof window.DeviceOrientationEvent.requestPermission !== 'function') {
        window.addEventListener('deviceorientation', handleOrientation, true)
      }
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true)
    }
  }, [])

  const requestDevicePermission = async () => {
    if (typeof window.DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission()
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', (e) => {
            let rawHeading = null
            if (e.webkitCompassHeading !== undefined) {
              rawHeading = e.webkitCompassHeading
            } else if (e.alpha !== null) {
              rawHeading = 360 - e.alpha
            }

            if (rawHeading !== null) {
              if (lastHeadingRef.current === null) {
                continuousHeadingRef.current = rawHeading
              } else {
                let diff = rawHeading - lastHeadingRef.current
                if (diff > 180) diff -= 360
                if (diff < -180) diff += 360
                continuousHeadingRef.current += diff
              }
              lastHeadingRef.current = rawHeading
              setDisplayHeading(continuousHeadingRef.current)
            }
          }, true)
        }
      } catch {}
    }
  }

  // ── Hitung Akurasi (Arah Sebenarnya vs Kiblat) ──
  const actualHeading = displayHeading !== null ? ((displayHeading % 360) + 360) % 360 : null
  
  const getShortestDiff = (a, b) => {
    let d = Math.abs(a - b) % 360
    return d > 180 ? 360 - d : d
  }
  
  const diffFromQibla = actualHeading !== null ? getShortestDiff(actualHeading, qiblaAngle) : null
  // Toleransi 3 derajat untuk nyalain efek "Glowing Sempurna"
  const isAligned = diffFromQibla !== null && diffFromQibla <= 3.0 

  // Rotasi Plat Kompas (Berputar berlawanan arah heading agar Utara sesuai dunia nyata)
  const plateRotation = displayHeading !== null ? -displayHeading : 0

  return (
    <div className="space-y-6 animate-fade-in pb-20 font-sans">
      {/* ═══════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════ */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className={`material-icons text-3xl ${isAligned ? 'text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'text-primary'}`}>
            {isAligned ? 'verified' : 'explore'}
          </span>
          <h2 className={`font-heading text-2xl font-black tracking-tight transition-colors ${
            isAligned ? 'text-emerald-500' : darkMode ? 'text-white' : 'text-slate-800'
          }`}>
            {isAligned ? 'Arah Sempurna!' : 'Arah Kiblat'}
          </h2>
        </div>
        <p className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
          isAligned ? 'text-emerald-500/80' : darkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          {displayHeading !== null ? 'Kompas mengikuti arah perangkat' : 'Arah relatif dari lokasi Anda'}
        </p>
      </div>

      {/* ═══════════════════════════════════════════
          KOMPAS UI (PRO MAX)
      ═══════════════════════════════════════════ */}
      <div className="flex justify-center my-8">
        <div className="relative w-80 h-80 flex items-center justify-center">
          
          {/* Outer Glow / Aura saat sejajar Kiblat */}
          <div className={`absolute inset-0 rounded-full transition-all duration-[800ms] ${
            isAligned 
              ? 'bg-emerald-500/15 shadow-[0_0_80px_rgba(16,185,129,0.4)] border border-emerald-400/50 scale-105' 
              : darkMode 
                ? 'bg-slate-800/40 border-4 border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.6)]' 
                : 'bg-white border-4 border-slate-100 shadow-[0_20px_50px_rgba(13,150,139,0.1)]'
          }`} />

          {/* Fixed Center Dot */}
          <div className={`absolute z-30 w-5 h-5 rounded-full shadow-xl flex items-center justify-center transition-colors duration-500 ${
            isAligned ? 'bg-emerald-500' : 'bg-primary'
          }`}>
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>

          {/* Fixed Top Pointer (Arah HP) */}
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
            <div className={`w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-transparent transition-all duration-500 drop-shadow-md ${
              isAligned ? 'border-b-emerald-500 scale-125' : 'border-b-primary'
            }`} />
          </div>

          {/* Rotating Dial */}
          <div 
            className="w-[92%] h-[92%] rounded-full relative z-10 transition-transform duration-[400ms] ease-out will-change-transform"
            style={{ transform: `rotate(${plateRotation}deg)` }}
          >
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {/* Lingkaran dasar */}
              <circle cx="150" cy="150" r="142" fill="none" stroke="currentColor" strokeWidth="1" className={darkMode ? 'text-white/10' : 'text-slate-200'} />
              <circle cx="150" cy="150" r="122" fill="none" stroke="currentColor" strokeWidth="1" className={darkMode ? 'text-white/5' : 'text-slate-100'} />
              
              {/* Ticks (Garis derajat) */}
              {[...Array(72)].map((_, i) => {
                const angle = i * 5
                const isMajor = angle % 30 === 0
                const isCardinal = angle % 90 === 0
                const r1 = isCardinal ? 122 : isMajor ? 128 : 135
                const r2 = 142
                const rad = (angle - 90) * Math.PI / 180
                return (
                  <line
                    key={i}
                    x1={150 + r1 * Math.cos(rad)}
                    y1={150 + r1 * Math.sin(rad)}
                    x2={150 + r2 * Math.cos(rad)}
                    y2={150 + r2 * Math.sin(rad)}
                    stroke="currentColor"
                    strokeWidth={isCardinal ? 3 : isMajor ? 2 : 1}
                    className={isMajor ? (darkMode ? 'text-slate-400' : 'text-slate-400') : (darkMode ? 'text-white/20' : 'text-slate-300')}
                  />
                )
              })}

              {/* Arah Mata Angin (U, T, S, B) */}
              <text x="150" y="38" textAnchor="middle" className={`font-bold font-display transition-opacity duration-500 ${isAligned ? 'fill-emerald-500/30' : 'fill-rose-500'}`} fontSize="22">U</text>
              <text x="264" y="157" textAnchor="middle" className={`font-bold font-display ${darkMode ? 'fill-slate-500' : 'fill-slate-400'}`} fontSize="18">T</text>
              <text x="150" y="276" textAnchor="middle" className={`font-bold font-display ${darkMode ? 'fill-slate-500' : 'fill-slate-400'}`} fontSize="18">S</text>
              <text x="36" y="157" textAnchor="middle" className={`font-bold font-display ${darkMode ? 'fill-slate-500' : 'fill-slate-400'}`} fontSize="18">B</text>

              {/* Indikator Ka'bah di Atas Plat */}
              <g transform={`rotate(${qiblaAngle}, 150, 150)`} className="transition-all duration-500">
                {/* Glow di belakang garis kiblat */}
                {isAligned && (
                  <line x1="150" y1="150" x2="150" y2="40" stroke="#10b981" strokeWidth="12" strokeLinecap="round" opacity="0.3" filter="blur(3px)" />
                )}
                
                {/* Garis Kiblat */}
                <line x1="150" y1="150" x2="150" y2="48" stroke={isAligned ? '#10b981' : '#0d968b'} strokeWidth="4" strokeLinecap="round" />
                <polygon points="150,42 144,56 156,56" fill={isAligned ? '#10b981' : '#0d968b'} />
                
                {/* Icon Ka'bah */}
                <circle cx="150" cy="24" r="16" fill={darkMode ? '#1e293b' : '#ffffff'} stroke={isAligned ? '#10b981' : '#0d968b'} strokeWidth="2" />
                <text x="150" y="30" textAnchor="middle" fontSize="16">🕋</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          BENTO LAYOUT INFORMASI
      ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {/* Card 1: Arah Sudut (Full width) */}
        <div className={`col-span-2 rounded-3xl p-5 flex items-center justify-between transition-all duration-500 border ${
          isAligned 
            ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
            : darkMode ? 'glass-clay-dark border-white/5' : 'glass-clay-light border-slate-200/50'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
              isAligned ? 'bg-emerald-500/20 text-emerald-500' : darkMode ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
            }`}>
              <span className="material-icons text-[24px]">
                {isAligned ? 'check_circle' : 'explore'}
              </span>
            </div>
            <div>
              <p className={`text-[10px] font-black uppercase tracking-wider transition-colors ${
                isAligned ? 'text-emerald-500/80' : darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {isAligned ? 'Arah Saat Ini' : 'Arah Kiblat'}
              </p>
              <p className={`text-3xl font-bold font-mono tracking-tighter mt-0.5 transition-colors ${
                isAligned ? 'text-emerald-500' : darkMode ? 'text-white' : 'text-slate-800'
              }`}>
                {qiblaAngle.toFixed(1)}°
              </p>
            </div>
          </div>
          {isAligned && (
             <div className="hidden sm:flex px-3 py-1 bg-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase rounded-lg animate-pulse">
               Sejajar
             </div>
          )}
        </div>

        {/* Card 2: Jarak */}
        <div className={`rounded-3xl p-4 transition-all border ${darkMode ? 'glass-clay-dark border-white/5' : 'glass-clay-light border-slate-200/50'}`}>
          <div className="flex flex-col gap-2">
            <span className="material-icons text-rose-400 text-[22px]">straighten</span>
            <p className={`text-[9px] font-black uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Jarak ke Ka'bah</p>
            <p className={`text-lg font-bold font-mono tracking-tight ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{distance.toLocaleString()} km</p>
          </div>
        </div>

        {/* Card 3: Koordinat */}
        <div className={`rounded-3xl p-4 transition-all border ${darkMode ? 'glass-clay-dark border-white/5' : 'glass-clay-light border-slate-200/50'}`}>
          <div className="flex flex-col gap-2">
            <span className="material-icons text-sky-400 text-[22px]">my_location</span>
            <p className={`text-[9px] font-black uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Koordinat Anda</p>
            <p className={`text-[11px] font-bold font-mono leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Lat: {location.lat.toFixed(4)}°<br/>Lng: {location.lng.toFixed(4)}°
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          PANDUAN & KALIBRASI
      ═══════════════════════════════════════════ */}
      {displayHeading === null ? (
        <div className={`mt-6 rounded-3xl p-5 flex items-start gap-4 transition-all border ${
          darkMode ? 'bg-amber-500/10 border-amber-500/20' : 'bg-amber-50 border-amber-200'
        }`}>
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
            <span className="material-icons animate-spin-slow">screen_rotation</span>
          </div>
          <div>
            <p className={`text-sm font-bold ${darkMode ? 'text-amber-400' : 'text-amber-800'}`}>Menunggu Sensor Kompas</p>
            <p className={`text-[11px] mt-1 leading-relaxed ${darkMode ? 'text-amber-400/80' : 'text-amber-700'}`}>
              Putar ponsel Anda atau berjalan sedikit agar sensor kompas aktif. Jika Anda menggunakan iOS, Anda mungkin perlu memberi izin.
            </p>
            {typeof window.DeviceOrientationEvent?.requestPermission === 'function' && (
              <button
                onClick={requestDevicePermission}
                className="mt-3 px-4 py-2 bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wide rounded-xl active:scale-95 transition-transform"
              >
                Izinkan Akses Sensor
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={`mt-6 text-center px-4 py-3 rounded-2xl border ${
          darkMode ? 'bg-slate-800/30 border-white/5' : 'bg-slate-50 border-slate-200/50'
        }`}>
          <p className={`text-[11px] font-medium leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <span className="font-bold text-primary">💡 Tips Kalibrasi:</span> Jika arah kompas terasa tidak akurat atau melenceng, kalibrasi sensor ponsel Anda dengan memutarnya membentuk <span className="font-bold text-slate-700 dark:text-slate-200">angka 8 (∞)</span> di udara selama beberapa detik.
          </p>
        </div>
      )}
    </div>
  )
}
