"use client";

import React, { useRef, useEffect } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { Grid } from "react-virtualized";
import ProductCard from "./ProductCard";

export default function VirtualizedList({ items, loadMore, hasMore }: any) {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const GAP = 10; // gap in px

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) loadMore();
      },
      { rootMargin: "300px" }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  return (
    <div style={{ height: "70vh" }}>
      <AutoSizer>
        {({ height, width }: any) => {
          const columnCount = width > 1024 ? 3 : width > 640 ? 2 : 1;
          const colWidth = Math.floor(width / columnCount) - GAP;
          const rowCount = Math.ceil(items.length / columnCount);

          return (
            <Grid
              cellRenderer={({ columnIndex, rowIndex, style, key }: any) => {
                const index = rowIndex * columnCount + columnIndex;
                const item = items[index];

                if (!item) return <div style={style} key={key} />;

                return (
                  <div
                    style={{
                      ...style,
                      left: style.left + GAP / 2, // add horizontal spacing
                      top: style.top + GAP / 2, // add vertical spacing
                      width: style.width - GAP,
                      height: style.height - GAP,
                    }}
                    key={key}
                  >
                    <ProductCard product={item} />
                  </div>
                );
              }}
              columnCount={columnCount}
              columnWidth={colWidth + GAP}
              height={height}
              rowCount={rowCount}
              rowHeight={360 + GAP}
              width={width}
            />
          );
        }}
      </AutoSizer>

      {/* Sentinel div for infinite scroll */}
      <div ref={observerRef} />
    </div>
  );
}
