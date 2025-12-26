'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Laundry, Service } from '@/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import { requireAuth, getCurrentUser } from '@/lib/auth';
import { laundryApi } from '@/lib/api';

// Star icon component (fallback if heroicons not installed)
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function LaundryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const laundryId = params?.id as string;
  
  const [laundry, setLaundry] = useState<Laundry | null>(null);
  const [selectedServices, setSelectedServices] = useState<Map<string, number>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLaundryDetail();
  }, [laundryId]);

  const fetchLaundryDetail = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const currentUser = getCurrentUser();
      const savedLocation = localStorage.getItem('userLocation');
      let lat: number | undefined;
      let lng: number | undefined;

      // Priority: savedLocation (from geolocation) > currentUser.location (from backend)
      // Jika tidak ada query params lat/lng, backend akan otomatis menggunakan location terbaru dari user profile
      if (savedLocation) {
        try {
          const location = JSON.parse(savedLocation);
          lat = location.lat;
          lng = location.lng;
        } catch (e) {
          // Invalid saved location
        }
      }

      if (!lat && currentUser?.latitude) {
        lat = currentUser.latitude;
        lng = currentUser.longitude;
      }

      // Jika ada lat/lng, kirim sebagai query params
      // Jika tidak ada, backend akan otomatis menggunakan location dari user profile
      const response = await laundryApi.getById(laundryId, { lat, lng });

      if (response.success && response.data) {
        // Normalize API response to match our types
        const normalizedLaundry: Laundry = {
          ...response.data,
          reviewCount: response.data.review_count || response.data.reviewCount,
          priceRange: response.data.price_range || response.data.priceRange,
          image: response.data.image_url || response.data.image,
          isOpen: response.data.is_open !== undefined ? response.data.is_open : response.data.isOpen,
          operatingHours: response.data.operating_hours || response.data.operatingHours,
        };
        setLaundry(normalizedLaundry);
      } else {
        setError(response.error || 'Laundry tidak ditemukan');
      }
    } catch (err: any) {
      setError('Terjadi kesalahan saat memuat data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Memuat...</p>
      </div>
    );
  }

  if (error || !laundry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{error || 'Laundry tidak ditemukan'}</h1>
          <Button onClick={() => router.push('/laundries')}>
            Kembali ke Daftar Laundry
          </Button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (serviceId: string, quantity: number) => {
    const newSelected = new Map(selectedServices);
    if (quantity <= 0) {
      newSelected.delete(serviceId);
    } else {
      newSelected.set(serviceId, quantity);
    }
    setSelectedServices(newSelected);
  };

  const calculateTotal = () => {
    let total = 0;
    selectedServices.forEach((quantity, serviceId) => {
      const service = laundry.services?.find((s) => s.id === serviceId);
      if (service) {
        total += service.price * quantity;
      }
    });
    return total;
  };

  const handleCheckout = () => {
    if (selectedServices.size === 0) {
      alert('Pilih minimal satu layanan');
      return;
    }

    // Store selected services in sessionStorage first (before checking auth)
    // This way, if user needs to login, the order data is preserved
    const orderData = {
      laundryId: laundry.id,
      laundryName: laundry.name,
      services: Array.from(selectedServices.entries()).map(([serviceId, quantity]) => {
        const service = laundry.services?.find((s) => s.id === serviceId);
        return {
          serviceId,
          serviceName: service?.name || '',
          quantity,
          price: service?.price || 0,
          unit: service?.unit || '',
        };
      }),
      totalPrice: calculateTotal(),
    };
    sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));

    // Check if user is authenticated
    if (!requireAuth('/checkout')) {
      return; // User will be redirected to login, and after login will go to checkout
    }

    // If authenticated, proceed to checkout
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          ← Kembali
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Laundry Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="relative h-64 w-full">
                <Image
                  src={laundry.image || laundry.image_url || '/placeholder-laundry.jpg'}
                  alt={laundry.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {laundry.name}
                    </h1>
                    <div className="flex items-center space-x-1 mb-2">
                      <StarIcon className="w-5 h-5 text-yellow-400" />
                      <span className="text-lg font-medium text-gray-900">
                        {laundry.rating}
                      </span>
                      <span className="text-gray-500">
                        ({(laundry.reviewCount || laundry.review_count || 0)} ulasan)
                      </span>
                    </div>
                  </div>
                  {!(laundry.isOpen !== undefined ? laundry.isOpen : laundry.is_open) && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
                      Tutup
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4">{laundry.description}</p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {laundry.address}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {(laundry.operatingHours || laundry.operating_hours)?.open} - {(laundry.operatingHours || laundry.operating_hours)?.close}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {laundry.distance} km dari lokasi Anda
                  </div>
                </div>
              </div>
            </Card>

            {/* Services */}
            <Card>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Layanan yang Tersedia
                </h2>
                <div className="space-y-4">
                  {laundry.services && laundry.services.length > 0 ? (
                    laundry.services.map((service) => {
                      const quantity = selectedServices.get(service.id) || 0;
                      return (
                        <div
                          key={service.id}
                          className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {service.name}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {service.description}
                              </p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <span>
                                  {formatCurrency(service.price)} / {service.unit}
                                </span>
                                <span>•</span>
                                <span>Estimasi: {service.estimatedTime} jam</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleQuantityChange(service.id, quantity - 1)}
                                disabled={quantity === 0}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-medium">
                                {quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(service.id, quantity + 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              >
                                +
                              </button>
                              <span className="text-sm text-gray-600 ml-2">
                                {service.unit}
                              </span>
                            </div>
                            {quantity > 0 && (
                              <span className="font-semibold text-blue-600">
                                {formatCurrency(service.price * quantity)}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-sm">Tidak ada layanan tersedia</p>
                  )}
                </div>
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
                
                {selectedServices.size === 0 ? (
                  <p className="text-gray-500 text-sm">
                    Pilih layanan untuk memesan
                  </p>
                ) : (
                  <div className="space-y-3 mb-4">
                    {Array.from(selectedServices.entries()).map(([serviceId, quantity]) => {
                      const service = laundry.services?.find((s) => s.id === serviceId);
                      if (!service) return null;
                      return (
                        <div key={serviceId} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {service.name} ({quantity} {service.unit})
                          </span>
                          <span className="font-medium">
                            {formatCurrency(service.price * quantity)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatCurrency(calculateTotal())}
                    </span>
                  </div>
                  
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={selectedServices.size === 0 || !(laundry.isOpen !== undefined ? laundry.isOpen : laundry.is_open) || !laundry.services || laundry.services.length === 0}
                  >
                    {!(laundry.isOpen !== undefined ? laundry.isOpen : laundry.is_open) ? 'Laundry Sedang Tutup' : 'Lanjutkan Pemesanan'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

