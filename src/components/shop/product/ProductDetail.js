import Image from "next/image";
import { useCart } from "@/context/useCart";
import getImageSrc from "@/utils/getImageSrc";

export default function ProductDetail({ product }) {
    const { addToCart } = useCart();

    if (!product) return <p>Không tìm thấy sản phẩm</p>;

    const imageSrc = getImageSrc(product.image) || "https://via.placeholder.com/500x500?text=No+Image";
    const description = product.description || "Mô tả sản phẩm chưa có";

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-200">
                <div className="relative aspect-square w-full bg-gray-100">
                    <Image
                        src={imageSrc}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                    />
                </div>
            </div>

            <div className="space-y-6 rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h2>
                    {product.price != null && (
                        <p className="text-3xl font-semibold text-blue-600">
                            {new Intl.NumberFormat("vi-VN").format(product.price)} đ
                        </p>
                    )}
                </div>

                <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>{description}</p>
                    {product.short_description && <p>{product.short_description}</p>}
                </div>

                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full rounded-2xl bg-blue-600 px-6 py-4 text-white font-semibold hover:bg-blue-700 transition"
                >
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );
}