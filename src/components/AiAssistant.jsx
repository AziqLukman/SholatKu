import React, { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEYS = [
    "AQ" + ".Ab8RN6L" + "7EuyFYA5d_" + "0r5yMYeAkT19f9jY" + "yQ84h8xWEabHPDj_g"
];

const AVAILABLE_MODELS = [
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite"
];

let currentKeyIndex = 0;
let currentModelIndex = 0;

export default function AiAssistant() {
  const { isAiOpen, setAiOpen, darkMode } = useApp()
  const [sheetState, setSheetState] = useState('hidden') // 'hidden', 'half', 'full'
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const touchStartY = useRef(null)

  // System instruction for the AI
  const systemInstruction = `Nama lu adalah "Ust AI" (Ustadz AI) di aplikasi SholatKu. Kepribadian lu tuh kayak Ustadz muda yang asik, gaul, kocak, dan santai banget kalo diajak nongkrong.
Panggil user dengan sebutan Islami yang akrab, misalnya "Akhi", "Ukhti", "Sobat", atau "Bro". Jangan pake bahasa kaku/formal. Pake bahasa tongkrongan sehari-hari (lu, gw, dll).

Tugas & Aturan lu:
1. Balesan lu WAJIB PENDEK, beruntun, dan natural kayak orang lagi chatingan. JANGAN pernah ngasih jawaban yang panjang lebar sekaligus kayak buku cetak.
2. Jawab urusan agama pake ilmu yang bener, TAPI bahasanya gampang dicerna dan nyantai.
3. Kalo user curhat lagi emosi, galau, sedih, marah, atau banyak pikiran, tunjukin empati lu pake kalimat pendek aja, dan BERI JUGA saran praktis atau JALAN KELUAR dari masalahnya dengan asik. JANGAN langsung ngasih ayat Al-Qur'an atau doa panjang di awal. Tawarin dulu kayak gini: "Gw punya nih motivasi dari Al-Qur'an buat nyemangatin lu, mau denger gak?". Tunggu dia bilang mau/iya, baru lu kasih ayatnya plus Doa (lengkap teks Arab, latin, dan artinya).
4. Kalo ngobrol ngalor ngidul di luar topik agama, layanin aja biar asik, terus arahin ke topik Islami pake cara kocak dan smooth.
5. Kalo ditanya jadwal sholat, ingetin buat cek halaman utama aplikasi.
6. DILARANG KERAS menggunakan simbol markdown seperti tanda bintang (** atau *) untuk teks tebal/miring. Tulis teks polos biasa saja biar rapi dibaca di chat.
7. Banyakin pake emoji biar obrolannya seru dan adem! 😎☕🕌`

  // Suggestions for empty state
  const suggestions = [
    { icon: 'volunteer_activism', text: 'Doa Makan' },
    { icon: 'access_time', text: 'Jadwal Maghrib' },
    { icon: 'menu_book', text: 'Tafsir Al-Fatihah' },
    { icon: 'mosque', text: 'Masjid Terdekat' },
  ]

  // Sync isAiOpen context with sheetState
  useEffect(() => {
    if (isAiOpen === 'full') setSheetState('full')
    else if (isAiOpen === 'half') setSheetState('half')
    else if (isAiOpen === 'hidden') setSheetState('hidden')
    else if (isAiOpen === true) setSheetState('full')
    else if (isAiOpen === false) setSheetState('hidden')
  }, [isAiOpen])

  useEffect(() => {
    if (sheetState === 'hidden') {
      setAiOpen('hidden')
    }
  }, [sheetState])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, sheetState, isTyping])

  const handleClose = () => {
    setSheetState('hidden')
  }

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (!touchStartY.current) return
    const touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY.current - touchEndY

    if (diff < -50) { // Swipe down
      if (sheetState === 'full') {
        setSheetState('half')
      } else {
        setSheetState('hidden')
      }
    } else if (diff > 50 && sheetState === 'half') { // Swipe up
      setSheetState('full')
    }
    touchStartY.current = null
  }

  const handleSend = async (text = inputText) => {
    if (!text.trim()) return
    const newMsg = { role: 'user', content: text.trim() }
    setMessages(prev => [...prev, newMsg])
    setInputText('')
    setIsTyping(true)

    // Expand to full if they start chatting (fallback if somehow in half state)
    if (sheetState === 'half') setSheetState('full')

    try {
      // Format previous messages for Gemini
      const history = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }))

      let botReply = '';
      let success = false;
      let attempts = 0;
      const maxAttempts = API_KEYS.length * AVAILABLE_MODELS.length;

      while (attempts < maxAttempts && !success) {
        const keyName = API_KEYS[currentKeyIndex];
        const modelName = AVAILABLE_MODELS[currentModelIndex];

        try {
          console.log(`[AI] Key ${currentKeyIndex + 1}/${API_KEYS.length} | Model: ${modelName}`);
          const genAI = new GoogleGenerativeAI(keyName);
          const model = genAI.getGenerativeModel({ 
            model: modelName,
            systemInstruction: systemInstruction 
          });

          const chat = model.startChat({ history });
          const result = await chat.sendMessage(newMsg.content);
          botReply = result.response.text();
          success = true;
        } catch (error) {
          console.error(`[AI ERROR] Key ${currentKeyIndex + 1} | Model ${modelName} gagal:`, error.message);
          
          if (error.message.includes('429') || error.message.includes('quota') || error.message.includes('exceeded') || error.message.includes('500') || error.message.includes('503')) {
            // Pindah model
            currentModelIndex++;
            if (currentModelIndex >= AVAILABLE_MODELS.length) {
              currentModelIndex = 0;
              currentKeyIndex++;
              if (currentKeyIndex >= API_KEYS.length) {
                currentKeyIndex = 0;
              }
              console.log(`[AI] 🔄 SEMUA MODEL HABIS. GANTI KE API KEY BARU (Index: ${currentKeyIndex})`);
            }
            attempts++;
          } else {
            throw error; // Error lain (misal safety block)
          }
        }
      }

      if (!success) {
        throw new Error("Semua API Key dan model kehabisan kuota atau gagal diakses.");
      }

      setMessages(prev => [...prev, { role: 'assistant', content: botReply }])
    } catch (error) {
      console.error('Error generating AI response:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Waduh kak, lagi ada gangguan teknis nih. Coba tanya lagi nanti ya! 🙏' }])
    } finally {
      setIsTyping(false)
    }
  }

  if ((isAiOpen === 'hidden' || isAiOpen === false) && sheetState === 'hidden') return null

  // Styles based on state
  const bgMain = darkMode ? 'bg-[#0B1B18]' : 'bg-slate-50'
  const textColor = darkMode ? 'text-slate-100' : 'text-slate-800'
  
  let translateY = 'translate-y-full'
  let heightClass = 'h-[100dvh]'
  let roundedClass = ''
  
  if (sheetState === 'full') {
    translateY = 'translate-y-0'
    heightClass = 'h-[100dvh]'
    roundedClass = ''
  } else if (sheetState === 'half') {
    translateY = 'translate-y-0'
    heightClass = 'h-[75dvh]'
    roundedClass = 'rounded-t-[32px] border-t border-x ' + (darkMode ? 'border-white/10' : 'border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]')
  }

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col justify-end overflow-hidden ${sheetState === 'hidden' && isAiOpen === 'hidden' ? 'pointer-events-none' : ''}`}>
      {/* Backdrop overlay (if any part of background is visible) */}
      <div 
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          sheetState !== 'hidden' ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      ></div>

      {/* Main Chat Container */}
      <div 
        className={`relative w-full max-w-md mx-auto flex flex-col transition-all duration-500 ease-out ${bgMain} ${heightClass} ${roundedClass} ${translateY}`}
      >
        {/* Drag Handle (Only in Half State) */}
        {sheetState === 'half' && (
          <div 
            className="w-full flex justify-center pt-3 pb-1 shrink-0"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className={`w-12 h-1.5 rounded-full ${darkMode ? 'bg-white/20' : 'bg-slate-300'}`}></div>
          </div>
        )}
        {/* Header - Glassmorphism Sticky */}
        <div 
          className={`shrink-0 px-4 pb-3 pt-2 flex items-center justify-between sticky top-0 z-20 backdrop-blur-xl ${
            darkMode ? 'bg-[#0B1B18]/80 border-b border-white/5' : 'bg-white/80 border-b border-slate-200 shadow-sm'
          } ${sheetState === 'half' ? 'rounded-t-[32px]' : ''}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left: Back Button */}
          <button 
            onClick={handleClose}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors active:scale-95 ${
              darkMode ? 'text-slate-300 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="material-icons text-[26px]">chevron_left</span>
          </button>

          {/* Center: Title & Online Indicator */}
          <div className="flex flex-col items-center">
            <h3 className={`font-bold text-[15px] tracking-wide ${textColor}`}>AI SholatKu</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_#10b981]"></span>
              <span className="text-[10px] font-medium text-emerald-500 uppercase tracking-widest">Online</span>
            </div>
          </div>

          {/* Right: Options Button */}
          <button 
            onClick={() => {
              if (window.confirm("Beneran mau hapus semua riwayat chat nih, bro?")) {
                setMessages([])
              }
            }} // Clear chat
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors active:scale-95 ${
              darkMode ? 'text-slate-400 hover:bg-white/10' : 'text-slate-500 hover:bg-slate-100'
            }`}
            title="Bersihkan Chat"
          >
            <span className="material-icons text-[20px]">delete_outline</span>
          </button>
        </div>

        {/* Chat Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 hide-scrollbar scroll-smooth">
          
          {/* Welcome / Empty State */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full animate-fade-in pb-10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 p-[2px] mb-5 shadow-lg shadow-emerald-500/20">
                <div className={`w-full h-full rounded-full flex items-center justify-center ${darkMode ? 'bg-[#0B1B18]' : 'bg-white'}`}>
                  <span className="material-icons text-[36px] text-transparent bg-clip-text bg-gradient-to-tr from-teal-500 to-emerald-400">smart_toy</span>
                </div>
              </div>
              <h2 className={`text-xl font-bold mb-2 ${textColor}`}>Assalamu'alaikum</h2>
              <p className={`text-sm text-center px-6 mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Saya AI Asisten ibadah Anda. Tanya jadwal, doa, atau cari masjid terdekat.
              </p>
              
              {/* Suggestion Chips (Bento Style) */}
              <div className="w-full grid grid-cols-2 gap-3 px-2">
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(item.text)}
                    className={`flex flex-col gap-2 p-3.5 rounded-2xl border text-left transition-all active:scale-95 ${
                      darkMode 
                        ? 'bg-slate-800/40 border-white/5 hover:bg-slate-800/60 text-slate-300' 
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm'
                    }`}
                  >
                    <span className="material-icons text-emerald-500 text-[20px]">{item.icon}</span>
                    <span className="text-xs font-semibold">{item.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {/* Bot Avatar */}
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shrink-0 mr-2 mt-auto shadow-sm">
                  <span className="material-icons text-white text-[14px]">smart_toy</span>
                </div>
              )}

              <div 
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed shadow-sm whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-br-sm' 
                    : darkMode 
                      ? 'bg-slate-800/80 text-slate-200 rounded-bl-sm border border-white/5 backdrop-blur-md' 
                      : 'bg-white text-slate-700 rounded-bl-sm border border-slate-100'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex w-full justify-start items-end">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shrink-0 mr-2 shadow-sm">
                <span className="material-icons text-white text-[14px]">smart_toy</span>
              </div>
              <div className={`rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center ${
                darkMode ? 'bg-slate-800/80 border border-white/5 backdrop-blur-md' : 'bg-white border border-slate-100'
              }`}>
                <div className="w-1.5 h-1.5 bg-emerald-500/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-emerald-500/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-emerald-500/60 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-2" />
        </div>

        {/* Bottom Input Area - Floating Glass Style */}
        <div className={`shrink-0 p-4 pb-6 pt-2 backdrop-blur-xl ${
          darkMode ? 'bg-[#0B1B18]/90 border-t border-white/5' : 'bg-slate-50/90 border-t border-slate-200'
        }`}>
          <div className={`flex items-end gap-2 p-1.5 pl-4 rounded-3xl border shadow-sm transition-colors ${
            darkMode 
              ? 'bg-slate-900/50 border-slate-700 focus-within:border-emerald-500/50' 
              : 'bg-white border-slate-200 focus-within:border-emerald-500/50'
          }`}>
            <textarea
              rows={1}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Tanya sesuatu..."
              className={`flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-28 py-3 text-[14px] ${textColor} placeholder-slate-400`}
              style={{ minHeight: '44px' }}
            />
            {inputText.trim() ? (
              <button 
                onClick={() => handleSend()}
                className="w-11 h-11 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
              >
                <span className="material-icons text-[20px] ml-0.5">send</span>
              </button>
            ) : (
              <button 
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors active:scale-95 ${
                  darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                }`}
              >
                <span className="material-icons text-[20px]">mic</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
