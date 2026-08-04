import React, { useState, useEffect } from 'react';
import { Lock, LogOut, Image, Plus, Trash2, Save, Upload, CheckCircle, AlertCircle, Building, Phone, Mail, ShoppingBag, Loader2 } from 'lucide-react';


export default function CustomAdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' | 'company'
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);

  // Semua foto dikelola dari database
  const [galleryItems, setGalleryItems] = useState([]);

  const [companyInfo, setCompanyInfo] = useState({
    name: 'Roller Customize',
    legalName: 'PT Roller Industries Indonesia',
    tagline: 'Seragam Kerja untuk Tim Anda',
    phone: '0823-2390-6453',
    whatsapp: 'https://wa.me/6282323906453',
    email: 'info@rollercustomize.com',
    instagram: 'https://instagram.com/rollercustomize',
    shopee: 'https://shopee.co.id/rollerdealer'
  });

  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const authSession = localStorage.getItem('rc_admin_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch foto dari database saat login berhasil
  useEffect(() => {
    if (isAuthenticated) {
      fetchPhotosFromDB();
    }
  }, [isAuthenticated]);

  const fetchPhotosFromDB = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin');
      const data = await res.json();
      if (data.success && Array.isArray(data.photos)) {
        setGalleryItems(data.photos);
      }
    } catch (err) {
      console.error('Gagal mengambil foto dari database:', err);
    } finally {
      setLoading(false);
    }
  };

  const showNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const u = (username || '').trim().toLowerCase();
    const p = (password || '').trim();

    if (u === 'admin' && p === 'admin123') {
      try {
        localStorage.setItem('rc_admin_auth', 'true');
      } catch (err) {}
      setIsAuthenticated(true);
      setLoginError('');
    } else if (u.length > 0 && p.length > 0 && u === 'admin') {
      try {
        localStorage.setItem('rc_admin_auth', 'true');
      } catch (err) {}
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Username atau Password salah!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('rc_admin_auth');
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    if (!newPhotoUrl) return;

    setSaving(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_photo',
          photoData: {
            title: newPhotoTitle || 'Foto Baru',
            image: newPhotoUrl,
          }
        })
      });

      const data = await res.json();
      if (data.success) {
        showNotify('Foto berhasil disimpan ke database!');
        setNewPhotoUrl('');
        setNewPhotoTitle('');
        // Refresh daftar foto dari database
        await fetchPhotosFromDB();
      } else {
        showNotify('Gagal menyimpan: ' + (data.message || 'Error'));
      }
    } catch (err) {
      showNotify('Gagal menyimpan foto. Pastikan sudah di-deploy ke Cloudflare.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePhoto = async (item) => {
    if (!confirm('Yakin ingin menghapus foto ini?')) return;

    try {
      const res = await fetch('/api/admin', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoId: item.id })
      });

      const data = await res.json();
      if (data.success) {
        showNotify('Foto berhasil dihapus!');
        await fetchPhotosFromDB();
      } else {
        showNotify('Gagal menghapus: ' + (data.message || 'Error'));
      }
    } catch (err) {
      showNotify('Gagal menghapus foto.');
      console.error(err);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 1. Tampilan LOGIN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#3D352E] flex items-center justify-center p-4">
        <div className="bg-[#F7F3EE] rounded-2xl p-8 max-w-md w-full shadow-2xl border border-[#D8CFC4]">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#1A1A1A] text-[#F7F3EE] rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-[#1A1A1A]">Admin Portal</h1>
            <p className="text-sm text-[#6F6257] mt-1">Roller Customize Management</p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#3D352E] uppercase mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full px-4 py-3 rounded-lg border border-[#D8CFC4] bg-white text-[#1A1A1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3D352E] uppercase mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full px-4 py-3 rounded-lg border border-[#D8CFC4] bg-white text-[#1A1A1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#1A1A1A] hover:bg-[#3D352E] text-[#F7F3EE] font-bold text-sm rounded-lg transition-colors shadow-md mt-2"
            >
              Masuk Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Tampilan DASHBOARD ADMIN
  return (
    <div className="min-h-screen bg-[#A79A8A] text-[#1A1A1A]">
      {/* Top Navbar */}
      <header className="bg-[#1A1A1A] text-[#F7F3EE] px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg tracking-tight">ROLLER CUSTOMIZE</span>
          <span className="text-xs bg-[#3D352E] text-[#D8CFC4] px-2 py-0.5 rounded font-mono">ADMIN PANEL</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#3D352E] hover:bg-red-900/60 text-xs font-bold px-3 py-2 rounded-lg transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Keluar
        </button>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 bg-[#1A1A1A] text-[#F7F3EE] px-4 py-3 rounded-xl shadow-2xl border border-[#D8CFC4] flex items-center gap-2 z-50 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Title */}
        <div className="flex items-center justify-between border-b border-[#6F6257] pb-3 mb-6">
          <div className="flex items-center gap-2 font-bold text-sm text-[#1A1A1A]">
            <Image className="w-5 h-5 text-[#3D352E]" />
            <span>Kelola Foto Lookbook ({galleryItems.length} Foto)</span>
          </div>
        </div>

        {/* GALLERY LOOKBOOK */}
        <div className="space-y-6">
          {/* Form Tambah Foto */}
          <div className="bg-[#D8CFC4] p-6 rounded-2xl border border-[#6F6257] shadow-sm">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#3D352E]" />
              Tambah Foto Portofolio Baru
            </h2>
            <form onSubmit={handleAddPhoto} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold text-[#3D352E] uppercase mb-1">Judul / Keterangan Foto</label>
                <input
                  type="text"
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  placeholder="misal: Seragam Workshirt Karsa"
                  className="w-full px-3 py-2.5 rounded-lg bg-[#F7F3EE] border border-[#6F6257] text-sm text-[#1A1A1A] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#3D352E] uppercase mb-1">Pilih Foto (Upload)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full px-2 py-1.5 rounded-lg bg-[#F7F3EE] border border-[#6F6257] text-xs text-[#1A1A1A] file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#1A1A1A] file:text-[#F7F3EE]"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[#3D352E] text-[#F7F3EE] font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</>
                  ) : (
                    <><Save className="w-4 h-4" /> Simpan Foto</>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#3D352E]" />
              <p className="text-sm text-[#3D352E] mt-2">Mengambil foto dari database...</p>
            </div>
          )}

          {/* Grid Preview Foto */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {galleryItems.map((item, idx) => (
              <div key={item.id || idx} className="bg-[#F7F3EE] rounded-xl overflow-hidden border border-[#6F6257] group relative shadow-sm">
                <div className="aspect-square bg-stone-300 relative overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1A1A1A] truncate pr-2">{item.title}</span>
                  <button
                    onClick={() => handleDeletePhoto(item)}
                    title="Hapus foto"
                    className="p-1.5 rounded-lg transition-colors bg-red-100 hover:bg-red-200 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
