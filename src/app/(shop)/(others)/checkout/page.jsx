"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/useCart";
import { AuthContext } from "@/context/AuthProvider";
import { createOrder } from "@/services/orderService";
import getImageSrc from "@/utils/getImageSrc";
import Link from "next/link";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useContext(AuthContext);
  const [storedUser, setStoredUser] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    if (typeof window !== "undefined" && !user) {
      const savedUser = localStorage.getItem("user");
      if (savedUser && savedUser !== "undefined") {
        try {
          setStoredUser(JSON.parse(savedUser));
        } catch (error) {
          console.warn("Không decode được user từ localStorage", error);
        }
      }
    }
  }, [user]);

  const activeUser = user || storedUser;

  const getUserId = (userObject) => {
    if (!userObject || typeof userObject !== "object") return 0;

    const candidates = [
      userObject.user_id,
      userObject.id,
      userObject._id,
      userObject.user?.user_id,
      userObject.user?.id,
      userObject.data?.user_id,
      userObject.data?.id,
      userObject.user?.id,
      userObject.user?._id,
    ];

    for (const candidate of candidates) {
      const numeric = Number(candidate);
      if (!Number.isNaN(numeric) && numeric > 0) {
        return numeric;
      }
    }

    return 0;
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    paymentMethod: "cod",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ tên";
    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!formData.address.trim()) newErrors.address = "Vui lòng nhập địa chỉ";
    if (!formData.city.trim()) newErrors.city = "Vui lòng nhập thành phố";
    if (!formData.district.trim()) newErrors.district = "Vui lòng nhập quận/huyện";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userId = getUserId(activeUser);
    if (!userId) {
      alert("❌ Bạn cần đăng nhập để đặt hàng. Vui lòng đăng nhập và thử lại.");
      return;
    }

    setLoading(true);
    try {
      // Prepare order data to match backend API structure
      const orderData = {
        user_id: userId,
        customer_name: formData.name,
        address: `${formData.address}, ${formData.district}, ${formData.city}`,
        phone: formData.phone,
        email: formData.email,
        total: cartTotal,
        note: formData.notes,
        status: 0,
        trash: 0,
        details: cartItems.map((item) => ({
          product_id: item.product_id || item.id,
          product_name: item.name,
          product_image: item.image || "",
          price: Number(item.price) || 0,
          quantity: Number(item.quantity) || 1,
        })),
      };

      console.log("📦 Submitting order:", orderData);

      // Call API to create order
      const response = await createOrder(orderData);
      console.log("✅ Order created successfully:", response);

      // Clear cart and redirect
      clearCart();
      router.push("/checkout/success");
    } catch (error) {
      console.error("❌ Checkout error:", {
        message: error?.message,
        status: error?.status,
        data: error?.data,
        fullError: error?.fullError,
      });
      
      const errorMsg = 
        error?.data?.error ||
        error?.data?.message ||
        error?.fullError?.response?.data?.error ||
        error?.fullError?.response?.data?.message ||
        error?.message ||
        "Có lỗi xảy ra khi đặt hàng";
      
      alert(`❌ Lỗi: ${errorMsg}\n\nKiểm tra xem backend (port 5000) có chạy không?`);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h1>
            <p className="text-gray-600 mb-6">Bạn cần thêm sản phẩm vào giỏ trước khi thanh toán.</p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
            >
              Mua sắm ngay
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>
          <p className="mt-2 text-gray-600">Hoàn tất đơn hàng của bạn</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left Column - Form */}
          <div className="space-y-8">
            {/* Customer Information */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Thông tin giao hàng</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Nhập họ và tên"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Nhập email"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Nhập số điện thoại"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thành phố *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Nhập thành phố"
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quận/Huyện *
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.district ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Nhập quận/huyện"
                  />
                  {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ chi tiết *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nhập địa chỉ chi tiết"
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú (tùy chọn)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ghi chú về đơn hàng"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Phương thức thanh toán</h2>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleInputChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-900">Thanh toán khi nhận hàng (COD)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === "bank"}
                    onChange={handleInputChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-900">Chuyển khoản ngân hàng</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="momo"
                    checked={formData.paymentMethod === "momo"}
                    onChange={handleInputChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-900">Ví điện tử MoMo</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={getImageSrc(item.image, item.name)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {new Intl.NumberFormat("vi-VN").format((item.price || 0) * (item.quantity || 1))} đ
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính</span>
                  <span className="text-gray-900">{new Intl.NumberFormat("vi-VN").format(cartTotal)} đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span className="text-gray-900">Miễn phí</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Tổng cộng</span>
                  <span className="text-blue-600">{new Intl.NumberFormat("vi-VN").format(cartTotal)} đ</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-3xl bg-blue-600 px-6 py-4 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Đang xử lý...
                </div>
              ) : (
                "Đặt hàng"
              )}
            </button>

            <Link
              href="/cart"
              className="block text-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Quay lại giỏ hàng
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
