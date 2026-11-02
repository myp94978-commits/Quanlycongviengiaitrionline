"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/services/userService";

export default function CreateUserPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ tên đăng nhập, email và mật khẩu!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const payload = {
        username: username.trim(),
        user_name: username.trim(),
        email: email.trim(),
        user_type: userType,
        type: userType,
        pass: password,
        password: password,
      };

      await createUser(payload);
      alert("✅ Tạo người dùng thành công!");
      router.push("/admin/users");
    } catch (err) {
      console.error("❌ Create user failed:", err);
      setError(err?.data?.message || err?.message || "Lỗi khi tạo người dùng!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold text-white">Tạo người dùng mới</h1>
        <p className="mt-2 text-slate-400">Nhập thông tin người dùng và nhấn lưu</p>
      </div>

      <div className="max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Tên đăng nhập *
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Mật khẩu *
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Loại người dùng
            </label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-400 disabled:opacity-50"
            >
              {loading ? "Đang lưu..." : "Lưu người dùng"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg bg-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-600"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
