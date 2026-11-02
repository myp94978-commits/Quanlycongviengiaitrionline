"use client";
import { useEffect, useState } from "react";
import { getBrands } from "@/services/brandService";
import Select from "./Select";

export default function BrandSelect({ name, value, onChange }) {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getBrands({ trash: 0 });
            setBrands(res.data || res);
        };
        fetchData();
    }, []);

    return (
        <Select
            options={brands}
            valueKey="brand_id"
            labelKey="brand_name"
            name={name}
            value={value}
            onChange={onChange}
        />
    );
}