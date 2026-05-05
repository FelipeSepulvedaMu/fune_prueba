import React, { useState, useEffect } from 'react';

export default function Sepulturas() {
  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Generar testimonios de prueba
  const allTestimonials = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    text: '"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation"',
    author: `Bastian Fajardo ${i + 1}`
  }));

  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(allTestimonials.length / testimonialsPerPage);

  // Imágenes para el carrusel
  const images = [
    "/sepultura-1.jpg",
    "/sepultura-2.jpg",
    "/sepultura-3.jpg",
    "/sepultura-4.jpg"
  ];

  // Auto-rotar imágenes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="w-full bg-white">
      {/* Top Banner Image */}
      <div className="w-full h-[400px] md:h-[500px] relative">
        <img 
          src="/banner-sepulturas.jpg" 
          alt="Parque Cementerio" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1920&auto=format&fit=crop";
          }}
        />
        {/* Gradient Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </div>

      {/* Main Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl md:text-5xl font-serif text-[#009944] tracking-[0.2em] uppercase">
          Venta de Sepulturas
        </h1>
      </div>

      {/* Content Section (Text + Form + Image Carousel) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column: Info & Form */}
          <div className="space-y-8">
            {/* Info Box */}
            <div>
              <div className="bg-[#009944] text-white font-bold px-6 py-3 rounded-t-xl rounded-br-xl rounded-bl-sm inline-block mb-6">
                ¿En qué consiste el Servicio de Sepultura
              </div>
              <div className="text-stone-700 text-sm leading-relaxed text-justify relative">
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                </p>
                {/* Plus icon at bottom right of text */}
                <div className="absolute -bottom-6 right-0 text-[#009944] cursor-pointer hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="pt-8">
              <h3 className="text-[#009944] font-bold text-xl mb-6 uppercase tracking-wide">
                Cotiza con nosotros
              </h3>
              <form className="space-y-4 max-w-md">
                <div>
                  <input 
                    type="text" 
                    placeholder="Nombres y Apellidos*" 
                    className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#009944] focus:border-[#009944] text-sm"
                    required
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Teléfono*" 
                    className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#009944] focus:border-[#009944] text-sm"
                    required
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email*" 
                    className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#009944] focus:border-[#009944] text-sm"
                    required
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Mensaje (opcional)" 
                    rows={4}
                    className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#009944] focus:border-[#009944] text-sm resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="bg-[#009944] hover:bg-[#007a36] text-white font-bold py-3 px-8 rounded-md transition-colors uppercase tracking-wider text-sm"
                >
                  Cotiza Aquí
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Image Carousel */}
          <div className="relative h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-xl">
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img 
                  src={img} 
                  alt={`Atención a clientes ${index + 1}`} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>
            ))}
            
            {/* Image Carousel Dots */}
            <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-stone-800' : 'bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Ver imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-[#e6e6e6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif text-[#009944] text-center tracking-[0.2em] uppercase mb-12">
            Nuestros Clientes
          </h2>
          
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonialPage * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div key={pageIndex} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {allTestimonials
                    .slice(pageIndex * testimonialsPerPage, (pageIndex + 1) * testimonialsPerPage)
                    .map((testimonial) => (
                    <div key={testimonial.id} className="bg-[#cce6d6] p-8 rounded-2xl shadow-sm flex flex-col justify-between min-h-[250px]">
                      <p className="text-stone-600 text-sm italic text-center leading-relaxed">
                        {testimonial.text}
                      </p>
                      <p className="text-stone-800 font-bold text-center mt-6 text-sm">
                        {testimonial.author}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Pagination Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonialPage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentTestimonialPage ? 'bg-stone-800' : 'bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Ir a página ${index + 1} de testimonios`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
