'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`d-flex flex-column flex-shrink-0 p-3 bg-light border-end vh-100 ${
        collapsed ? 'sidebar-collapsed' : ''
      }`}
      style={{ width: collapsed ? '80px' : '250px', transition: 'width 0.3s' }}
    >
      {/* Título / Logo */}
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto">
        <span className="fs-5 fw-bold text-primary">
          {collapsed ? '💰' : 'BancoSim'}
        </span>
      </div>
      <hr />

      {/* Navegación */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            href="/products"
            className={`nav-link ${pathname === '/products' ? 'active' : 'text-dark'}`}
          >
            <i className="bi bi-wallet2 me-2"></i>
            {!collapsed && 'Productos'}
          </Link>
        </li>
        <li>
          <Link
            href="/simulator"
            className={`nav-link ${pathname === '/simulator' ? 'active' : 'text-dark'}`}
          >
            <i className="bi bi-calculator me-2"></i>
            {!collapsed && 'Simulador'}
          </Link>
        </li>
        <li>
          <Link
            href="/onboarding"
            className={`nav-link ${pathname === '/onboarding' ? 'active' : 'text-dark'}`}
          >
            <i className="bi bi-person-plus me-2"></i>
            {!collapsed && 'Onboarding'}
          </Link>
        </li>
      </ul>

      <hr />

      {/* Botón de colapsar */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="btn btn-outline-secondary btn-sm mt-auto"
      >
        {collapsed ? '➡️' : '⬅️'}
      </button>
    </div>
  );
}
