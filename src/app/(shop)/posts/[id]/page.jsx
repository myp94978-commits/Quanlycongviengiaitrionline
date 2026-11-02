"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import getImageSrc from "@/utils/getImageSrc";

export default function PostDetailPage({ params }) {
  const { id } = React.use(params);
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL
            ? `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`
            : `http://localhost:5000/api/posts/${id}`
        );
        if (!response.ok) {
          throw new Error("Không tìm thấy bài viết");
        }
        const data = await response.json();
        setPost(data.data || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedPosts = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL
            ? `${process.env.NEXT_PUBLIC_API_URL}/posts`
            : "http://localhost:5000/api/posts"
        );
        if (response.ok) {
          const data = await response.json();
          const posts = data.data || data.items || data.posts || data || [];
          const postsArray = Array.isArray(posts) ? posts : [];
          // Get 3 random related posts (excluding current post)
          const filtered = postsArray.filter(p => (p.post_id || p.id) !== id);
          const shuffled = filtered.sort(() => 0.5 - Math.random());
          setRelatedPosts(shuffled.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching related posts:", err);
      }
    };

    fetchPost();
    fetchRelatedPosts();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-2xl text-gray-600 font-medium">Đang tải bài viết...</p>
          <p className="text-gray-500 mt-2">Vui lòng đợi trong giây lát</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-2 border-red-200 text-red-700 p-8 rounded-3xl mb-8 shadow-lg">
            <div className="flex items-center justify-center">
              <span className="text-5xl mr-6">⚠️</span>
              <div className="text-center">
                <p className="font-bold text-xl mb-2">Lỗi tải dữ liệu</p>
                <p className="text-lg">{error || "Không tìm thấy bài viết"}</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/posts"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              ← Quay lại danh sách bài viết
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section with Image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        {getImageSrc(post.image) ? (
          <>
            <img
              src={getImageSrc(post.image)}
              alt={post.post_title || post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-12 w-full">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="mb-6">
                <Link href="/posts" className="text-white/80 hover:text-white transition-colors text-sm">
                  📝 Blog & Bài viết
                </Link>
                <span className="text-white/60 mx-2">→</span>
                <span className="text-white text-sm">Chi tiết bài viết</span>
              </nav>

              {/* Category Badge */}
              {(post.category || post.tag) && (
                <div className="mb-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/20">
                    📁 {post.category || post.tag}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {post.post_title || post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center">
                  <span className="mr-2">📅</span>
                  <span className="font-medium">
                    {post.created_at
                      ? new Date(post.created_at).toLocaleDateString("vi-VN", {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : "N/A"
                    }
                  </span>
                </div>
                {post.author && (
                  <div className="flex items-center">
                    <span className="mr-2">✍️</span>
                    <span className="font-medium">{post.author}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <span className="mr-2">👁️</span>
                  <span className="font-medium">1,234 lượt xem</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              {/* Summary/Excerpt */}
              {post.summary && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-2xl">
                  <p className="text-lg text-gray-700 italic leading-relaxed">
                    "{post.summary}"
                  </p>
                </div>
              )}

              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed text-lg space-y-6">
                  {(post.detail || post.content || post.description || "Nội dung bài viết đang được cập nhật...").split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {post.tag && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">🏷️ Tags:</h3>
                  <div className="flex flex-wrap gap-3">
                    {Array.isArray(post.tag) ? post.tag.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    )) : (
                      <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                        #{post.tag}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Social Sharing */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">📢 Chia sẻ bài viết:</h3>
                <div className="flex space-x-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition-colors flex items-center">
                    📘 Facebook
                  </button>
                  <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-2xl font-medium transition-colors flex items-center">
                    🐦 Twitter
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-medium transition-colors flex items-center">
                    📱 WhatsApp
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Info */}
            {post.author && (
              <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">✍️ Tác giả</h3>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{post.author}</p>
                    <p className="text-gray-600 text-sm">Nhà văn & Blogger</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                  Chuyên viết về công nghệ, sản phẩm và xu hướng mới nhất trong ngành.
                </p>
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">📚 Bài viết liên quan</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.post_id || relatedPost.id}
                      href={`/posts/${relatedPost.post_id || relatedPost.id}`}
                      className="block group"
                    >
                      <div className="flex space-x-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-xl overflow-hidden">
                          {getImageSrc(relatedPost.image) ? (
                            <img
                              src={getImageSrc(relatedPost.image)}
                              alt={relatedPost.post_title || relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              📝
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {relatedPost.post_title || relatedPost.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {relatedPost.created_at
                              ? new Date(relatedPost.created_at).toLocaleDateString("vi-VN")
                              : "N/A"
                            }
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back to Posts */}
        <div className="text-center mt-16">
          <Link
            href="/posts"
            className="inline-flex items-center bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            ← Quay lại danh sách bài viết
          </Link>
        </div>
      </div>
    </div>
  );
}
