import axiosInstance from "@/lib/axiosInstance";

const normalizeBrandPayload = (data) => {
    const payload = { ...data };

    if (payload.name !== undefined) {
        payload.brand_name = payload.name;
        delete payload.name;
    }

    if (payload.brand_name !== undefined && payload.brand_name !== null) {
        payload.brand_name = String(payload.brand_name).trim();
    }

    return payload;
};

// 1. Lấy danh sách brand
export const getBrands = async (params = {}) => {
    const res = await axiosInstance.get("/brands", {
        params: params
    });
    return res.data;
};

// 2. Lấy chi tiết brand
export const getBrandById = async (id) => {
    const res = await axiosInstance.get(`/brands/${id}`);
    return res.data;
};

// 3. Tạo brand
export const createBrand = async (data) => {
    const payload = normalizeBrandPayload(data);
    const res = await axiosInstance.post("/brands", payload);
    return res.data;
};

// 4. Cập nhật brand
export const updateBrand = async (id, data) => {
    const payload = normalizeBrandPayload(data);
    const res = await axiosInstance.put(`/brands/${id}`, payload);
    return res.data;
};

// 5. Xóa brand
export const deleteBrand = async (id) => {
    const res = await axiosInstance.delete(`/brands/${id}`);
    return res.data;
};