# LaundryHub - Laundry Marketplace MVP

Frontend User untuk aplikasi Laundry Marketplace dengan fokus pada UI/UX dan alur pemesanan.

## 🚀 Fitur

- ✅ Landing page marketplace laundry
- ✅ Halaman login & register user (UI only / dummy)
- ✅ List laundry dengan dummy data
- ✅ Detail laundry & layanan
- ✅ Flow pemesanan laundry (checkout)
- ✅ Halaman tracking status laundry (dummy status)
- ✅ Responsive design (mobile & desktop)

## 📁 Struktur Project

```
laundry-project/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout dengan Header & Footer
│   ├── page.tsx             # Landing page
│   ├── login/               # Halaman login
│   ├── register/            # Halaman register
│   ├── laundries/           # Halaman list & detail laundry
│   │   ├── page.tsx         # List semua laundry
│   │   └── [id]/page.tsx    # Detail laundry & pemilihan layanan
│   ├── checkout/            # Halaman checkout
│   └── orders/              # Halaman pesanan
│       ├── page.tsx         # List semua pesanan
│       └── [id]/page.tsx    # Tracking detail pesanan
├── components/              # Komponen reusable
│   ├── layout/              # Header, Footer
│   ├── ui/                  # Button, Card, Input
│   └── laundry/             # LaundryCard
├── lib/                     # Utilities & dummy data
│   ├── dummy-data.ts        # Data dummy untuk laundry, services, orders
│   └── utils.ts             # Helper functions
└── types/                   # TypeScript types
    └── index.ts             # Interface definitions
```

## 🛠️ Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **clsx & tailwind-merge** (untuk className utilities)

## 📦 Instalasi

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka [http://localhost:3000](http://localhost:3000) di browser

## 📝 Catatan Penting

⚠️ **Pengerjaan MASIH MENGGUNAKAN DUMMY DATA (mock data)**
- ❌ Belum terhubung ke backend / database
- ✅ Siap untuk integrasi backend di tahap selanjutnya (Go / PostgreSQL)
- ✅ Data disimpan sementara di `sessionStorage` untuk demo flow

## 🎨 Halaman yang Tersedia

1. **Landing Page** (`/`) - Hero section, fitur, dan laundry terpopuler
2. **Login** (`/login`) - Form login (UI only)
3. **Register** (`/register`) - Form registrasi (UI only)
4. **List Laundry** (`/laundries`) - Daftar semua laundry dengan search & filter
5. **Detail Laundry** (`/laundries/[id]`) - Detail laundry dan pemilihan layanan
6. **Checkout** (`/checkout`) - Form checkout dengan ringkasan pesanan
7. **List Orders** (`/orders`) - Daftar semua pesanan user
8. **Tracking Order** (`/orders/[id]`) - Detail tracking status pesanan

## 🔄 Flow Pemesanan

1. User melihat list laundry di `/laundries`
2. User klik laundry untuk melihat detail di `/laundries/[id]`
3. User memilih layanan dan quantity
4. User klik "Lanjutkan Pemesanan" → redirect ke `/checkout`
5. User isi form checkout (alamat, tanggal, catatan)
6. User klik "Buat Pesanan" → redirect ke `/orders/[id]` (tracking)
7. User bisa lihat semua pesanan di `/orders`

## 🎯 Next Steps untuk Integrasi Backend

1. Ganti dummy data dengan API calls
2. Implementasi authentication (JWT)
3. Connect ke database PostgreSQL
4. Implementasi payment gateway (opsional)
5. Real-time tracking updates (WebSocket)

## 📱 Responsive Design

Semua halaman sudah responsive dan dioptimalkan untuk:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

---

**Status**: ✅ Frontend User MVP selesai dan siap untuk testing & validasi
