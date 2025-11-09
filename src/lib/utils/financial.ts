// lib/utils/financial.ts

// Formato de moneda COP
export function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

// Monto mínimo por tipo de producto
export function getMinAmount(productType: string) {
  if (productType === 'cdt' || productType === 'inversion') return 500000;
  if (productType === 'credito') return 1000000;
  return 100000; // cuentas, etc.
}

// --------- Créditos: sistema francés (cuota fija) ---------

export interface LoanResult {
  installment: number;
  totalPaid: number;
  totalInterest: number;
}

/**
 * Calcula cuota fija, total pagado e intereses (método francés).
 * @param principal  Monto del crédito
 * @param annualRatePercent  Tasa E.A. en %
 * @param months  Plazo en meses
 */
export function calculateLoanFrenchSystem(
  principal: number,
  annualRatePercent: number,
  months: number
): LoanResult {
  const monthlyRate = (annualRatePercent / 100) / 12;

  if (months <= 0) {
    return {
      installment: 0,
      totalPaid: 0,
      totalInterest: 0,
    };
  }

  if (monthlyRate <= 0) {
    const installment = principal / months;
    return {
      installment,
      totalPaid: principal,
      totalInterest: 0,
    };
  }

  const installment =
    (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

  const totalPaid = installment * months;
  const totalInterest = totalPaid - principal;

  return {
    installment,
    totalPaid,
    totalInterest,
  };
}

// --------- Crecimiento compuesto (CDT, inversión, ahorros) ---------

export interface GrowthResult {
  finalAmount: number;
  interestEarned: number;
}

/**
 * Calcula saldo final e interés ganado con capitalización mensual.
 * @param principal  Monto inicial
 * @param annualRatePercent  Tasa E.A. en %
 * @param months  Plazo en meses
 */
export function calculateCompoundGrowth(
  principal: number,
  annualRatePercent: number,
  months: number
): GrowthResult {
  const monthlyRate = (annualRatePercent / 100) / 12;

  if (months <= 0) {
    return {
      finalAmount: principal,
      interestEarned: 0,
    };
  }

  const finalAmount = principal * Math.pow(1 + monthlyRate, months);
  const interestEarned = finalAmount - principal;

  return {
    finalAmount,
    interestEarned,
  };
}
