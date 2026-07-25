import React, { useEffect, useState } from 'react';
import type { ProductionInput, ProductionResult, AIAdvisoryResult } from './types';
import { Sparkles, X, AlertTriangle, Lightbulb, MessageSquare, Copy, Check, Loader2, Bot } from 'lucide-react';

interface AIAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  input: ProductionInput;
  result: ProductionResult;
}

export const AIAdvisorModal: React.FC<AIAdvisorModalProps> = ({
  isOpen,
  onClose,
  input,
  result
}) => {
  const [loading, setLoading] = useState(false);
  const [advisory, setAdvisory] = useState<AIAdvisoryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAIAdvisory();
    }
  }, [isOpen, input, result]);

  const fetchAIAdvisory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ai-advisory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderDate: result.orderDateStr,
          quantity: input.quantity,
          queueCount: input.queueCount,
          sewingCapacity: input.sewingCapacity || 80,
          useEmbroidery: input.useEmbroidery ?? true,
          totalWorkingDays: result.totalWorkingDays,
          totalCalendarDays: result.totalCalendarDays,
          completionDateStr: result.completionDateStr,
          timeline: result.timeline,
          holidaysEncountered: result.holidaysEncountered
        })
      });

      if (!response.ok) {
        throw new Error('Gagal mendapatkan respon dari AI Advisor');
      }

      const data: AIAdvisoryResult = await response.json();
      setAdvisory(data);
    } catch (err: any) {
      console.error("AI Advisory fetch error:", err);
      setError(err.message || "Gagal memuat rekomendasi AI.");
      // Provide smart static fallback advisory
      setAdvisory({
        summaryInsight: `Estimasi produksi ${input.quantity} pcs kemeja membutuhkan total ${result.totalWorkingDays} hari kerja (${result.totalCalendarDays} hari kalender) dan selesai pada ${result.completionDateStr}.`,
        potentialBottlenecks: [
          input.queueCount > 160
            ? `Antrean jahit tergolong tinggi (${input.queueCount} pcs). Penambahan antrean berpotensi menggeser jadwal.`
            : `Proses jahit merupakan titik utama penentu kelancaran pesanan.`,
          result.holidaysEncountered.length > 0
            ? `Terdapat libur nasional terlewati (${result.holidaysEncountered.join(', ')}).`
            : `Pastikan pasokan kain dan benang lengkap pada H-1 belanja kain.`
        ],
        optimizationSuggestions: [
          `Jika pemesan meminta pengerjaan cepat (Express Order), tingkatkan kapasitas jahit dengan lembur atau bagi shift.`,
          `Lakukan persiapan pola dan pemesanan bahan kain bersamaan sebelum Hari H belanja.`
        ],
        whatsappDraft: `Halo Kak, terima kasih sudah memesan ${input.quantity} pcs kemeja di Roller Dealer!\n\nPesanan Kakak saat ini sudah masuk jadwal produksi dan diperkirakan selesai pada *${result.completionDateStr}*.\n\nDetail Timeline Produksi:\n- Belanja & Potong Kain: 4 Hari Kerja\n- Bordir Logo: ${input.useEmbroidery ? '5 Hari Kerja' : 'Tanpa Bordir'}\n- Antrean & Penjahitan: ${result.queueSewingDays + result.newOrderSewingDays} Hari Kerja\n- Finishing & QC: 2 Hari Kerja\n\nTerima kasih atas kepercayaannya pada Roller Dealer!`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyWA = () => {
    if (advisory?.whatsappDraft) {
      navigator.clipboard.writeText(advisory.whatsappDraft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <span>AI Production Advisor</span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  Roller Dealer AI
                </span>
              </h3>
              <p className="text-xs text-slate-400">Analisis risiko, bottleneck & komunikasi pelanggan</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {loading ? (
            <div className="py-12 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-orange-600 animate-spin mx-auto" />
              <p className="text-sm font-semibold text-slate-700">Gemini AI sedang menganalisis jadwal produksi...</p>
              <p className="text-xs text-slate-500">Mengevaluasi antrean jahit, hari kerja, dan rekomendasi efisiensi</p>
            </div>
          ) : (
            advisory && (
              <>
                {/* Summary Insight */}
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 font-bold text-orange-950 text-sm">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    <span>Ringkasan AI Production Planner</span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {advisory.summaryInsight}
                  </p>
                </div>

                {/* Potential Bottlenecks */}
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 font-bold text-rose-950 text-sm">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Potensi Bottleneck & Risiko Keterlambatan</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                    {advisory.potentialBottlenecks.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Optimization Suggestions */}
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm">
                    <Lightbulb className="w-4 h-4 text-emerald-600" />
                    <span>Rekomendasi Percepatan & Efisiensi</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                    {advisory.optimizationSuggestions.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* WhatsApp Draft Preview */}
                <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs text-emerald-400">
                      <MessageSquare className="w-4 h-4" />
                      <span>Draft Pesan WhatsApp untuk Pelanggan</span>
                    </div>

                    <button
                      onClick={handleCopyWA}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Tersalin!' : 'Salin Pesan'}</span>
                    </button>
                  </div>

                  <pre className="text-xs font-sans whitespace-pre-wrap bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-slate-200 leading-relaxed">
                    {advisory.whatsappDraft}
                  </pre>
                </div>
              </>
            )
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
