export interface Product {
  id: string;
  userId: string;
  name: string;
  alias?: string;
  balance: number;
  currency: 'COP' | 'USD' | 'EUR';
  type: 'ahorros' | 'corriente' | 'cdt' | 'credito' | 'inversion';
}