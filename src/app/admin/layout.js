"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import Sidebar from "@/components/admin/Sidebar";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthProvider";
import { me } from "@/services/authService";

export default function AdminLayout({ children }) {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (user === null) {
        const token = localStorage.getItem('token');
        if (token && token !== "undefined") {
          try {
            const res = await me();
            const authenticatedUser =
              res?.user || res?.data?.user || res?.data || res;
            setUser(authenticatedUser);
          } catch (error) {
            console.error('Failed to fetch user:', error);
            router.push("/");
            return;
          }
        } else {
          router.push("/");
          return;
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [user, setUser, router]);

  useEffect(() => {
    if (!loading && (user === null || (user && (user.user_type !== "admin" && user.user_type !== "Admin" && user.user_type !== 1)))) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || user === null || (user && (user.user_type !== "admin" && user.user_type !== "Admin" && user.user_type !== 1))) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-72 border-r border-slate-700 bg-slate-900 shadow-2xl shadow-slate-950/20">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <AdminHeader />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-slate-950/60 px-6 py-6 sm:px-8 sm:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
