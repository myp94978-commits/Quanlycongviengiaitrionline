"use client";

import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">Đặt hàng thành công!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.
          </p>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Thông tin đơn hàng</h2>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Mã đơn hàng:</span>
                <span className="font-medium text-gray-900">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trạng thái:</span>
                <span className="font-medium text-blue-600">Đang xử lý</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thời gian giao hàng dự kiến:</span>
                <span className="font-medium text-gray-900">2-3 ngày làm việc</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              Bạn sẽ nhận được email xác nhận đơn hàng trong vài phút tới.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
              >
                Tiếp tục mua sắm
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                Xem đơn hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
