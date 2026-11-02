"use client";

import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "@/services/productService";
import { useRouter } from "next/navigation";
import Pagination from "@/components/common/Pagination"; // import phân trang

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);          // trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // tổng số trang
  const router = useRouter();

  // load data
  const loadData = async (currentPage = 1, searchKeyword = "") => {
    try {
      const params = { page: currentPage, limit: 5 };
      if (searchKeyword) {
        params.search = searchKeyword;
      }
      const res = await getProducts(params);
      const list = res?.data || res?.items || res?.products || res || [];
      setProducts(Array.isArray(list) ? list : []);
      setTotalPages(res?.totalPages || res?.totalPage || 1);
    } catch (err) {
      console.error("Load products error:", err);
      alert("Lỗi khi tải dữ liệu!");
    }
  };

  // Chỉ gọi API khi page đổi
  useEffect(() => {
    loadData(page, keyword);
  }, [page, keyword]);

  // Search - reset page về 1 khi tìm kiếm
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setPage(1);
      setKeyword(e.target.value);
    }
  };

  // delete - reload trang hiện tại sau khi xóa
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Bạn có chắc muốn xoá?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      alert("✅ Xoá thành công!");
      // Reload data của trang hiện tại
      await loadData(page, keyword);
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Lỗi xoá: " + (err?.response?.data?.message || err.message));
    }
  };

  // Không cần filter local nữa, vì backend xử lý search
  const filteredProducts = products;

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>📦 Quản lý sản phẩm</h2>

      {/* TOP BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <input
          placeholder="🔍 Tìm sản phẩm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleSearch}
          style={{
            padding: 8,
            width: 250,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={() => router.push("/admin/products/create")}
          style={{
            background: "#007bff",
            color: "#fff",
            padding: "8px 15px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          ➕ Thêm sản phẩm
        </button>
      </div>

      {/* TABLE */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          color: "#0f172a",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead style={{ background: "#f5f5f5" }}>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Tên</th>
            <th style={th}>Giá</th>
            <th style={th}>Category</th>
            <th style={th}>Brand</th>
            <th style={th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((p, index) => (
            <tr key={p.product_id || p.id || index}>
              <td style={td}>{p.product_id || p.id}</td>
              <td style={td}>{p.product_name || p.name}</td>
              <td style={td}>{p.price}</td>
              <td style={td}>{p.cat_name || p.cat_id}</td>
              <td style={td}>{p.brand_name || p.brand_id}</td>

              <td style={td}>
                <button
                  onClick={() =>
                    router.push(`/admin/products/${p.product_id}`)
                  }
                  style={btnEdit}
                >
                  ✏️ Sửa
                </button>

                <button
                  onClick={() => handleDelete(p.product_id)}
                  style={btnDelete}
                >
                  🗑️ Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <Pagination page={page} totalPages={totalPages} onChangePage={setPage} />
    </div>
  );
}

// style
const th = {
  padding: 10,
  borderBottom: "1px solid #ddd",
  textAlign: "left",
  color: "#0f172a",
};

const td = {
  padding: 10,
  borderBottom: "1px solid #eee",
  color: "#0f172a",
};

const btnEdit = {
  background: "green",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: 5,
  marginRight: 5,
  cursor: "pointer",
};

const btnDelete = {
  background: "red",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: 5,
  cursor: "pointer",
};