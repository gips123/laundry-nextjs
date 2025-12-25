// Types untuk Laundry Marketplace

export interface Laundry {
  id: string;
  name: string;
  description: string;
  address: string;
  rating: number;
  reviewCount: number;
  image: string;
  priceRange: string;
  distance: number;
  isOpen: boolean;
  operatingHours: {
    open: string;
    close: string;
  };
  services: Service[];
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
}

