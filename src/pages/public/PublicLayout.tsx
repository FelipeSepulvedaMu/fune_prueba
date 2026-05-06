import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Menu, X } from 'lucide-react';

export default function PublicLayout() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#007a36] via-[#009944] to-[#007a36] shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center">
              {/* Hamburger Button (Mobile Only) */}
              <button 
                className="lg:hidden p-2 text-white hover:text-stone-200 transition-colors mr-2 -ml-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Logo */}
              <Link to="/" className="flex items-center flex-shrink-0" onClick={closeMobileMenu}>
                <img 
                  src="/logo-alt.png" 
                  alt="Funeraria Castillo" 
                  className="h-10 w-auto object-contain"
                  onError={(e) => {
                    // Fallback visual en caso de que la imagen aún no esté subida
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                {/* Fallback temporal mientras se sube la imagen */}
                <div className="hidden flex items-center space-x-2">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-white">
                      <path d="M50 10 L55 25 L70 25 L60 35 L65 50 L50 40 L35 50 L40 35 L30 25 L45 25 Z" />
                      <rect x="35" y="45" width="30" height="45" />
                      <path d="M40 90 L40 70 L60 70 L60 90 Z" fill="#007a36" />
                      <rect x="47" y="5" width="6" height="15" />
                      <rect x="42" y="10" width="16" height="6" />
                    </svg>
                  </div>
                  <h1 className="text-lg font-serif font-bold tracking-widest text-white uppercase">Castillo</h1>
                </div>
              </Link>
            </div>

            {/* Default Desktop Navigation */}
            <nav className="hidden lg:flex items-center h-full">
              <Link to="/trayectoria" className="px-4 text-[11px] font-bold text-white hover:text-stone-200 transition-colors uppercase tracking-widest">Trayectoria</Link>
              <div className="h-4 w-px bg-white/40"></div>
              <Link to="/" className="px-4 text-[11px] font-bold text-white hover:text-stone-200 transition-colors uppercase tracking-widest">Nuestros Servicios</Link>
              <div className="h-4 w-px bg-white/40"></div>
              <Link to="/cremacion" className="px-4 text-[11px] font-bold text-white hover:text-stone-200 transition-colors uppercase tracking-widest">Cremación</Link>
              <div className="h-4 w-px bg-white/40"></div>
              <Link to="/sepulturas" className="px-4 text-[11px] font-bold text-white hover:text-stone-200 transition-colors uppercase tracking-widest">Venta de Sepulturas</Link>
              <div className="h-4 w-px bg-white/40"></div>
              <Link to="/contacto" className="px-4 text-[11px] font-bold text-white hover:text-stone-200 transition-colors uppercase tracking-widest">Contacto</Link>
            </nav>

            {/* Actions (Cart) */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Link to="/carrito" onClick={closeMobileMenu} className="relative p-2 text-white hover:text-stone-200 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-white text-[#009944] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-14 left-0 w-full bg-[#007a36]/95 backdrop-blur-md shadow-lg border-t border-white/10 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col py-4 px-4 space-y-4">
              <Link to="/trayectoria" onClick={closeMobileMenu} className="block text-sm font-bold text-white hover:text-stone-200 transition-colors uppercase tracking-widest border-b border-white/10 pb-2">Trayectoria</Link>
              <Link to="/" onClick={closeMobileMenu} className="block text-sm font-bold text-white hover:text-stone-200 transition-colors uppercase tracking-widest border-b border-white/10 pb-2">Nuestros Servicios</Link>
              <Link to="/cremacion" onClick={closeMobileMenu} className="block text-sm font-bold text-white hover:text-stone-200 transition-colors uppercase tracking-widest border-b border-white/10 pb-2">Cremación</Link>
              <Link to="/sepulturas" onClick={closeMobileMenu} className="block text-sm font-bold text-white hover:text-stone-200 transition-colors uppercase tracking-widest border-b border-white/10 pb-2">Venta de Sepulturas</Link>
              <Link to="/contacto" onClick={closeMobileMenu} className="block text-sm font-bold text-white hover:text-stone-200 transition-colors uppercase tracking-widest">Contacto</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#757575] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative">
            
            {/* Column 1: Logo */}
            <div className="flex justify-center md:justify-start items-center">
              <div className="flex flex-col items-center">
                <img 
                  src="/logo-alt.png" 
                  alt="Funeraria Castillo" 
                  className="h-16 md:h-20 w-auto object-contain"
                  onError={(e) => {
                    // Fallback visual en caso de que la imagen aún no esté subida
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                {/* Fallback temporal mientras se sube la imagen */}
                <div className="hidden flex flex-col items-center">
                  <div className="w-12 h-12 mb-1">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-white">
                      <path d="M50 10 L55 25 L70 25 L60 35 L65 50 L50 40 L35 50 L40 35 L30 25 L45 25 Z" />
                      <rect x="35" y="45" width="30" height="45" />
                      <path d="M40 90 L40 70 L60 70 L60 90 Z" fill="#757575" />
                      <rect x="47" y="5" width="6" height="15" />
                      <rect x="42" y="10" width="16" height="6" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-serif font-bold tracking-widest uppercase">Castillo</h2>
                </div>
              </div>
            </div>

            {/* Divider 1 (Hidden on mobile) */}
            <div className="hidden md:block absolute left-1/3 top-0 bottom-0 w-px bg-white/30"></div>

            {/* Column 2: Contact Info & Socials */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-base md:text-lg italic font-light">Lía Aguirre 70, La Florida.</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-xl md:text-2xl font-bold tracking-wide">+569 9838 0772</span>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-3 pt-1">
                <a href="#" className="w-7 h-7 bg-white text-[#757575] rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="w-7 h-7 bg-white text-[#757575] rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors font-bold text-base">
                  𝕏
                </a>
                <a href="#" className="w-7 h-7 bg-white text-[#757575] rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>

            {/* Divider 2 (Hidden on mobile) */}
            <div className="hidden md:block absolute right-1/3 top-0 bottom-0 w-px bg-white/30"></div>

            {/* Column 3: Status */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center justify-center w-full mb-2 relative">
                <div className="absolute w-full h-px bg-white/50 top-1/2 transform -translate-y-1/2"></div>
                <div className="bg-[#757575] px-4 relative z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C12 2 9 7 9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10C15 7 12 2 12 2ZM10 14V20C10 21.1046 10.8954 22 12 22C13.1046 22 14 21.1046 14 20V14H10Z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold italic tracking-wider mb-1">ABIERTO 24/7</h3>
              <p className="text-lg italic font-light leading-tight">Atención inmediata</p>
              <p className="text-lg italic font-light leading-tight">Todos los dias</p>
              
              {/* Admin Link */}
              <div className="mt-2">
                <Link to="/administracion/castillo/funeraria" className="text-[10px] text-white/30 hover:text-white/80 transition-colors">
                  Admin
                </Link>
              </div>
            </div>

          </div>
        </div>
        
        {/* Bottom Green Bar */}
        <div className="h-4 w-full bg-[#009944]"></div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/56998380772?text=Necesito%20contratar%20un%20servicio%20funerario%20"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20ba56] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>
    </div>
  );
}
