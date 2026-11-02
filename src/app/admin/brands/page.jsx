"use client";

import { useEffect, useState } from "react";
import { getBrands, createBrand, deleteBrand, updateBrand } from "@/services/brandService";
import AdminTable from "@/components/admin/AdminTable";

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getBrandId = (brand) => brand.id ?? brand.brand_id ?? brand._id;

  // load data
  const loadData = async () => {
    try {
      const params = {};
      if (keyword) {
        params.search = keyword;
      }
      const res = await getBrands(params);
      const data = res.data || res;
      setBrands(
        Array.isArray(data)
          ? data.map((brand) => ({
              ...brand,
              id: brand.brand_id ?? brand.id ?? brand._id,
              brand_id: brand.brand_id ?? brand.id ?? brand._id,
              name: brand.brand_name ?? brand.name ?? "",
            }))
          : []
      );
    } catch (err) {
      console.error("Load brands error:", err);
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
    const trimmedName = name.trim();

    // Validation
    if (!trimmedName) {
      setMessage("Vui lòng nhập tên thương hiệu!");
      return;
    }

    if (trimmedName.length < 2) {
      setMessage("Tên thương hiệu phải có ít nhất 2 ký tự!");
      return;
    }

    if (trimmedName.length > 100) {
      setMessage("Tên thương hiệu không được vượt quá 100 ký tự!");
      return;
    }

    // Check for special characters (allow letters, numbers, spaces, hyphens, apostrophes)
    const validNameRegex = /^[a-zA-Z0-9\s\-']+$/;
    if (!validNameRegex.test(trimmedName)) {
      setMessage("Tên thương hiệu chỉ được chứa chữ cái, số, khoảng trắng, dấu gạch ngang và dấu nháy đơn!");
      return;
    }

    // Check for duplicate names (case insensitive)
    const existingBrand = brands.find(brand =>
      brand.name?.toLowerCase() === trimmedName.toLowerCase() &&
      brand.id !== editId
    );
    if (existingBrand) {
      setMessage("Tên thương hiệu đã tồn tại!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      if (editId) {
        await updateBrand(editId, { brand_name: trimmedName });
        setMessage("Cập nhật thương hiệu thành công.");
      } else {
        await createBrand({ brand_name: trimmedName });
        setMessage("Thêm thương hiệu mới thành công.");
      }

      setName("");
      setEditId(null);
      await loadData();
    } catch (err) {
      console.error("Submit brand error:", err);
      const errorMessage = err?.message || err?.data?.error || err?.data?.message || "Lỗi khi lưu dữ liệu!";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // delete
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Bạn có chắc muốn xoá?");
    if (!confirmDelete) return;

    try {
      await deleteBrand(id);
      alert("Xoá thành công!");
      loadData();
    } catch (err) {
      alert("Lỗi xoá!");
    }
  };

  // edit
  const handleEdit = (brand) => {
    setName(brand.name || brand.brand_name || "");
    setEditId(getBrandId(brand));
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Tên thương hiệu" },
  ];

  const tableData = brands.map(brand => ({
    ...brand,
    actions: (
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(brand)}
          className="rounded-md bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-400"
        >
          Sửa
        </button>
        <button
          onClick={() => handleDelete(getBrandId(brand))}
          className="rounded-md bg-rose-500 px-3 py-1 text-white transition hover:bg-rose-400"
        >
          Xóa
        </button>
      </div>
    ),
  }));

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: 30,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{ margin: 0, fontSize: "28px", fontWeight: "bold" }}>🏷️ Quản lý thương hiệu</h2>
        <p style={{ margin: "8px 0 0 0", opacity: 0.9 }}>Thêm, sửa, xóa và quản lý các thương hiệu sản phẩm</p>
      </div>

      {/* FORM */}
      <div style={{
        background: "white",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: 30,
        border: "1px solid #e5e7eb"
      }}>
        <h3 style={{ margin: "0 0 20px 0", color: "#374151", fontSize: "20px", fontWeight: "600" }}>
          {editId ? "✏️ Chỉnh sửa thương hiệu" : "➕ Thêm thương hiệu mới"}
        </h3>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-end" }}>
          <div style={{ flex: "1 1 300px", minWidth: "250px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "500",
              color: "#374151",
              fontSize: "14px"
            }}>
              Tên thương hiệu *
            </label>
            <input
              type="text"
              placeholder="Nhập tên thương hiệu..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "16px",
                transition: "border-color 0.2s",
                outline: "none",
                color: "#111827"
              }}
              onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
              onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
            />
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                backgroundColor: editId ? "#f59e0b" : "#10b981",
                color: "white",
                padding: "12px 24px",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                minWidth: "120px",
                opacity: loading ? 0.7 : 1
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                }
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              {loading ? "⏳ Đang lưu..." : editId ? "💾 Cập nhật" : "➕ Thêm"}
            </button>

            {editId ? (
              <button
                onClick={() => {
                  setName("");
                  setEditId(null);
                  setMessage("");
                }}
                style={{
                  backgroundColor: "#6b7280",
                  color: "white",
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                ❌ Hủy
              </button>
            ) : null}
          </div>
        </div>

        {message ? (
          <div style={{
            marginTop: 16,
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            backgroundColor: message.includes("thành công") ? "#d1fae5" : "#fee2e2",
            color: message.includes("thành công") ? "#065f46" : "#991b1b",
            border: `1px solid ${message.includes("thành công") ? "#a7f3d0" : "#fecaca"}`
          }}>
            {message.includes("thành công") ? "✅" : "❌"} {message}
          </div>
        ) : null}
      </div>

      {/* SEARCH */}
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: 20,
        border: "1px solid #e5e7eb"
      }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <input
              type="text"
              placeholder="🔍 Tìm kiếm thương hiệu..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleSearch}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
              onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
            />
          </div>
          <button
            onClick={loadData}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "12px 20px",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            🔍 Tìm
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div style={{
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb",
        overflow: "hidden"
      }}>
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid #e5e7eb",
          backgroundColor: "#f9fafb"
        }}>
          <h3 style={{ margin: 0, color: "#374151", fontSize: "18px", fontWeight: "600" }}>
            📋 Danh sách thương hiệu ({brands.length})
          </h3>
        </div>
        <AdminTable columns={columns} data={tableData} />
      </div>
    </div>
  );
}