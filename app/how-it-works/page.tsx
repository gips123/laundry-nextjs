import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cara Kerja LaundryHub
          </h1>
          <p className="text-xl text-gray-600">
            Proses pemesanan laundry yang mudah dan cepat
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <div className="p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Pilih Laundry
                  </h3>
                  <p className="text-gray-600">
                    Cari dan pilih laundry terdekat dari lokasi Anda. Lihat rating, harga, dan layanan yang tersedia.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Pilih Layanan
                  </h3>
                  <p className="text-gray-600">
                    Pilih jenis layanan yang Anda butuhkan (cuci reguler, express, dry clean, dll) dan jumlahnya.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Isi Detail Pesanan
                  </h3>
                  <p className="text-gray-600">
                    Masukkan alamat pengambilan, tanggal yang diinginkan, dan catatan khusus jika ada.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Pick-up & Delivery
                  </h3>
                  <p className="text-gray-600">
                    Tim laundry akan mengambil pakaian Anda, mencucinya, dan mengantarkannya kembali ke alamat Anda.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">5</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Pantau Status
                  </h3>
                  <p className="text-gray-600">
                    Pantau status pesanan Anda secara real-time dari mulai diambil hingga dikembalikan.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Link href="/laundries">
            <Button variant="primary" size="lg">
              Mulai Pesan Sekarang
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

