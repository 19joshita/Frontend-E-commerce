"use client";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { formatCurrency } from "../../utils/formatCurrency";
import Link from "next/link";

export default function ProductCard({ product }: any) {
  console.log(product.id);
  const dispatch = useDispatch();
  return (
    <article
      className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
      role="article"
      aria-labelledby={`p-${product.id}`}
    >
      <Link
        href={`/product/${product.id}`}
        className="relative w-full aspect-[4/3] mb-4 block overflow-hidden rounded-xl group"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width:640px) 100vw, 33vw"
          loading="lazy"
          className="transition-transform duration-300 group-hover:scale-105"
        />

        {product.isNew && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            New
          </span>
        )}
      </Link>

      <h3
        id={`p-${product.id}`}
        className="text-base font-semibold text-gray-800 line-clamp-2 mb-2"
      >
        {product.title}
      </h3>

      {/* Price */}
      <p className="text-lg font-bold text-gray-900 mb-4">
        {formatCurrency(product.price)}
      </p>

      {/* Action buttons */}
      <div className="mt-auto flex flex-col sm:flex-row gap-2">
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
          className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg transition-colors duration-300"
        >
          Add to Cart
        </button>
        <Link
          href={`/product/${product.id}`}
          className="flex-1 px-4 py-2 border border-gray-300 hover:border-gray-400 rounded-lg text-center text-gray-700 font-medium transition-colors duration-300"
        >
          View
        </Link>
      </div>
    </article>
  );
}
