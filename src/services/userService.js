import axiosInstance from "@/lib/axiosInstance";

// 1. danh sách users
export const getUsers = async (params = {}) => {
  const queryParams = {};
  if (params.page && Number(params.page) > 0) {
    queryParams.page = params.page;
  }
  if (params.limit && Number(params.limit) > 0) {
    queryParams.limit = params.limit;
  }
  if (params.search?.toString().trim()) {
    queryParams.search = params.search.toString().trim();
  }

  const res = await axiosInstance.get("/users", { params: queryParams });
  return res.data;
};

// 2. chi tiết user
export const getUserById = async (id) => {
  const res = await axiosInstance.get(`/users/${id}`);
  return res.data;
};

// 3. tạo user
export const createUser = async (data) => {
  const res = await axiosInstance.post("/users", data);
  return res.data;
};

// 4. cập nhật user
export const updateUser = async (id, data) => {
  try {
    const res = await axiosInstance.put(`/users/${id}`, data);
    return res.data;
  } catch (error) {
    const status = error?.status || error?.fullError?.response?.status;
    if (status === 404) {
      const res = await axiosInstance.patch(`/users/${id}`, data);
      return res.data;
    }
    throw error;
  }
};

export const patchUser = async (id, data) => {
  const res = await axiosInstance.patch(`/users/${id}`, data);
  return res.data;
};

// 5. xóa user
export const deleteUser = async (id) => {
  const res = await axiosInstance.delete(`/users/${id}`);
  return res.data;
};