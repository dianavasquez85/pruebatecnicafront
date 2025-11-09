import type { Product } from "@/types/product";

export async function fetchProducts(userId: string): Promise<Product[]> {
  const res = await fetch(`http://localhost:3002/products/by-user/${userId}`);
  const products = await res.json();
    // Realiza una llamada a un microservicio que entrega los datos mock de productos
    return products;
}
