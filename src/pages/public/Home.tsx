import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Service } from '../../types';

export default function Home() {
  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then((data: Service[]) => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching services:", err);
        setLoading(false);
      });
  }, []);

  const getPriceRange = (type: string) => {
    if (loading) return "Cargando...";
    const categoryServices = services.filter(s => s.type === type && s.isActive);
    if (categoryServices.length === 0) return "Próximamente";
    
    const prices = categoryServices.map(s => s.priceUF);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    if (minPrice === maxPrice) {
      return `${minPrice} UF`;
    }
    return `Desde ${minPrice} UF Hasta ${maxPrice} UF`;
  };

  const categories = [
    { 
      id: 'basicos', 
      type: 'basico',
      title: 'PLANES BÁSICOS', 
      img: '/plan-basico.jpg' 
    },
    { 
      id: 'estandar', 
      type: 'medio',
      title: 'PLANES ESTÁNDAR', 
      img: '/plan-estandar.jpg' 
    },
    { 
      id: 'premium', 
      type: 'full',
      title: 'PLANES PREMIUM', 
      img: '/plan-premium.jpg' 
    },
  ];

  const allTestimonials = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    text: '"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation"',
    author: `Bastian Fajardo ${i + 1}`
  }));

  const testimonialPages = [];
  for (let i = 0; i < allTestimonials.length; i += 3) {
    testimonialPages.push(allTestimonials.slice(i, i + 3));
  }

  return (
    <div className="w-full bg-white">
      {/* Top Banner Image (Full Width) */}
      <div className="relative w-full h-[300px] md:h-[500px]">
        <img 
          src="/banner-home.jpg" 
          alt="Nuestros Servicios" 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1920&auto=format&fit=crop";
          }}
        />
        {/* Gradient Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <img 
            src="/logo.png" 
            alt="Logo Funeraria Castillo" 
            className="h-16 mx-auto mb-4 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          {/* Fallback temporal del logo */}
          <div className="hidden flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-[#1b7b3c] flex items-center justify-center">
              <span className="text-white font-serif font-bold text-2xl">C</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-serif text-[#1b7b3c] tracking-[0.3em] uppercase">
            Nuestros Servicios
          </h1>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-24">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/servicios/${cat.id}`} 
              className="block rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-[#e5e5e5] transform hover:-translate-y-1"
            >
              {/* Card Image */}
              <div className="h-64 bg-white relative">
                <img 
                  src={cat.img} 
                  alt={cat.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback a imagen de prueba si aún no se sube el archivo
                    e.currentTarget.src = "https://images.unsplash.com/photo-1544813545-4827b64fcacb?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>
              
              {/* Card Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-stone-600 tracking-wider mb-2">{cat.title}</h3>
                <p className="text-stone-500">{getPriceRange(cat.type)}</p>
                <p className="text-stone-500 italic text-sm mt-4 hover:text-[#1b7b3c] transition-colors">
                  Ver más&gt;&gt;
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1b7b3c] tracking-[0.3em] uppercase">
              Nuestros Clientes
            </h2>
          </div>
          
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonialPage * 100}%)` }}
            >
              {testimonialPages.map((page, pageIndex) => (
                <div key={pageIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {page.map((testimonial) => (
                      <div key={testimonial.id} className="bg-[#e6f4ea] rounded-3xl p-8 text-center shadow-sm flex flex-col justify-between h-full">
                        <p className="text-stone-600 italic mb-8 text-sm md:text-base leading-relaxed">
                          {testimonial.text}
                        </p>
                        <p className="text-stone-800 font-bold">
                          {testimonial.author}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center space-x-3 mt-10">
            {testimonialPages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonialPage(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentTestimonialPage ? 'bg-stone-600' : 'bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Ver página ${index + 1} de testimonios`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
