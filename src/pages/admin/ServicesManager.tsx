import React, { useEffect, useState } from 'react';
import { Service } from '../../types';
import { Plus, Edit2, Power, PowerOff, Image as ImageIcon } from 'lucide-react';

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service>>({});

  const fetchServices = () => {
    setLoading(true);
    fetch('/api/admin/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const formatCLP = (amount: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
  };

  const handleToggleActive = async (id: string) => {
    await fetch(`/api/admin/services/${id}/toggle`, { method: 'PATCH' });
    fetchServices();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !currentService.id;
    const url = isNew ? '/api/admin/services' : `/api/admin/services/${currentService.id}`;
    const method = isNew ? 'POST' : 'PUT';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentService),
    });

    setIsEditing(false);
    setCurrentService({});
    fetchServices();
  };

  const openNewForm = () => {
    setCurrentService({
      title: '',
      description: '',
      type: 'basico',
      priceUF: 0,
      priceCLP: 0,
      imageUrl: '',
      includes: [],
      note: '',
      subNote: '',
    });
    setIsEditing(true);
  };

  const openEditForm = (service: Service) => {
    setCurrentService(service);
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {currentService.id ? 'Editar Servicio' : 'Nuevo Servicio'}
        </h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              value={currentService.title || ''}
              onChange={e => setCurrentService({...currentService, title: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea 
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              value={currentService.description || ''}
              onChange={e => setCurrentService({...currentService, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Plan</label>
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                value={currentService.type || 'basico'}
                onChange={e => setCurrentService({...currentService, type: e.target.value as any})}
              >
                <option value="basico">Básico</option>
                <option value="medio">Medio</option>
                <option value="full">Full</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL de Imagen</label>
              <input 
                type="url" 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                value={currentService.imageUrl || ''}
                onChange={e => setCurrentService({...currentService, imageUrl: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio (UF)</label>
              <input 
                type="number" 
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                value={currentService.priceUF || 0}
                onChange={e => setCurrentService({...currentService, priceUF: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio (CLP) - Opcional</label>
              <input 
                type="number" 
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                value={currentService.priceCLP || 0}
                onChange={e => setCurrentService({...currentService, priceCLP: parseInt(e.target.value)})}
              />
              <p className="text-xs text-gray-500 mt-1">El precio se calculará dinámicamente con la UF si se deja en 0.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Elementos que incluye (uno por línea)</label>
            <textarea 
              rows={5}
              placeholder="Urna: Siena Pino&#10;1 Cubre urna con 25 flores&#10;1 Canastillo de 20 Flores"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              value={currentService.includes?.join('\n') || ''}
              onChange={e => setCurrentService({
                ...currentService, 
                includes: e.target.value.split('\n').filter(line => line.trim() !== '')
              })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nota (Descuento cuota mortuoria)</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                value={currentService.note || ''}
                onChange={e => setCurrentService({...currentService, note: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sub-nota (Cálculo UF)</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                value={currentService.subNote || ''}
                onChange={e => setCurrentService({...currentService, subNote: e.target.value})}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
            <button 
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Guardar Servicio
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Catálogo de Servicios</h2>
        <button 
          onClick={openNewForm}
          className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Servicio
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Cargando servicios...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                        {service.imageUrl ? (
                          <img src={service.imageUrl} alt="" className="h-10 w-10 object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <ImageIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{service.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800 uppercase">
                      {service.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {service.priceCLP > 0 ? formatCLP(service.priceCLP) : <span className="text-stone-500 italic">Dinámico (UF)</span>}
                    </div>
                    <div className="text-xs text-gray-500">{service.priceUF} UF</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      service.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {service.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => openEditForm(service)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleToggleActive(service.id)}
                      className={`${service.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                      title={service.isActive ? 'Desactivar' : 'Activar'}
                    >
                      {service.isActive ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
