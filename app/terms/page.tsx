import Card from '@/components/ui/Card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Syarat & Ketentuan
          </h1>
          <p className="text-xl text-gray-600">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <Card>
          <div className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Penerimaan Syarat
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Dengan menggunakan layanan LaundryHub, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini. 
                Jika Anda tidak setuju dengan syarat dan ketentuan ini, mohon untuk tidak menggunakan layanan kami.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Penggunaan Layanan
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Layanan LaundryHub menghubungkan Anda dengan mitra laundry terverifikasi. Kami bertindak sebagai 
                platform marketplace dan tidak bertanggung jawab langsung atas kualitas layanan yang diberikan oleh 
                mitra laundry.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Pembayaran
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Pembayaran dilakukan sesuai dengan harga yang ditetapkan oleh mitra laundry. LaundryHub dapat 
                memfasilitasi proses pembayaran, namun transaksi sebenarnya terjadi antara Anda dan mitra laundry.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Tanggung Jawab
              </h2>
              <p className="text-gray-700 leading-relaxed">
                LaundryHub tidak bertanggung jawab atas kerusakan, kehilangan, atau masalah lain yang terjadi 
                pada pakaian Anda. Setiap keluhan atau masalah harus diselesaikan langsung dengan mitra laundry 
                yang menangani pesanan Anda.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Pembatalan Pesanan
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Pembatalan pesanan dapat dilakukan sebelum pakaian diambil oleh mitra laundry. Setelah pakaian 
                diambil, pembatalan akan dikenakan biaya sesuai kebijakan mitra laundry.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Privasi
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Kami menghormati privasi Anda. Informasi pribadi yang Anda berikan akan digunakan sesuai dengan 
                kebijakan privasi kami dan hanya untuk keperluan penyediaan layanan.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Perubahan Syarat
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Kami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan akan diberitahukan melalui 
                website atau email. Penggunaan layanan setelah perubahan berarti Anda menyetujui syarat dan 
                ketentuan yang baru.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
}

