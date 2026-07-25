import React from 'react';
import { Shirt, Calendar, Sparkles, Settings2, BookmarkPlus, Printer } from 'lucide-react';

interface HeaderProps {
  onOpenHolidays: () => void;
  onOpenSavedOrders: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHolidays,
  onOpenSavedOrders,
  savedCount
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-orange-500/20">
            <Shirt className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-white">
                Roller Dealer
              </h1>
              <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Production Planner
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Sistem Estimasi Jadwal Produksi Konveksi Kemeja UMKM
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end print:hidden">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold border border-amber-400 transition-colors shadow-sm"
            title="Cetak Lembar Estimasi untuk Pelanggan"
          >
            <Printer className="w-4 h-4 stroke-[2.5]" />
            <span>Cetak Estimasi (PDF)</span>
          </button>

          <button
            onClick={onOpenHolidays}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="Kelola Hari Libur Nasional & Cuti"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Hari Libur (6 Hari Kerja)</span>
          </button>

          <button
            onClick={onOpenSavedOrders}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors relative"
            title="Daftar Simulasi Pesanan Saved"
          >
            <BookmarkPlus className="w-4 h-4 text-emerald-400" />
            <span>Pesanan Tersimpan</span>
            {savedCount > 0 && (
              <span className="bg-emerald-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
