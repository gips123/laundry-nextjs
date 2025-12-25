'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { dummyLaundries } from '@/lib/dummy-data';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';

interface PendingOrder {
  laundryId: string;
  laundryName: string;
  services: Array<{
    serviceId: string;
    serviceName: string;
    quantity: number;
    price: number;
    unit: string;
  }>;
  totalPrice: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [pendingOrder, setPendingOrder] = useState<PendingOrder | null>(null);
  const [formData, setFormData] = useState({
    address: '',
    notes: '',
    pickupDate: '',
    pickupTime: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = sessionStorage.getItem('pendingOrder');
    if (stored) {
      setPendingOrder(JSON.parse(stored));
    } else {
      router.push('/laundries');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!formData.address) {
      newErrors.address = 'Alamat harus diisi';
    }
    if (!formData.pickupDate) {
      newErrors.pickupDate = 'Tanggal pengambilan harus diisi';
    }
    if (!formData.pickupTime) {
      newErrors.pickupTime = 'Waktu pengambilan harus diisi';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!pendingOrder) return;

    // Create order (dummy - in real app, this would call API)
    const orderId = `order-${Date.now()}`;
    const order = {
      id: orderId,
      ...pendingOrder,
      address: formData.address,
      notes: formData.notes,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    // Store order (dummy - in real app, this would be saved to backend)
    const existingOrders = JSON.parse(sessionStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    sessionStorage.setItem('orders', JSON.stringify(existingOrders));
    sessionStorage.removeItem('pendingOrder');

    alert('Pesanan berhasil dibuat! (Dummy - belum terhubung ke backend)');
    router.push(`/orders/${orderId}`);
  };

  if (!pendingOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Memuat...</p>
      </div>
    );
  }

  const laundry = dummyLaundries.find((l) => l.id === pendingOrder.laundryId);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Informasi Pengiriman
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Alamat Pengambilan & Pengiriman"
                    type="text"
                    placeholder="Masukkan alamat lengkap"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    error={errors.address}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Tanggal Pengambilan"
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                      error={errors.pickupDate}
                      required
                    />
                    <Input
                      label="Waktu Pengambilan"
                      type="time"
                      value={formData.pickupTime}
                      onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                      error={errors.pickupTime}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Catatan (Opsional)
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Contoh: Hati-hati dengan pakaian putih, jangan dicampur dengan warna lain"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" variant="primary" size="lg" className="w-full">
                      Buat Pesanan
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Ringkasan Pesanan
                </h2>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Laundry</p>
                  <p className="font-semibold text-gray-900">{pendingOrder.laundryName}</p>
                  {laundry && (
                    <p className="text-xs text-gray-500 mt-1">
                      {laundry.address}
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Layanan</p>
                  <div className="space-y-2">
                    {pendingOrder.services.map((service, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {service.serviceName} ({service.quantity} {service.unit})
                        </span>
                        <span className="font-medium">
                          {formatCurrency(service.price * service.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      {formatCurrency(pendingOrder.totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Ongkir</span>
                    <span className="font-medium text-green-600">Gratis</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-blue-600">
                        {formatCurrency(pendingOrder.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

