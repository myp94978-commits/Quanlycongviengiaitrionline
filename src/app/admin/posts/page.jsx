"use client";

import { useEffect, useState } from "react";
import { getPosts, deletePost } from "@/services/postService";
import { useRouter } from "next/navigation";
import AdminTable from "@/components/admin/AdminTable";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  // load data
  const loadData = async () => {
    try {
      const params = {};
      if (keyword) {
        params.search = keyword;
      }
      const res = await getPosts(params);
      setPosts(res.data || res);
    } catch (err) {
      console.error("Load posts error:", err);
      alert("Lỗi khi tải dữ liệu!");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // search
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      loadData();
    }
  };

  // delete
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Bạn có chắc muốn xoá?");
    if (!confirmDelete) return;

    try {
      await deletePost(id);
      alert("Xoá thành công!");
      loadData();
    } catch (err) {
      alert("Lỗi xoá!");
    }
  };

  // edit
  const handleEdit = (post) => {
    router.push(`/admin/posts/${post.id}/edit`);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Tiêu đề" },
    { key: "topic_name", label: "Chủ đề" },
    { key: "created_at", label: "Ngày tạo" },
  ];

  const tableData = posts.map(post => ({
    ...post,
    created_at: new Date(post.created_at).toLocaleDateString("vi-VN"),
    actions: (
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(post)}
          className="rounded-md bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-400"
        >
          Sửa
        </button>
        <button
          onClick={() => handleDelete(post.id)}
          className="rounded-md bg-rose-500 px-3 py-1 text-white transition hover:bg-rose-400"
        >
          Xóa
        </button>
      </div>
    ),
  }));

  return (
    <div style={{ padding: 20 }}>
      <h2>📝 Quản lý bài viết</h2>

      {/* FORM */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button
          onClick={() => router.push("/admin/posts/create")}
          style={{ backgroundColor: "#10b981", color: "white", padding: "8px 16px", border: "none", borderRadius: 4 }}
        >
          Thêm bài viết
        </button>

        <input
          placeholder="🔍 Tìm bài viết..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleSearch}
          style={{ padding: "8px 12px", border: "1px solid #ccc", borderRadius: 4, flex: 1 }}
        />
      </div>

      {/* TABLE */}
      <AdminTable columns={columns} data={tableData} />
    </div>
  );
}