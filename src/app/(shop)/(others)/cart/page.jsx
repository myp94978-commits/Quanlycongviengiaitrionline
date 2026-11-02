"use client";

import Link from "next/link";
import { useCart } from "@/context/useCart";
import CartItem from "@/components/shop/cart/CartItem";

export default function CartPage() {
  const { cartItems, cartCount, cartTotal, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng của bạn</h1>
            <p className="mt-2 text-gray-600">
              Bạn có {cartCount} sản phẩm trong giỏ.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Tiếp tục mua sắm
            </Link>
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 transition"
              >
                Xóa giỏ hàng
              </button>
            )}
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-600 mb-6">
              Thêm sản phẩm vào giỏ để bắt đầu mua sắm.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
            >
              Xem sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tổng tiền</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Số lượng</span>
                  <span>{cartCount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span>{new Intl.NumberFormat("vi-VN").format(cartTotal)} đ</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="mt-6 w-full inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-blue-700 transition"
              >
                Tiến hành thanh toán
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}