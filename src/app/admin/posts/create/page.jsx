"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/services/postService";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError("Vui lòng nhập tiêu đề và nội dung!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const payload = {
        post_title: title,
        title: title,
        post_content: content,
        content: content,
      };

      if (image.trim()) {
        payload.image = image;
        payload.post_image = image;
        payload.thumbnail = image;
      }

      await createPost(payload);
      alert("✅ Tạo bài viết thành công!");
      router.push("/admin/posts");
    } catch (err) {
      console.error("❌ Create post failed:", err);
      setError(err?.data?.message || err?.message || "Lỗi khi tạo bài viết!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold text-white">Tạo bài viết mới</h1>
        <p className="mt-2 text-slate-400">Nhập thông tin bài viết và nhấn lưu</p>
      </div>

      <div className="max-w-4xl rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Tiêu đề *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề bài viết"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nội dung *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập nội dung bài viết"
              rows="8"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Hình ảnh
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="URL hoặc tên file hình ảnh"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-400 disabled:opacity-50"
            >
              {loading ? "Đang lưu..." : "Lưu bài viết"}
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
