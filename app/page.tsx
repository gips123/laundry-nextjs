import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { dummyLaundries } from '@/lib/dummy-data';
import LaundryCard from '@/components/laundry/LaundryCard';

export default function Home() {
  const featuredLaundries = dummyLaundries.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Cuci Pakaian Anda dengan Mudah
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Temukan laundry terbaik di sekitar Anda. Pick-up & delivery gratis, 
              harga terjangkau, dan hasil yang memuaskan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/laundries">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Cari Laundry Sekarang
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Mengapa Pilih LaundryHub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pick-up & Delivery Gratis</h3>
              <p className="text-gray-600">
                Kami akan mengambil dan mengantarkan pakaian Anda tanpa biaya tambahan
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Layanan Express</h3>
              <p className="text-gray-600">
                Butuh cepat? Pilih layanan express dan dapatkan pakaian Anda dalam 6 jam
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Kualitas Terjamin</h3>
              <p className="text-gray-600">
                Semua laundry partner kami telah terverifikasi dan berkualitas tinggi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Laundries */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Laundry Terpopuler
            </h2>
            <Link href="/laundries">
              <Button variant="ghost" size="md">
                Lihat Semua →
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredLaundries.map((laundry) => (
              <LaundryCard key={laundry.id} laundry={laundry} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Siap Mencuci Pakaian Anda?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Daftar sekarang dan dapatkan diskon 20% untuk pesanan pertama
          </p>
          <Link href="/register">
            <Button variant="secondary" size="lg">
              Daftar Sekarang
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
