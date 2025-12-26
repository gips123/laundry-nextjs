import Card from '@/components/ui/Card';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Karir di LaundryHub
          </h1>
          <p className="text-xl text-gray-600">
            Bergabunglah dengan tim kami
          </p>
        </div>

        <Card>
          <div className="p-8">
            <p className="text-gray-700 leading-relaxed mb-6">
              LaundryHub sedang berkembang dan kami selalu mencari talenta terbaik untuk bergabung dengan tim kami.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Jika Anda tertarik untuk bergabung dengan LaundryHub, silakan hubungi kami melalui halaman kontak 
              dengan subjek "Karir" atau kirim CV Anda ke email kami.
            </p>
            <div className="text-center space-y-4">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

