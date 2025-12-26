'use client';

import { useState, useEffect } from 'react';
import LaundryCard from '@/components/laundry/LaundryCard';
import Input from '@/components/ui/Input';
import { getCurrentLocation } from '@/lib/geolocation';
import Button from '@/components/ui/Button';
import { laundryApi, authApi } from '@/lib/api';
import { getCurrentUser, getToken, updateUserLocation } from '@/lib/auth';
import { Laundry } from '@/types';
import { MapPin, RefreshCw } from 'lucide-react';

export default function LaundriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [laundries, setLaundries] = useState<Laundry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try to get location from localStorage first
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      try {
        const location = JSON.parse(savedLocation);
        setUserLocation(location);
      } catch (e) {
        // Invalid saved location, try to get new location
        requestLocation();
      }
    } else {
      // No saved location, automatically request location
      requestLocation();
    }
  }, []);

  useEffect(() => {
    fetchLaundries();
  }, [searchQuery, filterOpen, userLocation]);

  const fetchLaundries = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const currentUser = getCurrentUser();
      // Priority: userLocation (from geolocation) > currentUser.location (from backend)
      // Jika tidak ada query params lat/lng, backend akan otomatis menggunakan location terbaru dari user profile
      const lat = userLocation?.lat || currentUser?.latitude;
      const lng = userLocation?.lng || currentUser?.longitude;

      const response = await laundryApi.getAll({
        search: searchQuery || undefined,
        is_open: filterOpen || undefined,
        // Jika ada lat/lng, kirim sebagai query params
        // Jika tidak ada, backend akan otomatis menggunakan location dari user profile
        lat: lat,
        lng: lng,
        sort_by: lat && lng ? 'distance' : 'rating',
        page: 1,
        limit: 20,
      });

      if (response.success && response.data) {
        setLaundries(response.data.laundries);
      } else {
        setError(response.error || 'Gagal memuat data laundry');
      }
    } catch (err: any) {
      setError('Terjadi kesalahan saat memuat data');
    } finally {
      setIsLoading(false);
    }
  };

  const requestLocation = async () => {
    setIsGettingLocation(true);
    setLocationError(null);
    try {
      const location = await getCurrentLocation();
      const locationData = {
        lat: location.latitude,
        lng: location.longitude,
      };
      setUserLocation(locationData);
      localStorage.setItem('userLocation', JSON.stringify(locationData));
      
      // Update user location to backend if user is logged in
      // Bisa dipanggil berkali-kali untuk update lokasi (rumah, kosan, kampus, dll)
      const token = getToken();
      if (token) {
        try {
          const response = await authApi.updateLocation(locationData.lat, locationData.lng);
          if (response.success && response.data) {
            // Update user profile dengan location terbaru
            updateUserLocation(response.data.latitude, response.data.longitude);
            // Location akan otomatis digunakan untuk distance calculation di endpoint laundries
          }
        } catch (err) {
          // Silent fail - location still saved to localStorage
          console.error('Failed to update location to backend:', err);
        }
      }
    } catch (error: any) {
      // Don't show error if user denied permission, just silently fail
      if (error.code !== 1) { // 1 = PERMISSION_DENIED
        setLocationError(error.message || 'Gagal mendapatkan lokasi');
      }
    } finally {
      setIsGettingLocation(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Cari Laundry Terdekat
          </h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Cari nama laundry atau lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="filter-open"
                  checked={filterOpen}
                  onChange={(e) => setFilterOpen(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="filter-open" className="text-sm text-gray-700">
                  Hanya yang buka
                </label>
              </div>
              {isGettingLocation && (
                <div className="flex items-center space-x-2 text-sm text-blue-600">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Mendapatkan lokasi...</span>
                </div>
              )}
              {userLocation && !isGettingLocation && (
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <MapPin className="w-5 h-5" />
                  <span>Lokasi aktif</span>
                  <button
                    onClick={() => {
                      setUserLocation(null);
                      localStorage.removeItem('userLocation');
                      // Request location again after removing
                      requestLocation();
                    }}
                    className="text-red-500 hover:text-red-700 ml-1"
                    title="Refresh lokasi"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              )}
              {!userLocation && !isGettingLocation && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={requestLocation}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Gunakan Lokasi Saya
                </Button>
              )}
            </div>
          </div>
          {locationError && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{locationError}</p>
            </div>
          )}
          {userLocation && (
            <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Menampilkan laundry berdasarkan jarak dari lokasi Anda</span>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Memuat data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
            <Button onClick={fetchLaundries} variant="outline" className="mt-4">
              Coba Lagi
            </Button>
          </div>
        ) : laundries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Tidak ada laundry yang ditemukan
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {laundries.map((laundry) => (
              <LaundryCard key={laundry.id} laundry={laundry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


