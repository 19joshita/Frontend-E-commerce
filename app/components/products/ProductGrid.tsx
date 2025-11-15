"use client";
import React, { useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import ProductFilters from "./ProductFilters";
import VirtualizedList from "./VertualizedList";
import SkeletonProductCard from "./SkeletonProductCard";
import useInfiniteProducts from "../../hooks/useInfiniteProducts";

export default function ProductGrid() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const { products, isLoading, loadMore, hasMore } = useInfiniteProducts();

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "all" || p.category === category) &&
          p.title.toLowerCase().includes(query.toLowerCase())
      ),
    [products, category, query]
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex-1">
          <SearchBar onSearch={(q) => setQuery(q)} />
        </div>
        <div className="w-48">
          <ProductFilters category={category} onChangeCategory={setCategory} />
        </div>
      </div>

      <div>
        {isLoading && products?.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonProductCard key={i} />
            ))}
          </div>
        ) : (
          <VirtualizedList
            items={filtered}
            loadMore={loadMore}
            hasMore={hasMore}
          />
        )}
      </div>
    </div>
  );
}
