"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/services/productService";
import { getBrands } from "@/services/brandService";
import { getCategories } from "@/services/categoryService";

export default function CreateProduct() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category_id: "",
    brand_id: "",
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  // load data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandData = await getBrands();
        const categoryData = await getCategories();

        setBrands(brandData.data || brandData);
        setCategories(categoryData.data || categoryData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // input change
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };



  // submit
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!product.name || !product.price) {
    alert("Nhập tên và giá!");
    return;
  }

  if (!product.category_id || !product.brand_id) {
    alert("Chọn category và brand!");
    return;
  }

  try {
    const dataSend = {
      product_name: product.name,
      price: Number(product.price),
      cat_id: Number(product.category_id),
      brand_id: Number(product.brand_id),
      image: "",
      detail: "",
      status: 1,
      trash: 0,
      view: 0,
    };

    console.log("SEND FIX:", dataSend);

    await createProduct(dataSend);

    alert("Tạo sản phẩm thành công!");
    router.push("/admin/products");
  } catch (err) {
    console.log(err.response?.data || err);
    alert("Lỗi API!");
  }
};

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Product</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          name="name"
          placeholder="Tên"
          value={product.name}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-xl bg-white text-black"
        />

        <input
          name="price"
          placeholder="Giá"
          value={product.price}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-xl bg-white text-black"
        />

        <select
          name="category_id"
          value={product.category_id}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-xl bg-white text-black"
        >
          <option value="">Chọn category</option>
          {categories.map((c) => {
            const label =
              c.cat_name ?? c.name ?? c.category_name ?? c.title ?? c.label ?? String(c.cat_id ?? c.id ?? c.category_id ?? c.categoryId ?? "");
            const value = c.cat_id ?? c.id ?? c.category_id ?? c.categoryId ?? "";
            return (
              <option key={value || label} value={value}>
                {label}
              </option>
            );
          })}
        </select>

        <select
          name="brand_id"
          value={product.brand_id}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-xl bg-white text-black"
        >
          <option value="">Chọn brand</option>
          {brands.map((b) => {
            const label =
              b.brand_name ?? b.name ?? b.title ?? b.label ?? String(b.brand_id ?? b.id ?? b.brandId ?? "");
            const value = b.brand_id ?? b.id ?? b.brandId ?? "";
            return (
              <option key={value || label} value={value}>
                {label}
              </option>
            );
          })}
        </select>

        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
        >
          Tạo
        </button>
      </form>
    </div>
  );
}