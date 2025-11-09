'use client';

import { useEffect, useMemo, useState, ChangeEvent } from 'react';
import {
  formatCurrency,
  getMinAmount,
  calculateLoanFrenchSystem,
  calculateCompoundGrowth,
} from '@/lib/utils/financial';
import {
  type ProductType,
  savingsDefaultRateByProduct,
  creditRateOptions,
  termOptionsByCreditRate,
  investmentTermOptionsByType,
} from '@/lib/config/simulator';

export default function Simulator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');      // tasa E.A. (%)
  const [months, setMonths] = useState('');  // plazo en meses

  const [selectedProductType, setSelectedProductType] = useState<ProductType | ''>('');
  const [creditRateType, setCreditRateType] = useState<number | null>(null);

  const [amountError, setAmountError] = useState<string | null>(null);
  const [typeProductError, setTypeProductError] = useState<string | null>(null);
  const [investmentError, setInvestmentError] = useState<string | null>(null);

  const [resultValue, setResultValue] = useState<number | null>(null);
  const [resultLabel, setResultLabel] = useState<string | null>(null);
  const [resultDetail, setResultDetail] = useState<string | null>(null);

  const minAmount = useMemo(
    () => getMinAmount(selectedProductType || ''),
    [selectedProductType]
  );

  const creditTermOptions = useMemo(() => {
    if (selectedProductType !== 'credito' || !creditRateType) return [];
    return termOptionsByCreditRate[creditRateType] ?? [];
  }, [selectedProductType, creditRateType]);

  const investmentTermOptions = useMemo(() => {
    if (selectedProductType !== 'cdt' && selectedProductType !== 'inversion') {
      return [];
    }
    return investmentTermOptionsByType[selectedProductType] ?? [];
  }, [selectedProductType]);

  const evaluateAmount = (rawValue: string) => {
    const numericValue = Number(rawValue);
    if (!numericValue) {
      setAmountError('Ingresa el monto en números.');
      return false;
    }
    if (numericValue < minAmount) {
      setAmountError(
        `El monto mínimo para este producto es ${formatCurrency(minAmount)}.`
      );
      return false;
    }
    setAmountError(null);
    return true;
  };

  useEffect(() => {
    if (amount) {
      evaluateAmount(amount);
    }
  }, [amount, minAmount]);

  useEffect(() => {
    if (selectedProductType !== 'credito') {
      setCreditRateType(null);
      setTypeProductError(null);
    }
    if (selectedProductType !== 'cdt' && selectedProductType !== 'inversion') {
      setInvestmentError(null);
    }
  }, [selectedProductType]);

  const handleCreditRateTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const parsedValue = Number(event.target.value);
    if (!parsedValue) {
      setCreditRateType(null);
      setTypeProductError('Selecciona un tipo de crédito.');
      setRate('');
      setMonths('');
      return;
    }
    setCreditRateType(parsedValue);
    setTypeProductError(null);
    setRate(parsedValue.toString());
    setMonths('');
  };

  const handleInvestmentTermChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    if (!value) {
      setInvestmentError('Selecciona un plazo y tasa.');
      setMonths('');
      setRate('');
      return;
    }
    setInvestmentError(null);
    const [mStr, rStr] = value.split('|');
    setMonths(mStr);
    setRate(rStr);
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setResultValue(null);
    setResultLabel(null);
    setResultDetail(null);

    const principal = Number(amount.replace(/\D/g, '')) || 0;
    const n = Number(months);
    const annualRate = Number(rate);

    const isAmountValid = evaluateAmount(String(principal));
    if (!isAmountValid || !principal || !n) {
      return;
    }

    // Crédito
    if (selectedProductType === 'credito') {
      if (!creditRateType) {
        setTypeProductError('Selecciona un tipo de crédito.');
        return;
      }

      const { installment, totalInterest } = calculateLoanFrenchSystem(
        principal,
        annualRate,
        n
      );

      setResultLabel('Cuota mensual estimada');
      setResultValue(installment);
      setResultDetail(
        `Intereses totales aproximados: ${formatCurrency(totalInterest)}`
      );
      return;
    }

    // CDT / Inversión
    if (selectedProductType === 'cdt' || selectedProductType === 'inversion') {
      if (!annualRate || !months) {
        setInvestmentError('Selecciona un plazo y tasa válidos.');
        return;
      }

      const { finalAmount, interestEarned } = calculateCompoundGrowth(
        principal,
        annualRate,
        n
      );

      setResultLabel('Monto final estimado');
      setResultValue(finalAmount);
      setResultDetail(
        `Interés ganado aproximado: ${formatCurrency(interestEarned)}`
      );
      return;
    }
    // Cuentas (Ahorros / Corriente)
    if (selectedProductType === 'ahorros' || selectedProductType === 'corriente') {
      const { finalAmount, interestEarned } = calculateCompoundGrowth(
        principal,
        annualRate,
        n
      );

      setResultLabel('Saldo final estimado');
      setResultValue(finalAmount);
      setResultDetail(
        `Interés ganado aproximado: ${formatCurrency(interestEarned)}`
      );
      return;
    }
  }

  return (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-12 col-xl-10">
        {/* Dos columnas: formulario y resultado */}
        <div className="row g-4">
          {/* Columna del formulario */}
          <div className="col-12 col-lg-7">
            <div className="card border-0 shadow-sm bg-white h-100">
              <div className="card-body p-4 p-md-5">
                <h1 className="h4 text-primary mb-3">Simulador de productos</h1>
                <p>
                  Utiliza este simulador para calcular el valor de tus productos
                  financieros.
                </p>

                {/* 🔽 Aquí va TODO tu <form> tal como ya lo tienes */}
                <form className="vstack gap-4" onSubmit={handleSubmit}>
                {/* Tipo de producto */}
                <div>
                  <label className="form-label fw-semibold">
                    Tipo de producto
                  </label>
                  <select
                    className="form-select"
                    value={selectedProductType}
                    onChange={(e) => {
                      const value = e.target.value as ProductType | '';
                      setSelectedProductType(value);
                      setMonths('');
                      setRate('');
                      setCreditRateType(null);
                      setTypeProductError(null);
                      setInvestmentError(null);
                      setResultValue(null);

                      // Asignar tasa predefinida para cuentas
                      const defaultSavingsRate =
                        value && savingsDefaultRateByProduct[value];
                      if (defaultSavingsRate !== undefined) {
                        setRate(String(defaultSavingsRate));
                      }
                    }}
                  >
                    <option value="">Seleccione un tipo</option>
                    <option value="ahorros">Cuenta de Ahorros</option>
                    <option value="corriente">Cuenta Corriente</option>
                    <option value="credito">Crédito</option>
                    <option value="cdt">CDT</option>
                    <option value="inversion">Inversión</option>
                  </select>
                </div>

                {/* Monto */}
                <div>
                  <label htmlFor="amount" className="form-label fw-semibold">
                    {selectedProductType === 'credito'
                      ? 'Monto solicitado'
                      : selectedProductType === 'cdt' ||
                        selectedProductType === 'inversion'
                      ? 'Inversión inicial'
                      : 'Saldo actual'}
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted">
                      COP
                    </span>
                    <input
                      id="amount"
                      className={`form-control ${
                        amountError
                          ? 'is-invalid'
                          : !amountError && amount
                          ? 'is-valid'
                          : ''
                      }`}
                      value={amount}
                      inputMode="numeric"
                      min={minAmount}
                      required
                      onChange={(event) => {
                        const onlyDigits = event.target.value.replace(/\D/g, '');
                        setAmount(onlyDigits);
                      }}
                      placeholder="Ej: 20000000"
                    />
                  </div>
                  <div className="form-text">
                    Ingresa únicamente números; el formato de moneda se aplicará
                    al resultado.
                  </div>
                  <div
                    className={`invalid-feedback ${amountError ? 'd-block' : ''}`}
                  >
                    {amountError || 'Ingrese un monto válido'}
                  </div>
                </div>

                {/* Tipo de crédito */}
                {selectedProductType === 'credito' ? (
                  <div>
                    <label
                      htmlFor="creditType"
                      className="form-label fw-semibold"
                    >
                      Tipo de crédito
                    </label>
                    <select
                      id="creditRateType"
                      className={`form-select ${
                        typeProductError
                          ? 'is-invalid'
                          : !typeProductError && creditRateType
                          ? 'is-valid'
                          : ''
                      }`}
                      value={creditRateType ?? 0}
                      onChange={handleCreditRateTypeChange}
                    >
                      <option value={0}>Seleccione un tipo</option>
                      {creditRateOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div
                      className={`invalid-feedback ${
                        typeProductError ? 'd-block' : ''
                      }`}
                    >
                      {typeProductError || 'Seleccione un tipo de crédito válido'}
                    </div>
                  </div>
                ) : null}

                {/* Tasa para crédito (readonly) */}
                {selectedProductType === 'credito' && creditRateType ? (
                  <div>
                    <label className="form-text">Tasa de interés (% E.A.)</label>
                    <div className="d-flex align-items-center gap-2">
                      <input
                        id="rate"
                        className="form-control-plaintext"
                        value={`${creditRateType} %`}
                        readOnly
                      />
                      <span>E.A.</span>
                    </div>
                  </div>
                ) : null}

                {/* Tasa para cuentas (ahorros / corriente) — readonly, ofrecida por el banco */}
                {(selectedProductType === 'ahorros' ||
                  selectedProductType === 'corriente') && (
                  <div>
                    <label className="form-label fw-semibold">
                      Tasa de interés (% E.A.) ofrecida por el banco
                    </label>
                    <input
                      className="form-control-plaintext"
                      readOnly
                      value={
                        rate
                          ? `${rate} % E.A.`
                          : 'Sin tasa definida para este producto'
                      }
                    />
                    <div className="form-text">
                      Esta es la tasa referencial ofrecida por el banco para este tipo de cuenta.
                    </div>
                  </div>
                )}

                {/* Plazo + tasa para CDT / Inversión */}
                {selectedProductType === 'cdt' ||
                selectedProductType === 'inversion' ? (
                  <div>
                    <label className="form-label fw-semibold">
                      Plazo y tasa (CDT / Inversión)
                    </label>
                    <select
                      className={`form-select ${
                        investmentError ? 'is-invalid' : ''
                      }`}
                      value={
                        months && rate ? `${months}|${rate}` : ''
                      }
                      onChange={handleInvestmentTermChange}
                    >
                      <option value="">
                        Seleccione plazo y tasa estimada
                      </option>
                      {investmentTermOptions.map((opt) => (
                        <option
                          key={opt.months}
                          value={`${opt.months}|${opt.rate}`}
                        >
                          {opt.months} meses — {opt.rate}% E.A.
                        </option>
                      ))}
                    </select>
                    <div
                      className={`invalid-feedback ${
                        investmentError ? 'd-block' : ''
                      }`}
                    >
                      {investmentError || 'Seleccione un plazo válido'}
                    </div>
                  </div>
                ) : null}

                {/* Plazo para cuentas (ahorros/corriente) */}
                {(selectedProductType === 'ahorros' ||
                  selectedProductType === 'corriente') && (
                  <div>
                    <label
                      htmlFor="months"
                      className="form-label fw-semibold"
                    >
                      Plazo (meses)
                    </label>
                    <input
                      id="months"
                      className="form-control"
                      type="number"
                      value={months}
                      onChange={(event) => setMonths(event.target.value)}
                      placeholder="Ej: 12"
                    />
                  </div>
                )}

                {/* Plazo genérico para otros productos (si algún día agregas más) */}
                {selectedProductType !== 'credito' &&
                  selectedProductType !== 'cdt' &&
                  selectedProductType !== 'inversion' &&
                  selectedProductType !== 'ahorros' &&
                  selectedProductType !== 'corriente' && (
                    <div>
                      <label
                        htmlFor="months"
                        className="form-label fw-semibold"
                      >
                        Plazo (meses)
                      </label>
                      <input
                        id="months"
                        className="form-control"
                        type="number"
                        value={months}
                        onChange={(event) => setMonths(event.target.value)}
                        placeholder="Ej: 12"
                      />
                    </div>
                  )}

                {/* Plazo (meses) para crédito con opciones sugeridas */}
                {selectedProductType === 'credito' && creditRateType ? (
                  <div>
                    <label
                      htmlFor="months"
                      className="form-label fw-semibold"
                    >
                      Plazo (meses)
                    </label>
                    <select
                      id="months"
                      className="form-select"
                      value={months}
                      onChange={(e) => setMonths(e.target.value)}
                    >
                      <option value="">
                        Selecciona el plazo para este tipo de crédito
                      </option>
                      {creditTermOptions.map((m) => (
                        <option key={m} value={m}>
                          {m} meses{' '}
                          {m >= 60 ? `(${Math.round(m / 12)} años)` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={
                    !!amountError || !!typeProductError || !!investmentError
                  }
                >
                  Simular
                </button>
              </form>
              </div>
            </div>
          </div>

          {/* Columna del resultado */}
          <div className="col-12 col-lg-5">
            {resultValue !== null && (
              <div className="card border-0 shadow-sm bg-light h-100">
                <div className="card-body d-flex flex-column p-4">
                  <h2 className="h5 text-success mb-3">
                    Resultado de la simulación
                  </h2>

                  {/* Etiqueta de tipo de producto */}
                  {selectedProductType && (
                    <p className="mb-3">
                      <span className="badge bg-primary-subtle text-primary text-uppercase">
                        {selectedProductType}
                      </span>
                    </p>
                  )}

                  {/* Detalles de la simulación */}
                  <dl className="row small mb-3">
                    <dt className="col-5">Monto</dt>
                    <dd className="col-7">
                      {formatCurrency(Number(amount || 0))}
                    </dd>

                    <dt className="col-5">Plazo</dt>
                    <dd className="col-7">
                      {months
                        ? `${months} meses${
                            Number(months) >= 12
                              ? ` (~${Math.round(Number(months) / 12)} años)`
                              : ''
                          }`
                        : '—'}
                    </dd>

                    <dt className="col-5">Tasa</dt>
                    <dd className="col-7">
                      {rate ? `${rate} % E.A.` : '—'}
                    </dd>
                  </dl>

                  <hr />

                  {/* Resultado principal (cuota / saldo final / monto final) */}
                  <div className="mt-2">
                    <p className="mb-1 text-uppercase small fw-semibold text-success">
                      {resultLabel || 'Valor principal'}
                    </p>
                    <p className="fs-3 fw-bold mb-0">
                      {formatCurrency(resultValue)}
                    </p>
                  </div>

                  {/* Texto adicional (intereses totales, interés ganado, etc.) */}
                  {resultDetail && (
                    <p className="mt-3 mb-0 small text-muted">
                      {resultDetail}
                    </p>
                  )}

                  {/* Espaciador para pegar el contenido al fondo si la tarjeta es alta */}
                  <div className="mt-auto" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
