"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CartSidebar from "./CartSlider";

export default function CartIcon() {
  const totalQty = useSelector((s: RootState) =>
    s.cart.items.reduce((a, b) => a + b.qty, 0)
  );
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        aria-label="Open cart"
        onClick={() => setOpen(true)}
        className="relative"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4"
          />
        </svg>
        {totalQty > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1">
            {totalQty}
          </span>
        )}
      </button>
      <CartSidebar open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
