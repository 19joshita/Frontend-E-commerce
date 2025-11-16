// app/components/ui/Footer.tsx
"use client";

export default function Footer() {
  const year = new Date().getFullYear();
  return <p className="text-sm text-center">© {year} ShopDemo</p>;
}
