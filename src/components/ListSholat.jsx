import React from 'react'
import { useApp } from '../context/AppContext'
import { useCountdown } from '../hooks/useCountdown'

export default function ListSholat() {
  const { prayerTimes, setActiveTab, darkMode } = useApp()
  const { currentPrayer, nextPrayer } = useCountdown(prayerTimes)

  if (!prayerTimes) {
    return (
      <div className="animate-pulse space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`h-14 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-slate-200/50'}`}></div>
        ))}
      </div>
    )
  }

  // Filter only the 5 fardhu prayers + Imsak/Terbit for horizontal timeline
  const mainPrayerNames = ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya']
  const timelinePrayers = prayerTimes.filter(p => mainPrayerNames.includes(p.name))

  // Full list including Imsak/Terbit for detail section
  const allPrayers = prayerTimes

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h3 className={`text-sm font-bold uppercase tracking-wider ${
          darkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Jadwal Sholat Hari Ini
        </h3>
        <button
          onClick={() => setActiveTab('schedule')}
          className="text-[10px] text-primary hover:text-primary-dark transition-colors font-bold uppercase tracking-widest"
        >
          Bulanan →
        </button>
      </div>

      {/* HORIZONTAL TIMELINE ROAD */}
      <section className={`py-3 px-4 z-10 transition-colors duration-300 ${
        darkMode ? 'glass-clay-dark' : 'glass-clay-light'
      }`}>
        <div className="flex justify-between items-center gap-1">
          {timelinePrayers.map((prayer, i) => {
            const isActive = currentPrayer?.name === prayer.name
            const isNext = nextPrayer?.name === prayer.name
            const isPast = !isActive && !isNext && isTimePast(prayer.time)

            return (
              <div
                key={prayer.name}
                className="flex flex-col items-center flex-1 relative transition-all duration-300"
              >
                {/* Connector line */}
                {i > 0 && (
                  <div className={`absolute top-4 -left-1/2 w-full h-[1px] -z-[1] ${
                    darkMode ? 'bg-slate-800/60' : 'bg-slate-200/50'
                  }`}></div>
                )}

                {/* Prayer capsule */}
                <div className={`flex flex-col items-center py-1.5 px-2 rounded-full transition-all duration-300 text-center ${
                  isActive
                    ? darkMode
                      ? 'bg-primary/15 text-primary border border-primary/25 shadow-md'
                      : 'bg-white text-primary border border-primary/20 shadow-[0_3px_12px_rgba(13,150,139,0.08)]'
                    : isNext
                      ? darkMode
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-amber-50 text-amber-600 border border-amber-200/50'
                      : isPast
                        ? 'opacity-35 scale-90'
                        : 'opacity-55 scale-95'
                }`}>
                  <span className={`text-[9px] uppercase tracking-wider font-bold ${
                    isActive ? 'text-primary' : isNext ? 'text-amber-500' : 'text-slate-500'
                  }`}>
                    {prayer.name}
                  </span>
                  <span className="font-mono text-[10.5px] font-black mt-0.5">
                    {prayer.time}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* DETAIL LIST — Semua waktu sholat termasuk Imsak/Terbit */}
      <div className={`overflow-hidden divide-y rounded-2xl transition-colors duration-300 ${
        darkMode
          ? 'bg-white/5 divide-white/5 border border-white/10'
          : 'bg-white/50 divide-slate-100 border border-slate-200'
      }`}>
        {allPrayers.map((prayer) => {
          const isCurrent = currentPrayer?.name === prayer.name && prayer.name !== 'Imsak' && prayer.name !== 'Terbit'
          const isNext = nextPrayer?.name === prayer.name
          const isPast = !isCurrent && !isNext && isTimePast(prayer.time)

          if (isCurrent) {
            return (
              <div key={prayer.name} className={`relative flex items-center justify-between p-4 border-l-4 border-accent-gold ${
                darkMode
                  ? 'bg-accent-gold/5'
                  : 'bg-gradient-to-r from-amber-50 to-amber-50/30'
              }`}>
                <div className="flex items-center space-x-3 relative z-10">
                  <div className="relative">
                    <span className="material-icons text-accent-gold">{prayer.icon}</span>
                    <div className="absolute inset-0 bg-accent-gold/20 blur-md rounded-full"></div>
                  </div>
                  <div>
                    <span className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                      {prayer.name}
                    </span>
                    <span className="text-[10px] text-accent-gold ml-2 font-bold px-2 py-0.5 rounded-full bg-accent-gold/10 border border-accent-gold/20">
                      Sekarang
                    </span>
                  </div>
                </div>
                <span className={`font-mono font-bold text-lg gold-glow ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {prayer.time}
                </span>
              </div>
            )
          }

          if (isNext) {
            return (
              <div key={prayer.name} className={`flex items-center justify-between p-4 border-l-2 border-primary/50 ${
                darkMode ? 'bg-primary/5' : 'bg-primary/5'
              } hover:bg-primary/10 transition-colors`}>
                <div className="flex items-center space-x-3">
                  <span className="material-icons text-primary">{prayer.icon}</span>
                  <span className="text-primary font-semibold">{prayer.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-primary font-bold">{prayer.time}</span>
                  <p className="text-[10px] text-primary/70 uppercase tracking-wide">Berikutnya</p>
                </div>
              </div>
            )
          }

          return (
            <div key={prayer.name} className={`flex items-center justify-between p-4 transition-colors group ${
              isPast ? 'opacity-40' : ''
            } ${darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
              <div className="flex items-center space-x-3">
                <span className="material-icons text-slate-400 group-hover:text-primary transition-colors">{prayer.icon}</span>
                <span className={`font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{prayer.name}</span>
              </div>
              <span className={`font-mono ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{prayer.time}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function isTimePast(timeStr) {
  const now = new Date()
  const [h, m] = timeStr.split(':').map(Number)
  const prayerDate = new Date()
  prayerDate.setHours(h, m, 0, 0)
  return now > prayerDate
}
