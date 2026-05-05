import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Credenciales hardcodeadas temporales
    if (username === 'admin' && password === 'admin123') {
      // Guardamos un token simple en localStorage para mantener la sesión
      localStorage.setItem('adminAuth', 'true');
      navigate('/administracion/castillo/funeraria');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Acceso Administrativo</h1>
          <p className="text-stone-500 text-sm mt-2 text-center">
            Ingresa tus credenciales para acceder al panel de control de Funeraria Castillo.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Usuario</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-md"
          >
            Ingresar
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-400">
            Credenciales temporales:<br/>
            Usuario: <strong>admin</strong> | Clave: <strong>admin123</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
