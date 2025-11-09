import type { Product } from "@/types/product";

export async function fetchProducts(userId: string): Promise<Product[]> {
  const res = await fetch(`http://localhost:3002/products/by-user/${userId}`);
  const products = await res.json();

    const mock: Product[] = [
  {
    "id": "001",
    "userId": "u001",
    "name": "Cuenta de Ahorros Nómina",
    "alias": "Principal",
    "balance": 1850000,
    "currency": "COP",
    "type": "ahorros"
  },
  {
    "id": "002",
    "userId": "u001",
    "name": "Cuenta de Ahorros Libre",
    "alias": "Viajes",
    "balance": 520000,
    "currency": "COP",
    "type": "ahorros"
  },
  {
    "id": "003",
    "userId": "u001",
    "name": "Cuenta Corriente Empresarial",
    "alias": "Oficina Central",
    "balance": 8900000,
    "currency": "COP",
    "type": "corriente"
  },
  {
    "id": "004",
    "userId": "u001",
    "name": "CDT Tradicional",
    "alias": "CDT 180 días",
    "balance": 3000000,
    "currency": "COP",
    "type": "cdt"
  },
  {
    "id": "005",
    "userId": "u001",
    "name": "Tarjeta de Crédito Clásica",
    "alias": "TC Compras",
    "balance": -2500000,
    "currency": "COP",
    "type": "credito"
  },
  {
    "id": "006",
    "userId": "u001",
    "name": "Cuenta AFC",
    "alias": "Ahorro vivienda",
    "balance": 7800000,
    "currency": "COP",
    "type": "ahorros"
  },
  {
    "id": "007",
    "userId": "u002",
    "name": "Cuenta de Ahorros Digital",
    "alias": "App Móvil",
    "balance": 1450000,
    "currency": "COP",
    "type": "ahorros"
  },
  {
    "id": "008",
    "userId": "u002",
    "name": "CDT Express",
    "alias": "CDT 90 días",
    "balance": 2000000,
    "currency": "COP",
    "type": "cdt"
  },
  {
    "id": "009",
    "userId": "u002",
    "name": "Fondo de Inversión Conservador",
    "alias": "Fondo Corto Plazo",
    "balance": 4800000,
    "currency": "COP",
    "type": "inversion"
  },
  {
    "id": "010",
    "userId": "u002",
    "name": "Tarjeta de Crédito Gold",
    "alias": "TC Viajes",
    "balance": -3500000,
    "currency": "COP",
    "type": "credito"
  },
  {
    "id": "011",
    "userId": "u002",
    "name": "Crédito de Vehículo",
    "alias": "Auto Familiar",
    "balance": -27000000,
    "currency": "COP",
    "type": "credito"
  },
  {
    "id": "012",
    "userId": "u002",
    "name": "Fondo de Inversión Moderado",
    "alias": "Fondo 2025",
    "balance": 10500000,
    "currency": "COP",
    "type": "inversion"
  },
  {
    "id": "013",
    "userId": "u002",
    "name": "Cuenta de Ahorros USD",
    "alias": "Cuenta Dólares",
    "balance": 1200,
    "currency": "USD",
    "type": "ahorros"
  },
  {
    "id": "014",
    "userId": "u003",
    "name": "Cuenta Corriente Premium",
    "alias": "Negocios",
    "balance": 6700000,
    "currency": "COP",
    "type": "corriente"
  },
  {
    "id": "015",
    "userId": "u003",
    "name": "Crédito Hipotecario",
    "alias": "Apartamento 80m²",
    "balance": -95000000,
    "currency": "COP",
    "type": "credito"
  },
  {
    "id": "016",
    "userId": "u003",
    "name": "CDT Creciente",
    "alias": "CDT largo plazo",
    "balance": 8500000,
    "currency": "COP",
    "type": "cdt"
  },
  {
    "id": "017",
    "userId": "u003",
    "name": "Fondo Acciones Global",
    "alias": "Inversión 2026",
    "balance": 9700000,
    "currency": "COP",
    "type": "inversion"
  },
  {
    "id": "018",
    "userId": "u003",
    "name": "Cuenta de Ahorros Universitaria",
    "alias": "Hija Ana",
    "balance": 350000,
    "currency": "COP",
    "type": "ahorros"
  },
  {
    "id": "019",
    "userId": "u003",
    "name": "Crédito de Libre Inversión",
    "alias": "Remodelación",
    "balance": -18000000,
    "currency": "COP",
    "type": "credito"
  },
  {
    "id": "020",
    "userId": "u003",
    "name": "Cuenta Pensión",
    "alias": "Retiro",
    "balance": 560000,
    "currency": "COP",
    "type": "ahorros"
  }
];

    // Simula una llamada a una API para obtener los productos
    return products;
}
