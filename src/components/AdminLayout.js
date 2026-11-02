"use client"
import AdminHeader from "@/components/admin/AdminHeader";
import Sidebar from "@/components/admin/Sidebar";
import Footer from "@/components/shop/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (!savedUser || savedUser === "undefined") {
            router.push("/shop/auth/login");
            return;
        }
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser.user_type !== "admin" && parsedUser.user_type !== "Admin" && parsedUser.user_type !== 1) {
            router.push("/");
            return;
        }
        setLoading(false);
    }, [router]);

    if (loading) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <AdminHeader />
      <div className="flex">
        <aside className="w-64 border-r border-slate-800 bg-slate-900">
          <Sidebar />
        </aside>
        <main className="flex-1 p-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
