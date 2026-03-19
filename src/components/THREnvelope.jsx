import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { database } from '../utils/firebase';
import { ref, get, runTransaction } from 'firebase/database';

export default function THREnvelope() {
  const { user } = useAuth();
  const { setActiveTab } = useApp();
  
  const [claimStatus, setClaimStatus] = useState('checking'); // 'checking', 'unclaimed', 'claimed'
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Link DANA Kaget Asli
  const THR_LINK = "https://link.dana.id/kaget";

  // ==========================================
  // ⚙️ PENGATURAN WAKTU RILIS THR ⚙️
  // Ubah tanggal dan jam di bawah ini sesuai kebutuhan lu.
  // Format: "YYYY-MM-DDTHH:mm:ss+07:00" (WIB)
  // Contoh: 10 April 2026 jam 10 pagi = "2026-04-10T10:00:00+07:00"
  // ==========================================
  const THR_RELEASE_DATE = new Date("2026-03-20T09:00:00+07:00").getTime(); 

  const [currentTime, setCurrentTime] = useState(Date.now());
  const isReleased = currentTime >= THR_RELEASE_DATE;

  useEffect(() => {
    // Update waktu setiap detik buat countdown realtime
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Draggable Logic Refs (Only used when claimed)
  const widgetRef = useRef(null);
  const posRef = useRef({ x: window.innerWidth - 80, y: window.innerHeight / 2 }); // Default position: right side, hidden a bit
  const dragState = useRef({ isDragging: false, startX: 0, startY: 0, initX: 0, initY: 0, hasMoved: false });

  // Posisikan awal KALAU widget udah muncul
  useEffect(() => {
    if (claimStatus === 'claimed' && isVisible && widgetRef.current) {
        widgetRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
    }
  }, [claimStatus, isVisible]);

  useEffect(() => {
    if (!user) {
      setClaimStatus('unclaimed');
      return;
    }

    const checkClaim = async () => {
      try {
        const snap = await get(ref(database, `users/${user.uid}/thr_claimed`));
        if (snap.exists() && snap.val() === true) {
          setClaimStatus('claimed');
        } else {
          setClaimStatus('unclaimed');
        }
      } catch (err) {
        console.error(err);
        setClaimStatus('unclaimed');
      }
    };
    checkClaim();
  }, [user]);

  const onPointerDown = (e) => {
    if (claimStatus !== 'claimed') return;
    if (e.target.closest('.close-btn')) return;

    dragState.current.isDragging = true;
    dragState.current.hasMoved = false;
    dragState.current.startX = e.clientX || (e.touches && e.touches[0].clientX);
    dragState.current.startY = e.clientY || (e.touches && e.touches[0].clientY);
    dragState.current.initX = posRef.current.x;
    dragState.current.initY = posRef.current.y;

    const onPointerMove = (moveEvent) => {
        if (!dragState.current.isDragging) return;
        
        if (moveEvent.cancelable) moveEvent.preventDefault(); 
        
        const cx = moveEvent.clientX || (moveEvent.touches && moveEvent.touches[0].clientX);
        const cy = moveEvent.clientY || (moveEvent.touches && moveEvent.touches[0].clientY);
        
        const dx = cx - dragState.current.startX;
        const dy = cy - dragState.current.startY;
        
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragState.current.hasMoved = true;
        
        const maxX = window.innerWidth - 60; // adjust for small widget
        const maxY = window.innerHeight - 80;

        let nx = dragState.current.initX + dx;
        let ny = dragState.current.initY + dy;
        
        if (nx < -20) nx = -20; // Allow hiding slightly off screen
        if (ny < 0) ny = 0;
        if (nx > window.innerWidth - 40) nx = window.innerWidth - 40; // Allow right side tucking
        if (ny > maxY) ny = maxY;

        posRef.current = { x: nx, y: ny };
        if (widgetRef.current) {
            widgetRef.current.style.transform = `translate(${nx}px, ${ny}px)`;
        }
    };

    const onPointerUp = () => {
        dragState.current.isDragging = false;
        
        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('mouseup', onPointerUp);
        window.removeEventListener('touchmove', onPointerMove);
        window.removeEventListener('touchend', onPointerUp);

        if (!dragState.current.hasMoved) {
            alert('THR udah berhasil diambil! Selamat Lebaran, mohon maaf lahir batin! 🎉');
        }
    };

    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchmove', onPointerMove);
    window.addEventListener('touchend', onPointerUp);
  };

  const handleClaimBig = () => {
    if (!user) {
      alert("Wajib login/daftar dulu ya buat ngambil THR spesial ini!");
      setActiveTab('profile');
      return;
    }
    setShowModal(true);
  };

  const processClaim = async () => {
    if (!user) return;
    
    setIsProcessing(true);
    try {
      const claimRef = ref(database, `users/${user.uid}/thr_claimed`);
      
      const result = await runTransaction(claimRef, (currentData) => {
        if (currentData === true) return; 
        return true; 
      });

      if (result.committed) {
        setClaimStatus('claimed');
        setShowModal(false);
        window.open(THR_LINK, '_blank');
      } else {
        alert("Waduh, lu ternyata udah pernah ngambil THR ini! Ketauan deh 👀");
        setClaimStatus('claimed');
        setShowModal(false);
      }
    } catch (err) {
      alert("Gagal memproses klaim THR: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (claimStatus === 'checking') return null;

  if (claimStatus === 'claimed') {
    if (!isVisible) return null;
    return (
      <div className="fixed top-0 left-0 z-[100] w-0 h-0 pointer-events-none transition-opacity">
        <div 
          ref={widgetRef}
          onMouseDown={onPointerDown}
          onTouchStart={onPointerDown}
          className="absolute z-[100] pointer-events-auto touch-none animate-fade-in opacity-80 hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
          style={{ willChange: 'transform' }}
          title="Amplop THR (Sudah Dibuka)"
        >
          <div className="relative group">
            {/* Tombol Silang */}
            <button 
              onClick={(e) => { e.stopPropagation(); setIsVisible(false); }} 
              className="close-btn absolute -top-2 -right-2 w-6 h-6 bg-slate-800/90 text-white rounded-full flex items-center justify-center border-2 border-slate-500 hover:bg-slate-900 hover:scale-110 active:scale-90 z-10 transition-all shadow-md"
            >
              <span className="material-icons text-[14px]">close</span>
            </button>
            
            {/* Amplop Terbuka UI */}
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-emerald-100 to-white dark:from-emerald-900/80 dark:to-slate-800 border-2 border-emerald-400 dark:border-emerald-600 rounded-2xl shadow-[0_5px_15px_rgba(16,185,129,0.3)] flex items-center justify-center pointer-events-none relative overflow-hidden group-hover:scale-105 transition-transform">
              <span className="material-icons text-3xl md:text-4xl text-emerald-500 drop-shadow-sm">drafts</span>
            </div>
            
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-emerald-600 text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm pointer-events-none">
                Diklaim
            </div>
          </div>
        </div>
      </div>
    );
  }

  // State: BELUM WAKTUNYA RILIS (COUNTDOWN)
  if (claimStatus === 'unclaimed' && !isReleased) {
    const timeDiff = THR_RELEASE_DATE - currentTime;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    return (
      <div className="flex flex-col items-center justify-center my-10 animate-fade-in relative z-30">
        <div className="relative w-56 h-36 md:w-72 md:h-44 rounded-2xl flex flex-col items-center justify-center overflow-hidden border-2 border-slate-600 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 shadow-xl opacity-80 cursor-not-allowed transition-all">
             <div className="absolute top-0 left-0 w-full h-full opacity-30">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                   <polygon points="0,0 100,0 50,45" fill="rgba(0,0,0,0.1)" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
                   <polygon points="0,0 0,100 50,45" fill="rgba(0,0,0,0.05)" />
                   <polygon points="100,0 100,100 50,45" fill="rgba(0,0,0,0.1)" />
                </svg>
             </div>
             
             <div className="relative z-10 w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center border-2 border-slate-500 shadow-inner mb-3">
                <span className="material-icons text-slate-300">lock</span>
             </div>
             
             <span className="relative z-10 font-bold text-slate-600 dark:text-slate-400 text-xs md:text-sm tracking-widest px-4 text-center">
                AMPLOP THR TERKUNCI
             </span>
        </div>

        <div className="mt-6 text-center">
           <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-2">Bisa Dibuka Dalam Waktu:</p>
           <div className="flex items-center justify-center gap-2 font-mono">
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg w-12 py-2 shadow-sm">
                 <span className="block text-lg font-black text-rose-500">{String(days).padStart(2, '0')}</span>
                 <span className="block text-[8px] text-slate-400 uppercase">Hari</span>
              </div>
              <span className="text-xl font-bold text-slate-400">:</span>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg w-12 py-2 shadow-sm">
                 <span className="block text-lg font-black text-rose-500">{String(hours).padStart(2, '0')}</span>
                 <span className="block text-[8px] text-slate-400 uppercase">Jam</span>
              </div>
              <span className="text-xl font-bold text-slate-400">:</span>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg w-12 py-2 shadow-sm">
                 <span className="block text-lg font-black text-rose-500">{String(minutes).padStart(2, '0')}</span>
                 <span className="block text-[8px] text-slate-400 uppercase">Menit</span>
              </div>
              <span className="text-xl font-bold text-slate-400">:</span>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg w-12 py-2 shadow-sm">
                 <span className="block text-lg font-black text-rose-500">{String(seconds).padStart(2, '0')}</span>
                 <span className="block text-[8px] text-slate-400 uppercase">Detik</span>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // Unclaimed State: AMPLOB BESAR DI TENGAH NORMAL (SESUAI SEBELUMNYA)
  return (
    <>
      <div className="flex flex-col items-center justify-center my-10 animate-fade-in relative z-30">
        <style>{`
          @keyframes luxuryShakeBig {
            0% { transform: rotate(0deg) scale(1) translateY(0); }
            10% { transform: rotate(-5deg) scale(1.05) translateY(-5px); }
            20% { transform: rotate(5deg) scale(1.05) translateY(-5px); }
            30% { transform: rotate(-5deg) scale(1.05) translateY(-5px); }
            40% { transform: rotate(5deg) scale(1.05) translateY(-5px); }
            50% { transform: rotate(0deg) scale(1) translateY(0); }
            100% { transform: rotate(0deg) scale(1) translateY(0); }
          }
          .animate-luxury-shake-big {
            animation: luxuryShakeBig 3s infinite ease-in-out;
          }
          @keyframes luxuryGlowBig {
            0% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.2); }
            50% { box-shadow: 0 0 50px rgba(251, 191, 36, 0.9), inset 0 0 20px rgba(255, 255, 255, 0.6); }
            100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.2); }
          }
        `}</style>
        
        <button 
          onClick={handleClaimBig}
          className="relative animate-luxury-shake-big group outline-none focus:outline-none"
        >
          {/* Efek Cahaya Belakang */}
          <div 
             className="absolute inset-[-10px] rounded-[2rem] bg-yellow-400 opacity-40 blur-2xl transition-opacity group-hover:opacity-60"
             style={{ animation: 'luxuryGlowBig 3s infinite' }}
          ></div>
          
          {/* Bentuk Amplop Asli */}
          <div 
            className="relative w-56 h-36 md:w-72 md:h-44 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-yellow-300 dark:border-yellow-500 transition-transform duration-300 group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #fde047 0%, #d97706 100%)',
              boxShadow: '0 10px 25px rgba(217, 119, 6, 0.5), inset 0 2px 10px rgba(255,255,255,0.5)'
            }}
          >
             <div className="absolute top-0 left-0 w-full h-full">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                   <polygon points="0,0 100,0 50,45" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                   <polygon points="0,0 0,100 50,45" fill="rgba(0,0,0,0.05)" />
                   <polygon points="100,0 100,100 50,45" fill="rgba(0,0,0,0.1)" />
                </svg>
             </div>
             
             <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-600 rounded-full shadow-lg border-2 border-yellow-300 flex items-center justify-center z-10">
                <span className="material-icons text-2xl text-yellow-300" style={{ transform: 'rotate(-15deg)' }}>stars</span>
             </div>

             <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center justify-center z-10 w-full">
                <span className="font-black text-yellow-50 px-4 py-1.5 bg-red-700/80 rounded-full text-sm md:text-base tracking-widest drop-shadow-md backdrop-blur-sm border border-red-500/50 shadow-inner inline-block">
                   AMBIL THR DISINI
                </span>
             </div>
          </div>
        </button>

        <p className="mt-8 text-center text-sm md:text-base font-black text-transparent bg-clip-text drop-shadow-md animate-pulse uppercase tracking-wider" style={{ backgroundImage: 'linear-gradient(90deg, #d97706, #b45309, #d97706)' }}>
           Buka Amplop Spesial Lebaran!
        </p>
      </div>

      {/* Claim Modal UI */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-slate-900/80 backdrop-blur-md animate-fade-in transition-all">
           <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl border-4 border-yellow-400 dark:border-yellow-500 relative flex flex-col items-center text-center transform scale-100 animate-slide-up overflow-hidden">
              
              <div className="absolute top-0 left-0 w-16 h-16 bg-yellow-400 rounded-br-full opacity-20 hidden md:block"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-red-500 rounded-tl-full opacity-10 hidden md:block"></div>

              <div className="relative animate-luxury-shake-big mb-6 mt-4">
                 <div className="absolute inset-[-10px] rounded-[2rem] bg-yellow-400 opacity-30 blur-xl"></div>
                 <div 
                   className="relative w-40 h-28 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center border-2 border-yellow-200 shadow-2xl overflow-hidden"
                 >
                    <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-600 rounded-full shadow-lg border-2 border-yellow-300 flex items-center justify-center z-10">
                       <span className="material-icons text-sm text-yellow-300" style={{ transform: 'rotate(-15deg)' }}>stars</span>
                    </div>
                    <div className="absolute inset-0">
                       <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                          <polygon points="0,0 100,0 50,45" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.6)" />
                          <polygon points="0,0 0,100 50,45" fill="rgba(0,0,0,0.05)" />
                          <polygon points="100,0 100,100 50,45" fill="rgba(0,0,0,0.1)" />
                       </svg>
                    </div>
                 </div>
              </div>
              
              <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-3">Ambil THR!</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                Selamat! Kamu nemu amplop THR edisi spesial Lebaran. Amplop ini hanya bisa diklaim <strong>SATU KALI</strong> per-akun ya! <br/><br/>
                <span className="inline-block bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 px-3 py-1 rounded-lg text-xs font-bold ring-1 ring-inset ring-rose-500/30">
                  ⚠️ Peringatan: Siapa cepat dia dapat, THR terbatas!
                </span>
              </p>
              
              <div className="flex flex-col gap-3 w-full relative z-10">
                <button 
                   onClick={processClaim}
                   disabled={isProcessing}
                   className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-red-600/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-lg active:scale-95"
                >
                   {isProcessing ? 'Membuka Amplop...' : 'AMBIL SEKARANG! 🎉'}
                </button>
                <button 
                   onClick={() => setShowModal(false)}
                   disabled={isProcessing}
                   className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 font-bold py-3 px-6 rounded-2xl transition-colors mt-2"
                >
                   Nanti Aja Deh
                </button>
              </div>
           </div>
        </div>
      )}
    </>
  );
}
