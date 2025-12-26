import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dukungan Pelanggan
          </h1>
          <p className="text-xl text-gray-600">
            Kami siap membantu Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Hubungi Kami
              </h3>
              <p className="text-gray-600 mb-4">
                Butuh bantuan? Hubungi tim support kami melalui halaman kontak.
              </p>
              <Link href="/contact">
                <Button variant="primary" size="md" className="w-full">
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                FAQ
              </h3>
              <p className="text-gray-600 mb-4">
                Temukan jawaban untuk pertanyaan yang sering diajukan.
              </p>
              <Link href="/faq">
                <Button variant="outline" size="md" className="w-full">
                  Lihat FAQ
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <Card>
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Cara Menghubungi Support
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Email:</strong> support@laundryhub.com
              </p>
              <p>
                <strong>Jam Operasional:</strong> Senin - Minggu, 08:00 - 20:00 WIB
              </p>
              <p>
                <strong>Response Time:</strong> Kami akan merespons dalam 24 jam kerja
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

