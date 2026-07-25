import React, { useState } from 'react';
import type { ProductionResult } from './types';
import { MessageSquare, Copy, Check, ExternalLink, X, User } from 'lucide-react';

interface WhatsAppDraftModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ProductionResult;
  quantity: number;
}

export const WhatsAppDraftModal: React.FC<WhatsAppDraftModalProps> = ({
  isOpen,
  onClose,
  result,
  quantity
}) => {
  const [clientName, setClientName] = useState('Kak');
  const [phone, setPhone] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const draftMessage = `Halo ${clientName || 'Kak'}, terima kasih sudah mempercayakan pesanan ${quantity} pcs kemeja di *Roller Dealer*! 🧵

Berikut estimasi dan jadwal produksi pesanan Anda:
📅 *Tanggal Order:* ${result.orderDateStr}
🏁 *Estimasi Selesai:* *${result.completionDateStr}*
⏱️ *Total Durasi:* ${result.totalWorkingDays} Hari Kerja (${result.totalCalendarDays} Hari Kalender)

📌 *Tahapan Produksi:*
1. Belanja Kain: 2 Hari Kerja
2. Potong Kain: 2 Hari Kerja
3. Bordir Logo: ${result.timeline.find((t: any) => t.id === 'bordir')?.workDays || 0} Hari Kerja
4. Antrean Jahit: ${result.queueSewingDays} Hari Kerja
5. Penjahitan Kemeja: ${result.newOrderSewingDays} Hari Kerja
6. Finishing & QC: 2 Hari Kerja

_Catatan: Hari Ahad & Libur Nasional tidak dihitung sebagai hari produksi. Kami akan menginfokan progres berkala._

Terima kasih,
*Tim Roller Dealer Konveksi*`;

  const handleCopy = () => {
    navigator.clipboard.writeText(draftMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWA = () => {
    const encodedText = encodeURIComponent(draftMessage);
    let url = `https://wa.me/`;
    if (phone) {
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      url += cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
    }
    url += `?text=${encodedText}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-emerald-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold border border-emerald-500">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Draft Update WhatsApp Pelanggan</h3>
              <p className="text-xs text-emerald-100">Kirim jadwal estimasi langsung ke pembeli</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded text-emerald-200 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="input-client-name" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Nama Pelanggan</span>
              </label>
              <input
                id="input-client-name"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Contoh: Kak Budi / PT Maju"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold"
              />
            </div>

            <div>
              <label htmlFor="input-phone-number" className="block text-xs font-bold text-slate-700 mb-1">
                Nomor WA (Opsional)
              </label>
              <input
                id="input-phone-number"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08123456789"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Pratinjau Pesan WA:
            </label>
            <textarea
              readOnly
              rows={10}
              value={draftMessage}
              className="w-full p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl border border-slate-800 leading-relaxed resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold flex items-center gap-2 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
          </button>

          <button
            onClick={handleOpenWA}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Buka WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
