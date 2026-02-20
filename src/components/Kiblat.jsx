import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { calculateQiblaDirection, calculateDistanceToKaabah } from '../utils/qibla'

export default function Kiblat() {
  const { location } = useApp()
  const [deviceHeading, setDeviceHeading] = useState(null)

  const qiblaAngle = calculateQiblaDirection(location.lat, location.lng)
  const distance = calculateDistanceToKaabah(location.lat, location.lng)

  useEffect(() => {
    const handleOrientation = (e) => {
      // iOS uses webkitCompassHeading (degrees from true north, clockwise)
      // Android uses alpha (degrees from arbitrary north, counterclockwise)
      if (e.webkitCompassHeading !== undefined) {
        setDeviceHeading(e.webkitCompassHeading)
      } else if (e.alpha !== null) {
        // Android: alpha is counterclockwise from north
        setDeviceHeading(360 - e.alpha)
      }
    }

    if (window.DeviceOrientationEvent) {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+ butuh izin pengguna
      } else {
        window.addEventListener('deviceorientation', handleOrientation, true)
      }
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true)
    }
  }, [])

  const requestDevicePermission = async () => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission()
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', (e) => {
            if (e.webkitCompassHeading !== undefined) {
              setDeviceHeading(e.webkitCompassHeading)
            } else if (e.alpha !== null) {
              setDeviceHeading(360 - e.alpha)
            }
          }, true)
        }
      } catch {}
    }
  }

  // Needle points to Qibla: rotate by (qibla - heading) so needle aligns with Qibla
  const needleRotation = deviceHeading !== null
    ? qiblaAngle - deviceHeading
    : qiblaAngle

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Arah Kiblat</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {deviceHeading !== null ? 'Kompas mengikuti arah perangkat' : 'Arah relatif dari lokasi Anda'}
        </p>
      </div>

      {/* Kompas */}
      <div className="flex justify-center">
        <div className="relative w-72 h-72 lg:w-80 lg:h-80">
          <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl">
            <circle cx="150" cy="150" r="140" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-300 dark:text-white/10" />
            <circle cx="150" cy="150" r="130" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-200 dark:text-white/5" />
            <circle cx="150" cy="150" r="128" fill="currentColor" className="text-white/80 dark:text-white/5" />

            {[...Array(72)].map((_, i) => {
              const angle = i * 5
              const isMajor = angle % 30 === 0
              const r1 = isMajor ? 115 : 122
              const r2 = 128
              const rad = (angle - 90) * Math.PI / 180
              return (
                <line
                  key={i}
                  x1={150 + r1 * Math.cos(rad)}
                  y1={150 + r1 * Math.sin(rad)}
                  x2={150 + r2 * Math.cos(rad)}
                  y2={150 + r2 * Math.sin(rad)}
                  stroke="currentColor"
                  strokeWidth={isMajor ? 2 : 0.5}
                  className={isMajor ? 'text-slate-500 dark:text-slate-400' : 'text-slate-300 dark:text-white/20'}
                />
              )
            })}

            <text x="150" y="35" textAnchor="middle" className="fill-red-500 font-bold text-lg font-display" fontSize="16">U</text>
            <text x="265" y="155" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 font-display" fontSize="14">T</text>
            <text x="150" y="275" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 font-display" fontSize="14">S</text>
            <text x="35" y="155" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 font-display" fontSize="14">B</text>

            <g transform={`rotate(${needleRotation}, 150, 150)`} className="compass-needle">
              <line x1="150" y1="150" x2="150" y2="45" stroke="#0d968b" strokeWidth="3" strokeLinecap="round" />
              <polygon points="150,40 143,60 157,60" fill="#0d968b" />
              <circle cx="150" cy="42" r="12" fill="#0d968b" opacity="0.2" />
              <text x="150" y="47" textAnchor="middle" fontSize="14">🕋</text>
              <circle cx="150" cy="150" r="6" fill="#0d968b" />
              <circle cx="150" cy="150" r="3" fill="white" />
            </g>
          </svg>
        </div>
      </div>

      {/* Kartu Informasi */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel rounded-xl p-4 text-center">
          <span className="material-icons text-primary text-2xl mb-2 block">navigation</span>
          <p className="text-xs text-slate-400 uppercase tracking-wide">Arah Kiblat</p>
          <p className="text-xl font-bold font-mono text-slate-800 dark:text-white mt-1">{qiblaAngle.toFixed(1)}°</p>
        </div>
        <div className="glass-panel rounded-xl p-4 text-center">
          <span className="material-icons text-primary text-2xl mb-2 block">straighten</span>
          <p className="text-xs text-slate-400 uppercase tracking-wide">Jarak ke Ka'bah</p>
          <p className="text-xl font-bold font-mono text-slate-800 dark:text-white mt-1">{distance.toLocaleString()} km</p>
        </div>
        <div className="glass-panel rounded-xl p-4 text-center">
          <span className="material-icons text-primary text-2xl mb-2 block">my_location</span>
          <p className="text-xs text-slate-400 uppercase tracking-wide">Koordinat</p>
          <p className="text-sm font-mono text-slate-800 dark:text-white mt-1">{location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°</p>
        </div>
      </div>

      {/* Petunjuk */}
      {deviceHeading === null && (
        <div className="glass-panel rounded-lg p-4 flex items-start gap-3">
          <span className="material-icons text-primary">info</span>
          <div>
            <p className="text-sm text-slate-300">
              Buka di perangkat mobile dan putar ponsel agar panah kompas mengikuti arah perangkat secara real-time.
            </p>
            {typeof DeviceOrientationEvent?.requestPermission === 'function' && (
              <button
                onClick={requestDevicePermission}
                className="mt-2 text-sm text-primary font-medium hover:underline"
              >
                Aktifkan Kompas →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
