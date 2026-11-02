"use client";

import { useEffect, useState } from "react";
import { getLinks, createLink, deleteLink, updateLink } from "@/services/linkService";
import AdminTable from "@/components/admin/AdminTable";

export default function LinksPage() {
  const [links, setLinks] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [editId, setEditId] = useState(null);
  const [keyword, setKeyword] = useState("");

  const getLinkId = (link) => link.id ?? link.link_id ?? link._id;

  // load data
  const loadData = async () => {
    try {
      const params = {};
      if (keyword) {
        params.search = keyword;
      }
      const res = await getLinks(params);
      const data = res.data || res;
      setLinks(
        Array.isArray(data)
          ? data.map((link) => ({
              ...link,
              id: getLinkId(link),
              link_id: getLinkId(link),
              name: link.name ?? link.link_name ?? "",
              url: link.url ?? link.link_url ?? "",
            }))
          : []
      );
    } catch (err) {
      console.error("Load links error:", err);
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
    if (!name.trim() || !url.trim()) {
      alert("Nhập đầy đủ tên và URL!");
      return;
    }

    try {
      const data = {
        name: name.trim(),
        url: url.trim(),
      };

      if (editId) {
        await updateLink(editId, data);
        alert("Cập nhật thành công!");
      } else {
        await createLink(data);
        alert("Thêm thành công!");
      }

      setName("");
      setUrl("");
      setEditId(null);
      loadData();
    } catch (err) {
      console.error("Submit link error:", err);
      alert("Lỗi khi lưu dữ liệu!");
    }
  };

  // delete
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Bạn có chắc muốn xoá?");
    if (!confirmDelete) return;

    try {
      await deleteLink(id);
      alert("Xoá thành công!");
      loadData();
    } catch (err) {
      alert("Lỗi xoá!");
    }
  };

  // edit
  const handleEdit = (link) => {
    setName(link.name ?? "");
    setUrl(link.url ?? "");
    setEditId(getLinkId(link));
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Tên" },
    { key: "url", label: "URL" },
  ];

  const tableData = links.map(link => ({
    ...link,
    actions: (
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(link)}
          className="rounded-md bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-400"
        >
          Sửa
        </button>
        <button
          onClick={() => handleDelete(getLinkId(link))}
          className="rounded-md bg-rose-500 px-3 py-1 text-white transition hover:bg-rose-400"
        >
          Xóa
        </button>
      </div>
    ),
  }));

  return (
    <div style={{ padding: 20 }}>
      <h2>🔗 Quản lý liên kết</h2>

      {/* FORM */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          placeholder="Tên liên kết"
          value={name ?? ""}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #ccc", borderRadius: 4, flex: 1 }}
        />

        <input
          placeholder="URL"
          value={url ?? ""}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #ccc", borderRadius: 4, flex: 1 }}
        />

        <button
          onClick={handleSubmit}
          style={{ backgroundColor: editId ? "#f59e0b" : "#10b981", color: "white", padding: "8px 16px", border: "none", borderRadius: 4 }}
        >
          {editId ? "Cập nhật" : "Thêm"}
        </button>

        <input
          placeholder="🔍 Tìm liên kết..."
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