import React, { useState, useEffect } from 'react';

export default function Cremacion() {
  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(0);

  const allTestimonials = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    text: '"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation"',
    author: `Bastian Fajardo ${i + 1}`
  }));

  const testimonialPages = [];
  for (let i = 0; i < allTestimonials.length; i += 3) {
    testimonialPages.push(allTestimonials.slice(i, i + 3));
  }

  const urnImages = [
    "/urna-cremacion.jpg",
    "/urna-cremacion-2.jpg",
    "/urna-cremacion-3.jpg",
    "/urna-cremacion-4.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % urnImages.length);
    }, 4000); // Cambia de imagen cada 4 segundos
    return () => clearInterval(timer);
  }, [urnImages.length]);

  return (
    <div className="w-full bg-white font-sans">
      {/* Banner Section */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <img 
          src="/banner-cremacion.jpg" 
          alt="Cremación" 
          className="absolute inset-0 w-full h-full object-cover" 
          onError={(e) => { 
            e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"; 
          }} 
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-lg">
              <div className="bg-[#009944] text-white font-bold px-4 py-2 inline-block mb-4 rounded-sm text-lg md:text-xl uppercase">
                Asesorate con nosotros
              </div>
              <p className="text-white text-lg md:text-xl font-medium leading-relaxed drop-shadow-md">
                Nuestro servicio de cremación ofrece una alternativa respetuosa y moderna para la disposición final, incluyendo la gestión documental, traslado y entrega de cenizas en ánforas.
              </p>
            </div>
          </div>
        </div>
        {/* Gradient Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </div>

      {/* Main Content Title */}
      <div className="text-center my-12">
        <h1 className="text-4xl md:text-5xl font-serif text-[#1b7b3c] tracking-[0.3em] uppercase">
          Cremación
        </h1>
      </div>

      {/* Split Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left: Image & Button */}
          <div className="flex flex-col items-center w-full">
            <div className="relative w-full max-w-md h-[500px] lg:h-[650px] rounded-3xl overflow-hidden shadow-lg">
              {urnImages.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`Ánfora de cremación ${index + 1}`} 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                    index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`} 
                  onError={(e) => { 
                    e.currentTarget.src = "https://images.unsplash.com/photo-1544813545-4827b64fcacb?q=80&w=800&auto=format&fit=crop"; 
                  }} 
                />
              ))}
            </div>
            
            {/* Carousel Dots for Image */}
            <div className="flex justify-center space-x-2 mt-6 mb-8">
              {urnImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-stone-500' : 'bg-stone-200 hover:bg-stone-300'
                  }`}
                  aria-label={`Ver imagen ${index + 1}`}
                />
              ))}
            </div>
            
            <a 
              href="https://wa.me/56998380772?text=Necesito%20cotizar%20un%20servicio%20de%20cremaci%C3%B3n" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#009944] text-white font-bold text-xl px-12 py-3 rounded-xl hover:bg-[#007a36] transition-colors shadow-md w-full max-w-xs text-center uppercase tracking-wide"
            >
              Cotiza Aquí
            </a>
          </div>
          
          {/* Right: Steps */}
          <div className="flex flex-col">
            <div className="bg-[#009944] text-white font-bold text-xl px-6 py-3 rounded-xl mb-6 text-center md:text-left">
              Servicio de cremación
            </div>
            
            <div className="relative pl-8 border-l-[3px] border-[#a3d2b5] ml-4 space-y-5 pb-4">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-[43px] top-1 w-5 h-5 rounded-full bg-[#a3d2b5] border-4 border-white"></div>
                <h3 className="font-bold text-stone-800 text-lg mb-0.5">Paso 1</h3>
                <h4 className="font-bold text-stone-800 mb-1">Organiza tu cremación y compra 100% online</h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Podrás adquirir un servicio de cremación y, además, optar por incluir el servicio funerario, velatorio y todo lo necesario para crear una experiencia completa.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-[43px] top-1 w-5 h-5 rounded-full bg-[#a3d2b5] border-4 border-white"></div>
                <h3 className="font-bold text-stone-800 text-lg mb-0.5">Paso 2</h3>
                <h4 className="font-bold text-stone-800 mb-1">Nuestro asesor te contacta</h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Nuestro asesor experto se pondrá en contacto contigo para definir detalles de ceremonias a realizar, horarios y entrega de documentos.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-[43px] top-1 w-5 h-5 rounded-full bg-[#a3d2b5] border-4 border-white"></div>
                <h3 className="font-bold text-stone-800 text-lg mb-0.5">Paso 3</h3>
                <h4 className="font-bold text-stone-800 mb-1">Ceremonia de despedida</h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Momento en que los seres queridos se despiden del fallecido antes de su ingreso al crematorio.
                </p>
              </div>
              
              {/* Step 4 */}
              <div className="relative">
                <div className="absolute -left-[43px] top-1 w-5 h-5 rounded-full bg-[#a3d2b5] border-4 border-white"></div>
                <h3 className="font-bold text-stone-800 text-lg mb-0.5">Paso 4</h3>
                <h4 className="font-bold text-stone-800 mb-1">Cremación</h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Proceso de cremación individual riguroso en el crematorio más sustentable de Latinoamérica, cumpliendo con normativas ambientales vigentes. Las cenizas se colocarán en un ánfora como parte del proceso final.
                </p>
              </div>
              
              {/* Step 5 */}
              <div className="relative">
                <div className="absolute -left-[43px] top-1 w-5 h-5 rounded-full bg-[#a3d2b5] border-4 border-white"></div>
                <h3 className="font-bold text-stone-800 text-lg mb-0.5">Paso 5</h3>
                <h4 className="font-bold text-stone-800 mb-1">Entrega de cenizas</h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Luego de la cremación, nos pondremos en contacto contigo para coordinar la entrega de las cenizas. En este momento, la familia más cercana puede asistir para recibirlas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-[#f2f2f2] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      <div key={testimonial.id} className="bg-[#dcf0e2] rounded-3xl p-8 text-center shadow-sm flex flex-col justify-between h-full">
                        <p className="text-stone-700 italic mb-8 text-sm md:text-base leading-relaxed">
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

          {/* Carousel Dots for Testimonials */}
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
