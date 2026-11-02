"use client";
import AdminTable from "@/components/admin/table/AdminTable";
import { deleteProduct, getProducts } from "@/services/productService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Pagination from "@/components/common/Pagination";

const columns = [
  { key: "product_name", label: "Product Name" },
  { key: "price", label: "Price" },
  { key: "status", label: "Status" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    trash: 0,
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleDelete = async (product) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa "${product.product_name}" không?`,
    );
    if (!confirmDelete) return;
    const deleteId = product.product_id ?? product.id;
    try {
      setLoading(true);
      setErrors({});
      setSuccess("");
      await deleteProduct(deleteId);
      setProducts((prev) =>
        prev.filter(
          (item) =>
            String(item.product_id ?? item.id) !== String(deleteId),
        ),
      );
      setSuccess("Xóa sản phẩm thành công!");
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (error) {
      setErrors({
        message: "Xóa thất bại!",
      });
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  const handleEdit = (product) => {
    router.push(`/admin/admin/products/${product.product_id}`);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setParams((prev) => ({ ...prev, page: 1, search: searchKeyword }));
    }
  };

  // goi api
  useEffect(() => {
    // ham fetchdata
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProducts(params);
        setProducts(data.data);
        setTotalPages(data.totalPage);
      } catch (e) {
        setErrors({ message: e.data });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              📦 Quản lý sản phẩm
            </h1>
            <button
              onClick={() => router.push("/admin/admin/products/create")}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              ➕ Thêm sản phẩm
            </button>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-700 font-medium">{success}</p>
            </div>
          )}
          {errors.message && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 font-medium">{errors.message}</p>
            </div>
          )}

          {/* Search Input */}
          <div className="mb-6">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="🔍 Tìm sản phẩm (nhấn Enter)..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Table */}
          <div className="mb-6">
            <AdminTable
              columns={columns}
              data={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <Pagination
              totalPages={totalPages}
              params={params}
              onChangeParams={setParams}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
