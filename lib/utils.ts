import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function getStatusLabel(status: string): string {
  const statusMap: Record<string, string> = {
    pending: 'Menunggu Konfirmasi',
    confirmed: 'Dikonfirmasi',
    'picked-up': 'Sudah Diambil',
    washing: 'Sedang Dicuci',
    drying: 'Sedang Dijemur',
    ironing: 'Sedang Disetrika',
    ready: 'Siap Diambil',
    delivered: 'Sedang Dikirim',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
  };
  return statusMap[status] || status;
}

export function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    'picked-up': 'bg-purple-100 text-purple-800',
    washing: 'bg-indigo-100 text-indigo-800',
    drying: 'bg-cyan-100 text-cyan-800',
    ironing: 'bg-pink-100 text-pink-800',
    ready: 'bg-green-100 text-green-800',
    delivered: 'bg-teal-100 text-teal-800',
    completed: 'bg-emerald-100 text-emerald-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
}

