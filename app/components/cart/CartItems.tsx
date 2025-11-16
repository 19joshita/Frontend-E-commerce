"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQty } from "../../redux/slices/cartSlice";

export default function CartItem({ item }: any) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-white shadow-sm rounded-lg hover:shadow-md transition-shadow">
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 object-contain rounded-md border border-gray-200 p-1"
      />

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-800 truncate">
          {item.title}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {item.qty} × ${item.price.toFixed(2)}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={() =>
            dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))
          }
          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          +
        </button>
        <button
          onClick={() =>
            dispatch(updateQty({ id: item.id, qty: Math.max(1, item.qty - 1) }))
          }
          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          -
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => dispatch(removeFromCart(item.id))}
        className="text-xs text-red-600 hover:text-red-800 font-medium transition"
      >
        Remove
      </button>
    </div>
  );
}
