"use client";
import { useEffect, useState } from "react";
import { getCategoryById, updateCategory } from "@/services/categoryService";
import { useRouter, useParams } from "next/navigation";

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategoryById(id);
        setName(data.data.name || "");
        setDescription(data.data.description || "");
        setLoading(false);
      } catch (error) {
        setErrors({ message: "Lỗi khi tải danh mục" });
        setLoading(false);
      }
    };

    if (id) {
      fetchCategory();
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Vui lòng nhập tên danh mục";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validateForm();

    if (Object.keys(validateErrors).length !== 0) {
      setErrors(validateErrors);
      return;
    }

    try {
      setIsSaving(true);
      await updateCategory(id, {
        name: name.trim(),
        description: description.trim(),
      });
      setSuccess("Cập nhật danh mục thành công!");
      setTimeout(() => {
        router.push("/admin/categories");
      }, 1500);
    } catch (error) {
      setErrors({ message: error.message || "Lỗi khi cập nhật danh mục" });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <p className="text-gray-600">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Chỉnh sửa danh mục</h1>
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-700 text-sm"
        >
          ← Quay lại
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
        {errors.message && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600 mb-4">
            {errors.message}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-600 mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên danh mục *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên danh mục"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả danh mục (tùy chọn)"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg transition font-medium"
            >
              {isSaving ? "Đang cập nhật..." : "Cập nhật danh mục"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition font-medium"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
