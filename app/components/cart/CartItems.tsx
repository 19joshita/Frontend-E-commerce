"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQty } from "../../redux/slices/cartSlice";

export default function CartItem({ item }: any) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-3">
      <img
        src={item.image}
        alt={item.title}
        className="w-12 h-12 object-contain"
      />
      <div className="flex-1">
        <div className="text-sm font-medium truncate">{item.title}</div>
        <div className="text-xs">
          {item.qty} × {item.price}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <button
          onClick={() =>
            dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))
          }
        >
          +
        </button>
        <button
          onClick={() =>
            dispatch(updateQty({ id: item.id, qty: Math.max(1, item.qty - 1) }))
          }
        >
          -
        </button>
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="text-xs text-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
