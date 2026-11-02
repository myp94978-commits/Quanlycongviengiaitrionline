import axiosInstance from "@/lib/axiosInstance";

// 1. danh sách contacts
export const getContacts = async (params = {}) => {
  const res = await axiosInstance.get("/contacts", { params });
  return res.data;
};

// 2. chi tiết contact
export const getContactById = async (id) => {
  const res = await axiosInstance.get(`/contacts/${id}`);
  return res.data;
};

// 3. tạo contact
export const createContact = async (data) => {
  const res = await axiosInstance.post("/contacts", data);
  return res.data;
};

// 4. cập nhật contact
export const updateContact = async (id, data) => {
  const res = await axiosInstance.put(`/contacts/${id}`, data);
  return res.data;
};

// 5. xóa contact
export const deleteContact = async (id) => {
  const res = await axiosInstance.delete(`/contacts/${id}`);
  return res.data;
};