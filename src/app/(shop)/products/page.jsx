"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductList from "@/components/shop/product/ProductList";
import Pagination from "@/components/common/Pagination";
import { getProducts } from "@/services/productService";
import { getCategories } from "@/services/categoryService";

function ProductsPageContent() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [params, setParams] = useState({
    page: 1,
    limit: 12,
    search: "",
    category_id: "",
    sort: "name_asc",
  });
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialCategory =
      searchParams.get("category_id") ??
      searchParams.get("cat_id") ??
      searchParams.get("categoryId") ??
      "";
    const initialSearch = searchParams.get("search") ?? searchParams.get("q") ?? "";
    const initialSort = searchParams.get("sort") ?? "name_asc";

    setParams((prev) => ({
      ...prev,
      category_id: initialCategory,
      search: initialSearch,
      sort: initialSort,
    }));
  }, [searchParams]);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      const payload = res?.data ?? res;
      const categoriesData = Array.isArray(payload)
        ? payload
        : payload?.data ?? payload?.categories ?? payload?.items ?? [];
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      console.log("Error fetching categories:", err);
      setCategories([]);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const requestParams = {
        page: params.page,
        currentPage: params.page,
        pageNumber: params.page,
        limit: params.limit,
        search: params.search || undefined,
        q: params.search || undefined,
        keyword: params.search || undefined,
        name: params.search || undefined,
        product_name: params.search || undefined,
        category_id: params.category_id || undefined,
        cat_id: params.category_id || undefined,
        categoryId: params.category_id || undefined,
        type: params.category_id || undefined,
        cat_name: params.category_name || undefined,
        sort: params.sort,
      };
      const res = await getProducts(requestParams);
      const productList =
        res?.data?.items ||
        res?.data?.products ||
        res?.data?.data ||
        res?.items ||
        res?.products ||
        (Array.isArray(res?.data) ? res.data : undefined) ||
        (Array.isArray(res) ? res : undefined) ||
        res?.data ||
        [];
      setProducts(Array.isArray(productList) ? productList : []);

      const totalFromRes =
        res?.totalPages ||
        res?.total_pages ||
        res?.last_page ||
        res?.total ||
        res?.meta?.total_pages ||
        res?.meta?.last_page ||
        res?.meta?.total ||
        res?.data?.totalPages ||
        res?.data?.total ||
        res?.data?.last_page ||
        res?.data?.total_page ||
        0;
      const inferredPages =
        totalFromRes ||
        (Array.isArray(productList) && productList.length === params.limit
          ? params.page + 1
          : params.page);
      setTotalPages(Number(inferredPages) || 1);
    } catch (err) {
      console.log("Error fetching products:", err);
      setError(err.message || "Không thể tải sản phẩm");
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [params]);

  const handleParamsChange = (newParams) => {
    setParams({ ...params, ...newParams, page: 1 }); // Reset to page 1 when filters change
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleParamsChange({ search: params.search });
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            🛍️ Sản Phẩm Chất Lượng
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Khám phá bộ sưu tập sản phẩm đa dạng với chất lượng cao và giá cả hợp lý
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="text-2xl">⭐ 4.8/5</div>
            <div className="text-lg">10,000+ sản phẩm</div>
            <div className="text-lg">Giao hàng tận nơi</div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Tìm kiếm sản phẩm..."
                  value={params.search}
                  onChange={(e) => setParams({ ...params, search: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                >
                  Tìm
                </button>
              </div>
            </form>

            {/* Category Filter */}
            <select
              value={params.category_id}
              onChange={(e) => handleParamsChange({ category_id: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat) => {
                const categoryId = cat.cat_id ?? cat.id ?? cat.category_id ?? cat.categoryId ?? "";
                const categoryName = cat.name ?? cat.cat_name ?? cat.title ?? cat.category_name ?? cat.label ?? "";
                return (
                  <option key={categoryId || categoryName} value={categoryId}>
                    {categoryName || categoryId}
                  </option>
                );
              })}
            </select>

            {/* Sort */}
            <select
              value={params.sort}
              onChange={(e) => handleParamsChange({ sort: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name_asc">Tên A-Z</option>
              <option value="name_desc">Tên Z-A</option>
              <option value="price_asc">Giá thấp đến cao</option>
              <option value="price_desc">Giá cao đến thấp</option>
              <option value="newest">Mới nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">Lỗi: {error}</p>
          </div>
        )}

        {loading && products.length > 0 && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        )}

        {products.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Hiển thị {products.length} sản phẩm
              </p>
              <div className="text-sm text-gray-500">
                Trang {params.page} / {totalPages}
              </div>
            </div>
            <ProductList products={products} />
            <Pagination
              totalPages={totalPages}
              params={params}
              onChangeParams={setParams}
            />
          </>
        ) : !loading ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Không tìm thấy sản phẩm
            </h3>
            <p className="text-gray-600 mb-6">
              Thử thay đổi bộ lọc hoặc tìm kiếm khác
            </p>
            <button
              onClick={() => setParams({ page: 1, limit: 12, search: "", category_id: "", sort: "name_asc" })}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Đang tải...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}