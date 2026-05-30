import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useApp } from '../context/AppContext'

const QARI_LIST = [
  { id: '01', nama: 'Abdullah Al-Juhany' },
  { id: '02', nama: 'Abdul Muhsin Al-Qasim' },
  { id: '03', nama: 'Abdurrahman as-Sudais' },
  { id: '04', nama: 'Ibrahim Al-Dossari' },
  { id: '05', nama: 'Misyari Rasyid Al-Afasi' },
  { id: '06', nama: 'Yasser Al-Dosari' },
]

// ─── AYAT ITEM ───────────────────────────────────────────
const AyatItem = React.memo(({
  ayat,
  isHafal,
  modeHafalan,
  revealedWords,
  isPlaying,
  isLooping,
  fontSizeLevel,
  onToggleHafalan,
  onToggleLoop,
  onPlay,
  onToggleWordReveal,
  onRevealAllWords,
  onHideAllWords,
  darkMode
}) => {
  const words = useMemo(() => ayat.teksArab.split(' '), [ayat.teksArab])
  const isFullyRevealed = revealedWords.length === words.length && revealedWords.every(Boolean)

  return (
    <div id={`ayat-${ayat.nomorAyat}`} className={`rounded-[2rem] transition-all duration-500 overflow-hidden border backdrop-blur-sm ${
      isPlaying
        ? darkMode
          ? 'bg-primary/10 border-primary/40 ring-2 ring-primary/30 shadow-lg shadow-primary/10'
          : 'bg-primary/5 border-primary/30 ring-2 ring-primary/20 shadow-lg shadow-primary/10'
        : isHafal
          ? darkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-500/5 border-emerald-500/20'
          : darkMode ? 'bg-slate-900/30 border-white/5' : 'bg-white/50 border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
    }`}>
      {/* Ayat Header Row */}
      <div className={`flex items-center justify-between px-5 py-3.5 border-b ${
        darkMode ? 'border-white/5' : 'border-slate-100'
      }`}>
        {/* Left: Number + Hafal Badge */}
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-black ${
            isHafal
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
              : isPlaying
                ? 'bg-primary text-white shadow-md shadow-primary/30'
                : darkMode ? 'bg-white/10 text-white/70' : 'bg-slate-100 text-slate-500'
          }`}>
            {ayat.nomorAyat}
          </div>
          <button
            onClick={() => onToggleHafalan(ayat.nomorAyat)}
            className={`text-[10px] font-bold px-3 py-1.5 rounded-xl transition-all border uppercase tracking-wider ${
              isHafal
                ? darkMode ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                : darkMode ? 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="material-icons text-[14px] align-middle mr-1">{isHafal ? 'check_circle' : 'radio_button_unchecked'}</span>
            {isHafal ? 'Hafal' : 'Tandai'}
          </button>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-1.5">
          {modeHafalan && (
            <button
              onClick={() => {
                if (isFullyRevealed) onHideAllWords(ayat.nomorAyat)
                else onRevealAllWords(ayat.nomorAyat, words.length)
              }}
              className={`p-2 rounded-xl transition-all ${
                isFullyRevealed
                  ? darkMode ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-500'
                  : darkMode ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
              }`}
              title={isFullyRevealed ? 'Tutup Ayat' : 'Lihat Penuh'}
            >
              <span className="material-icons text-[18px]">{isFullyRevealed ? 'visibility_off' : 'visibility'}</span>
            </button>
          )}
          <button
            onClick={() => onToggleLoop(ayat.nomorAyat)}
            className={`p-2 rounded-xl transition-all ${
              isLooping
                ? darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'
                : darkMode ? 'bg-white/5 text-slate-500 hover:bg-white/10' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
            }`}
            title="Loop"
          >
            <span className="material-icons text-[18px]">repeat</span>
          </button>
          <button
            onClick={() => onPlay(ayat)}
            className={`p-2 rounded-xl transition-all ${
              isPlaying
                ? 'bg-red-500/20 text-red-400'
                : darkMode ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'bg-primary/10 text-primary hover:bg-primary/20'
            }`}
            title={isPlaying ? 'Stop' : 'Putar'}
          >
            <span className="material-icons text-[18px]">{isPlaying ? 'stop' : 'play_arrow'}</span>
          </button>
        </div>
      </div>

      {/* Arabic Text */}
      <div className="px-6 py-8">
        <p className={`text-right font-serif text-slate-800 dark:text-white transition-all duration-300 ${
          fontSizeLevel === 1 ? 'text-[1.3rem] sm:text-[1.5rem] leading-[2.2]' :
          fontSizeLevel === 2 ? 'text-[1.7rem] sm:text-[2rem] leading-[2.4]' :
          fontSizeLevel === 3 ? 'text-[2.2rem] sm:text-[2.6rem] leading-[2.6]' :
          fontSizeLevel === 4 ? 'text-[2.8rem] sm:text-[3.3rem] leading-[2.8]' :
          'text-[3.5rem] sm:text-[4.2rem] leading-[3.2]'
        }`} dir="rtl" lang="ar">
          {words.map((word, wIdx) => {
            const isWordRevealed = revealedWords[wIdx]
            const isWordBlur = modeHafalan && !isWordRevealed
            return (
              <React.Fragment key={wIdx}>
                <span
                  onClick={() => modeHafalan && onToggleWordReveal(ayat.nomorAyat, wIdx)}
                  className={`transition-all duration-300 inline-block px-0.5 rounded-lg ${
                    isWordBlur
                      ? 'blur-[8px] opacity-40 hover:opacity-60 cursor-pointer'
                      : modeHafalan && isWordRevealed
                        ? 'cursor-pointer hover:bg-primary/10 rounded-lg'
                        : ''
                  }`}
                >
                  {word}
                </span>
                {' '}
              </React.Fragment>
            )
          })}
        </p>
      </div>

      {/* Latin + Translation (hidden in hafalan mode) */}
      {!modeHafalan && (
        <div className={`px-6 pb-6 pt-4 space-y-4 border-t ${
          darkMode ? 'border-white/5' : 'border-slate-100'
        }`}>
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${darkMode ? 'text-primary/70' : 'text-primary'}`}>Transliterasi</p>
            <p className={`text-[14px] italic leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{ayat.teksLatin}</p>
          </div>
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>Terjemahan</p>
            <p className={`text-[14px] leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{ayat.teksIndonesia}</p>
          </div>
        </div>
      )}
    </div>
  )
})

// ─── MAIN COMPONENT ──────────────────────────────────────
export default function Quran() {
  const { hafalanData, toggleHafalan, darkMode } = useApp()

  // Surah list state
  const [allSurahs, setAllSurahs] = useState([])
  const [loadingSurahList, setLoadingSurahList] = useState(true)
  const [surahSearch, setSurahSearch] = useState('')
  const [filterType, setFilterType] = useState('Semua') // Semua | Makkiyah | Madaniyah

  // Detail state
  const [selectedSurat, setSelectedSurat] = useState(null)
  const [suratData, setSuratData] = useState(null)
  const [loadingSurat, setLoadingSurat] = useState(false)
  const [searchAyatInSurah, setSearchAyatInSurah] = useState('')
  const [showJumpModal, setShowJumpModal] = useState(false)

  // Audio state
  const [selectedQari, setSelectedQari] = useState('05')
  const [showQariPicker, setShowQariPicker] = useState(false)
  const [playingAyat, setPlayingAyat] = useState(null)
  const [playingFull, setPlayingFull] = useState(false)
  const audioRef = useRef(null)
  const fullAudioRef = useRef(null)

  // Hafalan state
  const [modeHafalan, setModeHafalan] = useState(false)
  const [loopState, setLoopState] = useState({})
  const [revealedWords, setRevealedWords] = useState({})

  // Font Size state
  const [fontSizeLevel, setFontSizeLevel] = useState(() => {
    try {
      return parseInt(localStorage.getItem('sholatku_quran_fontsize')) || 2
    } catch { return 2 }
  })

  const changeFontSize = (delta) => {
    setFontSizeLevel(prev => {
      const next = Math.max(1, Math.min(5, prev + delta))
      localStorage.setItem('sholatku_quran_fontsize', next)
      return next
    })
  }

  // Last read (persisted in localStorage)
  const [lastRead, setLastRead] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sholatku_lastread') || '[]')
    } catch { return [] }
  })

  const saveLastRead = (nomor, namaLatin, nama, ayat) => {
    const entry = { nomor, namaLatin, nama, ayat, timestamp: Date.now() }
    setLastRead(prev => {
      const filtered = prev.filter(e => e.nomor !== nomor)
      const next = [entry, ...filtered].slice(0, 3)
      localStorage.setItem('sholatku_lastread', JSON.stringify(next))
      return next
    })
  }

  // ─── HAFALAN HELPERS ─────────────────────────────────
  const toggleLoop = (nomorAyat) => {
    setLoopState(prev => {
      const next = { ...prev, [nomorAyat]: !prev[nomorAyat] }
      if (playingAyat === nomorAyat && audioRef.current) {
        audioRef.current.loop = next[nomorAyat]
      }
      return next
    })
  }

  const toggleWordReveal = (nomorAyat, wordIndex) => {
    setRevealedWords(prev => {
      const ayatRevealed = prev[nomorAyat] || []
      const newRevealed = [...ayatRevealed]
      newRevealed[wordIndex] = !newRevealed[wordIndex]
      return { ...prev, [nomorAyat]: newRevealed }
    })
  }

  const revealAllWords = (nomorAyat, totalWords) => {
    setRevealedWords(prev => ({ ...prev, [nomorAyat]: Array(totalWords).fill(true) }))
  }

  const hideAllWords = (nomorAyat) => {
    setRevealedWords(prev => ({ ...prev, [nomorAyat]: [] }))
  }

  // ─── FETCH SURAH LIST ────────────────────────────────
  useEffect(() => {
    const fetchSurahs = async () => {
      setLoadingSurahList(true)
      try {
        const res = await fetch('https://equran.id/api/v2/surat')
        const json = await res.json()
        if (json.code === 200) setAllSurahs(json.data)
      } catch (err) {
        console.error('Gagal memuat daftar surat:', err)
      }
      setLoadingSurahList(false)
    }
    fetchSurahs()
  }, [])

  // ─── LOAD SURAH DETAIL ───────────────────────────────
  const loadSurat = useCallback(async (nomor) => {
    setLoadingSurat(true)
    setSuratData(null)
    setPlayingAyat(null)
    stopFullAudio()
    try {
      const res = await fetch(`https://equran.id/api/v2/surat/${nomor}`)
      const json = await res.json()
      if (json.code === 200) {
        setSuratData(json.data)
        setSelectedSurat(nomor)
        setSearchAyatInSurah('')
        // Save last read
        saveLastRead(nomor, json.data.namaLatin, json.data.nama, 1)
      }
    } catch (err) {
      console.error('Gagal memuat surat:', err)
    }
    setLoadingSurat(false)
  }, [])

  // ─── FILTER LOGIC ────────────────────────────────────
  const filteredSurahs = useMemo(() => {
    let result = allSurahs
    if (filterType === 'Makkiyah') result = result.filter(s => s.tempatTurun === 'Mekah')
    else if (filterType === 'Madaniyah') result = result.filter(s => s.tempatTurun === 'Madinah')

    if (surahSearch.trim()) {
      const q = surahSearch.toLowerCase()
      result = result.filter(
        s => s.namaLatin.toLowerCase().includes(q) || s.arti.toLowerCase().includes(q) || String(s.nomor).includes(q)
      )
    }
    return result
  }, [surahSearch, allSurahs, filterType])

  // ─── AUDIO CONTROLS ──────────────────────────────────
  const playAyat = (ayat) => {
    if (playingAyat === ayat.nomorAyat) {
      audioRef.current?.pause()
      setPlayingAyat(null)
      return
    }
    stopFullAudio()
    if (audioRef.current) audioRef.current.pause()
    const url = ayat.audio[selectedQari]
    if (!url) return
    audioRef.current = new Audio(url)
    audioRef.current.loop = !!loopState[ayat.nomorAyat]
    audioRef.current.play()
    setPlayingAyat(ayat.nomorAyat)
    audioRef.current.onended = () => setPlayingAyat(null)
  }

  const toggleFullAudio = () => {
    if (playingFull) { stopFullAudio(); return }
    if (!suratData?.audioFull) return
    const url = suratData.audioFull[selectedQari]
    if (!url) return
    if (audioRef.current) { audioRef.current.pause(); setPlayingAyat(null) }
    fullAudioRef.current = new Audio(url)
    fullAudioRef.current.play()
    setPlayingFull(true)
    fullAudioRef.current.onended = () => setPlayingFull(false)
  }

  const stopFullAudio = () => {
    if (fullAudioRef.current) { fullAudioRef.current.pause(); fullAudioRef.current = null }
    setPlayingFull(false)
  }

  const scrollToAyat = (nomorAyat) => {
    setShowJumpModal(false)
    setTimeout(() => {
      const el = document.getElementById(`ayat-${nomorAyat}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.classList.add('ring-4', 'ring-primary', 'shadow-2xl')
        setTimeout(() => el.classList.remove('ring-4', 'ring-primary', 'shadow-2xl'), 2000)
      }
    }, 300)
  }

  const goBack = () => {
    setSelectedSurat(null); setSuratData(null); stopFullAudio()
    audioRef.current?.pause(); setPlayingAyat(null)
    setModeHafalan(false); setLoopState({}); setRevealedWords({})
  }

  const navigateSurat = (direction) => {
    if (!selectedSurat) return
    const next = selectedSurat + direction
    if (next >= 1 && next <= 114) loadSurat(next)
  }

  useEffect(() => {
    return () => { audioRef.current?.pause(); fullAudioRef.current?.pause() }
  }, [])

  // ════════════════════════════════════════════════════════
  // RENDER: SURAH LIST VIEW
  // ════════════════════════════════════════════════════════
  if (!selectedSurat) {
    return (
      <div className="space-y-6 animate-fade-in pb-24 font-sans">

        {/* ── TERAKHIR DIBACA HERO ─────────────────────── */}
        {lastRead.length > 0 && (
          <div className={`relative overflow-hidden rounded-[2.5rem] p-6 shadow-xl ${
            darkMode ? 'bg-gradient-to-br from-[#0c1f1b] to-[#0a1614] border border-emerald-900/40' : 'bg-gradient-to-br from-primary to-emerald-500'
          }`}>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative z-10">
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${darkMode ? 'text-emerald-400' : 'text-white/70'}`}>
                📖 Terakhir Dibaca
              </p>
              <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-1 px-1 pb-1">
                {lastRead.map(entry => (
                  <button
                    key={entry.nomor}
                    onClick={() => loadSurat(entry.nomor)}
                    className={`shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all active:scale-95 ${
                      darkMode ? 'bg-white/10 hover:bg-white/15 backdrop-blur-md' : 'bg-white/20 hover:bg-white/30 backdrop-blur-md'
                    }`}
                  >
                    <span className="text-2xl font-serif text-white/80">{entry.nama}</span>
                    <div className="text-left">
                      <p className="text-white font-bold text-sm leading-tight">{entry.namaLatin}</p>
                      <p className="text-white/60 text-[11px] font-medium">Ayat {entry.ayat}</p>
                    </div>
                    <span className="material-icons text-white/50 text-[18px] ml-1">arrow_forward</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── SEARCH + QARI ROW ────────────────────────── */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className={`material-icons absolute left-4 top-1/2 -translate-y-1/2 text-[20px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>search</span>
            <input
              type="text"
              placeholder="Cari surat..."
              value={surahSearch}
              onChange={(e) => setSurahSearch(e.target.value)}
              className={`w-full pl-12 pr-4 py-3.5 rounded-2xl text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${
                darkMode
                  ? 'bg-slate-900/60 text-white placeholder:text-slate-500 border border-white/5'
                  : 'bg-white text-slate-800 placeholder:text-slate-400 border border-slate-100 shadow-sm'
              }`}
            />
          </div>
          {/* Qari Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowQariPicker(!showQariPicker)}
              className={`flex items-center gap-2 px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all border whitespace-nowrap ${
                darkMode
                  ? 'bg-slate-900/60 text-slate-300 border-white/5 hover:bg-slate-800'
                  : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <span className="material-icons text-[18px] text-primary">headphones</span>
              <span className="hidden sm:inline">{QARI_LIST.find(q => q.id === selectedQari)?.nama.split(' ')[0]}</span>
              <span className="material-icons text-[16px] opacity-50">expand_more</span>
            </button>

            {showQariPicker && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowQariPicker(false)}></div>
                <div className={`absolute right-0 top-full mt-2 z-50 w-64 rounded-2xl shadow-2xl overflow-hidden border ${
                  darkMode ? 'bg-[#0f211f] border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <p className={`px-4 pt-3 pb-2 text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Pilih Qari</p>
                  {QARI_LIST.map(q => (
                    <button
                      key={q.id}
                      onClick={() => { setSelectedQari(q.id); setShowQariPicker(false) }}
                      className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors flex items-center gap-3 ${
                        selectedQari === q.id
                          ? darkMode ? 'bg-primary/15 text-primary' : 'bg-primary/10 text-primary'
                          : darkMode ? 'text-slate-300 hover:bg-white/5' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {selectedQari === q.id && <span className="material-icons text-[16px]">check</span>}
                      <span className={selectedQari !== q.id ? 'ml-7' : ''}>{q.nama}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── FILTER PILLS ─────────────────────────────── */}
        <div className="flex items-center gap-2.5">
          {['Semua', 'Makkiyah', 'Madaniyah'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all active:scale-95 border ${
                filterType === type
                  ? darkMode ? 'bg-primary/20 text-primary border-primary/30 ring-1 ring-primary' : 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                  : darkMode ? 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
          {/* Surah count badge */}
          <span className={`text-[11px] font-bold ml-auto ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
            {filteredSurahs.length} surat
          </span>
        </div>

        {/* ── SURAH GRID ───────────────────────────────── */}
        {loadingSurahList ? (
          <SurahListSkeleton darkMode={darkMode} />
        ) : filteredSurahs.length === 0 ? (
          <div className={`text-center py-20 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <span className="material-icons text-5xl mb-3 block opacity-30">search_off</span>
            <p className="text-lg font-bold">Tidak ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredSurahs.map(s => {
              const hafalCount = hafalanData[s.nomor]?.length || 0
              return (
                <button
                  key={s.nomor}
                  onClick={() => loadSurat(s.nomor)}
                  className={`text-left rounded-[1.8rem] p-4 transition-all duration-300 active:scale-[0.97] group relative overflow-hidden border ${
                    darkMode ? 'bg-slate-900/40 border-white/5 hover:border-primary/30' : 'bg-white border-slate-100 hover:shadow-md hover:border-primary/20'
                  }`}
                >
                  {/* Hover glow */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                    darkMode ? 'bg-gradient-to-br from-primary/10 to-transparent' : 'bg-gradient-to-br from-primary/5 to-transparent'
                  }`}></div>

                  <div className="relative z-10">
                    {/* Top row: number + arabic */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black ${
                        darkMode ? 'bg-white/10 text-white/60' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {s.nomor}
                      </div>
                      <span className="text-lg font-serif text-primary/70">{s.nama}</span>
                    </div>

                    {/* Surah name */}
                    <h3 className={`font-bold text-[14px] leading-tight mb-1 transition-colors ${
                      darkMode ? 'text-white group-hover:text-primary' : 'text-slate-800 group-hover:text-primary-dark'
                    }`}>
                      {s.namaLatin}
                    </h3>
                    <p className={`text-[11px] font-medium ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      {s.arti} • {s.jumlahAyat} ayat
                    </p>

                    {/* Hafalan progress */}
                    {hafalCount > 0 && (
                      <div className="mt-2.5 flex items-center gap-2">
                        <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                          <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${(hafalCount / s.jumlahAyat) * 100}%` }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-500">{hafalCount}/{s.jumlahAyat}</span>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  // ════════════════════════════════════════════════════════
  // RENDER: SURAH DETAIL VIEW
  // ════════════════════════════════════════════════════════
  return (
    <div className="space-y-5 animate-fade-in pb-24 font-sans">
      {/* ── STICKY HEADER ──────────────────────────────── */}
      <div className={`sticky top-0 z-30 flex items-center gap-3 px-6 py-4 rounded-[2rem] backdrop-blur-md border ${
        darkMode 
          ? 'bg-[#0c1a18]/30 border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.2)]' 
          : 'bg-white/40 border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
      }`}>
        <button
          onClick={goBack}
          className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all border ${
            darkMode 
              ? 'bg-white/5 border-white/5 text-white hover:bg-white/10' 
              : 'bg-white/50 border-white/40 text-slate-600 hover:bg-white/80 shadow-sm'
          }`}
        >
          <span className="material-icons text-[20px]">arrow_back</span>
        </button>
        {suratData && (
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className={`text-lg font-black truncate ${darkMode ? 'text-white' : 'text-slate-800'}`}>{suratData.namaLatin}</h3>
              <span className="text-lg font-serif text-primary shrink-0">{suratData.nama}</span>
            </div>
            <p className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? 'text-primary/60' : 'text-primary/70'}`}>
              {suratData.arti} • {suratData.jumlahAyat} ayat • {suratData.tempatTurun}
            </p>
          </div>
        )}
      </div>

      {loadingSurat ? (
        <AyatListSkeleton darkMode={darkMode} />
      ) : suratData && (
        <>
          {/* ── BISMILLAH BANNER ───────────────────────── */}
          {suratData.nomor !== 1 && suratData.nomor !== 9 && (
            <div className={`text-center py-8 rounded-[2rem] relative overflow-hidden ${
              darkMode ? 'bg-slate-900/50 border border-white/5' : 'bg-gradient-to-b from-primary/5 to-transparent border border-primary/10'
            }`}>
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, ${darkMode ? 'rgba(13,150,139,0.15)' : 'rgba(13,150,139,0.08)'} 0%, transparent 70%)`
              }}></div>
              <p className="text-3xl sm:text-4xl font-serif text-primary relative z-10" dir="rtl" lang="ar">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </p>
              <p className={`text-[11px] mt-3 font-semibold relative z-10 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                Dengan nama Allah Yang Maha Pengasih, Maha Penyayang
              </p>
            </div>
          )}

          {/* ── STICKY CONTROL BAR ─────────────────────── */}
          <div className={`sticky top-[84px] z-20 flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 rounded-2xl backdrop-blur-md border ${
            darkMode 
              ? 'bg-[#0c1a18]/30 border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.2)]' 
              : 'bg-white/40 border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
          }`}>
            <div className="flex items-center gap-2">
              {/* Play Full */}
              <button
                onClick={toggleFullAudio}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-bold transition-all active:scale-95 backdrop-blur-md border ${
                  playingFull
                    ? 'bg-red-500/80 text-white border-red-500/50 shadow-[0_4px_20px_rgba(239,68,68,0.3)]'
                    : darkMode
                      ? 'bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 shadow-[0_4px_20px_rgba(13,150,139,0.15)]'
                      : 'bg-primary/10 text-primary-dark border-primary/20 hover:bg-primary/20 shadow-[0_4px_20px_rgba(13,150,139,0.1)]'
                }`}
              >
                <span className="material-icons text-[18px]">{playingFull ? 'stop' : 'play_arrow'}</span>
                <span className="hidden sm:inline">{playingFull ? 'Stop' : 'Putar Surat'}</span>
                <span className="sm:hidden">{playingFull ? 'Stop' : 'Putar'}</span>
              </button>

              {/* Font Size Controls */}
              <div className={`flex items-center rounded-xl p-1 border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-200'}`}>
                <button
                  onClick={() => changeFontSize(-1)}
                  disabled={fontSizeLevel <= 1}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                    fontSizeLevel <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary/20 hover:text-primary active:scale-95'
                  } ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}
                >
                  <span className="font-bold text-[11px]">A-</span>
                </button>
                <div className={`w-px h-4 mx-1 ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`}></div>
                <button
                  onClick={() => changeFontSize(1)}
                  disabled={fontSizeLevel >= 5}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                    fontSizeLevel >= 5 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary/20 hover:text-primary active:scale-95'
                  } ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}
                >
                  <span className="font-bold text-[14px]">A+</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Qari label */}
              <div className={`hidden md:flex items-center gap-1.5 text-[11px] font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                <span className="material-icons text-[14px]">headphones</span>
                {QARI_LIST.find(q => q.id === selectedQari)?.nama}
              </div>

              {/* Hafalan Toggle */}
              <div className="flex items-center gap-2.5">
                <span className={`text-[11px] font-bold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Hafalan</span>
                <button
                  onClick={() => setModeHafalan(p => !p)}
                  className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-all duration-300 ${
                    modeHafalan ? 'bg-primary shadow-md shadow-primary/30' : darkMode ? 'bg-slate-700' : 'bg-slate-300'
                  }`}
                >
                  <div className={`bg-white w-5 h-5 rounded-full shadow transform transition-transform duration-300 ${
                    modeHafalan ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* ── AYAT LIST ──────────────────────────────── */}
          <div className="space-y-4 mt-6">
            {suratData.ayat.map((ayat) => {
              const isHafal = hafalanData[suratData.nomor]?.includes(ayat.nomorAyat)
              const currentRevealedWords = revealedWords[ayat.nomorAyat] || []
              return (
                <AyatItem
                  key={ayat.nomorAyat}
                  ayat={ayat}
                  isHafal={isHafal}
                  modeHafalan={modeHafalan}
                  revealedWords={currentRevealedWords}
                  isPlaying={playingAyat === ayat.nomorAyat}
                  isLooping={!!loopState[ayat.nomorAyat]}
                  fontSizeLevel={fontSizeLevel}
                  onToggleHafalan={(nomorAyat) => toggleHafalan(suratData.nomor, nomorAyat)}
                  onToggleLoop={toggleLoop}
                  onPlay={playAyat}
                  onToggleWordReveal={toggleWordReveal}
                  onRevealAllWords={revealAllWords}
                  onHideAllWords={hideAllWords}
                  darkMode={darkMode}
                />
              )
            })}
          </div>

          {/* ── PREV / NEXT SURAH NAVIGATION ───────────── */}
          <div className={`flex items-center gap-3 mt-8 pt-6 border-t ${darkMode ? 'border-white/5' : 'border-slate-200'}`}>
            {selectedSurat > 1 && (
              <button
                onClick={() => navigateSurat(-1)}
                className={`flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl transition-all active:scale-[0.97] border ${
                  darkMode ? 'bg-slate-900/50 border-white/5 hover:border-primary/30 text-slate-300' : 'bg-white border-slate-100 hover:border-primary/20 text-slate-700 shadow-sm'
                }`}
              >
                <span className="material-icons text-primary text-[20px]">arrow_back</span>
                <div className="text-left">
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Sebelumnya</p>
                  <p className="font-bold text-sm">{allSurahs.find(s => s.nomor === selectedSurat - 1)?.namaLatin}</p>
                </div>
              </button>
            )}
            {selectedSurat < 114 && (
              <button
                onClick={() => navigateSurat(1)}
                className={`flex-1 flex items-center justify-end gap-3 px-5 py-4 rounded-2xl transition-all active:scale-[0.97] border ${
                  darkMode ? 'bg-slate-900/50 border-white/5 hover:border-primary/30 text-slate-300' : 'bg-white border-slate-100 hover:border-primary/20 text-slate-700 shadow-sm'
                }`}
              >
                <div className="text-right">
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Selanjutnya</p>
                  <p className="font-bold text-sm">{allSurahs.find(s => s.nomor === selectedSurat + 1)?.namaLatin}</p>
                </div>
                <span className="material-icons text-primary text-[20px]">arrow_forward</span>
              </button>
            )}
          </div>

          <style>{`
            #bottom-nav { display: none !important; }
          `}</style>

          {/* ── FLOATING ACTION BUTTON (FAB) ───────────── */}
          <button
            onClick={() => {
              setSearchAyatInSurah('')
              setShowJumpModal(true)
            }}
            className={`fixed bottom-8 right-5 sm:right-8 z-40 flex items-center justify-center gap-2 px-5 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-md border ${
              darkMode 
                ? 'bg-primary/20 text-primary border-primary/30 hover:bg-primary/30' 
                : 'bg-primary/15 text-primary-dark border-primary/25 hover:bg-primary/25'
            }`}
          >
            <span className="material-icons text-[22px]">explore</span>
            <span className="font-bold text-[14px]">Lompat</span>
          </button>

          {/* ── JUMP MODAL / BOTTOM SHEET ──────────────── */}
          {showJumpModal && (
            <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
              <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-fade-in"
                onClick={() => setShowJumpModal(false)}
              ></div>
              
              <div className={`relative w-full max-w-lg h-[80vh] sm:h-[60vh] flex flex-col sm:rounded-[3rem] rounded-t-[2.5rem] rounded-b-none p-6 shadow-2xl transition-transform animate-slide-up ${
                darkMode ? 'bg-[#0f211f]/95 border border-emerald-900/30' : 'bg-white/95 border border-slate-200'
              }`}>
                <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mb-6 sm:hidden"></div>
                
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-slate-800'}`}>Lompat ke Ayat</h3>
                  <button 
                    onClick={() => setShowJumpModal(false)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${darkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'}`}
                  >
                    <span className="material-icons text-[18px]">close</span>
                  </button>
                </div>

                <div className="relative mb-4 shrink-0">
                  <span className={`material-icons absolute left-4 top-1/2 -translate-y-1/2 text-[18px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>search</span>
                  <input
                    type="text"
                    placeholder="Cari ayat atau kata..."
                    value={searchAyatInSurah}
                    onChange={(e) => setSearchAyatInSurah(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 rounded-2xl text-[13px] font-bold focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${
                      darkMode ? 'bg-slate-900/60 text-white placeholder:text-slate-500 border border-white/5' : 'bg-white text-slate-800 placeholder:text-slate-400 border border-slate-100 shadow-sm'
                    }`}
                  />
                </div>

                <div className="flex-1 overflow-y-auto hide-scrollbar -mx-2 px-2">
                  <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                    {suratData.ayat.filter(ayat => {
                      if (!searchAyatInSurah.trim()) return true;
                      const q = searchAyatInSurah.toLowerCase();
                      return (
                        ayat.nomorAyat.toString() === q ||
                        ayat.teksIndonesia.toLowerCase().includes(q) ||
                        ayat.teksLatin.toLowerCase().includes(q)
                      );
                    }).map(ayat => (
                      <button
                        key={ayat.nomorAyat}
                        onClick={() => scrollToAyat(ayat.nomorAyat)}
                        className={`aspect-square flex items-center justify-center rounded-2xl text-[15px] font-black transition-all active:scale-90 border ${
                          darkMode 
                            ? 'bg-slate-800/50 text-slate-300 border-slate-700/50 hover:bg-primary/20 hover:text-primary hover:border-primary/30' 
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-primary/10 hover:text-primary hover:border-primary/20 shadow-sm'
                        }`}
                      >
                        {ayat.nomorAyat}
                      </button>
                    ))}
                  </div>
                  {suratData.ayat.filter(a => (!searchAyatInSurah.trim() ? true : (a.nomorAyat.toString() === searchAyatInSurah.toLowerCase() || a.teksIndonesia.toLowerCase().includes(searchAyatInSurah.toLowerCase()) || a.teksLatin.toLowerCase().includes(searchAyatInSurah.toLowerCase())))).length === 0 && (
                    <div className={`text-center py-10 text-[13px] font-bold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Tidak ada ayat yang cocok</div>
                  )}
                </div>
              </div>
            </div>
          )}

        </>
      )}
    </div>
  )
}

function SurahListSkeleton({ darkMode }) {
  const containerBg = darkMode ? 'bg-slate-900/60 border-white/10' : 'bg-slate-100/80 border-slate-200/60 shadow-sm'
  const pulseBg = darkMode ? 'bg-white/15' : 'bg-slate-300/60'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className={`p-4 rounded-3xl border flex items-center justify-between ${containerBg}`}>
          <div className="flex items-center gap-4 flex-1">
            {/* Number badge */}
            <div className={`w-10 h-10 rounded-2xl shrink-0 ${pulseBg}`}></div>
            {/* Surah info */}
            <div className="flex-1 space-y-2">
              <div className={`h-4 w-1/3 rounded-lg ${pulseBg}`}></div>
              <div className={`h-3 w-1/2 rounded-lg ${pulseBg}`}></div>
            </div>
          </div>
          {/* Arabic name placeholder */}
          <div className={`h-6 w-16 rounded-lg ${pulseBg}`}></div>
        </div>
      ))}
    </div>
  )
}

function AyatListSkeleton({ darkMode }) {
  const containerBg = darkMode ? 'bg-slate-900/60 border-white/10' : 'bg-slate-100/80 border-slate-200/60 shadow-sm'
  const cardBg = darkMode ? 'bg-[#0f211f]/60 border-emerald-900/20' : 'bg-white/50 border-white/40 shadow-sm'
  const pulseBg = darkMode ? 'bg-white/15' : 'bg-slate-300/60'

  return (
    <div className="space-y-4 animate-pulse mt-6">
      {/* Bismillah Banner Skeleton */}
      <div className={`py-8 rounded-[2rem] border flex flex-col items-center justify-center ${containerBg}`}>
        <div className={`h-8 w-2/3 rounded-xl mb-3 ${pulseBg}`}></div>
        <div className={`h-3 w-1/3 rounded-lg ${pulseBg}`}></div>
      </div>

      {/* Ayat cards skeletons */}
      {[1, 2, 3].map((i) => (
        <div key={i} className={`rounded-[2rem] overflow-hidden border ${cardBg}`}>
          {/* Header Row */}
          <div className={`flex items-center justify-between px-5 py-3.5 border-b ${
            darkMode ? 'border-white/5' : 'border-slate-100'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl ${pulseBg}`}></div>
              <div className={`h-4 w-16 rounded-lg ${pulseBg}`}></div>
            </div>
            <div className={`w-14 h-6 rounded-xl ${pulseBg}`}></div>
          </div>
          {/* Arabic and Translate Area */}
          <div className="p-5 space-y-4">
            <div className="flex justify-end">
              <div className={`h-8 w-3/4 rounded-xl ${pulseBg}`}></div>
            </div>
            <div className="space-y-2">
              <div className={`h-3 w-1/2 rounded-lg ${pulseBg}`}></div>
              <div className={`h-3.5 w-full rounded-lg ${pulseBg}`}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
