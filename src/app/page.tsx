import Image from "next/image";
import Link from 'next/link';

export default function Home() {
   return (
    <main className="container-fluid py-4">
      <div className="row align-items-center mb-4 gy-3 justify-content-center">
        <div className="col-12 col-xl-10">
          {/* Bienvenida */}
          <section className="mb-5 ">
            <h1 className="h3 fw-bold text-primary mb-2 ">
              ¡Hola, Usuario!
            </h1>
            <p className="text-muted mb-0">
              Consulta tus productos, realiza simulaciones o aprende cómo mejorar tus finanzas personales.
            </p>
          </section>

          {/* Sección principal de productos */}
          <section>
            <h2 className="h5 fw-semibold text-secondary mb-4">
              Tus productos y servicios
            </h2>
            <div className="row g-4">
              {/* Cuentas */}
              <div className="col-12 col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-piggy-bank fs-1 text-primary mb-3"></i>
                    <h5 className="card-title fw-semibold mb-2">Cuentas de Ahorro</h5>
                    <p className="text-muted small">
                      Consulta tus saldos, movimientos y rendimiento de tus cuentas activas.
                    </p>
                    <Link href="/products" className="btn btn-outline-primary btn-sm">
                      <i className="bi bi-wallet2 me-2"></i> Ver mis productos
                    </Link>
                  </div>
                </div>
              </div>

              {/* Créditos */}
              <div className="col-12 col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-cash-coin fs-1 text-success mb-3"></i>
                    <h5 className="card-title fw-semibold mb-2">Créditos</h5>
                    <p className="text-muted small">
                      Revisa tus créditos vigentes o realiza una simulación de nuevas solicitudes.
                    </p>
                    <Link href="/simulator" className="btn btn-outline-success btn-sm">
                      <i className="bi bi-calculator me-2"></i> Simular crédito
                    </Link>
                  </div>
                </div>
              </div>

              {/* Inversiones */}
              <div className="col-12 col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-graph-up-arrow fs-1 text-warning mb-3"></i>
                    <h5 className="card-title fw-semibold mb-2">Inversiones</h5>
                    <p className="text-muted small">
                      Proyecta tus rendimientos o abre una nueva inversión con tasas competitivas.
                    </p>
                    <Link href="/simulator" className="btn btn-outline-warning btn-sm">
                      <i className="bi bi-bar-chart-line me-2"></i> Calcular inversión
                    </Link>
                  </div>
                </div>
              </div>

              {/* Apertura de cuenta nueva */}
              <div className="col-12 col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-person-plus fs-1 text-info mb-3"></i>
                    <h5 className="card-title fw-semibold mb-2">Abrir un nuevo producto</h5>
                    <p className="text-muted small">
                      Registra la apertura de una nueva cuenta o inicia una solicitud de crédito.
                    </p>
                    <Link href="/onboarding" className="btn btn-outline-info btn-sm">
                      <i className="bi bi-journal-plus me-2"></i> Nueva solicitud
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección de Tips financieros */}
          <section className="mt-5">
            <h2 className="h5 fw-semibold text-secondary mb-4">
              💡 Tips financieros
            </h2>

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <div className="alert alert-light border-start border-4 border-success shadow-sm h-100">
                  <h6 className="fw-bold text-success mb-1">
                    Ahorra antes de gastar
                  </h6>
                  <p className="text-muted small mb-0">
                    Destina al menos el 10% de tus ingresos al ahorro antes de realizar tus compras.  
                    Automatiza transferencias a tu cuenta de ahorros para cumplir tu meta sin pensarlo.
                  </p>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="alert alert-light border-start border-4 border-warning shadow-sm h-100">
                  <h6 className="fw-bold text-warning mb-1">
                    Cuida tu historial crediticio
                  </h6>
                  <p className="text-muted small mb-0">
                    Paga tus obligaciones a tiempo y evita usar más del 30% del cupo de tus tarjetas.  
                    Un buen historial te ayuda a acceder a mejores tasas de crédito.
                  </p>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="alert alert-light border-start border-4 border-primary shadow-sm h-100">
                  <h6 className="fw-bold text-primary mb-1">
                    Diversifica tus inversiones
                  </h6>
                  <p className="text-muted small mb-0">
                    No pongas todos tus ahorros en un solo producto.  
                    Combina cuentas, CDTs y fondos para equilibrar riesgo y rentabilidad.
                  </p>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="alert alert-light border-start border-4 border-danger shadow-sm h-100">
                  <h6 className="fw-bold text-danger mb-1">
                    Ten un fondo de emergencia
                  </h6>
                  <p className="text-muted small mb-0">
                    Guarda al menos el equivalente a 3 meses de tus gastos.  
                    Te protegerá ante imprevistos sin afectar tus metas financieras.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
