import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

const DHIKR_TYPES = [
    { name: "Bismillah", arabic: "بِسْمِ اللَّهِ", meaning: "Start with Bismillah" },
    { name: "Subhanallah", arabic: "سُبْحَانَ ٱللَّٰهِ", meaning: "Glory be to Allah" },
    { name: "Alhamdulillah", arabic: "ٱلْحَمْدُ لِلَّٰهِ", meaning: "All praise is due to Allah" },
    { name: "Allahu Akbar", arabic: "ٱللَّٰهُ أَكْبَرُ", meaning: "Allah is the Greatest" },
    { name: "La ilaha illallah", arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", meaning: "There is no god but Allah" },
    { name: "Astaghfirullah", arabic: "أَسْتَغْفِرُ ٱللَّٰهَ", meaning: "I seek forgiveness from Allah" },
    { name: "Subhanallahi Wa Bihamdihi", arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", meaning: "Glory be to Allah and His is the praise" },
]

export default function Tasbih() {
    const { setActiveTab } = useApp()
    const [count, setCount] = useState(0)
    const [target, setTarget] = useState(33) // 33, 99, or 0 (infinity)
    const [vibrate, setVibrate] = useState(true)
    const [isPressed, setIsPressed] = useState(false)
    const [selectedDhikrIndex, setSelectedDhikrIndex] = useState(1)

    const handleTap = () => {
        setIsPressed(true)
        setTimeout(() => setIsPressed(false), 100)

        if (vibrate && navigator.vibrate) {
            navigator.vibrate(15)
        }

        setCount(prev => {
            const next = prev + 1
            if (target > 0 && next > target) {
                if (vibrate && navigator.vibrate) navigator.vibrate([50, 50, 50])
                return 1
            }
            if (target > 0 && next === target) {
                if (vibrate && navigator.vibrate) navigator.vibrate(50)
            }
            return next
        })
    }

    const resetCount = () => {
        if (vibrate && navigator.vibrate) navigator.vibrate(30)
        setCount(0)
    }

    const changeTarget = () => {
        const options = [33, 99, 0]
        const currentIndex = options.indexOf(target)
        const nextTarget = options[(currentIndex + 1) % options.length]
        setTarget(nextTarget)
        setCount(0)
    }

    const visualBeadCount = 33
    const anglePerBead = 360 / visualBeadCount
    const rotation = count * anglePerBead

    return (
        <div className="flex flex-col items-center justify-between min-h-[80vh] pb-10 relative overflow-hidden animate-fade-in text-slate-200">
            
            {/* Dhikr Selector */}
            <div className="flex items-center gap-4 mb-8 z-20">
                <button className="p-2 rounded-full text-slate-400 hover:text-primary hover:bg-white/5 transition-colors" onClick={() => setSelectedDhikrIndex(prev => (prev - 1 + DHIKR_TYPES.length) % DHIKR_TYPES.length)}>
                    <span className="material-icons">chevron_left</span>
                </button>
                <span className="text-sm font-bold text-slate-200 min-w-[150px] text-center truncate px-2">{DHIKR_TYPES[selectedDhikrIndex].name}</span>
                <button className="p-2 rounded-full text-slate-400 hover:text-primary hover:bg-white/5 transition-colors" onClick={() => setSelectedDhikrIndex(prev => (prev + 1) % DHIKR_TYPES.length)}>
                    <span className="material-icons">chevron_right</span>
                </button>
            </div>

            {/* Bead Ring Visualizer */}
            <div className="relative w-80 h-80 mb-8 flex items-center justify-center">
                {/* The Ring Container that rotates */}
                <div
                    className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
                    style={{ transform: `rotate(${rotation}deg)` }}
                >
                    {Array.from({ length: visualBeadCount }).map((_, i) => {
                        const angle = i * anglePerBead
                        const radius = 140
                        const x = radius * Math.cos((angle - 90) * (Math.PI / 180))
                        const y = radius * Math.sin((angle - 90) * (Math.PI / 180))

                        // Highlight everyday 11th bead (typical tasbih markers)
                        const isMarker = i % 11 === 0 && i !== 0

                        return (
                            <div
                                key={i}
                                className={`absolute rounded-full shadow-sm transition-colors duration-300 ${isMarker ? "bg-amber-400 w-5 h-5 border-2 border-background-dark" : "bg-slate-600 w-4 h-4"
                                    }`}
                                style={{
                                    left: `calc(50% + ${x}px - ${isMarker ? 10 : 8}px)`,
                                    top: `calc(50% + ${y}px - ${isMarker ? 10 : 8}px)`,
                                }}
                            />
                        )
                    })}
                </div>

                {/* Center Display / Tap Area */}
                <button
                    className="relative z-10 w-48 h-48 rounded-full bg-surface-dark shadow-[0_0_30px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center active:scale-95 transition-transform duration-100 select-none group border-4 border-white/5"
                    onClick={handleTap}
                >
                     <div className={`absolute inset-0 rounded-full bg-primary/20 opacity-0 transition-opacity duration-300 ${isPressed ? "opacity-100 scale-110" : "group-hover:opacity-50"}`}></div>

                    <span className="text-6xl font-black text-white tabular-nums relative z-10 tracking-tight">
                        {count}
                    </span>
                    <span className="text-xs font-medium text-slate-400 mt-2 uppercase tracking-widest relative z-10">
                        {target === 0 ? "Infinite" : `/ ${target}`}
                    </span>
                </button>

                {/* Indicator Triangle at Top */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-primary drop-shadow-sm z-20"></div>
            </div>

            {/* Arabic Display */}
            <div className="text-center mb-10 h-24 flex flex-col justify-center px-4">
                <p className="text-3xl md:text-4xl text-white mb-2 leading-relaxed transition-all duration-300 font-serif" dir="rtl">
                    {DHIKR_TYPES[selectedDhikrIndex].arabic}
                </p>
                <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto line-clamp-2">
                    "{DHIKR_TYPES[selectedDhikrIndex].meaning}"
                </p>
            </div>

            {/* Controls */}
            <div className="flex gap-6 items-center">
                <button
                    className="h-12 w-12 flex items-center justify-center rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={resetCount}
                >
                    <span className="material-icons">restart_alt</span>
                </button>

                <button
                    className="h-12 px-8 rounded-full bg-primary text-background-dark font-bold hover:bg-green-400 transition-colors shadow-lg shadow-primary/20"
                    onClick={handleTap}
                >
                    Tap to Count
                </button>

                <button
                    className="h-12 w-12 flex items-center justify-center rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors relative"
                    onClick={changeTarget}
                >
                    <span className="text-[10px] font-bold absolute -top-1 -right-1 bg-primary text-background-dark w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                        {target === 0 ? "∞" : target}
                    </span>
                    <span className="material-icons">settings</span>
                </button>
            </div>
        </div>
    )
}
