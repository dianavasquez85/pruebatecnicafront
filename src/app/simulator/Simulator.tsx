// app/simulator/SimulatorForm.tsx
'use client';

import { useState } from 'react';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Simulator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const [result, setResult] = useState<number | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const principal = Number(amount.replace(/\D/g, '')) || 0;
    const monthlyRate = Number(rate) / 100 / 12;
    const n = Number(months);

    if (!principal || !monthlyRate || !n) {
      setResult(null);
      return;
    }

    // Fórmula de cuota fija (método francés)
    const cuota =
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));

    setResult(cuota);
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-12 col-xl-10">
          <div className="card border-0 shadow-sm bg-white">
            <div className="card-body p-4 p-md-5">
              <h1 className="h4 text-primary mb-3">Simulador de crédito</h1>
              <p className="text-muted mb-4">
                Calcula rápidamente el valor aproximado de tu cuota mensual con
                tasa fija.
              </p>

              <form className="vstack gap-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="amount" className="form-label fw-semibold">
                    Monto solicitado
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted">
                      COP
                    </span>
                    <input
                      id="amount"
                      className="form-control"
                      value={amount}
                      inputMode="numeric"
                      onChange={(event) => {
                        const onlyDigits = event.target.value.replace(/\D/g, '');
                        setAmount(onlyDigits);
                      }}
                      placeholder="Ej: 20000000"
                    />
                  </div>
                  <div className="form-text">
                    Ingresa únicamente números; el formato de moneda se aplicará al resultado.
                  </div>
                </div>

                <div>
                  <label htmlFor="rate" className="form-label fw-semibold">
                    Tasa efectiva anual (%)
                  </label>
                  <input
                    id="rate"
                    className="form-control"
                    type="number"
                    step="0.01"
                    value={rate}
                    onChange={(event) => setRate(event.target.value)}
                    placeholder="Ej: 16.5"
                  />
                </div>

                <div>
                  <label htmlFor="months" className="form-label fw-semibold">
                    Plazo (meses)
                  </label>
                  <input
                    id="months"
                    className="form-control"
                    type="number"
                    value={months}
                    onChange={(event) => setMonths(event.target.value)}
                    placeholder="Ej: 60"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2">
                  Calcular cuota
                </button>
              </form>

              {result !== null && (
                <div className="alert alert-success mt-4 mb-0" role="alert">
                  <p className="mb-1 fw-semibold text-uppercase small text-success">
                    Resultado estimado
                  </p>
                  <p className="mb-0 fs-4 fw-bold">
                    Cuota mensual: {formatCurrency(result)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
