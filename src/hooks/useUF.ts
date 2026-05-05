import { useState, useEffect } from 'react';

export function useUF() {
  const [ufValue, setUfValue] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUF = async () => {
      try {
        const response = await fetch('https://mindicador.cl/api/uf');
        if (!response.ok) throw new Error('Error al obtener la UF');
        
        const data = await response.json();
        if (data && data.serie && data.serie.length > 0) {
          setUfValue(data.serie[0].valor);
        } else {
          throw new Error('Formato de datos inválido');
        }
      } catch (err) {
        console.error('Error fetching UF:', err);
        setError('No se pudo obtener el valor de la UF');
        // Valor de respaldo aproximado (ej. 37000) en caso de que la API falle
        setUfValue(37500); 
      } finally {
        setLoading(false);
      }
    };

    fetchUF();
  }, []);

  return { ufValue, loading, error };
}
