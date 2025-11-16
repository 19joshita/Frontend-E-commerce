"use client";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { formatCurrency } from "../../utils/formatCurrency";
import Link from "next/link";

export default function ProductCard({ product }: any) {
  const dispatch = useDispatch();

  return (
    <article
      className="bg-white border p-4 rounded shadow-sm flex flex-col h-full"
      role="article"
    >
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="mb-4 block">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={225}
          style={{ objectFit: "contain" }}
          className="w-full h-auto"
          loading="lazy"
        />
      </Link>

      {/* Product Title */}
      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
        {product.title}
      </h3>

      {/* Price */}
      <p className="text-base font-bold text-gray-900 mb-4">
        {formatCurrency(product.price)}
      </p>

      {/* Action Buttons */}
      <div className="mt-auto flex gap-2">
        <button
          onClick={() =>
            dispatch(
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
              })
            )
          }
          className="flex-1 px-3 py-2 bg-blue-600 text-white font-medium rounded text-sm"
        >
          Add to Cart
        </button>

        <Link
          href={`/product/${product.id}`}
          className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 font-medium rounded text-sm text-center"
        >
          View
        </Link>
      </div>
    </article>
  );
}
