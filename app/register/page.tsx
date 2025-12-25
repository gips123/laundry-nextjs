'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dummy validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) {
      newErrors.name = 'Nama harus diisi';
    }
    if (!formData.email) {
      newErrors.email = 'Email harus diisi';
    }
    if (!formData.phone) {
      newErrors.phone = 'Nomor telepon harus diisi';
    }
    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    if (!formData.address) {
      newErrors.address = 'Alamat harus diisi';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Dummy registration - in real app, this would call API
    console.log('Registration attempt:', formData);
    // Simulate successful registration
    alert('Registrasi berhasil! (Dummy - belum terhubung ke backend)');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Daftar Akun Baru
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Masuk di sini
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Nama Lengkap"
              type="text"
              placeholder="Nama lengkap Anda"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />
            
            <Input
              label="Email"
              type="email"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />
            
            <Input
              label="Nomor Telepon"
              type="tel"
              placeholder="081234567890"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              error={errors.phone}
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="Minimal 8 karakter"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
            />
            
            <Input
              label="Konfirmasi Password"
              type="password"
              placeholder="Ulangi password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
            />
            
            <Input
              label="Alamat"
              type="text"
              placeholder="Alamat lengkap Anda"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              error={errors.address}
            />
          </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
              Saya setuju dengan{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                Syarat & Ketentuan
              </Link>
            </label>
          </div>

          <div>
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Daftar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

