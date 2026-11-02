"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById, updateProduct } from "@/services/productService";
import CategorySelect from "@/components/common/CategorySelect";
import BrandSelect from "@/components/common/BrandSelect";

export default function UpdateProduct() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    cat_id: "",
    brand_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 load dữ liệu cũ
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductById(id);
        const data = res.data || res;

        setFormData({
          product_name: data.product_name || "",
          price: data.price || "",
          cat_id: data.cat_id || "",
          brand_id: data.brand_id || "",
        });
        setError("");
      } catch (err) {
        console.error("Fetch product error:", err);
        setError("Lỗi khi tải dữ liệu sản phẩm: " + (err?.response?.data?.message || err.message));
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // đổi input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // clear error when user edits
  };

  // submit
  const handleSubmit = async () => {
    // Validate
    if (!formData.product_name.trim()) {
      setError("Tên sản phẩm không được để trống!");
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError("Giá phải lớn hơn 0!");
      return;
    }
    if (!formData.cat_id) {
      setError("Vui lòng chọn danh mục!");
      return;
    }
    if (!formData.brand_id) {
      setError("Vui lòng chọn thương hiệu!");
      return;
    }

    setLoading(true);
    try {
      await updateProduct(id, formData);
      alert("✅ Cập nhật thành công!");
      router.push("/admin/products");
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      const errorMsg = err?.response?.data?.message || err.message || "Cập nhật thất bại";
      setError("❌ Lỗi cập nhật: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Sửa sản phẩm</h2>

      {error && (
        <div style={{
          background: "#fee",
          color: "#c00",
          padding: 12,
          borderRadius: 6,
          marginBottom: 20,
          border: "1px solid #fcc"
        }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: 15 }}>
        <label style={{ display: "block", marginBottom: 5, fontWeight: 500 }}>
          Tên sản phẩm *
        </label>
        <input
          name="product_name"
          value={formData.product_name}
          onChange={handleChange}
          placeholder="Nhập tên sản phẩm"
          style={{
            padding: 10,
            width: "100%",
            maxWidth: 400,
            border: "1px solid #ddd",
            borderRadius: 6,
          }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label style={{ display: "block", marginBottom: 5, fontWeight: 500 }}>
          Giá *
        </label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Nhập giá sản phẩm"
          style={{
            padding: 10,
            width: "100%",
            maxWidth: 400,
            border: "1px solid #ddd",
            borderRadius: 6,
          }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label style={{ display: "block", marginBottom: 5, fontWeight: 500 }}>
          Danh mục *
        </label>
        <CategorySelect
          name="cat_id"
          value={formData.cat_id}
          onChange={handleChange}
          style={{ width: "100%", maxWidth: 400 }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label style={{ display: "block", marginBottom: 5, fontWeight: 500 }}>
          Thương hiệu *
        </label>
        <BrandSelect
          name="brand_id"
          value={formData.brand_id}
          onChange={handleChange}
          style={{ width: "100%", maxWidth: 400 }}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          background: loading ? "#ccc" : "#007bff",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: 6,
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: 16,
        }}
      >
        {loading ? "⏳ Đang cập nhật..." : "✅ Cập nhật"}
      </button>
    </div>
  );
}