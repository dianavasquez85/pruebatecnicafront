'use client';

import { useEffect } from 'react';

export default function BootstrapClient() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .then(() => {
        // opcional: console.log('Bootstrap JS cargado');
      })
      .catch((err) => {
        console.error('Error al cargar Bootstrap JS:', err);
      });
  }, []);

  return null;
}