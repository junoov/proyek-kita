import React, { useState } from 'react';
import type { ProductionInput } from './types';
import { Calendar, Package, Layers, Zap, SlidersHorizontal, Info, RefreshCw } from 'lucide-react';
import { formatDateYMD } from './utils/holidays';

interface InputFormProps {
  input: ProductionInput;
  onChange: (updated: ProductionInput) => void;
  onReset: () => void;
}

export const InputForm: React.FC<InputFormProps> = ({ input, onChange, onReset }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handlePreset = (pcs: number, queue: number) => {
    onChange({
      ...input,
      quantity: pcs,
      queueCount: queue
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 transition-all">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Input Parameter Pesanan</h2>
            <p className="text-xs text-slate-500">Masukkan detail pesanan kemeja Roller Dealer</p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-orange-600 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-slate-100"
          title="Reset Form ke Default"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Preset Quick Buttons */}
      <div className="mb-5">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 block">
          Preset Cepat Contoh Pesanan:
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handlePreset(100, 160)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-orange-700 border border-slate-200 hover:border-orange-200 transition-colors"
          >
            100 pcs (Antrean 160 pcs)
          </button>
          <button
            type="button"
            onClick={() => handlePreset(250, 240)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-orange-700 border border-slate-200 hover:border-orange-200 transition-colors"
          >
            250 pcs (Antrean 240 pcs)
          </button>
          <button
            type="button"
            onClick={() => handlePreset(50, 0)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-orange-700 border border-slate-200 hover:border-orange-200 transition-colors"
          >
            50 pcs (Antrean 0 pcs)
          </button>
        </div>
      </div>

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tanggal Order */}
        <div>
          <label htmlFor="input-order-date" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-orange-500" />
            <span>Tanggal Order</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            id="input-order-date"
            type="date"
            value={input.orderDate}
            onChange={(e) => onChange({ ...input, orderDate: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm font-medium text-slate-900 shadow-sm"
          />
          <span className="text-[11px] text-slate-500 mt-1 block">Hari masuknya orderan</span>
        </div>

        {/* Jumlah Pesanan */}
        <div>
          <label htmlFor="input-quantity" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Package className="w-4 h-4 text-orange-500" />
            <span>Jumlah Pesanan (pcs)</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="input-quantity"
              type="number"
              min="1"
              step="1"
              value={input.quantity || ''}
              onChange={(e) => onChange({ ...input, quantity: Math.max(1, parseInt(e.target.value) || 0) })}
              className="w-full px-3.5 py-2.5 pr-12 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm font-semibold text-slate-900 shadow-sm"
              placeholder="Contoh: 100"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">pcs</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Jahit: ceil({input.quantity} / {input.sewingCapacity || 80}) = {Math.ceil((input.quantity || 0) / (input.sewingCapacity || 80))} hari kerja
          </span>
        </div>

        {/* Total Antrean Jahit */}
        <div>
          <label htmlFor="input-queue-count" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-orange-500" />
            <span>Total Antrean Jahit (pcs)</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="input-queue-count"
              type="number"
              min="0"
              step="1"
              value={input.queueCount}
              onChange={(e) => onChange({ ...input, queueCount: Math.max(0, parseInt(e.target.value) || 0) })}
              className="w-full px-3.5 py-2.5 pr-12 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm font-semibold text-slate-900 shadow-sm"
              placeholder="Contoh: 160"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">pcs</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Antrean jahit: ceil({input.queueCount} / {input.sewingCapacity || 80}) = {Math.ceil((input.queueCount || 0) / (input.sewingCapacity || 80))} hari kerja
          </span>
        </div>
      </div>

      {/* Advanced Settings Toggle */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{showAdvanced ? 'Sembunyikan Pengaturan Standar Roller Dealer' : 'Sesuaikan Aturan Kapasitas & Durasi Tahap (Advanced)'}</span>
        </button>

        {showAdvanced && (
          <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
            <div>
              <label htmlFor="input-sewing-capacity" className="block text-xs font-medium text-slate-700 mb-1">Kapasitas Jahit / Hari</label>
              <input
                id="input-sewing-capacity"
                type="number"
                min="10"
                value={input.sewingCapacity || 80}
                onChange={(e) => onChange({ ...input, sewingCapacity: parseInt(e.target.value) || 80 })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
              />
              <span className="text-[10px] text-slate-500">Standar: 80 pcs/hari</span>
            </div>

            <div>
              <label htmlFor="input-use-embroidery" className="block text-xs font-medium text-slate-700 mb-1">Proses Bordir?</label>
              <select
                id="input-use-embroidery"
                value={input.useEmbroidery ? 'true' : 'false'}
                onChange={(e) => onChange({ ...input, useEmbroidery: e.target.value === 'true' })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
              >
                <option value="true">Pakai Bordir (5 Hari)</option>
                <option value="false">Tanpa Bordir (0 Hari)</option>
              </select>
              <span className="text-[10px] text-slate-500">Default: 5 Hari Kerja</span>
            </div>

            <div>
              <label htmlFor="input-belanja-days" className="block text-xs font-medium text-slate-700 mb-1">Durasi Belanja Kain</label>
              <input
                id="input-belanja-days"
                type="number"
                min="0"
                value={input.belanjaDays ?? 2}
                onChange={(e) => onChange({ ...input, belanjaDays: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
              />
              <span className="text-[10px] text-slate-500">Standar: 2 Hari Kerja</span>
            </div>

            <div>
              <label htmlFor="input-potong-days" className="block text-xs font-medium text-slate-700 mb-1">Durasi Potong Kain</label>
              <input
                id="input-potong-days"
                type="number"
                min="0"
                value={input.potongDays ?? 2}
                onChange={(e) => onChange({ ...input, potongDays: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
              />
              <span className="text-[10px] text-slate-500">Standar: 2 Hari Kerja</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
        <Info className="w-4 h-4 text-amber-600 shrink-0" />
        <p>
          <strong>Aturan Roller Dealer:</strong> Hari kerja Senin - Sabtu. Hari Ahad dan Hari Libur Nasional otomatis dilewati. Kapasitas jahit 80 pcs/hari.
        </p>
      </div>
    </div>
  );
};
