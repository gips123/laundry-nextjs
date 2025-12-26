import Card from '@/components/ui/Card';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Harga Layanan
          </h1>
          <p className="text-xl text-gray-600">
            Harga bervariasi tergantung laundry dan jenis layanan
          </p>
        </div>

        <Card>
          <div className="p-8">
            <p className="text-gray-700 leading-relaxed mb-6">
              Harga layanan laundry bervariasi tergantung pada:
            </p>
            <ul className="space-y-3 text-gray-700 mb-8">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Jenis layanan (reguler, express, dry clean, dll)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Lokasi laundry</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Jumlah pakaian</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Kebijakan masing-masing mitra laundry</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-6">
              Untuk melihat harga spesifik, silakan pilih laundry dan layanan yang diinginkan. 
              Harga akan ditampilkan sebelum Anda melakukan checkout.
            </p>
            <div className="text-center">
              <Link href="/laundries">
                <Button variant="primary" size="lg">
                  Lihat Laundry & Harga
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

