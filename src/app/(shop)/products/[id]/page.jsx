import ProductDetail from "@/components/shop/product/ProductDetail";
import { getProductById } from "@/services/productService";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  const { id } = params;

  let product = null;

  try {
    const response = await getProductById(id);
    product = response?.data || response?.product || response;
  } catch (error) {
    product = null;
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      <ProductDetail product={product} />
    </div>
  );
}
