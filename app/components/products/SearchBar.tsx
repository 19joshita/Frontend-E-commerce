"use client";
import React, { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (q: string) => void;
}) {
  const [q, setQ] = useState("");
  const debounced = useDebounce(q, 500);
  useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);
  return (
    <label className="block">
      <input
        aria-label="Search products"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products..."
        className="w-full p-2 border rounded"
      />
    </label>
  );
}
