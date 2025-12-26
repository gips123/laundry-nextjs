'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { setAuth } from '@/lib/auth';
import { authApi } from '@/lib/api';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email) {
      newErrors.email = 'Email harus diisi';
    }
    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await authApi.login(formData.email, formData.password);
      
      if (!response.success || !response.data) {
        setErrors({
          email: response.error || 'Email atau password salah',
          password: response.error || 'Email atau password salah',
        });
        return;
      }

      // Set auth
      setAuth(response.data.user, response.data.token);
      
      // Save location to localStorage if available in user profile
      // Location dari backend akan otomatis digunakan untuk distance calculation
      if (response.data.user.latitude && response.data.user.longitude) {
        localStorage.setItem('userLocation', JSON.stringify({
          lat: response.data.user.latitude,
          lng: response.data.user.longitude,
        }));
      }
      
      // Get return URL from query params or default to laundries
      const returnUrl = searchParams?.get('returnUrl') || '/laundries';
      
      router.push(returnUrl);
    } catch (error: any) {
      setErrors({
        email: 'Terjadi kesalahan. Silakan coba lagi.',
        password: 'Terjadi kesalahan. Silakan coba lagi.',
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
            Masuk ke Akun Anda
          </h2>
          {searchParams?.get('returnUrl') && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 text-center">
                Anda perlu masuk untuk melanjutkan pemesanan
              </p>
            </div>
          )}
          <p className="mt-2 text-center text-sm text-gray-600">
            Atau{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              daftar akun baru
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Ingat saya
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Lupa password?
              </Link>
            </div>
          </div>

          <div>
            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500">Memuat...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}


