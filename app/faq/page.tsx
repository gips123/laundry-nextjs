import Card from '@/components/ui/Card';

export default function FAQPage() {
  const faqs = [
    {
      question: 'Bagaimana cara memesan layanan laundry?',
      answer: 'Pilih laundry terdekat, pilih layanan yang diinginkan, isi detail pesanan, dan konfirmasi. Tim laundry akan mengambil pakaian Anda sesuai jadwal yang ditentukan.',
    },
    {
      question: 'Apakah ada biaya pengambilan dan pengantaran?',
      answer: 'Tidak, layanan pick-up dan delivery gratis untuk semua pesanan.',
    },
    {
      question: 'Berapa lama waktu pengerjaan?',
      answer: 'Waktu pengerjaan bervariasi tergantung jenis layanan. Cuci reguler biasanya 24-48 jam, sedangkan layanan express dapat selesai dalam 6 jam.',
    },
    {
      question: 'Bagaimana cara membatalkan pesanan?',
      answer: 'Anda dapat membatalkan pesanan melalui halaman detail pesanan sebelum pakaian diambil. Setelah diambil, pembatalan akan dikenakan biaya sesuai kebijakan laundry.',
    },
    {
      question: 'Bagaimana jika pakaian rusak atau hilang?',
      answer: 'Hubungi langsung mitra laundry yang menangani pesanan Anda. Setiap laundry memiliki kebijakan sendiri untuk menangani masalah ini.',
    },
    {
      question: 'Apakah saya bisa memilih jadwal pengambilan?',
      answer: 'Ya, Anda dapat memilih tanggal dan waktu pengambilan yang diinginkan saat checkout.',
    },
    {
      question: 'Bagaimana cara melacak status pesanan?',
      answer: 'Anda dapat melihat status pesanan di halaman "Pesanan Saya" atau melalui halaman detail pesanan.',
    },
    {
      question: 'Metode pembayaran apa saja yang diterima?',
      answer: 'Metode pembayaran dapat bervariasi tergantung mitra laundry. Biasanya meliputi transfer bank, e-wallet, atau tunai saat pengantaran.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-xl text-gray-600">
            Temukan jawaban untuk pertanyaan umum
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

