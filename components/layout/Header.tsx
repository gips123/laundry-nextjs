'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname?.includes('/login') || pathname?.includes('/register');

  if (isAuthPage) {
    return (
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              LaundryHub
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            LaundryHub
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/laundries"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Cari Laundry
            </Link>
            <Link
              href="/orders"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Pesanan Saya
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm">
                Daftar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

