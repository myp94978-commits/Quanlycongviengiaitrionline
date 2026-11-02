"use client";
import CategorySelect from "@/components/common/CategorySelect";
import { createProduct } from "@/services/productService";
import { isEmpty, validateProduct } from "@/utils/validator";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BrandSelect from "@/components/common/BrandSelect";

const CreateForm = (props) => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    product_name: "",
    alias: "",
    cat_id: 1,
    brand_id: 1,
    detail: "",
    price: "",
    sale_price: "",
    image: "",
    launch_date: "",
    tag: "",
    summary: "",
    status: 1,
    trash: 0,
    view: 50,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    // checkbox → 0 | 1
    if (type === "checkbox") {
      newValue = checked ? 1 : 0;
    }
    // number → convert sang number
    else if (type === "number") {
      newValue = value === "" ? "" : Number(value);
      // } else if (name === "cat_id") {
      //   newValue = Number(value); // convert string → number
      // } else if (name === "brand_id") {
      //   newValue = Number(value); // convert string → number
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //validation
    const validateErrors = validateProduct(formData);
    setErrors(validateErrors);
    if (!isEmpty(validateErrors)) return;
    console.log("errors:", validateErrors);
    // gọi API bằng axios
    try {
      setLoading(true);
      const res = await createProduct(formData);
      console.log(res);
      setSuccess("Tạo sản phẩm thành công");
      setTimeout(() => {
        setSuccess(null);
        router.push("/admin/admin/products");
      }, 1500);
    } catch (e) {
      setErrors({ message: e.data.error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white/90 backdrop-blur p-8 rounded-2xl shadow-2xl space-y-6 border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">
          📦 Thêm sản phẩm
        </h2>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

        {/* INPUT STYLE BASE */}
        {/* chỉ dùng class này cho tất cả input */}

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            Tên sản phẩm
          </label>
          {errors.product_name && (
            <p style={{ color: "red" }}>{errors.product_name}</p>
          )}
          <input
            type="text"
            name="product_name"
            placeholder="Nhập tên sản phẩm..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
      focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      hover:border-gray-400 transition shadow-sm"
            value={formData.product_name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Alias</label>
          {errors.alias && <p style={{ color: "red" }}>{errors.alias}</p>}
          <input
            type="text"
            name="alias"
            placeholder="auto-generated..."
            className="w-full px-4 py-2.5 border border-gray-200 bg-gray-50 rounded-xl 
      focus:ring-2 focus:ring-blue-500 transition shadow-sm"
            value={formData.alias}
            onChange={handleChange}
          />
        </div>

        {/* CATEGORY */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Danh mục</label>
          {errors.cat_id && <p style={{ color: "red" }}>{errors.cat_id}</p>}
          <CategorySelect
            name="cat_id"
            value={formData.cat_id}
            onChange={handleChange}
          />
        </div>

        {/* BRAND */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            Thương hiệu
          </label>
          {errors.brand_id && <p style={{ color: "red" }}>{errors.brand_id}</p>}
          <BrandSelect
            name="brand_id"
            value={formData.brand_id}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            Mô tả chi tiết
          </label>
          {errors.detail && <p style={{ color: "red" }}>{errors.detail}</p>}
          <textarea
            name="detail"
            rows="4"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
      focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition shadow-sm"
            value={formData.detail}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Giá</label>
            {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
            <input
              type="number"
              name="price"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
        focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition shadow-sm"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Giá khuyến mãi
            </label>
            {errors.sale_price && (
              <p style={{ color: "red" }}>{errors.sale_price}</p>
            )}
            <input
              type="number"
              name="sale_price"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
        focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition shadow-sm"
              value={formData.sale_price}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Hình ảnh</label>
          <input
            type="text"
            name="image"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
      focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition shadow-sm"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            Ngày ra mắt
          </label>
          {errors.launch_date && (
            <p style={{ color: "red" }}>{errors.launch_date}</p>
          )}
          <input
            type="datetime-local"
            name="launch_date"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
      focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition shadow-sm"
            value={formData.launch_date}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Tag</label>
          {errors.tag && <p style={{ color: "red" }}>{errors.tag}</p>}
          <input
            type="text"
            name="tag"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
      focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition shadow-sm"
            value={formData.tag}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">View</label>
          {errors.view && <p style={{ color: "red" }}>{errors.view}</p>}
          <input
            type="number"
            name="view"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
      focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition shadow-sm"
            value={formData.view}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Summary</label>
          {errors.summary && <p style={{ color: "red" }}>{errors.summary}</p>}
          <input
            type="text"
            name="summary"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
      focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition shadow-sm"
            value={formData.summary}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Trash</label>

            <select
              name="trash"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
        focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition shadow-sm"
              value={formData.trash}
              onChange={handleChange}
            >
              <option value="0">Không</option>
              <option value="1">Có</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">Status</label>

            <select
              name="status"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
        focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition shadow-sm"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="1">Hiển thị</option>
              <option value="0">Ẩn</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold
    hover:shadow-lg hover:scale-[1.01] active:scale-95 transition-all duration-200"
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "💾 Tạo sản phẩm"}
        </button>
      </form>
    </>
  );
};

export default CreateForm;
