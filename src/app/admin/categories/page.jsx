"use client";

import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/services/categoryService";

export default function CategoriesPage() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [keyword, setKeyword] = useState("");

  // load data
  const loadData = async () => {
    try {
      const res = await getCategories();
      setData(res.data || res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // submit
  const handleSubmit = async () => {
    if (!name) {
      alert("Nhập tên danh mục!");
      return;
    }

    try {
      if (editId) {
        await updateCategory(editId, { cat_name: name });
        alert("Cập nhật thành công!");
      } else {
        await createCategory({ cat_name: name });
        alert("Thêm thành công!");
      }

      setName("");
      setEditId(null);
      loadData();
    } catch (err) {
      alert("Lỗi API!");
    }
  };

  // delete
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Bạn có chắc muốn xoá?");
    if (!confirmDelete) return;

    try {
      await deleteCategory(id);
      alert("Xoá thành công!");
      loadData();
    } catch (err) {
      alert("Lỗi xoá!");
    }
  };

  // edit
  const handleEdit = (item) => {
    setName(item.cat_name);
    setEditId(item.cat_id);
  };

  // search
  const filtered = data.filter((c) =>
    c.cat_name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>📂 Quản lý danh mục</h2>

      {/* TOP */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <input
          placeholder="Tên danh mục"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleSubmit} style={btnAdd}>
          {editId ? "Cập nhật" : "Thêm"}
        </button>

        <input
          placeholder="🔍 Tìm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* TABLE */}
      <table style={table}>
        <thead style={{ background: "#007bff", color: "#fff" }}>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Tên</th>
            <th style={th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((item) => (
            <tr key={item.cat_id}>
              <td style={td}>{item.cat_id}</td>
              <td style={td}>{item.cat_name}</td>

              <td style={td}>
                <button
                  onClick={() => handleEdit(item)}
                  style={btnEdit}
                >
                  Sửa
</button>

                <button
                  onClick={() => handleDelete(item.cat_id)}
                  style={btnDelete}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// STYLE
const inputStyle = {
  padding: 8,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
  color: "#0f172a",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

const th = {
  padding: 10,
  borderBottom: "1px solid #ddd",
  color: "#0f172a",
};

const td = {
  padding: 10,
  borderBottom: "1px solid #eee",
  color: "#0f172a",
};

const btnAdd = {
  background: "#28a745",
  color: "#fff",
  border: "none",
  padding: "8px 15px",
  borderRadius: 6,
  cursor: "pointer",
};

const btnEdit = {
  background: "orange",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: 5,
  marginRight: 5,
};

const btnDelete = {
  background: "red",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: 5,
};