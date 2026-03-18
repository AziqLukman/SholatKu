import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function LoginScreen() {
  const { login, register, loginWithGoogle, resetPassword, loading } = useAuth();
  const { setActiveTab } = useApp();
  
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
          setError('Email sudah terdaftar. Silakan masuk.');
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
          setError('Email atau password salah.');
      } else {
          setError(err.message || 'Terjadi kesalahan saat otentikasi');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message || 'Gagal masuk dengan Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Isi kolom Email lu di atas dulu bro buat ngereset password!');
      return;
    }
    setError('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      await resetPassword(email);
      setSuccessMsg('Sip! Link buat reset password udah gw kirim ke email lu. Cek inbox/spam ya! 📧');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('Email ini belum terdaftar bosku.');
      } else {
        setError(err.message || 'Gagal mengirim email reset password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Memuat...</div>;

  return (
    <div className="max-w-md mx-auto animate-fade-in py-4 lg:py-8">
      <div className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden">
         <div className="text-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
              {isRegister ? 'Buat Akun' : 'Masuk Akun'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Simpan dan sinkronkan progres ibadahmu
            </p>
         </div>

         {error && (
           <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-xl mb-4 text-center">
             {error}
           </div>
         )}
         {successMsg && (
           <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-600 dark:text-emerald-400 text-sm p-3 rounded-xl mb-4 text-center font-medium">
             {successMsg}
           </div>
         )}

         <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Email</label>
              <input 
                 type="email" 
                 required
                 value={email}
                 onChange={e => {setEmail(e.target.value); setError(''); setSuccessMsg('');}}
                 className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                 placeholder="nama@email.com"
              />
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Password</label>
                {!isRegister && (
                  <button 
                    type="button" 
                    onClick={handleResetPassword}
                    className="text-[10px] md:text-xs text-primary font-bold hover:underline"
                  >
                    Lupa Password?
                  </button>
                )}
              </div>
              <input 
                 type="password" 
                 required
                 minLength={6}
                 value={password}
                 onChange={e => {setPassword(e.target.value); setError(''); setSuccessMsg('');}}
                 className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                 placeholder="Minimal 6 karakter"
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition-colors mt-2"
            >
               {isLoading ? 'Memproses...' : (isRegister ? 'Daftar Sekarang' : 'Masuk')}
            </button>
         </form>

         <div className="relative my-6 flex items-center border-t border-slate-200 dark:border-white/10">
            <span className="absolute left-1/2 -translate-x-1/2 bg-white dark:bg-[#0c1a18] px-3 text-xs text-slate-400">ATAU</span>
         </div>

         <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-3"
         >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Lanjutkan dengan Google
         </button>
         
         <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
            <button 
                type="button"
                onClick={() => setActiveTab('home')}
                className="w-full text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white py-2 text-sm font-medium transition-colors"
            >
                Nanti saja, gunakan tanpa login
            </button>
         </div>

         <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
            {isRegister ? 'Sudah punya akun? ' : 'Belum punya akun? '}
            <button 
              type="button"
              onClick={() => { setIsRegister(!isRegister); setError(''); }}
              className="text-primary font-bold hover:underline ml-1"
            >
              {isRegister ? 'Masuk di sini' : 'Daftar di sini'}
            </button>
         </p>
      </div>
    </div>
  );
}
