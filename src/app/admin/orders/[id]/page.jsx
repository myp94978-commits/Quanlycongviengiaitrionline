"use client";
import { useEffect, useState } from "react";
import { getOrderById, updateOrderStatus } from "@/services/orderService";
import { useRouter, useParams } from "next/navigation";

export default function EditOrderPage() {
  const { id } = useParams();
  const router = useRouter();
  const [status, setStatus] = useState("pending");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const statusLabels = {
    pending: "Đang xử lý",
    confirmed: "Đã xác nhận",
    shipped: "Đã gửi",
    delivered: "Đã giao",
    cancelled: "Đã hủy",
    0: "Đang xử lý",
    1: "Đã xác nhận",
    2: "Đã gửi",
    3: "Đã giao",
    4: "Đã hủy",
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrderData(data.data);
        // Map Vietnamese / numeric status to English
        const statusMap = {
          "Đang xử lý": "pending",
          "Đã xác nhận": "confirmed",
          "Đã gửi": "shipped",
          "Đã giao": "delivered",
          "Đã hủy": "cancelled",
          0: "pending",
          1: "confirmed",
          2: "shipped",
          3: "delivered",
          4: "cancelled",
        };
        const currentStatus = data.data.status ?? "Đang xử lý";
        setStatus(statusMap[currentStatus] || "pending");
        setLoading(false);
      } catch (error) {
        setErrors({ message: "Lỗi khi tải đơn hàng" });
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      // Map English status back to Vietnamese
      const statusCodeMap = {
        pending: 0,
        confirmed: 1,
        shipped: 2,
        delivered: 3,
        cancelled: 4,
      };
      const resolvedUserId =
        orderData?.user_id ??
        orderData?.user?.id ??
        orderData?.user?.user_id ??
        orderData?.user ??
        orderData?.user_name ??
        orderData?.userName;
      const numericUserId = Number(resolvedUserId);
      const resolvedTotal =
        orderData?.total_price ?? orderData?.total ?? orderData?.totalPrice;

      const updateData = {
        user_id: !isNaN(numericUserId) ? numericUserId : undefined,
        total: Number(resolvedTotal || 0),
        status: statusCodeMap[status] ?? status,
      };

      console.log("Sending update data:", updateData); // Debug log
      await updateOrderStatus(id, updateData);
      setSuccess("Cập nhật trạng thái đơn hàng thành công!");
      setTimeout(() => {
        router.push("/admin/orders");
      }, 1500);
    } catch (error) {
      console.error("❌ Update failed:", error);
      const errorMessage =
        error?.data?.error ||
        error?.data?.message ||
        error?.message ||
        "Lỗi khi cập nhật đơn hàng";
      setErrors({ message: errorMessage });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <p className="text-gray-600">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Chỉnh sửa đơn hàng</h1>
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-700 text-sm"
        >
          ← Quay lại
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
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
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg transition font-medium"
                >
                  {isSaving ? "Đang cập nhật..." : "Cập nhật trạng thái"}
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

        {/* Info Panel */}
        {orderData && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold mb-4">Thông tin đơn hàng</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">ID Đơn hàng</p>
                <p className="font-medium">{orderData.id}</p>
              </div>
              <div>
                <p className="text-gray-600">Người dùng</p>
                <p className="font-medium">{orderData.user_id}</p>
              </div>
              <div>
                <p className="text-gray-600">Tổng tiền</p>
                <p className="font-medium">{orderData.total_price?.toLocaleString("vi-VN")} ₫</p>
              </div>
              <div>
                <p className="text-gray-600">Trạng thái hiện tại</p>
                <p className="font-medium">
                  {statusLabels[orderData.status] ?? orderData.status}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Ngày tạo</p>
                <p className="font-medium">
                  {new Date(orderData.created_at).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
