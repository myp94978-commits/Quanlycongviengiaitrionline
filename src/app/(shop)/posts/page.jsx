"use client";

import { useEffect, useState } from "react";
import PostCard from "@/components/shop/PostCard";

const getPostCategory = (post) => {
  if (!post) return null;

  const normalizedCategory = (() => {
    if (post.category) return post.category;
    if (post.category_name) return post.category_name;
    if (post.topic) return post.topic;
    if (post.topic_name) return post.topic_name;
    if (post.tag && typeof post.tag === "string") return post.tag;
    if (post.tags && typeof post.tags === "string") return post.tags;
    if (Array.isArray(post.tags) && post.tags.length > 0) return post.tags[0];
    if (post.category_id) return String(post.category_id);
    if (post.categoryId) return String(post.categoryId);
    if (typeof post.category === "object") {
      return post.category.name || post.category.title || post.category.label || null;
    }
    return null;
  })();

  if (!normalizedCategory) return null;
  return typeof normalizedCategory === "string"
    ? normalizedCategory.trim()
    : normalizedCategory;
};

const getPostTextField = (post, ...fields) => {
  for (const field of fields) {
    if (!post) continue;
    const value = post[field];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
};

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL
            ? `${process.env.NEXT_PUBLIC_API_URL}/posts`
            : "http://localhost:5000/api/posts"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        const rawList = data.data || data.items || data.posts || data.results || data || [];

        const findArrayInObject = (value) => {
          if (!value || typeof value !== "object") return null;
          const arrays = Object.values(value).filter(Array.isArray);
          if (arrays.length === 0) return null;
          return arrays.reduce((largest, current) => (current.length > largest.length ? current : largest), arrays[0]);
        };

        const postList = Array.isArray(rawList)
          ? rawList
          : findArrayInObject(rawList) || [];

        const postsArray = Array.isArray(postList) ? postList : [];
        setPosts(postsArray);
        setFilteredPosts(postsArray);

        const categoryValues = postsArray
          .map(getPostCategory)
          .flat()
          .filter(Boolean)
          .map((item) => String(item).trim());

        const uniqueCategories = [...new Set(categoryValues)];

        // if the API returns a category list separately, use it too
        const fallbackCategories = Array.isArray(data.categories)
          ? data.categories.map((cat) => (typeof cat === "string" ? cat : cat.name || cat.title || cat.label)).filter(Boolean)
          : [];

        const mergedCategories = [...new Set([...uniqueCategories, ...fallbackCategories])].filter(Boolean);

        setCategories(mergedCategories);
      } catch (err) {
        setError(err.message);
        setPosts([]);
        setFilteredPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((post) => {
        const title = getPostTextField(post, "post_title", "title", "name").toLowerCase();
        const summary = getPostTextField(post, "summary", "description", "content").toLowerCase();
        return title.includes(searchTerm.toLowerCase()) || summary.includes(searchTerm.toLowerCase());
      });
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => {
        const category = getPostCategory(post);
        if (!category) return false;
        if (Array.isArray(category)) {
          return category.map((item) => String(item).trim()).includes(selectedCategory);
        }
        return String(category).trim() === selectedCategory;
      });
    }

    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, selectedCategory, posts]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 mx-auto mb-6">
              <div className="bg-white rounded-full h-full w-full"></div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse opacity-20"></div>
          </div>
          <p className="text-3xl text-gray-700 font-bold mb-2">Đang tải bài viết...</p>
          <p className="text-gray-500 text-lg">Vui lòng đợi trong giây lát</p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-32 text-center text-white">
          <div className="animate-fade-in">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <span className="text-2xl mr-2">📝</span>
              <span className="text-sm font-medium">Blog & Bài Viết</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              Khám phá
              <br />
              <span className="bg-gradient-to-r from-indigo-200 to-pink-200 bg-clip-text text-transparent">Kiến thức</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed mb-12">
              Khám phá những bài viết hữu ích về công nghệ, sản phẩm và xu hướng mới nhất.
              Cập nhật kiến thức và thông tin bổ ích hàng ngày với nội dung chất lượng cao.
            </p>
            <div className="flex justify-center space-x-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
                <div className="text-3xl font-bold text-white">{posts.length}</div>
                <div className="text-sm opacity-80">Bài viết</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
                <div className="text-3xl font-bold text-white">{categories.length}</div>
                <div className="text-sm opacity-80">Danh mục</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
                <div className="text-3xl font-bold text-white">∞</div>
                <div className="text-sm opacity-80">Kiến thức</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl">
                🌟 Khám phá ngay
              </button>
              <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all transform hover:scale-105">
                📖 Đọc bài viết
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 mb-20 border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-pink-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                🔍 Tìm kiếm & Lọc bài viết
              </h2>
              <p className="text-gray-600 text-lg">Dễ dàng tìm thấy nội dung bạn quan tâm với công cụ tìm kiếm thông minh</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 mb-10">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🔍</span>
                  Tìm kiếm bài viết
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nhập từ khóa tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 border-2 border-indigo-100 rounded-3xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-lg shadow-lg bg-white/90 backdrop-blur-sm"
                  />
                  <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-indigo-500 text-xl">
                    🔍
                  </div>
                </div>
              </div>

              <div className="lg:w-96">
                <label className="block text-sm font-semibold text-gray-700 mb-4 flex items-center">
                  <span className="text-2xl mr-2">📂</span>
                  Danh mục
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-6 py-5 border-2 border-purple-100 rounded-3xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-400 transition-all text-lg bg-white/90 backdrop-blur-sm shadow-lg"
                >
                  <option value="all">🎯 Tất cả danh mục</option>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category} value={category}>
                        📁 {category}
                      </option>
                    ))
                  ) : (
                    <option value="all" disabled>
                      🔒 Hiện tại chưa có danh mục
                    </option>
                  )}
                </select>
              </div>
            </div>

            <div className="mb-8">
              <div className="text-sm text-gray-600 mb-4 flex items-center">
                <span className="text-xl mr-2">🏷️</span>
                Chọn nhanh danh mục:
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all transform hover:scale-105 shadow-lg ${
                    selectedCategory === "all"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/25"
                      : "bg-white/80 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 border border-indigo-100"
                  }`}
                >
                  ✨ Tất cả
                </button>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all transform hover:scale-105 shadow-lg ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/25"
                          : "bg-white/80 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border border-purple-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
              </div>
            </div>

            {/* Results Info */}
            <div className="text-center p-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-3xl border border-indigo-100/50">
              <p className="text-gray-700 font-semibold text-lg">
                📊 Hiển thị
                <span className="font-bold text-indigo-600 text-2xl mx-2">{paginatedPosts.length}</span>
                /
                <span className="font-bold text-purple-600 text-2xl mx-2"> {filteredPosts.length}</span>
                bài viết
                {searchTerm && <span className="text-pink-600 block mt-1">🔍 cho "<strong>{searchTerm}</strong>"</span>}
                {selectedCategory !== "all" && <span className="text-indigo-600 block mt-1">📂 trong "<strong>{selectedCategory}</strong>"</span>}
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-gradient-to-r from-red-50 via-pink-50 to-red-50 border-2 border-red-200/50 text-red-700 p-10 rounded-3xl mb-12 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-100/20 to-pink-100/20"></div>
            <div className="relative z-10 flex items-center justify-center">
              <span className="text-7xl mr-8 animate-bounce">⚠️</span>
              <div className="text-center">
                <p className="font-bold text-2xl mb-3">Lỗi tải dữ liệu</p>
                <p className="text-lg opacity-90">{error}</p>
              </div>
            </div>
          </div>
        )}

        {paginatedPosts.length === 0 ? (
          <div className="text-center py-32 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/30 to-pink-50/30 rounded-3xl"></div>
            <div className="relative z-10">
              <div className="text-10xl mb-10 opacity-60 animate-pulse">📄</div>
              <h3 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
                Không tìm thấy bài viết
              </h3>
              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                {searchTerm || selectedCategory !== "all"
                  ? "Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác để khám phá thêm nội dung thú vị ✨"
                  : "Chúng tôi đang nỗ lực cập nhật nội dung mới nhất. Hãy quay lại sau nhé! 🚀"
                }
              </p>
              {(searchTerm || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-3xl font-bold text-xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all transform hover:scale-110 shadow-2xl hover:shadow-3xl border-2 border-white/20"
                >
                  🔄 Xóa bộ lọc
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mb-16">
              {paginatedPosts.map((post, index) => (
                <div
                  key={post.post_id || post.id || index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6 px-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 via-purple-50/30 to-pink-50/30"></div>
                <div className="relative z-10">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-8 py-4 rounded-3xl bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-indigo-100 hover:to-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold hover:scale-105 shadow-lg hover:shadow-xl border border-gray-200/50 flex items-center gap-2"
                  >
                    <span className="text-lg">←</span>
                    Trước
                  </button>
                </div>

                <div className="flex flex-wrap justify-center gap-3 relative z-10">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      return (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      );
                    })
                    .map((page, index, array) => (
                      <div key={page} className="flex items-center">
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-3 text-gray-400 font-medium">...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`px-6 py-4 rounded-3xl transition-all font-bold hover:scale-110 shadow-lg ${
                            currentPage === page
                              ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-indigo-500/30 border-2 border-white/50"
                              : "bg-white/80 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 border-2 border-gray-200/50 hover:border-indigo-300"
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    ))}
                </div>

                <div className="relative z-10">
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-8 py-4 rounded-3xl bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-purple-100 hover:to-pink-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold hover:scale-105 shadow-lg hover:shadow-xl border border-gray-200/50 flex items-center gap-2"
                  >
                    Sau
                    <span className="text-lg">→</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
