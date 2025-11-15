"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import CartItem from "./CartItems";
import { clearCart } from "../../redux/slices/cartSlice";
import Link from "next/link";

export default function CartSidebar({ open, onClose }: any) {
  const items = useSelector((s: RootState) => s.cart.items);
  const total = useSelector((s: RootState) => s.cart.total);
  const dispatch = useDispatch();
  if (!open) return null;
  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Cart</h3>
        <button onClick={onClose} aria-label="Close cart">
          Close
        </button>
      </div>
      <div className="space-y-3 overflow-auto" style={{ maxHeight: "60vh" }}>
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          items.map((it: any, index: number) => (
            <CartItem key={index} item={it} />
          ))
        )}
      </div>
      <div className="mt-4">
        <p className="font-semibold">Total: {total}</p>
        <div className="flex gap-2 mt-3">
          <Link
            href="/checkout"
            className="px-3 py-2 bg-green-600 text-white rounded"
            onClick={onClose}
          >
            Checkout
          </Link>
          <button
            onClick={() => dispatch(clearCart())}
            className="px-3 py-2 border rounded"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
