import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginScreen from './LoginScreen';
import { updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';

const AVATARS = [
  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ahmad&backgroundColor=059669",
  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Aisyah&backgroundColor=0891b2",
  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Budi&backgroundColor=be185d",
  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Putri&backgroundColor=b45309",
  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Kiki&backgroundColor=4338ca",
  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Salman&backgroundColor=0f766e"
];

export default function ProfileTab() {
  const { user, logout } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhoto, setEditPhoto] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  if (!user) return <LoginScreen />; 
  
  const handleEditClick = () => {
      setEditName(user.displayName || '');
      setEditPhoto(user.photoURL || '');
      setIsEditing(true);
  };

  const handleSave = async () => {
      setIsSaving(true);
      try {
          await updateProfile(auth.currentUser, {
              displayName: editName || 'Sahabat SholatKu',
              photoURL: editPhoto
          });
          setIsEditing(false);
          window.location.reload(); 
      } catch (err) {
          alert('Gagal menyimpan profil: ' + err.message);
      } finally {
          setIsSaving(false);
      }
  };

  if (isEditing) {
      return (
        <div className="max-w-md mx-auto space-y-6 animate-fade-in py-4 lg:py-8">
          <div className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 text-center">Edit Profil</h2>
            
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Ganti Foto Profil</label>
            <div className="grid grid-cols-4 gap-3 mb-6">
                {/* Avatar List (Current + Defaults) */}
                {[user.photoURL, ...AVATARS].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).slice(0, 8).map((avatarUrl, i) => (
                    <div 
                        key={i} 
                        onClick={() => setEditPhoto(avatarUrl)}
                        className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all aspect-square ${editPhoto === avatarUrl ? 'border-primary outline outline-2 outline-primary scale-105' : 'border-transparent hover:scale-105'} ${(editPhoto && editPhoto !== avatarUrl) ? 'opacity-40 hover:opacity-100' : 'opacity-100'}`}
                    >
                        <img src={avatarUrl} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Nama Panggilan</label>
            <input 
                type="text" 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary mb-8"
                placeholder="Sahabat SholatKu"
            />

            <div className="flex gap-3">
                <button 
                    onClick={() => setIsEditing(false)}
                    disabled={isSaving}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                >
                    Batal
                </button>
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-primary hover:bg-emerald-600 transition-colors"
                >
                    {isSaving ? 'Menyimpan...' : 'Simpan'}
                </button>
            </div>
          </div>
        </div>
      );
  }
  
  return (
    <div className="max-w-md mx-auto space-y-6 animate-fade-in py-4 lg:py-8">
      <div className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col items-center relative">
         <button 
            onClick={handleEditClick}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 hover:bg-primary/20 hover:text-primary transition-colors"
            title="Edit Profil"
         >
            <span className="material-icons text-sm">edit</span>
         </button>

         <div className="w-24 h-24 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center mb-4 border-4 border-primary/50 relative">
            {user.photoURL ? (
                <img src={user.photoURL} referrerPolicy="no-referrer" alt="Profile" className="w-full h-full object-cover" />
            ) : (
                <span className="material-icons text-primary/80" style={{ fontSize: '48px' }}>person</span>
            )}
         </div>
         <h2 className="text-2xl font-bold text-slate-800 dark:text-white text-center mb-1">
             {user.displayName || 'Sahabat SholatKu'}
         </h2>
         <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-full">
             {user.email}
         </p>
         
         <div className="w-full bg-emerald-50 dark:bg-emerald-900/40 rounded-xl p-4 border border-emerald-100 dark:border-emerald-500/30 flex items-start gap-3">
             <span className="material-icons text-emerald-500 md:text-2xl mt-0.5">cloud_done</span>
             <div>
                 <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-0.5">Data Tersinkronisasi</p>
                 <p className="text-[11px] leading-relaxed text-emerald-700/80 dark:text-emerald-200/70">
                    Progres ibadah, hafalan, dan pengaturanmu aman tersimpan di cloud & akan kembali walau ganti perangkat.
                 </p>
             </div>
         </div>
      </div>
      
      <button 
        onClick={logout}
        className="w-full glass-panel p-4 rounded-xl flex items-center justify-center gap-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/20 transition-colors border border-rose-100/50 dark:border-rose-900/50"
      >
        <span className="material-icons">logout</span>
        <span className="font-bold">Keluar Akun</span>
      </button>
    </div>
  );
}
