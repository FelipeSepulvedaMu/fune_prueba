import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Receipt, TrendingUp, Users } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalServices: 0,
    activeServices: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // Fetch data for dashboard
    Promise.all([
      fetch('/api/admin/services').then(res => res.json()),
      fetch('/api/admin/orders').then(res => res.json())
    ]).then(([services, orders]) => {
      setStats({
        totalServices: services.length,
        activeServices: services.filter((s: any) => s.isActive).length,
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum: number, order: any) => sum + order.totalCLP, 0)
      });
    });
  }, []);

  const formatCLP = (amount: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
  };

  const statCards = [
    { title: 'Ingresos Totales', value: formatCLP(stats.totalRevenue), icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Órdenes Pagadas', value: stats.totalOrders, icon: Receipt, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Servicios Activos', value: `${stats.activeServices} / ${stats.totalServices}`, icon: Package, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Clientes (Demo)', value: stats.totalOrders, icon: Users, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Accesos Rápidos</h3>
          </div>
          <div className="space-y-4">
            <Link to="/administracion/castillo/funeraria/servicios" className="block p-4 rounded-lg border border-gray-200 hover:border-slate-800 hover:bg-slate-50 transition-colors">
              <div className="flex items-center">
                <Package className="w-5 h-5 text-slate-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Gestionar Servicios</h4>
                  <p className="text-sm text-gray-500">Crear, editar o desactivar planes funerarios.</p>
                </div>
              </div>
            </Link>
            <Link to="/administracion/castillo/funeraria/pagos" className="block p-4 rounded-lg border border-gray-200 hover:border-slate-800 hover:bg-slate-50 transition-colors">
              <div className="flex items-center">
                <Receipt className="w-5 h-5 text-slate-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Ver Órdenes y Pagos</h4>
                  <p className="text-sm text-gray-500">Revisar el historial de contrataciones.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
