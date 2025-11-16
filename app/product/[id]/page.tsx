// app/product/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartClient from "../../components/cart/AddToCart";
import { formatCurrency } from "../../utils/formatCurrency";
import { Metadata } from "next";

type Props = { params: { id: string } };

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

// Pre-generate product IDs for static routes
export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");

  const products: Product[] = await res.json();
  return products.map((product) => ({ id: product.id.toString() }));
}

// Optional: Metadata generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product: Product = await res.json();
    return {
      title: product.title,
      description: product.description,
    };
  } catch {
    return { title: "Product" };
  }
}

// Page Component
export default async function ProductPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store", // fetch fresh data on every request
    });

    if (!res.ok) notFound();
    const product: Product = await res.json();

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
