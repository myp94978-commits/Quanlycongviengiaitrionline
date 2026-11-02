// src/app/page.jsx
import Header from "@/components/shop/Header";
import Image from "next/image";
import Link from "next/link";
import getImageSrc from "@/utils/getImageSrc";
import { getNewProducts, getBestSellingProducts } from "@/services/productService";
import { getCategories } from "@/services/categoryService";
import NewsletterSignup from "@/components/shop/NewsletterSignup";

export default async function Home() {
  // Fetch data server-side
  let newProducts = [];
  let bestSelling = [];
  let categories = [];

  try {
    const [newRes, bestRes, catRes] = await Promise.allSettled([
      getNewProducts(8),
      getBestSellingProducts(8),
      getCategories()
    ]);

    newProducts = newRes.status === 'fulfilled' ? (newRes.value.data || []) : [];
    bestSelling = bestRes.status === 'fulfilled' ? (bestRes.value.data || []) : [];
    categories = catRes.status === 'fulfilled' ? (catRes.value.data || []) : [];
  } catch (error) {
    console.log('Error fetching homepage data:', error);
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              🛍️ PHAMTHIMY Shop
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Chào mừng đến với thế giới mua sắm trực tuyến! Khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300 shadow-lg"
              >
                🛒 Mua sắm ngay
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition duration-300"
              >
                📞 Liên hệ chúng tôi
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl mb-2">🚚</div>
                <h3 className="text-lg font-semibold mb-2">Giao hàng tận nơi</h3>
                <p className="text-sm opacity-90">Miễn phí giao hàng toàn quốc</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl mb-2">💳</div>
                <h3 className="text-lg font-semibold mb-2">Thanh toán an toàn</h3>
                <p className="text-sm opacity-90">Nhiều phương thức thanh toán</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="text-lg font-semibold mb-2">Bảo hành chính hãng</h3>
                <p className="text-sm opacity-90">Đổi trả trong 30 ngày</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              🏷️ Danh mục sản phẩm
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {categories.slice(0, 12).map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category_id=${category.id}`}
                  className="group bg-gray-50 hover:bg-blue-50 rounded-lg p-6 text-center transition duration-300 hover:shadow-md"
                >
                  <div className="text-4xl mb-3">📦</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/products"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Xem tất cả danh mục →
              </Link>
            </div>
          </div>
        </section>

        {/* New Products Section */}
        {newProducts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">
                  ✨ Sản phẩm mới
                </h2>
                <Link
                  href="/products?sort=newest"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Xem tất cả →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newProducts.slice(0, 8).map((product) => (
                  <Link
                    key={product.id || product.product_id}
                    href={`/products/${product.id || product.product_id}`}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden group"
                  >
                    <div className="aspect-square relative bg-gray-200 overflow-hidden">
                      <Image
                        src={getImageSrc(product.image, product.name || product.product_name)}
                        alt={product.name || "Sản phẩm"}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover"
                        priority
                        unoptimized
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name || "Sản phẩm"}
                      </h3>
                      <p className="text-lg font-bold text-blue-600">
                        {product.price ? `${product.price.toLocaleString("vi-VN")} đ` : "Liên hệ"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Best Selling Section */}
        {bestSelling.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">
                  🔥 Sản phẩm bán chạy
                </h2>
                <Link
                  href="/products?sort=bestseller"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Xem tất cả →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bestSelling.slice(0, 8).map((product) => (
                  <Link
                    key={product.id || product.product_id}
                    href={`/products/${product.id || product.product_id}`}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden group border-2 border-orange-200"
                  >
                    <div className="relative">
                      <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
                        🔥 Hot
                      </div>
                      <div className="aspect-square relative bg-gray-200 overflow-hidden">
                        <Image
                          src={getImageSrc(product.image, product.name || product.product_name)}
                          alt={product.name || "Sản phẩm"}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover"
                          priority
                          unoptimized
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name || "Sản phẩm"}
                      </h3>
                      <p className="text-lg font-bold text-blue-600">
                        {product.price ? `${product.price.toLocaleString("vi-VN")} đ` : "Liên hệ"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              🎯 Tại sao chọn PHAMTHIMY Shop?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="text-xl font-semibold mb-2">Chất lượng đảm bảo</h3>
                <p className="text-gray-300">Sản phẩm chính hãng, chất lượng cao</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-2">Giao hàng nhanh</h3>
                <p className="text-gray-300">Giao hàng trong 24h khu vực nội thành</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">Giá tốt nhất</h3>
                <p className="text-gray-300">Cam kết giá cạnh tranh trên thị trường</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">📞</div>
                <h3 className="text-xl font-semibold mb-2">Hỗ trợ 24/7</h3>
                <p className="text-gray-300">Đội ngũ chăm sóc khách hàng tận tình</p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              📧 Đăng ký nhận tin khuyến mãi
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt
            </p>
            <NewsletterSignup />
          </div>
        </section>
      </div>
    </>
  );
}