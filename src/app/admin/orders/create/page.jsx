"use client";
import { useState } from "react";
import { createOrder } from "@/services/orderService";
import { useRouter } from "next/navigation";

export default function CreateOrderPage() {
  const [userId, setUserId] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    if (!userId.trim()) {
      newErrors.userId = "Vui lòng nhập ID người dùng";
    }
    if (!totalPrice.trim()) {
      newErrors.totalPrice = "Vui lòng nhập tổng tiền";
    } else if (isNaN(totalPrice) || parseFloat(totalPrice) <= 0) {
      newErrors.totalPrice = "Tổng tiền phải là số dương";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validateForm();

    if (Object.keys(validateErrors).length !== 0) {
      setErrors(validateErrors);
      return;
    }

    try {
      setLoading(true);
      await createOrder({
        user_id: userId.trim(),
        total: parseFloat(totalPrice),
        status: status,
      });
      setSuccess("Tạo đơn hàng thành công!");
      setTimeout(() => {
        router.push("/admin/orders");
      }, 1500);
    } catch (error) {
      console.error("❌ Create failed:", error);
      const errorMessage =
        error?.data?.error ||
        error?.data?.message ||
        error?.message ||
        "Lỗi khi tạo đơn hàng";
      setErrors({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Tạo đơn hàng mới</h1>
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-700 text-sm"
        >
          ← Quay lại
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
        {errors.message && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600 mb-4">
            {errors.message}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-600 mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID Người dùng *
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Nhập ID người dùng"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
            {errors.userId && (
              <p className="text-red-500 text-xs mt-1">{errors.userId}</p>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tổng tiền *
            </label>
            <input
              type="number"
              step="0.01"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              placeholder="Nhập tổng tiền"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
            {errors.totalPrice && (
              <p className="text-red-500 text-xs mt-1">{errors.totalPrice}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            >
              <option value="pending">Chờ xử lý</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="shipped">Đã gửi</option>
              <option value="delivered">Đã giao</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg transition font-medium"
            >
              {loading ? "Đang tạo..." : "Tạo đơn hàng"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition font-medium"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
