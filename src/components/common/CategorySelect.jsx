"use client";
import { getCategories } from "@/services/categoryService";
import React, { useEffect, useState } from "react";
import { isEmpty } from "@/utils/validator";
import Select from "./Select";

export default function CategorySelect({ name, value, onChange }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setError] = useState({});
  // goi api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCategories({ trash: 0 });
        setCategories(data);
      } catch (e) {
        setError(e.data.error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(categories);
  return (
    <div>
      {!isEmpty(errors) ? (
        <p> {errors.message}</p>
      ) : loading ? (
        "loading categories"
      ) : (
        <Select
          options={categories}
          valueKey="cat_id"
          labelKey="cat_name"
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}
