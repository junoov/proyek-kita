import React, { useState } from 'react';
import type { ProductionResult } from './types';
import { BookOpen, ChevronDown, ChevronUp, Calculator, CheckCircle2, HelpCircle } from 'lucide-react';

interface StepByStepBreakdownProps {
  result: ProductionResult;
}

export const StepByStepBreakdown: React.FC<StepByStepBreakdownProps> = ({ result }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Penjelasan Perhitungan Langkah demi Langkah</h2>
            <p className="text-xs text-slate-500">Panduan lengkap matematis & operasional Bahasa Indonesia</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
          <span>{isOpen ? 'Sembunyikan Rincian' : 'Tampilkan Rincian'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-6 space-y-4 border-t border-slate-100 pt-5 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.stepByStepExplanation.map((step: any) => (
              <div
                key={step.stepNumber}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-extrabold text-xs flex items-center justify-center shadow-sm">
                      {step.stepNumber}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {step.title}
                    </h3>
                  </div>

                  <span className="text-xs font-black text-indigo-600 bg-indigo-50 border border-indigo-200/60 px-2.5 py-0.5 rounded-full">
                    {step.result}
                  </span>
                </div>

                <div className="text-xs font-mono bg-white p-2 rounded-lg border border-slate-200 text-slate-800">
                  <span className="text-slate-400">Formula: </span>
                  <strong>{step.formula}</strong>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs text-indigo-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-indigo-900">
              <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Catatan Aturan Kerja Konveksi Roller Dealer</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
              <li><strong>Kapasitas Jahit:</strong> 80 pcs kemeja per hari kerja (menggunakan rumus pembulatan ke atas / <code className="bg-white px-1 py-0.5 rounded font-mono text-[11px]">ceil()</code>).</li>
              <li><strong>Antrean Jahit:</strong> Antrean dihitung sebelum penjahitan pesanan baru dimulai. Belanja, potong, dan bordir berjalan sesuai timeline standar.</li>
              <li><strong>Hari Kerjasejak Order:</strong> Seluruh perhitungan mengesampingkan hari Ahad dan hari Libur Nasional resmi Indonesia.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
