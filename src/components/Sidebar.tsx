'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/products', label: 'Productos', icon: 'bi-wallet2', color: 'text-primary' },
  { href: '/simulator', label: 'Simulador', icon: 'bi-calculator', color: 'text-success' },
  { href: '/onboarding', label: 'Adquirir Productos', icon: 'bi-person-plus', color: 'text-warning' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarWidth = isMobile
    ? collapsed
      ? '72px'
      : '100%'
    : collapsed
      ? '80px'
      : '250px';

  return (
    <div
      className={`d-flex flex-column flex-shrink-0 p-3 bg-light border-end vh-100 ${
        collapsed ? 'sidebar-collapsed' : ''
      }`}
      style={{ width: sidebarWidth, transition: 'width 0.3s' }}
    >
      {/* Título / Logo */}
      <div className="d-flex align-items-center gap-2 mb-3 mb-md-0 me-md-auto">
        <Link
          href="/"
          className={`text-decoration-none d-flex align-items-center ${
            collapsed ? 'justify-content-center w-100' : 'gap-2'
          }`}
        >
          <span className="text-primary fs-4 d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle px-2 py-1">
            <i className="bi bi-bank2"></i>
          </span>
          {!collapsed && (
            <span className="fs-5 fw-bold text-primary">Banco Amigo</span>
          )}
        </Link>
        {/* Botón de colapsar */}
        <button
          type="button"
          aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
          onClick={() => setCollapsed(!collapsed)}
          className="btn btn-outline-primary border-0 rounded-circle d-flex align-items-center justify-content-center shadow-sm"
          style={{
            width: 36,
            height: 36,
            marginLeft: collapsed ? 'auto' : 0,
            transform: collapsed ? 'translateX(24px)' : 'none',
          }}
        >
          {collapsed ? (
            <i className="bi bi-list"></i>
          ) : (
            <i className="bi bi-chevron-double-left"></i>
          )}
        </button>
      </div>
      <hr />

      {/* Navegación */}
      <ul className="nav nav-pills flex-column mb-auto">
        {navItems.map(({ href, label, icon, color }) => (
          <li className="nav-item" key={href}>
            <Link
              href={href}
              className={`nav-link d-flex align-items-center ${
                pathname === href ? 'active' : 'text-dark'
              } ${collapsed ? 'justify-content-center' : ''}`}
            >
              <i className={`bi ${icon} me-2 ${pathname === href ? 'text-white' : color}`}></i>
              {!collapsed && label}
            </Link>
          </li>
        ))}
      </ul>

      <hr />

      
    </div>
  );
}
