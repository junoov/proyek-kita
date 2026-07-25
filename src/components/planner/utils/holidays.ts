import type { Holiday } from '../types';

export const INITIAL_INDONESIAN_HOLIDAYS: Holiday[] = [
  // 2025
  { id: '2025-01-01', date: '2025-01-01', name: 'Tahun Baru 2025 Masehi', enabled: true },
  { id: '2025-01-27', date: '2025-01-27', name: 'Isra Mikraj Nabi Muhammad SAW', enabled: true },
  { id: '2025-01-29', date: '2025-01-29', name: 'Tahun Baru Imlek 2576 Kongzili', enabled: true },
  { id: '2025-03-29', date: '2025-03-29', name: 'Hari Suci Nyepi Tahun Baru Saka 1947', enabled: true },
  { id: '2025-03-31', date: '2025-03-31', name: 'Hari Raya Idul Fitri 1446 H', enabled: true },
  { id: '2025-04-01', date: '2025-04-01', name: 'Hari Raya Idul Fitri 1446 H (Hari Kedua)', enabled: true },
  { id: '2025-04-18', date: '2025-04-18', name: 'Wafat Yesus Kristus', enabled: true },
  { id: '2025-05-01', date: '2025-05-01', name: 'Hari Buruh Internasional', enabled: true },
  { id: '2025-05-12', date: '2025-05-12', name: 'Hari Raya Waisak 2569 BE', enabled: true },
  { id: '2025-05-29', date: '2025-05-29', name: 'Kenaikan Yesus Kristus', enabled: true },
  { id: '2025-06-01', date: '2025-06-01', name: 'Hari Lahir Pancasila', enabled: true },
  { id: '2025-06-06', date: '2025-06-06', name: 'Hari Raya Idul Adha 1446 H', enabled: true },
  { id: '2025-06-27', date: '2025-06-27', name: 'Tahun Baru Islam 1447 H', enabled: true },
  { id: '2025-08-17', date: '2025-08-17', name: 'Proklamasi Kemerdekaan RI', enabled: true },
  { id: '2025-09-05', date: '2025-09-05', name: 'Maulid Nabi Muhammad SAW', enabled: true },
  { id: '2025-12-25', date: '2025-12-25', name: 'Hari Raya Natal', enabled: true },

  // 2026
  { id: '2026-01-01', date: '2026-01-01', name: 'Tahun Baru 2026 Masehi', enabled: true },
  { id: '2026-01-16', date: '2026-01-16', name: 'Isra Mikraj Nabi Muhammad SAW', enabled: true },
  { id: '2026-02-17', date: '2026-02-17', name: 'Tahun Baru Imlek 2577 Kongzili', enabled: true },
  { id: '2026-03-19', date: '2026-03-19', name: 'Hari Suci Nyepi 1948', enabled: true },
  { id: '2026-03-20', date: '2026-03-20', name: 'Hari Raya Idul Fitri 1447 H', enabled: true },
  { id: '2026-03-21', date: '2026-03-21', name: 'Hari Raya Idul Fitri 1447 H (Hari Kedua)', enabled: true },
  { id: '2026-04-03', date: '2026-04-03', name: 'Wafat Yesus Kristus', enabled: true },
  { id: '2026-05-01', date: '2026-05-01', name: 'Hari Buruh Internasional', enabled: true },
  { id: '2026-05-14', date: '2026-05-14', name: 'Kenaikan Yesus Kristus', enabled: true },
  { id: '2026-05-31', date: '2026-05-31', name: 'Hari Raya Waisak 2570 BE', enabled: true },
  { id: '2026-06-01', date: '2026-06-01', name: 'Hari Lahir Pancasila', enabled: true },
  { id: '2026-05-27', date: '2026-05-27', name: 'Hari Raya Idul Adha 1447 H', enabled: true },
  { id: '2026-06-16', date: '2026-06-16', name: 'Tahun Baru Islam 1448 H', enabled: true },
  { id: '2026-08-17', date: '2026-08-17', name: 'Proklamasi Kemerdekaan RI', enabled: true },
  { id: '2026-08-25', date: '2026-08-25', name: 'Maulid Nabi Muhammad SAW', enabled: true },
  { id: '2026-12-25', date: '2026-12-25', name: 'Hari Raya Natal', enabled: true },

  // 2027
  { id: '2027-01-01', date: '2027-01-01', name: 'Tahun Baru 2027 Masehi', enabled: true },
  { id: '2027-02-06', date: '2027-02-06', name: 'Tahun Baru Imlek 2578', enabled: true },
  { id: '2027-03-09', date: '2027-03-09', name: 'Hari Raya Idul Fitri 1448 H', enabled: true },
  { id: '2027-03-10', date: '2027-03-10', name: 'Hari Raya Idul Fitri 1448 H (Hari Kedua)', enabled: true },
  { id: '2027-05-01', date: '2027-05-01', name: 'Hari Buruh Internasional', enabled: true },
  { id: '2027-08-17', date: '2027-08-17', name: 'Hari Kemerdekaan RI', enabled: true },
  { id: '2027-12-25', date: '2027-12-25', name: 'Hari Raya Natal', enabled: true },
];

export const INDONESIAN_DAYS = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export const INDONESIAN_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export function formatDateToIndonesianStr(date: Date): string {
  const dayName = INDONESIAN_DAYS[date.getDay()];
  const dayNum = date.getDate();
  const monthName = INDONESIAN_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${dayName}, ${dayNum} ${monthName} ${year}`;
}

export function formatDateYMD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDateYMD(dateStr: string): Date {
  const parts = dateStr.split('-').map(Number);
  const year = parts[0] ?? 2026;
  const month = parts[1] ?? 1;
  const day = parts[2] ?? 1;
  return new Date(year, month - 1, day, 12, 0, 0, 0); // Set to noon to avoid timezone shift
}
