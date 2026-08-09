import React, { useState, useEffect } from 'react';
import { Lock, LogOut, Image, Plus, Trash2, Save, AlertCircle, CheckCircle, Loader2, Ruler, RefreshCw } from 'lucide-react';

const CATEGORY_NAMES = {
  'kemeja': 'Kemeja (Workshirt, PDL/PDH)',
  't-shirt': 'T-Shirt (Kaos Custom)',
  'workjacket': 'Workjacket / Jaket Kerja',
  'vest': 'Vest / Rompi Kerja',
  'celana': 'Celana (Panjang & Pendek)',
  'totebag-apron': 'Totebag & Apron'
};

const FIT_NAMES = {
  'reguler': 'Pola Reguler',
  'boxy': 'Pola Boxy',
  'standard': 'Standard Fit',
  'panjang': 'Celana Panjang',
  'pendek': 'Celana Pendek'
};

export default function CustomAdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeMainTab, setActiveMainTab] = useState('gallery'); // 'gallery' | 'sizechart'
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);

  // Gallery Photos
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('home'); // 'home' | 'pelanggan'
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [saving, setSaving] = useState(false);

  // Size Chart Data
  const [sizeChartData, setSizeChartData] = useState([]);
  const [scSelectedCategory, setScSelectedCategory] = useState('kemeja');
  const [scSelectedFit, setScSelectedFit] = useState('reguler');
  const [savingSizeChart, setSavingSizeChart] = useState(false);

  useEffect(() => {
    const authSession = localStorage.getItem('rc_admin_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPhotosFromDB();
      fetchSizeChartFromDB();
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

  const fetchSizeChartFromDB = async () => {
    try {
      const res = await fetch('/api/admin?action=get_size_chart');
      const data = await res.json();
      if (data.success && Array.isArray(data.sizeChart)) {
        setSizeChartData(data.sizeChart);
      }
    } catch (err) {
      console.error('Gagal mengambil data size chart:', err);
    }
  };

  const showNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLogin = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    localStorage.setItem('rc_admin_auth', 'true');
    setIsAuthenticated(true);
    setLoginError('');
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
            category: selectedCategory
          }
        })
      });

      const data = await res.json();
      if (data.success) {
        showNotify(`Foto berhasil disimpan ke galeri ${selectedCategory === 'home' ? 'Beranda' : 'Pelanggan'}!`);
        setNewPhotoUrl('');
        setNewPhotoTitle('');
        await fetchPhotosFromDB();
      } else {
        showNotify('Gagal menyimpan: ' + (data.message || 'Error'));
      }
    } catch (err) {
      showNotify('Gagal menyimpan foto.');
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

  // Handlers Size Chart
  const handleSizeChartChange = (id, field, value) => {
    setSizeChartData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSaveSizeChart = async () => {
    setSavingSizeChart(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_size_chart',
          sizeChartItems: sizeChartData
        })
      });

      const data = await res.json();
      if (data.success) {
        showNotify('Ukuran Size Chart berhasil diperbarui!');
        await fetchSizeChartFromDB();
      } else {
        showNotify('Gagal menyimpan size chart: ' + (data.message || 'Error'));
      }
    } catch (err) {
      showNotify('Gagal menyimpan data size chart.');
    } finally {
      setSavingSizeChart(false);
    }
  };

  const currentCategoryPhotos = galleryItems.filter(
    (item) => (item.category || 'home') === selectedCategory
  );

  // Filter size chart items berdasarkan kriteria
  const currentSizeChartItems = sizeChartData.filter((item) => {
    if (scSelectedCategory === 'celana') {
      return item.category_key === 'celana' && item.fit_key === scSelectedFit;
    }
    if (scSelectedCategory === 'kemeja' || scSelectedCategory === 't-shirt') {
      return item.category_key === scSelectedCategory && item.fit_key === scSelectedFit;
    }
    return item.category_key === scSelectedCategory;
  });

  // Tampilan LOGIN
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

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(e); }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#3D352E] uppercase mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full px-4 py-3 rounded-lg border border-[#D8CFC4] bg-white text-[#1A1A1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
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
              />
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-3 bg-[#1A1A1A] hover:bg-[#3D352E] text-[#F7F3EE] font-bold text-sm rounded-lg transition-colors shadow-md mt-2 cursor-pointer"
            >
              Masuk Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // DASHBOARD ADMIN
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
        
        {/* TOP TAB MANAGER: GALERI FOTO vs SIZE CHART */}
        <div className="flex items-center gap-4 mb-6 border-b border-[#6F6257] pb-3">
          <button
            onClick={() => setActiveMainTab('gallery')}
            className={`py-2.5 px-5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeMainTab === 'gallery'
                ? 'bg-[#1A1A1A] text-[#F7F3EE] shadow-md'
                : 'bg-[#D8CFC4] text-[#3D352E] hover:bg-[#F7F3EE]'
            }`}
          >
            <Image className="w-4 h-4" />
            Galeri Foto (Our Product)
          </button>
          <button
            onClick={() => setActiveMainTab('sizechart')}
            className={`py-2.5 px-5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeMainTab === 'sizechart'
                ? 'bg-[#1A1A1A] text-[#F7F3EE] shadow-md'
                : 'bg-[#D8CFC4] text-[#3D352E] hover:bg-[#F7F3EE]'
            }`}
          >
            <Ruler className="w-4 h-4" />
            Kelola Size Chart
          </button>
        </div>

        {/* 1. TAB GALERI FOTO */}
        {activeMainTab === 'gallery' && (
          <div className="space-y-6">
            {/* Sub-tab Category Selector */}
            <div className="flex items-center gap-3 bg-[#D8CFC4] p-1.5 rounded-xl border border-[#6F6257]">
              <button
                onClick={() => setSelectedCategory('home')}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                  selectedCategory === 'home'
                    ? 'bg-[#1A1A1A] text-[#F7F3EE] shadow-md'
                    : 'text-[#3D352E] hover:bg-[#A79A8A]/40'
                }`}
              >
                <Image className="w-4 h-4" />
                Our Product — Beranda
              </button>
              <button
                onClick={() => setSelectedCategory('pelanggan')}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                  selectedCategory === 'pelanggan'
                    ? 'bg-[#1A1A1A] text-[#F7F3EE] shadow-md'
                    : 'text-[#3D352E] hover:bg-[#A79A8A]/40'
                }`}
              >
                <Image className="w-4 h-4" />
                Our Product — Pelanggan
              </button>
            </div>

            {/* Form Tambah Foto */}
            <div className="bg-[#D8CFC4] p-6 rounded-2xl border border-[#6F6257] shadow-sm">
              <h2 className="text-base font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#3D352E]" />
                Tambah Foto {selectedCategory === 'home' ? 'Our Product Beranda' : 'Our Product Pelanggan'}
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
                    className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[#3D352E] text-[#F7F3EE] font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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

            {/* Empty State */}
            {!loading && currentCategoryPhotos.length === 0 && (
              <div className="text-center py-12 bg-[#F7F3EE] rounded-xl border border-[#6F6257]">
                <Image className="w-10 h-10 text-[#6F6257] mx-auto mb-2 opacity-50" />
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  Belum ada foto dalam galeri {selectedCategory === 'home' ? 'Beranda' : 'Pelanggan'}.
                </p>
                <p className="text-xs text-[#6F6257] mt-1">Tambahkan foto baru menggunakan formulir di atas.</p>
              </div>
            )}

            {/* Grid Preview Foto */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {currentCategoryPhotos.map((item, idx) => (
                <div key={item.id || idx} className="bg-[#F7F3EE] rounded-xl overflow-hidden border border-[#6F6257] group relative shadow-sm">
                  <div className="aspect-square bg-stone-300 relative overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#1A1A1A] truncate pr-2">{item.title}</span>
                    <button
                      onClick={() => handleDeletePhoto(item)}
                      title="Hapus foto"
                      className="p-1.5 rounded-lg transition-colors bg-red-100 hover:bg-red-200 text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. TAB SIZE CHART MANAGER */}
        {activeMainTab === 'sizechart' && (
          <div className="space-y-6">
            <div className="bg-[#D8CFC4] p-6 rounded-2xl border border-[#6F6257] shadow-sm">
              <h2 className="text-lg font-bold text-[#1A1A1A] mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-[#3D352E]" />
                  Pengaturan Dimensi Ukuran Produk
                </span>
                <button
                  onClick={handleSaveSizeChart}
                  disabled={savingSizeChart}
                  className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#3D352E] text-[#F7F3EE] font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {savingSizeChart ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</>
                  ) : (
                    <><Save className="w-4 h-4" /> Simpan Semua Ukuran</>
                  )}
                </button>
              </h2>

              {/* Category & Fit Selector Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-[#3D352E] uppercase mb-1">Pilih Kategori Produk</label>
                  <select
                    value={scSelectedCategory}
                    onChange={(e) => {
                      const val = e.target.value;
                      setScSelectedCategory(val);
                      if (val === 'celana') setScSelectedFit('panjang');
                      else if (val === 'kemeja' || val === 't-shirt') setScSelectedFit('reguler');
                      else setScSelectedFit('standard');
                    }}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#F7F3EE] border border-[#6F6257] text-sm font-bold text-[#1A1A1A] focus:outline-none"
                  >
                    <option value="kemeja">Kemeja (Workshirt, PDL/PDH)</option>
                    <option value="t-shirt">T-Shirt (Kaos Custom)</option>
                    <option value="workjacket">Workjacket / Jaket Kerja</option>
                    <option value="vest">Vest / Rompi Kerja</option>
                    <option value="celana">Celana (Panjang & Pendek)</option>
                    <option value="totebag-apron">Totebag & Apron</option>
                  </select>
                </div>

                {(scSelectedCategory === 'kemeja' || scSelectedCategory === 't-shirt' || scSelectedCategory === 'celana') && (
                  <div>
                    <label className="block text-xs font-bold text-[#3D352E] uppercase mb-1">Pilih Varian Cut / Fit</label>
                    <div className="flex gap-2 bg-[#F7F3EE] p-1 rounded-lg border border-[#6F6257]">
                      {scSelectedCategory === 'celana' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setScSelectedFit('panjang')}
                            className={`flex-1 py-1.5 px-3 rounded text-xs font-bold transition-all cursor-pointer ${
                              scSelectedFit === 'panjang' ? 'bg-[#3D352E] text-[#F7F3EE]' : 'text-[#3D352E]'
                            }`}
                          >
                            Celana Panjang
                          </button>
                          <button
                            type="button"
                            onClick={() => setScSelectedFit('pendek')}
                            className={`flex-1 py-1.5 px-3 rounded text-xs font-bold transition-all cursor-pointer ${
                              scSelectedFit === 'pendek' ? 'bg-[#3D352E] text-[#F7F3EE]' : 'text-[#3D352E]'
                            }`}
                          >
                            Celana Pendek
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => setScSelectedFit('reguler')}
                            className={`flex-1 py-1.5 px-3 rounded text-xs font-bold transition-all cursor-pointer ${
                              scSelectedFit === 'reguler' ? 'bg-[#3D352E] text-[#F7F3EE]' : 'text-[#3D352E]'
                            }`}
                          >
                            Pola Reguler
                          </button>
                          <button
                            type="button"
                            onClick={() => setScSelectedFit('boxy')}
                            className={`flex-1 py-1.5 px-3 rounded text-xs font-bold transition-all cursor-pointer ${
                              scSelectedFit === 'boxy' ? 'bg-[#3D352E] text-[#F7F3EE]' : 'text-[#3D352E]'
                            }`}
                          >
                            Pola Boxy
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Editable Table */}
              <div className="bg-[#F7F3EE] rounded-xl border border-[#6F6257] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-[#3D352E] text-[#F7F3EE] text-xs font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Size / Label</th>
                        <th className="py-3 px-4">Panjang Badan / Celana (cm)</th>
                        <th className="py-3 px-4">Lebar Dada / Pinggang (cm)</th>
                        <th className="py-3 px-4">Lengan / Bahu / Paha / Tali</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D8CFC4]">
                      {currentSizeChartItems.map((item) => (
                        <tr key={item.id} className="hover:bg-[#D8CFC4]/30 transition-colors">
                          <td className="py-3 px-4 font-bold text-[#1A1A1A]">{item.size_label}</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={item.panjang}
                              onChange={(e) => handleSizeChartChange(item.id, 'panjang', e.target.value)}
                              className="w-full max-w-[120px] px-3 py-1.5 rounded border border-[#6F6257] bg-white text-[#1A1A1A] font-bold text-center text-sm focus:ring-2 focus:ring-[#1A1A1A] focus:outline-none"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={item.lebar}
                              onChange={(e) => handleSizeChartChange(item.id, 'lebar', e.target.value)}
                              className="w-full max-w-[120px] px-3 py-1.5 rounded border border-[#6F6257] bg-white text-[#1A1A1A] font-bold text-center text-sm focus:ring-2 focus:ring-[#1A1A1A] focus:outline-none"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={item.lengan_bahu}
                              onChange={(e) => handleSizeChartChange(item.id, 'lengan_bahu', e.target.value)}
                              className="w-full px-3 py-1.5 rounded border border-[#6F6257] bg-white text-[#1A1A1A] font-bold text-sm focus:ring-2 focus:ring-[#1A1A1A] focus:outline-none"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Action Save */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSaveSizeChart}
                  disabled={savingSizeChart}
                  className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#3D352E] text-[#F7F3EE] font-bold text-sm rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {savingSizeChart ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan Ukuran...</>
                  ) : (
                    <><Save className="w-5 h-5" /> Simpan Semua Perubahan Size Chart</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
