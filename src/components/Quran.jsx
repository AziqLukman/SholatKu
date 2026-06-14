import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import { juzData } from '../data/juz'

const QARI_LIST = [
  { id: '01', nama: 'Abdullah Al-Juhany' },
  { id: '02', nama: 'Abdul Muhsin Al-Qasim' },
  { id: '03', nama: 'Abdurrahman as-Sudais' },
  { id: '04', nama: 'Ibrahim Al-Dossari' },
  { id: '05', nama: 'Misyari Rasyid Al-Afasi' },
  { id: '06', nama: 'Yasser Al-Dosari' },
]

const TAJWEED_DETAILS = {
  h: { c: 'tj-gray', n: 'Hamzatul Wasl', d: 'Tidak dibaca', f: 'Huruf Hamzah (ٱ) yang terletak di awal kata, tertulis di mushaf namun tidak diucapkan ketika dibaca bersambung (washal) dengan kata sebelumnya.', b: 'ٱ', l: 'ٱ' },
  s: { c: 'tj-gray', n: 'Silent Letter', d: 'Huruf tidak dibaca', f: 'Huruf yang tertulis dalam mushaf namun tidak diucapkan saat dibaca (seperti alif setelah wawu jamak, contoh: كَفَرُواْ).', b: 'ـاْ', l: 'ا' },
  l: { c: 'tj-gray', n: 'Alif Lam Syamsiyyah', d: 'Alif Lam dilebur', f: 'Terjadi apabila Alif Lam (ال) bertemu dengan 14 huruf Syamsiyyah. Huruf Lam tidak dibaca (dilebur) dan langsung masuk/ditasydidkan ke huruf berikutnya.', b: 'ٱلشَّ', l: 'ل' },
  n: { c: 'tj-blue-light', n: 'Mad Thabi\'i', d: 'Panjang 2 harakat', f: 'Terjadi jika Fathah diikuti Alif (ـَا), Kasrah diikuti Ya sukun (ـِيْ), atau Dhammah diikuti Wawu sukun (ـُوْ). Dibaca panjang 2 harakat (1 alif).', b: 'ـَ ا / ـِ يْ / ـُ وْ', l: 'ـَا' },
  p: { c: 'tj-pink', n: 'Mad Jaiz Munfashil', d: 'Panjang 4-5 harakat', f: 'Terjadi apabila Mad Thabi\'i bertemu dengan huruf Hamzah (ء) atau Alif (ا) di kata yang berbeda/terpisah. Dibaca panjang 4-5 harakat.', b: 'ـَـآء', l: 'آ' },
  m: { c: 'tj-pink', n: 'Mad Wajib Muttashil', d: 'Panjang 4-5 harakat', f: 'Terjadi apabila Mad Thabi\'i bertemu dengan huruf Hamzah (ء) di dalam satu kata. Wajib dibaca panjang 4-5 harakat.', b: 'ـَـآء', l: 'آ' },
  q: { c: 'tj-red', n: 'Qalqalah', d: 'Memantul / Bergetar', f: 'Huruf Qalqalah ada 5: ق ط ب ج د. Terjadi apabila huruf tersebut bersukun asli (Sughra) atau dihentikan/waqaf (Kubra). Dibaca memantul atau bergetar.', b: 'ـقْ ـطْ ـبْ ـجْ ـدْ', l: 'ق' },
  g: { c: 'tj-orange', n: 'Ghunnah', d: 'Mendengung 2 harakat', f: 'Terjadi apabila huruf Nun (ن) atau Mim (م) bertasydid. Cara membacanya adalah dengan mendengung kuat dan ditahan selama 2 harakat.', b: 'نّ / مّ', l: 'نّ' },
  f: { c: 'tj-purple', n: 'Ikhfa Haqiqi', d: 'Samar & Mendengung', f: 'Terjadi apabila Nun sukun atau Tanwin bertemu dengan salah satu dari 15 huruf Ikhfa: ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك. Dibaca samar menyembunyikan bunyi nun/tanwin, condong ke makhraj huruf setelahnya, dan disertai dengungan selama 2 harakat.', b: 'ـًـٍـٌ / نْ', l: 'نْ' },
  i: { c: 'tj-green', n: 'Iqlab', d: 'Mengubah ke mim', f: 'Terjadi apabila Nun sukun atau Tanwin bertemu dengan huruf Ba (ب). Bunyi nun diubah menjadi bunyi mim (م) kecil dan dibaca mendengung 2 harakat dengan bibir merapat perlahan.', b: 'مۢ', l: 'مۢ' },
  u: { c: 'tj-yellow', n: 'Idgham Bighunnah', d: 'Masuk & Mendengung', f: 'Terjadi apabila Nun sukun/Tanwin bertemu huruf: ي ن م و. Bunyi dilebur/masuk ke huruf berikutnya secara penuh dan disertai dengungan kuat 2 harakat.', b: 'ي ن م و', l: 'ي' },
  d: { c: 'tj-gray', n: 'Idgham Bilaghunnah', d: 'Masuk tanpa dengung', f: 'Terjadi apabila Nun sukun/Tanwin bertemu huruf Lam (ل) atau Ra (ر). Bunyi dilebur penuh (masuk ke huruf berikutnya) namun dibaca jelas tanpa disertai dengung.', b: 'ل ر', l: 'ل' },
  c: { c: 'tj-cyan', n: 'Ikhfa Syafawi', d: 'Samar di bibir', f: 'Terjadi apabila Mim sukun (مْ) bertemu dengan huruf Ba (ب). Cara membacanya dengan merapatkan bibir secara lunak (samar) dan menahan dengung selama 2 harakat.', b: 'مْ ب', l: 'مْ' },
}

// ─── TAJWEED PARSER ──────────────────────────────────────
const parseTajweedToHtml = (word) => {
  if (!word) return ''
  const regex = /\[([a-z0-9_:]+)\[([^\]]+)\]/gi
  return word.replace(regex, (match, rule, content) => {
    const type = rule.split(':')[0].toLowerCase()
    let colorClass = ''
    let description = ''
    switch (type) {
      case 'h': colorClass = 'tj-gray'; description = 'Hamzatul Wasl'; break
      case 's': colorClass = 'tj-gray'; description = 'Silent Letter'; break
      case 'l': colorClass = 'tj-gray'; description = 'Alif Lam Shamsiyyah'; break
      case 'n': colorClass = 'tj-blue-light'; description = 'Mad Thabi’i'; break
      case 'p': colorClass = 'tj-blue-dark'; description = 'Mad Jaiz Munfashil'; break
      case 'm': colorClass = 'tj-blue-dark'; description = 'Mad Wajib Muttashil'; break
      case 'q': colorClass = 'tj-red'; description = 'Qalqalah'; break
      case 'g': colorClass = 'tj-orange'; description = 'Ghunnah'; break
      case 'f': colorClass = 'tj-purple'; description = 'Ikhfa'; break
      case 'i': colorClass = 'tj-green'; description = 'Iqlab'; break
      case 'u':
      case 'd': colorClass = 'tj-orange'; description = 'Idgham'; break
      case 'c': colorClass = 'tj-purple'; description = 'Ikhfa Shafawi'; break
      default: colorClass = ''
    }
    return `<span class="${colorClass}" title="${description}">${content}</span>`
  })
}

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
  darkMode,
  tajweedText,
  nextAyatFirstWord,
  hufazLayout,
  blokIndex,
  ayatIndexInBlok,
  bridgeMode,
  showLatin,
  showArti
}) => {
  const words = useMemo(() => {
    let text = tajweedText || ayat.teksArab

    // Hapus simbol Hizb (۞), Sajdah (۩), End of Ayah (۝), dan invisible formatting characters secara global (sering bikin kotak-kotak di HP)
    text = text.replace(/[\u06DE\u06E9\u06DD\u200B-\u200F\u202A-\u202E\u2060-\u2069\uFEFF]/g, '')
    // Hapus tanda waqf, angka arab, dll yang HANYA ada di akhir ayat
    text = text.replace(/\s*[\u06D6-\u06DC\u06DF\u06E2\u0660-\u0669\u06F0-\u06F9\u08E4-\u08E9]+$/g, '')

    if (tajweedText) {
      text = text.replace(/\[([a-z0-9_:]+)\[([^\]]+)\]/gi, (m) => m.replace(/ /g, '&#160;'))
    }
    return text.trim().split(' ')
  }, [ayat.teksArab, tajweedText])
  const isFullyRevealed = revealedWords.length === words.length && revealedWords.every(Boolean)

  const activeTajweed = React.useMemo(() => {
    if (!tajweedText) return []
    const rulesFound = new Set()
    const regex = /\[([a-z0-9_:]+)\[([^\]]+)\]/gi
    let match
    while ((match = regex.exec(tajweedText)) !== null) {
      const type = match[1].split(':')[0].toLowerCase()
      if (TAJWEED_DETAILS[type]) {
        rulesFound.add(type)
      }
    }
    const priority = ['q', 'g', 'i', 'n', 'm', 'p', 'f', 'u', 'd', 'c', 'h', 's', 'l']
    return Array.from(rulesFound)
      .sort((a, b) => priority.indexOf(a) - priority.indexOf(b))
      .map(type => TAJWEED_DETAILS[type])
  }, [tajweedText])

  return (
    <div id={`ayat-${ayat.nomorAyat}`} className={`rounded-[2rem] transition-all duration-500 overflow-hidden backdrop-blur-sm ${isPlaying
      ? darkMode
        ? 'bg-primary/10 border-primary/40 ring-2 ring-primary/30 shadow-lg shadow-primary/10'
        : 'bg-primary/5 border-primary/30 ring-2 ring-primary/20 shadow-lg shadow-primary/10'
      : modeHafalan
        ? isHafal
          ? darkMode ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-emerald-500/10 border border-emerald-500/20'
          : 'bg-transparent border-transparent shadow-none'
        : isHafal
          ? darkMode ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-500/5 border border-emerald-500/20'
          : darkMode ? 'bg-slate-900/30 border border-white/5' : 'bg-white/50 border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
      }`}>
      {/* Ayat Header Row */}
      <div className={`flex items-center justify-between px-5 py-3.5 border-b ${darkMode ? 'border-white/5' : 'border-slate-100'
        }`}>
        {/* Left: Number + Hafal Badge */}
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-black ${isHafal
            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
            : isPlaying
              ? 'bg-primary text-white shadow-md shadow-primary/30'
              : darkMode ? 'bg-white/10 text-white/70' : 'bg-slate-100 text-slate-500'
            }`}>
            {ayat.nomorAyat}
          </div>
          {modeHafalan && (
            <button
              onClick={() => onToggleHafalan(ayat.nomorAyat)}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-xl transition-all border uppercase tracking-wider ${isHafal
                ? darkMode ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                : darkMode ? 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}
            >
              <span className="material-icons text-[14px] align-middle mr-1">{isHafal ? 'check_circle' : 'radio_button_unchecked'}</span>
              {isHafal ? 'Hafal' : 'Tandai'}
            </button>
          )}
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-1.5">
          {modeHafalan && (
            <button
              onClick={() => {
                if (isFullyRevealed) onHideAllWords(ayat.nomorAyat)
                else onRevealAllWords(ayat.nomorAyat, words.length)
              }}
              className={`p-2 rounded-xl transition-all ${isFullyRevealed
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
            className={`p-2 rounded-xl transition-all ${isLooping
              ? darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'
              : darkMode ? 'bg-white/5 text-slate-500 hover:bg-white/10' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
              }`}
            title="Loop"
          >
            <span className="material-icons text-[18px]">repeat</span>
          </button>
          <button
            onClick={() => onPlay(ayat)}
            className={`p-2 rounded-xl transition-all ${isPlaying
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
        <p className={`text-right font-arabic text-slate-800 dark:text-white transition-all duration-300 ${fontSizeLevel === 1 ? 'text-[1.3rem] sm:text-[1.5rem] leading-[2.2]' :
          fontSizeLevel === 2 ? 'text-[1.7rem] sm:text-[2rem] leading-[2.4]' :
            fontSizeLevel === 3 ? 'text-[2.2rem] sm:text-[2.6rem] leading-[2.6]' :
              fontSizeLevel === 4 ? 'text-[2.8rem] sm:text-[3.3rem] leading-[2.8]' :
                'text-[3.5rem] sm:text-[4.2rem] leading-[3.2]'
          }`} dir="rtl" lang="ar">
          {words.map((word, wIdx) => {
            const isWordRevealed = revealedWords[wIdx];
            const isWordBlur = modeHafalan && !isWordRevealed && !(bridgeMode && (wIdx === 0 || wIdx === words.length - 1));
            const cleanedWord = word.replace(/\[[a-z0-9_:]+\[\]\]/gi, '');
            const parsedHtml = modeHafalan && tajweedText && !isWordBlur
              ? parseTajweedToHtml(cleanedWord)
              : cleanedWord.replace(/\[([a-z0-9_:]+)\[([^\]]+)\]/gi, '$2').replace(/&#160;/g, ' ');

            return (
              <React.Fragment key={wIdx}>
                {modeHafalan && tajweedText && !isWordBlur ? (
                  <span
                    onClick={() => modeHafalan && onToggleWordReveal(ayat.nomorAyat, wIdx)}
                    className={`transition-all duration-300 inline-block px-0.5 rounded-lg ${isWordBlur
                      ? 'blur-[8px] opacity-40 hover:opacity-60 cursor-pointer'
                      : modeHafalan && isWordRevealed
                        ? 'cursor-pointer hover:bg-primary/10 rounded-lg'
                        : ''
                      }`}
                    dangerouslySetInnerHTML={{ __html: parsedHtml }}
                  />
                ) : (
                  <span
                    onClick={() => modeHafalan && onToggleWordReveal(ayat.nomorAyat, wIdx)}
                    className={`transition-all duration-300 inline-block px-0.5 rounded-lg ${isWordBlur
                      ? 'blur-[8px] opacity-40 hover:opacity-60 cursor-pointer'
                      : modeHafalan && isWordRevealed
                        ? 'cursor-pointer hover:bg-primary/10 rounded-lg'
                        : ''
                      }`}
                  >
                    {parsedHtml}
                  </span>
                )}
                {' '}
              </React.Fragment>
            )
          })}
        </p>
      </div>

      {/* Latin + Translation (hidden in hafalan mode) */}
      {!modeHafalan && (showLatin || showArti) && (
        <div className={`px-6 pb-6 pt-4 space-y-4 border-t ${darkMode ? 'border-white/5' : 'border-slate-100'
          }`}>
          {showLatin && (
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${darkMode ? 'text-primary/70' : 'text-primary'}`}>Transliterasi</p>
              <p className={`text-[14px] italic leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{ayat.teksLatin}</p>
            </div>
          )}
          {showArti && (
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>Terjemahan</p>
              <p className={`text-[14px] leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{ayat.teksIndonesia}</p>
            </div>
          )}
        </div>
      )}

      {/* Tajwid Guide for this Ayat (Visible ONLY in Hafalan mode) */}
      {modeHafalan && activeTajweed && activeTajweed.length > 0 && (
        <div className={`px-6 pb-6 pt-4 border-t ${darkMode ? 'border-white/5' : 'border-slate-100'}`}>
          <div className="flex items-center gap-1.5 mb-3 opacity-80">
            <span className={`material-icons text-[14px] ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>menu_book</span>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Tajwid Ayat Ini</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {activeTajweed.map((leg, idx) => (
              <div key={idx} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${darkMode ? 'border-white/10 bg-slate-800/60' : 'border-slate-200 bg-white shadow-sm transition-all hover:shadow-md'}`}>
                <span className={`font-arabic text-[15px] ${leg.c}`} dir="rtl" lang="ar">{leg.l}</span>
                <span className={`text-[11px] font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{leg.n}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Petunjuk Ayat (Bridge) */}
      {modeHafalan && bridgeMode && nextAyatFirstWord && (
        <div className={`px-6 py-3 border-t flex items-center gap-2 ${darkMode ? 'border-white/5' : 'border-slate-100'}`}>
          <span className={`material-icons text-[14px] ${darkMode ? 'text-amber-400' : 'text-amber-500'}`}>link</span>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            Petunjuk ke Ayat {ayat.nomorAyat + 1}
          </span>
          <span className="text-lg font-arabic text-primary" dir="rtl" lang="ar">
            {nextAyatFirstWord}
          </span>
        </div>
      )}
    </div>
  )
})

// ─── MAIN COMPONENT ──────────────────────────────────────
export default function Quran() {
  const { 
    hafalanData, toggleHafalan, darkMode, 
    hufazRepetisi, setHufazRepetisi 
  } = useApp()

  // Surah list state
  const [allSurahs, setAllSurahs] = useState([])
  const [loadingSurahList, setLoadingSurahList] = useState(true)
  const [surahSearch, setSurahSearch] = useState('')
  const [filterType, setFilterType] = useState('Semua') // Semua | Makkiyah | Madaniyah
  const [mainTab, setMainTab] = useState('Surat') // Surat | Juz | Hafalan
  const [selectedJuz, setSelectedJuz] = useState(null)

  // Detail state
  const [selectedSurat, setSelectedSurat] = useState(null)
  const [suratData, setSuratData] = useState(null)
  const [loadingSurat, setLoadingSurat] = useState(false)
  const [searchAyatInSurah, setSearchAyatInSurah] = useState('')
  const [showJumpModal, setShowJumpModal] = useState(false)
  const [jumpTab, setJumpTab] = useState('Ayat') // Ayat | Surat | Juz

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

  // Hufaz & Tajweed state
  const [hufazLayout, setHufazLayout] = useState('bento') // bento | card | scroll
  const [tajweedData, setTajweedData] = useState(null)
  const [loadingTajweed, setLoadingTajweed] = useState(false)
  const [showTajweedLegend, setShowTajweedLegend] = useState(false)
  const [showHufazSettings, setShowHufazSettings] = useState(true)
  const [activeBlok, setActiveBlok] = useState(0)
  const [showHafalanGuide, setShowHafalanGuide] = useState(false)
  const [bridgeMode, setBridgeMode] = useState(() => {
    try { return localStorage.getItem('sholatku_bridge_mode') === 'true' } catch { return false }
  })

  const [targetRepetisi, setTargetRepetisi] = useState(() => {
    try { return parseInt(localStorage.getItem('sholatku_hufaz_target')) || 40 } catch { return 40 }
  })

  // Tampilan state
  const [showTampilanSettings, setShowTampilanSettings] = useState(false)
  const [showLatin, setShowLatin] = useState(() => {
    try { return localStorage.getItem('sholatku_show_latin') !== 'false' } catch { return true }
  })
  const [showArti, setShowArti] = useState(() => {
    try { return localStorage.getItem('sholatku_show_arti') !== 'false' } catch { return true }
  })

  const toggleShowLatin = () => {
    setShowLatin(prev => {
      const next = !prev
      localStorage.setItem('sholatku_show_latin', String(next))
      return next
    })
  }

  const toggleShowArti = () => {
    setShowArti(prev => {
      const next = !prev
      localStorage.setItem('sholatku_show_arti', String(next))
      return next
    })
  }

  // Fetch Tajweed when modeHafalan is activated
  useEffect(() => {
    if (modeHafalan && selectedSurat && (!tajweedData || tajweedData.surat !== selectedSurat)) {
      const fetchTajweed = async () => {
        setLoadingTajweed(true)
        try {
          const res = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurat}/quran-tajweed`)
          const json = await res.json()
          if (json.code === 200) {
            const tajweedMap = {}
            json.data.ayahs.forEach(ayah => {
              tajweedMap[ayah.numberInSurah] = ayah.text
            })
            setTajweedData({ surat: selectedSurat, ayahs: tajweedMap })
          }
        } catch (err) {
          console.error('Gagal memuat tajwid:', err)
        }
        setLoadingTajweed(false)
      }
      fetchTajweed()
    }
  }, [modeHafalan, selectedSurat, tajweedData])

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

  const hufazBlocks = useMemo(() => {
    if (!suratData) return []
    const blocks = []
    const ayahs = suratData.ayat
    for (let i = 0; i < ayahs.length; i += 5) {
      blocks.push(ayahs.slice(i, i + 5))
    }
    return blocks
  }, [suratData])

  const getRepKey = (surahNomor, blokIdx) => `${surahNomor}_${blokIdx}`

  const updateRepetisi = (surahNomor, blokIdx, delta) => {
    setHufazRepetisi(prev => {
      const key = getRepKey(surahNomor, blokIdx)
      const current = prev[key] || 0
      const next = Math.max(0, current + delta)
      return { ...prev, [key]: next }
    })
  }

  const toggleBridgeMode = () => {
    setBridgeMode(prev => {
      const next = !prev
      localStorage.setItem('sholatku_bridge_mode', String(next))
      return next
    })
  }

  const changeTargetRepetisi = (delta) => {
    setTargetRepetisi(prev => {
      const next = Math.max(5, Math.min(100, prev + delta))
      localStorage.setItem('sholatku_hufaz_target', String(next))
      return next
    })
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

  // ─── SCROLL TO AYAT ──────────────────────────────────
  const scrollToAyat = useCallback((nomorAyat) => {
    setShowJumpModal(false)
    setTimeout(() => {
      const el = document.getElementById(`ayat-${nomorAyat}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.classList.add('ring-4', 'ring-primary', 'shadow-2xl')
        setTimeout(() => el.classList.remove('ring-4', 'ring-primary', 'shadow-2xl'), 2000)
      }
    }, 300)
  }, [])

  // ─── LOAD SURAH DETAIL ───────────────────────────────
  const loadSurat = useCallback(async (nomor, startAyat = null) => {
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
        saveLastRead(nomor, json.data.namaLatin, json.data.nama, startAyat || 1)
        
        // Scroll to top AFTER DOM has updated with the new surah
        setTimeout(() => {
          if (startAyat) {
            scrollToAyat(startAyat)
          } else {
            document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }, 150)
      }
    } catch (err) {
      console.error('Gagal memuat surat:', err)
    }
    setLoadingSurat(false)
  }, [scrollToAyat])

  // ─── FILTER LOGIC ────────────────────────────────────
  const filteredSurahs = useMemo(() => {
    let result = allSurahs
    
    if (mainTab === 'Hafalan') {
      result = result.filter(s => (hafalanData[s.nomor]?.length || 0) > 0)
    }

    if (filterType === 'Makkiyah') result = result.filter(s => s.tempatTurun === 'Mekah')
    else if (filterType === 'Madaniyah') result = result.filter(s => s.tempatTurun === 'Madinah')

    if (surahSearch.trim()) {
      const q = surahSearch.toLowerCase()
      result = result.filter(
        s => s.namaLatin.toLowerCase().includes(q) || s.arti.toLowerCase().includes(q) || String(s.nomor).includes(q)
      )
    }
    return result
  }, [surahSearch, allSurahs, filterType, mainTab, hafalanData])

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
    const renderSurahGrid = (surahs) => (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {surahs.map(s => {
          const hafalCount = hafalanData[s.nomor]?.length || 0
          return (
            <button
              key={s.nomor}
              onClick={() => {
                if (mainTab === 'Juz' && selectedJuz) {
                  loadSurat(s.nomor, s.nomor === selectedJuz.startSurah ? selectedJuz.startAyah : 1)
                } else {
                  loadSurat(s.nomor)
                }
              }}
              className={`text-left rounded-[1.8rem] p-4 transition-all duration-300 active:scale-[0.97] group relative overflow-hidden border ${darkMode ? 'bg-slate-900/40 border-white/5 hover:border-primary/30' : 'bg-white border-slate-100 hover:shadow-md hover:border-primary/20'
                }`}
            >
              {/* Hover glow */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? 'bg-gradient-to-br from-primary/10 to-transparent' : 'bg-gradient-to-br from-primary/5 to-transparent'
                }`}></div>

              <div className="relative z-10">
                {/* Top row: number + arabic */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black ${darkMode ? 'bg-white/10 text-white/60' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {s.nomor}
                  </div>
                  <span className="text-lg font-arabic text-primary/70">{s.nama}</span>
                </div>

                {/* Surah name */}
                <h3 className={`font-bold text-[14px] leading-tight mb-1 transition-colors ${darkMode ? 'text-white group-hover:text-primary' : 'text-slate-800 group-hover:text-primary-dark'
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
    )

    return (
      <div className="space-y-6 animate-fade-in pb-24 font-sans">

        {/* ── TERAKHIR DIBACA HERO ─────────────────────── */}
        {lastRead.length > 0 && (
          <div className={`relative overflow-hidden rounded-[2.5rem] p-6 shadow-xl ${darkMode ? 'bg-gradient-to-br from-[#0c1f1b] to-[#0a1614] border border-emerald-900/40' : 'bg-gradient-to-br from-primary to-emerald-500'
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
                    className={`shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all active:scale-95 ${darkMode ? 'bg-white/10 hover:bg-white/15 backdrop-blur-md' : 'bg-white/20 hover:bg-white/30 backdrop-blur-md'
                      }`}
                  >
                    <span className="text-2xl font-arabic text-white/80">{entry.nama}</span>
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
              className={`w-full pl-12 pr-4 py-3.5 rounded-2xl text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${darkMode
                ? 'bg-slate-900/60 text-white placeholder:text-slate-500 border border-white/5'
                : 'bg-white text-slate-800 placeholder:text-slate-400 border border-slate-100 shadow-sm'
                }`}
            />
          </div>
          {/* Qari Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowQariPicker(!showQariPicker)}
              className={`flex items-center gap-2 px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all border whitespace-nowrap ${darkMode
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
                <div className={`absolute right-0 top-full mt-2 z-50 w-64 rounded-2xl shadow-2xl overflow-hidden border ${darkMode ? 'bg-[#0f211f] border-white/10' : 'bg-white border-slate-200'
                  }`}>
                  <p className={`px-4 pt-3 pb-2 text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Pilih Qari</p>
                  {QARI_LIST.map(q => (
                    <button
                      key={q.id}
                      onClick={() => { setSelectedQari(q.id); setShowQariPicker(false) }}
                      className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors flex items-center gap-3 ${selectedQari === q.id
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

        {/* ── MAIN TABS ────────────────────────────────── */}
        <div className={`flex items-center gap-1 p-1.5 rounded-2xl ${darkMode ? 'bg-slate-900/60 border border-white/5' : 'bg-slate-100/80 border border-slate-200'}`}>
          {['Surat', 'Juz', 'Hafalan'].map(tab => (
            <button
              key={tab}
              onClick={() => {
                setMainTab(tab)
                if (tab !== 'Surat') setFilterType('Semua')
              }}
              className={`flex-1 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
                mainTab === tab 
                  ? darkMode ? 'bg-primary text-white shadow-md' : 'bg-white text-primary shadow-sm'
                  : darkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── FILTER PILLS ─────────────────────────────── */}
        {mainTab === 'Surat' && (
          <div className="flex items-center gap-2.5">
            {['Semua', 'Makkiyah', 'Madaniyah'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all active:scale-95 border ${filterType === type
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
        )}

        {/* ── CONTENT GRID ───────────────────────────────── */}
        {mainTab === 'Juz' && !selectedJuz ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {juzData.map(juz => {
              const startSurahName = allSurahs.find(s => s.nomor === juz.startSurah)?.namaLatin || `Surat ${juz.startSurah}`
              return (
                <button
                  key={juz.id}
                  onClick={() => setSelectedJuz(juz)}
                  className={`text-left rounded-[1.8rem] p-4 transition-all duration-300 active:scale-[0.97] group relative overflow-hidden border ${
                    darkMode ? 'bg-slate-900/40 border-white/5 hover:border-primary/30' : 'bg-white border-slate-100 hover:shadow-md hover:border-primary/20'
                  }`}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? 'bg-gradient-to-br from-primary/10 to-transparent' : 'bg-gradient-to-br from-primary/5 to-transparent'}`}></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-black ${darkMode ? 'bg-white/10 text-white/60' : 'bg-slate-100 text-slate-500'}`}>
                        {juz.id}
                      </div>
                    </div>
                    <h3 className={`font-bold text-[15px] leading-tight mb-1 transition-colors ${darkMode ? 'text-white group-hover:text-primary' : 'text-slate-800 group-hover:text-primary-dark'}`}>
                      {juz.name}
                    </h3>
                    <p className={`text-[11px] font-medium ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      Mulai: {startSurahName} ayat {juz.startAyah}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        ) : mainTab === 'Juz' && selectedJuz ? (
          <div className="animate-fade-in space-y-4">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => setSelectedJuz(null)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                  darkMode ? 'bg-slate-800/50 border-white/5 text-slate-300 hover:bg-slate-800 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="material-icons text-[18px]">arrow_back</span>
                Kembali
              </button>
              <h3 className={`font-black text-lg ${darkMode ? 'text-white' : 'text-slate-800'}`}>{selectedJuz.name}</h3>
            </div>
            {renderSurahGrid(allSurahs.filter(s => s.nomor >= selectedJuz.startSurah && s.nomor <= selectedJuz.endSurah))}
          </div>
        ) : loadingSurahList ? (
          <SurahListSkeleton darkMode={darkMode} />
        ) : filteredSurahs.length === 0 ? (
          <div className={`text-center py-20 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <span className="material-icons text-5xl mb-3 block opacity-30">search_off</span>
            <p className="text-lg font-bold">Tidak ditemukan</p>
          </div>
        ) : (
          renderSurahGrid(filteredSurahs)
        )}
      </div>
    )
  }

  // ════════════════════════════════════════════════════════
  // RENDER: SURAH DETAIL VIEW
  // ════════════════════════════════════════════════════════
  const surahJuzs = suratData 
    ? juzData.filter(j => suratData.nomor >= j.startSurah && suratData.nomor <= j.endSurah).map(j => j.id)
    : []
  const juzText = surahJuzs.length > 0 ? ` • Juz ${surahJuzs.length === 1 ? surahJuzs[0] : `${surahJuzs[0]}-${surahJuzs[surahJuzs.length - 1]}`}` : ''

  return (
    <div className="space-y-5 animate-fade-in pb-24 font-sans">
      {/* ── STICKY HEADER ──────────────────────────────── */}
      <div className={`sticky top-0 z-30 flex items-center gap-3 px-6 py-4 rounded-[2rem] backdrop-blur-md border ${darkMode
        ? 'bg-[#0c1a18]/30 border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.2)]'
        : 'bg-white/40 border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
        }`}>
        <button
          onClick={goBack}
          className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all border ${darkMode
            ? 'bg-white/5 border-white/5 text-white hover:bg-white/10'
            : 'bg-white/50 border-white/40 text-slate-600 hover:bg-white/80 shadow-sm'
            }`}
        >
          <span className="material-icons text-[20px]">arrow_back</span>
        </button>
        {suratData && (
          <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className={`text-lg font-black truncate ${darkMode ? 'text-white' : 'text-slate-800'}`}>{suratData.namaLatin}</h3>
                <span className="text-lg font-arabic text-primary shrink-0">{suratData.nama}</span>
              </div>
              <p className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? 'text-primary/60' : 'text-primary/70'}`}>
                {suratData.arti} • {suratData.jumlahAyat} ayat • {suratData.tempatTurun}{juzText}
              </p>
              {(modeHafalan || (hafalanData[suratData.nomor]?.length || 0) > 0) && (
                <div className="mt-1.5 flex items-center gap-2">
                  <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800/60' : 'bg-slate-200/80'}`}>
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${((hafalanData[suratData.nomor]?.length || 0) / suratData.jumlahAyat) * 100}%` }}></div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500">{(hafalanData[suratData.nomor]?.length || 0)}/{suratData.jumlahAyat} Hafal</span>
                </div>
              )}
            </div>
            <button
              onClick={() => { setShowJumpModal(true); setJumpTab('Surat'); }}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all border shrink-0 ${darkMode
                ? 'bg-primary/20 border-primary/30 text-primary hover:bg-primary/30'
                : 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 shadow-sm'
                }`}
            >
              <span className="material-icons text-[20px]">search</span>
            </button>
          </div>
        )}
      </div>

      {loadingSurat ? (
        <AyatListSkeleton darkMode={darkMode} />
      ) : suratData && (
        <>
          {/* ── BISMILLAH BANNER ───────────────────────── */}
          {suratData.nomor !== 1 && suratData.nomor !== 9 && (
            <div className={`text-center py-8 rounded-[2rem] relative overflow-hidden ${darkMode ? 'bg-slate-900/50 border border-white/5' : 'bg-gradient-to-b from-primary/5 to-transparent border border-primary/10'
              }`}>
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, ${darkMode ? 'rgba(13,150,139,0.15)' : 'rgba(13,150,139,0.08)'} 0%, transparent 70%)`
              }}></div>
              <p className="text-3xl sm:text-4xl font-arabic text-primary relative z-10" dir="rtl" lang="ar">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </p>
              <p className={`text-[11px] mt-3 font-semibold relative z-10 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                Dengan nama Allah Yang Maha Pengasih, Maha Penyayang
              </p>
            </div>
          )}

          {/* ── STICKY CONTROL BAR ─────────────────────── */}
          <div
            className={`sticky z-20 flex flex-col gap-3 px-3 sm:px-6 py-4 rounded-3xl backdrop-blur-xl border shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ${darkMode
              ? 'bg-[#0c1a18]/40 border-white/5'
              : 'bg-white/50 border-white/60'
              }`}
            style={{ top: (modeHafalan || (hafalanData[suratData.nomor]?.length || 0) > 0) ? '104px' : '84px' }}
          >
            <div className="flex items-center justify-between gap-1 sm:gap-3 w-full">
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Play Full */}
                <button
                  onClick={toggleFullAudio}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2.5 rounded-xl text-[11px] sm:text-[12px] font-bold transition-all active:scale-95 border ${playingFull
                    ? 'bg-red-500/90 text-white border-red-500/50 shadow-[0_4px_20px_rgba(239,68,68,0.3)]'
                    : darkMode
                      ? 'bg-primary/20 text-primary border-primary/30 hover:bg-primary/30'
                      : 'bg-primary/10 text-primary-dark border-primary/20 hover:bg-primary/20'
                    }`}
                >
                  <span className="material-icons text-[16px] sm:text-[18px]">{playingFull ? 'stop' : 'play_arrow'}</span>
                  <span className="inline">{playingFull ? 'Stop' : 'Putar'}</span>
                </button>

                {/* Font Size Controls */}
                <div className={`flex items-center rounded-xl p-0.5 sm:p-1 border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                  <button
                    onClick={() => changeFontSize(-1)}
                    disabled={fontSizeLevel <= 1}
                    className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg transition-all ${fontSizeLevel <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary/20 hover:text-primary active:scale-95'
                      } ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}
                  >
                    <span className="font-bold text-[10px] sm:text-[11px]">A-</span>
                  </button>
                  <div className={`w-px h-3 sm:h-4 mx-0.5 sm:mx-1 ${darkMode ? 'bg-white/10' : 'bg-slate-300'}`}></div>
                  <button
                    onClick={() => changeFontSize(1)}
                    disabled={fontSizeLevel >= 5}
                    className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg transition-all ${fontSizeLevel >= 5 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary/20 hover:text-primary active:scale-95'
                      } ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}
                  >
                    <span className="font-bold text-[13px] sm:text-[14px]">A+</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-3">
                {/* Toggles Latin & Arti */}
                {!modeHafalan && (
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={toggleShowLatin}
                      className={`px-2 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all border ${showLatin
                        ? (darkMode ? 'bg-primary/20 text-primary border-primary/30' : 'bg-primary/10 text-primary-dark border-primary/20')
                        : (darkMode ? 'bg-slate-800/50 border-white/5 text-slate-400 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 shadow-sm')
                        }`}
                    >
                      Latin
                    </button>
                    <button
                      onClick={toggleShowArti}
                      className={`px-2 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all border ${showArti
                        ? (darkMode ? 'bg-primary/20 text-primary border-primary/30' : 'bg-primary/10 text-primary-dark border-primary/20')
                        : (darkMode ? 'bg-slate-800/50 border-white/5 text-slate-400 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 shadow-sm')
                        }`}
                    >
                      Arti
                    </button>
                  </div>
                )}

                {/* Hafalan Toggle */}
                <div className="flex items-center gap-1.5 sm:gap-2.5 bg-primary/5 px-2 sm:px-3 py-1.5 rounded-xl border border-primary/10">
                  <span className={`hidden md:inline text-[12px] font-bold ${darkMode ? 'text-primary' : 'text-primary-dark'}`}>Hafalan</span>
                  <button
                    onClick={() => setModeHafalan(p => !p)}
                    className={`w-9 sm:w-11 h-5 sm:h-6 flex items-center rounded-full p-0.5 transition-all duration-300 ${modeHafalan ? 'bg-primary shadow-md shadow-primary/30' : darkMode ? 'bg-slate-700' : 'bg-slate-300'
                      }`}
                  >
                    <div className={`bg-white w-4 sm:w-5 h-4 sm:h-5 rounded-full shadow transform transition-transform duration-300 ${modeHafalan ? 'translate-x-4 sm:translate-x-5' : 'translate-x-0'
                      }`} />
                  </button>
                </div>

                {modeHafalan && (
                  <button
                    onClick={() => setShowHufazSettings(!showHufazSettings)}
                    className={`p-1.5 sm:p-2 rounded-xl transition-all border ${showHufazSettings
                      ? darkMode ? 'bg-primary/20 text-primary border-primary/30' : 'bg-primary/10 text-primary-dark border-primary/20'
                      : darkMode ? 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                      }`}
                  >
                    <span className={`material-icons text-[18px] transition-transform duration-300 ${showHufazSettings ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* ── HUFAZ TOOLBAR (MERGED) ─────────────────────────────── */}
            {modeHafalan && showHufazSettings && (
              <div className={`pt-3 mt-1 border-t ${darkMode ? 'border-white/10' : 'border-slate-200'} flex flex-col gap-3 animate-fade-in`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center p-1 rounded-lg ${darkMode ? 'bg-black/30' : 'bg-slate-100'}`}>
                      {['bento', 'scroll'].map((layout) => (
                        <button
                          key={layout}
                          onClick={() => setHufazLayout(layout)}
                          className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-all ${hufazLayout === layout
                            ? (darkMode ? 'bg-primary/20 text-primary' : 'bg-white shadow-sm text-primary-dark')
                            : (darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800')
                            }`}
                        >
                          {layout === 'bento' ? 'Bento Focus' : 'Scroll'}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowHafalanGuide(true)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all border ${darkMode ? 'bg-slate-800/50 border-white/10 text-white hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                        }`}
                    >
                      <span className="material-icons text-[14px] text-emerald-500">menu_book</span>
                      <span className="hidden sm:inline">Hafalan</span>
                    </button>
                    <button
                      onClick={() => setShowTajweedLegend(true)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all border ${darkMode ? 'bg-slate-800/50 border-white/10 text-white hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                        }`}
                    >
                      <span className="material-icons text-[14px] text-amber-500">info</span>
                      <span className="hidden sm:inline">Tajwid</span>
                    </button>
                  </div>
                </div>

                {/* Bridge Mode + Target Repetisi */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[11px] font-bold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Petunjuk Ayat:</span>
                    <button
                      onClick={toggleBridgeMode}
                      className={`w-9 sm:w-11 h-5 sm:h-6 flex items-center rounded-full p-0.5 transition-all duration-300 ${bridgeMode ? 'bg-amber-500 shadow-md shadow-amber-500/30' : darkMode ? 'bg-slate-700' : 'bg-slate-300'}`}
                    >
                      <div className={`bg-white w-4 sm:w-5 h-4 sm:h-5 rounded-full shadow transform transition-transform duration-300 ${bridgeMode ? 'translate-x-4 sm:translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Target:</span>
                    <button
                      onClick={() => changeTargetRepetisi(-5)}
                      className={`w-6 h-6 flex items-center justify-center rounded-md text-[12px] font-bold transition-all ${darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
                    >−</button>
                    <span className={`text-[12px] font-black min-w-[24px] text-center ${darkMode ? 'text-white' : 'text-slate-700'}`}>{targetRepetisi}x</span>
                    <button
                      onClick={() => changeTargetRepetisi(5)}
                      className={`w-6 h-6 flex items-center justify-center rounded-md text-[12px] font-bold transition-all ${darkMode ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                    >+</button>
                  </div>
                </div>

                {/* BENTO BLOCK NAVIGATION */}
                {hufazLayout !== 'scroll' && hufazBlocks.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                    <button
                      onClick={() => setActiveBlok(-1)}
                      className={`shrink-0 px-4 py-2 rounded-xl text-[11px] font-bold transition-all border ${activeBlok === -1
                        ? (darkMode ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-500 text-white border-emerald-600 shadow-sm')
                        : (darkMode ? 'bg-slate-800/50 border-white/5 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100')
                        }`}
                    >
                      Semua Blok
                    </button>
                    {hufazBlocks.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveBlok(idx)}
                        className={`shrink-0 px-4 py-2 rounded-xl text-[11px] font-bold transition-all border ${activeBlok === idx
                          ? (darkMode ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-500 text-white border-emerald-600 shadow-sm')
                          : (darkMode ? 'bg-slate-800/50 border-white/5 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100')
                          }`}
                      >
                        Blok {idx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── AYAT LIST ──────────────────────────────── */}
          <div className="mt-6 space-y-4">
            {(() => {
              const blockColors = [
                darkMode ? 'bg-[#0F2D24]/40 border-[#137333]' : 'bg-[#137333]/10 border-[#137333]',
                darkMode ? 'bg-[#1A2D4C]/40 border-[#1A73E8]' : 'bg-[#1A73E8]/10 border-[#1A73E8]',
                darkMode ? 'bg-[#3C2D0F]/40 border-[#B06000]' : 'bg-[#B06000]/10 border-[#B06000]',
                darkMode ? 'bg-[#3C1A1A]/40 border-[#C5221F]' : 'bg-[#C5221F]/10 border-[#C5221F]',
                darkMode ? 'bg-[#2D164D]/40 border-[#7627E2]' : 'bg-[#7627E2]/10 border-[#7627E2]'
              ]
              const blockAccents = [
                darkMode ? 'border-[#137333]/50 bg-[#0F2D24]/30' : 'border-[#137333]/30 bg-[#137333]/5',
                darkMode ? 'border-[#1A73E8]/50 bg-[#1A2D4C]/30' : 'border-[#1A73E8]/30 bg-[#1A73E8]/5',
                darkMode ? 'border-[#B06000]/50 bg-[#3C2D0F]/30' : 'border-[#B06000]/30 bg-[#B06000]/5',
                darkMode ? 'border-[#C5221F]/50 bg-[#3C1A1A]/30' : 'border-[#C5221F]/30 bg-[#C5221F]/5',
                darkMode ? 'border-[#7627E2]/50 bg-[#2D164D]/30' : 'border-[#7627E2]/30 bg-[#7627E2]/5',
              ]
              const barColors = ['bg-[#137333]', 'bg-[#1A73E8]', 'bg-[#B06000]', 'bg-[#C5221F]', 'bg-[#7627E2]']
              const blockLabels = ['Emerald', 'Indigo', 'Amber', 'Rose', 'Purple']
              const blockEmojis = ['🟢', '🔵', '🟡', '🔴', '🟣']

              const renderAyat = (ayat) => {
                const isHafal = hafalanData[suratData.nomor]?.includes(ayat.nomorAyat)
                const currentRevealedWords = revealedWords[ayat.nomorAyat] || []
                const tajweedText = tajweedData?.ayahs[ayat.nomorAyat]
                const blockIndex = modeHafalan ? Math.floor((ayat.nomorAyat - 1) / 5) % 5 : 0
                const cardWrapperClass = modeHafalan
                  ? `p-2.5 sm:p-3 rounded-[2rem] border ${blockColors[blockIndex]}`
                  : ''

                const ayatIdx = suratData.ayat.findIndex(a => a.nomorAyat === ayat.nomorAyat)
                const nextAyat = ayatIdx < suratData.ayat.length - 1 ? suratData.ayat[ayatIdx + 1] : null
                let nextAyatFirstWord = null
                if (nextAyat) {
                  let nextText = nextAyat.teksArab.replace(/[\u06DE\u06E9\u06DD\u200B-\u200F\u202A-\u202E\u2060-\u2069\uFEFF]/g, '')
                  nextText = nextText.replace(/\s*[\u06D6-\u06DC\u06DF\u06E2\u0660-\u0669\u06F0-\u06F9\u08E4-\u08E9]+$/g, '')
                  nextAyatFirstWord = nextText.trim().split(' ')[0]
                }

                return (
                  <div key={ayat.nomorAyat} className={cardWrapperClass}>
                    <AyatItem
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
                      tajweedText={tajweedText}
                      nextAyatFirstWord={nextAyatFirstWord}
                      hufazLayout={hufazLayout}
                      blokIndex={blockIndex}
                      ayatIndexInBlok={0}
                      bridgeMode={bridgeMode}
                      showLatin={showLatin}
                      showArti={showArti}
                    />
                  </div>
                )
              }

              const renderRepHeader = (blokIdx, blockAyats) => {
                const repKey = getRepKey(suratData.nomor, blokIdx)
                const repCount = hufazRepetisi[repKey] || 0
                const pct = Math.min(100, Math.round((repCount / targetRepetisi) * 100))
                const colorIdx = blokIdx % 5
                const firstAyat = blockAyats[0]?.nomorAyat || '?'
                const lastAyat = blockAyats[blockAyats.length - 1]?.nomorAyat || '?'

                return (
                  <div key={`rep-${blokIdx}`} className={`rounded-2xl border p-4 ${blockAccents[colorIdx]}`}>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{blockEmojis[colorIdx]}</span>
                        <span className={`text-[12px] font-bold ${darkMode ? 'text-white' : 'text-slate-700'}`}>
                          Blok {blokIdx + 1} — {blockLabels[colorIdx]}
                        </span>
                        <span className={`text-[11px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                          Ayat {firstAyat} - {lastAyat}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider shrink-0 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Repetisi</span>
                      <button
                        onClick={() => updateRepetisi(suratData.nomor, blokIdx, -1)}
                        className={`w-7 h-7 flex items-center justify-center rounded-lg text-[14px] font-bold transition-all shrink-0 ${darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                      >−</button>
                      <span className={`text-[13px] font-black min-w-[52px] text-center shrink-0 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        {repCount} / {targetRepetisi}
                      </span>
                      <button
                        onClick={() => updateRepetisi(suratData.nomor, blokIdx, 1)}
                        className={`w-7 h-7 flex items-center justify-center rounded-lg text-[14px] font-bold transition-all shrink-0 ${darkMode ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                      >+</button>
                      <div className="flex-1 flex items-center gap-2 min-w-0">
                        <div className={`flex-1 h-2 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                          <div className={`h-full rounded-full transition-all duration-500 ${barColors[colorIdx]}`} style={{ width: `${pct}%` }}></div>
                        </div>
                        <span className={`text-[10px] font-bold shrink-0 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{pct}%</span>
                      </div>
                    </div>
                  </div>
                )
              }

              if (modeHafalan && hufazLayout !== 'scroll' && activeBlok !== -1) {
                const block = hufazBlocks[activeBlok] || []
                return (
                  <>
                    {renderRepHeader(activeBlok, block)}
                    {block.map(ayat => renderAyat(ayat))}
                  </>
                )
              }

              if (modeHafalan) {
                return hufazBlocks.map((block, blokIdx) => (
                  <div key={`block-${blokIdx}`} className="space-y-4">
                    {renderRepHeader(blokIdx, block)}
                    {block.map(ayat => renderAyat(ayat))}
                  </div>
                ))
              }

              return suratData.ayat.map(ayat => renderAyat(ayat))
            })()}
          </div>

          {/* ── PREV / NEXT SURAH NAVIGATION ───────────── */}
          <div className={`flex items-center gap-3 mt-8 pt-6 border-t ${darkMode ? 'border-white/5' : 'border-slate-200'}`}>
            {selectedSurat > 1 && (
              <button
                onClick={() => navigateSurat(-1)}
                className={`flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl transition-all active:scale-[0.97] border ${darkMode ? 'bg-slate-900/50 border-white/5 hover:border-primary/30 text-slate-300' : 'bg-white border-slate-100 hover:border-primary/20 text-slate-700 shadow-sm'
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
                className={`flex-1 flex items-center justify-end gap-3 px-5 py-4 rounded-2xl transition-all active:scale-[0.97] border ${darkMode ? 'bg-slate-900/50 border-white/5 hover:border-primary/30 text-slate-300' : 'bg-white border-slate-100 hover:border-primary/20 text-slate-700 shadow-sm'
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
              setJumpTab('Ayat')
            }}
            className={`fixed bottom-8 right-5 sm:right-8 z-40 flex items-center justify-center gap-2 px-5 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-md border ${darkMode
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

              <div className={`relative w-full max-w-lg h-[80vh] sm:h-[60vh] flex flex-col sm:rounded-[3rem] rounded-t-[2.5rem] rounded-b-none p-6 shadow-2xl transition-transform animate-slide-up ${darkMode ? 'bg-[#0f211f]/95 border border-emerald-900/30' : 'bg-white/95 border border-slate-200'
                }`}>
                <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mb-6 sm:hidden"></div>

                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {jumpTab === 'Ayat' ? 'Lompat ke Ayat' : jumpTab === 'Surat' ? 'Pindah Surat' : 'Pindah Juz'}
                  </h3>
                  <button
                    onClick={() => setShowJumpModal(false)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${darkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'}`}
                  >
                    <span className="material-icons text-[18px]">close</span>
                  </button>
                </div>

                <div className={`flex items-center gap-1 p-1 mb-4 rounded-2xl shrink-0 ${darkMode ? 'bg-slate-900/60 border border-white/5' : 'bg-slate-100/80 border border-slate-200'}`}>
                  {['Ayat', 'Surat', 'Juz'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setJumpTab(tab)}
                      className={`flex-1 py-2.5 rounded-xl text-[12px] font-bold transition-all ${
                        jumpTab === tab 
                          ? darkMode ? 'bg-primary text-white shadow-md' : 'bg-white text-primary shadow-sm'
                          : darkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {jumpTab === 'Ayat' && (
                  <>
                    <div className="relative mb-4 shrink-0">
                      <span className={`material-icons absolute left-4 top-1/2 -translate-y-1/2 text-[18px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>search</span>
                      <input
                        type="text"
                        placeholder="Cari ayat atau kata..."
                        value={searchAyatInSurah}
                        onChange={(e) => setSearchAyatInSurah(e.target.value)}
                        className={`w-full pl-11 pr-4 py-3 rounded-2xl text-[13px] font-bold focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${darkMode ? 'bg-slate-900/60 text-white placeholder:text-slate-500 border border-white/5' : 'bg-white text-slate-800 placeholder:text-slate-400 border border-slate-100 shadow-sm'}`}
                      />
                    </div>
                    <div className="flex-1 overflow-y-auto hide-scrollbar -mx-2 px-2 pb-2">
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
                            className={`aspect-square flex items-center justify-center rounded-2xl text-[15px] font-black transition-all active:scale-90 border ${darkMode
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
                  </>
                )}

                {jumpTab === 'Surat' && (
                  <div className="flex-1 overflow-y-auto hide-scrollbar -mx-2 px-2 pb-2 space-y-2">
                    {allSurahs.map(s => (
                      <button
                        key={s.nomor}
                        onClick={() => { setShowJumpModal(false); loadSurat(s.nomor); }}
                        className={`w-full text-left p-4 rounded-[1.2rem] border flex items-center gap-3 transition-all ${
                          darkMode ? 'bg-slate-800/40 border-white/5 hover:bg-slate-800' : 'bg-white border-slate-100 shadow-sm hover:bg-slate-50'
                        }`}
                      >
                         <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 ${darkMode ? 'bg-white/10 text-white/60' : 'bg-slate-100 text-slate-500'}`}>
                           {s.nomor}
                         </div>
                         <div className="flex-1 min-w-0">
                           <div className={`text-[14px] font-bold truncate ${darkMode ? 'text-white' : 'text-slate-800'}`}>{s.namaLatin}</div>
                           <div className={`text-[11px] truncate ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{s.arti}</div>
                         </div>
                         <span className="font-arabic text-[18px] text-primary shrink-0">{s.nama}</span>
                      </button>
                    ))}
                  </div>
                )}

                {jumpTab === 'Juz' && (
                  <div className="flex-1 overflow-y-auto hide-scrollbar -mx-2 px-2 pb-2 grid grid-cols-2 gap-2 content-start">
                    {juzData.map(juz => (
                      <button
                        key={juz.id}
                        onClick={() => { setShowJumpModal(false); loadSurat(juz.startSurah, juz.startAyah); }}
                        className={`text-left p-4 rounded-[1.2rem] border transition-all flex flex-col items-center justify-center gap-1 ${
                          darkMode ? 'bg-slate-800/40 border-white/5 hover:bg-slate-800' : 'bg-white border-slate-100 shadow-sm hover:bg-slate-50'
                        }`}
                      >
                         <div className={`text-[16px] font-black ${darkMode ? 'text-white' : 'text-slate-800'}`}>{juz.name}</div>
                         <div className={`text-[10px] font-medium text-center ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Surat {juz.startSurah} : {juz.startAyah}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── TAJWEED LEGEND MODAL ─────────────────────── */}
          {showTajweedLegend && (
            <TajweedLegendModal darkMode={darkMode} onClose={() => setShowTajweedLegend(false)} />
          )}

          {/* ── HAFALAN GUIDE MODAL ──────────────────────── */}
          {showHafalanGuide && (
            <HafalanGuideModal darkMode={darkMode} onClose={() => setShowHafalanGuide(false)} />
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
          <div className={`flex items-center justify-between px-5 py-3.5 border-b ${darkMode ? 'border-white/5' : 'border-slate-100'
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

function TajweedLegendModal({ darkMode, onClose }) {
  const [expanded, setExpanded] = useState(null)
  const [touchStartY, setTouchStartY] = useState(null)

  const handleTouchStart = (e) => setTouchStartY(e.touches[0].clientY)
  const handleTouchMove = (e) => {
    if (!touchStartY) return
    const currentY = e.touches[0].clientY
    if (currentY - touchStartY > 80) { // swipe down threshold
      onClose()
      setTouchStartY(null)
    }
  }
  const handleTouchEnd = () => setTouchStartY(null)

  const legendData = [
    TAJWEED_DETAILS.q,
    TAJWEED_DETAILS.g,
    TAJWEED_DETAILS.i,
    TAJWEED_DETAILS.n,
    TAJWEED_DETAILS.m,
    TAJWEED_DETAILS.p,
    TAJWEED_DETAILS.f,
    TAJWEED_DETAILS.u,
    TAJWEED_DETAILS.d,
    TAJWEED_DETAILS.c,
    TAJWEED_DETAILS.h,
    TAJWEED_DETAILS.s,
    TAJWEED_DETAILS.l,
  ]

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div
        className={`relative w-full max-w-md max-h-[85vh] flex flex-col sm:rounded-[2.5rem] rounded-t-[2.5rem] rounded-b-none p-6 shadow-2xl transition-transform animate-slide-up ${darkMode ? 'bg-[#0f211f]/95 border border-emerald-900/30' : 'bg-white border border-slate-200'
          }`}
      >
        {/* DRAG HANDLE */}
        <div
          className="w-16 h-2 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mb-6 sm:hidden cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={onClose}
        ></div>

        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-slate-800'}`}>Panduan Tajwid</h3>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${darkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'}`}
          >
            <span className="material-icons text-[18px]">close</span>
          </button>
        </div>

        <div className="overflow-y-auto space-y-3 pr-2 hide-scrollbar pb-10">
          {legendData.map((leg, idx) => {
            const isExpanded = expanded === idx;
            return (
              <div
                key={leg.n}
                onClick={() => setExpanded(isExpanded ? null : idx)}
                className={`flex flex-col p-3 rounded-2xl border cursor-pointer transition-all duration-300 ${darkMode
                  ? isExpanded ? 'bg-slate-800/80 border-white/10' : 'bg-slate-800/40 border-white/5 hover:bg-slate-800/60'
                  : isExpanded ? 'bg-white border-slate-300 shadow-md' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl font-arabic w-8 text-center ${leg.c}`} dir="rtl" lang="ar">{leg.l}</div>
                    <div>
                      <p className={`text-sm font-bold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{leg.n}</p>
                      <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>{leg.d}</p>
                    </div>
                  </div>
                  <span className={`material-icons text-[20px] transition-transform duration-300 ${darkMode ? 'text-slate-500' : 'text-slate-400'} ${isExpanded ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </div>

                {/* Accordion Content */}
                <div className={`accordion-content overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-40 opacity-100 mt-3 pt-3 border-t' : 'max-h-0 opacity-0'} ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
                  <p className={`text-xs leading-relaxed mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {leg.f}
                  </p>
                  <div className="flex items-center gap-2 mt-2 bg-black/5 dark:bg-white/5 p-2 rounded-lg">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Tanda:</span>
                    <span className={`font-arabic text-lg ${leg.c}`} dir="rtl" lang="ar">{leg.b}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function HafalanGuideModal({ darkMode, onClose }) {
  const [touchStartY, setTouchStartY] = useState(null)

  const handleTouchStart = (e) => setTouchStartY(e.touches[0].clientY)
  const handleTouchMove = (e) => {
    if (!touchStartY) return
    if (e.touches[0].clientY - touchStartY > 80) {
      onClose()
      setTouchStartY(null)
    }
  }
  const handleTouchEnd = () => setTouchStartY(null)

  const steps = [
    {
      icon: 'grid_view',
      color: 'text-emerald-500',
      title: 'Fokus Per Blok',
      desc: 'Hafalkan satu blok warna (5 ayat) sampai lancar. Jangan lanjut ke blok berikutnya sebelum blok ini tuntas.'
    },
    {
      icon: 'repeat',
      color: 'text-indigo-500',
      title: 'Ulang 40 Kali (Repetisi)',
      desc: 'Baca ulang seluruh blok sebanyak 40 kali agar hafalan benar-benar kuat (mutqin). Gunakan counter di setiap blok untuk menghitung.'
    },
    {
      icon: 'link',
      color: 'text-amber-500',
      title: 'Petunjuk Ayat',
      desc: 'Aktifkan fitur Petunjuk Ayat di setelan. Kata pertama ayat berikutnya akan muncul di bawah card ayat sebagai pemicu memori transisi.'
    },
    {
      icon: 'visibility',
      color: 'text-rose-500',
      title: 'Uji Hafalan (Blur Mode)',
      desc: 'Kata di tengah ayat tersembunyi (blur). Tap untuk membuka satu per satu. Saat Petunjuk Ayat aktif, kata pertama & terakhir selalu terlihat.'
    },
    {
      icon: 'merge_type',
      color: 'text-purple-500',
      title: 'Gabungkan Blok',
      desc: 'Setelah semua blok selesai, pilih "Semua Blok" untuk melatih hafalan surat secara keseluruhan tanpa terputus.'
    }
  ]

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div
        className={`relative w-full max-w-md max-h-[85vh] flex flex-col sm:rounded-[2.5rem] rounded-t-[2.5rem] rounded-b-none p-6 shadow-2xl transition-transform animate-slide-up ${darkMode ? 'bg-[#0f211f]/95 border border-emerald-900/30' : 'bg-white border border-slate-200'
          }`}
      >
        {/* Drag handle */}
        <div
          className="w-16 h-2 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mb-6 sm:hidden cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={onClose}
        ></div>

        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-slate-800'}`}>Panduan Hafalan Al-Hufaz</h3>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${darkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'}`}
          >
            <span className="material-icons text-[18px]">close</span>
          </button>
        </div>

        <div className="overflow-y-auto space-y-3 pr-2 hide-scrollbar pb-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex gap-4 p-4 rounded-2xl border transition-all ${darkMode
                ? 'bg-slate-800/40 border-white/5'
                : 'bg-slate-50 border-slate-100'
                }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${darkMode ? 'bg-white/10' : 'bg-white shadow-sm'}`}>
                <span className={`material-icons text-[20px] ${step.color}`}>{step.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold mb-1 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  <span className={`text-[11px] font-black mr-2 ${darkMode ? 'text-primary' : 'text-primary-dark'}`}>{idx + 1}.</span>
                  {step.title}
                </p>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{step.desc}</p>
              </div>
            </div>
          ))}

          {/* Tips footer */}
          <div className={`flex gap-3 p-4 rounded-2xl border ${darkMode ? 'bg-amber-500/10 border-amber-500/20' : 'bg-amber-50 border-amber-200'}`}>
            <span className="material-icons text-amber-500 text-[18px] shrink-0 mt-0.5">tips_and_updates</span>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
              <strong>Tips:</strong> Konsistensi lebih penting dari kecepatan. Hafalkan sedikit tapi kuat, daripada banyak tapi mudah lupa. Semoga dimudahkan, Sobat! 🤲
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
