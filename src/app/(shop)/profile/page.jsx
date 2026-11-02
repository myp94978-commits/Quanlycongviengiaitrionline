"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/services/authService";

export default function ProfilePage() {
  const { user, setUser, isUserLoading } = useContext(AuthContext);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    user_address: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getDisplayField = (value) => (value ? value : "Chưa cập nhật");

  const normalizedUser = {
    id: user?.user_id ?? user?.id ?? user?._id,
    name: user?.user_name ?? user?.name,
    email: user?.user_email ?? user?.email,
    phone: user?.user_phone ?? user?.phone,
    address: user?.user_address ?? user?.address,
    type: user?.user_type ?? user?.type,
  };

  useEffect(() => {
    if (isUserLoading) {
      return;
    }

    if (!user) {
      router.push("/login");
      return;
    }

    // Ensure all form fields are initialized with valid values
    setFormData({
      user_name: user.user_name ?? user.name ?? "",
      user_email: user.user_email ?? user.email ?? "",
      user_phone: user.user_phone ?? "",
      user_address: user.user_address ?? user.address ?? "",
    });
  }, [user, isUserLoading, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      console.log("formData before processing:", formData);
      console.log("user object:", user);

      const userId = user?.user_id ?? user?.id ?? user?._id;
      if (!userId) {
        setMessage("❌ Lỗi: Không tìm thấy thông tin người dùng!");
        setLoading(false);
        return;
      }

      const payload = {
        user_id: userId,
        user_name:
          typeof formData.user_name === "string"
            ? formData.user_name.trim() || null
            : null,
        user_email:
          typeof formData.user_email === "string"
            ? formData.user_email.trim() || null
            : null,
        user_phone:
          typeof formData.user_phone === "string"
            ? formData.user_phone.trim() || null
            : null,
        user_address:
          typeof formData.user_address === "string"
            ? formData.user_address.trim() || null
            : null,
      };

      const hasUpdate = [
        payload.user_name,
        payload.user_email,
        payload.user_phone,
        payload.user_address,
      ].some((value) => value !== null);
      if (!hasUpdate) {
        setMessage("❌ Vui lòng nhập ít nhất một thông tin để cập nhật!");
        setLoading(false);
        return;
      }

      console.log("Final payload:", payload);

      const response = await updateProfile(payload);
      if (response && (response.data || response.user || response.message)) {
        const updatedUser = response.data || response.user || response;
        if (updatedUser && updatedUser.user_id) {
          setUser(updatedUser);
        }
        setMessage("✅ Cập nhật thông tin thành công!");
        setIsEditing(false);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("❌ Cập nhật thất bại!");
      }
    } catch (err) {
      console.error("Profile update error:", JSON.stringify(err, null, 2));
      const errorMsg = err?.message || err?.response?.data?.message || "Cập nhật thất bại";
      setMessage("❌ Lỗi: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <span className="text-3xl mr-2">👤</span>
            <span className="text-sm font-medium">Hồ sơ cá nhân</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Thông tin của bạn
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quản lý và cập nhật thông tin cá nhân của bạn một cách dễ dàng
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-pink-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            {message && (
              <div
                className={`p-6 rounded-2xl mb-8 border-2 ${
                  message.includes("✅")
                    ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200"
                    : "bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-red-200"
                }`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{message.includes("✅") ? "✅" : "❌"}</span>
                  <span className="font-semibold text-lg">{message}</span>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {/* User Info Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-2xl mr-2">📋</span>
                  Thông tin tài khoản
                </h2>

                {/* User ID - Read only */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="text-lg mr-2">🆔</span>
                    ID người dùng
                  </label>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 rounded-2xl border border-gray-200">
                    <span className="font-mono text-gray-700">{normalizedUser.id || "N/A"}</span>
                  </div>
                </div>

                {/* User Type - Read only */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="text-lg mr-2">👑</span>
                    Loại tài khoản
                  </label>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 rounded-2xl border border-indigo-200">
                    <span className="font-semibold text-indigo-700">
                      {normalizedUser.type === "admin" ? "👑 Quản trị viên" : "👤 Khách hàng"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Editable Form Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-2xl mr-2">✏️</span>
                  {isEditing ? "Chỉnh sửa thông tin" : "Thông tin cá nhân"}
                </h2>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="text-lg mr-2">👤</span>
                        Tên đầy đủ
                      </label>
                      <input
                        type="text"
                        name="user_name"
                        value={formData.user_name || ""}
                        onChange={handleChange}
                        placeholder="Nhập tên của bạn"
                        className="w-full px-4 py-3 border-2 border-indigo-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all bg-white/90 backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="text-lg mr-2">📧</span>
                        Email
                      </label>
                      <input
                        type="email"
                        name="user_email"
                        value={formData.user_email || ""}
                        onChange={handleChange}
                        placeholder="Nhập email của bạn"
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-400 transition-all bg-white/90 backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="text-lg mr-2">📱</span>
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        name="user_phone"
                        value={formData.user_phone || ""}
                        onChange={handleChange}
                        placeholder="Nhập số điện thoại"
                        className="w-full px-4 py-3 border-2 border-pink-100 rounded-2xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-400 transition-all bg-white/90 backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="text-lg mr-2">🏠</span>
                        Địa chỉ
                      </label>
                      <textarea
                        name="user_address"
                        value={formData.user_address || ""}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Nhập địa chỉ giao hàng"
                        className="w-full px-4 py-3 border-2 border-indigo-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all bg-white/90 backdrop-blur-sm resize-none"
                      ></textarea>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Đang lưu...
                          </>
                        ) : (
                          <>
                            <span>💾</span>
                            Lưu thay đổi
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            user_name: user?.user_name || "",
                            user_email: user?.user_email || "",
                            user_phone: user?.user_phone || "",
                            user_address: user?.user_address || "",
                          });
                        }}
                        className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:from-gray-500 hover:to-gray-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                      >
                        <span>❌</span>
                        Hủy
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="text-lg mr-2">👤</span>
                        Tên đầy đủ
                      </label>
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 rounded-2xl border border-gray-200">
                        <span className="text-gray-700">{getDisplayField(normalizedUser.name)}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="text-lg mr-2">📧</span>
                        Email
                      </label>
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 rounded-2xl border border-gray-200">
                        <span className="text-gray-700">{getDisplayField(normalizedUser.email)}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="text-lg mr-2">📱</span>
                        Số điện thoại
                      </label>
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 rounded-2xl border border-gray-200">
                        <span className="text-gray-700">{getDisplayField(normalizedUser.phone)}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="text-lg mr-2">🏠</span>
                        Địa chỉ
                      </label>
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 rounded-2xl border border-gray-200 min-h-[60px] flex items-center">
                        <span className="text-gray-700">{getDisplayField(normalizedUser.address)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                    >
                      <span>✏️</span>
                      Chỉnh sửa thông tin
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
