import React from 'react';
import type { SavedOrder } from './types';
import { BookmarkPlus, Trash2, X, ExternalLink } from 'lucide-react';

interface SavedOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: SavedOrder[];
  onDeleteOrder: (id: string) => void;
  onClearAll: () => void;
}

export const SavedOrdersModal: React.FC<SavedOrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  onDeleteOrder,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              <BookmarkPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Daftar Simulasi Pesanan Tersimpan</h3>
              <p className="text-xs text-slate-400">Catatan estimasi untuk berbagai pelanggan Roller Dealer</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {orders.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-600">Belum ada pesanan tersimpan.</p>
              <p className="text-xs text-slate-400">Gunakan tombol "Simpan Order" di halaman utama untuk merekam simulasi.</p>
            </div>
          ) : (
            orders.map((o) => (
              <div
                key={o.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 hover:bg-white transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{o.clientName}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {o.quantity} pcs
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    Order: <span className="font-mono">{o.orderDate}</span> &rarr; Target Selesai: <strong className="text-amber-700">{o.completionDateStr}</strong>
                  </p>

                  <p className="text-[11px] text-slate-400">
                    Antrean Jahit: {o.queueCount} pcs | Dibuat: {o.createdAt}
                  </p>
                </div>

                <button
                  onClick={() => onDeleteOrder(o.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Hapus simulasi"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          {orders.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold underline"
            >
              Hapus Semua
            </button>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors ml-auto"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
