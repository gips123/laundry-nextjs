'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { setAuth } from '@/lib/auth';
import { authApi } from '@/lib/api';

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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
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
    if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
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

    setIsLoading(true);
    setErrors({});

    try {
      const response = await authApi.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        role: 'customer',
      });

      if (!response.success || !response.data) {
        setErrors({
          email: response.error || 'Registrasi gagal. Silakan coba lagi.',
        });
        return;
      }

      // Set auth (auto login after registration)
      setAuth(response.data.user, response.data.token);
      
      // Save location to localStorage if available in user profile
      // Location akan diambil otomatis saat user mengakses web (di halaman laundries)
      if (response.data.user.latitude && response.data.user.longitude) {
        localStorage.setItem('userLocation', JSON.stringify({
          lat: response.data.user.latitude,
          lng: response.data.user.longitude,
        }));
      }
      
      router.push('/laundries');
    } catch (error: any) {
      setErrors({
        email: 'Terjadi kesalahan. Silakan coba lagi.',
      });
    } finally {
      setIsLoading(false);
    }
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
            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Mendaftar...' : 'Daftar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}


