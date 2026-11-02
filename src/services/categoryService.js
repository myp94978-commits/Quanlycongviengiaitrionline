import axiosInstance from "@/lib/axiosInstance";

// 1. lấy danh sách
export const getCategories = async (params = {}) => {
  const res = await axiosInstance.get("/categories", { params });
  return res.data;
};

// 2. chi tiết
export const getCategoryById = async (id) => {
  const res = await axiosInstance.get(`/categories/${id}`);
  return res.data;
};

// 3. tạo mới
export const createCategory = async (data) => {
  const res = await axiosInstance.post("/categories", data);
  return res.data;
};

// 4. cập nhật
export const updateCategory = async (id, data) => {
  const res = await axiosInstance.put(`/categories/${id}`, data);
  return res.data;
};

// 5. xoá
export const deleteCategory = async (id) => {
  const res = await axiosInstance.delete(`/categories/${id}`);
  return res.data;
};