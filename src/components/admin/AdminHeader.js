"use client";
import { useContext } from "react";
import { logout } from '@/services/authService';
import { AuthContext } from "@/context/AuthProvider";

export default function AdminHeader() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const initial = user?.username ? user.username.charAt(0).toUpperCase() : "A";

  return (
    <header className="border-b border-slate-800 bg-slate-950 text-slate-100 shadow-sm shadow-slate-950/30">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/20">
            {initial}
          </div>
          <div>
            <h2 className="text-xl font-semibold">Admin Panel</h2>
            <p className="text-sm text-slate-400">Quản lý website nhanh chóng, an toàn và trực quan</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 sm:max-w-xl sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 justify-end">
            <button className="relative rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 transition hover:border-indigo-500 hover:bg-slate-900/95">
              Thông báo
              <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-bold text-white">3</span>
            </button>
            <span className="hidden sm:inline text-sm text-slate-300">Xin chào, {user?.username || "Quản trị viên"}</span>
            <button onClick={handleLogout} className="rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-500">
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
