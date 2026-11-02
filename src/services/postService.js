import axiosInstance from "@/lib/axiosInstance";

// 1. danh sách posts
export const getPosts = async (params = {}) => {
  const res = await axiosInstance.get("/posts", { params });
  return res.data;
};

// 2. chi tiết post
export const getPostById = async (id) => {
  const res = await axiosInstance.get(`/posts/${id}`);
  return res.data;
};

// 3. tạo post
export const createPost = async (data) => {
  const res = await axiosInstance.post("/posts", data);
  return res.data;
};

// 4. cập nhật post
export const updatePost = async (id, data) => {
  const res = await axiosInstance.put(`/posts/${id}`, data);
  return res.data;
};

// 5. xóa post
export const deletePost = async (id) => {
  const res = await axiosInstance.delete(`/posts/${id}`);
  return res.data;
};