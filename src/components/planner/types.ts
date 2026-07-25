export interface Holiday {
  id: string;
  date: string; // YYYY-MM-DD
  name: string;
  isCustom?: boolean;
  enabled: boolean;
}

export interface ProductionInput {
  orderDate: string; // YYYY-MM-DD
  quantity: number; // pcs kemeja
  queueCount: number; // total antrean jahit pcs
  sewingCapacity?: number; // pcs per hari kerja (default 80)
  useEmbroidery?: boolean; // default true (5 hari kerja)
  belanjaDays?: number; // default 2
  potongDays?: number; // default 2
  embroideryDays?: number; // default 5
  finishingDays?: number; // default 2
}

export interface NonWorkingDay {
  date: Date;
  dateStr: string;
  type: 'Ahad' | 'Libur Nasional';
  name?: string;
}

export interface StepTimeline {
  id: string;
  stepName: string;
  description: string;
  workDays: number;
  calendarDays: number;
  startDate: Date;
  endDate: Date;
  startDateStr: string;
  endDateStr: string;
  nonWorkingDays: NonWorkingDay[];
  formulaExplanation: string;
  statusBadge: string;
}

export interface ProductionResult {
  orderDate: Date;
  orderDateStr: string;
  totalWorkingDays: number;
  totalCalendarDays: number;
  completionDate: Date;
  completionDateStr: string;
  queueSewingDays: number;
  newOrderSewingDays: number;
  timeline: StepTimeline[];
  holidaysEncountered: string[];
  stepByStepExplanation: {
    stepNumber: number;
    title: string;
    formula: string;
    result: string;
    detail: string;
  }[];
}

export interface AIAdvisoryResult {
  summaryInsight: string;
  potentialBottlenecks: string[];
  optimizationSuggestions: string[];
  whatsappDraft: string;
}

export interface SavedOrder {
  id: string;
  clientName: string;
  orderName: string;
  quantity: number;
  queueCount: number;
  orderDate: string;
  completionDateStr: string;
  status: 'Draft' | 'Dikerjakan' | 'Selesai';
  createdAt: string;
}
