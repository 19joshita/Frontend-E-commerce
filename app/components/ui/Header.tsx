// app/components/ui/Header.tsx
"use client";
import CartIcon from "../cart/CartIcon";

export default function Header() {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="logo" className="h-8 w-8" />
        <h1 className="text-lg font-semibold">Shop Demo</h1>
      </div>

      <CartIcon />
    </div>
  );
}
