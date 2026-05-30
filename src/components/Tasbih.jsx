import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'

const DHIKR_TYPES = [
    { name: "Bismillah", arabic: "بِسْمِ اللَّهِ", meaning: "Dengan menyebut nama Allah" },
    { name: "Subhanallah", arabic: "سُبْحَانَ ٱللَّٰهِ", meaning: "Maha Suci Allah" },
    { name: "Alhamdulillah", arabic: "ٱلْحَمْدُ لِلَّٰهِ", meaning: "Segala puji bagi Allah" },
    { name: "Allahu Akbar", arabic: "ٱللَّٰهُ أَكْبَرُ", meaning: "Allah Maha Besar" },
    { name: "La ilaha illallah", arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", meaning: "Tiada Tuhan selain Allah" },
    { name: "Astaghfirullah", arabic: "أَسْتَغْفِرُ ٱللَّٰهَ", meaning: "Aku memohon ampun kepada Allah" },
    { name: "Subhanallahi Wa Bihamdihi", arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", meaning: "Maha Suci Allah dan dengan memuji-Nya" },
]

// Konstanta Bead Dot Chain
const BEAD_COUNT = 33
const BEAD_RADIUS = 115
const DOT_SIZE_INACTIVE = 3
const DOT_SIZE_ACTIVE = 5.5

// Konstanta Vessel
const VESSEL_SIZE = 185

// Floating particles config
const PARTICLE_COUNT = 12
const generateParticles = () => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * -15,
        opacity: 0.08 + Math.random() * 0.12,
    }))
}

export default function Tasbih() {
    const { darkMode } = useApp()
    const [count, setCount] = useState(0)
    const [target, setTarget] = useState(33)
    const [vibrate, setVibrate] = useState(true)
    const [isPressed, setIsPressed] = useState(false)
    const [selectedDhikrIndex, setSelectedDhikrIndex] = useState(1)
    const [showRipple, setShowRipple] = useState(false)
    const [ripplePos, setRipplePos] = useState({ x: 50, y: 50 })
    const [showComplete, setShowComplete] = useState(false)
    const [counterBounce, setCounterBounce] = useState(false)
    const mainRef = useRef(null)

    // Floating particles (stabil, di-generate sekali)
    const particles = useMemo(() => generateParticles(), [])

    const handleTap = useCallback((e) => {
        // Counter bounce micro-animation
        setCounterBounce(true)
        setTimeout(() => setCounterBounce(false), 200)

        setIsPressed(true)
        setTimeout(() => setIsPressed(false), 100)

        // Ripple effect dari posisi tap
        if (mainRef.current) {
            const rect = mainRef.current.getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width) * 100
            const y = ((e.clientY - rect.top) / rect.height) * 100
            setRipplePos({ x, y })
            setShowRipple(true)
            setTimeout(() => setShowRipple(false), 500)
        }

        if (vibrate && navigator.vibrate) navigator.vibrate(12)

        setCount(prev => {
            const next = prev + 1
            if (target > 0 && next > target) {
                if (vibrate && navigator.vibrate) navigator.vibrate([40, 40, 40])
                return 1
            }
            if (target > 0 && next === target) {
                if (vibrate && navigator.vibrate) navigator.vibrate(45)
                // Completion celebration!
                setShowComplete(true)
                setTimeout(() => setShowComplete(false), 1200)
            }
            return next
        })
    }, [target, vibrate])

    const resetCount = (e) => {
        e.stopPropagation()
        if (vibrate && navigator.vibrate) navigator.vibrate(25)
        setCount(0)
    }

    const changeTarget = (e) => {
        e.stopPropagation()
        const options = [33, 99, 0]
        const currentIndex = options.indexOf(target)
        setTarget(options[(currentIndex + 1) % options.length])
        setCount(0)
        if (vibrate && navigator.vibrate) navigator.vibrate(20)
    }

    const handlePrevDhikr = (e) => {
        e.stopPropagation()
        setSelectedDhikrIndex(prev => (prev - 1 + DHIKR_TYPES.length) % DHIKR_TYPES.length)
        setCount(0)
        if (vibrate && navigator.vibrate) navigator.vibrate(10)
    }

    const handleNextDhikr = (e) => {
        e.stopPropagation()
        setSelectedDhikrIndex(prev => (prev + 1) % DHIKR_TYPES.length)
        setCount(0)
        if (vibrate && navigator.vibrate) navigator.vibrate(10)
    }

    const handleVibrateToggle = (e) => {
        e.stopPropagation()
        setVibrate(!vibrate)
        if (!vibrate && navigator.vibrate) navigator.vibrate(15)
    }

    const dhikr = DHIKR_TYPES[selectedDhikrIndex]

    // Progress untuk wave & beads
    const progressPercent = target > 0 ? Math.min(count / target, 1) : (count % 33) / 33
    const beadProgress = count % BEAD_COUNT

    // Generate posisi titik-titik bead (trigonometri)
    const beadDots = useMemo(() => {
        const dots = []
        for (let i = 0; i < BEAD_COUNT; i++) {
            const angle = ((i / BEAD_COUNT) * 360 - 90) * (Math.PI / 180)
            const x = Math.cos(angle) * BEAD_RADIUS
            const y = Math.sin(angle) * BEAD_RADIUS
            dots.push({ x, y, index: i })
        }
        return dots
    }, [])

    // Wave height inside vessel
    const waveHeight = 5 + progressPercent * 90

    // Warna-warna Zen
    const c = {
        heading: darkMode ? 'text-white' : 'text-slate-900',
        sub: darkMode ? 'text-slate-400' : 'text-slate-500',
        muted: darkMode ? 'text-slate-500' : 'text-slate-400',
        accent: '#0d968b',
        accentText: darkMode ? 'text-[#0d968b]' : 'text-[#0a726a]',
        pillBg: darkMode ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-black/[0.015] border-slate-200',
        btnHover: darkMode ? 'hover:bg-white/[0.05] hover:text-white' : 'hover:bg-slate-100 hover:text-slate-900',
        divider: darkMode ? 'border-white/[0.04]' : 'border-slate-200/60',
        vesselBorder: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
        vesselBg: darkMode ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)',
        waveFill1: darkMode ? 'rgba(13,150,139,0.15)' : 'rgba(13,150,139,0.12)',
        waveFill2: darkMode ? 'rgba(13,150,139,0.10)' : 'rgba(13,150,139,0.08)',
        waveBody: darkMode
            ? 'linear-gradient(to bottom, rgba(13,150,139,0.15), rgba(13,150,139,0.08))'
            : 'linear-gradient(to bottom, rgba(13,150,139,0.12), rgba(13,150,139,0.06))',
        particleColor: darkMode ? 'rgba(13,150,139,0.25)' : 'rgba(13,150,139,0.15)',
    }

    return (
        <div className="flex flex-col items-center justify-between min-h-[73vh] py-2 select-none animate-fade-in max-w-md mx-auto relative overflow-hidden">

            {/* ══════════════════════════════════════════════════
                CSS ANIMATIONS (Extended)
            ══════════════════════════════════════════════════ */}
            <style>{`
                @keyframes vesselWave1 {
                    0% { transform: translateX(0) translateY(-8px); }
                    100% { transform: translateX(-50%) translateY(-8px); }
                }
                @keyframes vesselWave2 {
                    0% { transform: translateX(-25%) translateY(-5px); }
                    100% { transform: translateX(-75%) translateY(-5px); }
                }
                @keyframes floatParticle {
                    0%, 100% { transform: translateY(0px) translateX(0px); opacity: var(--p-opacity); }
                    25% { transform: translateY(-18px) translateX(8px); opacity: calc(var(--p-opacity) * 1.4); }
                    50% { transform: translateY(-8px) translateX(-6px); opacity: var(--p-opacity); }
                    75% { transform: translateY(-22px) translateX(4px); opacity: calc(var(--p-opacity) * 0.6); }
                }
                @keyframes beadPulse {
                    0%, 100% { box-shadow: 0 0 6px rgba(13,150,139,0.3); transform: scale(1.3); }
                    50% { box-shadow: 0 0 14px rgba(13,150,139,0.6); transform: scale(1.5); }
                }
                @keyframes rippleExpand {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 0.35; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
                }
                @keyframes completionBurst {
                    0% { transform: scale(0.8); opacity: 0; }
                    30% { transform: scale(1.05); opacity: 1; }
                    70% { transform: scale(1.05); opacity: 1; }
                    100% { transform: scale(1.15); opacity: 0; }
                }
                @keyframes shimmerRing {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes counterPop {
                    0% { transform: scale(1); }
                    30% { transform: scale(1.08); }
                    60% { transform: scale(0.96); }
                    100% { transform: scale(1); }
                }
                @keyframes vesselGlow {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.7; }
                }
            `}</style>

            {/* ══════════════════════════════════════════════════
                ✨ HIASAN 1: FLOATING AMBIENT PARTICLES
                — Partikel cahaya kecil melayang di background
            ══════════════════════════════════════════════════ */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {particles.map(p => (
                    <div
                        key={p.id}
                        className="absolute rounded-full"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: p.size,
                            height: p.size,
                            backgroundColor: c.particleColor,
                            '--p-opacity': p.opacity,
                            animation: `floatParticle ${p.duration}s ease-in-out infinite`,
                            animationDelay: `${p.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* ══════════════════════════════════════════════════
                1. TOP BAR
            ══════════════════════════════════════════════════ */}
            <header className="w-full flex items-center justify-between px-3 mb-1 shrink-0 z-30">
                <div className="flex flex-col">
                    <h2 className={`font-black text-lg tracking-tight ${c.heading}`}>
                        Tasbih Digital
                    </h2>
                </div>
            </header>

            {/* ══════════════════════════════════════════════════
                2. DHIKR NAVIGATOR PILL
            ══════════════════════════════════════════════════ */}
            <section className="w-full max-w-[280px] px-1 py-0.5 shrink-0 z-30">
                <div className={`flex items-center justify-between w-full px-1 py-0.5 rounded-full border transition-all duration-300 backdrop-blur-sm ${c.pillBg}`}>
                    <button
                        onClick={handlePrevDhikr}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 ${c.sub} ${c.btnHover}`}
                    >
                        <span className="material-icons text-lg leading-none">chevron_left</span>
                    </button>
                    <span className={`text-[10px] font-black uppercase tracking-[0.15em] text-center truncate max-w-[140px] ${c.accentText}`}>
                        {dhikr.name}
                    </span>
                    <button
                        onClick={handleNextDhikr}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 ${c.sub} ${c.btnHover}`}
                    >
                        <span className="material-icons text-lg leading-none">chevron_right</span>
                    </button>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════
                3. ZEN WAVE CANVAS — Full Tap Area
            ══════════════════════════════════════════════════ */}
            <main
                ref={mainRef}
                onClick={handleTap}
                className="flex-1 w-full flex flex-col items-center justify-center relative z-20 cursor-pointer"
            >
                {/* Soft press radial overlay */}
                <div
                    className="absolute inset-0 pointer-events-none transition-all duration-200 rounded-3xl"
                    style={{
                        background: isPressed
                            ? (darkMode
                                ? 'radial-gradient(circle at center, rgba(13,150,139,0.08) 0%, transparent 65%)'
                                : 'radial-gradient(circle at center, rgba(13,150,139,0.05) 0%, transparent 65%)')
                            : 'transparent',
                        transform: isPressed ? 'scale(0.985)' : 'scale(1)',
                    }}
                />

                {/* ✨ HIASAN 3: TAP RIPPLE EFFECT — Lingkaran expanding dari titik tap */}
                {showRipple && (
                    <div
                        className="absolute pointer-events-none z-40 rounded-full"
                        style={{
                            left: `${ripplePos.x}%`,
                            top: `${ripplePos.y}%`,
                            width: 200,
                            height: 200,
                            border: `1.5px solid ${darkMode ? 'rgba(13,150,139,0.25)' : 'rgba(13,150,139,0.2)'}`,
                            animation: 'rippleExpand 0.5s ease-out forwards',
                        }}
                    />
                )}

                <div className="flex flex-col items-center justify-center text-center pointer-events-none select-none z-30 w-full">

                    {/* Kaligrafi Arab Mengambang */}
                    <div
                        className={`text-[24px] leading-tight tracking-wide transition-all duration-200 mb-4 ${c.heading}`}
                        style={{
                            opacity: isPressed ? 0.6 : 1,
                            transform: isPressed ? 'scale(0.97)' : 'scale(1)',
                            fontFamily: "'Amiri', 'Noto Naskh Arabic', serif",
                        }}
                        dir="rtl"
                    >
                        {dhikr.arabic}
                    </div>

                    {/* ══════════════════════════════════════════
                        BEAD RING + VESSEL CONTAINER
                    ══════════════════════════════════════════ */}
                    <div className="relative flex items-center justify-center" style={{ width: BEAD_RADIUS * 2 + 24, height: BEAD_RADIUS * 2 + 24 }}>

                        {/* ✨ HIASAN 2: VESSEL GLOW RING — Cahaya soft di belakang vessel */}
                        <div
                            className="absolute rounded-full pointer-events-none"
                            style={{
                                width: VESSEL_SIZE + 40,
                                height: VESSEL_SIZE + 40,
                                background: `radial-gradient(circle, ${darkMode ? 'rgba(13,150,139,0.06)' : 'rgba(13,150,139,0.04)'} 0%, transparent 70%)`,
                                animation: 'vesselGlow 4s ease-in-out infinite',
                            }}
                        />

                        {/* ✨ HIASAN 5: COMPLETION SHIMMER RING */}
                        {showComplete && (
                            <div
                                className="absolute rounded-full pointer-events-none z-20"
                                style={{
                                    width: VESSEL_SIZE + 20,
                                    height: VESSEL_SIZE + 20,
                                    border: `2px solid ${c.accent}`,
                                    animation: 'completionBurst 1.2s ease-out forwards',
                                }}
                            />
                        )}
                        {showComplete && (
                            <div
                                className="absolute pointer-events-none z-20"
                                style={{
                                    width: VESSEL_SIZE + 12,
                                    height: VESSEL_SIZE + 12,
                                }}
                            >
                                <div
                                    className="w-full h-full rounded-full"
                                    style={{
                                        background: `conic-gradient(from 0deg, transparent 0%, ${c.accent}40 25%, transparent 50%, ${c.accent}40 75%, transparent 100%)`,
                                        animation: 'shimmerRing 1.2s linear forwards',
                                        mask: 'radial-gradient(transparent 42%, black 43%, black 48%, transparent 49%)',
                                        WebkitMask: 'radial-gradient(transparent 42%, black 43%, black 48%, transparent 49%)',
                                    }}
                                />
                            </div>
                        )}

                        {/* Bead Dots (lingkaran luar) + ✨ HIASAN 4: BEAD PULSE */}
                        {beadDots.map((dot) => {
                            const isCompleted = dot.index < beadProgress
                            const isActive = dot.index === beadProgress
                            const size = isActive ? DOT_SIZE_ACTIVE : DOT_SIZE_INACTIVE
                            return (
                                <div
                                    key={dot.index}
                                    className="absolute rounded-full"
                                    style={{
                                        width: size,
                                        height: size,
                                        left: `calc(50% + ${dot.x}px - ${size / 2}px)`,
                                        top: `calc(50% + ${dot.y}px - ${size / 2}px)`,
                                        backgroundColor: isCompleted || isActive
                                            ? c.accent
                                            : (darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'),
                                        opacity: isActive ? 1 : (isCompleted ? 0.7 : 0.5),
                                        // ✨ Active bead gets pulse animation
                                        animation: isActive ? 'beadPulse 1.5s ease-in-out infinite' : 'none',
                                        transition: !isActive ? 'all 0.3s ease' : 'none',
                                    }}
                                />
                            )
                        })}

                        {/* THE VESSEL — Wadah Lingkaran dengan Gelombang Air */}
                        <div
                            className="absolute rounded-full overflow-hidden transition-transform duration-100"
                            style={{
                                width: VESSEL_SIZE,
                                height: VESSEL_SIZE,
                                border: `1.5px solid ${c.vesselBorder}`,
                                backgroundColor: c.vesselBg,
                                transform: isPressed ? 'scale(0.96)' : 'scale(1)',
                            }}
                        >
                            {/* Wave Water Inside Vessel */}
                            <div
                                className="absolute left-0 right-0 bottom-0 transition-all duration-700 ease-out"
                                style={{ height: `${waveHeight}%` }}
                            >
                                {/* Wave Crest 1 */}
                                <svg
                                    className="absolute top-0 left-0 w-[200%] h-[16px]"
                                    viewBox="0 0 800 16"
                                    preserveAspectRatio="none"
                                    style={{ animation: 'vesselWave1 5s linear infinite' }}
                                >
                                    <path
                                        d="M0,8 C100,0 200,16 300,8 C400,0 500,16 600,8 C700,0 800,16 800,8 L800,16 L0,16 Z"
                                        fill={c.waveFill1}
                                    />
                                </svg>
                                {/* Wave Crest 2 */}
                                <svg
                                    className="absolute top-0 left-0 w-[200%] h-[16px]"
                                    viewBox="0 0 800 16"
                                    preserveAspectRatio="none"
                                    style={{ animation: 'vesselWave2 3.5s linear infinite' }}
                                >
                                    <path
                                        d="M0,8 C80,14 180,2 280,8 C380,14 480,2 580,8 C680,14 800,2 800,8 L800,16 L0,16 Z"
                                        fill={c.waveFill2}
                                    />
                                </svg>
                                {/* Wave Body Fill */}
                                <div
                                    className="absolute top-[8px] left-0 right-0 bottom-0"
                                    style={{ background: c.waveBody }}
                                />
                            </div>
                        </div>

                        {/* Counter & Text Overlay di atas vessel */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 z-10">
                            {/* ✨ HIASAN 6: COUNTER BOUNCE — micro-bounce saat tap */}
                            <div
                                className={`tabular-nums font-black leading-none ${c.heading}`}
                                style={{
                                    fontSize: count >= 1000 ? '52px' : count >= 100 ? '64px' : '78px',
                                    letterSpacing: '-0.04em',
                                    animation: counterBounce ? 'counterPop 0.2s ease-out' : 'none',
                                    opacity: isPressed ? 0.7 : 1,
                                }}
                            >
                                {count}
                            </div>

                            {/* Divider tipis */}
                            <div className={`w-10 border-t my-1 ${c.divider}`} />

                            {/* Makna dzikir */}
                            <p className={`text-[9px] italic font-medium leading-relaxed max-w-[140px] opacity-45 ${darkMode ? 'text-slate-300' : 'text-slate-600'
                                }`}>
                                "{dhikr.meaning}"
                            </p>
                        </div>
                    </div>

                    {/* Target kapsul */}
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full border backdrop-blur-sm mt-4 ${c.pillBg} ${c.muted}`}>
                        {target === 0 ? `${count} · tak terbatas` : `${count} dari ${target}`}
                    </span>

                    {/* Petunjuk Ketuk */}
                    <div className={`flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.25em] mt-3 ${c.muted} opacity-25`}>
                        <span className="material-icons text-[10px]">touch_app</span>
                        ketuk di mana saja
                    </div>
                </div>
            </main>

            {/* ══════════════════════════════════════════════════
                4. CONTROL BAR FOOTER
            ══════════════════════════════════════════════════ */}
            <footer className="w-full px-3 mt-1 shrink-0 flex flex-col items-center z-30">
                <div className={`flex items-center justify-between w-full max-w-[320px] px-1.5 py-1 rounded-full border backdrop-blur-sm transition-all duration-300 ${c.pillBg}`}>
                    {/* Reset */}
                    <button
                        onClick={resetCount}
                        className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 active:scale-90 ${c.sub} ${c.btnHover}`}
                        title="Reset Hitungan"
                    >
                        <span className="material-icons text-lg">restart_alt</span>
                    </button>

                    {/* Target Changer */}
                    <button
                        onClick={changeTarget}
                        className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all duration-300 active:scale-95 ${darkMode
                                ? 'bg-[#0d968b]/10 border-[#0d968b]/20 text-[#0d968b]'
                                : 'bg-emerald-50 border-emerald-200/50 text-[#0a726a] shadow-sm'
                            }`}
                    >
                        Target: {target === 0 ? "∞" : target}
                    </button>

                    {/* Haptic Toggle */}
                    <button
                        onClick={handleVibrateToggle}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 ${vibrate
                                ? (darkMode ? 'text-emerald-300 hover:bg-white/5' : 'text-[#0a726a] hover:bg-slate-100')
                                : `${c.muted} ${c.btnHover}`
                            }`}
                        title={vibrate ? "Vibrate: ON" : "Vibrate: OFF"}
                    >
                        <span className="material-icons text-[18px]">{vibrate ? 'vibration' : 'mobile_off'}</span>
                    </button>
                </div>
            </footer>
        </div>
    )
}
