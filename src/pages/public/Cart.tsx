import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart, totalCLP, totalUF, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const formatCLP = (amount: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simular proceso de pago
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          totalCLP,
          totalUF,
          customerName: 'Cliente Demo',
          customerEmail: 'demo@ejemplo.com',
          customerPhone: '+56912345678'
        }),
      });

      if (response.ok) {
        clearCart();
        alert('¡Pago simulado con éxito! En una etapa posterior, aquí se integrará Webpay u otra pasarela de pagos.');
        navigate('/');
      }
    } catch (error) {
      console.error('Error al procesar el pago', error);
      alert('Hubo un error al procesar el pago.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Su carro está vacío</h2>
        <p className="text-stone-600 mb-8">No ha seleccionado ningún servicio funerario.</p>
        <Link to="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-stone-900 hover:bg-stone-800">
          Ver Servicios
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8">Resumen de Contratación</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Lista de items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.service.id} className="flex flex-col sm:flex-row bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
              <div className="sm:w-32 sm:h-32 rounded-xl overflow-hidden mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                <img 
                  src={item.service.imageUrl} 
                  alt={item.service.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-stone-900">{item.service.title}</h3>
                    <button 
                      onClick={() => removeFromCart(item.service.id)}
                      className="text-stone-400 hover:text-red-500 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-stone-500 mt-1">Plan {item.service.type}</p>
                </div>
                <div className="mt-4 flex justify-between items-end">
                  <div className="text-sm text-stone-600">
                    Cantidad: <span className="font-medium">{item.quantity}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-stone-500">{item.service.priceUF * item.quantity} UF</div>
                    <div className="text-lg font-bold text-stone-900">{formatCLP(item.service.priceCLP * item.quantity)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen de pago */}
        <div className="lg:col-span-1">
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 sticky top-24">
            <h3 className="text-lg font-bold text-stone-900 mb-6">Total a Pagar</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({items.length} items)</span>
                <span>{formatCLP(totalCLP)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Equivalente en UF</span>
                <span>{totalUF} UF</span>
              </div>
              <div className="border-t border-stone-200 pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-stone-900">Total</span>
                <span className="text-2xl font-bold text-stone-900">{formatCLP(totalCLP)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full py-4 px-4 rounded-xl bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors flex items-center justify-center disabled:opacity-70"
            >
              {isProcessing ? 'Procesando...' : (
                <>
                  Pagar Servicio <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>

            <div className="mt-6 flex items-center justify-center text-sm text-stone-500">
              <ShieldCheck className="w-4 h-4 mr-2 text-green-600" />
              Pago seguro y encriptado
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
