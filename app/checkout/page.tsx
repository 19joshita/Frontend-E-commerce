"use client";
import { useState } from "react";
import Container from "../components/ui/Container";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { clearCart } from "../redux/slices/cartSlice";

export default function CheckoutPage() {
  const cart = useSelector((s: RootState) => s.cart.items);
  const total = useSelector((s: RootState) => s.cart.total);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, total }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Checkout failed");
      setMessage(`Order placed: ${data.orderId}`);
      dispatch(clearCart());
    } catch (err: any) {
      setMessage(err.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          <ul>
            {cart?.map((it, index) => (
              <li key={index} className="flex justify-between py-2 border-b">
                {it.title}{" "}
                <span>
                  {it.qty} × {it.price}
                </span>
              </li>
            ))}
          </ul>
          <p className="font-semibold">Total: {total}</p>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : "Place order"}
            </button>
          </div>
          {message && <p className="mt-4">{message}</p>}
        </div>
      )}
    </Container>
  );
}
