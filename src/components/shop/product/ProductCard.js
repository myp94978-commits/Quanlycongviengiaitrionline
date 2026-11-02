"use client";

import Image from "next/image";
import { useCart } from "@/context/useCart";
import getImageSrc from "@/utils/getImageSrc";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const imageSrc = getImageSrc(product.image || product.images?.[0] || product.image_url, product.name || product.product_name);
    
    const handleAddToCart = (event) => {
        event.preventDefault();
        addToCart(product);
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="aspect-square relative">
                <Image
                    src={imageSrc}
                    alt={product.name || "Sản phẩm"}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                    priority
                    unoptimized
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name || product.product_name || "Sản phẩm chưa có tên"}
                </h3>
                <p className="text-xl font-bold text-blue-600 mb-3">
                    {typeof (product.price ?? product.sale_price) === "number"
                        ? `${(product.price ?? product.sale_price).toLocaleString("vi-VN")} đ`
                        : "Liên hệ"}
                </p>
                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200 font-medium"
                >
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );
}