"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import Sidebar from "@/components/admin/Sidebar";
import Footer from "@/components/shop/Footer";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthProvider";

export default function AdminLayout({ children }) {
  const { user, isUserLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Nếu chưa login hoặc không phải admin → redirect
    if (!isUserLoading && (!user || user.user_type !== "admin")) {
      router.push("/"); // hoặc page "Không đủ quyền"
    }
  }, [user, isUserLoading, router]);
  if (isUserLoading) return <p>Loading...</p>;

  // Nếu chưa login hoặc không phải admin → không render children
  if (!user || user.user_type !== "admin") {
    return null; // hoặc <p>Loading...</p>
  }

  return (
    <>
      <AdminHeader />
      <div className="flex bg-gradient-to-br from-slate-100 via-white to-slate-200 min-h-screen">
        <aside className="w-64 shadow-xl border-r border-slate-300 bg-gradient-to-b from-white to-slate-50">
          <Sidebar />
        </aside>
        <main className="flex-1 p-8 bg-white shadow-inner rounded-l-2xl">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
