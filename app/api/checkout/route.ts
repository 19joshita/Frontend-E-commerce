import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cart, total } = body;
    if (!Array.isArray(cart) || typeof total !== "number")
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

    // Simulate delay and random failure
    const fail = Math.random() < 0.08;
    await new Promise((res) => setTimeout(res, 700));
    if (fail)
      return NextResponse.json(
        { status: "error", message: "Payment failed" },
        { status: 500 }
      );
    return NextResponse.json({ status: "ok", orderId: `ORD-${Date.now()}` });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
