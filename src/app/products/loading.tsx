'use client';

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: '100vh' }}>
      <div className="text-center">
        <div
          className="spinner-border text-primary mb-3"
          role="status"
          aria-label="Cargando productos"
        />
        <p className="text-muted mb-0">Cargando productos...</p>
      </div>
    </div>
  );
}
