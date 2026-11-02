"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLink } from "@/services/linkService";

export default function CreateLinkPage() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !url.trim()) {
      setError("Vui lòng nhập tên và URL!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      await createLink({ 
        link_name: name,
        name: name,
        link_url: url,
        url: url,
      });
      alert("✅ Tạo liên kết thành công!");
      router.push("/admin/links");
    } catch (err) {
      console.error("❌ Create link failed:", err);
      setError(err?.data?.message || err?.message || "Lỗi khi tạo liên kết!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold text-white">Tạo liên kết mới</h1>
        <p className="mt-2 text-slate-400">Nhập tên và URL liên kết</p>
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
              Tên liên kết *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên liên kết"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              URL *
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-400 disabled:opacity-50"
            >
              {loading ? "Đang lưu..." : "Lưu liên kết"}
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
