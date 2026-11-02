import Link from "next/link";

import getImageSrc from "@/utils/getImageSrc";

const getPostCategory = (post) => {
  if (!post) return null;
  if (post.category) return post.category;
  if (post.category_name) return post.category_name;
  if (post.topic) return post.topic;
  if (post.topic_name) return post.topic_name;
  if (post.tag) return post.tag;
  if (post.tags && Array.isArray(post.tags)) return post.tags[0];
  return null;
};

const getPostAuthor = (post) => {
  return post.author || post.user?.name || post.user_name || post.writer || "";
};

const getPostDescription = (post) => {
  return (
    post.summary ||
    post.description ||
    post.intro ||
    post.content?.slice(0, 160) ||
    "Không có mô tả"
  );
};

export default function PostCard({ post }) {
  const imageSrc = getImageSrc(post.image || post.thumbnail || post.cover);
  const category = getPostCategory(post);
  const author = getPostAuthor(post);
  const description = getPostDescription(post);
  const title = post.post_title || post.title || post.name || "Bài viết mới";
  const dateString = post.created_at || post.published_at || post.date;

  return (
    <Link href={`/posts/${post.post_id || post.id}`}>
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer h-full overflow-hidden group hover:-translate-y-3 border border-white/50 relative">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

        {/* Image Section */}
        <div className="relative overflow-hidden rounded-t-3xl">
          {imageSrc ? (
            <div className="w-full h-64 bg-gradient-to-br from-indigo-100 to-purple-100 relative">
              <img
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center relative">
              <span className="text-8xl opacity-60 group-hover:scale-110 transition-transform duration-500">📝</span>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-t-3xl"></div>
            </div>
          )}

          {/* Category Badge */}
          {category && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-lg backdrop-blur-sm border border-white/20">
                {category}
              </span>
            </div>
          )}

          {/* Hover effect indicator */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <span className="text-indigo-600 text-lg">👁️</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 relative z-10">
          <h3 className="text-xl font-bold mb-4 line-clamp-2 text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 leading-tight">
            {title}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between pt-6 border-t border-gray-100/50">
            <div className="flex flex-col gap-3 text-sm text-gray-500 sm:flex-row sm:items-center">
              <span className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-xl">
                <span className="text-indigo-500">📅</span>
                <span className="font-medium">
                  {dateString
                    ? new Date(dateString).toLocaleDateString("vi-VN")
                    : "N/A"
                  }
                </span>
              </span>
              {author && (
                <span className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-xl">
                  <span className="text-purple-500">✍️</span>
                  <span className="font-medium">{author}</span>
                </span>
              )}
            </div>
            <div className="text-indigo-600 hover:text-purple-600 font-semibold text-sm transition-all duration-300 flex items-center group-hover:translate-x-1 transform">
              Đọc thêm
              <span className="ml-2 text-lg group-hover:rotate-12 transition-transform duration-300">→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}