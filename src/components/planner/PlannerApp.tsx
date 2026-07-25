/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './Header';
import { InputForm } from './InputForm';
import { SummaryCards } from './SummaryCards';
import { TimelineGantt } from './TimelineGantt';
import { StepByStepBreakdown } from './StepByStepBreakdown';
import { AIAdvisorModal } from './AIAdvisorModal';
import { WhatsAppDraftModal } from './WhatsAppDraftModal';
import { HolidayManagerModal } from './HolidayManagerModal';
import { SavedOrdersModal } from './SavedOrdersModal';

import type { Holiday, ProductionInput, SavedOrder } from './types';
import { INITIAL_INDONESIAN_HOLIDAYS, formatDateYMD } from './utils/holidays';
import { calculateProduction } from './utils/productionPlanner';

export default function App() {
  // 1. Initial State
  const todayYMD = useMemo(() => formatDateYMD(new Date()), []);

  const [input, setInput] = useState<ProductionInput>({
    orderDate: todayYMD,
    quantity: 100,
    queueCount: 160,
    sewingCapacity: 80,
    useEmbroidery: true,
    belanjaDays: 2,
    potongDays: 2,
    embroideryDays: 5,
    finishingDays: 2
  });

  // 2. Holidays state with LocalStorage persistence
  const [holidays, setHolidays] = useState<Holiday[]>(() => {
    try {
      const saved = localStorage.getItem('roller_dealer_holidays');
      return saved ? JSON.parse(saved) : INITIAL_INDONESIAN_HOLIDAYS;
    } catch {
      return INITIAL_INDONESIAN_HOLIDAYS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('roller_dealer_holidays', JSON.stringify(holidays));
    } catch (e) {
      console.error("Failed to save holidays:", e);
    }
  }, [holidays]);

  // 3. Saved Orders state
  const [savedOrders, setSavedOrders] = useState<SavedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('roller_dealer_saved_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('roller_dealer_saved_orders', JSON.stringify(savedOrders));
    } catch (e) {
      console.error("Failed to save orders:", e);
    }
  }, [savedOrders]);

  // 4. Modals State
  const [isHolidaysOpen, setIsHolidaysOpen] = useState(false);
  const [isAIAdvisorOpen, setIsAIAdvisorOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isSavedOrdersOpen, setIsSavedOrdersOpen] = useState(false);

  // 5. Dynamic Calculation Result
  const productionResult = useMemo(() => {
    return calculateProduction(input, holidays);
  }, [input, holidays]);

  // Handlers for Holidays
  const handleToggleHoliday = (id: string) => {
    setHolidays(prev => prev.map(h => h.id === id ? { ...h, enabled: !h.enabled } : h));
  };

  const handleAddHoliday = (newH: Holiday) => {
    setHolidays(prev => [newH, ...prev]);
  };

  const handleDeleteHoliday = (id: string) => {
    setHolidays(prev => prev.filter(h => h.id !== id));
  };

  const handleResetHolidays = () => {
    setHolidays(INITIAL_INDONESIAN_HOLIDAYS);
  };

  // Handlers for Saved Orders
  const handleSaveCurrentOrder = () => {
    const clientName = prompt("Masukkan nama pelanggan / pesanan:", `Pesanan Kemeja (${input.quantity} pcs)`);
    if (!clientName) return;

    const newOrder: SavedOrder = {
      id: `order-${Date.now()}`,
      clientName,
      orderName: `${input.quantity} pcs Kemeja`,
      quantity: input.quantity,
      queueCount: input.queueCount,
      orderDate: productionResult.orderDateStr,
      completionDateStr: productionResult.completionDateStr,
      status: 'Draft',
      createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setSavedOrders(prev => [newOrder, ...prev]);
    setIsSavedOrdersOpen(true);
  };

  const handleDeleteSavedOrder = (id: string) => {
    setSavedOrders(prev => prev.filter(o => o.id !== id));
  };

  const handleClearSavedOrders = () => {
    if (confirm("Hapus seluruh pesanan tersimpan?")) {
      setSavedOrders([]);
    }
  };

  const handleResetForm = () => {
    setInput({
      orderDate: todayYMD,
      quantity: 100,
      queueCount: 160,
      sewingCapacity: 80,
      useEmbroidery: true,
      belanjaDays: 2,
      potongDays: 2,
      embroideryDays: 5,
      finishingDays: 2
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col antialiased">
      {/* Top Brand Navigation Header */}
      <Header
        onOpenHolidays={() => setIsHolidaysOpen(true)}
        onOpenSavedOrders={() => setIsSavedOrdersOpen(true)}
        savedCount={savedOrders.length}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Section 1: Input Form */}
        <section id="input-section">
          <InputForm
            input={input}
            onChange={setInput}
            onReset={handleResetForm}
          />
        </section>

        {/* Section 2: Summary Stat Cards & Key Dates */}
        <section id="summary-section">
          <SummaryCards
            result={productionResult}
            onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
            onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
            onSaveOrder={handleSaveCurrentOrder}
          />
        </section>

        {/* Section 3: Visual Timeline & Gantt Chart */}
        <section id="timeline-section">
          <TimelineGantt result={productionResult} />
        </section>

        {/* Section 4: Step-by-Step Indonesian Explanation */}
        <section id="breakdown-section">
          <StepByStepBreakdown result={productionResult} />
        </section>
      </main>

      {/* Footer Branding */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-6 text-xs text-center mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} <strong>Roller Dealer</strong> — AI Production Planner Konveksi Indonesia.</p>
          <p className="text-slate-500">Kapasitas Jahit 80 pcs/hari | Kerja Senin - Sabtu | Dilengkapi AI Gemini</p>
        </div>
      </footer>

      {/* Modals */}
      <AIAdvisorModal
        isOpen={isAIAdvisorOpen}
        onClose={() => setIsAIAdvisorOpen(false)}
        input={input}
        result={productionResult}
      />

      <WhatsAppDraftModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        result={productionResult}
        quantity={input.quantity}
      />

      <HolidayManagerModal
        isOpen={isHolidaysOpen}
        onClose={() => setIsHolidaysOpen(false)}
        holidays={holidays}
        onToggleHoliday={handleToggleHoliday}
        onAddHoliday={handleAddHoliday}
        onDeleteHoliday={handleDeleteHoliday}
        onResetHolidays={handleResetHolidays}
      />

      <SavedOrdersModal
        isOpen={isSavedOrdersOpen}
        onClose={() => setIsSavedOrdersOpen(false)}
        orders={savedOrders}
        onDeleteOrder={handleDeleteSavedOrder}
        onClearAll={handleClearSavedOrders}
      />
    </div>
  );
}
