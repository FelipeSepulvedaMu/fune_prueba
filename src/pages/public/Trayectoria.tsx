import React from 'react';

export default function Trayectoria() {
  return (
    <div className="w-full bg-white">
      {/* Video Banner (Full Width) */}
      <div className="w-full h-[400px] md:h-[500px] bg-stone-900 relative flex items-center justify-center overflow-hidden">
        <video 
          src="/video-trayectoria.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          Tu navegador no soporta el elemento de video.
        </video>
        
        {/* Capa oscura opcional para que el texto resalte más si decides poner texto encima */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
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
            Trayectoria
          </h1>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
          
          {/* Left Image */}
          <div className="lg:col-span-1 h-[400px] lg:h-auto">
            <img 
              src="/trayectoria-izq.jpg" 
              alt="Vehículos funerarios" 
              className="w-full h-full object-cover shadow-sm"
              onError={(e) => {
                // Fallback a imagen de prueba si aún no se sube el archivo
                e.currentTarget.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop";
              }}
            />
          </div>

          {/* Center Text */}
          <div className="lg:col-span-2 text-stone-700 text-justify space-y-4 text-sm md:text-base leading-relaxed px-2">
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
            </p>
            <p>
              Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
            </p>
            <p>
              Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
            </p>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-1 h-[400px] lg:h-auto">
            <img 
              src="/trayectoria-der.jpg" 
              alt="Parque cementerio" 
              className="w-full h-full object-cover shadow-sm"
              onError={(e) => {
                // Fallback a imagen de prueba si aún no se sube el archivo
                e.currentTarget.src = "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop";
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
