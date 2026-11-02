"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Vui lòng nhập tên của bạn";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Tên phải có ít nhất 2 ký tự";
    }

    if (!formData.email.trim()) {
      errors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Vui lòng nhập chủ đề";
    }

    if (!formData.message.trim()) {
      errors.message = "Vui lòng nhập nội dung tin nhắn";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Tin nhắn phải có ít nhất 10 ký tự";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitStatus("Đang gửi...");
    setFormErrors({});

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
      ? process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "")
      : "http://localhost:5000/api";
    const requestData = {
      title:
        formData.subject.trim() ||
        `Liên hệ từ ${formData.name.trim() || "khách hàng"}`,
      content: formData.message.trim(),
      status: "pending",
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    };
    const endpoint = `${apiBaseUrl}/contacts`;

    try {
      let response;
      let result;
      let errorMessage = "❌ Gửi tin nhắn thất bại. Vui lòng thử lại sau.";

      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        result = await response.json().catch(() => null);
      } else if (response.status === 404) {
        errorMessage = "Đường dẫn gửi liên hệ không đúng. Vui lòng kiểm tra cấu hình backend.";
      } else {

        const responseText = await response.text();
        try {
          const parsed = JSON.parse(responseText);
          errorMessage = parsed.message || parsed.error || errorMessage;
        } catch {
          if (responseText) {
            errorMessage = responseText;
          }
        }

        if (response.status === 500) {
          errorMessage = "Server gặp lỗi khi xử lý liên hệ. Vui lòng liên hệ lại sau.";
        }

      }

      if (response?.ok) {
        setSubmitStatus("✅ Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSubmitStatus(""), 5000);
      } else {
        setSubmitStatus(errorMessage);
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      setSubmitStatus("❌ Lỗi kết nối. Vui lòng kiểm tra internet và thử lại.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            📞 Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ để được tư vấn tốt nhất
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-all duration-300">
            <div className="text-6xl mb-4">📍</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Địa Chỉ</h3>
            <p className="text-gray-600 leading-relaxed">
              123 Đường ABC, Quận 1<br />
              TP. Hồ Chí Minh, Việt Nam
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-all duration-300">
            <div className="text-6xl mb-4">📞</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Điện Thoại</h3>
            <p className="text-gray-600 leading-relaxed">
              Hotline: 1900 XXX XXX<br />
              Mobile: 0123 456 789
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-all duration-300">
            <div className="text-6xl mb-4">📧</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Email</h3>
            <p className="text-gray-600 leading-relaxed">
              support@phamthimy.com<br />
              info@phamthimy.com
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-4xl font-bold mb-8 text-gray-800">💬 Gửi Tin Nhắn</h2>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    👤 Tên của bạn *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nhập tên đầy đủ"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 transition-all text-lg ${
                      formErrors.name ? "border-red-500" : "border-gray-200 focus:border-blue-500"
                    }`}
                    required
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    📧 Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 transition-all text-lg ${
                      formErrors.email ? "border-red-500" : "border-gray-200 focus:border-blue-500"
                    }`}
                    required
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    📞 Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0123 456 789"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    📋 Chủ đề *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Chủ đề liên hệ"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 transition-all text-lg ${
                      formErrors.subject ? "border-red-500" : "border-gray-200 focus:border-blue-500"
                    }`}
                    required
                  />
                  {formErrors.subject && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  💭 Nội dung tin nhắn *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hãy chia sẻ điều bạn muốn hỏi hoặc góp ý..."
                  rows="6"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 transition-all text-lg resize-none ${
                    formErrors.message ? "border-red-500" : "border-gray-200 focus:border-blue-500"
                  }`}
                  required
                ></textarea>
                {formErrors.message && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                )}
              </div>

              {submitStatus && (
                <div className={`p-4 rounded-xl flex items-center ${
                  submitStatus.includes("✅")
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : submitStatus.includes("❌")
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-blue-50 text-blue-700 border border-blue-200"
                }`}>
                  <span className="text-2xl mr-3">
                    {submitStatus.includes("✅") ? "✅" : submitStatus.includes("❌") ? "❌" : "⏳"}
                  </span>
                  <p className="font-medium text-lg">{submitStatus}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitStatus === "Đang gửi..."}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🚀 Gửi Tin Nhắn
              </button>
            </form>
          </div>

          {/* Map and Additional Info */}
          <div className="space-y-8">
            {/* Google Maps Embed */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800">🗺️ Vị Trí Của Chúng Tôi</h3>
              <div className="bg-white p-4 rounded-2xl shadow-xl">
                <iframe
                  src="https://maps.google.com/maps?q=Ho%20Chi%20Minh%20City%2C%20Vietnam&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">🕒 Giờ Làm Việc</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Thứ Hai - Thứ Sáu</span>
                  <span className="text-blue-600 font-semibold">8:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Thứ Bảy</span>
                  <span className="text-blue-600 font-semibold">8:00 - 12:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Chủ Nhật</span>
                  <span className="text-red-500 font-semibold">Đóng cửa</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">🌐 Theo Dõi Chúng Tôi</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  📘
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                >
                  📷
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                >
                  🐦
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  📺
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            ❓ Câu Hỏi Thường Gặp
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  🚚 Thời gian giao hàng là bao lâu?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Thời gian giao hàng thường từ 2-5 ngày làm việc tùy thuộc vào địa điểm.
                  Chúng tôi sẽ thông báo cụ thể sau khi bạn đặt hàng.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  💰 Chính sách đổi trả như thế nào?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Chúng tôi chấp nhận đổi trả trong vòng 7 ngày với sản phẩm còn nguyên seal.
                  Vui lòng liên hệ hotline để được hỗ trợ.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  💳 Có thể thanh toán bằng cách nào?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Chúng tôi chấp nhận thanh toán bằng tiền mặt, chuyển khoản,
                  thẻ tín dụng và các ví điện tử phổ biến.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  📞 Làm sao để liên hệ hỗ trợ?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Bạn có thể liên hệ qua hotline 1900 XXX XXX hoặc gửi email đến
                  support@phamthimy.com. Chúng tôi sẽ phản hồi trong 24h.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
