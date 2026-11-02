import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {products.map((p, index) => (
                <ProductCard key={p.id || p.product_id || index} product={p} />
            ))}
        </div>
    );
}