import React from "react";

const stats = [
  { label: "Sản phẩm", value: "248", desc: "Trong kho", accent: "from-cyan-500 to-blue-500" },
  { label: "Đơn hàng", value: "86", desc: "Hôm nay", accent: "from-fuchsia-500 to-pink-500" },
  { label: "Người dùng", value: "1,432", desc: "Hoạt động", accent: "from-emerald-500 to-teal-500" },
  { label: "Bài viết", value: "56", desc: "Đã xuất bản", accent: "from-violet-500 to-indigo-500" },
];

const activities = [
  { title: "Sản phẩm mới vào kho", value: "15", color: "bg-cyan-500/10 text-cyan-300" },
  { title: "Đơn hàng chờ xử lý", value: "8", color: "bg-fuchsia-500/10 text-fuchsia-300" },
  { title: "Bình luận mới", value: "12", color: "bg-emerald-500/10 text-emerald-300" },
];

const actions = [
  { title: "Quản lý sản phẩm", href: "/admin/products", color: "bg-slate-900/90 hover:bg-slate-800" },
  { title: "Quản lý đơn hàng", href: "/admin/orders", color: "bg-slate-900/90 hover:bg-slate-800" },
  { title: "Quản lý người dùng", href: "/admin/users", color: "bg-slate-900/90 hover:bg-slate-800" },
  { title: "Quản lý bài viết", href: "/admin/posts", color: "bg-slate-900/90 hover:bg-slate-800" },
];

export default function page() {
  return (
    <div className="space-y-8 pb-8">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950/95 via-slate-900/95 to-slate-950/95 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Dashboard</p>
            <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Chào mừng đến trang quản trị</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Quản lý toàn bộ nội dung website, đơn hàng, người dùng và sản phẩm trong một giao diện sạch sẽ, chuyên nghiệp và dễ thao tác.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-slate-800 bg-slate-900/90 px-4 py-2 text-sm text-slate-200">Online</span>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-200">3 thông báo mới</span>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">Hoạt động ổn định</span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/95 p-6 text-white shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:shadow-2xl">
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`}></div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
              <p className="mt-4 text-4xl font-semibold tracking-tight text-white">{item.value}</p>
              <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Bản tin hoạt động</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Theo dõi nhanh các cập nhật quan trọng và trạng thái vận hành hiện tại.</p>
            </div>
            <span className="inline-flex rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-200 ring-1 ring-indigo-500/20">Mới nhất</span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {activities.map((activity) => (
              <div key={activity.title} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-inner shadow-slate-950/30">
                <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${activity.color}`}>{activity.title}</div>
                <p className="mt-4 text-3xl font-semibold text-white">{activity.value}</p>
                <p className="mt-2 text-sm text-slate-400">Cập nhật cách đây vài phút</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/90 p-6 text-slate-300 shadow-inner shadow-slate-950/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Tình trạng hệ thống</h3>
                <p className="mt-2 text-sm text-slate-400">Mọi chức năng chính đều hoạt động ổn định.</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">Ổn định</span>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl bg-slate-950/80 p-4">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Độ tải CPU</span>
                  <span className="font-semibold text-white">38%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-2 w-3/10 rounded-full bg-cyan-500"></div>
                </div>
              </div>
              <div className="rounded-2xl bg-slate-950/80 p-4">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Đơn hàng hoàn thành</span>
                  <span className="font-semibold text-white">72%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-2 w-3/4 rounded-full bg-indigo-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-2xl shadow-black/30">
          <h2 className="text-2xl font-semibold text-white">Hành động nhanh</h2>
          <p className="mt-2 text-sm text-slate-400">Đi nhanh vào các trang quản lý chính bằng một cú nhấp.</p>
          <div className="mt-6 grid gap-4">
            {actions.map((action) => (
              <a
                key={action.href}
                href={action.href}
                className={`group rounded-3xl border border-slate-800 ${action.color} px-6 py-5 text-white shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-2xl`}
              >
                <p className="text-lg font-semibold text-white">{action.title}</p>
                <p className="mt-2 text-sm text-slate-400 group-hover:text-slate-200">Mở trang quản lý</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
