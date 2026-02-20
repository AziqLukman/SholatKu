import React from 'react'
import { useApp } from '../context/AppContext'
import { useCountdown } from '../hooks/useCountdown'

export default function ListSholat() {
  const { prayerTimes, setActiveTab } = useApp()
  const { currentPrayer, nextPrayer } = useCountdown(prayerTimes)

  if (!prayerTimes) {
    return (
      <div className="animate-pulse space-y-3">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-14 bg-white/5 rounded-lg"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 animate-slide-up">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Jadwal Sholat Hari Ini</h3>
        <button onClick={() => setActiveTab('schedule')} className="text-xs text-primary hover:text-primary-dark transition-colors font-medium uppercase tracking-wide">
          Lihat Bulanan
        </button>
      </div>

      <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden divide-y divide-slate-100 dark:divide-white/5">
        {prayerTimes.map((prayer) => {
          const isCurrent = currentPrayer?.name === prayer.name && prayer.name !== 'Imsak' && prayer.name !== 'Terbit'
          const isNext = nextPrayer?.name === prayer.name
          const isPast = !isCurrent && !isNext && isTimePast(prayer.time)

          if (isCurrent) {
            return (
              <div key={prayer.name} className="relative flex items-center justify-between p-5 bg-gradient-to-r from-amber-50 to-amber-50/50 dark:from-background-dark dark:to-background-dark/50 border-l-4 border-accent-gold">
                <div className="absolute inset-0 bg-accent-gold/5 pointer-events-none"></div>
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="relative">
                    <span className="material-icons text-accent-gold">{prayer.icon}</span>
                    <div className="absolute inset-0 bg-accent-gold/20 blur-md rounded-full"></div>
                  </div>
                  <div>
                    <span className="text-slate-800 dark:text-white font-bold text-lg">{prayer.name}</span>
                    <span className="text-xs text-accent-gold ml-2 font-medium px-2 py-0.5 rounded-full bg-accent-gold/10 border border-accent-gold/20">
                      Sekarang
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end relative z-10">
                  <span className="font-mono text-slate-800 dark:text-white font-bold text-xl gold-glow">{prayer.time}</span>
                </div>
              </div>
            )
          }

          if (isNext) {
            return (
              <div key={prayer.name} className="flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 transition-colors border-l-2 border-primary/50">
                <div className="flex items-center space-x-4">
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
            <div key={prayer.name} className={`flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group ${isPast ? 'opacity-50' : ''}`}>
              <div className="flex items-center space-x-4">
                <span className="material-icons text-slate-400 group-hover:text-primary transition-colors">{prayer.icon}</span>
                <span className="text-slate-600 dark:text-slate-300 font-medium">{prayer.name}</span>
              </div>
              <span className="font-mono text-slate-500 dark:text-slate-400">{prayer.time}</span>
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
