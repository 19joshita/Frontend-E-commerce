import { useEffect, useState, useCallback } from "react";

export default function useInfiniteProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPage = useCallback(async (p = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const all = await res.json();
      // emulate pagination
      const pageSize = 10;
      const start = (p - 1) * pageSize;
      const slice = all.slice(start, start + pageSize);
      if (p === 1) setProducts(slice);
      else setProducts((prev) => [...prev, ...slice]);
      setHasMore(start + pageSize < all.length);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const np = page + 1;
      setPage(np);
      fetchPage(np);
    }
  }, [isLoading, hasMore, page, fetchPage]);

  return { products, isLoading, loadMore, hasMore };
}
