import Link from 'next/link';
import Image from 'next/image';
import { Laundry } from '@/types';
import Card from '@/components/ui/Card';

// Star icon component (fallback if heroicons not installed)
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

interface LaundryCardProps {
  laundry: Laundry;
}

export default function LaundryCard({ laundry }: LaundryCardProps) {
  return (
    <Link href={`/laundries/${laundry.id}`}>
      <Card className="h-full">
        <div className="relative h-48 w-full">
          <Image
            src={laundry.image || laundry.image_url || '/placeholder-laundry.jpg'}
            alt={laundry.name}
            fill
            className="object-cover"
          />
          {!(laundry.isOpen !== undefined ? laundry.isOpen : laundry.is_open) && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              Tutup
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {laundry.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {laundry.description}
          </p>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900">
                {laundry.rating}
              </span>
              <span className="text-sm text-gray-500">
                ({(laundry.reviewCount || laundry.review_count || 0)})
              </span>
            </div>
            {laundry.distance !== null && laundry.distance !== undefined && (
              <span className="text-sm text-gray-500">
                {laundry.distance} km
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{laundry.address}</span>
            {(laundry.priceRange || laundry.price_range) && (
              <span className="font-medium text-blue-600">
                {laundry.priceRange || laundry.price_range}
              </span>
            )}
          </div>
          
          {(laundry.isOpen !== undefined ? laundry.isOpen : laundry.is_open) && (laundry.operatingHours || laundry.operating_hours) && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Buka: {(laundry.operatingHours || laundry.operating_hours)?.open} - {(laundry.operatingHours || laundry.operating_hours)?.close}
              </p>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}

