"use client";

import { useEffect, useState } from "react";
import { getTopics, createTopic, deleteTopic, updateTopic } from "@/services/topicService";
import AdminTable from "@/components/admin/AdminTable";

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [keyword, setKeyword] = useState("");

  // load data
  const loadData = async () => {
    try {
      const params = {};
      if (keyword) {
        params.search = keyword;
      }
      const res = await getTopics(params);
      setTopics(res.data || res);
    } catch (err) {
      console.error("Load topics error:", err);
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
      alert("Nhập tên chủ đề!");
      return;
    }

    try {
      if (editId) {
        await updateTopic(editId, { name: name.trim() });
        alert("Cập nhật thành công!");
      } else {
        await createTopic({ name: name.trim() });
        alert("Thêm thành công!");
      }

      setName("");
      setEditId(null);
      loadData();
    } catch (err) {
      console.error("Submit topic error:", err);
      alert("Lỗi khi lưu dữ liệu!");
    }
  };

  // delete
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Bạn có chắc muốn xoá?");
    if (!confirmDelete) return;

    try {
      await deleteTopic(id);
      alert("Xoá thành công!");
      loadData();
    } catch (err) {
      alert("Lỗi xoá!");
    }
  };

  // edit
  const handleEdit = (topic) => {
    setName(topic.name);
    setEditId(topic.id);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Tên chủ đề" },
  ];

  const tableData = topics.map(topic => ({
    ...topic,
    actions: (
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(topic)}
          className="rounded-md bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-400"
        >
          Sửa
        </button>
        <button
          onClick={() => handleDelete(topic.id)}
          className="rounded-md bg-rose-500 px-3 py-1 text-white transition hover:bg-rose-400"
        >
          Xóa
        </button>
      </div>
    ),
  }));

  return (
    <div style={{ padding: 20 }}>
      <h2>📂 Quản lý chủ đề</h2>

      {/* FORM */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          placeholder="Tên chủ đề"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #ccc", borderRadius: 4, flex: 1 }}
        />

        <button
          onClick={handleSubmit}
          style={{ backgroundColor: editId ? "#f59e0b" : "#10b981", color: "white", padding: "8px 16px", border: "none", borderRadius: 4 }}
        >
          {editId ? "Cập nhật" : "Thêm"}
        </button>

        <input
          placeholder="🔍 Tìm chủ đề..."
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