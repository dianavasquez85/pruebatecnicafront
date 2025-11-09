// lib/config/simulator.ts

export type ProductType =
  | 'ahorros'
  | 'corriente'
  | 'credito'
  | 'cdt'
  | 'inversion';

// Tasas por defecto para cuentas (aprox. Colombia, puedes ajustarlas)
export const savingsDefaultRateByProduct: Partial<Record<ProductType, number>> = {
  ahorros: 6,   // 6% E.A. referencial para cuentas de ahorro
  corriente: 0, // muchas cuentas corrientes no generan rendimientos
};

// Opciones de tipo de crédito con sus tasas
export const creditRateOptions = [
  { value: 18, label: 'Crédito Libre Inversión — 18% E.A.' },
  { value: 13, label: 'Crédito Hipotecario — 13% E.A.' },
  { value: 20, label: 'Crédito de Vehículos — 20% E.A.' },
];

// Plazos típicos por tipo de crédito (según tasa)
export const termOptionsByCreditRate: Record<number, number[]> = {
  18: [6, 12, 24, 36, 48, 60],           // Libre inversión
  13: [60, 120, 180, 240, 360],          // Hipotecario
  20: [12, 24, 36, 48, 60, 72, 84],      // Vehículos
};

// Plazos y tasas típicas para CDT / Inversión
export const investmentTermOptionsByType: Record<
  'cdt' | 'inversion',
  { months: number; rate: number }[]
> = {
  cdt: [
    { months: 3, rate: 8.0 },
    { months: 6, rate: 8.5 },
    { months: 12, rate: 9.0 },
    { months: 18, rate: 9.5 },
    { months: 24, rate: 10.0 },
    { months: 36, rate: 10.5 },
  ],
  inversion: [
    { months: 3, rate: 7.5 },
    { months: 6, rate: 8.0 },
    { months: 12, rate: 8.5 },
    { months: 18, rate: 9.0 },
    { months: 24, rate: 9.5 },
    { months: 36, rate: 10.0 },
  ],
};
