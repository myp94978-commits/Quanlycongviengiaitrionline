import axiosInstance from "@/lib/axiosInstance";

// 1. danh sách links
export const getLinks = async (params = {}) => {
  const res = await axiosInstance.get("/links", { params });
  return res.data;
};

// 2. chi tiết link
export const getLinkById = async (id) => {
  const res = await axiosInstance.get(`/links/${id}`);
  return res.data;
};

// 3. tạo link
export const createLink = async (data) => {
  const res = await axiosInstance.post("/links", data);
  return res.data;
};

// 4. cập nhật link
export const updateLink = async (id, data) => {
  const res = await axiosInstance.put(`/links/${id}`, data);
  return res.data;
};

// 5. xóa link
export const deleteLink = async (id) => {
  const res = await axiosInstance.delete(`/links/${id}`);
  return res.data;
};