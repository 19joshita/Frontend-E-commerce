// app/product/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartClient from "../../components/cart/AddToCart";
import { formatCurrency } from "../../utils/formatCurrency";

type Props = { params: { id: string } };

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

export async function generateStaticParams() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) return [];
    const products: Product[] = await res.json();
    return products.map((p) => ({ id: p.id.toString() }));
  } catch {
    return []; // fallback to avoid build crash
  }
}

async function getProduct(id: string) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store", // SSR: always fetch fresh data
    });
    if (!res.ok) return null;
    return res.json() as Promise<Product>;
  } catch {
    return null;
  }
}

// ------------------------------
// Page Component
// ------------------------------
export default async function ProductPage(rawProps: Props) {
  // Resolve params in case it is a Promise
  const props: Props = await Promise.resolve(rawProps);
  const { id } = props.params;

  const product = await getProduct(id);

  if (!product) return notFound();

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
}
