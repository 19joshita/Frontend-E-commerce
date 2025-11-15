"use client";
import React from "react";

export default function ProductFilters({
  category,
  onChangeCategory,
}: {
  category: string;
  onChangeCategory: (c: string) => void;
}) {
  return (
    <div className="flex gap-2 items-center">
      <label className="text-sm">Category</label>
      <select
        aria-label="Filter category"
        value={category}
        onChange={(e) => onChangeCategory(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="all">All</option>
        <option value="men's clothing">Men's clothing</option>
        <option value="women's clothing">Women's clothing</option>
        <option value="jewelery">Jewelery</option>
        <option value="electronics">Electronics</option>
      </select>
    </div>
  );
}
