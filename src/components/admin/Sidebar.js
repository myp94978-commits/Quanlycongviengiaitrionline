"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminMenu } from "@/data/adminMenu";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between bg-slate-950 px-5 py-6 text-slate-100">
      <div>
        <div className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-4 text-center shadow-xl shadow-slate-950/40">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Quản trị</p>
          <h2 className="mt-2 text-2xl font-semibold">PHAM THI MY</h2>
          <p className="mt-1 text-xs text-slate-400">Bảng điều khiển</p>
        </div>

        <nav className="space-y-1 text-sm">
          {adminMenu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-2xl px-4 py-3 transition-all duration-200 ${isActive ? "bg-slate-800 text-white shadow-lg shadow-slate-900/30" : "bg-slate-950 text-slate-300 hover:bg-slate-900 hover:text-white"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400 shadow-inner shadow-slate-950/20">
        <p className="font-semibold text-slate-100">Lưu ý</p>
        <p className="mt-2 leading-6 text-slate-400">Sử dụng menu bên trái để truy cập nhanh các trang quản lý sản phẩm, đơn hàng, người dùng và nội dung.</p>
      </div>
    </div>
  );
}