'use client';

import { useState } from 'react';
import { dummyLaundries } from '@/lib/dummy-data';
import LaundryCard from '@/components/laundry/LaundryCard';
import Input from '@/components/ui/Input';

export default function LaundriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredLaundries = dummyLaundries.filter((laundry) => {
    const matchesSearch = 
      laundry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      laundry.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterOpen || laundry.isOpen;
    return matchesSearch && matchesFilter;
  });

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
          </div>
        </div>

        {filteredLaundries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Tidak ada laundry yang ditemukan
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLaundries.map((laundry) => (
              <LaundryCard key={laundry.id} laundry={laundry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

