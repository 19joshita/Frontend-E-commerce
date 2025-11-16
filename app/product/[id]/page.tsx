import { Metadata } from "next";
import { notFound } from "next/navigation";
// import ProductCard from "../../../components/ProductCard";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  if (!res.ok) return {};
  const product = await res.json();
  return { title: product.title, description: product.description };
}

export default async function ProductPage({ params }: Props) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  if (!res.ok) return notFound();
  const product = await res.json();

  return (
    <div className="p-4 flex flex-col sm:flex-row gap-4">
      <img
        src={product.image}
        alt={product.title}
        className="h-64 object-contain"
      />
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="mt-2 text-gray-700">{product.description}</p>
        <p className="mt-2 font-bold">${product.price}</p>
        {/* Can reuse ProductCard button functionality */}
      </div>
    </div>
  );
}
