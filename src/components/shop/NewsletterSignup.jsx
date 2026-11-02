"use client";

import { useState } from "react";
import { createContact } from "@/services/contactService";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Vui lòng nhập email");
      setStatus("");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setError("Email không hợp lệ");
      setStatus("");
      return;
    }

    setError("");
    setLoading(true);
    setStatus("Đang gửi đăng ký...");

    try {
      await createContact({
        title: "Đăng ký nhận tin khuyến mãi",
        content: "Khách hàng đăng ký nhận tin khuyến mãi",
        status: "pending",
        name: "Khách hàng nhận tin",
        email: trimmedEmail,
        phone: "",
      });

      setStatus("✅ Đăng ký thành công! Chúng tôi đã ghi nhận email của bạn.");
      setEmail("");
    } catch (err) {
      console.error("Newsletter signup error:", err);
      const message =
        err?.message ||
        err?.data?.message ||
        err?.data?.error ||
        "Đăng ký không thành công. Vui lòng thử lại sau.";
      setStatus(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Nhập email của bạn"
        className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Đang gửi..." : "Đăng ký"}
      </button>
      {error && <p className="text-red-100 mt-2 text-sm">{error}</p>}
      {status && !error && <p className="text-green-100 mt-2 text-sm">{status}</p>}
    </form>
  );
}
