export interface Service {
  id: string;
  title: string;
  description: string;
  type: 'basico' | 'medio' | 'full';
  priceUF: number;
  priceCLP: number;
  imageUrl: string;
  isActive: boolean;
  includes?: string[];
  note?: string;
  subNote?: string;
}

export interface OrderItem {
  service: Service;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  totalUF: number;
  totalCLP: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'paid' | 'pending';
}
