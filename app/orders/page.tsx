'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order } from '@/types';
import Card from '@/components/ui/Card';
import { formatCurrency, formatDate, getStatusLabel, getStatusColor } from '@/lib/utils';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load orders from sessionStorage (dummy - in real app, this would fetch from API)
    const stored = sessionStorage.getItem('orders');
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Pesanan Saya
          </h1>
          <Card>
            <div className="p-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Belum ada pesanan
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Mulai pesan laundry sekarang
              </p>
              <div className="mt-6">
                <Link href="/laundries">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Cari Laundry
                  </button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Pesanan Saya
        </h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order.id} href={`/orders/${order.id}`}>
              <Card className="hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {order.laundryName}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        Pesanan #{order.id.slice(-8).toUpperCase()}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-2">
                        {order.services.map((service, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {service.serviceName} ({service.quantity} {service.unit})
                          </span>
                        ))}
                      </div>
                      
                      <p className="text-xs text-gray-500">
                        Dibuat: {formatDate(order.createdAt)}
                      </p>
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:ml-4 text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        {formatCurrency(order.totalPrice)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {order.services.length} layanan
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

