import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { X, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Service } from '../../types';
import { useUF } from '../../hooks/useUF';

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const [selectedPlan, setSelectedPlan] = useState<Service | null>(null);
  const [plans, setPlans] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, items } = useCart();
  const { ufValue, loading: ufLoading } = useUF();

  // Mapear categoryId a type
  const typeMap: Record<string, string> = {
    'basicos': 'basico',
    'estandar': 'medio',
    'premium': 'full'
  };
  const currentType = typeMap[categoryId || ''] || 'basico';

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then((data: Service[]) => {
        // Filtrar por el tipo de categoría actual
        const filteredPlans = data.filter(service => service.type === currentType);
        setPlans(filteredPlans);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching services:", err);
        setLoading(false);
      });
  }, [currentType]);

  // Formatear el título basado en la URL
  const title = categoryId === 'basicos' ? 'PLANES BÁSICOS' : 
                categoryId === 'estandar' ? 'PLANES ESTÁNDAR' : 
                categoryId === 'premium' ? 'PLANES PREMIUM' : 
                'PLANES';

  // Cálculos dinámicos basados en la UF
  const calculatedCLP = (selectedPlan && ufValue) ? Math.round(selectedPlan.priceUF * ufValue) : 0;
  const formattedCLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(calculatedCLP);
  
  const cuotaMortuoria = ufValue ? Math.round(15 * ufValue) : 0;
  const formattedCuota = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(cuotaMortuoria);

  const handleAddToCart = () => {
    if (!selectedPlan || !ufValue) return;
    
    const serviceToAdd: Service = {
      ...selectedPlan,
      priceCLP: calculatedCLP,
    };
    
    addToCart(serviceToAdd);
  };

  const inCart = selectedPlan 
    ? items.some(item => item.service.id === selectedPlan.id) 
    : false;

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Contenedor con efecto Glassmorphism */}
        <div className="relative rounded-[3rem] overflow-hidden min-h-[800px] p-8 md:p-16 shadow-xl border border-white/20">
          
          {/* Imagen de fondo */}
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop" 
            alt="Fondo" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          
          {/* Capa de desenfoque (Glass overlay) */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-xl"></div>
          
          {/* Contenido principal */}
          <div className="relative z-10">
            
            {/* Botón volver */}
            <Link to="/" className="inline-flex items-center text-stone-600 hover:text-[#1b7b3c] mb-8 transition-colors font-medium">
              &larr; Volver a Servicios
            </Link>

            <h1 className="text-4xl md:text-6xl font-serif text-center text-stone-600 tracking-[0.3em] mb-16 uppercase drop-shadow-sm">
              {title}
            </h1>

            {/* Grilla de Planes */}
            {loading ? (
              <div className="text-center py-12 text-stone-600">Cargando planes...</div>
            ) : plans.length === 0 ? (
              <div className="text-center py-12 text-stone-600">No hay planes disponibles en esta categoría por el momento.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {plans.map(plan => (
                  <div 
                    key={plan.id} 
                    onClick={() => setSelectedPlan(plan)}
                    className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-[#e5e5e5] transform hover:-translate-y-1 cursor-pointer flex flex-col"
                  >
                    {/* Imagen del plan */}
                    <div className="h-64 bg-white relative">
                      <img 
                        src={plan.imageUrl} 
                        alt={plan.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1544813545-4827b64fcacb?q=80&w=800&auto=format&fit=crop";
                        }}
                      />
                    </div>
                    
                    {/* Detalles del plan */}
                    <div className="p-6 text-center flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-stone-600 tracking-wider">{plan.title}</h3>
                        <p className="text-stone-500 mt-2 tracking-widest text-sm line-clamp-3">{plan.description}</p>
                      </div>
                      <p className="text-stone-500 italic text-sm mt-4 hover:text-[#1b7b3c] transition-colors font-medium">
                        Ver más &gt;&gt;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Modal de Detalle del Plan */}
      {selectedPlan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedPlan(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            {/* Botón Cerrar */}
            <button 
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-stone-500 hover:text-stone-800 transition-colors shadow-sm"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Parte Superior: Imagen + Info Básica */}
            <div className="flex flex-col md:flex-row">
              {/* Imagen Izquierda */}
              <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px] relative">
                <img 
                  src={selectedPlan.imageUrl} 
                  alt={selectedPlan.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1544813545-4827b64fcacb?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>
              
              {/* Info Derecha */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-stone-50">
                <h2 className="text-3xl font-serif font-bold text-[#1b7b3c] mb-4">
                  {selectedPlan.title}
                </h2>
                <div className="flex flex-col mb-6">
                  <span className="text-2xl font-bold text-stone-800">{selectedPlan.priceUF} UF</span>
                  <span className="text-lg text-stone-500">
                    {ufLoading ? 'Calculando valor...' : formattedCLP}
                  </span>
                </div>
                <p className="text-stone-600 leading-relaxed text-sm md:text-base mb-8">
                  {selectedPlan.description}
                </p>
                
                {/* Botón Agregar al Carrito (Parte Superior) */}
                <button
                  onClick={handleAddToCart}
                  disabled={ufLoading}
                  className={`w-full py-4 px-6 rounded-xl flex items-center justify-center font-bold text-lg transition-all shadow-md hover:shadow-lg ${
                    inCart 
                      ? 'bg-stone-200 text-stone-800 hover:bg-stone-300' 
                      : ufLoading
                        ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                        : 'bg-[#1b7b3c] text-white hover:bg-[#145c2d]'
                  }`}
                >
                  {inCart ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 mr-2" />
                      Agregado al Carro
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6 mr-2" />
                      {ufLoading ? 'Cargando...' : 'Agregar al Carro'}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Parte Inferior: "Otro Modal" (Caja de Detalles) */}
            <div className="p-6 md:p-10 bg-white">
              <div className="bg-[#e6f4ea] rounded-2xl p-8 md:p-10 border border-[#1b7b3c]/20 shadow-inner">
                <h3 className="text-xl font-bold text-[#1b7b3c] mb-6 border-b border-[#1b7b3c]/20 pb-4">
                  Detalle del {selectedPlan.title}
                </h3>
                
                <h4 className="font-bold text-stone-800 mb-4">Incluye:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-8">
                  {selectedPlan.includes?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start text-stone-700 text-sm">
                      <span className="text-[#1b7b3c] mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {(selectedPlan.note || selectedPlan.subNote) && (
                  <div className="bg-white/60 p-6 rounded-xl border border-[#1b7b3c]/10">
                    {selectedPlan.note && (
                      <p className="text-stone-800 font-medium text-sm mb-2">
                        {selectedPlan.note.includes('15 UF') && ufValue 
                          ? selectedPlan.note.replace('15 UF', formattedCuota) 
                          : selectedPlan.note}
                      </p>
                    )}
                    {selectedPlan.subNote && (
                      <p className="text-stone-500 italic text-xs">
                        {selectedPlan.subNote}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
