import { fetchProducts } from "@/lib/products";
import { use } from "react";
import Products from "./Products";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {

  const userId = '12345'; // Simulación de obtención del ID de usuario   
  const products = await fetchProducts(userId);

  return (
    <main className="container mt-4">
      <h1 className="mb-4">Mis Productos</h1>
      <Products products={products} />
    </main>
  );
}

