import { fetchProducts } from "../../lib/api/products";
import Products from "./Products";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {

  const userId = 'u003'; // Simulación de obtención del ID de usuario   
  const products = await fetchProducts(userId);

  return (
    <main className="container mt-4">
      <Products products={products} />
    </main>
  );
}
