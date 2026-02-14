import React from 'react'
import { useApp } from '../context/AppContext'
import { useCountdown } from '../hooks/useCountdown'

export default function BagianUtama() {
  const { prayerTimes, hijriDate, location } = useApp()
  const { formattedTime, nextPrayer, countdown } = useCountdown(prayerTimes)

  return (
    <div className="relative rounded-xl overflow-hidden glass-panel primary-glow p-8 lg:p-12 text-center group animate-fade-in">
      {/* Dekorasi blur */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-700"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-accent-gold/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Lokasi */}
        <div className="flex items-center space-x-2 text-slate-400 dark:text-slate-300 mb-2">
          <span className="material-icons text-sm">location_on</span>
          <span className="uppercase tracking-widest text-xs font-semibold">{location.city}</span>
        </div>

        {/* Tanggal Hijriyah */}
        <div className="text-accent-gold font-medium mb-6">
          {hijriDate || 'Memuat tanggal Hijriyah...'}
        </div>

        {/* Jam Digital */}
        <h2 className="font-mono text-7xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tighter mb-8 leading-none drop-shadow-lg">
          {formattedTime}
        </h2>

        {/* Hitung Mundur */}
        {nextPrayer && (
          <div className="inline-flex items-center space-x-3 bg-background-dark/80 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-slate-300 text-sm">
              Sholat Berikutnya: <span className="text-primary font-bold">{nextPrayer.name}</span>
            </span>
            <span className="text-slate-500 text-sm mx-2">|</span>
            <span className="font-mono text-white text-lg font-bold tabular-nums">{countdown}</span>
          </div>
        )}
      </div>
    </div>
  )
}
