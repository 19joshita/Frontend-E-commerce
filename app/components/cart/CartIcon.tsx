"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CartSlider from "./CartSlider";

export default function CartIcon() {
  const totalQty = useSelector((state: RootState) =>
    state.cart.items.reduce((a, b) => a + b.qty, 0)
  );
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        aria-label="Open cart"
        onClick={() => setOpen(true)}
        className="relative focus:outline-none"
      >
        {/* Cart Icon */}
        <svg
          className="w-6 h-6 text-gray-800"
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

        {/* Quantity Badge */}
        {totalQty > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {totalQty}
          </span>
        )}
      </button>

      {/* MUI Drawer */}
      <CartSlider open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
