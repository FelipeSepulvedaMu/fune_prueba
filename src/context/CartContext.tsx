import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Service, OrderItem } from '../types';

interface CartContextType {
  items: OrderItem[];
  addToCart: (service: Service) => void;
  removeFromCart: (serviceId: string) => void;
  clearCart: () => void;
  totalCLP: number;
  totalUF: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<OrderItem[]>([]);

  const addToCart = (service: Service) => {
    setItems(prev => {
      const existing = prev.find(item => item.service.id === service.id);
      if (existing) {
        return prev.map(item => 
          item.service.id === service.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { service, quantity: 1 }];
    });
  };

  const removeFromCart = (serviceId: string) => {
    setItems(prev => prev.filter(item => item.service.id !== serviceId));
  };

  const clearCart = () => setItems([]);

  const totalCLP = items.reduce((sum, item) => sum + (item.service.priceCLP * item.quantity), 0);
  const totalUF = items.reduce((sum, item) => sum + (item.service.priceUF * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalCLP, totalUF }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
