import Card from '@/components/ui/Card';
import { CheckCircle, Zap, Star, Smartphone } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tentang LaundryHub
          </h1>
          <p className="text-xl text-gray-600">
            Platform marketplace laundry terpercaya untuk kebutuhan cuci pakaian Anda
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Visi Kami
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Menjadi platform marketplace laundry terdepan di Indonesia yang menghubungkan 
                pelanggan dengan laundry terbaik, memberikan kemudahan, kenyamanan, dan kualitas 
                terbaik dalam setiap layanan.
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Misi Kami
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Menyediakan akses mudah untuk menemukan laundry terbaik di sekitar Anda</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Memberikan layanan pick-up dan delivery gratis untuk kenyamanan pelanggan</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Memastikan kualitas layanan dengan verifikasi dan rating system</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Mendukung laundry lokal untuk berkembang dan meningkatkan kualitas layanan</span>
                </li>
              </ul>
            </div>
          </Card>

          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Mengapa Pilih LaundryHub?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Pick-up & Delivery Gratis
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Kami akan mengambil dan mengantarkan pakaian Anda tanpa biaya tambahan
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Layanan Express
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Butuh cepat? Pilih layanan express dan dapatkan dalam 6 jam
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Kualitas Terjamin
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Semua laundry partner telah terverifikasi dan berkualitas tinggi
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    Tracking Real-time
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Pantau status pesanan Anda secara real-time dari awal hingga selesai
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Tim Kami
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LaundryHub dikembangkan oleh tim yang berdedikasi untuk memberikan pengalaman 
                terbaik dalam layanan laundry. Kami terus berinovasi dan meningkatkan platform 
                untuk memenuhi kebutuhan pelanggan dan mitra laundry.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Jika Anda memiliki pertanyaan, saran, atau ingin bergabung sebagai mitra laundry, 
                jangan ragu untuk <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">menghubungi kami</a>.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


