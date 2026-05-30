import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { useApp } from '../context/AppContext'
import localDoaList from '../data/doas'

// ═══════════════════════════════════════════════
//  Warna gradien per kategori (Bento Card Themes)
// ═══════════════════════════════════════════════
const CATEGORY_THEMES = {
  'Pagi & Petang': {
    icon: 'wb_twilight',
    gradient: { dark: 'from-amber-900/30 to-orange-950/20', light: 'from-amber-100 to-orange-50' },
    accent: { dark: 'text-amber-400', light: 'text-amber-600' },
    iconBg: { dark: 'bg-amber-500/15', light: 'bg-amber-100' },
    border: { dark: 'border-amber-500/20', light: 'border-amber-200/60' },
    pill: { dark: 'bg-amber-500/15 text-amber-300', light: 'bg-amber-100 text-amber-700' },
  },
  'Ibadah': {
    icon: 'mosque',
    gradient: { dark: 'from-emerald-900/30 to-teal-950/20', light: 'from-emerald-50 to-teal-50' },
    accent: { dark: 'text-emerald-400', light: 'text-emerald-600' },
    iconBg: { dark: 'bg-emerald-500/15', light: 'bg-emerald-100' },
    border: { dark: 'border-emerald-500/20', light: 'border-emerald-200/60' },
    pill: { dark: 'bg-emerald-500/15 text-emerald-300', light: 'bg-emerald-100 text-emerald-700' },
  },
  'Aktivitas': {
    icon: 'directions_walk',
    gradient: { dark: 'from-sky-900/30 to-blue-950/20', light: 'from-sky-50 to-blue-50' },
    accent: { dark: 'text-sky-400', light: 'text-sky-600' },
    iconBg: { dark: 'bg-sky-500/15', light: 'bg-sky-100' },
    border: { dark: 'border-sky-500/20', light: 'border-sky-200/60' },
    pill: { dark: 'bg-sky-500/15 text-sky-300', light: 'bg-sky-100 text-sky-700' },
  },
  'Harian': {
    icon: 'routine',
    gradient: { dark: 'from-violet-900/30 to-purple-950/20', light: 'from-violet-50 to-purple-50' },
    accent: { dark: 'text-violet-400', light: 'text-violet-600' },
    iconBg: { dark: 'bg-violet-500/15', light: 'bg-violet-100' },
    border: { dark: 'border-violet-500/20', light: 'border-violet-200/60' },
    pill: { dark: 'bg-violet-500/15 text-violet-300', light: 'bg-violet-100 text-violet-700' },
  },
  'Keluarga': {
    icon: 'family_restroom',
    gradient: { dark: 'from-rose-900/30 to-pink-950/20', light: 'from-rose-50 to-pink-50' },
    accent: { dark: 'text-rose-400', light: 'text-rose-600' },
    iconBg: { dark: 'bg-rose-500/15', light: 'bg-rose-100' },
    border: { dark: 'border-rose-500/20', light: 'border-rose-200/60' },
    pill: { dark: 'bg-rose-500/15 text-rose-300', light: 'bg-rose-100 text-rose-700' },
  },
  'Alam': {
    icon: 'cloud',
    gradient: { dark: 'from-cyan-900/30 to-teal-950/20', light: 'from-cyan-50 to-teal-50' },
    accent: { dark: 'text-cyan-400', light: 'text-cyan-600' },
    iconBg: { dark: 'bg-cyan-500/15', light: 'bg-cyan-100' },
    border: { dark: 'border-cyan-500/20', light: 'border-cyan-200/60' },
    pill: { dark: 'bg-cyan-500/15 text-cyan-300', light: 'bg-cyan-100 text-cyan-700' },
  },
  'Utama': {
    icon: 'star',
    gradient: { dark: 'from-yellow-900/30 to-amber-950/20', light: 'from-yellow-50 to-amber-50' },
    accent: { dark: 'text-yellow-400', light: 'text-yellow-600' },
    iconBg: { dark: 'bg-yellow-500/15', light: 'bg-yellow-100' },
    border: { dark: 'border-yellow-500/20', light: 'border-yellow-200/60' },
    pill: { dark: 'bg-yellow-500/15 text-yellow-300', light: 'bg-yellow-100 text-yellow-700' },
  },
}

const DEFAULT_THEME = {
  icon: 'favorite',
  gradient: { dark: 'from-slate-800/30 to-slate-900/20', light: 'from-slate-50 to-gray-50' },
  accent: { dark: 'text-slate-400', light: 'text-slate-600' },
  iconBg: { dark: 'bg-slate-500/15', light: 'bg-slate-100' },
  border: { dark: 'border-slate-500/20', light: 'border-slate-200/60' },
  pill: { dark: 'bg-slate-500/15 text-slate-300', light: 'bg-slate-100 text-slate-700' },
}

function getTheme(category) {
  return CATEGORY_THEMES[category] || DEFAULT_THEME
}

// ═══════════════════════════════════════════════
//  HELPER: Clean Title (Remove "Doa " prefix)
// ═══════════════════════════════════════════════
const getCleanTitle = (title) => {
  if (!title) return ''
  const t = title.trim()
  return t.replace(/^doa\s+/i, '').trim()
}

// ═══════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════
export default function Doa() {
  const { darkMode } = useApp()

  // ── Core States ──
  const [search, setSearch] = useState('')
  const [navTab, setNavTab] = useState('kategori') // 'kategori' | 'semua' | 'favorit'
  const [selectedCategory, setSelectedCategory] = useState(null) // drill-down dari bento
  const [selectedDoa, setSelectedDoa] = useState(null)
  const [doaOfTheDay, setDoaOfTheDay] = useState(null)
  const [copyStatus, setCopyStatus] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const [sortMode, setSortMode] = useState('none') // 'none' | 'az' | 'za'
  const [activeLetter, setActiveLetter] = useState(null)
  const [showLetterBubble, setShowLetterBubble] = useState(false)
  const alphabetRailRef = useRef(null)

  // ── Favorit (persisted) ──
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('sholatku-fav-doas')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  // ── Arabic Font Size (persisted) ──
  const [arabicFontSize, setArabicFontSize] = useState(() => {
    try {
      const saved = localStorage.getItem('sholatku-arabic-font')
      return saved ? parseFloat(saved) : 2.2
    } catch { return 2.2 }
  })

  // ── Persist favorit ──
  useEffect(() => {
    localStorage.setItem('sholatku-fav-doas', JSON.stringify(favorites))
  }, [favorites])

  // ── Persist font size ──
  useEffect(() => {
    localStorage.setItem('sholatku-arabic-font', String(arabicFontSize))
  }, [arabicFontSize])

  // ── Doa Pilihan Acak (Random setiap buka) ──
  useEffect(() => {
    if (localDoaList.length > 0) {
      const randomIndex = Math.floor(Math.random() * localDoaList.length)
      setDoaOfTheDay(localDoaList[randomIndex])
    }
  }, [])

  // ── Computed: Category list with counts ──
  const categoryData = useMemo(() => {
    const map = {}
    localDoaList.forEach(d => {
      const cat = d.category || 'Lainnya'
      if (!map[cat]) map[cat] = { name: cat, count: 0 }
      map[cat].count++
    })
    return Object.values(map)
  }, [])

  // ── Computed: Filtered doa list ──
  const filteredDoas = useMemo(() => {
    let result = localDoaList

    // Filter berdasarkan tab
    if (navTab === 'favorit') {
      result = result.filter(d => favorites.includes(d.id))
    } else if (navTab === 'kategori' && selectedCategory) {
      result = result.filter(d => d.category === selectedCategory)
    }

    // Filter pencarian
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        d => (d.title || '').toLowerCase().includes(q) ||
             (d.translation || '').toLowerCase().includes(q) ||
             (d.category || '').toLowerCase().includes(q)
      )
    }

    // Sorting abjad
    if (sortMode === 'az') {
      result = [...result].sort((a, b) => getCleanTitle(a.title).localeCompare(getCleanTitle(b.title), 'id'))
    } else if (sortMode === 'za') {
      result = [...result].sort((a, b) => getCleanTitle(b.title).localeCompare(getCleanTitle(a.title), 'id'))
    }

    return result
  }, [search, navTab, selectedCategory, favorites, sortMode])

  // ── Actions ──
  const toggleFavorite = useCallback((id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    )
  }, [])

  const copyToClipboard = async (doa) => {
    const text = `${doa.title}\n\n${doa.arabic}\n\n${doa.latin}\n\nArtinya:\n${doa.translation}`
    try {
      await navigator.clipboard.writeText(text)
      setCopyStatus(true)
      setTimeout(() => setCopyStatus(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName)
    setNavTab('kategori')
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
  }

  // ── Computed: Available first letters ──
  const availableLetters = useMemo(() => {
    const letters = new Set()
    filteredDoas.forEach(d => {
      const first = getCleanTitle(d.title)[0]?.toUpperCase()
      if (first) letters.add(first)
    })
    return [...letters].sort()
  }, [filteredDoas])

  // ── Scroll to letter ──
  const scrollToLetter = useCallback((letter, currentSortMode) => {
    setActiveLetter(letter)
    
    // Otomatis ubah mode sort ke A-Z jika belum
    if (currentSortMode !== 'az') {
      setSortMode('az')
    }

    // Delay scroll agar DOM sempat render ulang jika sortMode baru saja berubah
    setTimeout(() => {
      const target = document.querySelector(`[data-letter-anchor="${letter}"]`)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 50)
  }, [])

  // ── Touch handlers for alphabet rail ──
  const getLetterFromTouch = useCallback((touchY) => {
    const rail = alphabetRailRef.current
    if (!rail) return null
    const rect = rail.getBoundingClientRect()
    const relY = touchY - rect.top
    const index = Math.floor((relY / rect.height) * availableLetters.length)
    return availableLetters[Math.max(0, Math.min(index, availableLetters.length - 1))] || null
  }, [availableLetters])

  const handleRailTouchStart = useCallback((e) => {
    e.preventDefault()
    setShowLetterBubble(true)
    const letter = getLetterFromTouch(e.touches[0].clientY)
    if (letter) scrollToLetter(letter, sortMode)
  }, [getLetterFromTouch, scrollToLetter, sortMode])

  const handleRailTouchMove = useCallback((e) => {
    e.preventDefault()
    const letter = getLetterFromTouch(e.touches[0].clientY)
    if (letter) scrollToLetter(letter, sortMode)
  }, [getLetterFromTouch, scrollToLetter, sortMode])

  const handleRailTouchEnd = useCallback(() => {
    setShowLetterBubble(false)
    setTimeout(() => setActiveLetter(null), 600)
  }, [])

  // ── Apakah harus tampilkan bento grid? ──
  const showBentoGrid = navTab === 'kategori' && !selectedCategory && !search.trim()

  // ── Hitung first-seen letters untuk anchor ──
  const firstSeenLetters = useMemo(() => {
    const seen = new Set()
    const map = {}
    filteredDoas.forEach(d => {
      const first = getCleanTitle(d.title)[0]?.toUpperCase()
      if (first && !seen.has(first)) {
        seen.add(first)
        map[d.id] = first
      }
    })
    return map
  }, [filteredDoas])

  // ═══════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════
  return (
    <div className="space-y-5 animate-fade-in pb-28 font-sans relative">

      {/* ═══════════════════════════════════════════
          1. DOA PILIHAN HARI INI (Compact Widget)
      ═══════════════════════════════════════════ */}
      {doaOfTheDay && !search.trim() && navTab !== 'favorit' && !selectedCategory && (
        <div className={`relative overflow-hidden rounded-[2rem] p-5 transition-all duration-500 group ${
          darkMode
            ? 'bg-gradient-to-br from-[#0c1a18] to-slate-900/80 border border-emerald-900/40'
            : 'bg-gradient-to-br from-primary to-emerald-500'
        }`}>
          {/* Decorative Orbs */}
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            {/* Badge */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 ${
              darkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/20 text-white'
            }`}>
              <span className="material-icons text-[12px]">auto_awesome</span>
              Doa Pilihan Hari Ini
            </span>

            {/* Title */}
            <h2 className="text-xl font-black text-white tracking-tight leading-tight mb-2">
              {doaOfTheDay.title}
            </h2>

            {/* Arabic preview (1 baris, elipsis) */}
            <p className="text-right text-xl leading-relaxed font-serif text-white/80 truncate mt-2 mb-4" dir="rtl" lang="ar">
              {doaOfTheDay.arabic}
            </p>

            {/* Action Row */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedDoa(doaOfTheDay)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold transition-all active:scale-95 ${
                  darkMode ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white text-primary shadow-lg'
                }`}
              >
                <span>Baca</span>
                <span className="material-icons text-[16px]">arrow_forward</span>
              </button>
              <button
                onClick={() => copyToClipboard(doaOfTheDay)}
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all active:scale-95"
                title="Salin Doa"
              >
                <span className="material-icons text-[18px]">content_copy</span>
              </button>
              <button
                onClick={() => toggleFavorite(doaOfTheDay.id)}
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all active:scale-95"
                title="Favorit"
              >
                <span className="material-icons text-[18px]">
                  {favorites.includes(doaOfTheDay.id) ? 'favorite' : 'favorite_border'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          2. SEARCH BAR
      ═══════════════════════════════════════════ */}
      <div className="relative z-10">
        <span className={`material-icons absolute left-4 top-1/2 -translate-y-1/2 text-[20px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>search</span>
        <input
          type="text"
          placeholder="Cari doa... (tidur, makan, wudhu)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full pl-12 pr-12 py-3.5 rounded-2xl text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
            darkMode
              ? 'bg-slate-900/60 text-white placeholder:text-slate-500 border border-white/5'
              : 'bg-white text-slate-800 placeholder:text-slate-400 border border-slate-100 shadow-sm'
          }`}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
              darkMode ? 'text-slate-500 hover:text-slate-300 hover:bg-white/10' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="material-icons text-[16px]">close</span>
          </button>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          3. NAV TAB PILLS + VIEW TOGGLE
      ═══════════════════════════════════════════ */}
      <div className="flex items-center justify-between gap-3">
        {/* Tab Pills */}
        <div className={`flex items-center gap-1 p-1 rounded-2xl ${
          darkMode ? 'bg-slate-900/50 border border-white/5' : 'bg-slate-100 border border-slate-200/60'
        }`}>
          {[
            { id: 'kategori', label: 'Kategori', icon: 'category' },
            { id: 'semua', label: 'Semua', icon: 'list' },
            { id: 'favorit', label: 'Favorit', icon: 'favorite' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setNavTab(tab.id); setSelectedCategory(null) }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-bold transition-all duration-300 active:scale-95 ${
                navTab === tab.id
                  ? darkMode
                    ? 'bg-primary/20 text-primary shadow-sm shadow-primary/10'
                    : 'bg-white text-primary shadow-sm'
                  : darkMode
                    ? 'text-slate-500 hover:text-slate-300'
                    : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <span className="material-icons text-[15px]">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Sort + View Mode Toggle (hanya saat bukan bento) */}
        {!showBentoGrid && (
          <div className="flex items-center gap-2">
            {/* Sort A-Z / Z-A Toggle (3 state cycle) */}
            <button
              onClick={() => setSortMode(prev => prev === 'none' ? 'az' : prev === 'az' ? 'za' : 'none')}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-[11px] font-bold transition-all active:scale-95 border ${
                sortMode !== 'none'
                  ? darkMode ? 'bg-primary/20 text-primary border-primary/30' : 'bg-primary/10 text-primary border-primary/20 shadow-sm'
                  : darkMode ? 'bg-slate-900/50 text-slate-500 border-white/5' : 'bg-slate-100 text-slate-400 border-slate-200/60'
              }`}
              title={sortMode === 'az' ? 'Urutkan: A → Z' : sortMode === 'za' ? 'Urutkan: Z → A' : 'Urutkan: Default'}
            >
              <span className="material-icons text-[15px]">{sortMode === 'za' ? 'text_rotation_angledown' : 'sort_by_alpha'}</span>
              <span>{sortMode === 'az' ? 'A-Z' : sortMode === 'za' ? 'Z-A' : 'Urut'}</span>
            </button>

            {/* View Mode Toggle */}
            <div className={`flex items-center gap-0.5 p-1 rounded-xl ${
              darkMode ? 'bg-slate-900/50 border border-white/5' : 'bg-slate-100 border border-slate-200/60'
            }`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  viewMode === 'grid'
                    ? darkMode ? 'bg-primary/20 text-primary' : 'bg-white text-primary shadow-sm'
                    : darkMode ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                <span className="material-icons text-[18px]">grid_view</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  viewMode === 'list'
                    ? darkMode ? 'bg-primary/20 text-primary' : 'bg-white text-primary shadow-sm'
                    : darkMode ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                <span className="material-icons text-[18px]">view_list</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          4. SELECTED CATEGORY BREADCRUMB
      ═══════════════════════════════════════════ */}
      {navTab === 'kategori' && selectedCategory && !search.trim() && (
        <div className="flex items-center gap-2">
          <button
            onClick={handleBackToCategories}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all active:scale-95 ${
              darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white text-slate-600 hover:bg-slate-50 shadow-sm border border-slate-200/60'
            }`}
          >
            <span className="material-icons text-[14px]">arrow_back</span>
            Semua Kategori
          </button>
          <span className={`px-3 py-1.5 rounded-xl text-[12px] font-bold ${
            getTheme(selectedCategory).pill[darkMode ? 'dark' : 'light']
          }`}>
            <span className="material-icons text-[13px] mr-1 align-text-bottom">{getTheme(selectedCategory).icon}</span>
            {selectedCategory}
          </span>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          5A. BENTO CATEGORY GRID
      ═══════════════════════════════════════════ */}
      {showBentoGrid && (
        <div className="grid grid-cols-2 gap-3 animate-fade-in">
          {categoryData.map((cat) => {
            const theme = getTheme(cat.name)
            const dm = darkMode ? 'dark' : 'light'
            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className={`relative text-left p-5 rounded-[1.5rem] transition-all duration-300 active:scale-[0.97] group overflow-hidden border ${
                  darkMode ? 'border-white/5 hover:border-white/10' : 'border-slate-100 hover:border-slate-200'
                } bg-gradient-to-br ${theme.gradient[dm]}`}
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-3 transition-colors ${theme.iconBg[dm]}`}>
                  <span className={`material-icons text-[22px] ${theme.accent[dm]}`}>{theme.icon}</span>
                </div>

                {/* Name */}
                <h3 className={`font-bold text-[14px] leading-tight mb-1 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {cat.name}
                </h3>

                {/* Count Pill */}
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.pill[dm]}`}>
                  {cat.count} doa
                </span>

                {/* Hover Glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[1.5rem] ${
                  darkMode ? 'bg-white/[0.02]' : 'bg-white/30'
                }`} />
              </button>
            )
          })}
        </div>
      )}

      {/* ═══════════════════════════════════════════
          5B. DOA LIST / GRID
      ═══════════════════════════════════════════ */}
      {!showBentoGrid && (
        <div className="relative">
          {/* Result count */}
          <p className={`text-[12px] font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            {navTab === 'favorit' && filteredDoas.length === 0
              ? ''
              : `${filteredDoas.length} doa ditemukan`
            }
          </p>

          {filteredDoas.length === 0 ? (
            <div className={`text-center py-16 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <span className="material-icons text-5xl mb-3 block opacity-30">
                {navTab === 'favorit' ? 'favorite_border' : 'search_off'}
              </span>
              <p className="text-base font-bold mb-1">
                {navTab === 'favorit' ? 'Belum ada doa favorit' : 'Doa tidak ditemukan'}
              </p>
              <p className={`text-[13px] ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                {navTab === 'favorit'
                  ? 'Ketuk ikon ❤️ pada doa untuk menandainya'
                  : 'Coba pake kata kunci lain, bro!'
                }
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            /* ── GRID VIEW ── */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
              {filteredDoas.map((doa) => {
                const theme = getTheme(doa.category)
                const isFav = favorites.includes(doa.id)
                return (
                  <button
                    key={doa.id}
                    data-letter-anchor={firstSeenLetters[doa.id] || undefined}
                    onClick={() => setSelectedDoa(doa)}
                    className={`text-left p-4 rounded-[1.5rem] transition-all duration-300 active:scale-[0.98] group relative overflow-hidden border ${
                      darkMode ? 'elegant-card-dark border-white/5 hover:border-primary/20' : 'elegant-card-light hover:shadow-md border-slate-100 hover:border-primary/20'
                    }`}
                  >
                    {/* Hover gradient */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      darkMode ? 'bg-gradient-to-br from-primary/5 to-transparent' : 'bg-gradient-to-br from-primary/[0.03] to-transparent'
                    }`} />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          theme.iconBg[darkMode ? 'dark' : 'light']
                        }`}>
                          <span className={`material-icons text-[18px] ${theme.accent[darkMode ? 'dark' : 'light']}`}>{theme.icon}</span>
                        </div>
                        {/* Favorite Indicator */}
                        {isFav && (
                          <span className="material-icons text-[14px] text-rose-400 shrink-0 mt-1">favorite</span>
                        )}
                      </div>

                      <h3 className={`font-bold text-[14px] leading-snug mb-1.5 line-clamp-2 ${
                        darkMode ? 'text-slate-200 group-hover:text-white' : 'text-slate-800 group-hover:text-primary-dark'
                      }`}>
                        {doa.title}
                      </h3>

                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider ${
                        theme.accent[darkMode ? 'dark' : 'light']
                      }`}>
                        {doa.category}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            /* ── LIST VIEW ── */
            <div className="space-y-2 animate-fade-in">
              {filteredDoas.map((doa) => {
                const theme = getTheme(doa.category)
                const isFav = favorites.includes(doa.id)
                return (
                  <button
                    key={doa.id}
                    data-letter-anchor={firstSeenLetters[doa.id] || undefined}
                    onClick={() => setSelectedDoa(doa)}
                    className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 active:scale-[0.99] group border ${
                      darkMode ? 'border-white/5 hover:bg-white/[0.03] hover:border-primary/20' : 'border-slate-100 hover:bg-slate-50 hover:border-primary/10 shadow-sm'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      theme.iconBg[darkMode ? 'dark' : 'light']
                    }`}>
                      <span className={`material-icons text-[18px] ${theme.accent[darkMode ? 'dark' : 'light']}`}>{theme.icon}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-[13px] leading-tight truncate ${
                        darkMode ? 'text-slate-200' : 'text-slate-800'
                      }`}>
                        {doa.title}
                      </h3>
                      <span className={`text-[10px] font-semibold ${theme.accent[darkMode ? 'dark' : 'light']}`}>
                        {doa.category}
                      </span>
                    </div>

                    {isFav && (
                      <span className="material-icons text-[14px] text-rose-400 shrink-0">favorite</span>
                    )}
                    <span className={`material-icons text-[16px] shrink-0 ${darkMode ? 'text-slate-600' : 'text-slate-300'}`}>chevron_right</span>
                  </button>
                )
              })}
            </div>
          )}

          {/* ═══════════════════════════════════════════
              ALPHABET FAST SCROLLER RAIL
          ═══════════════════════════════════════════ */}
          {availableLetters.length > 3 && filteredDoas.length > 10 && (
            <>
              {/* Letter Bubble Preview */}
              {showLetterBubble && activeLetter && (
                <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[80] pointer-events-none">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black ${
                    darkMode ? 'bg-primary/90 text-white shadow-xl shadow-primary/40' : 'bg-primary text-white shadow-xl shadow-primary/30'
                  }`}>
                    {activeLetter}
                  </div>
                </div>
              )}

              {/* Rail */}
              <div
                ref={alphabetRailRef}
                className={`fixed right-1 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-center py-1 px-0.5 rounded-full select-none touch-none transition-opacity duration-300 ${
                  darkMode ? 'bg-slate-800/60 backdrop-blur-sm' : 'bg-white/70 backdrop-blur-sm shadow-sm border border-slate-200/40'
                }`}
                onTouchStart={handleRailTouchStart}
                onTouchMove={handleRailTouchMove}
                onTouchEnd={handleRailTouchEnd}
              >
                {availableLetters.map(letter => (
                  <button
                    key={letter}
                    onClick={() => scrollToLetter(letter, sortMode)}
                    className={`w-5 h-5 flex items-center justify-center rounded-full text-[9px] font-black transition-all duration-150 ${
                      activeLetter === letter
                        ? 'bg-primary text-white scale-125'
                        : darkMode
                          ? 'text-slate-400 hover:text-primary hover:bg-white/5'
                          : 'text-slate-500 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════
          6. DETAIL MODAL (Premium Bottom Sheet)
      ═══════════════════════════════════════════ */}
      {selectedDoa && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedDoa(null)}
          />

          {/* Sheet */}
          <div className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto sm:rounded-[2.5rem] rounded-t-[2rem] rounded-b-none p-6 sm:p-8 shadow-2xl animate-slide-up ${
            darkMode ? 'bg-[#0f211f]/95 border border-emerald-900/30' : 'bg-white/95 border border-slate-200'
          }`}>

            {/* Handle */}
            <div className={`w-10 h-1.5 rounded-full mx-auto mb-5 sm:hidden ${darkMode ? 'bg-slate-700' : 'bg-slate-300'}`} />

            {/* Header Row */}
            <div className="flex items-start justify-between gap-3 mb-6">
              <div className="flex-1 min-w-0">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-2 ${
                  getTheme(selectedDoa.category).pill[darkMode ? 'dark' : 'light']
                }`}>
                  <span className="material-icons text-[11px]">{getTheme(selectedDoa.category).icon}</span>
                  {selectedDoa.category || 'Umum'}
                </span>
                <h2 className={`text-xl font-black leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {selectedDoa.title}
                </h2>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(selectedDoa.id)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90 ${
                    favorites.includes(selectedDoa.id)
                      ? 'bg-rose-500/15 text-rose-400'
                      : darkMode ? 'bg-slate-800 text-slate-400 hover:text-rose-400' : 'bg-slate-100 text-slate-400 hover:text-rose-400'
                  }`}
                >
                  <span className="material-icons text-[18px]">
                    {favorites.includes(selectedDoa.id) ? 'favorite' : 'favorite_border'}
                  </span>
                </button>
                {/* Close Button */}
                <button
                  onClick={() => setSelectedDoa(null)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    darkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <span className="material-icons text-[18px]">close</span>
                </button>
              </div>
            </div>

            {/* Arabic Text */}
            <div className={`p-5 rounded-2xl mb-5 relative overflow-hidden ${
              darkMode ? 'bg-black/30' : 'bg-slate-50 border border-slate-100'
            }`}>
              <p
                className={`text-center leading-[2.4] font-serif ${darkMode ? 'text-white' : 'text-slate-800'}`}
                dir="rtl"
                lang="ar"
                style={{ fontSize: `${arabicFontSize}rem` }}
              >
                {selectedDoa.arabic}
              </p>
            </div>

            {/* Font Size Slider */}
            <div className={`flex items-center gap-3 px-1 mb-5`}>
              <span className={`material-icons text-[14px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>text_decrease</span>
              <input
                type="range"
                min="1.4"
                max="3.6"
                step="0.1"
                value={arabicFontSize}
                onChange={(e) => setArabicFontSize(parseFloat(e.target.value))}
                className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer accent-primary"
                style={{
                  background: darkMode
                    ? `linear-gradient(to right, #0d968b ${((arabicFontSize - 1.4) / 2.2) * 100}%, rgba(255,255,255,0.1) ${((arabicFontSize - 1.4) / 2.2) * 100}%)`
                    : `linear-gradient(to right, #0d968b ${((arabicFontSize - 1.4) / 2.2) * 100}%, #e2e8f0 ${((arabicFontSize - 1.4) / 2.2) * 100}%)`
                }}
              />
              <span className={`material-icons text-[18px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>text_increase</span>
            </div>

            {/* Transliteration & Translation */}
            <div className="space-y-4 mb-6">
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${darkMode ? 'text-primary' : 'text-primary-dark'}`}>Transliterasi</p>
                <p className={`text-[15px] italic leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  "{selectedDoa.latin}"
                </p>
              </div>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Artinya</p>
                <p className={`text-[15px] leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {selectedDoa.translation}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className={`flex items-center gap-2.5 pt-5 border-t ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
              <button
                onClick={() => copyToClipboard(selectedDoa)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-[14px] transition-all active:scale-95 ${
                  copyStatus
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : darkMode
                      ? 'bg-primary/15 text-primary hover:bg-primary/25'
                      : 'bg-primary/10 text-primary hover:bg-primary/15'
                }`}
              >
                <span className="material-icons text-[18px]">{copyStatus ? 'check_circle' : 'content_copy'}</span>
                {copyStatus ? 'Tersalin!' : 'Salin Doa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
