'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Order, OrderStatus } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatCurrency, formatDate, getStatusLabel, getStatusColor } from '@/lib/utils';

const statusSteps: OrderStatus[] = [
  'pending',
  'confirmed',
  'picked-up',
  'washing',
  'drying',
  'ironing',
  'ready',
  'delivered',
  'completed',
];

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Load order from sessionStorage (dummy - in real app, this would fetch from API)
    const stored = sessionStorage.getItem('orders');
    if (stored) {
      const orders: Order[] = JSON.parse(stored);
      const foundOrder = orders.find((o) => o.id === orderId);
      setOrder(foundOrder || null);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pesanan tidak ditemukan</h1>
          <Button onClick={() => router.push('/orders')}>
            Kembali ke Daftar Pesanan
          </Button>
        </div>
      </div>
    );
  }

  const currentStatusIndex = statusSteps.indexOf(order.status);
  const isCompleted = order.status === 'completed';
  const isCancelled = order.status === 'cancelled';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => router.push('/orders')}
          className="mb-6"
        >
          ← Kembali ke Daftar Pesanan
        </Button>

        <div className="space-y-6">
          {/* Order Header */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    Pesanan #{order.id.slice(-8).toUpperCase()}
                  </h1>
                  <p className="text-gray-600">{order.laundryName}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusLabel(order.status)}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Total Pembayaran</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(order.totalPrice)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tanggal Pesanan</p>
                  <p className="text-base font-medium text-gray-900">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Status Timeline */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Status Pesanan
              </h2>
              
              <div className="space-y-4">
                {statusSteps.map((status, index) => {
                  const isActive = index <= currentStatusIndex && !isCancelled;
                  const isCurrent = index === currentStatusIndex && !isCancelled;
                  
                  return (
                    <div key={status} className="flex items-start">
                      <div className="flex flex-col items-center mr-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isActive
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          {isActive ? (
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        {index < statusSteps.length - 1 && (
                          <div
                            className={`w-0.5 h-12 ${
                              isActive ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <h3
                          className={`font-medium ${
                            isActive ? 'text-gray-900' : 'text-gray-400'
                          }`}
                        >
                          {getStatusLabel(status)}
                        </h3>
                        {isCurrent && order.estimatedPickup && status === 'picked-up' && (
                          <p className="text-sm text-gray-500 mt-1">
                            Diambil pada: {formatDate(order.estimatedPickup)}
                          </p>
                        )}
                        {isCurrent && order.estimatedDelivery && status === 'delivered' && (
                          <p className="text-sm text-gray-500 mt-1">
                            Dikirim pada: {formatDate(order.estimatedDelivery)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Order Details */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Detail Pesanan
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Layanan</h3>
                  <div className="space-y-2">
                    {order.services.map((service, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {service.serviceName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {service.quantity} {service.unit}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(service.price * service.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      {formatCurrency(order.totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Ongkir</span>
                    <span className="font-medium text-green-600">Gratis</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-blue-600">
                        {formatCurrency(order.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Delivery Info */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Informasi Pengiriman
              </h2>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Alamat</p>
                  <p className="text-base text-gray-900">{order.address}</p>
                </div>
                {order.notes && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Catatan</p>
                    <p className="text-base text-gray-900">{order.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Actions */}
          {!isCompleted && !isCancelled && (
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
                    alert('Pesanan dibatalkan (Dummy - belum terhubung ke backend)');
                    router.push('/orders');
                  }
                }}
              >
                Batalkan Pesanan
              </Button>
              <Button
                variant="primary"
                onClick={() => router.push('/laundries')}
              >
                Pesan Lagi
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

