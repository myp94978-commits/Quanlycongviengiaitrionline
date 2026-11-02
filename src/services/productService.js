import axiosInstance from "@/lib/axiosInstance";


//1. Lấy danh sách sản phẩm với phân trang và lọc
//Hàm getProducts 
export const getProducts =async (params ={}) => {
    let res = await axiosInstance.get('/products', {
        params: params,
    });
    return res.data;
}
//2. Lấy chi tiết sản phẩm theo ID
export const getProductById = async (id) => {
    const res = await axiosInstance.get(`/products/${id}`);
    return res.data;
}
//3. Tạo sản phẩm mới (chỉ admin)
export const createProduct = async (data) => {
    const  res = await axiosInstance.post('/products', data);
    return res.data;
}

//4. Cập nhật sản phẩm theo ID (chỉ admin)
export const updateProduct = async (id, data) => {
    const res = await axiosInstance.put(`/products/${id}`, data);
    return res.data;
}

//5. Xóa sản phẩm theo ID (chỉ admin)
export const deleteProduct = async (id) => {
    const res = await axiosInstance.delete(`/products/${id}`);
    return res.data;
}

//6. Lấy danh sách sản phẩm theo danh mục
export const getNewProducts = async ( limit =10) => 
{
    const res = await axiosInstance.get("/products/new", {
        params: { limit }
    });
    return res.data;
}

//7. Lấy danh sách sản phẩm bán chạy nhất
export const getBestSellingProducts = async (limit = 5) => {
    const res = await axiosInstance.get("/products/bestseller", {
        params: { limit }
    });
    return res.data;
}

//8.lấy sản phẩm liên quan
export const getRelatedProducts = async (Id, limit = 5) => {
    const res = await axiosInstance.get(`/products/related/${Id}`, {
        params: { limit }
    });
    return res.data;
}
