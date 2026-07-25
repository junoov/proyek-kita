import type { Holiday, NonWorkingDay, ProductionInput, ProductionResult, StepTimeline } from '../types';
import { formatDateToIndonesianStr, formatDateYMD, parseDateYMD } from './holidays';

export function calculateProduction(
  input: ProductionInput,
  holidays: Holiday[]
): ProductionResult {
  const {
    orderDate: orderDateYMD,
    quantity,
    queueCount,
    sewingCapacity = 80,
    useEmbroidery = true,
    belanjaDays = 2,
    potongDays = 2,
    embroideryDays = 5,
    finishingDays = 2,
  } = input;

  const orderDate = parseDateYMD(orderDateYMD);
  
  // Enabled holiday map
  const holidayMap = new Map<string, string>();
  holidays.forEach(h => {
    if (h.enabled) {
      holidayMap.set(h.date, h.name);
    }
  });

  // Calculate formula values according to Roller Dealer rules:
  // 1. Belanja kain = 2 hari kerja
  // 2. Potong kain = 2 hari kerja
  // 3. Bordir = 5 hari kerja (or 0 if disabled)
  // 4. Antrean jahit = ceil(total antrean / 80)
  // 5. Jahit pesanan baru = ceil(jumlah pesanan / 80)
  // 6. Finishing = 2 hari kerja

  const queueWorkDays = Math.ceil(queueCount / sewingCapacity);
  const newOrderWorkDays = Math.ceil(quantity / sewingCapacity);
  const embWorkDays = useEmbroidery ? embroideryDays : 0;

  const rawSteps = [
    {
      id: 'belanja',
      stepName: '1. Belanja Kain',
      description: 'Pembelian bahan baku kain & perlengkapan',
      workDays: belanjaDays,
      formulaExplanation: `Standar durasi belanja kain: ${belanjaDays} hari kerja.`
    },
    {
      id: 'potong',
      stepName: '2. Potong Kain (Cutting)',
      description: 'Pemotongan pola kemeja sesuai ukuran',
      workDays: potongDays,
      formulaExplanation: `Standar durasi pemotongan kain: ${potongDays} hari kerja.`
    },
    {
      id: 'bordir',
      stepName: '3. Bordir Logo / Desain',
      description: useEmbroidery ? 'Proses pembordiran desain kemeja' : 'Dilewati (Tanpa Bordir)',
      workDays: embWorkDays,
      formulaExplanation: useEmbroidery
        ? `Standar durasi bordir: ${embroideryDays} hari kerja.`
        : 'Pesanan tidak menggunakan bordir (0 hari kerja).'
    },
    {
      id: 'antrean_jahit',
      stepName: '4. Antrean Jahit',
      description: queueCount > 0 ? `Menunggu antrean ${queueCount} pcs kemeja lain` : 'Tidak ada antrean jahit',
      workDays: queueWorkDays,
      formulaExplanation: queueCount > 0
        ? `Formula: ceil(${queueCount} pcs / ${sewingCapacity} pcs/hari) = ceil(${(queueCount / sewingCapacity).toFixed(2)}) = ${queueWorkDays} hari kerja.`
        : `Antrean 0 pcs = 0 hari kerja.`
    },
    {
      id: 'jahit_pesanan',
      stepName: '5. Jahit Pesanan Baru',
      description: `Penjahitan ${quantity} pcs kemeja pesanan`,
      workDays: newOrderWorkDays,
      formulaExplanation: `Formula: ceil(${quantity} pcs / ${sewingCapacity} pcs/hari) = ceil(${(quantity / sewingCapacity).toFixed(2)}) = ${newOrderWorkDays} hari kerja.`
    },
    {
      id: 'finishing',
      stepName: '6. Finishing & Quality Control',
      description: 'Pembersihan benang, gosok, QC, dan packing',
      workDays: finishingDays,
      formulaExplanation: `Standar durasi finishing & QC: ${finishingDays} hari kerja.`
    }
  ];

  // Helper to check if a Date is a valid working day (Monday-Saturday, non-holiday)
  function isWorkingDay(d: Date): { isValid: boolean; reason?: 'Ahad' | 'Libur Nasional'; name?: string } {
    const dayOfWeek = d.getDay(); // 0 = Ahad/Sunday
    if (dayOfWeek === 0) {
      return { isValid: false, reason: 'Ahad' };
    }
    const dateYMD = formatDateYMD(d);
    if (holidayMap.has(dateYMD)) {
      const hName = holidayMap.get(dateYMD);
      return { isValid: false, reason: 'Libur Nasional', ...(hName ? { name: hName } : {}) };
    }
    return { isValid: true };
  }

  // Helper to find next valid working day starting from a given date
  function getNextWorkingDay(from: Date): Date {
    const cur = new Date(from.getTime());
    while (!isWorkingDay(cur).isValid) {
      cur.setDate(cur.getDate() + 1);
    }
    return cur;
  }

  const timeline: StepTimeline[] = [];
  const allHolidaysEncounteredSet = new Set<string>();
  let currentPointer = new Date(orderDate.getTime());

  // Make sure we start from a valid working day for Step 1
  currentPointer = getNextWorkingDay(currentPointer);

  let totalAccumulatedWorkDays = 0;

  for (const step of rawSteps) {
    if (step.workDays === 0) {
      // Step takes 0 working days
      timeline.push({
        id: step.id,
        stepName: step.stepName,
        description: step.description,
        workDays: 0,
        calendarDays: 0,
        startDate: new Date(currentPointer.getTime()),
        endDate: new Date(currentPointer.getTime()),
        startDateStr: formatDateToIndonesianStr(currentPointer),
        endDateStr: formatDateToIndonesianStr(currentPointer),
        nonWorkingDays: [],
        formulaExplanation: step.formulaExplanation,
        statusBadge: 'Dilewati'
      });
      continue;
    }

    const stepStartDate = new Date(currentPointer.getTime());
    const nonWorkingDaysInStep: NonWorkingDay[] = [];
    let accumulatedWorkDaysForStep = 0;
    const scanner = new Date(stepStartDate.getTime());

    while (accumulatedWorkDaysForStep < step.workDays) {
      const check = isWorkingDay(scanner);
      if (check.isValid) {
        accumulatedWorkDaysForStep++;
        if (accumulatedWorkDaysForStep < step.workDays) {
          scanner.setDate(scanner.getDate() + 1);
        }
      } else {
        const dateYMD = formatDateYMD(scanner);
        nonWorkingDaysInStep.push({
          date: new Date(scanner.getTime()),
          dateStr: formatDateToIndonesianStr(scanner),
          type: check.reason!,
          ...(check.name ? { name: check.name } : {})
        });
        if (check.reason === 'Libur Nasional' && check.name) {
          allHolidaysEncounteredSet.add(`${formatDateToIndonesianStr(scanner)} (${check.name})`);
        }
        scanner.setDate(scanner.getDate() + 1);
      }
    }

    const stepEndDate = new Date(scanner.getTime());
    const calendarDuration = Math.round((stepEndDate.getTime() - stepStartDate.getTime()) / (1000 * 3600 * 24)) + 1;

    timeline.push({
      id: step.id,
      stepName: step.stepName,
      description: step.description,
      workDays: step.workDays,
      calendarDays: calendarDuration,
      startDate: stepStartDate,
      endDate: stepEndDate,
      startDateStr: formatDateToIndonesianStr(stepStartDate),
      endDateStr: formatDateToIndonesianStr(stepEndDate),
      nonWorkingDays: nonWorkingDaysInStep,
      formulaExplanation: step.formulaExplanation,
      statusBadge: `${step.workDays} Hari Kerja`
    });

    totalAccumulatedWorkDays += step.workDays;

    // Next step starts on the next working day after stepEndDate
    const nextStartCandidate = new Date(stepEndDate.getTime());
    nextStartCandidate.setDate(nextStartCandidate.getDate() + 1);
    currentPointer = getNextWorkingDay(nextStartCandidate);
  }

  const lastStep = timeline[timeline.length - 1];
  const completionDate = lastStep ? lastStep.endDate : orderDate;
  const totalCalendarDays = Math.max(1, Math.round((completionDate.getTime() - orderDate.getTime()) / (1000 * 3600 * 24)) + 1);

  // Step-by-step clear explanations in Indonesian for display
  const stepByStepExplanation = [
    {
      stepNumber: 1,
      title: 'Belanja Kain',
      formula: '2 Hari Kerja',
      result: `${belanjaDays} hari kerja`,
      detail: `Membutuhkan ${belanjaDays} hari kerja untuk pengadaan bahan baku kain & aksesoris.`
    },
    {
      stepNumber: 2,
      title: 'Potong Kain',
      formula: '2 Hari Kerja',
      result: `${potongDays} hari kerja`,
      detail: `Membutuhkan ${potongDays} hari kerja untuk pemotongan kain sesuai pola kemeja.`
    },
    {
      stepNumber: 3,
      title: 'Bordir Logo/Desain',
      formula: useEmbroidery ? '5 Hari Kerja' : '0 Hari Kerja',
      result: `${embWorkDays} hari kerja`,
      detail: useEmbroidery
        ? `Membutuhkan ${embroideryDays} hari kerja untuk pembordiran desain/logo.`
        : 'Dipilih tanpa bordir, sehingga durasi 0 hari kerja.'
    },
    {
      stepNumber: 4,
      title: 'Lama Antrean Jahit',
      formula: `ceil(Total Antrean / ${sewingCapacity})`,
      result: `${queueWorkDays} hari kerja`,
      detail: queueCount > 0
        ? `Formula: ceil(${queueCount} pcs / ${sewingCapacity} pcs/hari) = ${queueWorkDays} hari kerja antrean jahit.`
        : 'Tidak ada antrean jahit (0 pcs).'
    },
    {
      stepNumber: 5,
      title: 'Lama Jahit Pesanan Baru',
      formula: `ceil(Jumlah Pesanan / ${sewingCapacity})`,
      result: `${newOrderWorkDays} hari kerja`,
      detail: `Formula: ceil(${quantity} pcs / ${sewingCapacity} pcs/hari) = ${newOrderWorkDays} hari kerja penjahitan.`
    },
    {
      stepNumber: 6,
      title: 'Finishing & Quality Control',
      formula: '2 Hari Kerja',
      result: `${finishingDays} hari kerja`,
      detail: `Membutuhkan ${finishingDays} hari kerja untuk pembersihan benang, gosok, QC, dan packing.`
    },
    {
      stepNumber: 7,
      title: 'Penyesuaian Kalender (Hari Kerja Indonesia)',
      formula: 'Hari Kerja = Senin - Sabtu (Ahad & Libur Nasional dilewati)',
      result: `${totalAccumulatedWorkDays} Hari Kerja (${totalCalendarDays} Hari Kalender)`,
      detail: `Seluruh perhitungan melewati hari Ahad dan hari libur nasional Indonesia. Total penyelesaian dari ${formatDateToIndonesianStr(orderDate)} sampai ${formatDateToIndonesianStr(completionDate)}.`
    }
  ];

  return {
    orderDate,
    orderDateStr: formatDateToIndonesianStr(orderDate),
    totalWorkingDays: totalAccumulatedWorkDays,
    totalCalendarDays,
    completionDate,
    completionDateStr: formatDateToIndonesianStr(completionDate),
    queueSewingDays: queueWorkDays,
    newOrderSewingDays: newOrderWorkDays,
    timeline,
    holidaysEncountered: Array.from(allHolidaysEncounteredSet),
    stepByStepExplanation
  };
}
