import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Layouts
import PublicLayout from './pages/public/PublicLayout';
import AdminLayout from './pages/admin/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import Cart from './pages/public/Cart';
import Trayectoria from './pages/public/Trayectoria';
import Cremacion from './pages/public/Cremacion';
import Sepulturas from './pages/public/Sepulturas';
import Contacto from './pages/public/Contacto';
import CategoryDetail from './pages/public/CategoryDetail';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ServicesManager from './pages/admin/ServicesManager';
import OrdersManager from './pages/admin/OrdersManager';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Trayectoria />} />
            <Route path="servicios" element={<Home />} />
            <Route path="carrito" element={<Cart />} />
            <Route path="trayectoria" element={<Trayectoria />} />
            <Route path="cremacion" element={<Cremacion />} />
            <Route path="sepulturas" element={<Sepulturas />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="servicios/:categoryId" element={<CategoryDetail />} />
          </Route>

          {/* Admin Login Route */}
          <Route path="/login-admin" element={<AdminLogin />} />

          {/* Admin Routes (Protected) */}
          <Route path="/administracion/castillo/funeraria" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="servicios" element={<ServicesManager />} />
            <Route path="pagos" element={<OrdersManager />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
