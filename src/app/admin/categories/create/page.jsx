"use client";

import { useState } from "react";

export default function CreateCategory() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let saved = localStorage.getItem("categories");
    let data = (saved && saved !== "undefined") ? JSON.parse(saved) : [];

    data.push({
      id: Date.now(),
      name,
    });

    localStorage.setItem("categories", JSON.stringify(data));

    alert("Thêm thành công!");
    window.location.href = "/admin/categories";
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Thêm danh mục</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Tên danh mục"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}