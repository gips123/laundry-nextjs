'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email harus diisi');
      return;
    }

    // TODO: Implement API call untuk reset password
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Lupa Password?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
            </p>

            {isSubmitted ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">
                  Link reset password telah dikirim ke email Anda. Silakan cek inbox atau spam folder.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                />

                <div>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-full"
                  >
                    Kirim Link Reset
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 text-center">
              <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
                Kembali ke halaman login
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

