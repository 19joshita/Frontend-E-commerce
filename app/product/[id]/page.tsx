import { formatCurrency } from "../../utils/formatCurrency";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartClient from "../../components/cart/AddToCart";

type Props = { params: { id: string } };

// Optional: generate static paths
export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  return products.map((product: any) => ({ id: product.id.toString() }));
}

export default async function ProductPage({ params }: Props) {
  console.log(params);
  const { id } = params;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/1`, {
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
  } catch {
    notFound();
  }
}
