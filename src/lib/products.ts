import { Product } from "@/types/product";

export async function fetchProducts(userId: string): Promise<Product[]> {

    const mock: Product[] = [
        {
            id: 1,
            name: "Cuenta de Ahorro",
            alias: "Ahorro",
            balance: 1000000,
            currency: "COP",
            type: "ahorro",
        },
        {
            id: 2,
            name: "Cuenta Corriente",
            alias: "Corriente",
            balance: 500000,
            currency: "COP",
            type: "corriente",
        },
        {
            id: 3,
            name: "CDT",
            alias: "CDT",
            balance: 2000000,
            currency: "COP",
            type: "cdt",
        },
    ];

    // Simula una llamada a una API para obtener los productos
    return mock;
}
