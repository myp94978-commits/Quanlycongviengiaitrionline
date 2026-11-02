"use client";

import Image from "next/image";
import { useCart } from "@/context/useCart";
import getImageSrc from "@/utils/getImageSrc";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const imageSrc = getImageSrc(item.image, item.name || item.product_name || item.title);

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-200 flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex items-center gap-4">
        <div className="h-28 w-28 overflow-hidden rounded-3xl bg-gray-100 relative">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={item.name || item.title || "Sản phẩm"}
              fill
              className="object-cover"
              unoptimized={true}
              onError={(e) => {
                e.target.src = "/images/placeholder.svg";
              }}
            />
          ) : (
            <Image
              src="/images/placeholder.svg"
              alt={item.name || item.title || "Sản phẩm"}
              fill
              className="object-cover"
              unoptimized={true}
            />
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{item.name || item.product_name || item.title}</h3>
          {item.price != null && (
            <p className="mt-2 text-sm text-blue-600 font-semibold">
              {new Intl.NumberFormat("vi-VN").format(item.price)} đ
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 md:ml-auto md:items-end">
        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2">
          <button
            type="button"
            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
            className="h-9 w-9 rounded-full bg-white text-gray-700 shadow-sm hover:bg-gray-100"
          >
            −
          </button>
          <span className="min-w-[2rem] text-center text-sm font-semibold">{item.quantity || 1}</span>
          <button
            type="button"
            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
            className="h-9 w-9 rounded-full bg-white text-gray-700 shadow-sm hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <div className="flex flex-col gap-3 text-right">
          <p className="text-sm text-gray-500">
            Tổng: {new Intl.NumberFormat("vi-VN").format((Number(item.price) || 0) * (item.quantity || 1))} đ
          </p>
          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
