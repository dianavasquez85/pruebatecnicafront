export interface Product {
  id: number;
  name: string;
  alias?: string;
  balance: number;
  currency: 'COP' | 'USD' | 'EUR';
  type: 'ahorro' | 'corriente' | 'cdt';
}