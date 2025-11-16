import { formatCurrency } from "../../utils/formatCurrency";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartClient from "../../components/cart/AddToCart";
import { Metadata } from "next";

type Props = { params: { id: string } };

// Optional: generate static paths for pre-rendering
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();
    return {
      title: product.title,
      description: product.description,
    };
  } catch {
    return { title: "Product" };
  }
}
export default async function ProductPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;

  try {
    // ✅ Use the dynamic id here
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) notFound();
    const product = await res.json();

    return (
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full h-96 relative border rounded-md bg-white p-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: "contain" }}
            loading="lazy"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="mt-3 text-sm text-gray-700">{product.description}</p>
          <p className="mt-4 text-xl font-semibold">
            {formatCurrency(product.price)}
          </p>
          <AddToCartClient product={product} />
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
