import { products } from "@/data/products";
import ProductList from "@/components/shop/product/ProductList";

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-2xl text-center font-bold mb-5">Trang Sản Phẩm</h1>
      <ProductList products={products} />
    </div>
  );
}
