'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Product } from '@/types/product';

interface Props {
    products: Product[];
}

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Products({ products }: Props) {
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const applyFilter = useCallback(
    (currentQuery: string) => {
      const lowerQuery = currentQuery.toLowerCase().trim();
      if (!lowerQuery) {
        setFilteredProducts(products);
        return;
      }
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(lowerQuery) ||
          (product.alias && product.alias.toLowerCase().includes(lowerQuery)) ||
          product.type.toLowerCase().includes(lowerQuery)
        )
      );
    },
    [products]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => applyFilter(query), 300);
    return () => clearTimeout(timeoutId);
  }, [query, applyFilter]);

  return (
    <div className="container py-4">
      <div className="row align-items-center mb-4 gy-3">
        <div className="col">
          <h1 className="h3 mb-1">Productos</h1>
          <p className="text-muted mb-0">
            Explora tus productos financieros y encuentra lo que necesitas rápidamente.
          </p>
        </div>
        <div className="col-12 col-md-5 col-lg-4">
          <label htmlFor="product-search" className="form-label visually-hidden">
            Buscar productos
          </label>
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              id="product-search"
              type="search"
              className="form-control border-start-0"
              placeholder="Buscar por nombre, alias o tipo"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          No se encontraron productos.
        </div>
      ) : (
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div className="col-12 col-md-6 col-lg-4" key={product.id}>
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <span className="badge bg-primary-subtle text-primary-emphasis text-uppercase fw-semibold mb-3">
                    {product.type}
                  </span>
                  <h5 className="card-title mb-1">{product.name}</h5>
                  {product.alias && (
                    <p className="text-muted small mb-3">Alias: {product.alias}</p>
                  )}
                  <p className="display-6 fs-3 fw-bold text-primary mb-1">
                    {formatCurrency(product.balance, product.currency)}
                  </p>
                  <p className="text-muted small mb-4">{product.currency}</p>
                  <div className="mt-auto d-flex justify-content-between text-muted small">
                    <span>ID: {product.id}</span>
                    <span>Saldo</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
