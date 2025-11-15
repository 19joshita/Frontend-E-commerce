import ProductGrid from "../app/components/products/ProductGrid";
import Container from "../app/components/ui/Container";

export default function HomePage() {
  return (
    <Container>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <ProductGrid />
    </Container>
  );
}
