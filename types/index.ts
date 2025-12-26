// Types untuk Laundry Marketplace

export interface Laundry {
  id: string;
  name: string;
  description?: string;
  address: string;
  rating: number;
  review_count?: number;
  reviewCount?: number; // For backward compatibility
  image?: string;
  image_url?: string; // API might use this
  price_range?: string;
  priceRange?: string; // For backward compatibility
  distance?: number | null;
  is_open?: boolean;
  isOpen?: boolean; // For backward compatibility
  operating_hours?: {
    open: string;
    close: string;
  };
  operatingHours?: { // For backward compatibility
    open: string;
    close: string;
  };
  services?: Service[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string; // 'kg', 'pcs', 'set'
  estimatedTime: number; // dalam jam
  category: 'regular' | 'express' | 'dry-clean' | 'ironing';
}

export interface Order {
  id: string;
  laundryId: string;
  laundryName: string;
  services: OrderService[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  estimatedPickup?: string;
  estimatedDelivery?: string;
  address: string;
  notes?: string;
}

export interface OrderService {
  serviceId: string;
  serviceName: string;
  quantity: number;
  price: number;
  unit: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'picked-up'
  | 'washing'
  | 'drying'
  | 'ironing'
  | 'ready'
  | 'delivered'
  | 'completed'
  | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  latitude?: number;
  longitude?: number;
}


