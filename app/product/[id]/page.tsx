import { Metadata } from "next";
import { notFound } from "next/navigation";
// import { useCart } from "../../../components/cart/CartContext";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  if (!product) notFound();

  return (
    <div className="p-8 flex flex-col md:flex-row gap-8">
      <img src={product.image} alt={product.title} className="h-80" />
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="mt-2">{product.description}</p>
        <p className="mt-2 font-bold">${product.price}</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
