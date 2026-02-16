import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'

const QARI_LIST = [
  { id: '01', nama: 'Abdullah Al-Juhany' },
  { id: '02', nama: 'Abdul Muhsin Al-Qasim' },
  { id: '03', nama: 'Abdurrahman as-Sudais' },
  { id: '04', nama: 'Ibrahim Al-Dossari' },
  { id: '05', nama: 'Misyari Rasyid Al-Afasi' },
  { id: '06', nama: 'Yasser Al-Dosari' },
]

export default function Doa() {
  const [tab, setTab] = useState('doa') // 'doa' | 'quran'
  const [doaList, setDoaList] = useState([])
  const [loadingDoa, setLoadingDoa] = useState(true)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)

  // Quran state
  const [allSurahs, setAllSurahs] = useState([])
  const [loadingSurahList, setLoadingSurahList] = useState(true)
  const [surahSearch, setSurahSearch] = useState('')
  const [selectedSurat, setSelectedSurat] = useState(null)
  const [suratData, setSuratData] = useState(null)
  const [loadingSurat, setLoadingSurat] = useState(false)
  const [selectedQari, setSelectedQari] = useState('05') // Misyari default
  const [playingAyat, setPlayingAyat] = useState(null)
  const [playingFull, setPlayingFull] = useState(false)
  const audioRef = useRef(null)
  const fullAudioRef = useRef(null)

  // ─── Fetch Doa ───
  useEffect(() => {
    const fetchDoa = async () => {
      setLoadingDoa(true)
      try {
        const res = await fetch('https://open-api.my.id/api/doa')
        const data = await res.json()
        setDoaList(data)
      } catch (err) {
        console.error('Gagal memuat doa:', err)
      }
      setLoadingDoa(false)
    }
    fetchDoa()
  }, [])

  // ─── Fetch All Surahs ───
  useEffect(() => {
    const fetchSurahs = async () => {
      setLoadingSurahList(true)
      try {
        const res = await fetch('https://equran.id/api/v2/surat')
        const json = await res.json()
        if (json.code === 200) {
          setAllSurahs(json.data)
        }
      } catch (err) {
        console.error('Gagal memuat daftar surat:', err)
      }
      setLoadingSurahList(false)
    }
    fetchSurahs()
  }, [])

  // ─── Fetch Surat ───
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
      }
    } catch (err) {
      console.error('Gagal memuat surat:', err)
    }
    setLoadingSurat(false)
  }, [])

  // ─── Filter Doa ───
  const filtered = useMemo(() => {
    if (!search.trim()) return doaList
    const q = search.toLowerCase()
    return doaList.filter(
      d => d.judul.toLowerCase().includes(q) || d.terjemah.toLowerCase().includes(q)
    )
  }, [search, doaList])

  // ─── Filter Surahs ───
  const filteredSurahs = useMemo(() => {
    if (!surahSearch.trim()) return allSurahs
    const q = surahSearch.toLowerCase()
    return allSurahs.filter(
      s => s.namaLatin.toLowerCase().includes(q) || s.arti.toLowerCase().includes(q) || String(s.nomor).includes(q)
    )
  }, [surahSearch, allSurahs])

  // ─── Audio Ayat ───
  const playAyat = (ayat) => {
    if (playingAyat === ayat.nomorAyat) {
      audioRef.current?.pause()
      setPlayingAyat(null)
      return
    }
    stopFullAudio()
    if (audioRef.current) {
      audioRef.current.pause()
    }
    const url = ayat.audio[selectedQari]
    if (!url) return
    audioRef.current = new Audio(url)
    audioRef.current.play()
    setPlayingAyat(ayat.nomorAyat)
    audioRef.current.onended = () => setPlayingAyat(null)
  }

  // ─── Audio Full Surat ───
  const toggleFullAudio = () => {
    if (playingFull) {
      stopFullAudio()
      return
    }
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
    if (fullAudioRef.current) {
      fullAudioRef.current.pause()
      fullAudioRef.current = null
    }
    setPlayingFull(false)
  }

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      fullAudioRef.current?.pause()
    }
  }, [])

  const toggleExpand = (id) => {
    setExpanded(prev => prev === id ? null : id)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Doa & Al-Qur'an</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Koleksi doa harian & Al-Qur'an lengkap 114 surat</p>
      </div>

      {/* Tab Switch */}
      <div className="flex bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-1">
        <button
          onClick={() => setTab('doa')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            tab === 'doa'
              ? 'bg-primary text-white shadow-lg shadow-primary/20'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
          }`}
        >
          <span className="material-icons text-lg">menu_book</span>
          Doa Harian ({doaList.length})
        </button>
        <button
          onClick={() => setTab('quran')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            tab === 'quran'
              ? 'bg-primary text-white shadow-lg shadow-primary/20'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
          }`}
        >
          <span className="material-icons text-lg">auto_stories</span>
          Al-Qur'an ({allSurahs.length})
        </button>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* TAB 1: DOA HARIAN                         */}
      {/* ═══════════════════════════════════════════ */}
      {tab === 'doa' && (
        <div className="space-y-4">
          {/* Pencarian */}
          <div className="relative">
            <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              type="text"
              placeholder="Cari doa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          {/* Loading */}
          {loadingDoa ? (
            <div className="flex flex-col items-center py-12 gap-3">
              <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="text-sm text-slate-400">Memuat koleksi doa...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <span className="material-icons text-4xl mb-2 block">search_off</span>
              <p>Doa tidak ditemukan</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(doa => (
                <div
                  key={doa.id}
                  className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden transition-all duration-200 hover:border-primary/30"
                >
                  <button
                    onClick={() => toggleExpand(doa.id)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-primary">{doa.id}</span>
                      </div>
                      <span className="font-medium text-slate-800 dark:text-white">{doa.judul}</span>
                    </div>
                    <span className={`material-icons text-slate-400 transition-transform duration-200 ${expanded === doa.id ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>

                  {expanded === doa.id && (
                    <div className="px-4 pb-5 space-y-4 animate-fade-in">
                      {/* Teks Arab */}
                      <div className="bg-primary/5 rounded-lg p-5">
                        <p className="text-right text-2xl leading-[2.5] font-serif text-slate-800 dark:text-white" dir="rtl" lang="ar">
                          {doa.arab}
                        </p>
                      </div>
                      {/* Latin */}
                      <div>
                        <p className="text-xs text-primary font-semibold uppercase tracking-wide mb-1">Transliterasi</p>
                        <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed">{doa.latin}</p>
                      </div>
                      {/* Terjemah */}
                      <div>
                        <p className="text-xs text-accent-gold font-semibold uppercase tracking-wide mb-1">Artinya</p>
                        <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{doa.terjemah}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* TAB 2: SURAT PENDEK AL-QUR'AN + AUDIO     */}
      {/* ═══════════════════════════════════════════ */}
      {tab === 'quran' && (
        <div className="space-y-4">
          {/* Pilih Qari */}
          <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-2">Pilih Qari</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {QARI_LIST.map(q => (
                <button
                  key={q.id}
                  onClick={() => setSelectedQari(q.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                    selectedQari === q.id
                      ? 'bg-primary/15 text-primary border-primary/40'
                      : 'bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-primary/20'
                  }`}
                >
                  {q.nama}
                </button>
              ))}
            </div>
          </div>

          {/* Daftar Surat */}
          {!selectedSurat ? (
            <div className="space-y-4">
              {/* Pencarian Surat */}
              <div className="relative">
                <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                  type="text"
                  placeholder="Cari surat... (nama, arti, atau nomor)"
                  value={surahSearch}
                  onChange={(e) => setSurahSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>

              {loadingSurahList ? (
                <div className="flex flex-col items-center py-12 gap-3">
                  <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  <p className="text-sm text-slate-400">Memuat daftar surat...</p>
                </div>
              ) : filteredSurahs.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <span className="material-icons text-4xl mb-2 block">search_off</span>
                  <p>Surat tidak ditemukan</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {filteredSurahs.map(s => (
                    <button
                      key={s.nomor}
                      onClick={() => loadSurat(s.nomor)}
                      className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-3 text-left hover:border-primary/40 hover:bg-primary/5 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors">
                          <span className="text-xs font-bold text-primary">{s.nomor}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-800 dark:text-white group-hover:text-primary transition-colors">{s.namaLatin}</span>
                            <span className="text-base font-serif text-primary/70 ml-2">{s.nama}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate">{s.arti} • {s.jumlahAyat} ayat • {s.tempatTurun}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Detail Surat */
            <div className="space-y-4">
              {/* Back Button + Header */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setSelectedSurat(null); setSuratData(null); stopFullAudio(); audioRef.current?.pause(); setPlayingAyat(null) }}
                  className="p-2 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/20 transition-colors"
                >
                  <span className="material-icons text-slate-600 dark:text-slate-300">arrow_back</span>
                </button>
                {suratData && (
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white">{suratData.namaLatin}</h3>
                      <span className="text-lg font-serif text-primary">{suratData.nama}</span>
                    </div>
                    <p className="text-xs text-slate-400">{suratData.arti} • {suratData.jumlahAyat} ayat • {suratData.tempatTurun}</p>
                  </div>
                )}
              </div>

              {loadingSurat ? (
                <div className="flex flex-col items-center py-12 gap-3">
                  <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  <p className="text-sm text-slate-400">Memuat surat...</p>
                </div>
              ) : suratData && (
                <>
                  {/* Full Audio Player */}
                  <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={toggleFullAudio}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          playingFull
                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                            : 'bg-primary/15 text-primary hover:bg-primary/25'
                        }`}
                      >
                        <span className="material-icons text-2xl">
                          {playingFull ? 'stop' : 'play_arrow'}
                        </span>
                      </button>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                          {playingFull ? 'Sedang Memutar...' : 'Putar Surat Lengkap'}
                        </p>
                        <p className="text-xs text-slate-400">
                          Qari: {QARI_LIST.find(q => q.id === selectedQari)?.nama}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ayat-ayat */}
                  <div className="space-y-3">
                    {suratData.ayat.map((ayat) => (
                      <div
                        key={ayat.nomorAyat}
                        className={`bg-white dark:bg-white/5 rounded-xl border transition-all ${
                          playingAyat === ayat.nomorAyat
                            ? 'border-primary/50 bg-primary/5 shadow-lg shadow-primary/5'
                            : 'border-slate-200 dark:border-white/10'
                        }`}
                      >
                        {/* Nomor Ayat + Audio */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-white/5">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-xs font-bold text-primary">{ayat.nomorAyat}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => playAyat(ayat)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                              playingAyat === ayat.nomorAyat
                                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                : 'bg-primary/10 text-primary hover:bg-primary/20'
                            }`}
                          >
                            <span className="material-icons text-sm">
                              {playingAyat === ayat.nomorAyat ? 'stop' : 'volume_up'}
                            </span>
                            {playingAyat === ayat.nomorAyat ? 'Berhenti' : 'Dengarkan'}
                          </button>
                        </div>

                        {/* Teks Arab */}
                        <div className="px-4 py-4">
                          <p className="text-right text-2xl leading-[2.5] font-serif text-slate-800 dark:text-white" dir="rtl" lang="ar">
                            {ayat.teksArab}
                          </p>
                        </div>

                        {/* Latin + Terjemah */}
                        <div className="px-4 pb-4 space-y-2">
                          <p className="text-sm text-primary italic leading-relaxed">{ayat.teksLatin}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ayat.teksIndonesia}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
