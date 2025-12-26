# LaundryHub - Laundry Marketplace MVP

Frontend User untuk aplikasi Laundry Marketplace dengan fokus pada UI/UX dan alur pemesanan.

## 🚀 Fitur

- ✅ Landing page marketplace laundry
- ✅ Halaman login & register user dengan backend API
- ✅ List laundry dengan search, filter, dan sorting
- ✅ Detail laundry & layanan dengan distance calculation
- ✅ Flow pemesanan laundry (checkout)
- ✅ Halaman tracking status pesanan
- ✅ Responsive design (mobile & desktop)
- ✅ Auto-detect location dan update ke backend

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
├── lib/                     # Utilities
│   ├── api.ts              # API client (Axios)
│   ├── auth.ts             # Authentication utilities
│   ├── geolocation.ts       # Geolocation utilities
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

2. Setup environment variables:
```bash
# Copy env.example ke .env.local
cp env.example .env.local

# Edit .env.local dan sesuaikan dengan konfigurasi backend Anda
# NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka [http://localhost:3000](http://localhost:3000) di browser

## 📝 Catatan Penting

✅ **Frontend sudah terintegrasi dengan Backend API!**
- ✅ Terhubung ke backend Go / PostgreSQL
- ✅ Semua data fetch dari API (bukan dummy data)
- ✅ Authentication menggunakan JWT token
- ✅ Location auto-detect dan update ke backend

**Setup Environment Variables:**
1. Copy `env.example` ke `.env.local`
2. Edit `.env.local` dan set `NEXT_PUBLIC_API_URL` sesuai backend Anda:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
   ```
3. Pastikan backend running di URL yang sesuai
4. Lihat `API_INTEGRATION.md` untuk detail lengkap

**⚠️ Important:** Semua credentials dan API URLs harus diset melalui environment variables, tidak boleh hardcoded di code.

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

## 📚 Dokumentasi

- `API_INTEGRATION.md` - Dokumentasi integrasi frontend dengan backend API
- `API_DOCUMENTATION.md` - Dokumentasi lengkap backend API endpoints

## 📱 Responsive Design

Semua halaman sudah responsive dan dioptimalkan untuk:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

---

**Status**: ✅ Frontend User MVP selesai dan siap untuk testing & validasi
