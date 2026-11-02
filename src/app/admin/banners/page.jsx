"use client";

import { useEffect, useState } from "react";
import { getBanners, createBanner, deleteBanner, updateBanner } from "@/services/bannerService";
import AdminTable from "@/components/admin/AdminTable";

export default function BannersPage() {
  const [banners, setBanners] = useState([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [editId, setEditId] = useState(null);
  const [keyword, setKeyword] = useState("");

  // load data
  const loadData = async () => {
    try {
      const params = {};
      if (keyword) {
        params.search = keyword;
      }
      const res = await getBanners(params);
      setBanners(res.data || res);
    } catch (err) {
      console.error("Load banners error:", err);
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

  // submit
  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Nhập tên banner!");
      return;
    }

    try {
      const data = {
        name: name.trim(),
        link: link.trim(),
      };

      if (editId) {
        await updateBanner(editId, data);
        alert("Cập nhật thành công!");
      } else {
        await createBanner(data);
        alert("Thêm thành công!");
      }

      setName("");
      setLink("");
      setEditId(null);
      loadData();
    } catch (err) {
      console.error("Submit banner error:", err);
      alert("Lỗi khi lưu dữ liệu!");
    }
  };

  // delete
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Bạn có chắc muốn xoá?");
    if (!confirmDelete) return;

    try {
      await deleteBanner(id);
      alert("Xoá thành công!");
      loadData();
    } catch (err) {
      alert("Lỗi xoá!");
    }
  };

  // edit
  const handleEdit = (banner) => {
    setName(banner.name);
    setLink(banner.link || "");
    setEditId(banner.id);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Tên banner" },
    { key: "link", label: "Link" },
  ];

  const tableData = banners.map(banner => ({
    ...banner,
    actions: (
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(banner)}
          className="rounded-md bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-400"
        >
          Sửa
        </button>
        <button
          onClick={() => handleDelete(banner.id)}
          className="rounded-md bg-rose-500 px-3 py-1 text-white transition hover:bg-rose-400"
        >
          Xóa
        </button>
      </div>
    ),
  }));

  return (
    <div style={{ padding: 20 }}>
      <h2>🖼️ Quản lý banner</h2>

      {/* FORM */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          placeholder="Tên banner"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #ccc", borderRadius: 4, flex: 1 }}
        />

        <input
          placeholder="Link (tùy chọn)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #ccc", borderRadius: 4, flex: 1 }}
        />

        <button
          onClick={handleSubmit}
          style={{ backgroundColor: editId ? "#f59e0b" : "#10b981", color: "white", padding: "8px 16px", border: "none", borderRadius: 4 }}
        >
          {editId ? "Cập nhật" : "Thêm"}
        </button>

        <input
          placeholder="🔍 Tìm banner..."
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